//  Exercise 1: Union Types
function processValue(value: string | number): string {
    if (typeof value === "number") {
        // Format as currency
        return `$${value.toFixed(2)}`;
    } else {
        // Reverse the string
        return value.split("").reverse().join("");
    }
}

// Test the function
console.log(processValue(100));        // Output: $100.00
console.log(processValue("Mebratu"));  // Output: utarbeM


//  Exercise 2: Array Type Annotations
function sumNumbersInArray(arr: (number | string)[]): number {
    let sum = 0;
    for (const item of arr) {
        if (typeof item === "number") {
            sum += item;
        }
    }
    return sum;
}

// Test the function
console.log(sumNumbersInArray([1, 2, "a", 3]));        // Output: 6
console.log(sumNumbersInArray(["x", 10, 20, "y"]));    // Output: 30
console.log(sumNumbersInArray(["a", "b", "c"]));       // Output: 0


//  Exercise 3: Type Aliases
type AdvancedUser = {
    name: string;
    age: number;
    address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
    if (user.address) {
        return `Hello, ${user.name}! You are ${user.age} years old and live at ${user.address}.`;
    }
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// Test the function
console.log(introduceAdvancedUser({ name: "Alice", age: 25 }));
// Output: Hello, Alice! You are 25 years old.

console.log(introduceAdvancedUser({ name: "Bob", age: 40, address: "123 Main St" }));
// Output: Hello, Bob! You are 40 years old and live at 123 Main St.


//  Exercise 4: Optional Parameters
function welcomeUser(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

// Test the function
console.log(welcomeUser("Mebratu"));               // Output: Hello, Mebratu!
console.log(welcomeUser("Mebratu", "Welcome"));    // Output: Welcome, Mebratu!
