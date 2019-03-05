const express = require('express');
const { body } = require('express-validator/check')
const router = express.Router();

const reportsController = require('../controllers/reports');

router.post('/create', [
    body('veterinarian').isMongoId(),
    body('animal').isMongoId(),
    body('dateOfService').toDate(),
    body('observation').trim().isLength({min: 5})
] ,reportsController.createReport);

router.get('/list',reportsController.getReports);

router.get('/find/:reportId',reportsController.getOneReport);

router.put('/update/:reportId', [
    body('veterinarian').isMongoId(),
    body('animal').isMongoId(),
    body('dateOfService').toDate(),
    body('observation').trim().isLength({min: 5})
],reportsController.updateReport);

router.delete('/delete/:reportId', reportsController.deleteReport);

module.exports = router;