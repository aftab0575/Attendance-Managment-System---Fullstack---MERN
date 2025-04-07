
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";

const { hash, compare } = bcryptjs;
const { sign } = jsonwebtoken;

const router = Router();

import multer from "multer";
import path from "path";

// Multer setup to handle uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", upload.single("profilePicture"), async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required except profile picture." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Convert profile picture to Base64 if provided
    const profilePicture = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : null;

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profilePicture,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, role, profilePicture } = req.body;

//   try {
//     // Validate inputs
//     if (!name || !email || !password || !role) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required except profile picture." });
//     }

//     if (!["user", "admin"].includes(role)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid role. Must be 'user' or 'admin'." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already registered." });
//     }

//     // Hash password
//     const hashedPassword = await hash(password, 10);

//     // Create new user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role,
//       profilePicture: profilePicture || null, // Assign null if no picture is provided
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully.",
//       data: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         profilePicture: user.profilePicture,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error: " + err.message });
//   }
// });


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials. User not found." });
    }

    // Check password match
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials. Password mismatch." });
    }

    // Generate JWT token
    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error: " + err.message });
  }
});

export default router;
