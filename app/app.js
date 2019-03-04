const express = require('express');

const animalsRoutes = require('./routes/animals');

const app = express();

app.use('/api/animals',animalsRoutes);

app.listen(4200);