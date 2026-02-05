const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const Library = require('../models/libraryModel');
const User = require('../models/userModel');
const { invalidateBookCache } = require('../utils/cacheUtil');

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
  
  // Invalidate cache after creating a book
  await invalidateBookCache();
  
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
    
    // Invalidate cache after updating a book
    await invalidateBookCache();
    
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.deleteOne();
    
    // Invalidate cache after deleting a book
    await invalidateBookCache();
    
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

  // Invalidate cache after borrowing a book
  await invalidateBookCache();

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

  // Invalidate cache after returning a book
  await invalidateBookCache();

  res.json(book);
});

const suggestBooks = async (req, res) =>{
  const { bookTitle } = req.body;

  try {
    const model = genAI.getGenerativeModel({model:'gemini-1.5-flash'});

    const prompt = `
      Suggest 3 books similar to the given book based on author and title.
      Respond ONLY with a valid JSON array like:
      ["Book Title 1", "Book Title 2", "Book Title 3"]

      TEXT: ${bookTitle}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    
    if (text.startsWith("```")){
      text = text.replace(/```json|```/g, "").trim();
    }

    const bookssug =JSON.parse(text);
    res.json({bookssug});

  } catch (err) {
    console.error("Error suggesting books:", err.message);
    
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  suggestBooks
};
