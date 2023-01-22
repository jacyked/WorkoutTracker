const User = require('../model/user');
const Workout = require('../model/workout');

//Get all workouts from user
const getAllWO = async (req, res) => {
    console.log("Fetching user: ", JSON.stringify(req.user));
    if (!req?.user) return res.status(400).json({ "message": 'Username required' });
    const user = await User.findOne({ username: req.user }).exec();
    //console.log("Searching for user: ", JSON.stringify(req.id))
    if (!user) {
        //console.log("No User found.")
        return res.status(204).json({ 'message': `Username ${req.user} not found` });
    }
    let userID = user._id;
    const result = await Workout.find({
        user: userID
    });
    
    res.json(result);
}
//Find workout by ID
const getWO = async (req, res) => {
    //TODO add check to ensure user requesting ID has permissions ie. user matches, impliment allowed sharing list etc. 
    const _id = req.params.workoutID;
    console.log("_ID: ", req.params.workoutID);
    console.log("Tostring: ", req.params.workoutID.toString())
    if(!_id) return res.status(400).json({ 'message': 'ID required' });
    const workout = await Workout.findById(_id);
    if (!workout) return res.status(204).json({ 'message': 'No workout found' });
    res.json(workout);
}
//Test to get graph data process figured out
const getBigThree = async (req, res) => {
    console.log("Fetching user: ", JSON.stringify(req.user), " for bigthree");
    if (!req?.user) return res.status(400).json({ "message": 'Username required' });
    const user = await User.findOne({ username: req.user }).exec();
    //console.log("Searching for user: ", JSON.stringify(req.id))
    if (!user) {
        //console.log("No User found.")
        return res.status(204).json({ 'message': `Username ${req.user} not found` });
    }
    let userID = user._id;

    //User ID now found, search workout database
    const deadliftlist = await Workout.find({user: userID, exercises:{$elemMatch:{name: "Barbell Deadlift"}}})
    let deadliftSets = [];
    deadliftlist.forEach((wo) => {
        let ex = wo.exercises.find(name == "Barbell Deadlift");
        deadliftSets.push({name: "Barbell Deadlift", startDate: wo.startDate, sets: ex.sets})
    });

    console.log("Deadlift sets: ", deadliftSets.toString());
    return res.json({"message": "Completed"});

}

module.exports = {
    getAllWO,
    getWO,
    getBigThree,
}