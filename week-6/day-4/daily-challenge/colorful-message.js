// colorful-message.js
const chalk = require("chalk");

function showMessage() {
  console.log(chalk.blue.bold("This is a colorful message!"));
  console.log(chalk.green("Node.js makes coding fun!"));
}

module.exports = showMessage;
