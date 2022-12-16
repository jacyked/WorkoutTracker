const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
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
                { expiresIn: '1d' }
            )
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken }