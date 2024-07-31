const asyncHandler = require('express-async-handler');
const Library = require('../models/libraryModel');
const Book = require('../models/bookModel');

const getLibraries = asyncHandler(async (req, res) => {
  const libraries = await Library.find({}).populate('books');
  res.json(libraries);
});

const getLibraryById = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id).populate('books');

  if (library) {
    res.json(library);
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

const createLibrary = asyncHandler(async (req, res) => {
  const { name, address } = req.body;
  const library = new Library({
    name,
    address,
  });
  const createdLibrary = await library.save();
  res.status(201).json(createdLibrary);
});

const updateLibrary = asyncHandler(async (req, res) => {
  const { name, address } = req.body;

  const library = await Library.findById(req.params.id);

  if (library) {
    library.name = name || library.name;
    library.address = address || library.address;

    const updatedLibrary = await library.save();
    res.json(updatedLibrary);
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

const deleteLibrary = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id);

  if (library) {
    await library.remove();
    res.json({ message: 'Library removed' });
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

const getLibraryInventory = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id).populate('books');

  if (library) {
    res.json(library.books);
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

const addBookToInventory = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const library = await Library.findById(req.params.id);

  if (library) {
    const book = await Book.findById(bookId);
    if (book) {
      library.books.push(bookId);
      await library.save();
      res.json({ message: 'Book added to inventory' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

const removeBookFromInventory = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id);

  if (library) {
    library.books.pull(req.params.bookId);
    await library.save();
    res.json({ message: 'Book removed from inventory' });
  } else {
    res.status(404);
    throw new Error('Library not found');
  }
});

module.exports = {
  getLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
};
