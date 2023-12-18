const express = require('express');
const router = express.Router();

// controllers
const { register, login } = require('../controllers/auth');

// http://localhost:8080/api/register
router.post('/register', register);

// http://localhost:8080/api/login
router.post('/login', login);

module.exports = router;