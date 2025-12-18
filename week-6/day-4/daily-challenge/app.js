const { greet } = require('./greeting');
const { colorfulMessage } = require('./colorful-message');
const { readFile } = require('./read-file');

// Task 1: Greeting
console.log('--- Task 1: Greeting ---');
console.log(greet('Aman'));

// Task 2: Colorful Message
console.log('\n--- Task 2: Colorful Message ---');
colorfulMessage();

// Task 3: Read File
console.log('\n--- Task 3: Read File ---');
readFile();
