import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';

const UpdateUserDialog = ({ open, handleClose, user, fetchUsers }) => {
  const [name, setName] = useState(user.name);
  const [state, setState] = useState(user.state);
  const [email, setEmail] = useState(user.email);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    setError('');
    try {
      await axios.put(`http://localhost:5000/api/users/update/${user._id}`, {
        name,
        state,
        email,
        contactNumber,
      }, {
        headers: { 'x-auth-token': token },
      });
      fetchUsers(); // Refresh user list after update
      handleClose();
    } catch (err) {
      setError('Error updating user');
      console.error('Error updating user', err.response?.data?.message || err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contact Number"
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          fullWidth
        />
        {error && <p className="error-message">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserDialog;
