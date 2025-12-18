// Require lodash package and custom math module
const _ = require('lodash');
const math = require('./math.js');

// Sample data
const numbers = [2, 4, 6, 8, 10, 3, 5, 7, 9];

console.log('=== Math Operations ===\n');

// Using custom math module
console.log('Using custom math module:');
console.log(`Numbers: [${numbers}]`);
console.log(`Sum: ${math.add(numbers)}`);
console.log(`Product: ${math.multiply([2, 3, 4])}`); // Just first 4 numbers
console.log(`Average: ${math.average(numbers).toFixed(2)}`);
console.log(`Maximum: ${math.findMax(numbers)}`);
console.log(`Minimum: ${math.findMin(numbers)}`);

// Using lodash utilities
console.log('\nUsing lodash utilities:');
console.log(`Shuffled numbers: [${_.shuffle(numbers)}]`);
console.log(`Unique values from [1, 2, 2, 3, 4, 4, 5]: [${_.uniq([1, 2, 2, 3, 4, 4, 5])}]`);
console.log(`Chunked array:`, _.chunk(numbers, 3));

// Combined usage
console.log('\nCombined operations:');
const squaredNumbers = numbers.map(n => n * n);
console.log(`Squared numbers: [${squaredNumbers}]`);
console.log(`Sum of squares: ${math.add(squaredNumbers)}`);
console.log(`Maximum square: ${math.findMax(squaredNumbers)}`);