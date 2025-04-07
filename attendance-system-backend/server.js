import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/UserRoutes/CourseRoutes.js";
import attendanceRoutes from "./routes/AdminRoutes/attendanceRoutes.js";
import leaveRoutes from "./routes/UserRoutes/LeaveRoutes.js";
import userRoutes from "./routes/UserRoutes/userRoutes.js";
import AdminRoutes from "./routes/AdminRoutes/adminRoutes.js"

config();

const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome!');
});

// User Panel Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));

//Admin Panel Routes
app.use("/api/admin", AdminRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("🎉 Server is live and running!");
  });
  

// Start server
const PORT = process.env.PORT || 5000;

import mongoose from 'mongoose';
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('App Connected to Database')
        
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));




