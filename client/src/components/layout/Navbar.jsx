import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Briefcase, Home } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student':
        return '/student/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'tpo':
        return '/tpo/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Placement Portal
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="nav-link">
              <Home className="h-5 w-5" />
            </Link>

            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="nav-link">
                  Dashboard
                </Link>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;