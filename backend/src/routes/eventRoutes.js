const express = require('express');
const eventController = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateEvent, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Public route - Get approved events
router.get('/approved', eventController.getApprovedEvents);

// Protected routes
router.post(
  '/create',
  authenticate,
  authorize('Organizer', 'Admin'),
  validateEvent,
  handleValidationErrors,
  eventController.createEvent
);

router.get('/my-events', authenticate, authorize('Organizer', 'Admin'), eventController.getUserEvents);

router.get('/pending', authenticate, authorize('Admin'), eventController.getPendingEvents);

router.put('/approve/:eventId', authenticate, authorize('Admin'), eventController.approveEvent);

router.put('/reject/:eventId', authenticate, authorize('Admin'), eventController.rejectEvent);

router.post('/register/:eventId', authenticate, authorize('Participant', 'Guest'), eventController.registerForEvent);

router.delete('/cancel/:eventId', authenticate, eventController.cancelRegistration);

router.get('/user-registrations', authenticate, eventController.getUserRegistrations);

module.exports = router;