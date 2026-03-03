import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaStar,
  FaChartLine,
  FaFileAlt,
  FaUserGraduate,
} from "react-icons/fa";

function StudentDashboard({ user }) {
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    pending: 0,
    rejected: 0,
    profileViews: 124,
    savedJobs: 8,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("applications");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with API calls
      setRecentApplications([
        {
          id: 1,
          title: "Frontend Developer",
          company: "Google",
          status: "shortlisted",
          appliedDate: "2024-03-01",
          logo: "G",
        },
        {
          id: 2,
          title: "React Developer",
          company: "Microsoft",
          status: "pending",
          appliedDate: "2024-03-05",
          logo: "M",
        },
        {
          id: 3,
          title: "UI Developer",
          company: "Amazon",
          status: "rejected",
          appliedDate: "2024-02-28",
          logo: "A",
        },
        {
          id: 4,
          title: "JavaScript Developer",
          company: "Flipkart",
          status: "shortlisted",
          appliedDate: "2024-03-03",
          logo: "F",
        },
      ]);

      setRecommendedJobs([
        {
          id: 101,
          title: "Senior Frontend Developer",
          company: "Tech Corp",
          location: "Bangalore",
          salary: "₹25,00,000",
          match: 95,
        },
        {
          id: 102,
          title: "Full Stack Developer",
          company: "Startup Inc",
          location: "Remote",
          salary: "₹18,00,000",
          match: 88,
        },
        {
          id: 103,
          title: "UI/UX Designer",
          company: "Design Studio",
          location: "Mumbai",
          salary: "₹15,00,000",
          match: 82,
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "shortlisted":
        return <FaCheckCircle color="var(--success)" />;
      case "pending":
        return <FaHourglassHalf color="var(--warning)" />;
      case "rejected":
        return <FaTimesCircle color="var(--danger)" />;
      default:
        return <FaBriefcase color="var(--gray-600)" />;
    }
  };

  const getStatusClass = (status) => {
    return `application-status status-${status}`;
  };

  return (
    <div className="student-dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="dashboard-header fade-in-up">
          <div>
            <h1>Welcome back, {user.name}! 👋</h1>
            <p style={{ color: "var(--gray-600)" }}>
              Here's what's happening with your job applications
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/jobs" className="btn btn-primary">
              Browse Jobs
            </Link>
            <Link to="/profile" className="btn btn-outline">
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card scale-in">
            <div className="stat-icon">
              <FaBriefcase />
            </div>
            <div className="stat-content">
              <h3>Total Applications</h3>
              <div className="stat-number">24</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="stat-icon" style={{ background: "var(--success)" }}>
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <h3>Shortlisted</h3>
              <div className="stat-number">6</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="stat-icon" style={{ background: "var(--warning)" }}>
              <FaHourglassHalf />
            </div>
            <div className="stat-content">
              <h3>Pending</h3>
              <div className="stat-number">12</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="stat-icon" style={{ background: "var(--danger)" }}>
              <FaTimesCircle />
            </div>
            <div className="stat-content">
              <h3>Rejected</h3>
              <div className="stat-number">6</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="stat-icon" style={{ background: "var(--accent)" }}>
              <FaStar />
            </div>
            <div className="stat-content">
              <h3>Profile Views</h3>
              <div className="stat-number">124</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              className="stat-icon"
              style={{ background: "var(--primary-light)" }}
            >
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>Saved Jobs</h3>
              <div className="stat-number">8</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            Recent Applications
          </button>
          <button
            className={`dashboard-tab ${activeTab === "recommended" ? "active" : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            Recommended Jobs
          </button>
          <button
            className={`dashboard-tab ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Jobs
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "applications" && (
          <div className="fade-in">
            {recentApplications.map((app, index) => (
              <div
                key={app.id}
                className="job-card"
                style={{
                  marginBottom: "15px",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="job-header">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <div className="job-company-logo">{app.logo}</div>
                    <div>
                      <h3 className="job-title">{app.title}</h3>
                      <p className="job-company">{app.company}</p>
                    </div>
                  </div>
                  <div className={getStatusClass(app.status)}>
                    {getStatusIcon(app.status)} {app.status}
                  </div>
                </div>
                <div className="job-footer">
                  <span style={{ color: "var(--gray-600)" }}>
                    Applied:{" "}
                    {new Date(app.appliedDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/jobs/${app.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "recommended" && (
          <div className="fade-in">
            <div className="job-grid">
              {recommendedJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="job-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="job-header">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div className="job-company-logo">
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "var(--success)",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                      }}
                    >
                      {job.match}% Match
                    </div>
                  </div>
                  <div className="job-details">
                    <span className="job-detail">{job.location}</span>
                    <span className="job-detail">{job.salary}</span>
                  </div>
                  <div className="job-footer">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="fade-in">
            <div
              className="glass-card"
              style={{ textAlign: "center", padding: "50px" }}
            >
              <FaFileAlt size={50} color="var(--gray-400)" />
              <h3 style={{ margin: "20px 0" }}>No saved jobs yet</h3>
              <p style={{ color: "var(--gray-600)", marginBottom: "20px" }}>
                Save jobs you're interested in to apply later
              </p>
              <Link to="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
