const express = require('express');
const router = express.Router();
const { createBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, createBook);

module.exports = router;