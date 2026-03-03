import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
  FaSearch,
} from "react-icons/fa";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    experience: "",
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Mock data - replace with API call
      const mockJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "Google",
          logo: "G",
          location: "Bangalore",
          salary: "₹25,00,000 - ₹35,00,000",
          type: "Full-time",
          experience: "5-8 years",
          description:
            "We are looking for an experienced Frontend Developer to join our team...",
          skills: ["React", "TypeScript", "Next.js"],
          postedDate: "2024-03-01",
          featured: true,
        },
        {
          id: 2,
          title: "React Developer",
          company: "Microsoft",
          logo: "M",
          location: "Hyderabad",
          salary: "₹18,00,000 - ₹25,00,000",
          type: "Full-time",
          experience: "3-5 years",
          description:
            "Join our team to build cutting-edge web applications...",
          skills: ["React", "Redux", "Node.js"],
          postedDate: "2024-03-03",
          featured: true,
        },
        {
          id: 3,
          title: "UI/UX Designer",
          company: "Amazon",
          logo: "A",
          location: "Bangalore",
          salary: "₹15,00,000 - ₹22,00,000",
          type: "Full-time",
          experience: "2-4 years",
          description: "Design beautiful and intuitive user interfaces...",
          skills: ["Figma", "Adobe XD", "User Research"],
          postedDate: "2024-03-05",
          featured: false,
        },
        {
          id: 4,
          title: "Backend Developer",
          company: "Flipkart",
          logo: "F",
          location: "Bangalore",
          salary: "₹20,00,000 - ₹28,00,000",
          type: "Full-time",
          experience: "4-6 years",
          description: "Build scalable backend systems...",
          skills: ["Node.js", "Python", "MongoDB"],
          postedDate: "2024-03-02",
          featured: false,
        },
        {
          id: 5,
          title: "DevOps Engineer",
          company: "Adobe",
          logo: "A",
          location: "Noida",
          salary: "₹18,00,000 - ₹25,00,000",
          type: "Full-time",
          experience: "3-5 years",
          description: "Manage cloud infrastructure and deployment...",
          skills: ["AWS", "Docker", "Kubernetes"],
          postedDate: "2024-03-04",
          featured: false,
        },
        {
          id: 6,
          title: "Data Scientist",
          company: "Goldman Sachs",
          logo: "G",
          location: "Bangalore",
          salary: "₹22,00,000 - ₹32,00,000",
          type: "Full-time",
          experience: "4-7 years",
          description: "Apply machine learning to financial data...",
          skills: ["Python", "Machine Learning", "SQL"],
          postedDate: "2024-03-01",
          featured: true,
        },
      ];
      setJobs(mockJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !filters.location || job.location === filters.location;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesExperience =
      !filters.experience || job.experience === filters.experience;
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const locations = [...new Set(jobs.map((job) => job.location))];
  const types = [...new Set(jobs.map((job) => job.type))];
  const experiences = [...new Set(jobs.map((job) => job.experience))];

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

  return (
    <div style={{ padding: "60px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 className="display-2" style={{ color: "var(--primary)" }}>
            Find Your Dream Job
          </h1>
          <p
            style={{
              color: "var(--gray-600)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "20px auto",
            }}
          >
            Browse thousands of jobs from top companies
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search jobs by title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch /> Search
          </button>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Location</label>
              <select
                className="filter-select"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Job Type</label>
              <select
                className="filter-select"
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Experience</label>
              <select
                className="filter-select"
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
              >
                <option value="">All Experience</option>
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: "30px" }}>
          <p style={{ color: "var(--gray-600)" }}>
            Showing <strong>{filteredJobs.length}</strong> jobs
          </p>
        </div>

        {/* Job Cards */}
        <div className="job-grid">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`job-card ${job.featured ? "featured" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {job.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "var(--accent)",
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Featured
                </span>
              )}
              <div className="job-header">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <div className="job-company-logo">{job.logo}</div>
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                </div>
              </div>

              <div className="job-details">
                <span className="job-detail">
                  <FaMapMarkerAlt /> {job.location}
                </span>
                <span className="job-detail">
                  <FaMoneyBillWave /> {job.salary}
                </span>
                <span className="job-detail">
                  <FaBriefcase /> {job.type}
                </span>
                <span className="job-detail">
                  <FaClock /> {job.experience}
                </span>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-tags">
                {job.skills.map((skill, i) => (
                  <span key={i} className="job-tag">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="job-footer">
                <span style={{ color: "var(--gray-500)", fontSize: "0.9rem" }}>
                  Posted{" "}
                  {new Date(job.postedDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <Link to={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="page-link">←</button>
          <button className="page-link active">1</button>
          <button className="page-link">2</button>
          <button className="page-link">3</button>
          <button className="page-link">→</button>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
