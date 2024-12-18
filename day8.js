// Day 8 - Express Basics
// Set up an Express application and create routes

const express = require('express');

const port = process.env.PORT || 1337;

const app = express();

app.get('/', respondChat);
app.get('/echo', respondEcho);


app.listen(port, () => console.log(`Server listening on ${port}`));

function respondChat(req, res) {
    res.end('100daysOfNodejs');
}

function respondEcho(req, res) {
    const { input = ''} = req.query;
    
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
        .split('')
        .reverse()
        .join('')
    })
}