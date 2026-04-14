const { body, validationResult } = require('express-validator');

// Validation rules
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Signup validation
const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().custom(val => validateEmail(val)).withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['Guest', 'Participant', 'Organizer', 'Admin']).withMessage('Invalid role'),
];

// Login validation
const validateLogin = [
  body('email').trim().custom(val => validateEmail(val)).withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Event validation
const validateEvent = [
  body('title').trim().notEmpty().withMessage('Event title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').trim().notEmpty().withMessage('Time is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateEvent,
  handleValidationErrors,
};