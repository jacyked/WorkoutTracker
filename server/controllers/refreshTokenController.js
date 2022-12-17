const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const handleRefreshToken = async (req, res) => {
    console.log("Refresh called");
    const cookies = req.cookies
    console.log("Cookies: ", JSON.stringify(cookies));
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    console.log("Refresh: " + refreshToken);
    const user = await User.findOne({ refreshToken: refreshToken })
    if (!user) return res.status(403)
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
            if (err || user.id !== decoded.id) return res.sendStatus(403)
            
            const accessToken = jwt.sign(
                { 
                    "id": user.id, 
                    "email": user.email
                }, 
                process.env.ACCESS_SECRET, 
                { expiresIn: process.env.ACCESS_EXP }
            )
            console.log("New AT issued: " + accessToken);
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }