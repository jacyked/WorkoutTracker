const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log("Verifying JWT: ");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const params = req?.params;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log("Token recieved: ", token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log("Invalid Token");
                return res.sendStatus(403); }//invalid token
            req.user = decoded.user;
            req.id = decoded.id;
            req.params = params;
            console.log("Token Valid");
            next();
        }
    );
}

module.exports = verifyJWT