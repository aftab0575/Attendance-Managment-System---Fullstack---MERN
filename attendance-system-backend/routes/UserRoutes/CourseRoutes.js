import { Router } from "express";
import User from "../../models/User.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

// Register courses
router.post("/register", authMiddleware, async (req, res) => {
  const { courses } = req.body;

  try {
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ success: false, message: "Courses are required." });
    }

    // Update user's registered courses
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { registeredCourses: { $each: courses } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Courses registered successfully.",
      data: user.registeredCourses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch registered courses
router.get("/registered", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user.registeredCourses);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
