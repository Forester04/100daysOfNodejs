// 100 Days of Nodejs challenges
// Day 16 - Express Middleware for Error Handling
// Implement middleware for handling errors in an Express app

/*
 * Way of handling errors include: using middlewares, try ... catch, error logging, http status code
 * To avoid the using try and catch inside our core route logic, we use the middlewware
 * 
*/


const express = require('express');
const bodyParser = require('body-parser');
const { body, param, validationResult } = require('express-validator');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 1337;

const app = express();

// Variables
const secretKey = 'your_secret_key';

// Dummy User
const user = {
    userId: 1,
    username: 'John Doe',
    password: 'abcdefghi'
}
// DB Connections
const uri = 'mongodb://localhost:1337';
const client = new MongoClient(uri);
const dbName = 'library';
// Setting up Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

// Authenticating and handling any errors in the auth passing them to the next middleware
const authenticateToken = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        return res.status(403).send('Invalid token');
    }
    jwt.verify(token, secretKey, (err, decode) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = decode;
        next();
    });
}
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()});
    }
}


// Handling errors using try ... catch and status code
app.get('/login', (req, res) => {
   try {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ userId: user.userId}, secretKey, { expiresIn: '1hr'});

        return res.status(200).json({ message: 'Successfully logged in'}, token);
    }
   } catch (err) {
    return res.status(400).send('Broken authentication')
   }
})

client.connect();
const db = client.db(dbName);
async function run() {
    try {

        // CREATE
        app.post('/book', authenticateToken, validateRequest, body('title').notEmpty().withMessage('Title field required'), body('author').notEmpty().withMessage('Auhtor field required'), async (req, res) => {
            const { title, author } = req.body;
            const result = await db.collection('books').insertOne({title, author});
            res.status(201).json({ message: 'Book added successfully', bookId: result.insertedId});
        })

        // READ
        app.get('/books', authenticateToken, validateRequest, async (req, res) => {
            const books = await db.collection('books').find().toArray();
            res.status(200).json(results)
        })

        // UPDATE
        app.put('/book/:id', authenticateToken, validateRequest, body('title').optional().notEmpty().withMessage('Title field required'), body('author').optional().notEmpty().withMessage('Auhtor field required'), param('id').isMongoId().withMessage('Invaid book ID'), (req, res) => {
            const { title, author } = req.body;
            const { id } = req.params;

            const update = {};
            if (title) update.title = title;
            if (author) update.author = author;
            const results = db.collection('books').updateOne({ _id: ObjectId(id)}, {$set: update});
            if (results.matchedCount === 0) res.status(200).json({ message: 'Book not found'});
            res.status(200).json({message: 'Book Added successfully'});

        })

        // 
        app.delete('/book/:id', authenticateToken, validateRequest, param('id').isMongoId().withMessage('Invaid book ID'), (req, res) => {
            const { id } = req.params;

            const results = db.collection('books').deleteOne({ _id: ObjectId(id)});
            if (results.deletedCount === 0) res.status(200).json({ message: 'Book not found'});
            res.status(200).json({message: 'Book deleted successfully'});
        })

    } finally {
        await client.close();
    }
    
}

run().catch(console.error);

//Error Handling to handle errors passed to express 
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        res.status(500).send('Internal Error');
    }
})


app.listen(port, () => console.log(`Server listening on ${port}`));