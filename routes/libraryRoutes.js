const express = require('express');
const { getLibraries, getLibraryById, createLibrary, updateLibrary, deleteLibrary, getLibraryInventory, addBookToInventory, removeBookFromInventory } = require('../controllers/libraryController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getLibraries).post(protect, authorize('Admin'), createLibrary);
router.route('/:id').get(protect, getLibraryById).put(protect, authorize('Admin'), updateLibrary).delete(protect, authorize('Admin'), deleteLibrary);
router.route('/:id/inventory').get(protect, getLibraryInventory).post(protect, authorize('Admin'), addBookToInventory);
router.route('/:id/inventory/:bookId').delete(protect, authorize('Admin'), removeBookFromInventory);

module.exports = router;
