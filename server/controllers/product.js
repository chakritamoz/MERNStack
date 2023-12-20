const fs = require('fs');
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
    const data = req.body;
    if (req.file) data.file = req.file.filename;

    const product = await Product(data).save();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    data.oldFile = data.file;

    if (req.file) {
      data.file = req.file.filename;

      await fs.unlink('./uploads/' + data.oldFile, (err) => {
        if (err) throw err;
        console.log('remove file success');
      });
    };

    const product = await Product.findOneAndUpdate(
      { _id: id },
      data,
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

    if (product.file) {
      await fs.unlink('./uploads/' + product.file, (err) => {
        if (err) console.log(err);
        console.log('remove file success');
      });
    }

    res.send(product);
  } catch (err) {
    console.log(err);
    res.send('server error').status(500);
  }
}