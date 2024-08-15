const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { createUser, updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// User Routes with Authentication Middleware
router.post('/create', authenticate, createUser);
router.put('/update/:id', authenticate, updateUser);
router.delete('/delete/:id', authenticate, deleteUser);
router.get('/:id', authenticate, getUser);
router.get('/', authenticate, getAllUsers);

module.exports = router;
