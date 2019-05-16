const express = require('express');
const auth = require('../models/auth');

const app = express();

app.use(express.json());

app.post('/api/login', loginUser);

module.exports = app;
