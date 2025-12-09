// ==================== EXERCISE 1: Advanced Access Modifiers and Inheritance ====================
console.log("=== Exercise 1: Advanced Access Modifiers and Inheritance ===");

abstract class Employee {
    // Public property - accessible from anywhere
    public name: string;
    
    // Private property - only accessible within Employee class
    private age: number;
    
    // Protected property - accessible within Employee and subclasses
    protected salary: number;
    
    // Readonly property - can't be modified after initialization
    public readonly employeeId: number;
    
    // Static property to track next employee ID
    private static nextId: number = 1000;
    
    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.employeeId = Employee.generateId();
    }
    
    // Protected method - accessible within class and subclasses
    protected calculateBonus(): number {
        // Default bonus calculation (10% of salary)
        return this.salary * 0.1;
    }
    
    // Public method to get basic info
    public getBasicInfo(): string {
        return `ID: ${this.employeeId}, Name: ${this.name}`;
        // Note: Can't access age here directly since it's private
    }
    
    // Public method to get age via a getter (since age is private)
    public getAge(): number {
        return this.age;
    }
    
    // Private method - only accessible within Employee class
    private validateSalary(): boolean {
        return this.salary >= 0;
    }
    
    // Protected method that uses private method
    protected getSalaryInfo(): string {
        if (!this.validateSalary()) {
            return "Invalid salary";
        }
        return `Salary: $${this.salary.toLocaleString()}`;
    }
    
    // Static method to generate unique IDs
    private static generateId(): number {
        return Employee.nextId++;
    }
    
    // Abstract method to be implemented by subclasses
    public abstract getSalaryDetails(): string;
}

class Manager extends Employee {
    // Additional property for Manager
    public department: string;
    
    // Bonus multiplier for Manager
    protected bonusMultiplier: number = 0.15;
    
    constructor(name: string, age: number, salary: number, department: string) {
        super(name, age, salary);
        this.department = department;
    }
    
    // Override the protected calculateBonus method
    protected calculateBonus(): number {
        // Manager gets 15% bonus instead of 10%
        return this.salary * this.bonusMultiplier;
    }
    
    // Implement abstract method from Employee
    public getSalaryDetails(): string {
        const bonus = this.calculateBonus(); // Can access protected method
        const total = this.salary + bonus;
        
        return `${this.getBasicInfo()}, ${this.getSalaryInfo()}, Bonus: $${bonus.toLocaleString()}, Total: $${total.toLocaleString()}`;
    }
    
    // Manager-specific method
    public manageTeam(): string {
        return `${this.name} is managing the ${this.department} department`;
    }
    
    // Access protected property from parent
    public getManagerSalary(): string {
        return `Manager salary: $${this.salary.toLocaleString()}`;
    }
    
    // Cannot access private properties from parent
    // public getManagerAge(): number {
    //     return this.age; // Error: Property 'age' is private
    // }
}

class ExecutiveManager extends Manager {
    // Additional property for ExecutiveManager
    public budgetAuthority: number;
    
    // Higher bonus multiplier for executives
    protected bonusMultiplier: number = 0.25;
    
    constructor(name: string, age: number, salary: number, department: string, budgetAuthority: number) {
        super(name, age, salary, department);
        this.budgetAuthority = budgetAuthority;
    }
    
    // Executive-specific method
    public approveBudget(budgetAmount: number): string {
        if (budgetAmount <= this.budgetAuthority) {
            return `${this.name} approved budget of $${budgetAmount.toLocaleString()}`;
        } else {
            return `${this.name} cannot approve budget of $${budgetAmount.toLocaleString()} (exceeds authority of $${this.budgetAuthority.toLocaleString()})`;
        }
    }
    
    // Override getSalaryDetails for ExecutiveManager
    public getSalaryDetails(): string {
        const baseDetails = super.getSalaryDetails();
        return `${baseDetails}, Budget Authority: $${this.budgetAuthority.toLocaleString()}`;
    }
    
    // Method to demonstrate encapsulation
    public demonstrateEncapsulation(): void {
        console.log(`\nEncapsulation demonstration for ${this.name}:`);
        console.log(`- Public name: ${this.name}`);
        console.log(`- Public employeeId: ${this.employeeId}`);
        console.log(`- Can get age via public method: ${this.getAge()}`);
        console.log(`- Protected salary (via getter): ${this.getManagerSalary()}`);
        console.log(`- Department: ${this.department}`);
        console.log(`- Budget Authority: $${this.budgetAuthority.toLocaleString()}`);
        
        // These would cause errors:
        // console.log(this.age); // Private - Error
        // console.log(this.salary); // Protected - Error outside class hierarchy
        // console.log(this.calculateBonus()); // Protected - Error outside class hierarchy
    }
}

// Testing Exercise 1
console.log("Creating ExecutiveManager instance:");
const executive = new ExecutiveManager("Sarah Johnson", 45, 200000, "Executive Leadership", 1000000);
console.log(executive.getSalaryDetails());
console.log(executive.approveBudget(500000));
console.log(executive.approveBudget(1500000));
console.log(executive.manageTeam());

// Demonstrate encapsulation
executive.demonstrateEncapsulation();

// Test polymorphism
console.log("\nPolymorphism demonstration:");
const employees: Employee[] = [
    new Manager("John Smith", 35, 80000, "Engineering"),
    new ExecutiveManager("Maria Garcia", 50, 250000, "Operations", 500000)
];

employees.forEach(emp => {
    console.log(emp.getSalaryDetails());
});



// ==================== EXERCISE 2: Advanced Static Methods and Properties ====================
console.log("\n\n=== Exercise 2: Advanced Static Methods and Properties ===");

abstract class Shape {
    // Static property to track all shapes created
    protected static totalShapes: number = 0;
    
    // Instance property
    public readonly id: number;
    
    constructor() {
        Shape.totalShapes++;
        this.id = Shape.totalShapes;
    }
    
    // Static method to get total shapes
    public static getTotalShapes(): number {
        return Shape.totalShapes;
    }
    
    // Static method to get shape type (to be overridden)
    public static getType(): string {
        return "Generic Shape";
    }
    
    // Instance method for area calculation (to be implemented by subclasses)
    public abstract getArea(): number;
    
    // Instance method for perimeter (optional)
    public getPerimeter?(): number;
}

class Circle extends Shape {
    // Static property specific to Circle
    private static circleCount: number = 0;
    
    // Instance properties
    public radius: number;
    
    constructor(radius: number) {
        super();
        this.radius = radius;
        Circle.circleCount++;
    }
    
    // Override static method
    public static getType(): string {
        return "Circle";
    }
    
    // Static method specific to Circle
    public static getCircleCount(): number {
        return Circle.circleCount;
    }
    
    // Implement abstract method
    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    // Implement optional method
    public getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
    
    // Instance method
    public getInfo(): string {
        return `Circle ID: ${this.id}, Radius: ${this.radius}, Area: ${this.getArea().toFixed(2)}`;
    }
}

class Square extends Shape {
    // Static property specific to Square
    private static squareCount: number = 0;
    
    // Instance properties
    public side: number;
    
    constructor(side: number) {
        super();
        this.side = side;
        Square.squareCount++;
    }
    
    // Override static method
    public static getType(): string {
        return "Square";
    }
    
    // Static method specific to Square
    public static getSquareCount(): number {
        return Square.squareCount;
    }
    
    // Implement abstract method
    public getArea(): number {
        return this.side * this.side;
    }
    
    // Implement optional method
    public getPerimeter(): number {
        return 4 * this.side;
    }
    
    // Instance method
    public getInfo(): string {
        return `Square ID: ${this.id}, Side: ${this.side}, Area: ${this.getArea()}`;
    }
}

// Testing Exercise 2
console.log("Creating shapes and testing static properties/methods:");

// Access static methods on base class
console.log(`Base shape type: ${Shape.getType()}`);
console.log(`Total shapes before creation: ${Shape.getTotalShapes()}`);

// Create shapes
const circle1 = new Circle(5);
const circle2 = new Circle(10);
const square1 = new Square(4);
const square2 = new Square(7);
const square3 = new Square(3);

// Access static methods on subclasses
console.log(`Circle type: ${Circle.getType()}`);
console.log(`Square type: ${Square.getType()}`);

// Access static properties
console.log(`Total shapes created: ${Shape.getTotalShapes()}`);
console.log(`Circle count: ${Circle.getCircleCount()}`);
console.log(`Square count: ${Square.getSquareCount()}`);

// Instance methods
console.log("\nShape instances:");
console.log(circle1.getInfo());
console.log(circle2.getInfo());
console.log(square1.getInfo());
console.log(square2.getInfo());
console.log(square3.getInfo());

// Demonstrate static inheritance
console.log("\nStatic inheritance demonstration:");
console.log(`Can access parent static method from child: ${Circle.getTotalShapes()}`);

// Create more shapes to demonstrate static counter
const circle3 = new Circle(15);
console.log(`\nAfter creating another circle:`);
console.log(`Total shapes: ${Shape.getTotalShapes()}`);
console.log(`Circle count: ${Circle.getCircleCount()}`);



// ==================== EXERCISE 3: Complex Interfaces with Function Types ====================
console.log("\n\n=== Exercise 3: Complex Interfaces with Function Types ===");

// Define operation function type
type OperationFunction = (a: number, b: number) => number;

// Interface with function type property
interface Calculator {
    // Properties
    a: number;
    b: number;
    
    // Method that accepts a function
    operate(operation: OperationFunction): number;
    
    // Optional method for history
    getHistory?(): string[];
}

// Advanced calculator implementing the interface
class AdvancedCalculator implements Calculator {
    public a: number;
    public b: number;
    private history: string[] = [];
    
    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }
    
    // Implement operate method
    public operate(operation: OperationFunction): number {
        const result = operation(this.a, this.b);
        this.addToHistory(operation, result);
        return result;
    }
    
    // Implement optional method
    public getHistory(): string[] {
        return [...this.history]; // Return copy to prevent external modification
    }
    
    // Private helper method
    private addToHistory(operation: OperationFunction, result: number): void {
        const operationName = this.getOperationName(operation);
        this.history.push(`${this.a} ${operationName} ${this.b} = ${result}`);
        
        // Keep only last 10 operations
        if (this.history.length > 10) {
            this.history.shift();
        }
    }
    
    // Helper to get operation name
    private getOperationName(operation: OperationFunction): string {
        // Check which operation it is based on function reference or behavior
        if (operation === this.add) return "+";
        if (operation === this.subtract) return "-";
        if (operation === this.multiply) return "×";
        if (operation === this.divide) return "÷";
        if (operation === this.power) return "^";
        return "?";
    }
    
    // Predefined operations as methods (can be passed as OperationFunction)
    public add(a: number, b: number): number {
        return a + b;
    }
    
    public subtract(a: number, b: number): number {
        return a - b;
    }
    
    public multiply(a: number, b: number): number {
        return a * b;
    }
    
    public divide(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
    }
    
    public power(a: number, b: number): number {
        return Math.pow(a, b);
    }
    
    // Method using anonymous functions
    public modulus(): number {
        return this.operate((a, b) => a % b);
    }
    
    // Method to clear history
    public clearHistory(): void {
        this.history = [];
    }
    
    // Method to set new values
    public setValues(a: number, b: number): void {
        this.a = a;
        this.b = b;
    }
}

// Testing Exercise 3
console.log("Testing AdvancedCalculator with function types:");

const calc = new AdvancedCalculator(10, 5);

// Using predefined operations
console.log(`Addition: ${calc.operate(calc.add)}`);
console.log(`Subtraction: ${calc.operate(calc.subtract)}`);
console.log(`Multiplication: ${calc.operate(calc.multiply)}`);
console.log(`Division: ${calc.operate(calc.divide)}`);
console.log(`Power: ${calc.operate(calc.power)}`);
console.log(`Modulus: ${calc.modulus()}`);

// Using anonymous functions
console.log(`Average: ${calc.operate((a, b) => (a + b) / 2)}`);
console.log(`Max: ${calc.operate((a, b) => Math.max(a, b))}`);
console.log(`Min: ${calc.operate((a, b) => Math.min(a, b))}`);

// Check history
console.log("\nOperation History:");
calc.getHistory()?.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry}`);
});

// Using the interface type for polymorphism
console.log("\nUsing Calculator interface type:");
const calculators: Calculator[] = [
    new AdvancedCalculator(20, 4),
    new AdvancedCalculator(15, 3)
];

calculators.forEach((calculator, index) => {
    console.log(`\nCalculator ${index + 1}:`);
    console.log(`20 × 4 = ${calculator.operate((a, b) => a * b)}`);
    
    if (calculator.getHistory) {
        console.log(`History length: ${calculator.getHistory().length}`);
    }
});



// ==================== EXERCISE 4: Readonly Properties in Complex Inheritance ====================
console.log("\n\n=== Exercise 4: Readonly Properties in Complex Inheritance ===");

// Base class with readonly property
abstract class Device {
    // Readonly property - cannot be changed after initialization
    public readonly serialNumber: string;
    
    // Protected property for internal use
    protected manufacturer: string;
    
    // Static property for tracking devices
    private static deviceCount: number = 0;
    
    constructor(serialNumber: string, manufacturer: string) {
        this.serialNumber = serialNumber;
        this.manufacturer = manufacturer;
        Device.deviceCount++;
    }
    
    // Abstract method to be implemented by subclasses
    public abstract getDeviceInfo(): string;
    
    // Method using readonly property
    public getSerialNumber(): string {
        return this.serialNumber;
    }
    
    // Static method
    public static getDeviceCount(): number {
        return Device.deviceCount;
    }
    
    // Protected method that can be used by subclasses
    protected getManufacturerInfo(): string {
        return `Manufacturer: ${this.manufacturer}`;
    }
}

// Intermediate class extending Device
class PortableDevice extends Device {
    // Additional properties
    public batteryLife: number; // in hours
    
    constructor(serialNumber: string, manufacturer: string, batteryLife: number) {
        super(serialNumber, manufacturer);
        this.batteryLife = batteryLife;
    }
    
    // Method specific to portable devices
    public getBatteryInfo(): string {
        return `Battery Life: ${this.batteryLife} hours`;
    }
    
    // Implement abstract method
    public getDeviceInfo(): string {
        return `${this.getManufacturerInfo()}, ${this.getBatteryInfo()}`;
    }
}

// Derived class with additional mutable properties
class Laptop extends PortableDevice {
    // Mutable properties
    public model: string;
    public price: number;
    
    // Additional readonly property
    public readonly productionYear: number;
    
    constructor(
        serialNumber: string,
        manufacturer: string,
        batteryLife: number,
        model: string,
        price: number,
        productionYear: number
    ) {
        super(serialNumber, manufacturer, batteryLife);
        this.model = model;
        this.price = price;
        this.productionYear = productionYear;
    }
    
    // Override getDeviceInfo method
    public getDeviceInfo(): string {
        const baseInfo = super.getDeviceInfo();
        return `Laptop - ${this.model}, Serial: ${this.serialNumber}, ${baseInfo}, Price: $${this.price}, Year: ${this.productionYear}`;
    }
    
    // Additional method
    public applyDiscount(discountPercent: number): void {
        if (discountPercent > 0 && discountPercent <= 50) {
            this.price = this.price * (1 - discountPercent / 100);
            console.log(`Applied ${discountPercent}% discount. New price: $${this.price.toFixed(2)}`);
        } else {
            console.log(`Invalid discount percentage: ${discountPercent}%`);
        }
    }
    
    // Method to demonstrate readonly properties
    public demonstrateReadonly(): void {
        console.log(`\nReadonly properties demonstration for ${this.model}:`);
        console.log(`- Serial Number (readonly): ${this.serialNumber}`);
        console.log(`- Production Year (readonly): ${this.productionYear}`);
        
        // These would cause errors if uncommented:
        // this.serialNumber = "NEW123"; // Error: Cannot assign to 'serialNumber' because it is a read-only property
        // this.productionYear = 2024; // Error: Cannot assign to 'productionYear' because it is a read-only property
        
        // But we can modify mutable properties:
        console.log(`- Original Price: $${this.price}`);
        this.price = this.price * 0.9; // 10% discount
        console.log(`- Modified Price: $${this.price.toFixed(2)}`);
        
        this.model = `${this.model} Pro`;
        console.log(`- Modified Model: ${this.model}`);
    }
}

// Testing Exercise 4
console.log("Creating device instances:");

const laptop1 = new Laptop("SN123456", "Dell", 8, "XPS 13", 1200, 2023);
console.log(laptop1.getDeviceInfo());

// Test mutable vs readonly properties
laptop1.demonstrateReadonly();

// Try to modify readonly properties (commented out to avoid errors)
// laptop1.serialNumber = "NEW123"; // Error: Cannot assign to 'serialNumber' because it is a read-only property
// laptop1.productionYear = 2024; // Error: Cannot assign to 'productionYear' because it is a read-only property

// Modify mutable properties
console.log("\nModifying mutable properties:");
laptop1.applyDiscount(15);
laptop1.model = "XPS 13 Plus";
console.log(laptop1.getDeviceInfo());

// Create another laptop
const laptop2 = new Laptop("SN789012", "Apple", 10, "MacBook Pro", 2000, 2024);
console.log(`\n${laptop2.getDeviceInfo()}`);

// Test static property
console.log(`\nTotal devices created: ${Device.getDeviceCount()}`);

// Test polymorphism with Device type
console.log("\nPolymorphism with Device type:");
const devices: Device[] = [
    laptop1,
    laptop2,
    new PortableDevice("SN345678", "Samsung", 24)
];

devices.forEach(device => {
    console.log(device.getDeviceInfo());
});



// ==================== EXERCISE 5: Extending Multiple Interfaces with Optional and Readonly Properties ====================
console.log("\n\n=== Exercise 5: Extending Multiple Interfaces with Optional and Readonly Properties ===");

// Base Product interface
interface Product {
    readonly name: string;       // Readonly - cannot be changed
    price: number;               // Mutable
    discount?: number;           // Optional
    readonly sku: string;        // Readonly Stock Keeping Unit
}

// Extended Electronics interface
interface Electronics extends Product {
    warrantyPeriod: number;      // Warranty in months
    powerConsumption?: number;   // Optional - power in watts
}

// Further extended SmartDevice interface
interface SmartDevice extends Electronics {
    connectivity: string[];      // Array of connectivity options
    hasBluetooth: boolean;
    hasWifi: boolean;
}

// Class implementing the complex interface hierarchy
class Smartphone implements SmartDevice {
    // Required properties from Product
    public readonly name: string;
    public price: number;
    public discount?: number;
    public readonly sku: string;
    
    // Required properties from Electronics
    public warrantyPeriod: number;
    public powerConsumption?: number;
    
    // Required properties from SmartDevice
    public connectivity: string[];
    public hasBluetooth: boolean;
    public hasWifi: boolean;
    
    // Additional properties
    private stockQuantity: number;
    private readonly releaseDate: Date;
    
    constructor(
        name: string,
        price: number,
        sku: string,
        warrantyPeriod: number,
        connectivity: string[],
        hasBluetooth: boolean,
        hasWifi: boolean,
        stockQuantity: number,
        releaseDate: Date,
        discount?: number,
        powerConsumption?: number
    ) {
        this.name = name;
        this.price = price;
        this.sku = sku;
        this.warrantyPeriod = warrantyPeriod;
        this.connectivity = connectivity;
        this.hasBluetooth = hasBluetooth;
        this.hasWifi = hasWifi;
        this.stockQuantity = stockQuantity;
        this.releaseDate = releaseDate;
        
        if (discount !== undefined) {
            this.discount = discount;
        }
        
        if (powerConsumption !== undefined) {
            this.powerConsumption = powerConsumption;
        }
    }
    
    // Method to calculate final price after discount
    public getFinalPrice(): number {
        if (this.discount && this.discount > 0 && this.discount <= 100) {
            return this.price * (1 - this.discount / 100);
        }
        return this.price;
    }
    
    // Method to get product information
    public getProductInfo(): string {
        const finalPrice = this.getFinalPrice();
        const discountInfo = this.discount ? ` (${this.discount}% off)` : '';
        
        return `Product: ${this.name}${discountInfo}
        SKU: ${this.sku}
        Price: $${this.price} → Final: $${finalPrice.toFixed(2)}
        Warranty: ${this.warrantyPeriod} months
        Connectivity: ${this.connectivity.join(', ')}
        Bluetooth: ${this.hasBluetooth ? 'Yes' : 'No'}, WiFi: ${this.hasWifi ? 'Yes' : 'No'}
        Stock: ${this.stockQuantity} units
        Released: ${this.releaseDate.toLocaleDateString()}`;
    }
    
    // Method to update stock
    public updateStock(quantity: number): void {
        this.stockQuantity += quantity;
        console.log(`Stock updated. New quantity: ${this.stockQuantity}`);
    }
    
    // Method to apply discount
    public applyDiscount(discountPercent: number): void {
        if (discountPercent >= 0 && discountPercent <= 100) {
            this.discount = discountPercent;
            console.log(`Discount applied: ${discountPercent}%`);
        } else {
            console.log(`Invalid discount percentage: ${discountPercent}%`);
        }
    }
    
    // Method to demonstrate readonly properties
    public demonstrateReadonly(): void {
        console.log(`\nReadonly properties for ${this.name}:`);
        console.log(`- Name (readonly): ${this.name}`);
        console.log(`- SKU (readonly): ${this.sku}`);
        console.log(`- Release Date (readonly): ${this.releaseDate.toLocaleDateString()}`);
        
        // These would cause errors:
        // this.name = "New Name"; // Error: Cannot assign to 'name' because it is a read-only property
        // this.sku = "NEW-SKU";   // Error: Cannot assign to 'sku' because it is a read-only property
        // this.releaseDate = new Date(); // Error: Cannot assign to 'releaseDate' because it is a read-only property
    }
}

// Another class implementing Electronics (not SmartDevice)
class Television implements Electronics {
    public readonly name: string;
    public price: number;
    public readonly sku: string;
    public warrantyPeriod: number;
    public discount?: number;
    public powerConsumption?: number;
    
    // Television-specific properties
    public screenSize: number; // in inches
    public resolution: string;
    
    constructor(
        name: string,
        price: number,
        sku: string,
        warrantyPeriod: number,
        screenSize: number,
        resolution: string,
        discount?: number,
        powerConsumption?: number
    ) {
        this.name = name;
        this.price = price;
        this.sku = sku;
        this.warrantyPeriod = warrantyPeriod;
        this.screenSize = screenSize;
        this.resolution = resolution;
        
        if (discount !== undefined) {
            this.discount = discount;
        }
        
        if (powerConsumption !== undefined) {
            this.powerConsumption = powerConsumption;
        }
    }
    
    public getFinalPrice(): number {
        return this.discount ? this.price * (1 - this.discount / 100) : this.price;
    }
    
    public getProductInfo(): string {
        return `${this.name} (${this.screenSize}" ${this.resolution}): $${this.getFinalPrice().toFixed(2)}`;
    }
}

// Testing Exercise 5
console.log("Creating electronic products:");

// Create a smartphone
const smartphone = new Smartphone(
    "Pixel 8 Pro",
    999,
    "PIX8PRO-BLK-256",
    24,
    ["5G", "LTE", "WiFi 6"],
    true,
    true,
    50,
    new Date("2023-10-04"),
    10, // 10% discount
    4500 // mAh
);

console.log(smartphone.getProductInfo());

// Demonstrate readonly properties
smartphone.demonstrateReadonly();

// Test mutable properties
console.log("\nModifying mutable properties:");
smartphone.applyDiscount(15);
smartphone.updateStock(25);
console.log(smartphone.getProductInfo());

// Create a television
const television = new Television(
    "OLED 4K TV",
    1499,
    "TV-OLED-65",
    36,
    65,
    "3840x2160",
    20, // 20% discount
    120 // watts
);

console.log(`\n${television.getProductInfo()}`);

// Polymorphism with interfaces
console.log("\nPolymorphism with Product interface:");
const products: Product[] = [smartphone, television];

products.forEach(product => {
    console.log(`${product.name}: $${product.price} (SKU: ${product.sku})`);
    
    if (product.discount) {
        const finalPrice = product instanceof Smartphone || product instanceof Television 
            ? (product as any).getFinalPrice() 
            : product.price * (1 - product.discount / 100);
        console.log(`  Discounted price: $${finalPrice.toFixed(2)}`);
    }
});

// Polymorphism with Electronics interface
console.log("\nPolymorphism with Electronics interface:");
const electronics: Electronics[] = [smartphone, television];

electronics.forEach(electronic => {
    console.log(`${electronic.name}: ${electronic.warrantyPeriod} months warranty`);
});

// Function that accepts SmartDevice
function printSmartDeviceInfo(device: SmartDevice): void {
    console.log(`\nSmart Device: ${device.name}`);
    console.log(`Connectivity: ${device.connectivity.join(', ')}`);
    console.log(`Bluetooth: ${device.hasBluetooth}, WiFi: ${device.hasWifi}`);
}

printSmartDeviceInfo(smartphone);
// printSmartDeviceInfo(television); // Error: Television doesn't implement SmartDevice