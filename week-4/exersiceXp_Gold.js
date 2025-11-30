// ================================
//  Exercise 1: printFullName
// ================================
function printFullName({first, last}) {
    return `Your full name is ${first} ${last}`;
}

// Test
console.log(printFullName({first: 'Elie', last:'Schoppik'}));
// Output: 'Your full name is Elie Schoppik'


// ================================
//  Exercise 2: keys and values
// ================================
function keysAndValues(obj) {
    const keys = Object.keys(obj).sort();           // sort keys alphabetically
    const values = keys.map(key => obj[key]);       // map values in same order
    return [keys, values];
}

// Tests
console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
// [["a", "b", "c"], [1, 2, 3]]

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// [["a", "b", "c"], ["Apple", "Microsoft", "Google"]]

console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// [["key1", "key2", "key3"], [true, false, undefined]]


// ================================
//  Exercise 3: Counter class
// ================================
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

// Create instance
const counterOne = new Counter();
counterOne.increment(); // count = 1
counterOne.increment(); // count = 2

const counterTwo = counterOne; // both references point to the same object
counterTwo.increment(); // count = 3

console.log(counterOne.count); // 3
