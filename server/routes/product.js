const express = require('express');
const router = express.Router();

// controllers
const { list, read, create, update, remove } = require('../controllers/product');

// middleware
const { auth } = require('../middleware/auth');

// http://localhost:8080/api/product
router.get('/product', auth, list);

// http://localhost:8080/api/product/id
router.get('/product/:id', read);

// http://localhost:8080/api/product
router.post('/product', create);

// http://localhost:8080/api/product/id
router.put('/product/:id', update);

// http://localhost:8080/api/product/id
router.delete('/product/:id', remove);


module.exports = router;