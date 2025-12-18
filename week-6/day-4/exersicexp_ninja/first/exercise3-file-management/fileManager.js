const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    throw error;
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`Written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
    throw error;
  }
}

module.exports = { readFile, writeFile };