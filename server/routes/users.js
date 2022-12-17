const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const validateRegisterInput = require("../middleware/validation/register");
const validateLoginInput = require("../middleware/validation/login");

const User = require("../models/userModel");

// @route POST %BASE_URL%/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(409).json({ errMsg: "Email already exists" });
      } else {
        User.findOne({username: req.body.username}).then(user => {
            if (user) {
                return res.status(409).json({ errMsg: "Username already exists" });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                  });
                  // Hash password before saving in database
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                  });
            }
        });

      }
    });
  });

//@route POST %BASE_URL%/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then( async isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
            const accessToken = jwt.sign(
                { 
                "id": user.id, 
                "email": user.email
                }, 
                process.env.ACCESS_SECRET, 
                { expiresIn: process.env.ACCESS_EXP }
            )
            const refreshToken = jwt.sign(
                { 
                "id": user.id, 
                "email": user.email
                }, 
                process.env.REFRESH_SECRET, 
                { expiresIn: process.env.REFRESH_EXP }
            )
            // Add refresh token to db
            await User.findByIdAndUpdate(user.id, { $set: { refreshToken: refreshToken } }, { new:true })
            // Create secure cookie with refresh token
            res
            .cookie("jwt", refreshToken, {
                httpOnly: true, // Accessible only by web server, set true after testing
                sameSite: 'None',
                secure: false, // Enables https ** CHANGE SECURE TO TRUE BEFORE DEPLOYMENT **
                // sameSite: "None", // Cross-site cookie
                maxAge: process.env.LOGIN_EXP, // Cookie expiry
            })
            .status(200)
            .json({
                accessToken: accessToken,
            })


        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;