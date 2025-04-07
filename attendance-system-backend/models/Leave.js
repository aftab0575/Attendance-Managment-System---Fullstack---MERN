import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  course: { 
    type: String, 
    required: true 
  },
  reason: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export default mongoose.model("Leave", leaveSchema);
