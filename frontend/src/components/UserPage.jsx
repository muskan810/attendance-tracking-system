import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceUpload from './AttendanceUpload';
import AttendanceList from './AttendanceList';

const UserPage = () => {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setAttendance(res.data);
    } catch (err) {
      setMessage('Error fetching attendance records');
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="user-page">
      <h2>User Page</h2>
      <AttendanceUpload setMessage={setMessage} />
      {message && <p className="message">{message}</p>}
      <AttendanceList attendance={attendance} />
    </div>
  );
};

export default UserPage;
