import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const layers = ["app", "pages", "widgets", "features", "entities", "shared"];
const frameworks = [["sveltekit", "@sveltejs/kit"], ["nuxt", "nuxt"], ["nextjs", "next"], ["vue-vite", "vue"], ["react-vite", "react"]];
function readJson(file, errors) {
  if (!fs.existsSync(file)) return null;
  if (!fs.lstatSync(file).isFile() || fs.statSync(file).size > 1024 * 1024) {
    errors.push(`${path.basename(file)} is not a bounded regular file`); return null;
  }
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch { errors.push(`${path.basename(file)} is not valid JSON`); return null; }
}
function directory(root, relative) {
  const target = path.join(root, relative);
  return fs.existsSync(target) && fs.lstatSync(target).isDirectory();
}
export function inventory(input = process.cwd()) {
  const root = fs.realpathSync(input);
  const errors = [];
  const pkg = readJson(path.join(root, "package.json"), errors);
  const config = readJson(path.join(root, "fsd.config.json"), errors);
  const dependencies = { ...pkg?.devDependencies, ...pkg?.dependencies };
  let detected = frameworks.filter(([, dependency]) => Object.hasOwn(dependencies, dependency)).map(([name]) => name);
  if (detected.includes("nuxt")) detected = detected.filter(name => name !== "vue-vite");
  if (detected.includes("nextjs")) detected = detected.filter(name => name !== "react-vite");
  const configured = typeof config?.framework === "string" && frameworks.some(([name]) => name === config.framework) ? config.framework : null;
  if (config && (!configured || config.schemaVersion !== 1)) errors.push("FSD config framework/schema is unsupported");
  if (configured && detected.length && !detected.includes(configured)) errors.push("Configured framework disagrees with dependency hints");
  const sourceRoots = ["src", "app", "."].filter(relative => directory(root, relative)).map(relative => ({
    path: relative, layers: layers.filter(layer => directory(root, path.join(relative, layer))),
  })).filter(item => item.layers.length);
  const applications = [];
  for (const parent of ["apps", "packages"]) {
    if (!directory(root, parent)) continue;
    const entries = fs.readdirSync(path.join(root, parent), { withFileTypes: true }).slice(0, 100);
    for (const entry of entries) if (entry.isDirectory() && fs.existsSync(path.join(root, parent, entry.name, "package.json"))) applications.push(path.join(parent, entry.name));
  }
  const git = args => spawnSync("git", ["-c", "core.fsmonitor=false", "-C", root, ...args], { encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" }, timeout: 5000, maxBuffer: 1024 * 1024 });
  const revision = git(["rev-parse", "HEAD"]);
  const status = git(["status", "--porcelain=v1", "-z", "--untracked-files=normal"]);
  return {
    schemaVersion: 1, root, packagePresent: !!pkg,
    framework: configured || (detected.length === 1 ? detected[0] : null),
    frameworkHints: detected,
    frameworkPackageHints: Object.fromEntries(frameworks.filter(([, dependency]) => typeof dependencies[dependency] === "string" && /^[~^<>= v\d.*|+-]+$/.test(dependencies[dependency]) && /\d/.test(dependencies[dependency])).map(([, dependency]) => [dependency, dependencies[dependency]])),
    ambiguous: detected.length > 1 || (!pkg && applications.length > 0) || (applications.length > 1 && sourceRoots.length === 0),
    sourceRoots, workspaceApplications: applications,
    dependencyNames: Object.keys(dependencies).sort(), scriptNames: Object.keys(pkg?.scripts || {}).sort(),
    lockfiles: ["package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lock", "bun.lockb"].filter(file => fs.existsSync(path.join(root, file))),
    configPresent: fs.existsSync(path.join(root, "fsd.config.json")),
    manifestPresent: fs.existsSync(path.join(root, ".fsd", "manifest.json")),
    git: { commit: revision.status === 0 ? revision.stdout.trim() : null, dirty: status.status === 0 ? !!status.stdout : null },
    errors, limitations: ["Framework and roots are hints, not architectural validation", "No env, config values, dependency URLs or script bodies are returned", "Workspace discovery covers bounded immediate apps/packages only", "Manifest presence does not establish ownership"],
  };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--root")) { console.error("Usage: inventory.mjs [--root application-root]"); process.exitCode = 2; }
  else try { console.log(JSON.stringify(inventory(args[1]), null, 2)); } catch { console.error("Cannot inspect the requested root"); process.exitCode = 1; }
}
