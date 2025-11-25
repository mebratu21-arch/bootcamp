/************************************************************
 *  EXERCISES XP GOLD – FULL CORRECT SOLUTION
 ************************************************************/

/***********************
 * Exercise 1: Variables
 ************************/
let x = 5;
let y = 10;
console.log("x + y =", x + y);


/***********************
 * Exercise 2: Conditionals
 ************************/
let age = 17;

if (age >= 18) {
    console.log("You can drive");
} else {
    console.log("You cannot drive");
}


/***********************
 * Exercise 3: Loops
 ************************/
// Print all numbers from 0 to 50
for (let i = 0; i <= 50; i++) {
    console.log(i);
}


/***********************
 * Exercise 4: Functions
 ************************/
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Aman"));


/***********************
 * Exercise 5: DOM Selectors
 ************************/
// Must be used in an HTML page with <p id="demo">Hello</p>

function changeText() {
    const element = document.querySelector("#demo");
    if (element) {
        element.textContent = "Text updated using querySelector!";
    }
}

// Call only when DOM is ready
document.addEventListener("DOMContentLoaded", changeText);


/***********************
 * Exercise 6: Shopping List
 ************************/
let shoppingList = ["Milk", "Bread", "Eggs"];

// Add item
function addItem(item) {
    shoppingList.push(item);
}

// Remove item
function removeItem(item) {
    shoppingList = shoppingList.filter(x => x !== item);
}

// Display list
function displayList() {
    console.log("Shopping List:", shoppingList.join(", "));
}

// Tests
addItem("Banana");
removeItem("Milk");
displayList();


/***********************
 * Exercise 7: Change Calculation
 ************************/
function changeEnough(itemPrice, amountOfChange) {
    // amountOfChange = [quarters, dimes, nickels, pennies]
    const values = [0.25, 0.10, 0.05, 0.01];

    let total = 0;
    for (let i = 0; i < amountOfChange.length; i++) {
        total += amountOfChange[i] * values[i];
    }

    return total >= itemPrice;
}

// Test
console.log(changeEnough(4.25, [20, 0, 0, 0])); // true


/***********************
 * Exercise 8: Vacation Costs
 ************************/

function hotelCost(nights) {
    return nights * 140;
}

function planeRideCost(destination) {
    destination = destination.toLowerCase();
    if (destination === "london") return 183;
    if (destination === "paris") return 220;
    return 300;
}

function rentalCarCost(days) {
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}

function totalVacationCost(nights, destination, days) {
    return hotelCost(nights) +
           planeRideCost(destination) +
           rentalCarCost(days);
}

// Test
console.log(totalVacationCost(5, "London", 12));


/***********************
 * Exercise 9: Users List Operations
 ************************/
let users = [
    { username: "Yoni", age: 25 },
    { username: "Sara", age: 30 },
    { username: "Aman", age: 28 }
];

// Add user
function addUser(username, age) {
    users.push({ username, age });
}

// Update user
function updateUser(username, newAge) {
    for (let user of users) {
        if (user.username === username) {
            user.age = newAge;
        }
    }
}

// Delete user
function deleteUser(username) {
    users = users.filter(user => user.username !== username);
}

// View all users
function viewUsers() {
    console.log("Users:", users);
}

// Tests
addUser("Meri", 22);
updateUser("Aman", 29);
deleteUser("Sara");
viewUsers();

