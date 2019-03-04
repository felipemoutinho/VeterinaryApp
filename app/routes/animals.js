const express = require('express');
const router = express.Router();

const animalsController = require('../controllers/animals');

router.get('/list', animalsController.getAnimals);

module.exports = router;