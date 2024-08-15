import React from 'react';

const AttendanceList = ({ attendance }) => {
  return (
    <div className="attendance-list">
      <h3>Your Attendance Records</h3>
      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            <div>Date & Time: {new Date(record.date).toLocaleString()}</div>
            <div>Location: {record.location.name} [{record.location.latitude}, {record.location.longitude}]</div>
            <img src={`http://localhost:5000/${record.photo}`} alt="attendance" width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
