const fs = require('fs').promises;

async function copyFile(sourcePath, destinationPath) {
  try {
    // Read content from source file
    const content = await fs.readFile(sourcePath, 'utf-8');
    
    // Write content to destination file
    await fs.writeFile(destinationPath, content, 'utf-8');
    
    console.log(`Successfully copied content from ${sourcePath} to ${destinationPath}`);
    
    // Verify by reading back
    const copiedContent = await fs.readFile(destinationPath, 'utf-8');
    console.log(`Content in ${destinationPath}: "${copiedContent}"`);
    
  } catch (error) {
    console.error('Error during file operation:', error.message);
  }
}

// Create source.txt if it doesn't exist and then copy
async function main() {
  try {
    // Check if source.txt exists, create it if not
    try {
      await fs.access('source.txt');
    } catch {
      // File doesn't exist, create it
      await fs.writeFile('source.txt', 'This is the original content from source.txt\nCreated for file copying exercise.', 'utf-8');
      console.log('Created source.txt with initial content');
    }
    
    // Perform the copy operation
    await copyFile('source.txt', 'destination.txt');
    
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();