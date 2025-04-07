import { Router } from "express";
import Attendance from "../../models/Attendance.js";
import User from "../../models/User.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

// Mark attendance
router.post("/mark", authMiddleware, async (req, res) => {
  const { course } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // Ensure the course is registered
    if (!user.registeredCourses.includes(course)) {
      return res.status(400).json({ success: false, message: "Course not registered." });
    }

    // Ensure attendance is marked once per day
    const today = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({
      userId: req.user.id,
      course,
      date: { $gte: new Date(today) },
    });

    if (existingAttendance) {
      return res.status(400).json({ success: false, message: "Attendance already marked for today." });
    }

    const attendance = await Attendance.create({
      userId: req.user.id,
      course,
      date: new Date(),
      status: "Present",
    });

    res.status(201).json({ success: true, message: "Attendance marked successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch attendance history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ userId: req.user.id });
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

