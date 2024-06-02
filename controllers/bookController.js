const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    
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
      res.status(500).send({success: false, message: error});
    }
  };