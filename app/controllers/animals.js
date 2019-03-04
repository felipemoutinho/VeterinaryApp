const { validationResult } = require('express-validator/check');
const Animals = require('../models/animals');

exports.getAnimals = (req,res,next) => {
    res.status(200).json({
        animals: [{name: 'Billy', age: 5,breed:'Dog',ownerName:'Felipe'},
                  {name: 'Tody', age: 3,breed:'Cat',ownerName:'Gustavo'}]
    });
};

const post = new Animals({
    name: 'B',
    age: 3,
    breed: 'Gato',
    ownerName: 'Felipe'
});



exports.createAnimals = (req,res,next) => {
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        return res.status(422).json({message:'Validation failed!', erros: erros.array()});
    }

    else {
        post.save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Created ok!',
            post: result
            })
        })
        .catch(err => {console.log(err)});
    }
};