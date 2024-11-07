const bodyParser = require('body-parser');
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const port = process.env.PORT || 1337;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array()});
    }
}

// Global validation
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: ' Internal Error'});
})
app.get('/', (req, res) => {
    res.status(200).send('Book App: Simple RESTful API');
});
app.post('/book',
    body('title').notEmpty().withMessage("Title shouldn't be empty"),
    body('author').notEmpty().withMessage("Author's name shouldn't empty"),
    validateRequest,
    (req, res) => {
        res.status(201).send('Book added successfully');
    }   
);
app.put('/book/:id',
    body('title').optional().notEmpty().withMessage("Title shouldn't be empty"),
    body('author').optional().notEmpty().withMessage("Author's name shouldn't empty"),
    param('id').isNumeric().withMessage('Book id should be a number'),
    validateRequest,
    (req, res) => {
        res.status(200).send('Book update successfully');
    }   
);
app.delete('/book/:id',
    body('title').optional().notEmpty().withMessage("Title shouldn't be empty"),
    body('author').optional().notEmpty().withMessage("Author's name shouldn't empty"),
    validateRequest,
    (req, res) => {
        res.status(200).send('Book deleted successfully');
    }   
);
app.listen(port, () => console.log(`Server listening on ${port}`));

