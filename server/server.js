require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express()

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


const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});