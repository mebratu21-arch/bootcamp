// Exercise 1: Divisible by Three
console.log("=== Exercise 1: Divisible by Three ===");
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
    let isDivisible = numbers[i] % 3 === 0;
    console.log(`${numbers[i]} is divisible by 3: ${isDivisible}`);
}

// Exercise 2: Attendance
console.log("\n=== Exercise 2: Attendance ===");
let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
};

// For demonstration, we'll simulate the prompt with a test name
let testNames = ["Randy", "Karla", "John", "Wendy", "Alice"];

for (let i = 0; i < testNames.length; i++) {
    let studentName = testNames[i];
    
    if (studentName.toLowerCase() in guestList) {
        let country = guestList[studentName.toLowerCase()];
        console.log(`Hi! I'm ${studentName}, and I'm from ${country}.`);
    } else {
        console.log(`Hi! I'm a guest. (Name: ${studentName})`);
    }
}

// Exercise 3: Playing with Numbers
console.log("\n=== Exercise 3: Playing with Numbers ===");
let age = [20, 5, 12, 43, 98, 55];

// 1. Sum of all numbers
let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum += age[i];
}
console.log(`Sum of all ages: ${sum}`);

// 2. Highest age in the array
let highestAge = age[0];
for (let i = 1; i < age.length; i++) {
    if (age[i] > highestAge) {
        highestAge = age[i];
    }
}
console.log(`Highest age: ${highestAge}`);

// Additional: Show all ages
console.log("All ages:", age.join(", "));