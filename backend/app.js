const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const Book = require('./models/book');

const app = express();

// CORS configuration
app.use(cors({
  origin: '*', // In production, specify allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB local connection
mongoose.connect('mongodb://localhost:27017/book_catalog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Route to handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Book Review System API');
});

// Get all books
app.get('/books', async (req, res, next) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// Add a new book
app.post('/books', [
  check('title').not().isEmpty().withMessage('Title is required'),
  check('author').not().isEmpty().withMessage('Author is required'),
  check('review').optional().isString().withMessage('Review must be a string')
], async (req, res, next) => {
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
});

// Get a specific book
app.get('/books/:id', getBook, (req, res) => {
  res.json(res.book);
});

// Update a book
app.patch('/books/:id', getBook, async (req, res, next) => {
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
    next(err);
  }
});

// Delete a book
app.delete('/books/:id', getBook, async (req, res, next) => {
  try {
    const result = await Book.deleteOne({ _id: res.book._id });
    if (result.deletedCount === 1) {
      res.json({ message: 'Deleted Book' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    next(err);
  }
});

// Middleware to get a book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
  } catch (err) {
    return next(err);
  }

  res.book = book;
  next();
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
