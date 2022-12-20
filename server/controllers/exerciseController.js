const Exercise = require('../model/exercise');

const getExercise = async (req, res) => {
    const _id = req.params.exID;
    console.log("_ID: ", req.params.exID);
    if(!_id) return res.status(400).json({ 'message': 'ID required' });
    const exercise = await Exercise.findById(_id);
    if (!exercise) return res.status(204).json({ 'message': 'No exercise found' });
    res.json(exercise);
}

const getAllExercises = async (req, res) => {
    let tfilter;
    let efilter;
    console.log("Target: ", req.query.targetFilter, " + Equip: ", req.query.equipFilter, " + Skip: ", req.query.skip, " + Limit: ", req.query.limit)
    if(req.query.targetFilter === "All") tfilter = null;
    else tfilter = req.query.targetFilter;
    if(req.query.equipFilter === "All") efilter = null;
    else efilter = req.query.equipFilter;
    console.log("T: ", tfilter, " E: ", efilter);
    let exercises;
    if(!efilter && !tfilter){
        console.log("Both null");
        exercises = await Exercise.find().sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
        //console.log(exercises.forEach((exercise) => exercise.fullName));
    }
    else if (!tfilter){
        exercises = await Exercise.find({equipmentTypes: efilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
        console.log("Target null");
        //console.log(exercises.forEach((exercise) => exercise.fullName));
    }else if (!efilter){
        exercises = await Exercise.find({mainMuscleName: tfilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
        console.log("Equip null");
        //console.log(exercises.forEach((exercise) => exercise.fullName));
    }else{
        exercises = await Exercise.find({equipmentTypes: efilter, mainMuscleName: tfilter}).sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
        console.log("Both");
        //console.log(exercises.forEach((exercise) => exercise.fullName));
    }
    if (!exercises) return res.status(204).json({ 'message': 'No exercises found' });
    res.json(exercises);
}

module.exports = {
    getAllExercises,
    getExercise,
}

