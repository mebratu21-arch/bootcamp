// copy-file.js
const fs = require("fs");

const content = fs.readFileSync("source.txt", "utf-8");
fs.writeFileSync("destination.txt", content);

console.log("File copied successfully!");
