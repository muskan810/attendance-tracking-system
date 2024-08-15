import React from 'react';

const UsersList = ({ users, renderActions }) => {
  return (
    <div className="users-list">
      <h3>Users</h3>
      {users.map(user => (
        <div key={user._id} className="user-card">
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>State: {user.state}</div>
          <div>Contact Number: {user.contactNumber}</div>
          <div>Role: {user.role}</div>
          {renderActions(user)}
        </div>
      ))}
    </div>
  );
};

export default UsersList;
