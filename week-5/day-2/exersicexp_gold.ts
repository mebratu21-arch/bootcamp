// ==================== EXERCISE 1: Class Inheritance with Protected Access Modifiers ====================
console.log("=== Exercise 1: Class Inheritance with Protected Access Modifiers ===");

// Base class Employee
class Employee {
    // Protected properties - accessible within class and subclasses
    protected name: string;
    protected salary: number;

    // Constructor to initialize protected properties
    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    // Method to get employee details
    public getDetails(): string {
        return `Name: ${this.name}, Salary: $${this.salary}`;
    }

    // Protected method - can be used by subclasses
    protected getFormattedSalary(): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(this.salary);
    }
}

// Derived class Manager that extends Employee
class Manager extends Employee {
    // Public property specific to Manager
    public department: string;

    constructor(name: string, salary: number, department: string) {
        // Call parent constructor using super()
        super(name, salary);
        this.department = department;
    }

    // Override the getDetails() method
    public getDetails(): string {
        // Can access protected properties from parent class
        const salaryFormatted = this.getFormattedSalary();
        return `Name: ${this.name}, Salary: ${salaryFormatted}, Department: ${this.department}`;
    }

    // Additional method specific to Manager
    public manageTeam(): string {
        return `${this.name} is managing the ${this.department} department`;
    }
}

// Another derived class for demonstration
class Developer extends Employee {
    public programmingLanguage: string;

    constructor(name: string, salary: number, programmingLanguage: string) {
        super(name, salary);
        this.programmingLanguage = programmingLanguage;
    }

    // Override getDetails() for Developer
    public getDetails(): string {
        return `${super.getDetails()}, Programming Language: ${this.programmingLanguage}`;
    }

    // Developer-specific method
    public writeCode(): string {
        return `${this.name} is writing ${this.programmingLanguage} code`;
    }
}

// Testing Exercise 1
console.log("Creating Employee instances:");
const emp = new Employee("John Doe", 50000);
console.log(emp.getDetails());

console.log("\nCreating Manager instance:");
const manager = new Manager("Alice Johnson", 80000, "Engineering");
console.log(manager.getDetails()); // Overridden method
console.log(manager.manageTeam());
// console.log(manager.name); // Error: Property 'name' is protected
console.log(`Department: ${manager.department}`); // Public property accessible

console.log("\nCreating Developer instance:");
const developer = new Developer("Bob Smith", 70000, "TypeScript");
console.log(developer.getDetails());
console.log(developer.writeCode());



// ==================== EXERCISE 2: Using Readonly with Access Modifiers ====================
console.log("\n\n=== Exercise 2: Using Readonly with Access Modifiers ===");

class Car {
    // Readonly and public property - can be read from anywhere but not modified
    public readonly make: string;

    // Readonly and private property - can only be accessed within the class
    private readonly model: string;

    // Public property (not readonly, so it can be modified)
    public year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Method to get car details
    public getCarDetails(): string {
        // Can access private readonly property within the class
        return `Car: ${this.make} ${this.model}, Year: ${this.year}`;
    }

    // Method to get model (since it's private, we need a getter)
    public getModel(): string {
        return this.model;
    }

    // Attempt to modify readonly properties (commented out to show it would cause errors)
    public attemptModifications(): void {
        console.log("Attempting to modify properties...");

        // Trying to modify readonly public property
        // this.make = "New Make"; // Error: Cannot assign to 'make' because it is a read-only property

        // Trying to modify readonly private property  
        // this.model = "New Model"; // Error: Cannot assign to 'model' because it is a read-only property

        // Can modify non-readonly property
        this.year = 2022; // This works fine
        console.log(`Year modified to: ${this.year}`);
    }
}

// Testing Exercise 2
console.log("Creating Car instance:");
const myCar = new Car("Toyota", "Camry", 2020);
console.log(myCar.getCarDetails());

// Accessing readonly public property
console.log(`Car make: ${myCar.make}`);

// Trying to access private readonly property (will cause error)
// console.log(`Car model: ${myCar.model}`); // Error: Property 'model' is private

// Using getter to access private property
console.log(`Car model (via getter): ${myCar.getModel()}`);

// Modifying non-readonly property
myCar.year = 2021;
console.log(`Updated year: ${myCar.year}`);
console.log(myCar.getCarDetails());

// Attempting to modify readonly properties
myCar.attemptModifications();

// Trying to modify readonly property from outside (commented to avoid error)
// myCar.make = "Honda"; // Error: Cannot assign to 'make' because it is a read-only property



// ==================== EXERCISE 3: Static Properties and Methods in Classes ====================
console.log("\n\n=== Exercise 3: Static Properties and Methods in Classes ===");

class MathUtils {
    // Static property - belongs to the class itself
    public static readonly PI: number = 3.14159;

    // Another static property to track usage
    private static usageCount: number = 0;

    // Static method to calculate circumference
    public static circumference(radius: number): number {
        MathUtils.incrementUsageCount();
        return 2 * MathUtils.PI * radius;
    }

    // Static method to calculate area of a circle
    public static areaOfCircle(radius: number): number {
        MathUtils.incrementUsageCount();
        return MathUtils.PI * radius * radius;
    }

    // Static method to calculate area of a rectangle
    public static areaOfRectangle(width: number, height: number): number {
        MathUtils.incrementUsageCount();
        return width * height;
    }

    // Private static method - can only be called within the class
    private static incrementUsageCount(): void {
        MathUtils.usageCount++;
    }

    // Public static method to get usage count
    public static getUsageCount(): number {
        return MathUtils.usageCount;
    }

    // Instance method (for comparison)
    public instanceMethod(): string {
        return "This is an instance method";
    }
}

// Testing Exercise 3
console.log("Using static properties and methods:");

// Accessing static property directly on the class
console.log(`Value of PI: ${MathUtils.PI}`);

// Using static methods without creating an instance
const radius = 5;
console.log(`Circumference of circle with radius ${radius}: ${MathUtils.circumference(radius).toFixed(2)}`);
console.log(`Area of circle with radius ${radius}: ${MathUtils.areaOfCircle(radius).toFixed(2)}`);

const width = 4, height = 6;
console.log(`Area of rectangle ${width}x${height}: ${MathUtils.areaOfRectangle(width, height)}`);

// Using the static method again
console.log(`Circumference with radius 10: ${MathUtils.circumference(10).toFixed(2)}`);

// Getting usage count
console.log(`MathUtils usage count: ${MathUtils.getUsageCount()}`);

// Cannot access private static property
// console.log(MathUtils.usageCount); // Error: Property 'usageCount' is private

// Creating an instance to show the difference
const mathUtilsInstance = new MathUtils();
console.log(mathUtilsInstance.instanceMethod()); // Instance method works
// console.log(mathUtilsInstance.PI); // Error: Property 'PI' does not exist on type 'MathUtils'

// Example of another class with static properties
class Configuration {
    public static readonly API_URL: string = "https://api.example.com";
    public static readonly TIMEOUT: number = 5000;
    public static readonly MAX_RETRIES: number = 3;

    public static getEndpoint(endpoint: string): string {
        return `${Configuration.API_URL}/${endpoint}`;
    }
}

console.log(`\nConfiguration example:`);
console.log(`API URL: ${Configuration.API_URL}`);
console.log(`User endpoint: ${Configuration.getEndpoint("users")}`);



// ==================== EXERCISE 4: Interface with Function Types ====================
console.log("\n\n=== Exercise 4: Interface with Function Types ===");

// Interface defining a function type
interface Operation {
    // Function type that takes two numbers and returns a number
    (a: number, b: number): number;

    // Optional property for operation name
    operationName?: string;
}

// Class implementing the interface using a method
class Addition {
    // Method that matches the Operation signature
    public calculate: Operation = (a: number, b: number): number => {
        return a + b;
    };

    // Property to identify the operation
    public readonly name: string = "Addition";
}

// Another implementation approach
class Multiplication {
    // Implementing the Operation interface as a method
    public performOperation: Operation;

    constructor() {
        this.performOperation = (a: number, b: number): number => {
            return a * b;
        };

        // Adding property to the function (since Operation interface allows it)
        this.performOperation.operationName = "Multiplication";
    }
}

// Yet another approach - class with a method that matches the signature
class Subtraction {
    public execute: Operation;

    constructor() {
        this.execute = this.subtract;
        this.execute.operationName = "Subtraction";
    }

    private subtract(a: number, b: number): number {
        return a - b;
    }
}

// Class Division using a different pattern
class Division {
    public static operation: Operation = (a: number, b: number): number => {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    };
}

// Testing Exercise 4
console.log("Creating operation instances:");

const addition = new Addition();
console.log(`Addition: 10 + 5 = ${addition.calculate(10, 5)}`);
console.log(`Operation name: ${addition.name}`);

const multiplication = new Multiplication();
console.log(`Multiplication: 10 * 5 = ${multiplication.performOperation(10, 5)}`);
console.log(`Operation name: ${multiplication.performOperation.operationName}`);

const subtraction = new Subtraction();
console.log(`Subtraction: 10 - 5 = ${subtraction.execute(10, 5)}`);
console.log(`Operation name: ${subtraction.execute.operationName}`);

console.log(`Division: 10 / 5 = ${Division.operation(10, 5)}`);

// Using the interface directly as a type for variables
const powerOperation: Operation = (a: number, b: number): number => {
    return Math.pow(a, b);
};
powerOperation.operationName = "Power";

console.log(`Power: 2^3 = ${powerOperation(2, 3)}`);
console.log(`Operation name: ${powerOperation.operationName}`);

// Array of operations
const operations: Operation[] = [
    addition.calculate,
    multiplication.performOperation,
    subtraction.execute,
    Division.operation,
    powerOperation
];

console.log("\nExecuting all operations on numbers 8 and 2:");
operations.forEach((op, index) => {
    try {
        const result = op(8, 2);
        const name = op.operationName || `Operation ${index + 1}`;
        console.log(`${name}: 8 op 2 = ${result}`);
    } catch (error) {
        console.log(`Error in operation: ${error.message}`);
    }
});



// ==================== EXERCISE 5: Extending Interfaces with Optional and Readonly Properties ====================
console.log("\n\n=== Exercise 5: Extending Interfaces with Optional and Readonly Properties ===");

// Base interface
interface Shape {
    color: string;
    getArea(): number;
    getDescription?(): string; // Optional method
}

// Extended interface with readonly properties
interface Rectangle extends Shape {
    readonly width: number;   // Readonly property
    readonly height: number;  // Readonly property
    getPerimeter(): number;
}

// Another extended interface
interface Circle extends Shape {
    readonly radius: number;  // Readonly property
    getCircumference(): number;
}

// Class implementing Rectangle interface
class RectangleShape implements Rectangle {
    // Required properties from Shape
    public color: string;

    // Required readonly properties from Rectangle
    public readonly width: number;
    public readonly height: number;

    // Optional property (not in interface, but allowed)
    public name?: string;

    constructor(color: string, width: number, height: number, name?: string) {
        this.color = color;
        this.width = width;
        this.height = height;

        if (name) {
            this.name = name;
        }
    }

    // Implementing getArea() from Shape
    public getArea(): number {
        return this.width * this.height;
    }

    // Implementing getPerimeter() from Rectangle
    public getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    // Implementing optional method from Shape
    public getDescription(): string {
        const namePart = this.name ? ` (${this.name})` : '';
        return `Rectangle${namePart}: ${this.width} x ${this.height}, Color: ${this.color}`;
    }

    // Additional method not in the interface
    public isSquare(): boolean {
        return this.width === this.height;
    }
}

// Class implementing Circle interface
class CircleShape implements Circle {
    public color: string;
    public readonly radius: number;

    constructor(color: string, radius: number) {
        this.color = color;
        this.radius = radius;
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getCircumference(): number {
        return 2 * Math.PI * this.radius;
    }

    // Adding optional method
    public getDescription(): string {
        return `Circle: Radius ${this.radius}, Color: ${this.color}`;
    }
}

// Testing Exercise 5
console.log("Creating shapes:");

const rectangle = new RectangleShape("blue", 5, 3, "Blue Rectangle");
console.log(rectangle.getDescription());
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
console.log(`Is square? ${rectangle.isSquare()}`);

const square = new RectangleShape("red", 4, 4);
console.log(`\n${square.getDescription()}`);
console.log(`Area: ${square.getArea()}`);
console.log(`Is square? ${square.isSquare()}`);

const circle = new CircleShape("green", 7);
console.log(`\n${circle.getDescription()}`);
console.log(`Area: ${circle.getArea().toFixed(2)}`);
console.log(`Circumference: ${circle.getCircumference().toFixed(2)}`);

// Testing readonly properties
console.log("\nTesting readonly properties:");
console.log(`Rectangle width: ${rectangle.width}`);
// rectangle.width = 10; // Error: Cannot assign to 'width' because it is a read-only property

console.log(`Circle radius: ${circle.radius}`);
// circle.radius = 10; // Error: Cannot assign to 'radius' because it is a read-only property

// But we can modify non-readonly properties
rectangle.color = "dark blue";
console.log(`Updated rectangle color: ${rectangle.color}`);

// Function that accepts Shape interface
function printShapeInfo(shape: Shape): void {
    console.log(`\nShape info:`);
    console.log(`Color: ${shape.color}`);
    console.log(`Area: ${shape.getArea()}`);

    if (shape.getDescription) {
        console.log(`Description: ${shape.getDescription()}`);
    }
}

console.log("\nUsing shapes with Shape interface:");
printShapeInfo(rectangle);
printShapeInfo(circle);

// Function that specifically accepts Rectangle interface
function printRectangleInfo(rect: Rectangle): void {
    console.log(`\nRectangle specific info:`);
    console.log(`Width: ${rect.width}, Height: ${rect.height}`);
    console.log(`Perimeter: ${rect.getPerimeter()}`);
}

printRectangleInfo(rectangle);
// printRectangleInfo(circle); // Error: Circle is not a Rectangle