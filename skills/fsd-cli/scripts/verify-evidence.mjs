import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const nonempty = value => typeof value === "string" && !!value.trim();
const sha = value => typeof value === "string" && /^[a-f0-9]{40}$/.test(value);
function safeLog(root, relative) {
  if (!nonempty(relative) || path.isAbsolute(relative)) return false;
  const parts = relative.split(/[\\/]/);
  if (parts.some(part => part === ".." || !part)) return false;
  let target = root;
  for (const part of parts) {
    target = path.join(target, part);
    if (!fs.existsSync(target) || fs.lstatSync(target).isSymbolicLink()) return false;
  }
  return fs.statSync(target).isFile();
}
export function verifyEvidence(report, root) {
  const errors = [];
  if (report?.schemaVersion !== 1) errors.push("Unsupported evidence schema");
  const source = report?.source;
  if (!["candidate", "merged", "published"].includes(source?.kind) || !sha(source?.commit)) errors.push("Source kind/full commit required");
  if (source?.kind === "published") {
    if (!nonempty(source.version) || !/^sha512-[A-Za-z0-9+/]{86}==$/.test(source.integrity || "") || source.gitHead !== source.commit) errors.push("Published source needs version, SHA512 integrity and matching gitHead");
  }
  if (!nonempty(report?.environment?.node) || !nonempty(report?.environment?.platform)) errors.push("Node/platform environment required");
  if (!Array.isArray(report?.limitations) || report.limitations.some(item => !nonempty(item))) errors.push("Explicit limitations array required");
  if (!Array.isArray(report?.checks) || report.checks.length === 0) errors.push("Nonempty checks required");
  const ids = new Set();
  for (const [index, check] of (Array.isArray(report?.checks) ? report.checks : []).entries()) {
    const prefix = `Check ${index + 1}: `;
    if (!nonempty(check?.id) || ids.has(check?.id)) errors.push(prefix + "unique id required");
    ids.add(check?.id);
    if (!Array.isArray(check?.command) || !check.command.length || check.command.some(arg => !nonempty(arg)) || !nonempty(check?.cwd)) errors.push(prefix + "command argv/cwd required");
    if (!["pass", "fail", "unverified"].includes(check?.outcome)) errors.push(prefix + "invalid outcome");
    if (check?.outcome === "unverified") {
      if (check.exitCode !== null || check.expectedExitCode !== null || check.log != null) errors.push(prefix + "unverified cannot claim execution/log");
      continue;
    }
    if (!Number.isInteger(check?.exitCode) || !Number.isInteger(check?.expectedExitCode)) errors.push(prefix + "integer actual/expected exit codes required");
    else if ((check.exitCode === check.expectedExitCode) !== (check.outcome === "pass")) errors.push(prefix + "outcome contradicts exit codes");
    if (!safeLog(root, check?.log)) errors.push(prefix + "log must be an existing regular file inside report scope");
    if (!Array.isArray(check?.assertions) || !check.assertions.length || check.assertions.some(item => !nonempty(item))) errors.push(prefix + "meaningful assertion descriptions required");
  }
  return { valid: errors.length === 0, errors, scope: "Schema and local log consistency only; commands/assertions/remote sources are not executed or certified" };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 3) { console.error("Usage: verify-evidence.mjs report.json"); process.exitCode = 2; }
  else try {
    const file = fs.realpathSync(process.argv[2]);
    if (fs.statSync(file).size > 1024 * 1024) throw new Error("Oversized report");
    const result = verifyEvidence(JSON.parse(fs.readFileSync(file, "utf8")), path.dirname(file));
    console.log(JSON.stringify(result, null, 2)); process.exitCode = result.valid ? 0 : 1;
  } catch { console.error("Cannot validate requested evidence report"); process.exitCode = 1; }
}
