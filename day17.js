// 100 Days of Nodejs challenges
// Day 17 - Basic Authentication
// Implement basic username/password authentication

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8081;

const app = express();

// Dummy user
const user = {
    username : 'John',
    password : 'abcde123'
}

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

    const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];

    if ( username === user.username && password === user.password) {

        next();
    } else {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }
}
app.use(authentication);

app.get('/', (req, res) => {
    res.status(200).send('Basic Authentication');
})


app.listen(port, () => console.log(`Server listening on ${port}`));