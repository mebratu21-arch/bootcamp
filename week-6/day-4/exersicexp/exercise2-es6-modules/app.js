// Import the array of person objects
import people from './data.js';

// Function to calculate average age
function calculateAverageAge(persons) {
  if (persons.length === 0) return 0;
  
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

// Calculate and display average age
const averageAge = calculateAverageAge(people);
console.log(`=== People Information ===`);
console.log(`Total number of people: ${people.length}`);
console.log(`Average age: ${averageAge.toFixed(2)} years`);

// Display individual person details
console.log("\n=== Individual Details ===");
people.forEach(person => {
  console.log(`${person.name}, ${person.age} years old, from ${person.location}`);
});