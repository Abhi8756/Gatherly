const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Admin only
router.get('/all', authenticate, authorize('Admin'), userController.getAllUsers);

// Protected routes
router.get('/:userId', authenticate, userController.getUserById);
router.put('/profile/update', authenticate, userController.updateUserProfile);

module.exports = router;