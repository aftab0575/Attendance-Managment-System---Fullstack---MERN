# 📘 Attendance Management System (AMS)

A full-featured **Attendance Management System** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This platform provides an intuitive interface for students and admins to manage, mark, and monitor attendance efficiently.

🌐 **Live Demo**: [Check it out on Vercel 🚀](https://attendance-managment-system-frontend.vercel.app)

---

## 🖼️ Screenshots

### 👨‍🎓 Student Dashboard
![Student Dashboard](./screenshots/student-dashboard.png)

### 👨‍💼 Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 📌 Features

### For Students:
- 🔍 View and edit personal profile
- 📝 Register for courses
- ✅ Mark attendance for today’s class
- 📊 View attendance history
- 📬 Submit leave requests

### For Admin:
- 🔍 View and manage student profiles
- 📅 Add, update, or delete attendance for any student/course
- 📊 Generate attendance reports (filtered by course/student)
- 📩 Approve or reject leave requests

---

## 🛠️ Tech Stack

| Technology     | Description                           |
|----------------|---------------------------------------|
| **MongoDB**    | NoSQL database for storing data       |
| **Express.js** | Backend framework for Node.js         |
| **React.js**   | Frontend user interface               |
| **Node.js**    | Runtime for executing JS on backend   |
| **Vercel**     | Hosting platform for frontend         |

---

# 📁 Project Structure

📦 attendance-management-system/
├── 📁 backend/              # Express backend with routes & DB models
│   └── server.js           # Main entry point of the backend server
├── 📁 frontend/             # React app for UI
│   └── src/                # Components, pages, and services
├── .env                    # Environment variables (Mongo URI, etc.)
└── README.md               # Project documentation

---

# 🧪 Run Locally

---

# Backend:
cd backend
npm install
npm run dev   # or: node server.js

# Frontend:
cd frontend
npm install
npm start

---

Make sure your MongoDB server is running and .env contains valid configuration:

MONGO_URI= [ your mogodbAtlas connection string ]

---

# 🌍 Deployment
Frontend is deployed using Vercel.

🌐 URL: attendance-management-system-frontend.vercel.app

--- 

# 👨‍💻 Author
Aftab Bashir
📧 LinkedIn : https://www.linkedin.com/in/aftab-bashir-i190575
💻 Youtube : https://www.youtube.com/@Student_Aftab0575/videos


🌟 Show your support
If you like this project, please ⭐ the repo and share it with others!

---

### 📝 Next Steps

- Replace the image paths (`./screenshots/student-dashboard.png`) with actual paths in your repo, or create a `screenshots/` folder and add the screenshots there.
- Update the backend repo link and environment file instructions as per your actual implementation.

Want me to generate the folder structure or `.env` sample for you too?

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or cloud)
- Git

### Clone the repository

```bash
git clone https://github.com/your-username/attendance-management-system.git
cd attendance-management-system
