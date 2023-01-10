const User = require('../model/user');
const Workout = require('../model/workout');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    console.log("Fetching user: ", JSON.stringify(req.user));
    if (!req?.user) return res.status(400).json({ "message": 'Username required' });
    const user = await User.findOne({ _id: req.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `Username ${req.user} not found` });
    }
    res.json(user);
}
const saveWO = async (req, res) => {
    console.log("Fetching user: ", JSON.stringify(req.user), ", Workout: ", (req.body.workout));
    //console.log(req.params.workout)
    if (!req?.user) return res.status(400).json({ "message": 'Username required' });
    const user = await User.findOne({ username: req.user }).exec();
    //console.log("Searching for user: ", JSON.stringify(req.id))
    if (!user) {
        //console.log("No User found.")
        return res.status(204).json({ 'message': `Username ${req.user} not found` });
    }
    //Add workout to user then save
    //console.log("User found.")
    let arr = user.workoutList;
    arr.push(req.body.workout);
    

    const workout = JSON.parse(req.body.workout)
    //create and store the new workout
    const result = await Workout.create({
        user: user._id,
        startDate: workout.startDate,
        endDate: workout.endDate,
        default: workout.default,
        exercises: workout.exercises,
        notes: workout.notes,
        finalNotes: workout.finalNotes,
        other: workout.other,
        sleep: workout.sleep,
        targets: workout.targets,
    });


    console.log("Workout created: ", result);
    let idarr = user.workoutIDs
    idarr.push(result._id);

    const update = await User.findOneAndUpdate({ username: req.user }, {workoutList: arr, workoutIDs: idarr}, { new: true})
        
        
    
    //console.log("User updated: ", JSON.stringify(update))
    
    res.json(update);
}
module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    saveWO,
}