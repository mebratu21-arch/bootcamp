const yargs = require("yargs");
const _ = require("lodash");
const notes = require("./notes");

// ADD
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: { demandOption: true, type: "string" },
    body: { demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// LIST
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  },
});

// READ
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: { demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// REMOVE
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: { demandOption: true, type: "string" },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Handle unknown commands
yargs.strict().fail((msg, err, yargs) => {
  console.log("command not recognized");
});

yargs.parse();
