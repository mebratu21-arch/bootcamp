// app.js
import { people } from "./data.js";

function calculateAverageAge(persons) {
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  return totalAge / persons.length;
}

console.log("Average Age:", calculateAverageAge(people));
