import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import SharedActivities from "./pages/SharedActivities";
import PersonalActivities from "./pages/PersonalActivities";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shared"
          element={
            <ProtectedRoute>
              <SharedActivities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/personal"
          element={
            <ProtectedRoute>
              <PersonalActivities />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      </Routes>

      <ToastContainer
        position="top-right"
      />
    </AuthProvider>
  );
}

export default App;