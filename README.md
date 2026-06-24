# Team Activity Hub

Team Activity Hub is a simple MERN stack web application that helps users manage and share activities. Users can create personal activities, share activities with others, manage their profiles, and reset passwords using OTP verification.

## Features

* User Registration and Login
* JWT Authentication
* Shared Activities Management
* Personal Activities Management
* Dashboard Statistics
* Profile Management
* Forgot Password with OTP Verification
* Responsive User Interface

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Resend Email Service

## Live Demo

https://team-activity-hub.vercel.app

## GitHub Repository

https://github.com/sudharsanraja17/team-activity-hub

## Installation

### Clone the Repository

```bash
git clone https://github.com/sudharsanraja17/team-activity-hub.git
cd team-activity-hub
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```text
team-activity-hub
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── context
│   └── vite.config.js
│
└── README.md
```

