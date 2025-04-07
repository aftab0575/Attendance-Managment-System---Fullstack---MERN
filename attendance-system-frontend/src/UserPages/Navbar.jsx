import React from 'react'
import "../Styling/navbar.css"
import logo from '../uploads/navbar-logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const [menu, setMenu] = useState("shop")

  return (
    <div className="navbar">
      
      <div className="nav-logo">
      <Link to="/" className="nav-link">
        <img src={logo} alt="logo-image" className="logo-image" />
        </Link>
      </div>

      <ul className="nav-menu">
      <li onClick={() => setMenu("dashboard")}>
          <Link to="/user-dashboard" className="nav-link">
          USER Dashboard
          </Link>
          {menu === "dashboard" ?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("profile")}>
          <Link to="/user-profile" className="nav-link">
            Student Profile
          </Link>
          {menu === "profile" ?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("registration")}>
          <Link to="/course-registration" className="nav-link">
            Course Registration
          </Link>
          {menu === "registration"?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("attendance")}>
          <Link to="/mark-attendance" className="nav-link">
            Mark Attendance
          </Link>
          {menu === "attendance"?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("leave")}>
          <Link to="/leave-request" className="nav-link">
            Leave Request
          </Link>
          {menu === "leave"?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("view")}>
          <Link to="/view-attendance" className="nav-link">
            View Attendance
          </Link>
          {menu === "view"?<hr/>:<></>}
        </li>
        <li onClick={() => setMenu("edit")}>
          <Link to="/edit-profile" className="nav-link">
            Edit Profile
          </Link>
          {menu === "edit"?<hr/>:<></>}
        </li>
      </ul>
    </div>
  );
}

export default Navbar