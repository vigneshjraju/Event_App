# 🎉 Event_App

A full-stack mobile **Event Management System** built with **React Native (Expo)** for the frontend and **NestJS** for the backend. This application allows event organizers to securely manage events by creating, updating, viewing, and deleting them. The backend uses MongoDB for data storage and JWT for authentication.

---
## 🚀 Features

### 🔐 Authentication
- Organizer **Signup** and **Login**
- JWT-based **secure authentication**
- Cookie-based session handling (with `withCredentials` in frontend)

### 🗓️ Event Management
- **Create**, **Read**, **Update**, and **Delete** events
- Upload event **images** using image picker
- Organizer-specific access control for edit/delete
- View single event details and navigate with Expo Router

### 📱 Frontend (React Native)
- Built with **React Native + Expo**
- Styled with **NativeWind** 
- Uses **Expo Router** for navigation
- Mobile responsive, minimal UI

### ⚙️ Backend (NestJS)
- RESTful API using **NestJS + TypeScript**
- **MongoDB** with **Mongoose**
- Uses decorators for clean controller-service separation
- Includes secure authentication and validation

---

## 🧪 Getting Started

### Backend Setup

```bash
cd event-management-backend
npm install
npm run start

### Frontend Setup

```bash
cd ui
npm install
npx expo start

Make sure your device or emulator is on the same Wi-Fi network as the backend server.

---

📌 To-Do / Coming Soon

 Add Attendee role and ticket booking

 Search and filter events by location/date

 Push notifications using Expo

 Enhanced UI polish and transitions

 ---


 🧠 Inspiration

This project was developed as a full-stack learning exercise using React Native and NestJS, showcasing real-world authentication, file uploads, secure APIs, and full CRUD operations.

---