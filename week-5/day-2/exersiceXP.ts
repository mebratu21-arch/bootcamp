// ==================== EXERCISE 1: Class with Access Modifiers ====================
console.log("=== Exercise 1: Class with Access Modifiers ===");

class Employee {
    // Private properties - only accessible within the class
    private name: string;
    private salary: number;
    
    // Public property - accessible from anywhere
    public position: string;
    
    // Protected property - accessible within the class and subclasses
    protected department: string;
    
    // Constructor to initialize properties
    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    
    // Public method to get employee info
    public getEmployeeInfo(): string {
        // Can access private properties within the class
        return `Employee: ${this.name}, Position: ${this.position}`;
    }
    
    // Example of a method that accesses protected property
    protected getDepartmentInfo(): string {
        return `Department: ${this.department}`;
    }
    
    // Example of accessing private property via a public method
    public getName(): string {
        return this.name;
    }
}

// Testing Exercise 1
const emp1 = new Employee("John Doe", 50000, "Software Engineer", "Engineering");
console.log(emp1.getEmployeeInfo()); // Output: Employee: John Doe, Position: Software Engineer
console.log(emp1.position); // Public property accessible
// console.log(emp1.name); // Error: Property 'name' is private
// console.log(emp1.department); // Error: Property 'department' is protected
console.log(emp1.getName()); // Works: accessing private property via public method



// ==================== EXERCISE 2: Readonly Properties in a Class ====================
console.log("\n=== Exercise 2: Readonly Properties in a Class ===");

class Product {
    // Readonly property - can only be set at initialization
    readonly id: number;
    
    // Public properties
    public name: string;
    public price: number;
    
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    // Method to get product info
    public getProductInfo(): string {
        return `Product: ${this.name}, Price: $${this.price}`;
    }
}

// Testing Exercise 2
const product1 = new Product(101, "Laptop", 999.99);
console.log(product1.getProductInfo()); // Output: Product: Laptop, Price: $999.99
console.log(`Product ID: ${product1.id}`); // Can read readonly property

// Trying to modify readonly property (will cause TypeScript error)
// product1.id = 102; // Error: Cannot assign to 'id' because it is a read-only property

// But we can modify non-readonly properties
product1.name = "Gaming Laptop";
product1.price = 1299.99;
console.log(product1.getProductInfo()); // Output: Product: Gaming Laptop, Price: $1299.99



// ==================== EXERCISE 3: Class Inheritance ====================
console.log("\n=== Exercise 3: Class Inheritance ===");

// Base class
class Animal {
    public name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Method that will be overridden in subclasses
    public makeSound(): string {
        return "Some generic animal sound";
    }
    
    // Another method that can be inherited
    public introduce(): string {
        return `I am ${this.name}`;
    }
}

// Subclass extending Animal
class Dog extends Animal {
    // Override the makeSound method
    public makeSound(): string {
        return "bark";
    }
    
    // Add a new method specific to Dog
    public wagTail(): string {
        return `${this.name} is wagging tail`;
    }
}

// Another subclass
class Cat extends Animal {
    public makeSound(): string {
        return "meow";
    }
    
    // Cat-specific method
    public purr(): string {
        return `${this.name} is purring`;
    }
}

// Testing Exercise 3
const dog = new Dog("Buddy");
console.log(dog.introduce()); // Output: I am Buddy (inherited from Animal)
console.log(dog.makeSound()); // Output: bark (overridden in Dog)
console.log(dog.wagTail());   // Output: Buddy is wagging tail

const cat = new Cat("Whiskers");
console.log(cat.introduce()); // Output: I am Whiskers (inherited)
console.log(cat.makeSound()); // Output: meow (overridden in Cat)
console.log(cat.purr());      // Output: Whiskers is purring



// ==================== EXERCISE 4: Static Properties and Methods ====================
console.log("\n=== Exercise 4: Static Properties and Methods ===");

class Calculator {
    // Static property - belongs to the class, not instances
    public static readonly brand: string = "MathMaster Pro";
    
    // Static method to add two numbers
    public static add(a: number, b: number): number {
        return a + b;
    }
    
    // Static method to subtract two numbers
    public static subtract(a: number, b: number): number {
        return a - b;
    }
    
    // Static method to multiply two numbers
    public static multiply(a: number, b: number): number {
        return a * b;
    }
    
    // Static method to divide two numbers
    public static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }
    
    // Instance method (for comparison)
    public instanceMethod(): string {
        return "This is an instance method";
    }
}

// Testing Exercise 4 - Access static members without creating an instance
console.log(`Calculator brand: ${Calculator.brand}`); // Output: Calculator brand: MathMaster Pro
console.log(`Addition: 10 + 5 = ${Calculator.add(10, 5)}`); // Output: Addition: 10 + 5 = 15
console.log(`Subtraction: 10 - 5 = ${Calculator.subtract(10, 5)}`); // Output: Subtraction: 10 - 5 = 5
console.log(`Multiplication: 10 * 5 = ${Calculator.multiply(10, 5)}`); // Output: Multiplication: 10 * 5 = 50
console.log(`Division: 10 / 5 = ${Calculator.divide(10, 5)}`); // Output: Division: 10 / 5 = 2

// Can't access static members from an instance
const calc = new Calculator();
console.log(calc.instanceMethod()); // Works: instance method
// console.log(calc.add(2, 3)); // Error: Property 'add' does not exist on type 'Calculator'
// console.log(calc.brand); // Error: Property 'brand' does not exist on type 'Calculator'



// ==================== EXERCISE 5: Extending Interfaces with Optional and Readonly Properties ====================
console.log("\n=== Exercise 5: Extending Interfaces with Optional and Readonly Properties ===");

// Base interface with readonly property
interface User {
    readonly id: number;  // Readonly - can't be modified after creation
    name: string;
    email: string;
    age?: number;  // Optional property
}

// Extended interface
interface PremiumUser extends User {
    membershipLevel: "basic" | "premium" | "vip";
    discountPercentage?: number;  // Optional property
    membershipExpiry?: Date;      // Optional property
}

// Function that accepts PremiumUser
function printUserDetails(user: PremiumUser): void {
    console.log(`User ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Membership Level: ${user.membershipLevel}`);
    
    if (user.age) {
        console.log(`Age: ${user.age}`);
    }
    
    if (user.discountPercentage) {
        console.log(`Discount: ${user.discountPercentage}%`);
    }
    
    if (user.membershipExpiry) {
        console.log(`Membership Expires: ${user.membershipExpiry.toLocaleDateString()}`);
    }
    
    console.log("---");
}

// Testing Exercise 5
const regularUser: User = {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28
};

const premiumUser1: PremiumUser = {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    membershipLevel: "premium",
    discountPercentage: 20
};

const premiumUser2: PremiumUser = {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    membershipLevel: "vip",
    age: 35,
    discountPercentage: 30,
    membershipExpiry: new Date("2024-12-31")
};

console.log("Regular User:");
console.log(`ID: ${regularUser.id}, Name: ${regularUser.name}`);

console.log("\nPremium Users:");
printUserDetails(premiumUser1);
printUserDetails(premiumUser2);

// Testing readonly property
// premiumUser1.id = 999; // Error: Cannot assign to 'id' because it is a read-only property

// But we can modify non-readonly properties
premiumUser1.name = "Robert Smith";
console.log(`Updated name: ${premiumUser1.name}`);



// ==================== ADDITIONAL EXAMPLES & BEST PRACTICES ====================
console.log("\n=== Additional Examples & Best Practices ===");

// Example showing inheritance with protected properties (Exercise 1 + 3)
class Manager extends Employee {
    private teamSize: number;
    
    constructor(name: string, salary: number, department: string, teamSize: number) {
        super(name, salary, "Manager", department);
        this.teamSize = teamSize;
    }
    
    // Can access protected property from parent class
    public getManagerInfo(): string {
        // Can access protected property in subclass
        const deptInfo = this.getDepartmentInfo(); // This works because it's protected
        
        // Can't directly access private properties of parent
        // const nameInfo = this.name; // Error: Property 'name' is private
        
        return `${this.getEmployeeInfo()}, ${deptInfo}, Team Size: ${this.teamSize}`;
    }
}

// Testing Manager class
const manager = new Manager("Jane Smith", 80000, "Engineering", 5);
console.log(manager.getManagerInfo());

// Example showing static properties with inheritance
class ScientificCalculator extends Calculator {
    public static readonly brand: string = "ScienceCalc Ultra";
    
    public static power(base: number, exponent: number): number {
        return Math.pow(base, exponent);
    }
    
    // Can also access parent static methods
    public static squareRoot(num: number): number {
        if (num < 0) {
            throw new Error("Cannot calculate square root of negative number");
        }
        return Math.sqrt(num);
    }
}

console.log(`\nScientific Calculator brand: ${ScientificCalculator.brand}`);
console.log(`Power: 2^3 = ${ScientificCalculator.power(2, 3)}`);
console.log(`Square Root: √16 = ${ScientificCalculator.squareRoot(16)}`);
console.log(`Still can use parent's static methods: 5 + 3 = ${ScientificCalculator.add(5, 3)}`);