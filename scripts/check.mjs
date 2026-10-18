import fs from "node:fs";
import path from "node:path";

const root = path.resolve("dist");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
const failures = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    const localPath = url.split("#")[0].split("?")[0];
    if (localPath && !fs.existsSync(path.join(root, localPath))) {
      failures.push(`${file} -> ${url}`);
    }
  }
}

const css = fs.readFileSync(path.join(root, "assets", "site.css"), "utf8");
if ((css.match(/{/g) || []).length !== (css.match(/}/g) || []).length) {
  failures.push("assets/site.css has unbalanced rule blocks");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages; all local links and assets resolve.`);
console.log("CSS structure check passed.");
