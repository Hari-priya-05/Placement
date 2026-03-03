import React, { useState, useRef } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaUpload,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    skills: user.skills?.join(", ") || "",
    education: user.education || "",
    experience: user.experience || "",
  });
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const response = await axios.post("/profile/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ ...user, avatar: response.data.avatar });
      setMessage({ type: "success", text: "Avatar updated successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload avatar" });
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setUploading(true);
    try {
      const response = await axios.post("/profile/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser({ ...user, resume: response.data.resume });
      setMessage({ type: "success", text: "Resume uploaded successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload resume" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim());
      const response = await axios.put("/profile", {
        name: formData.name,
        skills: skillsArray,
        education: formData.education,
        experience: formData.experience,
      });
      setUser({ ...user, ...response.data.user });
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !user.darkMode;
    try {
      await axios.put("/profile", { darkMode: newDarkMode });
      setUser({ ...user, darkMode: newDarkMode });
      if (newDarkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    } catch (error) {
      console.error("Failed to toggle dark mode");
    }
  };

  const getUserInitials = () => {
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fade-in" style={{ padding: "40px 0" }}>
      <div className="container">
        <div className="profile-header">
          <div
            className="profile-avatar-large"
            onClick={() => fileInputRef.current.click()}
          >
            {user.avatar ? (
              <img
                src={`http://localhost:5001${user.avatar}`}
                alt={user.name}
              />
            ) : (
              getUserInitials()
            )}
            <div className="avatar-upload">
              <FaUpload /> Change
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
              {user.name}
            </h1>
            <p style={{ color: "var(--gray-600)", marginBottom: "5px" }}>
              <FaEnvelope /> {user.email}
            </p>
            {user.role === "recruiter" && (
              <p style={{ color: "var(--gray-600)" }}>
                <FaBuilding /> {user.company}
              </p>
            )}
            <button
              onClick={toggleDarkMode}
              className="dark-mode-toggle"
              style={{ marginTop: "15px" }}
            >
              {user.darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <div className="glass-card" style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "20px" }}>Profile Information</h2>

          {isEditing ? (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              {user.role === "student" && (
                <>
                  <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="React, JavaScript, Node.js"
                    />
                  </div>

                  <div className="form-group">
                    <label>Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="B.Tech Computer Science"
                    />
                  </div>

                  <div className="form-group">
                    <label>Experience</label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows="3"
                      placeholder="2 years internship at..."
                    />
                  </div>
                </>
              )}

              <div style={{ display: "flex", gap: "15px" }}>
                <button onClick={handleSave} className="btn btn-success">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {user.role === "student" && (
                <>
                  <p>
                    <strong>Skills:</strong>{" "}
                    {user.skills?.join(", ") || "Not added"}
                  </p>
                  <p>
                    <strong>Education:</strong> {user.education || "Not added"}
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {user.experience || "Not added"}
                  </p>
                </>
              )}
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>

        {user.role === "student" && (
          <div className="glass-card">
            <h2 style={{ marginBottom: "20px" }}>Resume</h2>

            <div
              className="resume-upload-area"
              onClick={() => resumeInputRef.current.click()}
            >
              <div className="resume-icon">
                <FaUpload />
              </div>
              <h3>Upload your resume</h3>
              <p style={{ color: "var(--gray-500)", marginTop: "10px" }}>
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            <input
              type="file"
              ref={resumeInputRef}
              onChange={handleResumeUpload}
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
            />

            {user.resume && (
              <div className="resume-file">
                <div>
                  <FaCode /> {user.resume.split("/").pop()}
                </div>
                <a
                  href={`http://localhost:5001${user.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ padding: "8px 20px" }}
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
