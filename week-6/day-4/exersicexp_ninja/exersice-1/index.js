// index.js
const { program } = require("commander");
const greet = require("./greet");
const fetchData = require("./fetch");
const readFile = require("./read");

program
  .command("greet")
  .description("Display a colorful greeting")
  .action(greet);

program
  .command("fetch")
  .description("Fetch data from a public API")
  .action(fetchData);

program
  .command("read <filename>")
  .description("Read and display content of a file")
  .action(readFile);

program.parse(process.argv);
