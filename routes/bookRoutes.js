const express = require('express');
const router = express.Router();
const { createBook, getAllBooks } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, createBook);
router.get('/', getAllBooks);

module.exports = router;