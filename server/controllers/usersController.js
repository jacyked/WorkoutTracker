const User = require('../model/user');

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
    console.log("Fetching user: ", JSON.stringify(req.user));
    if (!req?.user) return res.status(400).json({ "message": 'Username required' });
    const user = await User.findOne({ _id: req.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `Username ${req.user} not found` });
    }
    //Add workout to user then save
    res.json(user);
}
module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    saveWO,
}