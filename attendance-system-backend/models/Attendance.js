import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    course: { 
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        required: true,
    },
    status: { type: String, enum: ["Present","Absent","Leave"], default: "Present" }, // Fix enum values,
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
