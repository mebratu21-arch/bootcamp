const { greet } = require('./greeting');
const { colorfulMessage } = require('./colorful-message');
const { readFile } = require('./read-file');

console.log('--- Challenge: Complete Daily Challenge ---');

// Greet user
console.log(greet('Aman'));

// Display colorful messages
colorfulMessage();

// Display file content
readFile();
