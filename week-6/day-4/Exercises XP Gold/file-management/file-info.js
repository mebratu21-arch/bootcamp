const path = require('path');
const fs = require('fs');

function getFileInfo() {
  // Create file path using path.join
  const filePath = path.join(__dirname, 'data', 'example.txt');
  
  console.log('=== File Information ===');
  console.log(`File path: ${filePath}`);
  
  // Check if file exists
  const fileExists = fs.existsSync(filePath);
  console.log(`File exists: ${fileExists ? 'Yes' : 'No'}`);
  
  if (fileExists) {
    try {
      // Get file statistics
      const stats = fs.statSync(filePath);
      
      // Display file information
      console.log(`File size: ${stats.size} bytes`);
      console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log(`Created at: ${stats.birthtime.toLocaleString()}`);
      console.log(`Last modified: ${stats.mtime.toLocaleString()}`);
      
      // Additional information
      console.log('\n=== Additional Details ===');
      console.log(`Is directory: ${stats.isDirectory()}`);
      console.log(`Is file: ${stats.isFile()}`);
      console.log(`File permissions: ${stats.mode.toString(8).slice(-3)}`);
      
      // Read and display first few lines
      console.log('\n=== File Preview (first 3 lines) ===');
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').slice(0, 3);
      lines.forEach((line, index) => {
        console.log(`Line ${index + 1}: ${line}`);
      });
      
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
    }
  } else {
    console.log('File does not exist. Please create it first.');
  }
  
  return fileExists;
}

// Export the function
module.exports = { getFileInfo };