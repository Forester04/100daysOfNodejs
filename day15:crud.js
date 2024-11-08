// 100 Days of Nodejs challenges
// Day 15 - CRUD Operations with MongoDB
// Perform CRUD operations using MongoDB and the mongodb Nodejs driver

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const { body, param, validationResult } = require('express-validator');

const port = process.env.PORT || 1337;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Global validation
app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Error');
    }
})
const validateRequest = (req, res, next) => {
    const errors = validationResult;
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array()});
    }
}

const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'Authentication Denied'});
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            return res.status(403).send({ message: 'Authentication Denied'}); 
        }
        req.user = decode;
        next();
    })
}

// DB Connections
const uri = 'mongodb://localhost:1337';
const client = new MongoClient(uri);
const dbName = 'Library';

// Dummy user
const user = {
    userId: 1,
    username: 'John Doe',
    password: 'abcdefghi'
}
// SecretKey
const secretKey = 'your_secret_key';

app.get('/login', (req, res) => {
    const { username, password } = req.body;

    if ( username === user.username && password === user.password ) {
        const token = jwt.sign({ userId: user.id}, secretKey, { expiresIn: '1hr'});
        return res.status(200).send({ message: 'Logging in successful'});
    } else {
        return res.status(400).send({ message: 'Invalid username or password'});
    }
})


// CRUD Operation with MongoDB
async function performCrudOperations() {
    try {
        await client.connect();
        const db = client.db(dbName);

        // CREATE - Protected route to add book
        app.post('book',
            authenticateToken,
            [body('title').notEmpty().withMessage('Title required'),
            body('author').notEmpty().withMessage("Author's name required")],
            validateRequest,
            async (req, res) => {
                const { title, author } = req.body;
                const result = await db.collection('books').insertOne({ title, author});
                res.status(201).json({ message: 'Book added successfully'});
            }
        );

        // READ - Protected route to read all books
        app.get('/books', authenticateToken,
            async (req, res) => {
                const books = await db.collection('books').find().toArray();
                res.status(200).json(books);
            }
        );

        // UPDATE - Protected route to update a book by ID
        app.put('/book/:id',
            authenticateToken,
            validateRequest,
            [ body('title').optional().notEmpty().withMessage('Title required'),
            body('author').optional().notEmpty().withMessage("Author's name required"), param('id').isMongoId().withMessage('Invalid book ID')
            ],
            async (req, res) => {
                const { title, author } = req.body;
                const { id } = req.params;

                const update = {};
                if (title) update.title = title;
                if (author) update.author = author;

                const result = await db.collection('books').updateOne({ _id: new inputId(id) }, { $set: update});
            }
        )
    }
}







app.listen(port, () => console.log(`Server listening on ${port}`));