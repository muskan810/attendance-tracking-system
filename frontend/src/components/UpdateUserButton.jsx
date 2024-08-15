import React, { useState } from 'react';
import { Button } from '@mui/material';
import UpdateUserDialog from './UpdateUserDialog';

const UpdateUserButton = ({ user, fetchUsers }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        Update User
      </Button>
      <UpdateUserDialog open={open} handleClose={handleClose} user={user} fetchUsers={fetchUsers} />
    </>
  );
};

export default UpdateUserButton;
