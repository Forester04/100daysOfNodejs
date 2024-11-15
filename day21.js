// 100 Days of Nodejs challenges
// Day 21 - Promises in Nodejs
// Understand and use promises for asynchronous operations

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 1337;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Promises for asynchronous operations')
})



app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})