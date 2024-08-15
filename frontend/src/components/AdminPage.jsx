import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import LogoutButton from './LogoutButton';
import RegisterUserDialog from './RegisterUserDialog';
import UsersList from './UsersList';
import DeleteUserButton from './DeleteUserButton';
import UpdateUserButton from './UpdateUserButton';
import GetAttendanceButton from './GetAttendanceButton';

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { 'x-auth-token': token },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-page">
      <LogoutButton />
      <Typography variant="h4">Admin Page</Typography>
      <Typography variant="h6">Welcome, Admin</Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Register User
      </Button>
      <Button variant="contained" color="secondary" onClick={fetchUsers}>
        View Users
      </Button>

      <RegisterUserDialog open={open} handleClose={handleClose} fetchUsers={fetchUsers} />

      {users.length > 0 && (
        <UsersList 
          users={users} 
          renderActions={(user) => (
            <div key={user._id}>
              <UpdateUserButton user={user} fetchUsers={fetchUsers} />
              <DeleteUserButton userId={user._id} fetchUsers={fetchUsers} />
              <GetAttendanceButton userId={user._id} />
            </div>
          )} 
        />
      )}
    </div>
  );
};

export default AdminPage;
