import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import AttendanceList from './AttendanceList';

const AttendanceHistoryPage = ({ userId }) => {
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { 'x-auth-token': token },
        });
        setIsAdmin(res.data.role === 'admin');
      } catch (err) {
        console.error('Error fetching user info:', err.response?.data?.error || err.message);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem('token');
      try {
        const url = isAdmin && userId ? `http://localhost:5000/api/attendance/user/${userId}` : 'http://localhost:5000/api/attendance';
        const res = await axios.get(url, {
          headers: { 'x-auth-token': token },
        });
        setAttendance(res.data);
      } catch (err) {
        setMessage('Error fetching attendance records');
        console.error('Error fetching attendance', err.response?.data?.error || err.message);
      }
    };
    
    fetchAttendance();
  }, [userId, isAdmin]);

  return (
    <div>
      <Typography variant="h4">Attendance History</Typography>
      {message && <p className="message">{message}</p>}
      <AttendanceList attendance={attendance} />
    </div>
  );
};

export default AttendanceHistoryPage;
