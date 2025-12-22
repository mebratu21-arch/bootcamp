const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../tasks.json");

exports.readFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading tasks file");
  }
};

exports.writeFile = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error("Error writing tasks file");
  }
};
