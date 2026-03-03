import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import Companies from "./components/Companies";
import Resources from "./components/Resources";
import Articles from "./components/Articles";
import StudentDashboard from "./components/StudentDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import Applicants from "./components/Applicants";
import Messages from "./components/Messages";
import Footer from "./components/Footer";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

// Wrapper component to conditionally show header
function AppContent({ user, setUser, loading }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.darkMode) {
      document.body.classList.add("dark-mode");
    }
  };

  const handleLogout = () => {
    setUser(null);
    document.body.classList.remove("dark-mode");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={isAuthPage ? "auth-page" : ""}>
      {!isAuthPage && <Header user={user} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleLogin} />}
        />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails user={user} />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/articles" element={<Articles user={user} />} />

        <Route
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/student/dashboard"
          element={
            user?.role === "student" ? (
              <StudentDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/recruiter/dashboard"
          element={
            user?.role === "recruiter" ? (
              <RecruiterDashboard user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/applicants/:jobId"
          element={
            user?.role === "recruiter" ? <Applicants /> : <Navigate to="/" />
          }
        />

        <Route
          path="/messages/:userId"
          element={user ? <Messages /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/auth/me");
      setUser(response.data.user);
      if (response.data.user?.darkMode) {
        document.body.classList.add("dark-mode");
      }
    } catch (error) {
      console.error("Auth check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <AppContent user={user} setUser={setUser} loading={loading} />
    </Router>
  );
}

export default App;
