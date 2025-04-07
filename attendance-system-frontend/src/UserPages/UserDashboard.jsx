import React from 'react';

import '../Styling/Dshbrd.css'; // Importing CSS file for styles
import Navbar from './Navbar';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">User Dashboard</h1>
      <p className="dashboard-welcome">
        Welcome to your dashboard! Use the menu above to navigate through the pages.
      </p>
      <div className="dashboard-details">
        <div className="dashboard-card">
          <h2>User Profile</h2>
          <p>Students can see their details and registered courses!</p>
        </div>
        <div className="dashboard-card">
          <h2>Course Registration</h2>
          <p>Students can register their courses!</p>
        </div>
        <div className="dashboard-card">
          <h2>Mark Attendance</h2>
          <p>
            Students should first register the courses in order to mark their attendance for
            today's class!
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Leave Request</h2>
          <p>
            Students can submit a leave request to admin in any course for today's class!
          </p>
        </div>
        <div className="dashboard-card">
          <h2>View Attendance</h2>
          <p>
            Students can view the attendance history and also the attendance status of their
            submitted leave requests!
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Edit Profile</h2>
          <p>Students can edit their name and profile picture!</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;