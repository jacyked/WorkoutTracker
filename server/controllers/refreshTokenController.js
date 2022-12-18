const User = require('../model/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    console.log("Refresh called: ");
    const cookies = req.cookies;
    console.log("Cookies recieved: ", JSON.stringify(cookies));
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log("USer found with token, verifying token.");
            if (err || foundUser.username !== decoded.user) return res.sendStatus(403);
            console.log("RToken valid. Generating new AToken");
            const accessToken = jwt.sign(
                {
                        "user": decoded.user,
                        "id": decoded.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }