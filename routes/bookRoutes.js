const express = require('express');
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getBooks).post(protect, authorize('Author'), createBook);
router.route('/:id').get(protect, getBookById).put(protect, authorize('Author'), updateBook).delete(protect, authorize('Author'), deleteBook);

module.exports = router;
