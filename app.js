// Import express package
const express = require('express');
// Import path package
const path = require('path');
// Import middleware
const app = express();

const notes = require('./routes/notes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/notes', notes);


// GET route for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
// GET route for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

module.exports = app;