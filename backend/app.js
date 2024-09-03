const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/book_catalog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Route to handle the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Book Review System API');
});

// Routes for creating, reading, updating, deleting books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/books', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        review: req.body.review
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/books/:id', getBook, (req, res) => {
    res.json(res.book);
});

app.patch('/books/:id', getBook, async (req, res) => {
    if (req.body.title != null) {
        res.book.title = req.body.title;
    }
    if (req.body.author != null) {
        res.book.author = req.body.author;
    }
    if (req.body.review != null) {
        res.book.review = req.body.review;
    }

    try {
        const updatedBook = await res.book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/books/:id', getBook, async (req, res) => {
    try {
        console.log('Book to delete:', res.book);
        const result = await Book.deleteOne({ _id: res.book._id });
        console.log('Deletion result:', result);
        if (result.deletedCount === 1) {
            res.json({ message: 'Deleted Book' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// app.js (Add at the end, before app.listen)

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Logs the error stack to the console
    res.status(500).json({ message: 'Internal Server Error' });
});

// Example in a route
app.post('/books', async (req, res, next) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            review: req.body.review
        });
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        next(err); // Passes the error to the global error-handling middleware
    }
});

const { check, validationResult } = require('express-validator');

// Validation example in a POST route
app.post(
    '/books',
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('author').not().isEmpty().withMessage('Author is required'),
        check('review').optional().isString().withMessage('Review must be a string')
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const book = new Book(req.body);
            const newBook = await book.save();
            res.status(201).json(newBook);
        } catch (err) {
            next(err);
        }
    }
);
