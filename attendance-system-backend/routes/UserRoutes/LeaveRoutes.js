import { Router } from "express";
import Leave from "../../models/Leave.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import Attendance from "../../models/Attendance.js";

const router = Router();

// Submit leave request
router.post("/request", authMiddleware, async (req, res) => {
    const { course, reason, date } = req.body;
  
    try {
      if (!course || !reason || !date) {
        return res.status(400).json({
          success: false,
          message: "Course, reason, and date are required.",
        });
      }
  
      const leave = await Leave.create({
        userId: req.user.id,
        course,
        reason,
        date,
        status: "Pending",
      });
  
      res.status(201).json({
        success: true,
        message: "Leave request submitted successfully.",
        data: leave,
      });
    } catch (err) {
      console.error("Error in leave request:", err); // Add logging
      res.status(500).json({
        success: false,
        message: "Server error while submitting leave request.",
      });
    }
  });
  

  router.get("/leave-requests", async (req, res) => {
    try {
      const leaves = await Leave.find()
        .populate("userId", "name email") // Populate user details
        .exec();
      res.status(200).json(leaves);
    } catch (err) {
      res.status(500).json({ message: "Error fetching leave requests", error: err });
    }
  });

  router.post("/leave-requests/:id/:decision", async (req, res) => {
    const { id, decision } = req.params;
    
    try {
      console.log(id, decision );
      // Find the leave request by ID
      const leaveRequest = await Leave.findById(id).populate("userId");
      if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });
  
      // Update leave status
      leaveRequest.status = decision === "approve" ? "Approved" : "Rejected";
      await leaveRequest.save();
  
      // Log attendance
      await Attendance.create({
        userId: leaveRequest.userId._id,
        course: leaveRequest.course,
        date: leaveRequest.date,
        status: decision === "approve" ? "Leave" : "Absent",
      });
  
      res.status(200).json({ message: `Leave ${decision} successfully.` });
    } catch (err) {
      console.error("Error updating leave request:", err); // Add this for debugging
      res.status(500).json({ message: "Error updating leave request", error: err });
    }
  });


export default router;
