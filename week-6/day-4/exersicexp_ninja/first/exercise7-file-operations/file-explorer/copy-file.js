const fs = require('fs').promises;

async function copyFile() {
  try {
    const content = await fs.readFile('source.txt', 'utf-8');
    await fs.writeFile('destination.txt', content);
    console.log('File copied successfully');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

copyFile();