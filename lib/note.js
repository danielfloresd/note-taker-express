//Add js file header
/*
    * Title: note.js
    * Description: This file contains the note class
    * Author: Danie Flores
    * Date: 2022-12-23
    * Version: 1.0
*/

class Note {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    // Add method to return note title
    getTitle() {
        return this.title;
    }

    // Add method to return note text
    getText() {
        return this.text;
    }

    // Add method to return note id
    getId() {
        return this.id;
    }

    // Add method to return note
    getNote() {
        return this;
    }

    // Add method to set note title
    setTitle(title) {
        this.title = title;
    }

    // Add method to set note text
    setText(text) {
        this.text = text;
    }

    // Add method to set note id
    setId(id) {
        this.id = id;
    }

    // Add method to store note in db.json
    saveNote() {
        // Import fs package
        const fs = require('fs');
        // Import db.json
        let db = require('../db/db.json');
        // Add id to note
        const newNote = {
            ...this,
            id: Math.round(10000 * Math.random())
        }
        db.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(db));
        console.log('Note added!', newNote);
        return newNote;
    }

    // Add method to delete note from db.json
    deleteNote() {
        // Import fs package
        const fs = require('fs');
        // Import db.json
        let db = require('../db/db.json');
        // Delete note with id
        for (let i = 0; i < db.length; i++) {
            if (db[i].id == this.id) {
                console.log("Note deleted!", db[i]);
                db.splice(i, 1);
                break;
            }
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(db));
        return db;
    }

    // Add method to return all notes from db.json
    static getAllNotes() {
        // Import db.json
        let db = require('../db/db.json');
        return db;
    }

    // Add method to return note from db.json
    static getNoteById(id) {
        // Import db.json
        let db = require('../db/db.json');
        // Return note with id
        for (let i = 0; i < db.length; i++) {
            if (db[i].id == id) {
                return db[i];
            }
        }
    }
}

module.exports = Note
