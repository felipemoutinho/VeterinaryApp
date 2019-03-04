const { validationResult } = require('express-validator/check');
const Animals = require('../models/animals');


exports.getAnimals = (req,res,next) => {
    Animals.find()
    .then(result => {
        if(!result){
            const error = new Error('Could not find any animals.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({animals: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.findOneAnimal = (req,res,next) => {
    const animalId = req.params.animalId;
    if(animalId.match(/^[0-9a-fA-F]{24}$/)){
        Animals.findById(animalId)
        .then(result => {
            if(!result){
                const error = new Error('Could not find your animal.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({animal:result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    }
    else {
        const error = new Error('Invalid ID');
        error.statusCode = 422;
        throw error;
    }
};


exports.createAnimals = (req,res,next) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    else {

        const post = new Animals({
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            ownerName: req.body.ownerName
        });

        post.save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Created ok!',
            post: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
};

exports.updateAnimal = (req,res,next) => {
    const erros = validationResult(req);
    console.log(req.body);
    if(!erros.isEmpty()){
        const error = new Error('Validation failed, some data is incorrect or invalid.');
        error.statusCode = 422;
        throw error;
    }

    const animalId = req.params.animalId;
    
    if(animalId.match(/^[0-9a-fA-F]{24}$/)){
        Animals.findByIdAndUpdate(animalId,req.body, {new: true})
        .then(result => {
            if(!result){
                const error = new Error('Could not find your animal.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({updated: result});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    else {
        const error = new Error('Invalid ID');
        error.statusCode = 422;
        throw error;
    }
};

exports.deleteAnimal = (req,res,next) => {
    const animalId = req.params.animalId;
    if(animalId.match(/^[0-9a-fA-F]{24}$/)){
        Animals.findByIdAndRemove(animalId)
        .then(result => {
            if(!result) {
                const error = new Error('Could not find and delete your animal.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Deleted animal.'});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    }
    
    else {
        const error = new Error('Invalid ID');
        error.statusCode = 422;
        throw error;
    }
};