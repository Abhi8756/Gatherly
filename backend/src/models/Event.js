const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an event description'],
    },
    eventType: {
      type: String,
      enum: ['conference', 'workshop', 'seminar', 'meetup', 'competition', 'community', 'volunteering', 'other'],
      default: 'other',
    },
    date: {
      type: Date,
      required: [true, 'Please provide an event date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide an event time'],
    },
    location: {
      type: String,
      required: [true, 'Please provide an event location'],
    },
    capacity: {
      type: Number,
      required: [true, 'Please provide event capacity'],
      min: 1,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    registrationCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);