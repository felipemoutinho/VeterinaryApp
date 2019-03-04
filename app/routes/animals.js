const express = require('express');
const { body } = require('express-validator/check')

const router = express.Router();

const animalsController = require('../controllers/animals');

router.get('/list', animalsController.getAnimals);

router.post('/create', [
    body('name').trim().isLength({min: 5}),
    body('age').trim().isNumeric(),
    body('breed').trim().isLength({min: 3}),
    body('ownerName').trim().isLength({min:5})
] ,animalsController.createAnimals);

module.exports = router;