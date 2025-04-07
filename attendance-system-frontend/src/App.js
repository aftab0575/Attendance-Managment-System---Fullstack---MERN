import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AuthPage from './UserPages/AuthPage.jsx';
import UserDashboard from './UserPages/UserDashboard.jsx';
import CourseRegistration from './UserPages/CourseRegistration.jsx';
import MarkAttendance from './UserPages/MarkAttendance.jsx';
import LeaveRequest from './UserPages/LeaveReq.jsx';
import ViewAttendance from './UserPages/ViewAttendance.jsx';
import EditProfile from './UserPages/EditProfile.jsx';
import Profile from './UserPages/Profile.jsx';

import AdminDashboard from './PanelPages/AdminDashboard.jsx';
import ManageAttendance from './PanelPages/ManageAttendance.jsx';
import AttendanceReports from './PanelPages/Report.jsx';
import LeaveRequests from './PanelPages/LeaveApproval.jsx';
import AdminProfile from './PanelPages/AdminProfile.jsx';
import UserNavbar from './UserPages/Navbar.jsx';
import AdminNavbar from './PanelPages/AdminNavbar.jsx';

function App() {
  const location = useLocation();

  // routes for user and admin
  const userRoutes = [
    "/user-profile",
    "/user-dashboard",
    "/course-registration",
    "/mark-attendance",
    "/view-attendance",
    "/edit-profile",
    "/leave-request",
  ];

  const adminRoutes = [
    "/admin-dashboard",
    "/admin-profile",
    "/manage-attendance",
    "/reports",
    "/leaves",
  ];

  return (
    <div>
      {/* Conditionally Render Navbar */}
      {userRoutes.includes(location.pathname) && <UserNavbar />}
      {adminRoutes.includes(location.pathname) && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/course-registration" element={<CourseRegistration />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/leave-request" element={<LeaveRequest />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/manage-attendance" element={<ManageAttendance />} />
        <Route path="/reports" element={<AttendanceReports />} />
        <Route path="/leaves" element={<LeaveRequests />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
