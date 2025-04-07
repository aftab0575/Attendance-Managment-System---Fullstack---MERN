import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    req.user = { id: user._id, role: user.role };
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};

export default authMiddleware;
