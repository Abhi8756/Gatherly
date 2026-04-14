const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validateSignup, validateLogin, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, handleValidationErrors, authController.signup);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

// Protected routes
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;