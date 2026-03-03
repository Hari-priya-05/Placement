import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-title">
              Campus<span>Place</span>
            </h3>
            <p className="footer-description">
              Connecting students with their dream careers since 2024. Trusted
              by 200+ companies and 1000+ students.
            </p>
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/companies">Companies</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              <li>
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div className="footer-section">
            <h4 className="footer-subtitle">For Students</h4>
            <ul className="footer-links">
              <li>
                <Link to="/student/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/resources/resume">Resume Tips</Link>
              </li>
              <li>
                <Link to="/resources/interview">Interview Prep</Link>
              </li>
              <li>
                <Link to="/resources/career">Career Guide</Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div className="footer-section">
            <h4 className="footer-subtitle">For Recruiters</h4>
            <ul className="footer-links">
              <li>
                <Link to="/recruiter/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/post-job">Post a Job</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/contact-sales">Contact Sales</Link>
              </li>
              <li>
                <Link to="/resources/hiring">Hiring Guide</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt />
                <span>Trichy, India</span>
              </li>
              <li>
                <FaPhone />
                <span>+91 97905 34450</span>
              </li>
              <li>
                <FaEnvelope />
                <span>haripriya.e1705@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} CampusPlace. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/help">Help Center</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
