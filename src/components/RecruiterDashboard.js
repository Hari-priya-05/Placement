import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaUsers,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaPlus,
  FaFileAlt,
  FaChartBar,
} from "react-icons/fa";

function RecruiterDashboard({ user }) {
  const [stats, setStats] = useState({
    activeJobs: 5,
    totalApplicants: 48,
    shortlisted: 12,
    pending: 28,
    rejected: 8,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: user.company || "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
    requirements: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data
      setRecentJobs([
        {
          id: 1,
          title: "Senior Frontend Developer",
          location: "Bangalore",
          applicants: 24,
          status: "active",
          postedDate: "2024-03-01",
        },
        {
          id: 2,
          title: "React Developer",
          location: "Remote",
          applicants: 18,
          status: "active",
          postedDate: "2024-03-03",
        },
        {
          id: 3,
          title: "UI/UX Designer",
          location: "Mumbai",
          applicants: 12,
          status: "active",
          postedDate: "2024-03-05",
        },
      ]);

      setRecentApplicants([
        {
          id: 1,
          name: "John Doe",
          job: "Senior Frontend Developer",
          experience: "5 years",
          status: "shortlisted",
        },
        {
          id: 2,
          name: "Jane Smith",
          job: "React Developer",
          experience: "3 years",
          status: "pending",
        },
        {
          id: 3,
          name: "Mike Johnson",
          job: "UI/UX Designer",
          experience: "4 years",
          status: "pending",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/jobs", formData);
      alert("Job posted successfully!");
      setShowPostForm(false);
      fetchDashboardData();
    } catch (error) {
      alert("Failed to post job");
    }
  };

  return (
    <div className="recruiter-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header fade-in-up">
          <div>
            <h1>Welcome back, {user.name}! 🏢</h1>
            <p style={{ color: "var(--gray-600)" }}>
              Manage your job postings and applicants
            </p>
          </div>
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="btn btn-primary"
          >
            <FaPlus /> {showPostForm ? "Cancel" : "Post New Job"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card scale-in">
            <div className="stat-icon">
              <FaBriefcase />
            </div>
            <div className="stat-content">
              <h3>Active Jobs</h3>
              <div className="stat-number">{stats.activeJobs}</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="stat-icon" style={{ background: "var(--success)" }}>
              <FaUsers />
            </div>
            <div className="stat-content">
              <h3>Total Applicants</h3>
              <div className="stat-number">{stats.totalApplicants}</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="stat-icon" style={{ background: "var(--success)" }}>
              <FaCheckCircle />
            </div>
            <div className="stat-content">
              <h3>Shortlisted</h3>
              <div className="stat-number">{stats.shortlisted}</div>
            </div>
          </div>
          <div
            className="stat-card scale-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="stat-icon" style={{ background: "var(--warning)" }}>
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Pending</h3>
              <div className="stat-number">{stats.pending}</div>
            </div>
          </div>
        </div>

        {/* Post Job Form */}
        {showPostForm && (
          <div className="post-job-form fade-in">
            <h2 style={{ marginBottom: "30px" }}>Post a New Job</h2>
            <form onSubmit={handlePostJob}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    name="type"
                    className="form-control"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Job Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="5"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Requirements</label>
                <textarea
                  name="requirements"
                  className="form-control"
                  rows="3"
                  value={formData.requirements}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </form>
          </div>
        )}

        {/* Two Column Layout */}
        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "40px",
          }}
        >
          {/* Recent Jobs */}
          <div>
            <h2 style={{ marginBottom: "20px" }}>Recent Job Postings</h2>
            {recentJobs.map((job, index) => (
              <div
                key={job.id}
                className="job-card"
                style={{
                  marginBottom: "15px",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span
                    style={{
                      background: "var(--success)",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "50px",
                      fontSize: "0.85rem",
                    }}
                  >
                    {job.applicants} applicants
                  </span>
                </div>
                <p style={{ color: "var(--gray-600)", marginBottom: "10px" }}>
                  {job.location}
                </p>
                <div className="job-footer">
                  <span style={{ color: "var(--gray-600)" }}>
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/jobs/${job.id}/applicants`}
                    className="btn btn-outline btn-sm"
                  >
                    <FaEye /> View Applicants
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Applicants */}
          <div>
            <h2 style={{ marginBottom: "20px" }}>Recent Applicants</h2>
            {recentApplicants.map((applicant, index) => (
              <div
                key={applicant.id}
                className="card"
                style={{
                  marginBottom: "15px",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <h4 style={{ marginBottom: "5px" }}>{applicant.name}</h4>
                    <p style={{ color: "var(--gray-600)", fontSize: "0.9rem" }}>
                      {applicant.job}
                    </p>
                    <p
                      style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}
                    >
                      Experience: {applicant.experience}
                    </p>
                  </div>
                  <span
                    className={`application-status status-${applicant.status}`}
                  >
                    {applicant.status}
                  </span>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "15px" }}
                >
                  <button className="btn btn-success btn-sm">
                    <FaCheckCircle /> Shortlist
                  </button>
                  <Link
                    to={`/messages/${applicant.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    Message
                  </Link>
                  <Link
                    to={`/applicants/${applicant.id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
