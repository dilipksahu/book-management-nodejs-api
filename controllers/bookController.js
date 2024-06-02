const Book = require('../models/Book');
const { bookValidation } = require('../utils/validate');

exports.createBook = async (req, res) => {
    const { error } = bookValidation(req.body);
    if (error) return res.status(400).send({ success: false, message: error.details[0].message});
    
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      publishedDate: req.body.publishedDate,
      summary: req.body.summary,
      userId: req.user._id
    });
  
    try {
      const savedBook = await book.save();
      res.json({success: true, data: savedBook});
    } catch (error) {
      res.status(500).send({success: false, message: error.message});
    }
};
  
exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.json({success: true, data: books});
    } catch (error) {
      res.status(500).send({success: false, message: error.message});
    }
  };