// 100 Days of Nodejs challenges
// Day 16 - Express Middleware for Error Handling
// Implement middleware for handling errors in an Express app


const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 1337;


const app = express();

app.get('/', (req, res, next) => {
    res.status(200).send('Error handling in Express');
})

app.listen(port, () => console.log(`Server listening on ${port}`));