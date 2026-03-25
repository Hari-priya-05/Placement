// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '../services/placementDataService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
    
    // Listen for data updates
    window.addEventListener('placementDataUpdated', () => {
      // Refresh user data if needed
      if (user) {
        const refreshedUser = loginUser(user.email, user.password);
        if (refreshedUser) {
          setUser(refreshedUser);
          localStorage.setItem('current_user', JSON.stringify(refreshedUser));
        }
      }
    });
  }, []);

  const login = async (email, password) => {
    try {
      const loggedInUser = loginUser(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('current_user', JSON.stringify(loggedInUser));
        toast.success(`Welcome back, ${loggedInUser.name}!`);
        return loggedInUser;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = registerUser(userData);
      toast.success('Registration successful! Please login.');
      return newUser;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('current_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isRecruiter: user?.role === 'recruiter',
    isTPO: user?.role === 'tpo',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};