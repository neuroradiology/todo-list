const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.get('/todo', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/list.html'));
});

module.exports = app;