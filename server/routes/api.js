const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiController = require("../controllers/apiController");

router.get("/", apiController.handleGetUser);

module.exports = router;