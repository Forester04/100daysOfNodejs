// 100 Days of Nodejs challenges
// Day 13 - RESTful API Design
// Design a simple RESTful API using Express


const express = require('express');
const bodyParser = require('body-parser');
const { body, param, validationResult } = require('express-validator');

const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// validation and error handling middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
}

app.get('/', (req, res) => {
    res.send('Book App: Simple RESTfull API');
});
app.post('/book', 
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author name is required'),
    validateRequest,
    (req, res) => {
        res.status(201).send({ message: 'Created book successfully', data: req.body })
});
app.put('/book/:id', 
    book('id').isNumeric().withMessage('Book id required'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('author').optional().notEmpty().withMessage('Author name is required'),
    validateRequest,
    (req, res) => {
    res.status(200).send({ message: 'Updated book successfully using book id' });
});
app.delete('/book/:id', 
    book('id').isNumeric().withMessage('Book id is required'),
    validateRequest,
    (req, res) => {
    res.send('Book deleted successfully');
});

// Global error handling

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Internal Error occured'});
})

app.listen(port, () => console.log(`Server listenig on ${port}`));
