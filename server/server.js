require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Listening on port: ' + port);
});