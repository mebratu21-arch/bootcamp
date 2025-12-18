const path = require('path');
const fs = require('fs');

function getFileInfo() {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  
  console.log('File path:', filePath);
  console.log('Exists:', fs.existsSync(filePath));
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
  }
}

module.exports = { getFileInfo };