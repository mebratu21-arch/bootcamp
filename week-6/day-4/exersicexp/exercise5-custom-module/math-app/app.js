// app.js
const _ = require("lodash");
const math = require("./math");

console.log("Addition:", math.add(5, 3));
console.log("Multiplication:", math.multiply(4, 2));

// Using lodash
const numbers = [10, 20, 30, 40];
console.log("Sum using lodash:", _.sum(numbers));
