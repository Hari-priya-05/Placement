import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  PlusCircle,
  FileText,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  AlertCircle
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    interviewed: 0,
    selected: 0,
    pending: 0,
    profileViews: 124,
    companyRating: 4.5
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRecentJobs([
        {
          id: 1,
          title: 'Senior Frontend Developer',
          applications: 24,
          shortlisted: 8,
          status: 'Active',
          deadline: '2024-12-31',
          posted: '2024-01-15'
        },
        {
          id: 2,
          title: 'Backend Engineer',
          applications: 18,
          shortlisted: 6,
          status: 'Active',
          deadline: '2024-12-31',
          posted: '2024-01-16'
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          applications: 32,
          shortlisted: 12,
          status: 'Active',
          deadline: '2024-11-30',
          posted: '2024-01-17'
        }
      ]);

      setRecentApplications([
        {
          id: 101,
          name: 'Rahul Sharma',
          job: 'Senior Frontend Developer',
          experience: '4 years',
          skills: ['React', 'TypeScript', 'Node.js'],
          status: 'Shortlisted',
          appliedDate: '2024-01-20'
        },
        {
          id: 102,
          name: 'Priya Patel',
          job: 'Backend Engineer',
          experience: '5 years',
          skills: ['Python', 'Django', 'PostgreSQL'],
          status: 'Interview',
          appliedDate: '2024-01-19'
        },
        {
          id: 103,
          name: 'Amit Kumar',
          job: 'Full Stack Developer',
          experience: '3 years',
          skills: ['React', 'Node.js', 'MongoDB'],
          status: 'Applied',
          appliedDate: '2024-01-21'
        }
      ]);

      setUpcomingDeadlines([
        {
          job: 'Senior Frontend Developer',
          daysLeft: 5,
          applicants: 24
        },
        {
          job: 'Full Stack Developer',
          daysLeft: 2,
          applicants: 32
        }
      ]);

      setStats({
        activeJobs: 5,
        totalApplications: 86,
        shortlisted: 26,
        interviewed: 12,
        selected: 4,
        pending: 44,
        profileViews: 124,
        companyRating: 4.5
      });

      setLoading(false);
    }, 1000);
  }, []);

  const statsCards = [
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Interviews',
      value: stats.interviewed,
      icon: Users,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Selected',
      value: stats.selected,
      icon: Star,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Profile Views',
      value: stats.profileViews,
      icon: Eye,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Users },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Star },
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your job postings today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/recruiter/post-job">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Post New Job
              </button>
            </Link>
          </div>
        </div>

        {/* Company Rating */}
        <div className="mt-6 flex items-center space-x-4">
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Star className="h-5 w-5 text-yellow-300 mr-2" />
            <span className="font-semibold">{stats.companyRating}</span>
            <span className="text-blue-100 ml-1">/5.0</span>
          </div>
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Eye className="h-5 w-5 text-blue-200 mr-2" />
            <span className="font-semibold">{stats.profileViews}</span>
            <span className="text-blue-100 ml-1">profile views</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          {/* Recent Job Postings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Active Job Postings</h2>
                <p className="text-sm text-gray-600 mt-1">Manage your current job listings</p>
              </div>
              <Link to="/recruiter/manage-jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {job.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          {job.applications} Applications
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-1 text-gray-400" />
                          {job.shortlisted} Shortlisted
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-4 flex space-x-2">
                      <Link to={`/recruiter/job/${job.id}`}>
                        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                          View Details
                        </button>
                      </Link>
                      <Link to={`/recruiter/job/${job.id}/edit`}>
                        <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-600">{app.job}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-gray-500">{app.experience}</span>
                        <div className="flex space-x-1">
                          {app.skills.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          {app.skills.length > 2 && (
                            <span className="text-xs text-gray-500">+{app.skills.length - 2}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(app.status)}
                    <p className="text-xs text-gray-500 mt-2">Applied {app.appliedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Insights */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/recruiter/post-job">
                <button className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-all text-left flex items-center">
                  <PlusCircle className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Post New Job</p>
                    <p className="text-sm text-gray-600">Create a new job listing</p>
                  </div>
                </button>
              </Link>

              <Link to="/recruiter/manage-jobs">
                <button className="w-full p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-left flex items-center">
                  <Briefcase className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Jobs</p>
                    <p className="text-sm text-gray-600">Edit or close listings</p>
                  </div>
                </button>
              </Link>

              <Link to="/recruiter/company-profile">
                <button className="w-full p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-left flex items-center">
                  <FileText className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Company Profile</p>
                    <p className="text-sm text-gray-600">Update company info</p>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          {upcomingDeadlines.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                Upcoming Deadlines
              </h2>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="border-l-4 border-orange-400 pl-4 py-2">
                    <p className="font-medium text-gray-900">{deadline.job}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">{deadline.applicants} applicants</span>
                      <span className={`text-sm font-medium ${deadline.daysLeft <= 2 ? 'text-red-600' : 'text-orange-600'}`}>
                        {deadline.daysLeft} days left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Pro Tips
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Detailed job descriptions get 40% more applications
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Respond to applicants within 48 hours for better engagement
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Use skills-based screening to find the best candidates
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Schedule interviews promptly to secure top talent
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;