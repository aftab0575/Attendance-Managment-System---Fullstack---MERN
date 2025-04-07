import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styling/EditProfile.css"; // Import the CSS file

const EditProfile = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [profile, setProfile] = useState({ name: "", profilePicture: "" });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfile(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching profile: " + err.response?.data?.message);
        setLoading(false);
      });
  }, [backendBaseUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    if (profilePic) formData.append("profilePicture", profilePic);

    axios
      .put(`${backendBaseUrl}/api/user/profile`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => alert("Error updating profile: " + err.response?.data?.message));
  };

  return (
    <div className="edit-profile-container">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="edit-profile-content">
          <h1 className="edit-profile-header">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="form-group">
              <label>Current Profile Picture:</label>
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-picture"
                />
              ) : (
                <p className="no-picture">No profile picture uploaded.</p>
              )}
            </div>
            <div className="form-group">
              <label>Edit Name:</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Name"
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Upload New Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="file-input"
              />
            </div>
            <button type="submit" className="update-button">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
