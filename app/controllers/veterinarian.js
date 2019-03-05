const { validationResult } = require('express-validator/check');
const Veterinarians = require('../models/veterinarian');

exports.getVeterinarians = (req,res,next) => {
    const {page = 1} = req.query;
    Veterinarians.paginate({},{page,limit:10})
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

exports.getOneVeterinarian = (req,res,next) => {
    const vetId = req.params.vetId;

    if(vetId.match(/^[0-9a-fA-F]{24}$/)){
        Veterinarians.findById(vetId)
        .then(result => {
            if(!result){
                const error = new Error('Could not find your veterinarian.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Vet found', vet: result})
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

exports.createVeterinarians = (req,res,next) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    Veterinarians.create(req.body)
    .then(result => {
        if(!result){
            const error = new Error('We could not save the data, some error ocurred in the process!');
            error.statusCode = 422;
            throw error;
        }
        res.status(201).json({message:'Veterinarian created with success!', vet: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateVeterinarian = (req,res,next) => {
    const vetId = req.params.vetId;

    if(vetId.match(/^[0-9a-fA-F]{24}$/)){
        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }

        Veterinarians.findByIdAndUpdate(vetId,req.body,{new: true})
        .then(result => {
            if(!result) {
                const error = new Error('Could not find your Vet.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Veterinarian updated with success!', vet: result});
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

exports.deleteVeterinarian = (req,res,next) => {
    const vetId = req.params.vetId;
    if(vetId.match(/^[0-9a-fA-F]{24}$/)){
        Veterinarians.findByIdAndRemove(vetId)
        .then(result => {
            if(!result){
                const error = new Error('Could not find and delete your animal.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Veterinarian was deleted!'});
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