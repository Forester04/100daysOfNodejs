// 100 Days of Nodejs challenges
// Day 25 -
// Testing with Mocha and Chai
// Write basic tests using Mocha and Chai

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 1337;

const app = express();

app.get('/', (req, res) => {
    res.send('Mocha and chai Testing');
})

app.listen(PORT, () => {
    console.log(`Server listening on http://${PORT}`);
})