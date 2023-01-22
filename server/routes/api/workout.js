const express = require('express');
const router = express.Router();
const workoutController = require('../../controllers/workoutController');


router.route('/')
    .get(workoutController.getAllWO)
    
router.route('/find/:workoutID')
    .get(workoutController.getWO)

router.route('/data')
    .get(workoutController.getBigThree)

module.exports = router;