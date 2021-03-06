const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const animalsRoutes = require('./routes/animals');
const veterinariansRoutes = require('./routes/veterinarian');
const reportsRoutes = require('./routes/reports');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*'); // * => para todos os dominios
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/api/animals',animalsRoutes);
app.use('/api/veterinarians', veterinariansRoutes);
app.use('/api/reports', reportsRoutes);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
});

mongoose.connect('mongodb://localhost:27017/veterinaryapi', { useNewUrlParser: true })
.then(result => {app.listen(4200);
})
.catch(err => console.log(err));