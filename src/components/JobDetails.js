import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
  FaGraduationCap,
  FaArrowLeft,
  FaBookmark,
  FaShare,
  FaCheckCircle,
} from "react-icons/fa";

function JobDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    fetchJobDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/jobs/${id}`);
      setJob(response.data);
      // Check if already applied
      if (user?.role === "student") {
        setHasApplied(response.data.applicants?.includes(user.id));
      }

      // Fetch similar jobs (mock data for now)
      setSimilarJobs([
        {
          id: "2",
          title: "Senior Frontend Developer",
          company: "Tech Corp",
          location: "Bangalore",
          type: "Full-time",
        },
        {
          id: "3",
          title: "React Developer",
          company: "Startup Inc",
          location: "Remote",
          type: "Full-time",
        },
      ]);
    } catch (error) {
      console.error("Failed to fetch job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setApplying(true);
    try {
      await axios.post(`/jobs/${id}/apply`);
      setHasApplied(true);
      alert("Application submitted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="container"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <h2>Job not found</h2>
        <button
          onClick={() => navigate("/jobs")}
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          <FaArrowLeft /> Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline"
          style={{ marginBottom: "30px" }}
        >
          <FaArrowLeft /> Back
        </button>

        <div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "30px",
          }}
        >
          {/* Main Content */}
          <div>
            <div className="job-details-header">
              <div className="job-details-company">
                <div className="job-details-logo">{job.company?.charAt(0)}</div>
                <div>
                  <h1 className="job-details-title">{job.title}</h1>
                  <p
                    style={{
                      color: "var(--primary)",
                      fontSize: "1.2rem",
                      marginBottom: "5px",
                    }}
                  >
                    {job.company}
                  </p>
                  <p style={{ color: "var(--gray-600)" }}>
                    Posted{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="job-details-meta">
                <div className="job-meta-item">
                  <div className="job-meta-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="job-meta-content">
                    <h4>Location</h4>
                    <p>{job.location}</p>
                  </div>
                </div>
                <div className="job-meta-item">
                  <div className="job-meta-icon">
                    <FaMoneyBillWave />
                  </div>
                  <div className="job-meta-content">
                    <h4>Salary</h4>
                    <p>{job.salary}</p>
                  </div>
                </div>
                <div className="job-meta-item">
                  <div className="job-meta-icon">
                    <FaBriefcase />
                  </div>
                  <div className="job-meta-content">
                    <h4>Job Type</h4>
                    <p>{job.type || "Full-time"}</p>
                  </div>
                </div>
                <div className="job-meta-item">
                  <div className="job-meta-icon">
                    <FaClock />
                  </div>
                  <div className="job-meta-content">
                    <h4>Experience</h4>
                    <p>{job.experience || "2-5 years"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="job-details-section">
              <h3>About the Role</h3>
              <p style={{ lineHeight: "1.8", color: "var(--gray-700)" }}>
                {job.description}
              </p>
            </div>

            <div className="job-details-section">
              <h3>Responsibilities</h3>
              <ul>
                <li>Develop and maintain web applications using React.js</li>
                <li>
                  Collaborate with cross-functional teams to define and design
                  new features
                </li>
                <li>Write clean, maintainable, and efficient code</li>
                <li>Optimize applications for maximum speed and scalability</li>
                <li>Participate in code reviews and team meetings</li>
              </ul>
            </div>

            <div className="job-details-section">
              <h3>Requirements</h3>
              <ul>
                <li>Bachelor's degree in Computer Science or related field</li>
                <li>3+ years of experience in frontend development</li>
                <li>Strong proficiency in JavaScript, HTML, CSS</li>
                <li>Experience with React.js and its ecosystem</li>
                <li>Knowledge of modern frontend build tools</li>
              </ul>
            </div>

            <div className="job-details-section">
              <h3>Benefits</h3>
              <ul>
                <li>Competitive salary and equity</li>
                <li>Health, dental, and vision insurance</li>
                <li>Flexible working hours</li>
                <li>Remote work options</li>
                <li>Professional development budget</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="apply-section">
              <h3>Apply for this position</h3>

              {!user ? (
                <>
                  <p style={{ color: "var(--gray-600)", marginBottom: "20px" }}>
                    Please login to apply for this job
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    Login to Apply
                  </button>
                </>
              ) : user.role === "student" ? (
                <>
                  {hasApplied ? (
                    <div style={{ textAlign: "center" }}>
                      <FaCheckCircle
                        size={50}
                        color="var(--success)"
                        style={{ marginBottom: "15px" }}
                      />
                      <h4
                        style={{
                          color: "var(--success)",
                          marginBottom: "10px",
                        }}
                      >
                        Application Submitted!
                      </h4>
                      <p style={{ color: "var(--gray-600)" }}>
                        You have successfully applied for this position.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p
                        style={{
                          color: "var(--gray-600)",
                          marginBottom: "20px",
                        }}
                      >
                        Make sure your profile is up to date before applying
                      </p>
                      <button
                        onClick={handleApply}
                        className="btn btn-primary"
                        style={{ width: "100%", marginBottom: "10px" }}
                        disabled={applying}
                      >
                        {applying ? "Applying..." : "Apply Now"}
                      </button>
                      <button
                        className="btn btn-outline"
                        style={{ width: "100%" }}
                      >
                        <FaBookmark /> Save for Later
                      </button>
                    </>
                  )}
                </>
              ) : (
                <p style={{ color: "var(--gray-600)" }}>
                  Recruiters cannot apply for jobs
                </p>
              )}

              <div
                style={{
                  marginTop: "30px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--gray-200)",
                }}
              >
                <button className="btn btn-outline" style={{ width: "100%" }}>
                  <FaShare /> Share this job
                </button>
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div
                className="job-details-section"
                style={{ marginTop: "30px" }}
              >
                <h3>Similar Jobs</h3>
                {similarJobs.map((similar) => (
                  <div
                    key={similar.id}
                    className="card"
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    onClick={() => navigate(`/jobs/${similar.id}`)}
                  >
                    <h4 style={{ marginBottom: "5px" }}>{similar.title}</h4>
                    <p
                      style={{
                        color: "var(--primary)",
                        fontSize: "0.9rem",
                        marginBottom: "5px",
                      }}
                    >
                      {similar.company}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        fontSize: "0.85rem",
                        color: "var(--gray-600)",
                      }}
                    >
                      <span>{similar.location}</span>
                      <span>•</span>
                      <span>{similar.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
