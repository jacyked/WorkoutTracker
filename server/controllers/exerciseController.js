const Exercise = require('../model/exercise');

const getAllExercises = async (req, res) => {
    console.log(req.query.limit, " + skip ", req.query.skip)
    const exercises = await Exercise.find().sort({rating:-1}).limit(req.query.limit).skip(req.query.skip);
    if (!exercises) return res.status(204).json({ 'message': 'No exercises found' });
    res.json(exercises);
}

module.exports = {
    getAllExercises
}