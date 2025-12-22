const fs = require("fs");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.find((note) => note.title === title);

  if (duplicate) {
    console.log("Note already exists");
    return;
  }

  notes.push({ title, body });
  saveNotes(notes);
  console.log("Note added");
};

const listNotes = () => {
  const notes = loadNotes();
  console.log("Your Notes:");
  notes.forEach((note) => console.log("- " + note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);

  if (!note) {
    console.log("Note not found");
    return;
  }

  console.log("Title:", note.title);
  console.log("Body:", note.body);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filtered = notes.filter((n) => n.title !== title);

  if (filtered.length === notes.length) {
    console.log("Note not found");
    return;
  }

  saveNotes(filtered);
  console.log("Note removed");
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};
