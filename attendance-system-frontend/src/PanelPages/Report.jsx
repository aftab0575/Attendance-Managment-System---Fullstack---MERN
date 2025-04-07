import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styling/report.css";
const AttendanceReports = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users and courses on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/admin/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users. Please try again later.");
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${backendBaseUrl}/api/admin/courses`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(res.data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      }
    };

    fetchUsers();
    fetchCourses();
  }, [backendBaseUrl]);

  const fetchReport = () => {
    setIsLoading(true);
    setError("");
    axios
      .get(`${backendBaseUrl}/api/admin/reports`, {
        params: { userId: selectedUserId, course: selectedCourse },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setReportData(res.data);
        if (res.data.length === 0) {
          setError("No attendance records found for the selected filters.");
        }
      })
      .catch((err) => {
        setError("Error fetching reports: " + err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="attendance-reports-container">
      <h1 className="header">Attendance Reports</h1>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="user-select">Student: </label>
          <select
            id="user-select"
            onChange={(e) => setSelectedUserId(e.target.value)}
            value={selectedUserId}
          >
            <option value="">All Students</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="course-select">Course: </label>
          <select
            id="course-select"
            onChange={(e) => setSelectedCourse(e.target.value)}
            value={selectedCourse}
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <button onClick={fetchReport} className="generate-report-button">
          Generate Report
        </button>
      </div>

      {/* Loading and Error Handling */}
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Report Table */}
      {!isLoading && reportData.length > 0 && (
        <table className="report-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((record) => (
              <tr key={record._id}>
                <td>{record.userName}</td>
                <td>{record.course}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td
                  className={
                    record.status === "Present"
                      ? "present"
                      : record.status === "Absent"
                      ? "absent"
                      : "leave"
                  }
                >
                  {" "}
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Data Available */}
      {!isLoading && reportData.length === 0 && !error && (
        <p className="no-data">No attendance records found.</p>
      )}
    </div>
  );
};

export default AttendanceReports;
