const { minutesLived } = require('./date');

// Hardcoded birthdate
console.log(minutesLived('1995-02-26'));
const prompt = require('prompt-sync')();
const { minutesLived } = require('./date');

const birthdate = prompt("Enter your birthdate (YYYY-MM-DD): ");
console.log(minutesLived(birthdate));
