// 100 Days of Nodejs challenges
// Day 19 - File Uploads
// Handle file uploads in an Express app

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 1337;

// Dummy user
const user = {
    username: 'John',
    password: 'abcdeghi123'
}

const app = express();

// Middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUpload());

const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    }
    next()
}

// Home
app.get('/', (req, res) => {
    res.status(200).send('Simple Upload with Express');
})
// Logging in
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {

        req.session.user = username;
        res.cookie('sessionId', req.sessionID);
        res.redirect('/upload');
    } else {
        res.status(400).send('Invalid credential. Please try again');
    }
});

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})
app.post('/upload', isAuthenticated, (req, res) => {
    if (req.files && Object.keys(req.files).length !== 0) {

        const uploadedFile = req.files.uploadFile;
        console.log(uploadedFile);

        const uploadPath = __dirname + '/uploads/' + uploadedFile.name;
        console.log(uploadPath);

        uploadedFile.mv(uploadPath, function (err) {
            if (err) {
                console.error(err);
                res.send('Failed to upload file');
            } else {
                res.send('File uploaded successfully');
            }
        })
    } else {
        res.send('No file uploaded');
    }
})

// Global Error Handling
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
    res.status(500).send('Internal Error Occurred');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})