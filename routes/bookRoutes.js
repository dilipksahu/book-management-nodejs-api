const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;