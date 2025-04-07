import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styling/ViewAttndance.css";

const ViewAttendance = () => {
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendBaseUrl}/api/attendance/history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setAttendance(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error fetching attendance history");
        setLoading(false);
      });
  }, [backendBaseUrl]);

  return (
    <div className="attendance-container">
      <h1 className="attendance-header">Attendance History</h1>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : attendance.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.course}</td>
                <td
                  className={
                    record.status === "Present"
                      ? "status-present"
                      : record.status === "Absent"
                      ? "status-absent"
                      : "status-leave"
                  }
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-attendance">No attendance records found. Please ensure you have marked attendance in your courses.</p>
      )}
    </div>
  );
};


export default ViewAttendance;
