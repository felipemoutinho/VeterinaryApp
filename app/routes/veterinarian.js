const express = require('express');
const { body } = require('express-validator/check')
const router = express.Router();
const veterinariansController = require('../controllers/veterinarian');

router.get('/list', veterinariansController.getVeterinarians);

module.exports = router;