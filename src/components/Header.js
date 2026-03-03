import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    FaBriefcase, 
    FaBuilding, 
    FaBook, 
    FaSignInAlt, 
    FaUserPlus, 
    FaBell, 
    FaUserCircle,
    FaHome,
    FaFileAlt,
    FaEnvelope,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import axios from 'axios';

function Header({ user, onLogout }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications] = useState([
        { id: 1, text: 'New application received', read: false },
        { id: 2, text: 'Your application was shortlisted', read: false },
        { id: 3, text: 'Interview scheduled for tomorrow', read: true }
    ]);

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout');
            onLogout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="header">
            <div className="container">
                {/* Logo - ALWAYS VISIBLE */}
                <Link to="/" className="logo">
                    <div className="logo-icon">🎓</div>
                    <span className="logo-text">Campus<span className="logo-accent">Place</span></span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-menu">
                    <Link to="/" className={isActive('/')}>
                        <FaHome /> Home
                    </Link>
                    <Link to="/jobs" className={isActive('/jobs')}>
                        <FaBriefcase /> Jobs
                    </Link>
                    <Link to="/companies" className={isActive('/companies')}>
                        <FaBuilding /> Companies
                    </Link>
                    <Link to="/resources" className={isActive('/resources')}>
                        <FaBook /> Resources
                    </Link>
                    <Link to="/articles" className={isActive('/articles')}>
                        <FaFileAlt /> Articles
                    </Link>
                    
                    {user ? (
                        <>
                            <Link to={`/${user.role}/dashboard`} className={isActive(`/${user.role}/dashboard`)}>
                                Dashboard
                            </Link>
                            
                            {/* Notifications */}
                            <div className="notification-badge">
                                <FaBell 
                                    size={20} 
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    style={{ cursor: 'pointer' }}
                                />
                                {unreadCount > 0 && (
                                    <span className="notification-count">{unreadCount}</span>
                                )}
                                
                                {showNotifications && (
                                    <div className="notification-dropdown">
                                        <h4 style={{ padding: '15px', borderBottom: '1px solid var(--gray-200)' }}>
                                            Notifications
                                        </h4>
                                        {notifications.map(notif => (
                                            <div 
                                                key={notif.id} 
                                                className={`notification-item ${!notif.read ? 'unread' : ''}`}
                                                onClick={() => setShowNotifications(false)}
                                            >
                                                {notif.text}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* User Menu */}
                            <div className="user-menu">
                                <Link to="/profile" className="user-link">
                                    <FaUserCircle size={30} color="var(--primary)" />
                                    <span className="user-name">{user.name}</span>
                                </Link>
                            </div>

                            {/* Messages Link */}
                            <Link to="/messages" className="nav-icon">
                                <FaEnvelope />
                            </Link>

                            {/* Logout Button */}
                            <button onClick={handleLogout} className="btn btn-outline btn-sm">
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn btn-outline btn-sm">
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to="/register" className="btn btn-primary btn-sm">
                                <FaUserPlus /> Register
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                        <Link to="/companies" onClick={() => setMobileMenuOpen(false)}>Companies</Link>
                        <Link to="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                        <Link to="/articles" onClick={() => setMobileMenuOpen(false)}>Articles</Link>
                        
                        {user ? (
                            <>
                                <Link to={`/${user.role}/dashboard`} onClick={() => setMobileMenuOpen(false)}>
                                    Dashboard
                                </Link>
                                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                    Profile
                                </Link>
                                <Link to="/messages" onClick={() => setMobileMenuOpen(false)}>
                                    Messages
                                </Link>
                                <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;