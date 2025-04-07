import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styling/leaveAppr.css'
const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;


  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const res = await axios.get(`${backendBaseUrl}/api/leaves/leave-requests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLeaveRequests(res.data);
    } catch (err) {
      alert("Error fetching leave requests: " + err.message);
    }
  };

  const handleDecision = async (leaveId, decision) => {
    try {
      await axios.post(
        `${backendBaseUrl}/api/leaves/leave-requests/${leaveId}/${decision}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(`Leave request ${decision} successfully!`);
      fetchLeaveRequests();
    } catch (err) {
      alert("Error updating leave request: " + err.message);
    }
  };

  return (
    <div className="leave-approval-container">
      <h1 className="header">Leave Approval Panel</h1>

      {leaveRequests.length === 0 ? (
        <p className="no-requests">No leave requests available.</p>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.userId?.name || "Unknown"}</td>
                <td>{leave.course}</td>
                <td className="reason-cell">{leave.reason}</td>
                <td>{new Date(leave.date).toLocaleDateString()}</td>
                <td
                  className={`status ${
                    leave.status === "Approved"
                      ? "approved"
                      : leave.status === "Rejected"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  {leave.status}
                </td>
                <td>
                  {leave.status === "Pending" && (
                    <div className="action-buttons">
                      <button
                        className="approve-button"
                        onClick={() => handleDecision(leave._id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleDecision(leave._id, "reject")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveApproval;
