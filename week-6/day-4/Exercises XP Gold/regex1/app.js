function returnNumbers(inputString) {
  console.log('='.repeat(50));
  console.log('REGULAR EXPRESSION EXERCISE #1');
  console.log('='.repeat(50));
  
  console.log(`\nInput string: "${inputString}"`);
  
  // Method 1: Using match with regular expression
  const regex1 = /\d/g; // Matches all digits
  const matches = inputString.match(regex1);
  
  // Method 2: Using replace to remove non-digits
  const regex2 = /\D/g; // Matches all non-digits
  const numbersOnly = inputString.replace(regex2, '');
  
  // Method 3: Using split and filter
  const chars = inputString.split('');
  const digits = chars.filter(char => /\d/.test(char));
  
  console.log('\n Different Methods to Extract Numbers:');
  console.log(`Method 1 (match): ${matches ? matches.join('') : 'No numbers found'}`);
  console.log(`Method 2 (replace): ${numbersOnly}`);
  console.log(`Method 3 (filter): ${digits.join('')}`);
  
  // Display detailed match information
  if (matches) {
    console.log('\n Detailed Match Information:');
    console.log(`Total digits found: ${matches.length}`);
    
    matches.forEach((digit, index) => {
      console.log(`  Digit ${index + 1}: "${digit}" at position ${inputString.indexOf(digit, index)}`);
    });
    
    // Calculate sum of digits
    const sum = matches.reduce((total, digit) => total + parseInt(digit), 0);
    console.log(`Sum of all digits: ${sum}`);
    
    // Find even and odd digits
    const evenDigits = matches.filter(digit => parseInt(digit) % 2 === 0);
    const oddDigits = matches.filter(digit => parseInt(digit) % 2 === 1);
    console.log(`Even digits: ${evenDigits.join(', ')}`);
    console.log(`Odd digits: ${oddDigits.join(', ')}`);
  }
  
  return numbersOnly;
}

// Test cases
console.log('Testing returnNumbers function:\n');

// Test 1: Provided example
console.log('Test 1:');
const result1 = returnNumbers('k5k3q2g5z6x9bn');
console.log(` Expected: 532569, Got: ${result1}`);
console.log(`   Test passed: ${result1 === '532569' ? '✓' : '✗'}`);

// Test 2: More complex example
console.log('\n\nTest 2:');
const result2 = returnNumbers('a1b2c3d4e5f6g7h8i9j0');
console.log(` All digits from 0-9: ${result2}`);

// Test 3: No numbers
console.log('\n\nTest 3:');
const result3 = returnNumbers('abcdefgh');
console.log(` No numbers expected, Got: "${result3}"`);
console.log(`   Test passed: ${result3 === '' ? '✓' : '✗'}`);

// Test 4: Only numbers
console.log('\n\nTest 4:');
const result4 = returnNumbers('1234567890');
console.log(` Only numbers: ${result4}`);

// Test 5: Mixed with special characters
console.log('\n\nTest 5:');
const result5 = returnNumbers('!@#$%^&*()123abc456def789');
console.log(` With special chars: ${result5}`);

// Interactive test
console.log('\n' + '='.repeat(50));
console.log('INTERACTIVE TEST');
console.log('='.repeat(50));

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter a string to extract numbers from: ', (userInput) => {
  const userResult = returnNumbers(userInput);
  console.log(`\n Result: ${userResult}`);
  readline.close();
});