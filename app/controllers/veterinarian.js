const { validationResult } = require('express-validator/check');
const Veterinarians = require('../models/veterinarian');

exports.getVeterinarians = (req,res,next) => {
    Veterinarians.find()
    .then(result => {
        if(!result){
            const error = new Error('Could not find any vet.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({vets: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};