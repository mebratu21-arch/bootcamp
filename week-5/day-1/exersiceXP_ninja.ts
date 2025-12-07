//  Exercise 1: Conditional Types
// Define a conditional type
type MappedType<T> = T extends number ? number : T extends string ? number : never;

// Implement the function
function mapType<T extends number | string>(value: T): MappedType<T> {
    if (typeof value === "number") {
        return (value * value) as MappedType<T>; // square if number
    } else {
        return value.length as MappedType<T>; // length if string
    }
}

// Test the function
console.log(mapType(5));        // Output: 25 (number squared)
console.log(mapType("Mebratu")); // Output: 7 (length of string)


//  Exercise 2: Keyof and Lookup Types
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Test the function
const person = { name: "Alice", age: 25, city: "London" };
console.log(getProperty(person, "name")); // Output: Alice
console.log(getProperty(person, "age"));  // Output: 25
console.log(getProperty(person, "city")); // Output: London


//  Exercise 3: Using Interfaces with Numeric Properties
interface HasNumericProperty {
    [key: string]: number; // dynamic numeric properties
}

function multiplyProperty<T extends HasNumericProperty, K extends keyof T>(
    obj: T,
    key: K,
    factor: number
): number {
    return obj[key] * factor;
}

// Test the function
const stats = { height: 180, weight: 75, age: 30 };
console.log(multiplyProperty(stats, "height", 2)); // Output: 360
console.log(multiplyProperty(stats, "weight", 3)); // Output: 225
console.log(multiplyProperty(stats, "age", 5));    // Output: 150
