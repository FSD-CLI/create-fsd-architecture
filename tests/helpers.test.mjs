import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inventory } from "../skills/fsd-cli/scripts/inventory.mjs";
import { inspectImports } from "../skills/fsd-cli/scripts/inspect-imports.mjs";
import { verifyEvidence } from "../skills/fsd-cli/scripts/verify-evidence.mjs";

const skill = fileURLToPath(new URL("../skills/fsd-cli/", import.meta.url));
function workspace(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fsd-skill-tests-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function write(root, file, text) { const target = path.join(root, file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); }
function pkg(root, data) { write(root, "package.json", JSON.stringify(data)); }
function hashes(root) {
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) return hashes(file).map(([name, bytes]) => [path.join(entry.name, name), bytes]);
    if (entry.isFile()) return [[entry.name, fs.readFileSync(file).toString("base64")]];
    return [];
  }).sort(([a], [b]) => a.localeCompare(b));
}
test("inventory detects each supported framework without mistaking implementation dependencies", t => {
  const root = workspace(t);
  for (const [framework, dependencies] of [["react-vite", {react:"19"}], ["nextjs", {next:"16",react:"19"}], ["vue-vite", {vue:"3"}], ["nuxt", {nuxt:"4",vue:"3"}], ["sveltekit", {"@sveltejs/kit":"2",svelte:"5"}]]) {
    pkg(root, { dependencies }); assert.equal(inventory(root).framework, framework);
  }
});
test("inventory protects secrets, script bodies and existing files", t => {
  const root = workspace(t);
  pkg(root, { dependencies: { react: "https://private.invalid/INVENTORY_SECRET" }, scripts: { build: "echo INVENTORY_SECRET" } });
  write(root, ".env", "SERVICE_ROLE=INVENTORY_SECRET");
  write(root, "fsd.config.json", JSON.stringify({schemaVersion:1,framework:"react-vite",privateValue:"INVENTORY_SECRET"}));
  const before = hashes(root); const result = inventory(root);
  assert(!JSON.stringify(result).includes("INVENTORY_SECRET"));
  assert.deepEqual(result.scriptNames, ["build"]);
  assert.deepEqual(hashes(root), before);
});
test("unknown/ambiguous frameworks and config mismatch remain visible", t => {
  const root = workspace(t); pkg(root, {}); assert.equal(inventory(root).framework, null);
  pkg(root, { dependencies: { next:"16", nuxt:"4" } }); assert.equal(inventory(root).ambiguous, true);
  write(root, "fsd.config.json", JSON.stringify({schemaVersion:1,framework:"vue-vite"}));
  assert(inventory(root).errors.some(error => error.includes("disagrees")));
});
test("bounded workspace roots and multiple lockfiles are reported without choosing an app", t => {
  const root = workspace(t); pkg(root, { workspaces: ["apps/*"] });
  pkg(path.join(root, "apps/web"), { dependencies:{next:"16"} });
  pkg(path.join(root, "apps/admin"), { dependencies:{react:"19"} });
  write(root, "package-lock.json", "{}"); write(root, "yarn.lock", "# fixture");
  const result = inventory(root); assert.equal(result.framework, null);
  assert.deepEqual(result.workspaceApplications.sort(), [path.join("apps","admin"),path.join("apps","web")]);
  assert.equal(result.ambiguous, true);
  assert.equal(result.lockfiles.length, 2);
});
test("invalid and symlink config inputs do not leak raw contents", t => {
  const root = workspace(t); pkg(root, {});
  write(root, "fsd.config.json", "RAW_SECRET_NOT_JSON");
  assert(!JSON.stringify(inventory(root)).includes("RAW_SECRET"));
  fs.unlinkSync(path.join(root,"fsd.config.json"));
  fs.symlinkSync(path.join(root, "package.json"), path.join(root, "fsd.config.json"));
  assert(inventory(root).errors.some(error => error.includes("bounded regular file")));
});
test("literal import hints expose actual upward/cross-slice/deep boundaries", t => {
  const root = workspace(t);
  write(root,"entities/product/index.ts","export const product=1;");
  write(root,"entities/product/model/types.ts","export const type=1;");
  write(root,"features/cart/index.ts","export const cart=1;");
  write(root,"features/search/index.ts","import {cart} from '../cart';");
  write(root,"pages/catalog/index.ts","import {type} from '@/entities/product/model/types';");
  write(root,"shared/lib/index.ts","import {cart} from '../../features/cart';");
  const result = inspectImports(root);
  assert.deepEqual(new Set(result.findings.map(item => item.reason)), new Set(["upward-layer-import","same-layer-cross-slice","cross-slice-deep-import"]));
  assert(result.findings.every(item => item.status === "hint-needs-source-review"));
});
test("public APIs and same-layer Shared segments are not business cross-slice findings", t => {
  const root = workspace(t);
  write(root,"entities/product/index.ts","export const product=1;");
  write(root,"features/cart/index.ts","import {product} from '@/entities/product';");
  write(root,"shared/lib/index.ts","export const lib=1;");
  write(root,"shared/ui/index.ts","import {lib} from '../lib';");
  assert.equal(inspectImports(root).findings.length, 0);
});
test("unresolved/outside targets and symlinks limit import evidence without reading them", t => {
  const parent=workspace(t); const root=path.join(parent,"src"); fs.mkdirSync(root);
  write(root,"features/cart/index.ts","import x from '@/missing';\nimport y from '../../../outside';");
  write(parent,"outside.ts","export const secret='SHOULD_NOT_BE_READ';");
  fs.symlinkSync(path.join(parent,"outside.ts"),path.join(root,"linked.ts"));
  const result=inspectImports(root);
  assert.equal(result.unresolved.length,2);
  assert(result.limitations.includes("Symlink entries skipped"));
  assert(!JSON.stringify(result).includes("SHOULD_NOT_BE_READ"));
});
function evidence(root) {
  write(root,"check.log","observed fixture command output\n");
  return {schemaVersion:1,source:{kind:"candidate",commit:"a".repeat(40)},environment:{node:process.version,platform:process.platform},checks:[{id:"fixture",command:["node","check.mjs"],cwd:root,exitCode:0,expectedExitCode:0,outcome:"pass",log:"check.log",assertions:["fixture output matched its behavior contract"]}],limitations:["local fixture only"]};
}
test("evidence supports executed success and expected negative results", t => {
  const root=workspace(t); const report=evidence(root); assert.equal(verifyEvidence(report,root).valid,true);
  report.checks[0].exitCode=1;report.checks[0].expectedExitCode=1;
  assert.equal(verifyEvidence(report,root).valid,true);
});
test("contradictory, duplicate and fake unverified checks cannot pass", t => {
  const root=workspace(t); const report=evidence(root);
  report.checks[0].exitCode=1;assert.equal(verifyEvidence(report,root).valid,false);
  report.checks[0].exitCode=0;report.checks.push({...report.checks[0]});assert.equal(verifyEvidence(report,root).valid,false);
  report.checks.pop();report.checks[0].outcome="unverified";assert.equal(verifyEvidence(report,root).valid,false);
  report.checks[0].exitCode=null;report.checks[0].expectedExitCode=null;report.checks[0].log=null;
  assert.equal(verifyEvidence(report,root).valid,true);
});
test("published claims require source identity and integrity", t => {
  const root=workspace(t); const report=evidence(root);report.source.kind="published";
  assert.equal(verifyEvidence(report,root).valid,false);
  Object.assign(report.source,{version:"2.6.1",integrity:"sha512-"+Buffer.alloc(64).toString("base64"),gitHead:report.source.commit});
  assert.equal(verifyEvidence(report,root).valid,true);
  report.source.gitHead="b".repeat(40);assert.equal(verifyEvidence(report,root).valid,false);
});
test("evidence rejects traversal and symlink logs", t => {
  const root=workspace(t);const report=evidence(root);
  report.checks[0].log="../check.log";assert.equal(verifyEvidence(report,root).valid,false);
  fs.symlinkSync(path.join(root,"check.log"),path.join(root,"linked.log"));
  report.checks[0].log="linked.log";assert.equal(verifyEvidence(report,root).valid,false);
});
test("CLI helper errors are bounded and evidence validation never executes commands", t => {
  const root=workspace(t); const report=evidence(root);
  report.checks[0].command=["node","-e","require('fs').writeFileSync('side-effect','bad')"];
  write(root,"report.json",JSON.stringify(report));const before=hashes(root);
  const result=spawnSync(process.execPath,[path.join(skill,"scripts/verify-evidence.mjs"),path.join(root,"report.json")],{cwd:root,encoding:"utf8"});
  assert.equal(result.status,0,result.stderr);assert.deepEqual(hashes(root),before);
  for(const script of ["inventory.mjs","inspect-imports.mjs","verify-evidence.mjs"]){
    const error=spawnSync(process.execPath,[path.join(skill,"scripts",script),"--unknown"],{cwd:root,encoding:"utf8"});assert.notEqual(error.status,0);
  }
});
