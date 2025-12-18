const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function validateFullName(name) {
  const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  const isValid = namePattern.test(name);
  
  console.log(`\nName: "${name}"`);
  console.log(`Valid: ${isValid ? ' Yes' : ' No'}`);
  
  if (!isValid) {
    console.log('Rules:');
    console.log('- Only letters allowed');
    console.log('- One space between names');
    console.log('- First letter of each name must be uppercase');
  }
  
  return isValid;
}

rl.question('Enter full name (e.g., "John Doe"): ', (name) => {
  validateFullName(name);
  rl.close();
});