// ==================== EXERCISE 1: Intersection Types ====================

type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

// Intersection type combining Person and Address
type PersonWithAddress = Person & Address;

// Create a variable of this type
const personWithAddress: PersonWithAddress = {
  name: "John Doe",
  age: 30,
  street: "123 Main St",
  city: "New York"
};

console.log("Exercise 1 - Intersection Types:");
console.log(personWithAddress);

// ==================== EXERCISE 2: Type Guards with Union Types ====================

function describeValue(value: number | string): string {
  // Type guard using typeof
  if (typeof value === "number") {
    return "This is a number";
  } else if (typeof value === "string") {
    return "This is a string";
  }
  
  // TypeScript knows this is never reached, but we handle it anyway
  return "Unexpected type";
}

console.log("\nExercise 2 - Type Guards:");
console.log(describeValue(42)); // This is a number
console.log(describeValue("Hello")); // This is a string

// ==================== EXERCISE 3: Type Casting ====================

let someValue: any = "This is a string value";

// Method 1: Using angle bracket syntax
let stringValue1: string = <string>someValue;

// Method 2: Using 'as' syntax (preferred in JSX/TSX)
let stringValue2: string = someValue as string;

// Using the cast value as a string
console.log("\nExercise 3 - Type Casting:");
console.log(stringValue1.toUpperCase());
console.log(stringValue2.length);

// ==================== EXERCISE 4: Type Assertions with Union Types ====================

function getFirstElement(arr: (number | string)[]): string {
  // Type assertion to tell TypeScript we want to treat the first element as string
  const firstElement = arr[0] as string;
  return firstElement;
}

// Test with arrays of mixed types
console.log("\nExercise 4 - Type Assertions:");
const mixedArray1 = [1, 2, 3, "four"];
console.log(getFirstElement(mixedArray1)); // Returns "1" (number cast to string)

const mixedArray2 = ["first", 2, 3];
console.log(getFirstElement(mixedArray2)); // Returns "first"

// Safer version with type checking
function getFirstElementSafe(arr: (number | string)[]): string {
  const firstElement = arr[0];
  
  // Check if it's already a string
  if (typeof firstElement === "string") {
    return firstElement;
  }
  
  // Convert number to string
  return firstElement.toString();
}

console.log("\nSafer version:");
console.log(getFirstElementSafe(mixedArray1)); // Returns "1"
console.log(getFirstElementSafe(mixedArray2)); // Returns "first"

// ==================== EXERCISE 5: Generic Constraints ====================

// Define an interface with length property
interface Lengthwise {
  length: number;
}

// Generic function with constraint
function logLength<T extends Lengthwise>(input: T): void {
  console.log(`Length: ${input.length}`);
}

console.log("\nExercise 5 - Generic Constraints:");
logLength("Hello World"); // String has length
logLength([1, 2, 3, 4, 5]); // Array has length

// This would cause a compile error:
// logLength(42); // Error: number doesn't have length property

// Alternative with more flexibility
function logLengthAlt<T extends { length: number }>(input: T): void {
  console.log(`Length: ${input.length}`);
}

// Works the same way
logLengthAlt({ length: 10, name: "Custom object" });

// ==================== EXERCISE 6: Intersection Types and Type Guards ====================

type Person2 = {
  name: string;
  age: number;
};

type Job = {
  position: string;
  department: string;
};

// Intersection type
type Employee = Person2 & Job;

// Custom type guards
function isManager(job: Job): boolean {
  return job.position.toLowerCase() === "manager";
}

function isDeveloper(job: Job): boolean {
  return job.position.toLowerCase() === "developer";
}

function describeEmployee(employee: Employee): string {
  if (isManager(employee)) {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  } else if (isDeveloper(employee)) {
    return `${employee.name} is a Developer in the ${employee.department} department.`;
  } else {
    return `${employee.name} is a ${employee.position} in the ${employee.department} department.`;
  }
}

console.log("\nExercise 6 - Intersection Types and Type Guards:");

const manager: Employee = {
  name: "Alice Johnson",
  age: 35,
  position: "Manager",
  department: "Engineering"
};

const developer: Employee = {
  name: "Bob Smith",
  age: 28,
  position: "Developer",
  department: "Product"
};

const designer: Employee = {
  name: "Charlie Brown",
  age: 32,
  position: "Designer",
  department: "UX"
};

console.log(describeEmployee(manager));
console.log(describeEmployee(developer));
console.log(describeEmployee(designer));

// ==================== EXERCISE 7: Type Assertions and Generic Constraints ====================

// Interface for objects with toString method
interface HasToString {
  toString(): string;
}

// Generic function with constraint and type assertion
function formatInput<T extends HasToString>(input: T): string {
  // Type assertion to string since we know it has toString()
  const stringInput = input.toString() as string;
  
  // Format the string (example: add prefix and make uppercase)
  return `Formatted: ${stringInput.toUpperCase()}`;
}

console.log("\nExercise 7 - Type Assertions and Generic Constraints:");

// Test with different types that have toString()
console.log(formatInput(42)); // Number has toString()
console.log(formatInput("hello world")); // String has toString()
console.log(formatInput(true)); // Boolean has toString()
console.log(formatInput([1, 2, 3])); // Array has toString()

// Custom object with toString
class CustomObject {
  constructor(public value: number) {}
  
  toString(): string {
    return `CustomObject with value ${this.value}`;
  }
}

console.log(formatInput(new CustomObject(100)));

// Alternative implementation without type assertion (cleaner)
function formatInputAlt<T extends HasToString>(input: T): string {
  // No need for type assertion since toString() returns string
  const stringInput = input.toString();
  return `Formatted: ${stringInput.toUpperCase()}`;
}

console.log("\nAlternative implementation:");
console.log(formatInputAlt(42));
console.log(formatInputAlt("test"));

// ==================== BONUS: Practical Example Combining All Concepts ====================

// Combined example using intersections, unions, type guards, and generics
type Admin = Person & {
  role: 'admin';
  permissions: string[];
};

type Customer = Person & {
  role: 'customer';
  customerId: string;
};

type SystemUser = Admin | Customer;

// Type guard using discriminated union
function isAdmin(user: SystemUser): user is Admin {
  return user.role === 'admin';
}

function handleUser<T extends SystemUser>(user: T): string {
  if (isAdmin(user)) {
    return `Admin ${user.name} has ${user.permissions.length} permissions`;
  } else {
    return `Customer ${user.name} has ID: ${user.customerId}`;
  }
}

console.log("\nBonus - Combined Example:");

const adminUser: Admin = {
  name: "Admin User",
  age: 40,
  role: 'admin',
  permissions: ['read', 'write', 'delete']
};

const customerUser: Customer = {
  name: "Customer User",
  age: 30,
  role: 'customer',
  customerId: "CUST-12345"
};

console.log(handleUser(adminUser));
console.log(handleUser(customerUser));

// Summary of all exercises
console.log("\n=== SUMMARY ===");
console.log("1. Intersection Types: Combine multiple types");
console.log("2. Type Guards: Safely narrow types at runtime");
console.log("3. Type Casting: Convert between types with assertions");
console.log("4. Type Assertions: Tell TypeScript the type when you know better");
console.log("5. Generic Constraints: Limit generic types to certain shapes");
console.log("6. Combining Intersections & Guards: Handle complex types safely");
console.log("7. Assertions with Constraints: Refine types in generic functions");