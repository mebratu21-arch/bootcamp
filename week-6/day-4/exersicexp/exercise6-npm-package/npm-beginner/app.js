// Require chalk package
const chalk = require('chalk');

console.log('\n' + '='.repeat(50) + '\n');

// Using different chalk styles and colors
console.log(chalk.bold.blue('=== Welcome to NPM Beginner Exercise ===\n'));

// Colorful messages
console.log(chalk.green('✓ Success: Operation completed successfully!'));
console.log(chalk.yellow('⚠ Warning: Please backup your data before proceeding.'));
console.log(chalk.red('✗ Error: File not found. Please check the path.\n'));

// Styled text
console.log(chalk.bgCyan.black(' Informational Message '));
console.log(chalk.cyan('This is an informational message with cyan color.\n'));

// Combined styles
console.log(chalk.bold.italic.magenta('Important Notice:'));
console.log(chalk.magenta('The system will undergo maintenance tonight.\n'));

// Rainbow effect for fun
const message = "Thank you for using our application!";
const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
let coloredMessage = '';
for (let i = 0; i < message.length; i++) {
  const color = colors[i % colors.length];
  coloredMessage += chalk[color](message[i]);
}
console.log(coloredMessage);

console.log('\n' + '='.repeat(50));
console.log(chalk.gray('Application terminated normally.'));