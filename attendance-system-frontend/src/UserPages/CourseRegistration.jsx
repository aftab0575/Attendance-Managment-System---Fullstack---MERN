import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/CorseReg.css';

const CourseRegistration = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [availableCourses] = useState([
    "Calculus",
    "Programming Fundamentals",
    "Database",
    "OOP",
    "Data Structures",
  ]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch registered courses
    axios
      .get(`${backendBaseUrl}/api/courses/registered`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setRegisteredCourses(res.data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch((err) => {
        alert("Error fetching registered courses");
        setLoading(false); // Stop loading even if an error occurs
      });
  }, [backendBaseUrl]);

  const handleCourseSelection = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRegisterCourses = () => {
    axios
      .post(
        `${backendBaseUrl}/api/courses/register`,
        { courses: selectedCourses },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert("Courses registered successfully!");
        setRegisteredCourses([...registeredCourses, ...selectedCourses]);
        setSelectedCourses([]);
      })
      .catch((err) =>
        alert("Error registering courses: " + err.response?.data?.message)
      );
  };

  return (
    <div className="course-registration">
      <h1 className="title">Course Registration</h1>

      {loading ? (
        <div className="loading-container">
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <div className="course-container">
          <section className="available-courses">
            <h3>Available Courses</h3>
            {availableCourses.length > 0 ? (
              <ul>
                {availableCourses.map((course) => (
                  <li key={course} className="course-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseSelection(course)}
                      />
                      <span className="course-label">{course}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-courses">No courses available for registration.</p>
            )}
            <button
              onClick={handleRegisterCourses}
              disabled={selectedCourses.length === 0}
              className="register-button"
            >
              Register Selected Courses
            </button>
          </section>

          <section className="registered-courses">
            <h3>Registered Courses</h3>
            {registeredCourses.length > 0 ? (
              <ul className="registered-list">
                {registeredCourses.map((course, index) => (
                  <li key={index} className="registered-item">
                    {course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-registered-courses">No courses registered yet.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default CourseRegistration;
