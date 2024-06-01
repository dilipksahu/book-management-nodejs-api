const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
  
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send({success: false, message: 'Username already exists'});
  
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send({ success: true, message: "Register successfully", user: user._id });
      } catch (error) {
        res.status(400).send({success:false,  error});
      }
    };