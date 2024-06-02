const express = require('express');
const router = express.Router();
const { createBook, getAllBooks, getBookById } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);

module.exports = router;