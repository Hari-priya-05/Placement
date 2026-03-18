import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
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
  Compass
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    interviews: 0,
    selected: 0,
    pending: 0,
    rejected: 0,
    profileViews: 0,
    resumeDownloads: 0
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [placementStats, setPlacementStats] = useState({});

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      // Recent job postings
      setRecentJobs([
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'Google',
          logo: 'G',
          color: 'from-blue-500 to-blue-600',
          location: 'Bangalore',
          salary: '₹45-60 LPA',
          type: 'Full-time',
          skills: ['React', 'TypeScript', 'Next.js'],
          posted: '2 days ago',
          deadline: 'Mar 25, 2024',
          applicants: 124,
          match: 92
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'Microsoft',
          logo: 'M',
          color: 'from-purple-500 to-purple-600',
          location: 'Hyderabad',
          salary: '₹40-55 LPA',
          type: 'Full-time',
          skills: ['Node.js', 'Python', 'AWS'],
          posted: '1 day ago',
          deadline: 'Mar 28, 2024',
          applicants: 89,
          match: 88
        },
        {
          id: 3,
          title: 'Data Scientist',
          company: 'Amazon',
          logo: 'A',
          color: 'from-orange-500 to-orange-600',
          location: 'Chennai',
          salary: '₹35-50 LPA',
          type: 'Full-time',
          skills: ['Python', 'ML', 'SQL'],
          posted: '3 days ago',
          deadline: 'Mar 30, 2024',
          applicants: 156,
          match: 85
        },
        {
          id: 4,
          title: 'Full Stack Developer',
          company: 'Flipkart',
          logo: 'F',
          color: 'from-yellow-500 to-yellow-600',
          location: 'Bangalore',
          salary: '₹30-45 LPA',
          type: 'Full-time',
          skills: ['React', 'Node.js', 'MongoDB'],
          posted: '12 hours ago',
          deadline: 'Apr 2, 2024',
          applicants: 67,
          match: 90
        },
        {
          id: 5,
          title: 'DevOps Engineer',
          company: 'Uber',
          logo: 'U',
          color: 'from-gray-800 to-black',
          location: 'Bangalore',
          salary: '₹35-50 LPA',
          type: 'Full-time',
          skills: ['AWS', 'Docker', 'Kubernetes'],
          posted: '5 hours ago',
          deadline: 'Apr 5, 2024',
          applicants: 45,
          match: 82
        }
      ]);

      // Applications data
      setApplications([
        {
          id: 101,
          jobTitle: 'Senior Frontend Developer',
          company: 'Google',
          status: 'Shortlisted',
          appliedDate: '2024-03-10',
          nextRound: 'Technical Interview',
          nextDate: 'Mar 22, 2024',
          logo: 'G',
          color: 'from-blue-500 to-blue-600'
        },
        {
          id: 102,
          jobTitle: 'Backend Engineer',
          company: 'Microsoft',
          status: 'Interview',
          appliedDate: '2024-03-12',
          nextRound: 'System Design',
          nextDate: 'Mar 25, 2024',
          logo: 'M',
          color: 'from-purple-500 to-purple-600'
        },
        {
          id: 103,
          jobTitle: 'Data Scientist',
          company: 'Amazon',
          status: 'Applied',
          appliedDate: '2024-03-15',
          nextRound: 'Online Assessment',
          nextDate: 'Mar 28, 2024',
          logo: 'A',
          color: 'from-orange-500 to-orange-600'
        },
        {
          id: 104,
          jobTitle: 'Full Stack Developer',
          company: 'Flipkart',
          status: 'Selected',
          appliedDate: '2024-03-05',
          nextRound: 'HR Discussion',
          nextDate: 'Mar 20, 2024',
          logo: 'F',
          color: 'from-yellow-500 to-yellow-600'
        }
      ]);

      // Upcoming drives
      setUpcomingDrives([
        {
          company: 'Google',
          date: 'Mar 25, 2024',
          roles: ['SDE', 'Data Scientist'],
          package: '₹45-60 LPA',
          location: 'Bangalore',
          deadline: 'Mar 20, 2024',
          eligible: '7.5+ CGPA',
          logo: 'G',
          color: 'from-blue-500 to-blue-600'
        },
        {
          company: 'Microsoft',
          date: 'Apr 5, 2024',
          roles: ['SDE', 'Cloud Engineer'],
          package: '₹40-55 LPA',
          location: 'Hyderabad',
          deadline: 'Mar 30, 2024',
          eligible: '7.0+ CGPA',
          logo: 'M',
          color: 'from-purple-500 to-purple-600'
        },
        {
          company: 'Amazon',
          date: 'Mar 28, 2024',
          roles: ['SDE', 'Data Scientist'],
          package: '₹35-50 LPA',
          location: 'Chennai',
          deadline: 'Mar 22, 2024',
          eligible: '7.0+ CGPA',
          logo: 'A',
          color: 'from-orange-500 to-orange-600'
        }
      ]);

      // Recommended jobs based on profile
      setRecommendedJobs([
        {
          title: 'Frontend Developer',
          company: 'Microsoft',
          match: 95,
          skills: ['React', 'TypeScript']
        },
        {
          title: 'UI Engineer',
          company: 'Google',
          match: 92,
          skills: ['JavaScript', 'CSS']
        },
        {
          title: 'Full Stack Developer',
          company: 'Amazon',
          match: 88,
          skills: ['Node.js', 'React']
        }
      ]);

      // Notifications
      setNotifications([
        {
          id: 1,
          title: 'Application Shortlisted',
          message: 'Your application for Google has been shortlisted',
          time: '2 hours ago',
          type: 'success',
          read: false
        },
        {
          id: 2,
          title: 'Upcoming Interview',
          message: 'Microsoft interview scheduled for Mar 25',
          time: '5 hours ago',
          type: 'info',
          read: false
        },
        {
          id: 3,
          title: 'New Drive Added',
          message: 'Amazon recruitment drive announced',
          time: '1 day ago',
          type: 'info',
          read: true
        }
      ]);

      // Activities
      setActivities([
        {
          action: 'Applied for Google - Frontend Developer',
          time: '2 hours ago',
          icon: Briefcase
        },
        {
          action: 'Profile viewed by Microsoft recruiter',
          time: '5 hours ago',
          icon: Eye
        },
        {
          action: 'Resume downloaded by Amazon',
          time: '1 day ago',
          icon: FileText
        },
        {
          action: 'Shortlisted for Flipkart',
          time: '2 days ago',
          icon: CheckCircle
        }
      ]);

      // Placement stats
      setPlacementStats({
        totalCompanies: 45,
        totalOffers: 128,
        averagePackage: '12.5 LPA',
        highestPackage: '62 LPA',
        placedStudents: 385,
        totalStudents: 450
      });

      // User stats
      setStats({
        totalApplications: 12,
        shortlisted: 4,
        interviews: 2,
        selected: 1,
        pending: 7,
        rejected: 2,
        profileViews: 156,
        resumeDownloads: 23
      });

      setLoading(false);
    }, 1500);
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle }
    };
    const StatusIcon = config[status]?.icon || Clock;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const statsCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+3 this week'
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '33% conversion'
    },
    {
      title: 'Interviews',
      value: stats.interviews,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '2 upcoming'
    },
    {
      title: 'Selected',
      value: stats.selected,
      icon: Award,
      color: 'from-yellow-500 to-yellow-600',
      bgLight: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      trend: 'Congratulations!'
    },
    {
      title: 'Profile Views',
      value: stats.profileViews,
      icon: Eye,
      color: 'from-indigo-500 to-indigo-600',
      bgLight: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      trend: '+12 this week'
    },
    {
      title: 'Resume Downloads',
      value: stats.resumeDownloads,
      icon: FileText,
      color: 'from-pink-500 to-pink-600',
      bgLight: 'bg-pink-50',
      textColor: 'text-pink-600',
      trend: 'by 8 recruiters'
    }
  ];

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
      {/* Welcome Section with Profile Strength */}
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
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/student/profile">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center shadow-lg">
                <User className="h-5 w-5 mr-2" />
                Complete Profile
              </button>
            </Link>
          </div>
        </div>

        {/* Profile Strength Bar */}
        <div className="mt-6 max-w-2xl">
          <div className="flex justify-between text-sm mb-2">
            <span>Profile Strength</span>
            <span className="font-semibold">85%</span>
          </div>
          <div className="h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-white rounded-full relative">
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-yellow-400 animate-pulse"></div>
            </div>
          </div>
          <p className="text-xs text-blue-100 mt-2 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Add your projects to reach 100%
          </p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Applications</p>
            <p className="text-2xl font-bold">{stats.totalApplications}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Interviews</p>
            <p className="text-2xl font-bold">{stats.interviews}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Offers</p>
            <p className="text-2xl font-bold">{stats.selected}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Profile Views</p>
            <p className="text-2xl font-bold">{stats.profileViews}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.bgLight} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.textColor}`} />
                </div>
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Jobs & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Jobs Section */}
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
                      <div className={`w-12 h-12 bg-gradient-to-br ${job.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            {job.match}% Match
                          </span>
                        </div>
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
                            {job.type}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Posted {job.posted}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {job.applicants} applicants
                          </span>
                          <span className="flex items-center text-red-600">
                            <Calendar className="h-3 w-3 mr-1" />
                            Deadline: {job.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Stats Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Placement Statistics 2024
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-75">Companies Visited</p>
                <p className="text-2xl font-bold">{placementStats.totalCompanies}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Total Offers</p>
                <p className="text-2xl font-bold">{placementStats.totalOffers}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Average CTC</p>
                <p className="text-2xl font-bold">{placementStats.averagePackage}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Highest CTC</p>
                <p className="text-2xl font-bold">{placementStats.highestPackage}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white border-opacity-30">
              <div className="flex justify-between items-center">
                <span className="text-sm">Placement Progress</span>
                <span className="text-sm font-bold">{placementStats.placedStudents}/{placementStats.totalStudents} Students Placed</span>
              </div>
              <div className="mt-2 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full" 
                  style={{ width: `${(placementStats.placedStudents / placementStats.totalStudents) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Applications & Updates */}
        <div className="space-y-8">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 text-blue-600 mr-2" />
              Notifications
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.filter(n => !n.read).length} new
                </span>
              )}
            </h2>
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      notif.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {notif.type === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              {applications.map((app) => (
                <div key={app.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 bg-gradient-to-br ${app.color} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {app.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 truncate">{app.jobTitle}</h3>
                      {getStatusBadge(app.status)}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{app.company}</p>
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-gray-500">Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                      {app.nextRound && (
                        <span className="text-purple-600 font-medium">{app.nextRound}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Drives */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-orange-600 mr-2" />
              Upcoming Drives
            </h2>
            <div className="space-y-4">
              {upcomingDrives.map((drive, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{drive.company}</h3>
                    <span className={`px-2 py-1 bg-gradient-to-br ${drive.color} text-white text-xs rounded-full`}>
                      {drive.package}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{drive.roles.join(' • ')}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {drive.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {drive.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-orange-600">Deadline: {drive.deadline}</span>
                    <span className="text-green-600">Eligible: {drive.eligible}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for You */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="h-5 w-5 text-blue-600 mr-2" />
              AI Recommendations
            </h2>
            <div className="space-y-3">
              {recommendedJobs.map((job, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {job.match}% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center justify-center">
              View More Recommendations
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;