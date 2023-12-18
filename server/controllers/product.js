const Product = require('../models/product');

exports.list = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.create = async (req, res) => {
  try {
    const product = await Product(req.body).save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOneAndDelete({ _id: id });
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}