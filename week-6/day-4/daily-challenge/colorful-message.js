// colorful-message.js
const chalk = require('chalk');

function colorfulMessage() {
    console.log(chalk.blue('This is a colorful message from Node.js!'));
    console.log(chalk.red.bold('Red Bold Message'));
    console.log(chalk.green.italic('Green Italic Message'));
}

module.exports = { colorfulMessage };
