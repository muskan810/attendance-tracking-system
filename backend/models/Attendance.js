// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  photo: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    name: { type: String, default: 'Unknown' }, // New field for location name
  },
  date: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
