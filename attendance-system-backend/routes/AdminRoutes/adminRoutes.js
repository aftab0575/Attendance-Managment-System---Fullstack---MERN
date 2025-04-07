import { Router } from "express";
import Attendance from "../../models/Attendance.js";
import User from "../../models/User.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

// // Get all unique courses
router.get("/courses", async (req, res) => {
  try {
    const uniqueCourses = await User.aggregate([
      {
        $unwind: "$registeredCourses", // Flatten the registeredCourses array
      },
      {
        $group: {
          _id: null,
          uniqueCourses: { $addToSet: "$registeredCourses" }, // Collect unique courses
        },
      },
      {
        $project: {
          _id: 0,
          uniqueCourses: 1, // Return only the uniqueCourses field
        },
      },
    ]);
    // console.log("Unique courses: ", uniqueCourses);
    res.status(200).json(uniqueCourses[0]?.uniqueCourses || []);
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

// Get attendance for a specific course
router.get("/attendance/:course", authMiddleware, async (req, res) => {
  try {
    // Fetch attendance records for the specified course
    const attendanceRecords = await Attendance.find({
      course: req.params.course, // Replace with `courseId` if using IDs
    }).populate("userId", "name email"); // Fetch user details (name and email)

    const formattedRecords = attendanceRecords.map((record) => ({
      _id: record._id, // Include the unique ID for frontend reference
      userName: record.userId?.name, // Use optional chaining to avoid null errors
      userEmail: record.userId?.email, // User email if available
      course: record.course,
      date: record.date,
      status: record.status,
    }));

    res.status(200).json(formattedRecords);
  } catch (err) {
    console.error("Error fetching attendance records:", err); // Log the error
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }, "_id name email"); // Only fetch required fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Route to create a new attendance record
router.post("/attendance/:selectedcourse", authMiddleware, async (req, res) => {
  try {
    const { userId, date, status } = req.body;

    // Validate request body
    if (!userId || !date || !status) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the userId exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create new attendance record
    const newRecord = await Attendance.create({
      userId,
      course: req.params.selectedcourse,
      date,
      status,
    });

    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Error creating attendance:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.put("/attendance/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.params.id, // This matches the attendance record ID
      { status },
      { new: true } // Return the updated record
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Delete attendance record
router.delete("/attendance/:id", authMiddleware, async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// Get attendance report for a specific student or entire system
router.get("/reports", authMiddleware, async (req, res) => {
  try {
    const { userId, course } = req.query;

    // Build dynamic filter
    const filter = {};
    if (userId) filter.userId = userId;
    if (course) filter.course = course;

    // Fetch attendance records based on filters
    const attendanceRecords = await Attendance.find(filter)
      .populate("userId", "name email") // Populate user details (name & email)
      .sort({ date: 1 }); // Sort by date ascending

    // Format the response
    const formattedRecords = attendanceRecords.map((record) => ({
      _id: record._id,
      userName: record.userId?.name || "Unknown",
      userEmail: record.userId?.email || "Unknown",
      course: record.course,
      date: record.date,
      status: record.status,
    }));

    res.status(200).json(formattedRecords);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

//Getting all leave requests
router.get("/admin/leave-requests", authMiddleware, async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find()
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.status(200).json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

//Update Leave Request Status
router.put("/admin/leave-requests/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRequest = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

export default router;
