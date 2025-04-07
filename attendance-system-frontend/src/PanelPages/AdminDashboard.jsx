import React from 'react';
import '../Styling/Dshbrd.css'

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">ADMIN Dashboard</h1>
      <p className="dashboard-welcome">
        Welcome to your dashboard! Use the menu above to navigate through the pages.
      </p>
      <div className="dashboard-details">
        <div className="dashboard-card">
          <h2>Admin Profile</h2>
          <p>Admin can see their Profile details here!</p>
        </div>
        <div className="dashboard-card">
          <h2>Manage Attendance</h2>
          <p>Admin can See and Add Attendance of registered students for a specific course. He can Update and Delete attendance !</p>
        </div>
        <div className="dashboard-card">
          <h2>Generate Attendance Reports</h2>
          <p>
            Admin can generate attendance report based on filters like Student & Course. 
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Address Leave Requests</h2>
          <p>
            If Admin Approved/Rejected the leave request, the attendance of that particular student would be marked as 'Leave'/'Absent' respectively on that day!
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
