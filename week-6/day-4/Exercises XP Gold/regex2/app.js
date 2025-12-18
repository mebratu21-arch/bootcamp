const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Regular expression pattern for full name validation
const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

function validateFullName(name) {
  console.log('\n' + '='.repeat(60));
  console.log('FULL NAME VALIDATION');
  console.log('='.repeat(60));
  
  console.log(`\nInput: "${name}"`);
  
  // Test the name against the pattern
  const isValid = namePattern.test(name);
  
  console.log('\n VALIDATION RESULTS:');
  console.log(`Overall valid: ${isValid ? ' Yes' : ' No'}`);
  
  // Detailed validation checks
  console.log('\n DETAILED CHECKS:');
  
  // Check 1: Contains only letters and one space
  const hasOnlyLettersAndSpace = /^[A-Za-z]+ [A-Za-z]+$/.test(name);
  console.log(`1. Only letters and one space: ${hasOnlyLettersAndSpace ? 'v' : 'x'}`);
  
  // Check 2: Exactly one space
  const spaceCount = (name.match(/ /g) || []).length;
  console.log(`2. Exactly one space: ${spaceCount === 1 ? 'v' : 'x'} (found ${spaceCount})`);
  
  // Check 3: First letter of first name is uppercase
  const firstName = name.split(' ')[0] || '';
  const firstNameValid = firstName.length > 0 && /^[A-Z][a-z]*$/.test(firstName);
  console.log(`3. First name starts with uppercase: ${firstNameValid ? 'v' : 'x'} ("${firstName}")`);
  
  // Check 4: First letter of last name is uppercase
  const lastName = name.split(' ')[1] || '';
  const lastNameValid = lastName.length > 0 && /^[A-Z][a-z]*$/.test(lastName);
  console.log(`4. Last name starts with uppercase: ${lastNameValid ? 'v' : 'x'} ("${lastName}")`);
  
  // Check 5: No numbers or special characters
  const noSpecialChars = !/[^A-Za-z ]/.test(name);
  console.log(`5. No numbers or special chars: ${noSpecialChars ? 'v' : 'x'}`);
  
  // Check 6: Minimum length for each part
  const firstNameLengthValid = firstName.length >= 2;
  const lastNameLengthValid = lastName.length >= 2;
  console.log(`6. Each name at least 2 chars: ${firstNameLengthValid && lastNameLengthValid ? 'v' : 'x'}`);
  
  // Provide suggestions if invalid
  if (!isValid) {
    console.log('\n SUGGESTIONS:');
    
    if (spaceCount !== 1) {
      if (spaceCount === 0) {
        console.log('  - Add a space between first and last name');
      } else {
        console.log('  - Use exactly one space between names');
      }
    }
    
    if (!firstNameValid) {
      console.log(`  - Capitalize first letter of first name: "${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}"`);
    }
    
    if (!lastNameValid && lastName) {
      console.log(`  - Capitalize first letter of last name: "${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}"`);
    }
    
    if (!noSpecialChars) {
      console.log('  - Remove numbers and special characters');
    }
    
    if (!firstNameLengthValid || !lastNameLengthValid) {
      console.log('  - Each name should have at least 2 characters');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  return isValid;
}

// Test cases
function runTestCases() {
  console.log('🧪 RUNNING TEST CASES');
  console.log('='.repeat(60));
  
  const testCases = [
    { name: 'John Doe', expected: true, description: 'Valid name' },
    { name: 'john doe', expected: false, description: 'Lowercase first letters' },
    { name: 'JOHN DOE', expected: false, description: 'All uppercase' },
    { name: 'John', expected: false, description: 'Single name' },
    { name: 'John Michael Doe', expected: false, description: 'Three names' },
    { name: 'J Doe', expected: false, description: 'Single letter first name' },
    { name: 'John D', expected: false, description: 'Single letter last name' },
    { name: 'John123 Doe', expected: false, description: 'Numbers in name' },
    { name: 'John-Doe', expected: false, description: 'Hyphen instead of space' },
    { name: 'Mary Jane', expected: true, description: 'Valid two-part name' },
    { name: ' ', expected: false, description: 'Only spaces' },
    { name: '', expected: false, description: 'Empty string' },
    { name: 'Élise Martin', expected: false, description: 'Accented characters' },
    { name: 'O\'Connor Smith', expected: false, description: 'Apostrophe in name' }
  ];
  
  let passed = 0;
  
  testCases.forEach((testCase, index) => {
    console.log(`\nTest ${index + 1}: ${testCase.description}`);
    console.log(`  Input: "${testCase.name}"`);
    const result = validateFullName(testCase.name);
    const passedTest = result === testCase.expected;
    
    if (passedTest) {
      passed++;
      console.log(`   PASSED`);
    } else {
      console.log(`   FAILED - Expected: ${testCase.expected}, Got: ${result}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log(`Test Results: ${passed}/${testCases.length} passed`);
  console.log('='.repeat(60));
}

// Main function
function main() {
  console.log(' REGULAR EXPRESSION EXERCISE #2 ');
  console.log('\nThis program validates full names according to these rules:');
  console.log('1. Should contain only letters (A-Z, a-z)');
  console.log('2. Should contain exactly one space');
  console.log('3. First letter of each name should be uppercase');
  console.log('4. Each name should have at least 2 characters');
  
  console.log('\nOptions:');
  console.log('1. Run test cases');
  console.log('2. Validate your own name');
  console.log('3. Exit');
  
  rl.question('\nSelect option (1-3): ', (option) => {
    switch (option.trim()) {
      case '1':
        runTestCases();
        rl.close();
        break;
      case '2':
        rl.question('\nEnter your full name (e.g., "John Doe"): ', (userName) => {
          const isValid = validateFullName(userName.trim());
          
          if (isValid) {
            console.log('\n Congratulations! Your name is valid.');
            const [firstName, lastName] = userName.trim().split(' ');
            console.log(`   First Name: ${firstName}`);
            console.log(`   Last Name: ${lastName}`);
          } else {
            console.log('\n Sorry, your name does not match the required format.');
            console.log('   Please check the suggestions above and try again.');
          }
          
          rl.close();
        });
        break;
      case '3':
        console.log('Goodbye! ');
        rl.close();
        break;
      default:
        console.log('Invalid option. Please try again.');
        main();
        break;
    }
  });
}

// Start the program
main();