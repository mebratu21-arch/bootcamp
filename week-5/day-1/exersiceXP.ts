//  Exercise 1: Hello, World! Program
console.log("Hello, World!"); 
// Output: Hello, World!

//  Exercise 2: Type Annotations
let age: number = 30;
let name: string = "Mebratu";
console.log("Name:", name, "Age:", age); 
// Output: Name: Mebratu Age: 30

//  Exercise 3: Union Types
let id: string | number;
id = 123;
console.log("ID as number:", id); 
id = "ABC123";
console.log("ID as string:", id); 
// Output: ID as number: 123
// Output: ID as string: ABC123

//  Exercise 4: Control Flow with if...else
function checkNumber(num: number): string {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}
console.log(checkNumber(10));  // Positive
console.log(checkNumber(-5));  // Negative
console.log(checkNumber(0));   // Zero

//  Exercise 5: Tuple Types
function getDetails(name: string, age: number): [string, number, string] {
    return [name, age, `Hello, ${name}! You are ${age} years old.`];
}
const details = getDetails("Alice", 25);
console.log(details); 
// Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']

//  Exercise 6: Object Type Annotations
type Person = {
    name: string;
    age: number;
};

function createPerson(name: string, age: number): Person {
    return { name, age };
}
const person = createPerson("Bob", 40);
console.log(person); 
// Output: { name: 'Bob', age: 40 }

//  Exercise 7: Type Assertions
// Assuming there is an HTML element with id="username" in the DOM
// <input id="username" type="text" />
const inputElement = document.getElementById("username") as HTMLInputElement;
if (inputElement) {
    inputElement.value = "Mebratu";
    console.log("Input value set to:", inputElement.value);
}
// Output (in browser console): Input value set to: Mebratu

//  Exercise 8: switch Statement with Complex Conditions
function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}
console.log(getAction("admin"));   // Manage users and settings
console.log(getAction("editor"));  // Edit content
console.log(getAction("viewer"));  // View content
console.log(getAction("guest"));   // Limited access
console.log(getAction("unknown")); // Invalid role

//  Exercise 9: Function Overloading with Default Parameters
function greet(): string;
function greet(name: string): string;
function greet(name?: string): string {
    if (name) {
        return `Hello, ${name}!`;
    } else {
        return "Hello, World!";
    }
}
console.log(greet());          // Hello, World!
console.log(greet("Mebratu")); // Hello, Mebratu!
