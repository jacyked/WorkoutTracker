const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workoutController');


router.route('/')
    .get(workoutController.getAllWO)
    
router.route('/:workoutID')
    .get(workoutController.getWO)


module.exports = router;