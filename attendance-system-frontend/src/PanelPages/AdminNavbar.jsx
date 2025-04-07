import React from "react";
import "../Styling/navbar.css";
import logo from "../uploads/navbar-logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const AdminNavbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      
      <div className="nav-logo">
      <Link to="/" className="nav-link">
        <img src={logo} alt="logo-image" className="logo-image" />
        </Link>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("dashboard")}>
          <Link to="/admin-dashboard" className="nav-link">
            ADMIN Dashboard
          </Link>
          {menu === "dashboard" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("profile")}>
          <Link to="/admin-profile" className="nav-link">
            Admin Profile
          </Link>
          {menu === "profile" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("manage")}>
          <Link to="/manage-attendance" className="nav-link">
            Manage Attendance
          </Link>
          {menu === "manage" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("reports")}>
          <Link to="/reports" className="nav-link">
            Generate Attendance Reports
          </Link>
          {menu === "reports" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("leave")}>
          <Link to="/leaves" className="nav-link">
            Address Leave Requests
          </Link>
          {menu === "leave" ? <hr /> : <></>}
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
