import sharp from "sharp";
import fs from "fs";

const inputFolder = "./src/assets";
const outputFolder = "./public/optimized";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

fs.readdirSync(inputFolder).forEach(file => {
  if (/\.(jpg|jpeg|png)$/i.test(file)) {
    sharp(`${inputFolder}/${file}`)
      .resize({ width: 1200 }) // max width
      .toFormat("webp", { quality: 70 }) // compress to WebP
      .toFile(`${outputFolder}/${file.split(".")[0]}.webp`)
      .then(() => console.log(`Optimized ${file}`));
  }
});
