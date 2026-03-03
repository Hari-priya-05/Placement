import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaGraduationCap,
  FaUserPlus,
} from "react-icons/fa";

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    company: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const setRole = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/auth/register", formData);
      onRegister(response.data.user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join our community today</p>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <div className="role-selector">
            <div
              className={`role-option ${formData.role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              <FaGraduationCap />
              <span>Student</span>
            </div>
            <div
              className={`role-option ${formData.role === "recruiter" ? "active" : ""}`}
              onClick={() => setRole("recruiter")}
            >
              <FaBuilding />
              <span>Recruiter</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                <FaUser style={{ marginRight: "8px" }} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaEnvelope style={{ marginRight: "8px" }} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock style={{ marginRight: "8px" }} />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength="6"
              />
            </div>

            {formData.role === "recruiter" && (
              <div className="form-group">
                <label>
                  <FaBuilding style={{ marginRight: "8px" }} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}{" "}
              <FaUserPlus />
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account?</p>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
