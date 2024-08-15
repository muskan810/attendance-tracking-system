import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

const DeleteUserButton = ({ userId, fetchUsers }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`, {
        headers: { 'x-auth-token': token },
      });
      fetchUsers(); // Refresh user list after deletion
    } catch (err) {
      console.error('Error deleting user', err.response?.data?.message || err.message);
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete User
    </Button>
  );
};

export default DeleteUserButton;
