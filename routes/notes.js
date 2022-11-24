// Import fs package
const fs = require('fs');
const uuid = require('../helpers/uuid');
// Requires express and router
const express = require('express');
const router = express.Router();

// GET route for db.json
router.get('/', (req, res) => {
    let file = fs.readFileSync('./db/db.json', 'utf8');
    let db = JSON.parse(file);
    res.json(db)
});

// POST route for db.json
router.post('/', (req, res) => {
    const { title, text } = req.body

    if (!title || !text) {
        res.status(400).json({ error: "Missing title and/or text." })
        return
    }
    // Add id to note
    const newNote = {
        title,
        text,
        id: uuid()
    }
    let file = fs.readFileSync('./db/db.json', 'utf8');
    let db = JSON.parse(file);
    db = [...db, newNote];

    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json("Note added!");
});

// DELETE route for db.json
router.delete('/:id', (req, res) => {
    let id = req.params.id;

    let file = fs.readFileSync('./db/db.json', 'utf8');
    let db = JSON.parse(file);
    db = db.filter(note => note.id != id);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json("Note deleted!");
});

module.exports = router;
