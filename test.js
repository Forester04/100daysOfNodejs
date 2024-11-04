const express = require('express');
const bodyParser = require('body-parser');
const { body, param, validationResult} = require('express-validator');

const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Validation and Error Handling Middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

app.get('/', (req, res) => {
    res.send('My first API');
})
app.get('/status', (req, res) => {
    const status = {
        'status' : 'Running'
    }

    res.send(status);
})
app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.post('/submit', (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    console.log(firstname)
    console.log(lastname);
})


// Global Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'An unexpected error occurred' });
});

app.listen(port, () => console.log(`Server listening on ${port}`));