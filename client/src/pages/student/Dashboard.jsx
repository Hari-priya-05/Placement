import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentStats, getStudentApplications, getAllJobsForStudent } from '../../services/placementDataService';
import {
  Briefcase,
  FileText,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  BookOpen,
  Star,
  AlertCircle,
  Building,
  GraduationCap,
  Target,
  Zap,
  Heart,
  Share2,
  Eye,
  ChevronRight,
  Sparkles,
  Rocket,
  Brain,
  Compass,
  User,           // ← ADD THIS
  XCircle,        // ← ADD THIS (for rejected status)
  Video,          // ← ADD THIS (for interview mode)
  MessageCircle,  // ← ADD THIS (optional)
  ThumbsUp,       // ← ADD THIS (optional)
  ThumbsDown      // ← ADD THIS (optional)
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    interviews: 0,
    selected: 0,
    pending: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [placementStats, setPlacementStats] = useState({});

  useEffect(() => {
    loadDashboardData();
    
    // Listen for data updates
    window.addEventListener('placementDataUpdated', loadDashboardData);
    return () => window.removeEventListener('placementDataUpdated', loadDashboardData);
  }, [user]);

  const loadDashboardData = () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      // Get student stats
      const studentStats = getStudentStats(user.id);
      setStats(studentStats);
      
      // Get recent applications
      const studentApps = getStudentApplications(user.id);
      setApplications(studentApps.slice(0, 5));
      
      // Get recent jobs
      const jobs = getAllJobsForStudent();
      setRecentJobs(jobs.slice(0, 5));
      
      // Get upcoming interviews
      const interviews = studentApps.filter(app => app.status === 'Interview' && app.interviewDate);
      setUpcomingInterviews(interviews.slice(0, 3));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Interviews',
      value: stats.interviews,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Selected',
      value: stats.selected,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Applied'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <span className="text-sm font-medium text-blue-100">Welcome back!</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {user?.name || 'Student'} 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Your placement journey is progressing well. Keep up the great work!
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/student/profile">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center shadow-lg">
                <User className="h-5 w-5 mr-2" />
                Complete Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Jobs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Rocket className="h-5 w-5 text-blue-600 mr-2" />
                  Recent Job Postings
                </h2>
                <p className="text-sm text-gray-600 mt-1">Latest opportunities from top companies</p>
              </div>
              <Link to="/student/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-blue-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                        {job.companyLogo || job.company?.charAt(0) || 'C'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.jobType}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.skills?.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Posted {new Date(job.posted).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {job.applicants} applicants
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/student/jobs/${job.id}`}>
                      <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Applications & Interviews */}
        <div className="space-y-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                Recent Applications
              </h2>
              <Link to="/student/applications" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div key={app.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {app.company?.charAt(0) || 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{app.jobTitle}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{app.company}</p>
                      <p className="text-xs text-gray-500 mt-1">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No applications yet</p>
                  <Link to="/student/jobs" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Interviews */}
          {upcomingInterviews.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                Upcoming Interviews
              </h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border-l-4 border-orange-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{interview.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{interview.company}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(interview.interviewDate).toLocaleDateString()} at {interview.interviewTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Video className="h-4 w-4 mr-1" />
                      Mode: {interview.interviewMode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;