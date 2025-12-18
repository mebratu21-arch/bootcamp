const fileInfo = require('./file-info.js');

console.log('======================================');
console.log('    FILE MANAGEMENT EXERCISE');
console.log('======================================\n');

// Call the function to display file information
const fileExists = fileInfo.getFileInfo();

console.log('\n' + '='.repeat(40));
if (fileExists) {
  console.log(' File information displayed successfully!');
} else {
  console.log(' File not found. Please check the path.');
}

// Additional: Demonstrate path module features
console.log('\n' + '='.repeat(40));
console.log('PATH MODULE DEMONSTRATION');
console.log('='.repeat(40));

const path = require('path');

const samplePath = '/users/documents/node/exercise/data/example.txt';
console.log(`Sample path: ${samplePath}`);
console.log(`Directory name: ${path.dirname(samplePath)}`);
console.log(`File name: ${path.basename(samplePath)}`);
console.log(`File extension: ${path.extname(samplePath)}`);
console.log(`Parsed path:`, path.parse(samplePath));