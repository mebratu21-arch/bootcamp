// Check if we want to use prompt mode
const usePrompt = process.argv[2] === 'prompt';

if (usePrompt) {
  // Use inquirer for interactive prompts
  const inquirer = require('inquirer');
  
  const users = [];
  
  async function promptUser() {
    console.log('='.repeat(50));
    console.log('USER REGISTRATION SYSTEM');
    console.log('='.repeat(50));
    
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter your full name:',
        validate: (input) => {
          if (!input.trim()) return 'Name cannot be empty';
          if (!/^[A-Za-z\s]+$/.test(input)) return 'Name should contain only letters and spaces';
          return true;
        }
      },
      {
        type: 'input',
        name: 'street',
        message: 'Enter your street address:',
        validate: (input) => input.trim() ? true : 'Street address cannot be empty'
      },
      {
        type: 'input',
        name: 'country',
        message: 'Enter your country:',
        default: 'United States'
      }
    ];
    
    const answers = await inquirer.prompt(questions);
    
    // Add user to array
    users.push({
      name: answers.name,
      address: {
        street: answers.street,
        country: answers.country
      },
      id: users.length + 1,
      registered: new Date().toISOString()
    });
    
    console.log('\n User added successfully!');
    console.log('Current users:', users.length);
    
    // Ask if user wants to add another
    const { addAnother } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addAnother',
        message: 'Do you want to add another user?',
        default: true
      }
    ]);
    
    if (addAnother) {
      await promptUser();
    } else {
      displayUsers();
    }
  }
  
  function displayUsers() {
    console.log('\n' + '='.repeat(50));
    console.log('REGISTERED USERS');
    console.log('='.repeat(50));
    
    if (users.length === 0) {
      console.log('No users registered.');
      return;
    }
    
    users.forEach((user, index) => {
      console.log(`\nUser #${user.id}:`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Street: ${user.address.street}`);
      console.log(`  Country: ${user.address.country}`);
      console.log(`  Registered: ${new Date(user.registered).toLocaleString()}`);
    });
    
    console.log(`\nTotal users: ${users.length}`);
  }
  
  promptUser().catch(error => {
    console.error('Error:', error);
  });
  
} else {
  // Use faker to generate fake data
  const { faker } = require('@faker-js/faker');
  
  // Create empty array for users
  const users = [];
  
  // Function to add fake users
  function addFakeUser() {
    const user = {
      id: users.length + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode()
      },
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      company: faker.company.name(),
      jobTitle: faker.person.jobTitle(),
      registeredAt: faker.date.past()
    };
    
    users.push(user);
    return user;
  }
  
  // Generate multiple fake users
  function generateFakeUsers(count = 10) {
    console.log(`Generating ${count} fake users...\n`);
    
    for (let i = 0; i < count; i++) {
      addFakeUser();
    }
  }
  
  // Display users
  function displayUsers() {
    console.log('='.repeat(80));
    console.log('FAKE USER DATABASE');
    console.log('='.repeat(80));
    
    users.forEach((user, index) => {
      console.log(`\n USER #${user.id}: ${user.name}`);
      console.log(`    Email: ${user.email}`);
      console.log(`    Phone: ${user.phone}`);
      console.log(`    Address: ${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zipCode}, ${user.address.country}`);
      console.log(`    Birth Date: ${user.birthDate.toLocaleDateString()} (Age: ${new Date().getFullYear() - user.birthDate.getFullYear()})`);
      console.log(`    Company: ${user.company}`);
      console.log(`    Job Title: ${user.jobTitle}`);
      console.log(`    Registered: ${user.registeredAt.toLocaleDateString()}`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log(`Total users generated: ${users.length}`);
    
    // Display statistics
    console.log('\n STATISTICS:');
    
    // Countries count
    const countryCount = {};
    users.forEach(user => {
      const country = user.address.country;
      countryCount[country] = (countryCount[country] || 0) + 1;
    });
    
    console.log('\nUsers by country:');
    Object.entries(countryCount).forEach(([country, count]) => {
      console.log(`  ${country}: ${count} users`);
    });
    
    // Age statistics
    const ages = users.map(user => new Date().getFullYear() - user.birthDate.getFullYear());
    const avgAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
    console.log(`\nAverage age: ${avgAge.toFixed(1)} years`);
    console.log(`Youngest: ${Math.min(...ages)} years`);
    console.log(`Oldest: ${Math.max(...ages)} years`);
  }
  
  // Main execution
  console.log('='.repeat(50));
  console.log('FAKER.JS DEMONSTRATION');
  console.log('='.repeat(50));
  
  generateFakeUsers(8);
  displayUsers();
  
  // Additional fake data examples
  console.log('\n' + '='.repeat(50));
  console.log('ADDITIONAL FAKE DATA EXAMPLES');
  console.log('='.repeat(50));
  
  console.log('\n Random Data:');
  console.log(`UUID: ${faker.string.uuid()}`);
  console.log(`Color: ${faker.color.human()}`);
  console.log(`Animal: ${faker.animal.type()}`);
  console.log(`Emoji: ${faker.internet.emoji()}`);
  
  console.log('\n Financial Data:');
  console.log(`Credit Card: ${faker.finance.creditCardNumber()}`);
  console.log(`Account: ${faker.finance.accountNumber()}`);
  console.log(`Amount: $${faker.finance.amount()}`);
  
  console.log('\n Lorem Ipsum:');
  console.log(`Words: ${faker.lorem.words(10)}`);
  console.log(`Sentence: ${faker.lorem.sentence()}`);
  
  console.log('\n Tip: Run "npm run prompt" for interactive user registration');
}