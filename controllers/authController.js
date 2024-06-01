const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists)
    return res
      .status(400)
      .send({ success: false, message: "Username already exists" });

  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send({
      success: true,
      message: "Register successfully",
      user: user._id,
    });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !req.body.password) return res.status(400).send({ success: false, message:"Username or password is wrong"});

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ success: false, message:"Invalid password"});

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send({ success: true, access_token:token});
};
