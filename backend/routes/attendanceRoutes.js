// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const attendanceController = require('../controllers/attendanceController');
const { authenticate } = require('../middleware/authMiddleware'); // Corrected path

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Route for uploading attendance
router.post('/upload', authenticate, upload.single('photo'), attendanceController.uploadAttendance);

// Route for fetching user's attendance records
router.get('/', authenticate, attendanceController.getUserAttendance);

module.exports = router;
