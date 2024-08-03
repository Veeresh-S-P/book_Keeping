const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const Library = require('../models/libraryModel');
const User = require('../models/userModel');

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).populate('author').populate('library').populate('borrower');
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author').populate('library').populate('borrower');
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const createBook = asyncHandler(async (req, res) => {
  const { title, author, library } = req.body;
  const book = new Book({
    title,
    author,
    library,
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

const updateBook = asyncHandler(async (req, res) => {
  const { title, author, library, borrower } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title || book.title;
    book.author = author || book.author;
    book.library = library || book.library;
    book.borrower = borrower || book.borrower;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.remove();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});


const borrowBook = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  if (book.borrower) {
    res.status(400);
    throw new Error('Book already borrowed');
  }

  book.borrower = req.user._id;
  await book.save();

  res.json(book);
});

const returnBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  if (!book.borrower.equals(req.user._id)) {
    res.status(403);
    throw new Error('You are not the borrower of this book');
  }

  book.borrower = null;
  await book.save();

  res.json(book);
});

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,

};
