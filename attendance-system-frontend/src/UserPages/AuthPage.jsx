import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styling/Authpage.css';
import Logo from '../uploads/logo.png'

const AuthPage = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [profilePicture, setProfilePicture] = useState(null); // State for uploaded file
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Capture selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(`${backendBaseUrl}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        // Save token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        alert("Login Successful");

        //Navigate based on role
        if (response.data.role === "admin") {
          navigate("/admin-dashboard"); // Admin Dashboard
        } else {
          navigate("/user-dashboard"); // User Dashboard
        }
      } else {
        // Registration logic with file upload
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("password", formData.password);
        formDataObj.append("role", formData.role);
        if (profilePicture) {
          formDataObj.append("profilePicture", profilePicture); // Append the selected file
        }

        const response = await axios.post(
          `${backendBaseUrl}/api/auth/register`,
          formDataObj,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Registration Successful: " + response.data.message);

        // Switch to login mode after registration
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      {/* Website Logo */}
      <img 
        src={Logo} /* Update this path to your actual logo file location */
        alt="Website Logo" 
        className="auth-logo" 
      />
      
      <h1 className="auth-header">{isLogin ? "Login" : "Register"}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            {/* Name Field */}
            <input
              className="auth-input"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {/* Role Selection */}
            <select
              className="auth-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {/* Profile Picture Upload */}
            <input
              className="auth-file-input"
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </>
        )}
        {/* Email Field */}
        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {/* Password Field */}
        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {/* Submit Button */}
        <button className="auth-button" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {/* Toggle Button */}
      <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
      <hr/>
      <div className="developer-credit">Developed by Aftab Bashir</div>

    </div>
  );
  
  
};

export default AuthPage;








//Introduce class names for better CSS styling. And also provide CSS properties for visually appealing look and also include animations and effects for better look!