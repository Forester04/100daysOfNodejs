// 100 Days of Nodejs challenges
// Day 25 - Testing with Mocha and Chai
// Write basic tests using Mocha and Chai

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 1337;

const app = require('express');

app.get('/', (req, res) => {
    res.send('Day 25')
})




app.listen(PORT, () => console.log(`Server listening on ${PORT}`));