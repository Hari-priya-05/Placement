import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/src/context/AuthContext';
import axios from '/src/api/axios';
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
  AlertCircle
} from 'lucide-react';
import Card from '/src/components/ui/Card';
import Button from '/src/components/ui/Button';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    interviews: 0,
    selected: 0,
    pending: 0,
    rejected: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all required data in parallel
      const [jobsRes, appsRes, recommendedRes] = await Promise.all([
        axios.get('/jobs?limit=6'),
        axios.get('/applications/my-applications'),
        axios.get('/jobs/recommended?limit=4')
      ]);

      // Process jobs
      setRecentJobs(jobsRes.data.data.jobs || []);
      
      // Process applications
      const applications = appsRes.data.data.applications || [];
      setRecentApplications(applications.slice(0, 5));
      
      // Calculate statistics
      setStats({
        totalApplications: applications.length,
        shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
        interviews: applications.filter(a => a.status === 'Interview').length,
        selected: applications.filter(a => a.status === 'Selected').length,
        pending: applications.filter(a => a.status === 'Applied').length,
        rejected: applications.filter(a => a.status === 'Rejected').length
      });

      // Filter upcoming interviews
      const interviews = applications
        .filter(a => a.status === 'Interview' && a.interview_date)
        .slice(0, 3);
      setUpcomingInterviews(interviews);

      // Set recommended jobs
      setRecommendedJobs(recommendedRes.data.data.jobs || []);

      // Generate activity feed
      const activityFeed = [
        ...applications.map(app => ({
          id: `app-${app.id}`,
          type: 'application',
          title: `Applied for ${app.jobs?.title}`,
          company: app.jobs?.company,
          time: new Date(app.applied_at).toLocaleDateString(),
          status: app.status
        })),
        ...interviews.map(int => ({
          id: `int-${int.id}`,
          type: 'interview',
          title: `Interview scheduled for ${int.jobs?.title}`,
          company: int.jobs?.company,
          time: new Date(int.interview_date).toLocaleDateString(),
          status: 'Interview'
        }))
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

      setActivities(activityFeed);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: Briefcase,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Interviews',
      value: stats.interviews,
      icon: Calendar,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Selected',
      value: stats.selected,
      icon: Award,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'Profile Views',
      value: '24',
      icon: Users,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig['Applied'];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-primary-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section with Profile Completion */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              Here's what's happening with your job applications today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/student/profile">
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                Complete Your Profile
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Profile Completion Bar */}
        <div className="mt-6 max-w-md">
          <div className="flex justify-between text-sm mb-2">
            <span>Profile Strength</span>
            <span className="font-semibold">75%</span>
          </div>
          <div className="h-2 bg-primary-400 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-white rounded-full"></div>
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
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
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
        {/* Left Column - Recent Jobs & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Jobs Section */}
          <Card className="overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recent Job Postings</h2>
                <p className="text-sm text-gray-600 mt-1">Latest opportunities for you</p>
              </div>
              <Link to="/student/jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow hover:border-primary-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          {job.salary && (
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                              {job.salary}
                            </div>
                          )}
                          {job.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              {job.location}
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            Posted {new Date(job.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        {job.skills_required && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {job.skills_required.split(',').slice(0, 3).map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                >
                                  {skill.trim()}
                                </span>
                              ))}
                              {job.skills_required.split(',').length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{job.skills_required.split(',').length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Link to={`/student/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">Quick Apply</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No jobs available at the moment</p>
              </div>
            )}
          </Card>

          {/* Recommended Jobs */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                <p className="text-sm text-gray-600 mt-1">Based on your skills and preferences</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    Match Score: 85%
                  </div>
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Applications & Activities */}
        <div className="space-y-8">
          {/* Recent Applications */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Link to="/student/applications" className="text-primary-600 hover:text-primary-700 text-sm">
                View All
              </Link>
            </div>
            
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{app.jobs?.title}</p>
                        <p className="text-sm text-gray-600">{app.jobs?.company}</p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No applications yet</p>
                <Link to="/student/jobs">
                  <Button variant="outline" size="sm" className="mt-4">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Upcoming Interviews */}
          {upcomingInterviews.length > 0 && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{interview.jobs?.title}</p>
                        <p className="text-sm text-gray-600">{interview.jobs?.company}</p>
                      </div>
                      <Calendar className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="mt-3 flex items-center text-sm text-purple-700">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(interview.interview_date).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Activity Feed */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {activity.type === 'application' ? (
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.company}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  {activity.status && (
                    <span className="text-xs text-gray-500">{activity.status}</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
            <h2 className="text-lg font-semibold text-primary-900 mb-3">Quick Tips 💡</h2>
            <ul className="space-y-2 text-sm text-primary-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Complete your profile to get better job matches
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Upload your resume for faster applications
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Check interview tips in the AI assistant
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Update your skills to get more recommendations
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;