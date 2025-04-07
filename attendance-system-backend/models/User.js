import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Restrict roles to 'user' or 'admin'
      default: "user",
    },
    registeredCourses: {
      type: [String],
      default: [],
    }, // Courses the user registered for
    profilePicture: {
      type: String,
      default: null, // Default to null if no picture is uploaded
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
