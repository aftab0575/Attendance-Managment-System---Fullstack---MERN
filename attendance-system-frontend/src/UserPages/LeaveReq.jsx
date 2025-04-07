import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/LeaveSub.css'

const LeaveRequest = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [reason, setReason] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [courses, setCourses] = useState([]); // To store registered courses

  // Fetch registered courses when the component loads
  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/courses/registered`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setCourses(response.data))
      .catch((err) =>
        alert("Error fetching courses: " + err.response?.data?.message)
      );
  }, [backendBaseUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!course || !reason || !date) {
      return alert("Please fill all the fields.");
    }

    axios
      .post(
        `${backendBaseUrl}/api/leaves/request`,
        { course, reason, date },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        alert("Leave request submitted!");
        setReason("");
        setCourse("");
        setDate("");
      })
      .catch((err) =>
        alert("Error submitting leave request: " + err.response?.data?.message)
      );
  };

  return (
    <div className="leave-request-container">
      <h1 className="leave-request-header">Submit Leave Request</h1>
      <form onSubmit={handleSubmit} className="leave-request-form">
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LeaveRequest;
