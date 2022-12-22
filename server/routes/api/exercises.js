const express = require('express');
const router = express.Router();
const exerciseController = require('../../controllers/exerciseController');

router.route('/')
    .get(exerciseController.getAllExercises)

router.route('/search/:exID')
    .get(exerciseController.getExercise)
    
router.route('/search')
    .get(exerciseController.searchExercises)

module.exports = router;