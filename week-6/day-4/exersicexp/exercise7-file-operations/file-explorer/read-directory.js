const fs = require('fs').promises;
const path = require('path');

async function readDirectory(directoryPath) {
  try {
    // Read the directory contents
    const files = await fs.readdir(directoryPath);
    
    console.log(`\nContents of directory: ${path.resolve(directoryPath)}`);
    console.log('='.repeat(50));
    
    if (files.length === 0) {
      console.log('Directory is empty');
      return;
    }
    
    // Get detailed information about each file
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      try {
        const stats = await fs.stat(filePath);
        const sizeInKB = (stats.size / 1024).toFixed(2);
        const type = stats.isDirectory() ? 'Directory' : 'File';
        const modified = stats.mtime.toLocaleString();
        
        console.log(`${type.padEnd(10)} ${file.padEnd(30)} Size: ${sizeInKB.toString().padStart(8)} KB  Modified: ${modified}`);
      } catch (err) {
        console.log(`Error reading ${file}: ${err.message}`);
      }
    }
    
    console.log('\nSummary:');
    console.log(`Total items: ${files.length}`);
    
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error.message);
  }
}

// Read current directory
readDirectory('.');