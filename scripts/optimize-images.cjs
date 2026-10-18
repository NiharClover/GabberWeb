const path = require("node:path");
const sharp = require(path.resolve(__dirname, "../../Gabber/node_modules/sharp"));

const screens = path.resolve(__dirname, "../dist/assets/screens");
const names = [
  "generated-inbox",
  "generated-business-chat",
  "generated-explore",
  "generated-group-call",
];

Promise.all(names.map((name) =>
  sharp(path.join(screens, `${name}.png`))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(path.join(screens, `${name}.webp`))
)).then(() => console.log(`Optimized ${names.length} generated screens.`));
