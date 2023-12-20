const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  file: {
    type: String,
    default: 'noimg.jpg'
  }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);