// scripts/delete-originals.cjs
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "..", "public", "optimized"); // change if needed

if (!fs.existsSync(inputDir)) {
  console.error("❌ Folder not found:", inputDir);
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

function removeOriginal(file) {
  if (/\.(jpe?g|png)$/i.test(file)) {
    fs.unlinkSync(file);
    console.log("🗑️ Deleted:", path.basename(file));
  }
}

(() => {
  const files = getFiles(inputDir);
  if (!files.length) {
    console.log("⚠️ No files found in", inputDir);
    return;
  }
  console.log("📂 Found", files.length, "files. Removing originals...");
  files.forEach(removeOriginal);
  console.log("✅ Cleanup done! Only .webp files remain.");
})();
