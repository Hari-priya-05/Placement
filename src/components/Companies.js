import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaStar,
  FaSearch,
} from "react-icons/fa";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Mock data - replace with API call
      const mockCompanies = [
        {
          id: 1,
          name: "Google",
          logo: "G",
          industry: "Technology",
          location: "Bangalore, India",
          employees: "10000+",
          openPositions: 24,
          rating: 4.8,
          description:
            "Google is an American multinational technology company specializing in Internet-related services and products.",
          featured: true,
        },
        {
          id: 2,
          name: "Microsoft",
          logo: "M",
          industry: "Technology",
          location: "Hyderabad, India",
          employees: "5000+",
          openPositions: 18,
          rating: 4.7,
          description:
            "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
          featured: true,
        },
        {
          id: 3,
          name: "Amazon",
          logo: "A",
          industry: "E-commerce",
          location: "Bangalore, India",
          employees: "8000+",
          openPositions: 32,
          rating: 4.5,
          description:
            "Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking.",
          featured: false,
        },
        {
          id: 4,
          name: "Flipkart",
          logo: "F",
          industry: "E-commerce",
          location: "Bangalore, India",
          employees: "3000+",
          openPositions: 15,
          rating: 4.3,
          description:
            "Flipkart is India's leading e-commerce marketplace with over 100 million products across 80+ categories.",
          featured: false,
        },
        {
          id: 5,
          name: "Adobe",
          logo: "A",
          industry: "Software",
          location: "Noida, India",
          employees: "2000+",
          openPositions: 12,
          rating: 4.6,
          description:
            "Adobe is the global leader in digital media and digital marketing solutions.",
          featured: false,
        },
        {
          id: 6,
          name: "Goldman Sachs",
          logo: "G",
          industry: "Finance",
          location: "Bangalore, India",
          employees: "4000+",
          openPositions: 20,
          rating: 4.4,
          description:
            "Goldman Sachs is a leading global investment banking, securities and investment management firm.",
          featured: true,
        },
      ];
      setCompanies(mockCompanies);
      setFilteredCompanies(mockCompanies);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

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
            Top Companies
          </h1>
          <p
            style={{
              color: "var(--gray-600)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "20px auto",
            }}
          >
            Discover amazing companies hiring right now
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search companies by name, industry, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <FaSearch /> Search
          </button>
        </div>

        {/* Featured Companies */}
        {!searchTerm && (
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ marginBottom: "30px" }}>Featured Companies</h2>
            <div className="companies-grid">
              {filteredCompanies
                .filter((c) => c.featured)
                .map((company) => (
                  <div key={company.id} className="company-card featured">
                    <div className="company-logo">{company.logo}</div>
                    <h3 className="company-name">{company.name}</h3>
                    <p className="company-industry">{company.industry}</p>
                    <div className="company-stats">
                      <div className="company-stat">
                        <div className="company-stat-value">
                          {company.openPositions}
                        </div>
                        <div className="company-stat-label">Open Jobs</div>
                      </div>
                      <div className="company-stat">
                        <div className="company-stat-value">
                          {company.rating}
                        </div>
                        <div className="company-stat-label">Rating</div>
                      </div>
                      <div className="company-stat">
                        <div className="company-stat-value">
                          {company.employees}
                        </div>
                        <div className="company-stat-label">Employees</div>
                      </div>
                    </div>
                    <p
                      style={{
                        color: "var(--gray-600)",
                        marginBottom: "20px",
                        fontSize: "0.95rem",
                      }}
                    >
                      {company.description.substring(0, 100)}...
                    </p>
                    <Link
                      to={`/companies/${company.id}`}
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Companies */}
        <h2 style={{ marginBottom: "30px" }}>
          {searchTerm
            ? `Search Results (${filteredCompanies.length})`
            : "All Companies"}
        </h2>
        <div className="companies-grid">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-logo">{company.logo}</div>
              <h3 className="company-name">{company.name}</h3>
              <p className="company-industry">{company.industry}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                  justifyContent: "center",
                }}
              >
                <FaMapMarkerAlt color="var(--gray-500)" />
                <span style={{ color: "var(--gray-600)" }}>
                  {company.location}
                </span>
              </div>
              <div className="company-stats">
                <div className="company-stat">
                  <div className="company-stat-value">
                    {company.openPositions}
                  </div>
                  <div className="company-stat-label">Jobs</div>
                </div>
                <div className="company-stat">
                  <div className="company-stat-value">{company.rating}</div>
                  <div className="company-stat-label">
                    <FaStar color="var(--accent)" />
                  </div>
                </div>
              </div>
              <Link
                to={`/companies/${company.id}`}
                className="btn btn-outline"
                style={{ width: "100%", marginTop: "20px" }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;
