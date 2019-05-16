const express = require('express');
const users = require('../models/users');

const app = express();

app.use(express.json());

app.post('/api/register', registerUser);

module.exports = app;
