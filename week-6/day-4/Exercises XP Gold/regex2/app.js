// regex2.js
function validateName(name) {
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return regex.test(name);
}

console.log(validateName("John Doe"));   // true
console.log(validateName("john doe"));   // false
console.log(validateName("JohnDoe"));    // false
console.log(validateName("John Do3"));   // false
