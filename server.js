// Import express package
const express = require('express');
// Import path package
const path = require('path');
// Import fs package
const fs = require('fs');
// Import middleware
const app = express();
const PORT = process.env.PORT || 3001;

const { isModuleNamespaceObject } = require('util/types');
// Load db.json file
const db = [];
// Load db.json file
try {
    db = require('./db/db.json');
} catch (err) {
    console.log(err);
}
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// GET route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// GET route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// GET route for db.json
app.get('/api/notes', (req, res) => res.json(db));

// POST route for db.json
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    if (!title || !text) {
        res.status(400).json({ error: "Missing title and/or text." })
        return
    }
    // Add id to note
    const newNote = {
        ...req.body,
        id: Math.round(10000 * Math.random())
    }

    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

// DELETE route for db.json
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    // Delete note with id
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == id) {
            db.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});