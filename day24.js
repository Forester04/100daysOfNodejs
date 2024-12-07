// 100 Days of Nodejs challenges
// Day 24 - CRON Jobs in Nodejs
// Schedule tasks using CRON syntax in a Nodejs app

/**
 * Used to handle maintainance or repetitive tasks such as: backups, logging, sending newsletters, subscription emails and more.
 * order of time of execution: form right to left - Day of the week 0 - 7, month 1-12, Day of the month 1-31, Hour 0-23, minute 0-60, seconds(optional) 0-60
 */

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs')

const PORT = process.env.PORT || 1337;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Basic setup to log a message after every 10 seconds using cron');
})

// logs the  message after 10 seconds
cron.schedule("*/10 * * * * *", function() {

    const data = `${new Date().toUTCString()} : Server is running!`;
    fs.appendFile('public/hello.txt', data , function(err) {

        if (err) throw err;

        console.log('Status logged');
    })
    
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})