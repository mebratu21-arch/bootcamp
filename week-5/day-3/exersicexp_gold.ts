// ============================================
// COMPLETE TYPESCRIPT EXERCISES - ALL IN ONE
// ============================================

// Exercise 1: Intersection Types & Type Guards
interface User { name: string; email: string; }
interface Admin { adminLevel: number; }
type AdminUser = User & Admin;

function getProperty(obj: AdminUser, property: string): string | number | undefined {
    if (property in obj) return obj[property as keyof AdminUser];
    return undefined;
}

// Exercise 2: Type Casting with Generics
function castToType<T>(value: any, constructor: new() => T): T {
    if (constructor === Number) return Number(value) as unknown as T;
    if (constructor === Boolean) return Boolean(value) as unknown as T;
    return value as T;
}

// Exercise 3: Type Assertions with Constraints
function getArrayLength<T extends number | string>(arr: T[]): number {
    return arr.length;
}

// Exercise 4: Generic Interface & Class
interface Storage<T> {
    add(item: T): void;
    get(index: number): T | undefined;
}

class Box<T> implements Storage<T> {
    private items: T[] = [];
    add(item: T): void { this.items.push(item); }
    get(index: number): T | undefined { return this.items[index]; }
    size(): number { return this.items.length; }
}

// Exercise 5: Generic Class with Constraints
interface Item<T> { value: T; }
class Queue<T> {
    private items: Item<T>[] = [];
    add(itemValue: T): void { this.items.push({ value: itemValue }); }
    remove(): Item<T> | undefined { return this.items.shift(); }
    size(): number { return this.items.length; }
}

// ============================================
// DEMONSTRATION OF ALL EXERCISES
// ============================================

console.log(" TYPESCRIPT ADVANCED TYPES - ALL EXERCISES\n");

// Demo Exercise 1
console.log(" EXERCISE 1: Intersection Types & Type Guards");
const userAdmin: AdminUser = { 
    name: "Alice", 
    email: "alice@example.com", 
    adminLevel: 3 
};
console.log(`• Name: ${getProperty(userAdmin, 'name')}`);
console.log(`• Admin Level: ${getProperty(userAdmin, 'adminLevel')}`);
console.log(`• Invalid Property: ${getProperty(userAdmin, 'age')}\n`);

// Demo Exercise 2
console.log(" EXERCISE 2: Type Casting with Generics");
console.log(`• String to Number: ${castToType<number>("42", Number)}`);
console.log(`• String to Boolean: ${castToType<boolean>("true", Boolean)}\n`);

// Demo Exercise 3
console.log(" EXERCISE 3: Type Assertions with Constraints");
console.log(`• Numbers array length: ${getArrayLength([1, 2, 3])}`);
console.log(`• Strings array length: ${getArrayLength(["a", "b", "c", "d"])}\n`);

// Demo Exercise 4
console.log(" EXERCISE 4: Generic Interfaces & Class Implementation");
const storageBox = new Box<string>();
storageBox.add("First Item");
storageBox.add("Second Item");
console.log(`• Box size: ${storageBox.size()}`);
console.log(`• Item at index 0: ${storageBox.get(0)}\n`);

// Demo Exercise 5
console.log(" EXERCISE 5: Generic Classes with Constraints");
const taskQueue = new Queue<string>();
taskQueue.add("Task 1");
taskQueue.add("Task 2");
console.log(`• Queue size: ${taskQueue.size()}`);
console.log(`• Removed task: ${taskQueue.remove()?.value}`);
console.log(`• Queue size after removal: ${taskQueue.size()}\n`);

console.log("ALL EXERCISES COMPLETED SUCCESSFULLY!");