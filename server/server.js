require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
const refresh = require("./routes/refresh");
const cors = require("cors");


const app = express()
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}))
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
);
app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/users", users);
app.use("/refresh", refresh);

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});

