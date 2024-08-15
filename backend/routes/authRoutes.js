const express = require('express');
const { login, getAuthenticatedUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Login Route
router.post('/login', login);

// Get Authenticated User Route
router.get('/me', authenticate, getAuthenticatedUser);

module.exports = router;
