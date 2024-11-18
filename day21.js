// 100 Days of Nodejs challenges
// Day 21 - Promises in Nodejs
// Understand and use promises for asynchronous operations

/**
 * Express setup using promises to fetch and process data in parallel
 */

const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Dummy user
const user = {
    userId: 1,
    username: 'Erick',
    password: 'abcdefghi123'
}

const PORT = process.env.PORT || 1337;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const fetchData = () => {
    return new Promise(function(resolve) {
        setTimeout(() => {
            const data = { userId: user.userId, username: user.username};
            resolve(data);
        })
    })
}

const getData = async () => {
    try {
        const data = await fetchData();
        console.log('Data fetch successfully');
    } catch (error) {
        console.error(error);
    }
}
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Invalid token');
    }
    jwt.verify(token, SECRET_KEY, (err,  decoded) => {
        if (err) {
            return res.status(403).send('Logging in failed');
        }
        req.user = decoded;
        next();
    })
}

app.get('/', (req, res) => {
    res.send('Basic promise for asynchronous operations');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    try {
        if (username === user.username && password === user.password) {

            const token = jwt.sign({ userId: user.userId}, SECRET_KEY, { expiresIn: '1hr'});

            return res.json({ token });
            
        } else {
            return res.status(400).send('Invalid credentials. Please try again');
        }
    } catch (error) {
        console.error(error);
    }
})
app.get('/datafetch', authenticateToken, async (req, res) => {
    const results = await getData();
    res.json(results);
})

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})