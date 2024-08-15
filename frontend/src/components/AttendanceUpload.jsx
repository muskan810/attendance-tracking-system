import React, { useState } from 'react';
import axios from 'axios';

const AttendanceUpload = ({ setMessage }) => {
  const [photo, setPhoto] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!photo) return;

    // Get location
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('latitude', position.coords.latitude);
      formData.append('longitude', position.coords.longitude);
      formData.append('locationName', ''); // Placeholder for location name

      try {
        const res = await axios.post('http://localhost:5000/api/attendance/upload', formData, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setMessage(res.data.msg);
      } catch (err) {
        setMessage(err.response.data.msg || 'Error uploading attendance');
      }
    });
  };

  return (
    <div className="upload-form">
      <h3>Upload Attendance</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          capture="environment" // Use the environment camera
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AttendanceUpload;
