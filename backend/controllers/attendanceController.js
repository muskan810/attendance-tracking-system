// controllers/attendanceController.js
const Attendance = require('../models/Attendance');
const path = require('path');
const fs = require('fs');

// Handle attendance upload
exports.uploadAttendance = async (req, res) => {
  try {
    const { latitude, longitude, locationName } = req.body;

    // Check if the user has already uploaded attendance today
    const today = new Date().setHours(0, 0, 0, 0);
    const existingRecord = await Attendance.findOne({
      user: req.user.id,
      date: { $gte: today },
    });

    if (existingRecord) {
      return res.status(400).json({ msg: 'Attendance already uploaded today.' });
    }

    const attendance = new Attendance({
      user: req.user.id,
      photo: req.file.path,
      location: {
        latitude,
        longitude,
        name: locationName || 'Unknown', // Store location name
      },
    });

    await attendance.save();
    res.status(201).json({ msg: 'Attendance uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch user's attendance records
exports.getUserAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ user: req.user.id });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
