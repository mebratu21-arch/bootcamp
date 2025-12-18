// app.js
const { readFile, writeFile } = require("./fileManager");

const content = readFile("Hello World.txt");
console.log("Read from file:", content);

writeFile("Bye World.txt", "Writing to the file");
console.log("File written successfully!");
