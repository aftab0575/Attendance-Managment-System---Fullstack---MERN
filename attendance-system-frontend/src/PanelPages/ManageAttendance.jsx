import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/MngAttndance.css'

const ManageAttendance = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [courses, setCourses] = useState([]); // List of courses
  const [selectedCourse, setSelectedCourse] = useState(null); // Currently selected course
  const [attendanceRecords, setAttendanceRecords] = useState([]); // Attendance records for the selected course
  const [users, setUsers] = useState([]); // List of all users
  const [newAttendance, setNewAttendance] = useState({
    userId: "",
    userName: "",
    date: "",
    status: "Present",
  });

  // Fetch all courses
  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/admin/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log("Courses fetched: ", res.data); // Debug data here
        setCourses(res.data);
      })
      .catch((err) => alert("Error fetching courses: " + err.message));
  }, [backendBaseUrl]);

  //Fetch attendance records for the selected course
  useEffect(() => {
    if (selectedCourse) {
      axios
        .get(`${backendBaseUrl}/api/admin/attendance/${selectedCourse}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          // console.log("AttendanceRecords: ", res.data); // Debug data here

          setAttendanceRecords(res.data);
        })
        .catch((err) => alert("Error fetching attendance: " + err.message));
    }
  }, [selectedCourse, backendBaseUrl]);

  useEffect(() => {
    // Fetch all users
    axios
      .get(`${backendBaseUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => alert("Error fetching users: " + err.message));
  }, [backendBaseUrl]);

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        `${backendBaseUrl}/api/admin/attendance/${selectedCourse}`,
        newAttendance,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        const updatedRecord = {
          ...res.data,
          userName:
            users.find((user) => user._id === res.data.userId)?.name || "",
        };
        setAttendanceRecords([...attendanceRecords, updatedRecord]);
        setNewAttendance({
          userId: "",
          userName: "",
          date: "",
          status: "Present",
        });
        alert("Attendance record added successfully!");
      })
      .catch((err) => alert("Error adding record: " + err.message));
  };

  const handleUpdate = (id, updatedStatus) => {
    console.log("Updating attendance record with ID:", id); // Debug the ID
    console.log("New status:", updatedStatus); // Debug the new status
    axios
      .put(
        `${backendBaseUrl}/api/admin/attendance/${id}`,
        { status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        setAttendanceRecords((prev) =>
          prev.map((record) =>
            record._id === id ? { ...record, status: updatedStatus } : record
          )
        );
        alert("Attendance record updated successfully!");
      })
      .catch((err) => alert("Error updating record: " + err.message));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${backendBaseUrl}/api/admin/attendance/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setAttendanceRecords((prev) =>
          prev.filter((record) => record._id !== id)
        );
        alert("Attendance record deleted successfully!");
      })
      .catch((err) => alert("Error deleting record: " + err.message));
  };

  return (
    <div className="manage-attendance-container">
      <h1 className="header">Manage Attendance</h1>

      {/* Navbar for course selection */}
      <div className="navbar">
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <button
              key={index}
              onClick={() => setSelectedCourse(course)}
              className={`nav-button ${
                selectedCourse === course ? "active" : ""
              }`}
            >
              {course}
            </button>
          ))
        ) : (
          <p className="no-courses">No courses available</p>
        )}
      </div>

      {/* Attendance details for the selected course */}
      {selectedCourse && (
        <div className="attendance-section">
          <h2 className="sub-header">Attendance for {selectedCourse}</h2>

          {/* Add attendance form */}
          <form onSubmit={handleCreate} className="attendance-form">
            <div className="form-group">
              <label>Select Student:</label>
              <select
                value={newAttendance.userId}
                onChange={(e) => {
                  const selectedUser = users.find(
                    (user) => user._id === e.target.value
                  );
                  setNewAttendance({
                    ...newAttendance,
                    userId: selectedUser?._id || "",
                    userName: selectedUser?.name || "",
                  });
                }}
                required
              >
                <option value="">Select Student</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Select Date:</label>
              <input
                type="date"
                value={newAttendance.date}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, date: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Attendance Status:</label>
              <select
                value={newAttendance.status}
                onChange={(e) =>
                  setNewAttendance({ ...newAttendance, status: e.target.value })
                }
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Add Attendance
            </button>
          </form>

          {/* Display attendance records */}
          {attendanceRecords.length > 0 ? (
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.userName}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.status}</td>
                    <td>
                      <button
                        className="toggle-button"
                        onClick={() =>
                          handleUpdate(
                            record._id,
                            record.status === "Present" ? "Absent" : "Present"
                          )
                        }
                      >
                        Toggle Status
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-attendance">No attendance for this course</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAttendance;
