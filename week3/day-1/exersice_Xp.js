// Exercise 1 : List of people
const people = ["Greg", "Mary", "Devon", "James"];

// Part I
// 1. Remove "Greg" from the people array
people.shift();
console.log(people); // ["Mary", "Devon", "James"]

// 2. Replace "James" to "Jason"
const jamesIndex = people.indexOf("James");
if (jamesIndex !== -1) {
    people[jamesIndex] = "Jason";
}
console.log(people); // ["Mary", "Devon", "Jason"]

// 3. Add your name to the end of the people array
people.push("Alex");
console.log(people); // ["Mary", "Devon", "Jason", "Alex"]

// 4. Console.log Mary's index
console.log(people.indexOf("Mary")); // 0

// 5. Make a copy of the people array using slice, without "Mary" or your name
const peopleCopy = people.slice(1, 3);
console.log(peopleCopy); // ["Devon", "Jason"]

// 6. Find index of "Foo"
console.log(people.indexOf("Foo")); // -1
// It returns -1 because "Foo" is not in the array

// 7. Create variable 'last' with the last element
const last = people[people.length - 1];
console.log(last); // "Alex"

// Part II - Loops
// 1. Iterate through the people array and console.log each person
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}

// 2. Iterate and exit after console.log "Devon"
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
    if (people[i] === "Devon") {
        break;
    }
}

// Exercise 2 : Your favorite colors
// Create array of favorite colors
const colors = ["blue", "green", "purple", "red", "orange"];

// Loop through array with numbered choices
for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Bonus version with correct suffixes
const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

// Exercise 3 : Repeat the question

let userNumber = prompt("Please enter a number:");
userNumber = Number(userNumber); // Convert to number

while (userNumber < 10) {
    userNumber = prompt("Please enter a new number (must be 10 or greater):");
    userNumber = Number(userNumber);
}

console.log(`Thank you! Your number ${userNumber} is 10 or greater.`);

// Exercise 4 : Building management

const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

// 1. Console.log the number of floors
console.log(building.numberOfFloors); // 4

// 2. Console.log apartments on floors 1 and 3
console.log(building.numberOfAptByFloor.firstFloor); // 3
console.log(building.numberOfAptByFloor.thirdFloor); // 9

// 3. Console.log second tenant and number of rooms
const secondTenant = building.nameOfTenants[1]; // "Dan"
const secondTenantRooms = building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0];
console.log(`${secondTenant} has ${secondTenantRooms} rooms`); // "Dan has 4 rooms"

// 4. Check rent sum and increase Dan's rent if needed
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
    console.log("Dan's rent has been increased to 1200");
}


//  Exercise 5 : Family

// Create family object
const family = {
    father: "John",
    mother: "Mary",
    son: "Tom",
    daughter: "Lisa",
    pet: "Rex"
};

// Console.log keys
for (let key in family) {
    console.log(key);
}

// Console.log values
for (let key in family) {
    console.log(family[key]);
}

//   Exercise 6 : Rudolf

const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
};

let sentence = '';

// Using for loop
const keys = Object.keys(details);
for (let i = 0; i < keys.length; i++) {
    sentence += `${keys[i]} ${details[keys[i]]} `;
}

console.log(sentence.trim()); // "my name is Rudolf the reindeer"

// Exercise 7 : Secret Group

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// Sort names alphabetically
names.sort();

// Get first letter of each name and join them
let secretSocietyName = '';
for (let i = 0; i < names.length; i++) {
    secretSocietyName += names[i][0]; // Get first character of each name
}

console.log(secretSocietyName); // "ABJKPS"

// Alternative one-liner:
// const secretSocietyName = names.sort().map(name => name[0]).join('');
// console.log(secretSocietyName); // "ABJKPS"