const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');


const port = process.env.PORT || 1337;
const app = express();

const secretKey = 'your_secret_key'


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array()});
    }
    next();
}

const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        res.status(403).send('Authentication Denied');
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            res.status(403).send('Authentication Denied');
        }
        req.user = decode;
        next();
    })
}

// Global validation
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Error');
    }
})

// Dummy user
const user = {
    id: 1,
    username: 'John Doe',
    password: 'abcdefghi'
};

app.get('/', (req, res) => {
    res.status(200).send('Book App: Simple RESTful API');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1hr'});

        return res.status(201).send({ message: 'Logging in successful', token });
    } else {
        return res.status(400).send('Invalid username or password');
    }
    
})
app.post('/book/:id',
    body('title').notEmpty().withMessage('Title required'),
    body('author').notEmpty().withMessage('Author required'),
    validateRequest,
    authenticateToken,
    (req, res) => {
        res.status(201).send({ message: 'Book added succesfully' });
    }
);

app.put('/book/:id',
    body('title').optional().notEmpty().withMessage('Title required'),
    body('author').optional().notEmpty().withMessage('Author required'),
    param('id').isNumeric().notEmpty().withMessage('Id should not be empty'),
    validateRequest,
    authenticateToken,
    (req, res) => {
        res.status(201).send({ message: 'Book updated succesfully' });
    }

)
app.delete('/book/:id',
    param('id').isNumeric().notEmpty().withMessage('Book Added succesfully'),
    validateRequest,
    (req, res) => {
        res.status(200).send({ message: 'Book deleted succesfully' });
    }

)

app.listen(port, () => console.log(`Server listening on ${port}`));



