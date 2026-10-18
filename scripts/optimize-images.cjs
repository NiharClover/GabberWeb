const path = require("node:path");
const fs = require("node:fs");
const sharp = require(path.resolve(__dirname, "../../Gabber/node_modules/sharp"));

const screens = path.resolve(__dirname, "../dist/assets/screens");
const names = [
  "generated-inbox",
  "generated-business-chat",
  "generated-explore",
  "generated-group-call",
  "register-business-spaced",
];

const pending = names.filter((name) => fs.existsSync(path.join(screens, `${name}.png`)));

Promise.all(pending.map((name) =>
  sharp(path.join(screens, `${name}.png`))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(path.join(screens, `${name}.webp`))
)).then(() => console.log(`Optimized ${pending.length} screen image${pending.length === 1 ? "" : "s"}.`));
