const express = require('express');
const taskLists = require('../models/lists');
const authcheck = require('../middleware/authcheck');

const app = express();

app.use(express.json());

app.post('/api/addtask', authcheck, addTask);
app.get('/api/fetchdue', authcheck, fetchDue);
app.post('/api/completetask', authcheck, completeTask);
app.get('/api/fetchcompleted', authcheck, fetchCompleted);
app.post('/api/deletetask', authcheck, deleteTask);

module.exports = app;
