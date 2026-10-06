import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root=fileURLToPath(new URL("../",import.meta.url));
function files(directory){return fs.readdirSync(directory,{withFileTypes:true}).flatMap(item=>item.isDirectory()?files(path.join(directory,item.name)):[path.join(directory,item.name)]);}
test("all skill-local Markdown links resolve within the package",()=>{
  const skill=path.join(root,"skills/fsd-cli");
  for(const file of files(skill).filter(file=>file.endsWith(".md"))){
    const text=fs.readFileSync(file,"utf8");
    for(const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)){
      const href=match[1];if(/^(https?:|#)/.test(href))continue;
      const target=path.resolve(path.dirname(file),href.split("#")[0]);
      assert(target.startsWith(skill+path.sep),`${file}: reference escaped skill`);
      assert(fs.existsSync(target),`${file}: missing ${href}`);
    }
  }
});
test("release and skill version metadata agree",()=>{
  const release=JSON.parse(fs.readFileSync(path.join(root,"skills/fsd-cli/release.json"),"utf8"));
  assert.equal(release.version,"2.0.0");
  assert(fs.readFileSync(path.join(root,"skills/fsd-cli/SKILL.md"),"utf8").includes(`version: "${release.version}"`));
  assert.equal(release.cliBaseline,"2.6.1");assert(release.unverified.length>0);
});
