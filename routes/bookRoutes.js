const express = require('express')
const limiter=require('../middleware/ratelimiter');
const {getBooks,getBookById,createBook,updateBook,deleteBook,borrowBook,returnBook,suggestBooks} = require('../controllers/bookController');
const {protect, authorize }=require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getBooks).post(protect,authorize('Author'),createBook);
router.route('/:id').get(protect, getBookById).put(protect, authorize('Author'), updateBook).delete(protect, authorize('Author'), deleteBook);
router.route('/borrow').post(protect, authorize('Borrower'), borrowBook);

router.route('/return/:id').put(protect, authorize('Borrower'), returnBook);

router.route('/suggestBooks').post(protect, limiter, suggestBooks);

module.exports = router;
