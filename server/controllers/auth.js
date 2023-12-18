const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username: username });
    if (user) {
      return res.send('Username is already exists');
    }

    const salt = await bcrypt.genSalt(10);

    user = new User({
      username,
      password
    });

    user.password = await bcrypt.hash(password, salt);
    user.save();
    res.send('register success!');
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOneAndUpdate(
      { username: username },
      { new: true }
    );
    if (!user) {
      return res.send('username is incorrect!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('password is incorrect!');
    }

    const payload = {
      user: {
        username: username
      }
    };

    jwt.sign(payload, 'jwtsecret', (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });

  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}