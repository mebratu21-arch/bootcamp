// ================================
//  Exercise 1: Location
// ================================
const person = {
    name: 'Mebratu Mengstu',
    age: 26,
    location: {
        country: 'isreal',
        city: 'Bet shemesh',
        coordinates: [49.2827, -123.1207]
    }
};

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);


// ================================
//  Exercise 2: Display Student Info
// ================================
function displayStudentInfo({first, last}) {
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));


// ================================
//  Exercise 3: User & ID
// ================================
const users = { user1: 18273, user2: 92833, user3: 90315 };

// Convert object to array
const usersArray = Object.entries(users);
console.log(usersArray);

// Multiply user IDs by 2
const doubledUsers = usersArray.map(([user, id]) => [user, id * 2]);
console.log(doubledUsers);


// ================================
//  Exercise 4: Person class
// ================================
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member); // "object"


// ================================
//  Exercise 5: Dog class
// ================================
class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Correct extension of Dog class
class Labrador extends Dog {
  constructor(name, size) {
    super(name); // call parent constructor
    this.size = size;
  }
}

// Test
const lab = new Labrador('Buddy', 'Large');
console.log(lab.name); // Buddy
console.log(lab.size); // Large


// ================================
//  Exercise 6: Challenges
// ================================

// Part 1: True or False
console.log([2] === [2]); // false
console.log({} === {});   // false

// Part 2: Property values
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number); // 4
console.log(object3.number); // 4
console.log(object4.number); // 5

// Part 3: Animal & Mammal classes
class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    sound(animalSound) {
        return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}

// Create instance
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));
