const User = require("../models/userModel");

const handleGetUser =async (req, res) => {
    console.log(req?.id);
    console.log(req?.email);

    const user = await User.findById(req.id);
    if(!user) res.status(404).json("Invalid User");
    res.status(200).json({
        username: user.username,
        email: user.email,
        workoutList: user.workoutList,
        startDate: user.date,
        //gender: user.gender,
        //age: user.age,
        //weight: user.weight
        //weightHistory: user.weightHistory


    });
    
}

module.exports = { handleGetUser }