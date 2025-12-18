const prompt = require("prompt-sync")();
const users = [];

function addUserFromPrompt() {
  const name = prompt("Enter your name: ");
  const street = prompt("Enter your street: ");
  const country = prompt("Enter your country: ");
  users.push({ name, street, country });
}

addUserFromPrompt();
console.log(users);
