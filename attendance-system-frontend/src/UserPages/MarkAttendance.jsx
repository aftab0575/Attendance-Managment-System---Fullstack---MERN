import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/MrkAttndnce.css';

const Attendance = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/courses/registered`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setRegisteredCourses(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error fetching registered courses");
        setLoading(false);
      });
  }, [backendBaseUrl]);

  const handleMarkAttendance = () => {
    axios
      .post(
        `${backendBaseUrl}/api/attendance/mark`,
        { course: selectedCourse },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => alert("Attendance marked successfully!"))
      .catch((err) =>
        alert("Error marking attendance: " + err.response?.data?.message)
      );
  };

  return (
    <div className="attendance-container">
      <h1>Mark Attendance for Today's class</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : registeredCourses.length === 0 ? (
        <p className="no-courses-message">
          First register your courses to mark the attendance.
        </p>
      ) : (
        <>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-select"
          >
            <option value="" disabled>
              Select a course
            </option>
            {registeredCourses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <button
            onClick={handleMarkAttendance}
            disabled={!selectedCourse}
            className="mark-attendance-button"
          >
            Mark Attendance
          </button>
        </>
      )}
    </div>
  );
};

export default Attendance;
