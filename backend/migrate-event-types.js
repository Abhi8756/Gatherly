// Migration script to add eventType field to existing events
const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./src/models/Event');

const migrateEventTypes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/event-management');
    console.log('Connected to MongoDB');

    // Update all events that don't have eventType set
    const result = await Event.updateMany(
      { eventType: { $exists: false } },
      { $set: { eventType: 'other' } }
    );

    console.log(`Migration complete! Updated ${result.modifiedCount} events.`);

    // Also update events where eventType is null or empty
    const result2 = await Event.updateMany(
      { $or: [{ eventType: null }, { eventType: '' }] },
      { $set: { eventType: 'other' } }
    );

    console.log(`Updated ${result2.modifiedCount} events with null/empty eventType.`);

    // Display all events with their eventType
    const allEvents = await Event.find({});
    console.log('\nAll events:');
    allEvents.forEach(event => {
      console.log(`- ${event.title}: ${event.eventType || 'NOT SET'}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateEventTypes();
