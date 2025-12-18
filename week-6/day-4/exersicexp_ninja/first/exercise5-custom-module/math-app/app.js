const _ = require('lodash');
const math = require('./math.js');

const numbers = [1, 2, 3, 4, 5];
console.log('Sum:', math.add(numbers));
console.log('Product:', math.multiply([2, 3, 4]));
console.log('Shuffled:', _.shuffle(numbers));