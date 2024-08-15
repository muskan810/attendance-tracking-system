const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const createUsers = async () => {
  try {
    await connectDB();

    // Admin user
    const admin = new User({
      name: 'Admin',
      state: 'uttar pradesh',
      email: 'admin@example.com',
      password: 'admin123',
      contactNumber: '1234567890',
    });
    await admin.save();

    // Regular user
    const regularUser = new User({
      name: 'Regular User',
      state: 'User State',
      email: 'user@example.com',
      password: 'userpassword',
      contactNumber: '0987654321',
    });
    await regularUser.save();

    console.log('Admin and regular user created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating users:', err);
  }
};

createUsers();
