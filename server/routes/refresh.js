const express = require('express');
const refreshTokenController = require('../controllers/refreshTokenController');
const router = express.Router()
const verifyJWT = require('../middleware/validation/verifyJWT')

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router