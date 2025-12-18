// read-file.js
const fs = require("fs");
const path = require("path");

function readFile() {
  const filePath = path.join(__dirname, "files", "file-data.txt");
  const content = fs.readFileSync(filePath, "utf-8");
  console.log("File Content:\n", content);
}

module.exports = readFile;
