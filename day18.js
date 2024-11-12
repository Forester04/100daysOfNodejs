// 100 Days of Nodejs challenges
// Day 18 - Sessions and Cookies
// Use sessions and cookies for user authentication

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 8081;

// Dummy user 
const user = {
    username: 'John',
    password: 'abcdefg123'
}

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false

}))
app.use(cookieParser());

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
}
app.get('/', (req, res, next) => {
    res.send('Welcome to Session and Cookie Example!');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
})
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        req.session.user = username;
        res.cookie('sessionId', req.sessionID);
        res.redirect('/');
    } else {
        res.send('Invalid credentials. Please try again');
    }
});
app.get('/profile', isAuthenticated, (req, res) => {
    const username = req.session.user;
    res.send(`Welcome ${username} to the session and cookies in expess.js section <a href="/logout">Logout</a>`);
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("sessionId");
        res.redirect('/login');
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on https://localhost:${PORT}`)
})