const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Event = require('./src/models/Event');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gatherly', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing users and events, start fresh
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing users and events');

    // Create test users
    const testUsers = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'Admin@123456',
        role: 'Admin'
      },
      {
        name: 'John Organizer',
        email: 'organizer@test.com',
        password: 'Organizer@123456',
        role: 'Organizer'
      },
      {
        name: 'Jane Participant',
        email: 'participant@test.com',
        password: 'Participant@123456',
        role: 'Participant'
      }
    ];

    // Insert users - let the model hash passwords via pre-save hook
    let organizerUser;
    for (const userData of testUsers) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User with email ${userData.email} already exists. Skipping...`);
        if (userData.role === 'Organizer') {
          organizerUser = existingUser;
        }
        continue;
      }

      // Create user and let the pre-save middleware hash the password
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      });

      await user.save();
      console.log(`✅ Created ${userData.role} account: ${userData.email}`);
      
      if (userData.role === 'Organizer') {
        organizerUser = user;
      }
    }

    // Create test approved events for participants to register
    if (organizerUser) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const testEvents = [
        {
          title: 'React Masterclass 2026',
          description: 'Learn advanced React patterns, hooks, and performance optimization techniques. Perfect for intermediate developers looking to level up their skills.',
          eventType: 'workshop',
          date: tomorrow,
          time: '09:00 AM',
          location: 'Tech Hub, Downtown',
          capacity: 50,
          organizer: organizerUser._id,
          status: 'Approved',
          registrationCount: 0
        },
        {
          title: 'Web Development Summit',
          description: 'Join industry experts discussing the latest trends in web development, including AI integration, performance monitoring, and security best practices.',
          eventType: 'conference',
          date: new Date(tomorrow.getTime() + 7 * 24 * 60 * 60 * 1000), // 8 days from now
          time: '10:00 AM',
          location: 'Convention Center, City Hall',
          capacity: 200,
          organizer: organizerUser._id,
          status: 'Approved',
          registrationCount: 0
        },
        {
          title: 'MongoDB Expert Tutorial',
          description: 'Deep dive into MongoDB schema design, indexing strategies, and real-world deployment patterns. Bring your database design questions!',
          eventType: 'seminar',
          date: new Date(tomorrow.getTime() + 14 * 24 * 60 * 60 * 1000), // 15 days from now
          time: '02:00 PM',
          location: 'Innovation Lab, Tech Park',
          capacity: 30,
          organizer: organizerUser._id,
          status: 'Approved',
          registrationCount: 0
        },
        {
          title: 'JavaScript Coding Meetup',
          description: 'Casual meetup for JavaScript enthusiasts. Share projects, learn new libraries, and network with fellow developers over coffee and snacks.',
          eventType: 'meetup',
          date: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000), // 4 days from now
          time: '06:00 PM',
          location: 'Coffee House, Main Street',
          capacity: 25,
          organizer: organizerUser._id,
          status: 'Approved',
          registrationCount: 0
        }
      ];

      for (const eventData of testEvents) {
        const event = new Event(eventData);
        await event.save();
        console.log(`✅ Created test event: ${eventData.title}`);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📝 TEST CREDENTIALS:');
    console.log('\n1️⃣ ADMIN:');
    console.log('   Email: admin@test.com');
    console.log('   Password: Admin@123456');
    console.log('   Role: Admin (approves/rejects events)\n');
    console.log('2️⃣ ORGANIZER:');
    console.log('   Email: organizer@test.com');
    console.log('   Password: Organizer@123456');
    console.log('   Role: Organizer (creates events)\n');
    console.log('3️⃣ PARTICIPANT:');
    console.log('   Email: participant@test.com');
    console.log('   Password: Participant@123456');
    console.log('   Role: Participant (registers for events)\n');
    console.log('📅 TEST EVENTS CREATED:');
    console.log('   ✅ 4 pre-approved test events have been seeded');
    console.log('   ✅ Log in as participant to see and register for events\n');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
