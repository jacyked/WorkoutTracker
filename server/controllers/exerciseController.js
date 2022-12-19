const Exercise = require('../model/exercise');

const getAllExercises = async (req, res) => {
    //console.log(req.query.limit, " + skip ", req.query.skip)
    let exercises;
    if(!req.query.targetFilter && !req.query.equipFilter){
        exercises = await Exercise.find().sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
    }
    else if (!req.query.targetFilter){
        exercises = await Exercise.find({equipmentTypes: req.query.equipFilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);

    }else if (!req.query.equipFilter){
        exercises = await Exercise.find({mainMuscleName: req.query.targetFilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
    }else{
        exercises = await Exercise.find({equipmentTypes: req.query.equipFilter, mainMuscleName: req.query.targetFilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
    }
    if (!exercises) return res.status(204).json({ 'message': 'No exercises found' });
    res.json(exercises);
}

module.exports = {
    getAllExercises
}

