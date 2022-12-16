const express = require('express');
const {
    handleRefreshToken
} = require('../controllers/refreshTokenController')
const router = express.Router()
const verifyJWT = require('../middleware/validation/verifyJWT')

router.get('/', handleRefreshToken)

router.get('/verify', verifyJWT);

module.exports = router