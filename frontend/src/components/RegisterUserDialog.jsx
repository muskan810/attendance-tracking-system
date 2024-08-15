import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const RegisterUserDialog = ({ open, handleClose, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    email: '',
    password: '',
    contactNumber: '',
    role: 'user', // Default role set to 'user'
  });

  const handleRegisterUser = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/users/create', formData, {
        headers: { 'x-auth-token': token },
      });
      handleClose();
      fetchUsers(); // Refresh user list after registration
    } catch (err) {
      console.error('Error registering user', err.response?.data?.message || err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="State"
          fullWidth
          variant="outlined"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Contact Number"
          fullWidth
          variant="outlined"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Role"
          fullWidth
          variant="outlined"
          select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          SelectProps={{
            native: true,
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleRegisterUser} color="primary">Register</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterUserDialog;