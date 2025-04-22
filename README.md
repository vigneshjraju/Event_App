 🎉 Event_App

A full-stack mobile **Event Management System** built with **React Native (Expo)** for the frontend and **NestJS** for the backend. Organizers can securely create, update, view, and delete events. The backend uses **MongoDB** for data storage and **JWT with HttpOnly cookies** for secure authentication.

---

## 🚀 Features

### 🔐 Authentication
- Organizer **Signup** and **Login**
- **JWT-based authentication** with **cookie-based session handling**
- Secure API access using `withCredentials` in the frontend

### 🗓️ Event Management
- Full **CRUD** functionality for events
- Upload event **images** using Expo Image Picker
- Organizer-specific access control (edit/delete their own events only)
- View individual event details
- Navigation using **Expo Router**

### 📱 Frontend (React Native)
- Built with **React Native + Expo**
- Navigation handled by **Expo Router**
- Responsive and minimal UI
- Styled with **NativeWind** (Tailwind CSS for React Native)
- Axios for API requests with cookies enabled

### ⚙️ Backend (NestJS)
- RESTful API using **NestJS + TypeScript**
- Database: **MongoDB** with **Mongoose**
- Modular architecture with **Controller-Service** pattern
- Secure **JWT authentication**, **input validation**, and **error handling**

---

## 🧪 Getting Started

### 📦 Backend Setup

```bash
# Clone the repo
cd event-management-backend
npm install

# Start the server
npm run start
```

#### 🔐 Environment Setup (Backend)

Create a `.env` file in the `event-management-backend` root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

---

### 📱 Frontend Setup

```bash
# Clone the repo
cd ui
npm install

# Start the Expo development server
npx expo start
```

> 💡 Make sure your device/emulator and backend server are on the same Wi-Fi network.

---

## 📌 To-Do / Coming Soon

- ✅ Organizer login and CRUD operations
- 🔜 Add **Attendee role** and ticket booking
- 🔜 Implement **search/filter** by location and date
- 🔜 Enable **push notifications** with Expo
- 🔜 Enhance UI polish and animations

---

## 🧠 Inspiration

This project was developed as a full-stack learning experience, demonstrating real-world concepts like:

- Auth using JWT & cookies
- File uploads via mobile
- REST API best practices with NestJS
- Responsive UI with React Native and Tailwind

---

## 📸 Screenshots

_coming soon_

---

## 📂 Repo Structure

```
event-management-backend/
│   ├── src/
│   ├── .env
│   └── package.json

ui/
│   ├── app/
│   ├── assets/
│   └── package.json
```

---

## 🧑‍💻 Author

**Vignesh J Raju**  
Full-stack Developer | MERN & NestJS | React Native  
PG Diploma in Blockchain  

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.