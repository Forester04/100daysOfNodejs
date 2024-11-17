// 100 Days of Nodejs challenges
// Day 23 - Basic WebSocket Server
// Create a WebSocket server using the ws library

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 1337;


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send('Basic WebSockets');
})


app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));