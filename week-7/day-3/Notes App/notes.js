const fs = require('fs');
const _ = require('lodash');

// Add a new note
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = _.find(notes, { title });

    if (duplicateNote) {
        console.log('Note already exists');
        return;
    }

    notes.push({ title, body });
    saveNotes(notes);
    console.log('Note added successfully');
};

// Remove a note
const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    if (notes.length === filteredNotes.length) {
        console.log('Note not found');
    } else {
        saveNotes(filteredNotes);
        console.log('Note removed');
    }
};

// List all notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(`Printing ${notes.length} note(s):`);
    notes.forEach(note => console.log(`- ${note.title}`));
};

// Read a note
const readNote = (title) => {
    const notes = loadNotes();
    const note = _.find(notes, { title });

    if (!note) {
        console.log('Note not found');
    } else {
        console.log('Title:', note.title);
        console.log('Body:', note.body);
    }
};

// Load notes from JSON
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
};

// Save notes to JSON
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 2);
    fs.writeFileSync('notes.json', dataJSON);
};

module.exports = { addNote, removeNote, listNotes, readNote };
