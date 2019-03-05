const express = require('express');
const { body } = require('express-validator/check')
const router = express.Router();
const veterinariansController = require('../controllers/veterinarian');

router.get('/list', veterinariansController.getVeterinarians);
router.get('/find/:vetId', veterinariansController.getOneVeterinarian);

router.post('/create', [
    body('name').trim().isLength({min: 5}),
    body('specialty').trim().isLength({min: 5}),
    body('regionalVeterinaryCouncilNumber').trim().isLength({min: 8})
] ,veterinariansController.createVeterinarians);

router.put('/update/:vetId', [
    body('name').trim().isLength({min: 5}),
    body('specialty').trim().isLength({min: 5}),
    body('regionalVeterinaryCouncilNumber').trim().isLength({min: 8})
], veterinariansController.updateVeterinarian);

router.delete('/delete/:vetId',veterinariansController.deleteVeterinarian);

module.exports = router;