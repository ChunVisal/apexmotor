// scripts/optimize-images.cjs
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "..", "public", "optimized");

if (!fs.existsSync(inputDir)) {
  console.error("❌ Input folder not found:", inputDir);
  process.exit(1);
}

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

async function convert(file) {
  const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
  if (fs.existsSync(out)) {
    console.log("⏭️ Skipped:", path.basename(out));
    return;
  }
  try {
    await sharp(file).webp({ quality: 80 }).toFile(out);
    console.log("✅ Converted:", path.basename(out));
  } catch (err) {
    console.error("❌ Error:", file, err.message);
  }
}

(async () => {
  const files = getFiles(inputDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (!files.length) {
    console.log("⚠️ No JPG/PNG files found in", inputDir);
    return;
  }
  console.log("📂 Found", files.length, "files. Converting...");
  for (const f of files) {
    await convert(f);
  }
  console.log("🎉 All conversions done.");
})();
