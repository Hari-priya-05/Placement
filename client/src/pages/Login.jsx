import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Briefcase, Eye, EyeOff, AlertCircle, LogIn, GraduationCap, Building2, UserCog } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Demo credentials
  const demoAccounts = [
    {
      role: 'Student',
      email: 'student@demo.com',
      password: 'demo123',
      icon: GraduationCap,
      color: 'blue',
      description: 'View jobs, apply, track applications'
    },
    {
      role: 'Recruiter',
      email: 'recruiter@demo.com',
      password: 'demo123',
      icon: Building2,
      color: 'green',
      description: 'Post jobs, manage listings, view applicants'
    },
    {
      role: 'TPO',
      email: 'tpo@demo.com',
      password: 'demo123',
      icon: UserCog,
      color: 'purple',
      description: 'Manage students, recruiters, placement drives'
    }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setLoginError('');

    try {
      const user = await login(formData.email, formData.password);
      
      switch (user.role) {
        case 'student':
          navigate('/student/dashboard');
          break;
        case 'recruiter':
          navigate('/recruiter/dashboard');
          break;
        case 'tpo':
          navigate('/tpo/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setLoginError('Invalid email or password. Try demo accounts below!');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
    setErrors({});
    setLoginError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your placement portal
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {loginError && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          )}

          {/* Demo Accounts Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <LogIn className="h-4 w-4 mr-2 text-blue-600" />
              Try Demo Accounts:
            </h3>
            <div className="space-y-2">
              {demoAccounts.map((demo, index) => {
                const Icon = demo.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
                  green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
                  purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200'
                };
                
                return (
                  <button
                    key={index}
                    onClick={() => fillDemoCredentials(demo.email, demo.password)}
                    className={`w-full p-3 rounded-lg border transition-all ${colorClasses[demo.color]}`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{demo.role}</div>
                        <div className="text-xs opacity-75">{demo.description}</div>
                      </div>
                      <div className="ml-auto text-xs font-mono bg-white bg-opacity-50 px-2 py-1 rounded">
                        {demo.password}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-3 py-3 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.email 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                    }
                  `}
                  placeholder="student@demo.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    block w-full pl-10 pr-10 py-3 border rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                    }
                  `}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </div>
              )}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              This is a demo version. No database required! Click any demo account above to login instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;