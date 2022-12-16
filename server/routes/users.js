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
router.get("/", async (req, res) => {
    const accessToken = req.body.accessToken;
    const decoded = jwt.verify(accessToken, process.env.SECRET_OR_KEY);
    const user = await User.findById(decoded.id);
    const redirect_url = process.env.CLIENT_URL + '/login'
    if(!user){
        res.redirect(404, redirect_url);
    }else{
        if (accessToken === user.refreshToken){
            res.status(200).json({
                username: user.username,
                email: user.email,
                date: user.date,
                workouts: user.workoutList,
                gender: user.gender

            });
        }
        else{
            res.redirect(400, redirect_url);
        }
    }
    
});

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
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            username: user.username
          };
  // Sign token
          jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
              expiresIn: process.env.LOGIN_EXP // 1 year in seconds
            },
            async (err, token) => {
                await User.findByIdAndUpdate(user.id, { $set: { refreshToken: token } }, { new:true });
                res.json({
                    success: true,
                    accessToken: "Bearer " + token
                });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;