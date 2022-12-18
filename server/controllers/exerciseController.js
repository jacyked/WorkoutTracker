const Exercise = require('../model/exercise');

const getAllExercises = async (req, res) => {
    const exercises = await Exercise.find();
    if (!exercises) return res.status(204).json({ 'message': 'No exercises found' });
    res.json(exercises);
}

module.exports = {
    getAllExercises
}