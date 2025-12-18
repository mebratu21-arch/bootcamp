// users.js
const { faker } = require("@faker-js/faker");

const users = [];

function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country()
  };
  users.push(user);
}

function listUsers() {
  console.log(users);
}

module.exports = { addFakeUser, listUsers };
