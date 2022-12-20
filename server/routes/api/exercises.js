const express = require('express');
const router = express.Router();
const exerciseController = require('../../controllers/exerciseController');

router.route('/')
    .get(exerciseController.getAllExercises)

router.route('/:exID')
    .get(exerciseController.getExercise)
    


module.exports = router;