// file-info.js
const fs = require("fs");
const path = require("path");

function getFileInfo() {
  // Create path to example.txt inside data directory
  const filePath = path.join(__dirname, "data", "example.txt");

  // Check if file exists
  const exists = fs.existsSync(filePath);
  console.log("File exists:", exists);

  if (exists) {
    const stats = fs.statSync(filePath);
    console.log("File size:", stats.size, "bytes");
    console.log("Created at:", stats.birthtime);
  }
}

module.exports = getFileInfo;
