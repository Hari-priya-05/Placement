import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      onLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          CampusPlace
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/resources">Resources</Link>

          {user ? (
            <div className="user-info">
              <span style={{ color: "#4a5568" }}>Hi, {user.name}</span>
              <Link
                to={`/${user.role}/dashboard`}
                className="btn btn-primary"
                style={{ padding: "8px 20px" }}
              >
                Dashboard
              </Link>
              <div className="user-avatar">{getUserInitials()}</div>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ padding: "8px 20px" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-secondary"
                style={{ padding: "8px 20px" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
                style={{ padding: "8px 20px" }}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#667eea",
          }}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu - Add responsive styles as needed */}
      </div>
    </nav>
  );
}

export default Navbar;
