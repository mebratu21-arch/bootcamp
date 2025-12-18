const { faker } = require('@faker-js/faker');

const users = [];

function addUser() {
  users.push({
    name: faker.person.fullName(),
    address: {
      street: faker.location.streetAddress(),
      country: faker.location.country()
    }
  });
}

for (let i = 0; i < 5; i++) {
  addUser();
}

console.log('Users:', users);