const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    console.log("Verifying JWT");
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader?.startsWith('Bearer ')) return res.status(401)
    const token = authHeader.split(' ')[1]
    console.log("Token: " + token);
    jwt.verify(
        token,
        process.env.ACCESS_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json("Forbidden")
            req.id = decoded.id
            req.email = decoded.email
            console.log("JWT Decoded, next");
            next()
        }
    )
}

module.exports = verifyJWT