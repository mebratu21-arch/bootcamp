const fs = require('fs').promises;

// Read file function
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    throw error;
  }
}

// Write file function
async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error.message);
    throw error;
  }
}

// Export functions
module.exports = {
  readFile,
  writeFile
};