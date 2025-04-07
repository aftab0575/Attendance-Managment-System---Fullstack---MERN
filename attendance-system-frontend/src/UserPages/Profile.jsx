import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styling/profile.css'
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;


  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfile(response.data.data);
      })
      .catch((err) => {
        alert("Error fetching profile: " + err.response?.data?.message);
      });
  }, [backendBaseUrl]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <div className="profile-card">
        <img
          src={profile.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <div className="profile-item">
            <span className="profile-label">Name:</span>
            <span className="profile-value">{profile.name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email:</span>
            <span className="profile-value">{profile.email}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Role:</span>
            <span className="profile-value">{profile.role}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Registered Courses:</span>
            <span className="profile-value">
              {profile.registeredCourses.length > 0 ? (
                <ul className="courses-list">
                  {profile.registeredCourses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              ) : (
                "No courses registered"
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
