import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import User from "../../models/User.js";
import multer from "multer";
const router = Router();

// Multer setup for profile picture uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Get User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});


// Update Profile
router.put("/profile", authMiddleware, upload.single("profilePicture"), async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Update name
    if (name) user.name = name;

    // Update profile picture
    if (req.file) {
      const profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
      )}`;
      user.profilePicture = profilePicture;
    }

    // Save the user
    await user.save();

    res.status(200).json({ success: true, message: "Profile updated successfully.", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

export default router;
