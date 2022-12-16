const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.status(401)
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.SECRET_OR_KEY,
        (err, decoded) => {
            if (err) return res.status(403).json("Forbidden")
            req.id = decoded.id
            req.email = decoded.email
            next()
        }
    )
}

module.exports = verifyJWT