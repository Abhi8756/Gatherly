const Event = require('../models/Event');
const Registration = require('../models/Registration');
const User = require('../models/User');

// Get all approved events (for dashboard)
exports.getApprovedEvents = async (req, res) => {
  try {
    const { date, location, eventType } = req.query;

    console.log('Received query params:', { date, location, eventType });

    // Build filter
    const filter = { status: 'Approved' };

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (eventType) {
      filter.eventType = eventType;
    }

    console.log('Applied filter:', filter);

    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    console.log(`Found ${events.length} events`);

    res.json(events);
  } catch (error) {
    console.error('Error in getApprovedEvents:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all pending events (for admin)
exports.getPendingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'Pending' })
      .populate('organizer', 'name email')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's events (for organizer)
exports.getUserEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizer: userId })
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create event (organizer only)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, eventType, date, time, location, capacity } = req.body;

    console.log('Creating event with data:', { title, description, eventType, date, time, location, capacity });

    const event = new Event({
      title,
      description,
      eventType: eventType || 'other',
      date,
      time,
      location,
      capacity,
      organizer: req.user.id,
      status: 'Pending', // Default status
    });

    await event.save();

    console.log('Event created successfully:', event);

    res.status(201).json({
      message: 'Event created successfully. Waiting for admin approval.',
      event,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: error.message });
  }
};

// Approve event (admin only)
exports.approveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: 'Approved' },
      { new: true }
    ).populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      message: 'Event approved successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject event (admin only)
exports.rejectEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { reason } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: 'Rejected' },
      { new: true }
    ).populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      message: 'Event rejected successfully',
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register for event (participant only)
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if event is approved
    if (event.status !== 'Approved') {
      return res.status(400).json({ error: 'Cannot register for unapproved events' });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    // Check capacity
    if (event.registrationCount >= event.capacity) {
      return res.status(400).json({ error: 'Event is at full capacity' });
    }

    // Create registration
    const registration = new Registration({
      user: userId,
      event: eventId,
    });

    await registration.save();

    // Update event registration count
    await Event.findByIdAndUpdate(
      eventId,
      { $inc: { registrationCount: 1 } }
    );

    res.status(201).json({
      message: 'Successfully registered for event',
      registration,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const registration = await Registration.findOneAndUpdate(
      { user: userId, event: eventId },
      { status: 'Cancelled' },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Decrease event registration count
    await Event.findByIdAndUpdate(
      eventId,
      { $inc: { registrationCount: -1 } }
    );

    res.json({
      message: 'Registration cancelled successfully',
      registration,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.find({ user: userId, status: 'Registered' })
      .populate('event')
      .sort({ registeredAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};