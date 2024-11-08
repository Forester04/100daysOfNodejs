// 100 Days of Nodejs challenges
// Day 15 - CRUD Operations with MongoDB
// Perform CRUD operations using MongoDB and the mongodb Nodejs driver

const bodyParser = require('body-parser');
const express = require('express');
const { body,  param, validationResult } = require('express-validator')
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))


// Dummy User
const user = {
    userId: 1,
    username: 'John Doe',
    password: 'abcdefghi'
}
// Secret Key
const secretKey = 'your_secret_key';

// DB connection
const uri = "mongodb://localhost:1337";
const client = new MongoClient(uri);

// Global validation
app.use((err, req, res) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Error');
    }
})

const validateRequest = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()});
    }
}
const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        res.status(403).send(' Authentcation Denied');
    }

    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            return res.status(403).send('Authenication Denied');
        }
        req.user = decode;
        next();
    })
}

app.get('/login',
    (req, res) => {
        const { username, password } = req.body;

        if (username === username.username && password === user.password) {
            const token = jwt.sign({ userId: user.userId}, secretKey, { expiresIn: '1hr'});

            res.status(200).json({ message: 'Logged in successfully', token});
        } else {
            res.status(400).send('Invalid username or password');
        }
    }
)

// Performing Crud operation on Protected routes
async function run() {
    try {
        await client.connect();
        const db = client.db(dbName);
        // CREATE
        app.post('/book', authenticateToken, validateRequest, [body('title').notEmpty().withMessage('Title required'), body('author').notEmpty().withMessage('Author required')], async (req, res) => {
            const { title, author } = req.body
            
            const results = await db.collection('books').insertOne({ title, author});
            res.status(201).json({ message: 'Book added successfully', bookId: results.result.insertedId});
        });

        // READ
        app.get('/books', authenticateToken, async (req, res) => {
            const books = await db.collection('books').find().toArray();
            res.status(200).json(books);
        });

        // UPDATE
        app.put('/book/:id', authenticateToken, validateRequest,
            body('title').optional().notEmpty().withMessage('Title required'), body('author').optional().notEmpty().withMessage('Author required'), param('id').isMongoId().withMessage('Invalid book ID'), async (req, res) => {
                const { title, author } = req.body;
                const { id } = req.params;

                const update = {};
                if (title) update.title = title;
                if (author) update.author = author;

                const results = await db.collection('books').updateOne({_id: new ObjectId() }, {$set: update});
                if (results.matchedCount === 0) return res.status(404).json({ message: 'Book not found'});
            }
        )
    }
}


app.listen(port, () => console.log(`Server listening on ${port}`));