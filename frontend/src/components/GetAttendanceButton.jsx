import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GetAttendanceButton = ({ userId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/attendance-history/${userId}`);
  };

  return (
    <Button variant="contained" color="info" onClick={handleClick}>
      View Attendance History
    </Button>
  );
};

export default GetAttendanceButton;
