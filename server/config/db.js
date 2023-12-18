const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const server = process.env.DB_SERVER;
const username = process.env.DB_USERNAME;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;
const name = process.env.DB_NAME;

const uri = `${server}://${username}:${password}@${cluster}/${name}?retryWrites=true&w=majority`;

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(uri);
    console.log('database is connected');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;