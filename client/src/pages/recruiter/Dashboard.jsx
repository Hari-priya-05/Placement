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
  AlertCircle,
  UserCheck,
  UserX,
  MessageCircle,
  Send,
  Loader,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Award,
  Filter,
  Edit
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    interviewed: 0,
    selected: 0,
    rejected: 0,
    pending: 0,
    profileViews: 124,
    companyRating: 4.5,
    responseRate: 0,
    avgResponseTime: '0 days'
  });

  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [applicantStats, setApplicantStats] = useState({
    newToday: 0,
    pendingReview: 0,
    shortlisted: 0,
    interviews: 0,
    offers: 0,
    hired: 0
  });
  const [statusDistribution, setStatusDistribution] = useState({
    applied: 0,
    reviewed: 0,
    shortlisted: 0,
    interview: 0,
    offered: 0,
    hired: 0,
    rejected: 0
  });
  const [recentStatusUpdates, setRecentStatusUpdates] = useState([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
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
          interviewed: 5,
          selected: 2,
          status: 'Active',
          deadline: '2024-12-31',
          posted: '2024-01-15'
        },
        {
          id: 2,
          title: 'Backend Engineer',
          applications: 18,
          shortlisted: 6,
          interviewed: 3,
          selected: 1,
          status: 'Active',
          deadline: '2024-12-31',
          posted: '2024-01-16'
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          applications: 32,
          shortlisted: 12,
          interviewed: 5,
          selected: 0,
          status: 'Active',
          deadline: '2024-11-30',
          posted: '2024-01-17'
        }
      ]);

      setRecentApplications([
        {
          id: 101,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@college.edu',
          job: 'Senior Frontend Developer',
          experience: '4 years',
          skills: ['React', 'TypeScript', 'Node.js'],
          status: 'Shortlisted',
          appliedDate: '2024-01-20',
          matchScore: 92,
          statusHistory: [
            { status: 'applied', date: '2024-01-20' },
            { status: 'reviewed', date: '2024-01-21' },
            { status: 'shortlisted', date: '2024-01-22' }
          ]
        },
        {
          id: 102,
          name: 'Priya Patel',
          email: 'priya.patel@college.edu',
          job: 'Backend Engineer',
          experience: '5 years',
          skills: ['Python', 'Django', 'PostgreSQL'],
          status: 'Interview',
          appliedDate: '2024-01-19',
          matchScore: 88,
          statusHistory: [
            { status: 'applied', date: '2024-01-19' },
            { status: 'shortlisted', date: '2024-01-20' },
            { status: 'interview', date: '2024-01-21' }
          ],
          interviewSchedule: {
            date: '2024-03-26',
            time: '2:00 PM',
            mode: 'Virtual'
          }
        },
        {
          id: 103,
          name: 'Amit Kumar',
          email: 'amit.kumar@college.edu',
          job: 'Full Stack Developer',
          experience: '3 years',
          skills: ['React', 'Node.js', 'MongoDB'],
          status: 'Applied',
          appliedDate: '2024-01-21',
          matchScore: 78,
          statusHistory: [
            { status: 'applied', date: '2024-01-21' }
          ]
        },
        {
          id: 104,
          name: 'Neha Singh',
          email: 'neha.singh@college.edu',
          job: 'Frontend Developer',
          experience: '3 years',
          skills: ['React', 'Vue.js', 'CSS'],
          status: 'Offered',
          appliedDate: '2024-01-18',
          matchScore: 92,
          statusHistory: [
            { status: 'applied', date: '2024-01-18' },
            { status: 'shortlisted', date: '2024-01-19' },
            { status: 'interview', date: '2024-01-20' },
            { status: 'offered', date: '2024-01-22' }
          ]
        },
        {
          id: 105,
          name: 'Vikram Reddy',
          email: 'vikram.reddy@college.edu',
          job: 'DevOps Engineer',
          experience: '5 years',
          skills: ['AWS', 'Docker', 'Kubernetes'],
          status: 'Rejected',
          appliedDate: '2024-01-17',
          matchScore: 65,
          statusHistory: [
            { status: 'applied', date: '2024-01-17' },
            { status: 'reviewed', date: '2024-01-18' },
            { status: 'rejected', date: '2024-01-19' }
          ]
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
        rejected: 8,
        pending: 44,
        profileViews: 124,
        companyRating: 4.5,
        responseRate: 68,
        avgResponseTime: '2.3 days'
      });

      setApplicantStats({
        newToday: 5,
        pendingReview: 8,
        shortlisted: 26,
        interviews: 12,
        offers: 4,
        hired: 2
      });

      setStatusDistribution({
        applied: 44,
        reviewed: 12,
        shortlisted: 26,
        interview: 12,
        offered: 4,
        hired: 2,
        rejected: 8
      });

      setRecentStatusUpdates([
        {
          id: 1,
          applicant: 'Neha Singh',
          position: 'Frontend Developer',
          oldStatus: 'Interview',
          newStatus: 'Offered',
          date: '2024-01-22',
          time: '10:30 AM'
        },
        {
          id: 2,
          applicant: 'Rahul Sharma',
          position: 'Senior Frontend Developer',
          oldStatus: 'Reviewed',
          newStatus: 'Shortlisted',
          date: '2024-01-22',
          time: '09:15 AM'
        },
        {
          id: 3,
          applicant: 'Priya Patel',
          position: 'Backend Engineer',
          oldStatus: 'Shortlisted',
          newStatus: 'Interview',
          date: '2024-01-21',
          time: '03:45 PM'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (applicant) => {
    setSelectedApplicant(applicant);
    setNewStatus(applicant.status.toLowerCase());
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = () => {
    if (!selectedApplicant || !newStatus) return;
    
    setUpdatingStatus(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedApplicants = recentApplications.map(app => {
        if (app.id === selectedApplicant.id) {
          const updatedHistory = [...app.statusHistory, {
            status: newStatus,
            date: new Date().toISOString().split('T')[0]
          }];
          return {
            ...app,
            status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
            statusHistory: updatedHistory
          };
        }
        return app;
      });
      
      setRecentApplications(updatedApplicants);
      
      // Update stats
      const newStats = { ...stats };
      if (newStatus === 'shortlisted') newStats.shortlisted++;
      if (newStatus === 'interview') newStats.interviewed++;
      if (newStatus === 'offered') newStats.selected++;
      if (newStatus === 'hired') newStats.selected++;
      if (newStatus === 'rejected') newStats.rejected++;
      
      setStats(newStats);
      
      // Update applicant stats
      if (newStatus === 'shortlisted') {
        setApplicantStats(prev => ({ ...prev, shortlisted: prev.shortlisted + 1, pendingReview: prev.pendingReview - 1 }));
      }
      if (newStatus === 'interview') {
        setApplicantStats(prev => ({ ...prev, interviews: prev.interviews + 1, shortlisted: prev.shortlisted - 1 }));
      }
      if (newStatus === 'offered') {
        setApplicantStats(prev => ({ ...prev, offers: prev.offers + 1, interviews: prev.interviews - 1 }));
      }
      if (newStatus === 'hired') {
        setApplicantStats(prev => ({ ...prev, hired: prev.hired + 1, offers: prev.offers - 1 }));
      }
      
      // Add to recent updates
      const newUpdate = {
        id: Date.now(),
        applicant: selectedApplicant.name,
        position: selectedApplicant.job,
        oldStatus: selectedApplicant.status,
        newStatus: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setRecentStatusUpdates([newUpdate, ...recentStatusUpdates]);
      
      setUpdatingStatus(false);
      setShowStatusModal(false);
    }, 1000);
  };

  const statsCards = [
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+2 this month'
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+12 this week'
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '32% conversion'
    },
    {
      title: 'Interviews',
      value: stats.interviewed,
      icon: Calendar,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      trend: '8 upcoming'
    },
    {
      title: 'Selected',
      value: stats.selected,
      icon: Star,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      trend: '+2 this month'
    },
    {
      title: 'Response Rate',
      value: `${stats.responseRate}%`,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      trend: `${stats.avgResponseTime} avg`
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Applied' },
      'Reviewed': { bg: 'bg-cyan-100', text: 'text-cyan-800', icon: Eye, label: 'Reviewed' },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Shortlisted' },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar, label: 'Interview' },
      'Offered': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award, label: 'Offered' },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Star, label: 'Selected' },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig['Applied'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
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
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/recruiter/post-job">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Post New Job
              </button>
            </Link>
            <Link to="/recruiter/manage-applicants">
              <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all flex items-center">
                <Users className="h-5 w-5 mr-2" />
                View All Applicants
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
          <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <TrendingUp className="h-5 w-5 text-green-300 mr-2" />
            <span className="font-semibold">{stats.responseRate}%</span>
            <span className="text-blue-100 ml-1">response rate</span>
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
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Applicant Pipeline Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 text-blue-600 mr-2" />
              Applicant Pipeline
            </h2>
            <p className="text-sm text-gray-600 mt-1">Real-time status tracking of all candidates</p>
          </div>
          <Link to="/recruiter/manage-applicants">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              Manage All
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </Link>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-blue-600">New Today</p>
            <p className="text-xl font-bold text-blue-700">{applicantStats.newToday}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-xs text-yellow-600">Pending Review</p>
            <p className="text-xl font-bold text-yellow-700">{applicantStats.pendingReview}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs text-green-600">Shortlisted</p>
            <p className="text-xl font-bold text-green-700">{applicantStats.shortlisted}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <p className="text-xs text-purple-600">Interviews</p>
            <p className="text-xl font-bold text-purple-700">{applicantStats.interviews}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <p className="text-xs text-yellow-600">Offers</p>
            <p className="text-xl font-bold text-yellow-700">{applicantStats.offers}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <p className="text-xs text-emerald-600">Hired</p>
            <p className="text-xl font-bold text-emerald-700">{applicantStats.hired}</p>
          </div>
        </div>

        {/* Status Distribution Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>Applied</span>
            <span>Reviewed</span>
            <span>Shortlisted</span>
            <span>Interview</span>
            <span>Offered</span>
            <span>Hired</span>
            <span>Rejected</span>
          </div>
          <div className="h-3 flex rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(statusDistribution.applied / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-cyan-500 h-full" style={{ width: `${(statusDistribution.reviewed / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-green-500 h-full" style={{ width: `${(statusDistribution.shortlisted / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-purple-500 h-full" style={{ width: `${(statusDistribution.interview / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-yellow-500 h-full" style={{ width: `${(statusDistribution.offered / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-emerald-500 h-full" style={{ width: `${(statusDistribution.hired / stats.totalApplications) * 100}%` }}></div>
            <div className="bg-red-500 h-full" style={{ width: `${(statusDistribution.rejected / stats.totalApplications) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Jobs & Applications */}
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

          {/* Recent Applications with Status Update */}
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
                        <span className={`text-xs font-medium ${getScoreColor(app.matchScore)} ${getScoreBg(app.matchScore)} px-2 py-0.5 rounded-full`}>
                          {app.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      {getStatusBadge(app.status)}
                    </div>
                    <button
                      onClick={() => handleStatusUpdate(app)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Update Status
                    </button>
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

              <Link to="/recruiter/manage-applicants">
                <button className="w-full p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-left flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">View All Applicants</p>
                    <p className="text-sm text-gray-600">Manage and update status</p>
                  </div>
                </button>
              </Link>

              <Link to="/recruiter/company-profile">
                <button className="w-full p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all text-left flex items-center">
                  <FileText className="h-6 w-6 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Company Profile</p>
                    <p className="text-sm text-gray-600">Update company info</p>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Recent Status Updates */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <RefreshCw className="h-5 w-5 text-blue-600 mr-2" />
              Recent Status Updates
            </h2>
            <div className="space-y-3">
              {recentStatusUpdates.map((update) => (
                <div key={update.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{update.applicant}</p>
                    <p className="text-xs text-gray-600">{update.position}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Status changed from <span className="font-medium">{update.oldStatus}</span> to <span className="font-medium text-green-600">{update.newStatus}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{update.date} at {update.time}</p>
                  </div>
                </div>
              ))}
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
                Update applicant status promptly to keep candidates engaged
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Use status tracking to measure your hiring funnel efficiency
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Shortlisted candidates have 40% higher acceptance rate
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Schedule interviews within 48 hours of shortlisting
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Application Status</h3>
              <button onClick={() => setShowStatusModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Applicant: <span className="font-medium text-gray-900">{selectedApplicant.name}</span></p>
                <p className="text-sm text-gray-600 mb-4">Position: <span className="font-medium text-gray-900">{selectedApplicant.job}</span></p>
                <p className="text-sm text-gray-600 mb-4">Current Status: {getStatusBadge(selectedApplicant.status)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="applied">Applied</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="offered">Offered</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusUpdate}
                  disabled={updatingStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {updatingStatus ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;