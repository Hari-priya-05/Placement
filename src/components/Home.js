import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaNewspaper,
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
  FaArrowRight,
  FaUserGraduate,
  FaChartLine,
  FaRss,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Home({ user }) {
  const navigate = useNavigate();
  const [flashNews, setFlashNews] = useState([]);
  const [recruitmentUpdates, setRecruitmentUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setFlashNews([
        {
          id: 1,
          text: "Google hiring for Software Engineer 2024 batch",
          time: "2 hours ago",
          important: true,
        },
        {
          id: 2,
          text: "Microsoft internship applications closing soon",
          time: "5 hours ago",
          important: false,
        },
        {
          id: 3,
          text: "Amazon Great Indian Hiring Drive starts Monday",
          time: "1 day ago",
          important: true,
        },
        {
          id: 4,
          text: "New placement drive for 2025 batch announced",
          time: "2 days ago",
          important: false,
        },
        {
          id: 5,
          text: "TCS NQT registration deadline extended",
          time: "3 days ago",
          important: false,
        },
      ]);

      setRecruitmentUpdates([
        {
          id: 1,
          company: "Google",
          position: "Software Engineer",
          batch: "2024",
          lastDate: "2024-04-15",
          logo: "G",
          type: "Full Time",
          salary: "₹25,00,000",
          location: "Bangalore",
        },
        {
          id: 2,
          company: "Microsoft",
          position: "Frontend Developer",
          batch: "2024",
          lastDate: "2024-04-20",
          logo: "M",
          type: "Internship",
          salary: "₹50,000/month",
          location: "Hyderabad",
        },
        {
          id: 3,
          company: "Amazon",
          position: "Data Scientist",
          batch: "2024/2025",
          lastDate: "2024-04-18",
          logo: "A",
          type: "Full Time",
          salary: "₹28,00,000",
          location: "Bangalore",
        },
        {
          id: 4,
          company: "Flipkart",
          position: "UI/UX Designer",
          batch: "2024",
          lastDate: "2024-04-25",
          logo: "F",
          type: "Internship",
          salary: "₹45,000/month",
          location: "Remote",
        },
        {
          id: 5,
          company: "Adobe",
          position: "Backend Developer",
          batch: "2024",
          lastDate: "2024-04-22",
          logo: "A",
          type: "Full Time",
          salary: "₹22,00,000",
          location: "Noida",
        },
        {
          id: 6,
          company: "TCS",
          position: "System Engineer",
          batch: "2024",
          lastDate: "2024-04-30",
          logo: "T",
          type: "Full Time",
          salary: "₹7,00,000",
          location: "Pan India",
        },
        {
          id: 7,
          company: "Infosys",
          position: "Digital Specialist",
          batch: "2024",
          lastDate: "2024-04-28",
          logo: "I",
          type: "Full Time",
          salary: "₹8,50,000",
          location: "Mysore",
        },
        {
          id: 8,
          company: "Wipro",
          position: "Project Engineer",
          batch: "2024",
          lastDate: "2024-04-25",
          logo: "W",
          type: "Full Time",
          salary: "₹6,50,000",
          location: "Bangalore",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApply = (jobId) => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { from: `/jobs/${jobId}` } });
    } else {
      // Navigate to job details page
      navigate(`/jobs/${jobId}`);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Welcome Message */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-card glass-card">
            <div className="welcome-content">
              <h1 className="fade-in">
                {user ? (
                  <>
                    Welcome back, <span className="highlight">{user.name}</span>
                    ! 👋
                  </>
                ) : (
                  <>
                    Welcome to <span className="highlight">CampusPlace</span>
                  </>
                )}
              </h1>
              <p className="fade-in" style={{ animationDelay: "0.2s" }}>
                {user ? (
                  <>
                    Ready to find your dream job? Check out the latest
                    opportunities below.
                  </>
                ) : (
                  <>
                    Your gateway to campus placements and internships. Join
                    thousands of students who found their dream jobs.
                  </>
                )}
              </p>
              {!user && (
                <div
                  className="welcome-buttons fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link to="/register" className="btn btn-primary">
                    Get Started <FaArrowRight />
                  </Link>
                  <Link to="/login" className="btn btn-outline">
                    Sign In
                  </Link>
                </div>
              )}
              {user && (
                <div
                  className="welcome-buttons fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="btn btn-primary"
                  >
                    Go to Dashboard <FaArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Flash News Ticker */}
      <section className="flash-news-section">
        <div className="container">
          <div className="flash-news-container">
            <div className="flash-news-header">
              <FaBell className="flash-icon" />
              <h3>Flash News</h3>
            </div>
            <div className="flash-news-ticker">
              {flashNews.map((news, index) => (
                <div
                  key={news.id}
                  className={`flash-news-item ${news.important ? "important" : ""}`}
                >
                  <span className="news-bulletin">📢</span>
                  <span className="news-text">{news.text}</span>
                  <span className="news-time">{news.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Recruitment Updates */}
      <section className="recruitment-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <FaNewspaper className="section-icon" /> Latest Recruitment
              Updates
            </h2>
            <Link to="/jobs" className="view-all-link">
              View All Jobs <FaArrowRight />
            </Link>
          </div>

          <div className="recruitment-grid">
            {recruitmentUpdates.map((update, index) => (
              <div
                key={update.id}
                className="recruitment-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="recruitment-header">
                  <div className="company-logo">{update.logo}</div>
                  <div className="company-info">
                    <h3>{update.company}</h3>
                    <p className="position">{update.position}</p>
                  </div>
                </div>

                <div className="recruitment-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <FaBriefcase className="detail-icon" />
                      <span>{update.type}</span>
                    </div>
                    <div className="detail-item">
                      <FaUserGraduate className="detail-icon" />
                      <span>Batch: {update.batch}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span>{update.location}</span>
                    </div>
                    <div className="detail-item">
                      <FaChartLine className="detail-icon" />
                      <span>{update.salary}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <span>
                        Last Date:{" "}
                        {new Date(update.lastDate).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="recruitment-footer">
                  <button
                    onClick={() => handleApply(update.id)}
                    className="btn btn-primary btn-block"
                  >
                    {user ? "Apply Now" : "Login to Apply"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Active Jobs</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students Placed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Companies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Updates */}
      <section className="campus-updates">
        <div className="container">
          <div className="section-header">
            <h2>
              <FaRss className="section-icon" /> Campus Updates
            </h2>
          </div>
          <div className="updates-grid">
            <div className="update-card">
              <h4>Placement Drive - Infosys</h4>
              <p>
                Infosys is conducting a placement drive on March 25th for 2024
                batch. Register before March 20th.
              </p>
              <span className="update-date">2 days ago</span>
            </div>
            <div className="update-card">
              <h4>Internship Fair 2024</h4>
              <p>
                Annual internship fair on April 5th. 50+ companies
                participating. Don't miss out!
              </p>
              <span className="update-date">3 days ago</span>
            </div>
            <div className="update-card">
              <h4>Resume Building Workshop</h4>
              <p>
                Free workshop on resume building by industry experts. Register
                now!
              </p>
              <span className="update-date">5 days ago</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
