const express = require('express');
const cors = require('cors');
const viewsRoutes = require('./routes/views');
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const taskRoutes = require('./routes/tasks')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(viewsRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(taskRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
		