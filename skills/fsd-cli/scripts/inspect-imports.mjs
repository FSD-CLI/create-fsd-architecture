import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const layers = ["shared", "entities", "features", "widgets", "pages", "app"];
const ignored = new Set(["node_modules", ".git", ".next", ".nuxt", ".svelte-kit", "dist", "build"]);
function filesAt(root, limitations) {
  const files = []; let visited = 0;
  function walk(directory, depth) {
    if (depth > 15 || visited > 5000) { limitations.add("Scan truncated by depth/entry bound"); return; }
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      visited++;
      if (visited > 5000) { limitations.add("Scan truncated by entry bound"); return; }
      const file = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) { limitations.add("Symlink entries skipped"); continue; }
      if (entry.isDirectory() && !ignored.has(entry.name)) walk(file, depth + 1);
      else if (entry.isFile() && /\.(?:[cm]?[jt]sx?|vue|svelte)$/.test(entry.name)) files.push(file);
    }
  }
  walk(root, 0); return files;
}
function boundary(root, file) {
  const parts = path.relative(root, file).split(path.sep);
  const index = layers.indexOf(parts[0]);
  return index === -1 ? null : { index, layer: parts[0], slice: parts[1], internal: parts.length > 2 && !/^index\.[cm]?[jt]sx?$/.test(parts[2]) };
}
function within(root, file) { const relative = path.relative(root, file); return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative); }
function resolveFile(target, available) {
  for (const candidate of [target, ...[".ts", ".tsx", ".js", ".jsx", ".mjs", ".vue", ".svelte"].map(ext => target + ext), ...[".ts", ".tsx", ".js", ".jsx", ".mjs"].map(ext => path.join(target, "index" + ext))]) if (available.has(candidate)) return candidate;
  return null;
}
export function inspectImports(input, alias = "@") {
  if (!/^[A-Za-z@~][\w@~/-]*$/.test(alias)) throw new Error("Invalid alias prefix");
  const root = fs.realpathSync(input);
  const limitations = new Set(["Heuristic literal import extraction, not a parser or Steiger replacement", "No reexport, nonliteral dynamic import, package export or complex alias resolution"]);
  const files = filesAt(root, limitations); const available = new Set(files);
  const imports = []; const findings = []; const unresolved = [];
  for (const file of files) {
    if (fs.statSync(file).size > 256 * 1024) { limitations.add("Oversized source files skipped"); continue; }
    const text = fs.readFileSync(file, "utf8");
    // Only conservative hints: comments/embedded strings can still produce matches.
    const regex = /\bimport\s+(?:[^;\n]*?\s+from\s*)?["']([^"'\n]+)["']|\b(?:import|require)\s*\(\s*["']([^"'\n]+)["']\s*\)/g;
    for (const match of text.matchAll(regex)) {
      const specifier = match[1] || match[2];
      if (!specifier.startsWith(".") && !specifier.startsWith(alias + "/")) continue;
      const target = specifier.startsWith(".") ? path.resolve(path.dirname(file), specifier) : path.join(root, specifier.slice(alias.length + 1));
      const line = text.slice(0, match.index).split("\n").length;
      const from = path.relative(root, file);
      if (!within(root, target)) { unresolved.push({ file: from, line, reason: "Target outside selected source root" }); continue; }
      const resolved = resolveFile(target, available);
      if (!resolved) { unresolved.push({ file: from, line, reason: "Unresolved literal target" }); continue; }
      const to = path.relative(root, resolved); imports.push({ from, to, line });
      const source = boundary(root, file), dest = boundary(root, resolved);
      if (!source || !dest) continue;
      let reason;
      if (source.index < dest.index) reason = "upward-layer-import";
      else if (source.layer === dest.layer && !["app", "shared"].includes(source.layer) && source.slice !== dest.slice) reason = "same-layer-cross-slice";
      else if (source.layer !== dest.layer && !["app", "shared"].includes(dest.layer) && dest.internal) reason = "cross-slice-deep-import";
      if (reason) findings.push({ file: from, target: to, line, reason, status: "hint-needs-source-review" });
    }
  }
  return { schemaVersion: 1, root, filesScanned: files.length, imports, findings, unresolved, limitations: [...limitations] };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (!args[0] || (args.length !== 1 && !(args.length === 3 && args[1] === "--alias"))) { console.error("Usage: inspect-imports.mjs source-root [--alias @]"); process.exitCode = 2; }
  else try { console.log(JSON.stringify(inspectImports(args[0], args[2]), null, 2)); } catch { console.error("Cannot inspect the requested imports"); process.exitCode = 1; }
}
