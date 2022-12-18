const User = require('../model/user');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, email, pwd } = req.body;
    if (!user || !email || !pwd) return res.status(400).json({ 'message': 'Username, email, and password are required.' });

    // check for duplicate users in the db
    const duplicateUser = await User.findOne({ username: user }).exec();
    if (duplicateUser) return res.sendStatus(409); //Conflict 
    const duplicateEmail = await User.findOne({ email: email }).exec();
    if(duplicateEmail) return red.sendStatus(409);//Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };