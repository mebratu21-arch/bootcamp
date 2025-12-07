// Function to validate if a value matches one of the allowed types
function validateUnionType(value: any, allowedTypes: string[]): boolean {
    const valueType = typeof value;
    return allowedTypes.includes(valueType);
}

// Test cases
console.log(validateUnionType(42, ["number", "string"]));       // true (number is allowed)
console.log(validateUnionType("Hello", ["number", "string"]));  // true (string is allowed)
console.log(validateUnionType(true, ["number", "string"]));     // false (boolean not allowed)
console.log(validateUnionType({ name: "Alice" }, ["object"]));  // true (object is allowed)
console.log(validateUnionType(null, ["object"]));               // true (typeof null is "object")
console.log(validateUnionType(undefined, ["undefined"]));       // true
