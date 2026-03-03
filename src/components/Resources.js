import React from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaVideo,
  FaBook,
  FaChartLine,
  FaLaptop,
  FaUsers,
  FaRegLightbulb,
  FaRegClock,
  FaRegHandshake,
} from "react-icons/fa";

function Resources() {
  const resources = [
    {
      id: 1,
      title: "Resume Building Guide",
      category: "Career",
      icon: <FaFileAlt />,
      description:
        "Learn how to create an impressive resume that stands out to recruiters",
      readTime: "10 min",
      level: "Beginner",
      featured: true,
    },
    {
      id: 2,
      title: "Interview Preparation",
      category: "Interview",
      icon: <FaVideo />,
      description:
        "Master common interview questions and techniques with our comprehensive guide",
      readTime: "15 min",
      level: "Intermediate",
      featured: true,
    },
    {
      id: 3,
      title: "Career Roadmap 2024",
      category: "Career",
      icon: <FaChartLine />,
      description:
        "Navigate your career path with our detailed roadmap for tech professionals",
      readTime: "20 min",
      level: "All Levels",
      featured: true,
    },
    {
      id: 4,
      title: "Soft Skills Training",
      category: "Skills",
      icon: <FaUsers />,
      description: "Develop essential soft skills for professional success",
      readTime: "12 min",
      level: "Beginner",
      featured: false,
    },
    {
      id: 5,
      title: "Technical Interview Guide",
      category: "Interview",
      icon: <FaLaptop />,
      description:
        "Prepare for technical interviews with coding problems and system design",
      readTime: "25 min",
      level: "Advanced",
      featured: false,
    },
    {
      id: 6,
      title: "LinkedIn Optimization",
      category: "Career",
      icon: <FaRegLightbulb />,
      description: "Optimize your LinkedIn profile to attract recruiters",
      readTime: "8 min",
      level: "Beginner",
      featured: false,
    },
    {
      id: 7,
      title: "Time Management",
      category: "Productivity",
      icon: <FaRegClock />,
      description: "Master time management techniques for better productivity",
      readTime: "10 min",
      level: "All Levels",
      featured: false,
    },
    {
      id: 8,
      title: "Networking Strategies",
      category: "Career",
      icon: <FaRegHandshake />,
      description: "Learn effective networking strategies for career growth",
      readTime: "12 min",
      level: "Intermediate",
      featured: false,
    },
  ];

  const categories = ["All", "Career", "Interview", "Skills", "Productivity"];
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      activeCategory === "All" || resource.category === activeCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: "60px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1 className="display-2" style={{ color: "var(--primary)" }}>
            Career Resources
          </h1>
          <p
            style={{
              color: "var(--gray-600)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              margin: "20px auto",
            }}
          >
            Everything you need to succeed in your career journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${activeCategory === category ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveCategory(category)}
              style={{ padding: "10px 25px" }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Resources */}
        {!searchTerm && activeCategory === "All" && (
          <div style={{ marginBottom: "60px" }}>
            <h2 style={{ marginBottom: "30px" }}>Featured Resources</h2>
            <div className="feature-grid">
              {resources
                .filter((r) => r.featured)
                .map((resource, index) => (
                  <div
                    key={resource.id}
                    className="feature-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className="feature-icon"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                      }}
                    >
                      {resource.icon}
                    </div>
                    <h3>{resource.title}</h3>
                    <p
                      style={{ color: "var(--gray-600)", marginBottom: "15px" }}
                    >
                      {resource.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "15px",
                        justifyContent: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <span
                        style={{
                          background: "var(--gray-100)",
                          padding: "4px 12px",
                          borderRadius: "50px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {resource.readTime}
                      </span>
                      <span
                        style={{
                          background: "var(--gray-100)",
                          padding: "4px 12px",
                          borderRadius: "50px",
                          fontSize: "0.85rem",
                        }}
                      >
                        {resource.level}
                      </span>
                    </div>
                    <Link
                      to={`/resources/${resource.id}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <h2 style={{ marginBottom: "30px" }}>
          {searchTerm
            ? `Search Results (${filteredResources.length})`
            : "All Resources"}
        </h2>
        <div className="feature-grid">
          {filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">{resource.icon}</div>
              <h3>{resource.title}</h3>
              <p
                style={{
                  color: "var(--gray-500)",
                  fontSize: "0.9rem",
                  marginBottom: "5px",
                }}
              >
                {resource.category}
              </p>
              <p style={{ color: "var(--gray-600)", marginBottom: "15px" }}>
                {resource.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    background: "var(--gray-100)",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                  }}
                >
                  {resource.readTime}
                </span>
                <span
                  style={{
                    background: "var(--gray-100)",
                    padding: "4px 12px",
                    borderRadius: "50px",
                    fontSize: "0.85rem",
                  }}
                >
                  {resource.level}
                </span>
              </div>
              <Link
                to={`/resources/${resource.id}`}
                className="btn btn-outline"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div
          className="glass-card"
          style={{ marginTop: "80px", textAlign: "center" }}
        >
          <h2 style={{ marginBottom: "20px" }}>Stay Updated</h2>
          <p
            style={{
              color: "var(--gray-600)",
              marginBottom: "30px",
              maxWidth: "500px",
              margin: "0 auto 30px",
            }}
          >
            Get the latest career resources and tips delivered to your inbox
          </p>
          <form
            style={{
              display: "flex",
              gap: "15px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Resources;
