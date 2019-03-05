const { validationResult } = require('express-validator/check');
const Reports = require('../models/reports');

exports.createReport = (req,res,next) => {
    const erros = validationResult(req);
    
    if(!erros.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    Reports.create(req.body)
    .then(result => {
        if(!result) {
            const error = new Error('We could not save the data, some error ocurred in the process!');
            error.statusCode = 422;
            throw error;
        }
        res.status(201).json({message:'Report created', report:result})
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getReports = (req,res,next) => {
    Reports.find().populate(['veterinarian','animal'])
    .then(result => {
        if(!result) {
            const error = new Error('Could not find any report');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message:'Reports found', reports: result});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

exports.getOneReport = (req,res,next) => {
    const reportId = req.params.reportId;

    if(reportId.match(/^[0-9a-fA-F]{24}$/)){
        Reports.findById(reportId)
        .then(result => {
            if(!result){
                const error = new Error('Could not find any report');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Report found', report: result});
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

exports.updateReport = (req,res,next) => {
    const reportId = req.params.reportId;

    if(reportId.match(/^[0-9a-fA-F]{24}$/)){

        const erros = validationResult(req);

        if(!erros.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            throw error;
        }


        Reports.findByIdAndUpdate(reportId, req.body, {new: true})
        .then(result => {
            if(!result){
                const error = new Error('Could not find any report');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Report Updated', report: result});
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

exports.deleteReport = (req,res,next) => {
    const reportId = req.params.reportId;

    if(reportId.match(/^[0-9a-fA-F]{24}$/)){
        Reports.findByIdAndRemove(reportId)
        .then(result => {
            if(!result){
                const error = new Error('Could not find any report');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Report was deleted!', report: result});
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