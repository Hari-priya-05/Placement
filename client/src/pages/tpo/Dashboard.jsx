import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Briefcase, 
  Building, 
  TrendingUp, 
  Award, 
  Calendar,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  PieChart,
  BarChart3,
  Target,
  GraduationCap,
  UserCheck,
  FileText,
  Mail,
  Phone,
  MapPin,
  Star,
  Activity
} from 'lucide-react';

const TPODashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 450,
    placedStudents: 385,
    pendingPlacements: 65,
    totalRecruiters: 48,
    activeRecruiters: 42,
    totalJobs: 156,
    activeJobs: 89,
    totalApplications: 1245,
    shortlisted: 567,
    interviews: 234,
    offers: 156,
    placementPercentage: 85.6,
    averagePackage: '8.5 LPA',
    highestPackage: '45 LPA',
    topRecruiters: 12,
    upcomingDrives: 8
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingDrives, setUpcomingDrives] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [monthlyPlacements, setMonthlyPlacements] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setRecentActivities([
        {
          id: 1,
          type: 'placement',
          title: 'Google India - Placement Drive',
          description: '15 students placed with ₹45 LPA package',
          time: '2 hours ago',
          icon: Award,
          color: 'bg-green-100 text-green-600'
        },
        {
          id: 2,
          type: 'job',
          title: 'Microsoft - New Job Posting',
          description: 'Software Engineer positions for 2024 batch',
          time: '5 hours ago',
          icon: Briefcase,
          color: 'bg-blue-100 text-blue-600'
        },
        {
          id: 3,
          type: 'student',
          title: 'Student Achievement',
          description: 'Rahul Sharma selected as Campus Ambassador',
          time: '1 day ago',
          icon: Users,
          color: 'bg-purple-100 text-purple-600'
        },
        {
          id: 4,
          type: 'drive',
          title: 'Amazon - Drive Scheduled',
          description: 'Virtual drive for 50 students on March 25',
          time: '1 day ago',
          icon: Calendar,
          color: 'bg-orange-100 text-orange-600'
        }
      ]);

      setUpcomingDrives([
        {
          id: 1,
          company: 'Google India',
          date: '2024-03-25',
          time: '10:00 AM',
          mode: 'Virtual',
          positions: 25,
          registered: 180,
          deadline: '2024-03-20',
          status: 'upcoming',
          logo: 'G'
        },
        {
          id: 2,
          company: 'Microsoft',
          date: '2024-03-28',
          time: '9:30 AM',
          mode: 'Hybrid',
          positions: 30,
          registered: 210,
          deadline: '2024-03-22',
          status: 'upcoming',
          logo: 'M'
        },
        {
          id: 3,
          company: 'Amazon',
          date: '2024-04-02',
          time: '11:00 AM',
          mode: 'Virtual',
          positions: 40,
          registered: 320,
          deadline: '2024-03-28',
          status: 'upcoming',
          logo: 'A'
        }
      ]);

      setTopRecruiters([
        {
          id: 1,
          name: 'Google India',
          positions: 25,
          package: '45 LPA',
          students: 15,
          rating: 4.9,
          logo: 'G',
          color: 'from-blue-500 to-blue-600'
        },
        {
          id: 2,
          name: 'Microsoft',
          positions: 30,
          package: '42 LPA',
          students: 18,
          rating: 4.8,
          logo: 'M',
          color: 'from-purple-500 to-purple-600'
        },
        {
          id: 3,
          name: 'Amazon',
          positions: 40,
          package: '38 LPA',
          students: 22,
          rating: 4.7,
          logo: 'A',
          color: 'from-orange-500 to-orange-600'
        },
        {
          id: 4,
          name: 'Goldman Sachs',
          positions: 20,
          package: '35 LPA',
          students: 12,
          rating: 4.6,
          logo: 'G',
          color: 'from-green-500 to-green-600'
        }
      ]);

      setDepartmentStats([
        { dept: 'Computer Science', total: 120, placed: 108, percentage: 90, avgPackage: '12.5 LPA' },
        { dept: 'Information Technology', total: 95, placed: 82, percentage: 86.3, avgPackage: '10.2 LPA' },
        { dept: 'Electronics', total: 85, placed: 70, percentage: 82.4, avgPackage: '8.5 LPA' },
        { dept: 'Mechanical', total: 75, placed: 58, percentage: 77.3, avgPackage: '7.2 LPA' },
        { dept: 'Civil', total: 45, placed: 32, percentage: 71.1, avgPackage: '6.8 LPA' },
        { dept: 'Electrical', total: 30, placed: 22, percentage: 73.3, avgPackage: '7.5 LPA' }
      ]);

      setMonthlyPlacements([
        { month: 'Jan', count: 45 },
        { month: 'Feb', count: 62 },
        { month: 'Mar', count: 78 },
        { month: 'Apr', count: 95 },
        { month: 'May', count: 110 },
        { month: 'Jun', count: 85 }
      ]);

      setLoading(false);
    }, 1500);
  }, []);

  const statsCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: GraduationCap,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      subtext: `${stats.placedStudents} placed`
    },
    {
      title: 'Placement %',
      value: `${stats.placementPercentage}%`,
      icon: Target,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+5.2%',
      subtext: `${stats.pendingPlacements} pending`
    },
    {
      title: 'Active Recruiters',
      value: stats.activeRecruiters,
      icon: Building,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+8',
      subtext: `${stats.totalRecruiters} total`
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: Briefcase,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: '+24',
      subtext: `${stats.totalJobs} total`
    },
    {
      title: 'Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'from-pink-600 to-pink-700',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      trend: '+156',
      subtext: `${stats.shortlisted} shortlisted`
    },
    {
      title: 'Offers Made',
      value: stats.offers,
      icon: Award,
      color: 'from-indigo-600 to-indigo-700',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      trend: '+42',
      subtext: `${stats.interviews} interviews`
    }
  ];

  const quickActions = [
    {
      title: 'Manage Students',
      description: 'View and manage student profiles',
      icon: Users,
      link: '/tpo/manage-students',
      color: 'from-blue-500 to-blue-600',
      count: stats.totalStudents
    },
    {
      title: 'Manage Recruiters',
      description: 'Approve and manage recruiters',
      icon: Building,
      link: '/tpo/manage-recruiters',
      color: 'from-green-500 to-green-600',
      count: stats.totalRecruiters
    },
    {
      title: 'Placement Drives',
      description: 'Schedule and manage drives',
      icon: Calendar,
      link: '/tpo/placement-drives',
      color: 'from-purple-500 to-purple-600',
      count: stats.upcomingDrives
    },
    {
      title: 'Analytics',
      description: 'View detailed reports',
      icon: BarChart3,
      link: '/tpo/analytics',
      color: 'from-orange-500 to-orange-600',
      count: 'Reports'
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
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Training & Placement Officer Dashboard - Placement Season 2024
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Download Report
            </button>
            <button className="bg-blue-500 bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-all flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Drive
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.averagePackage}</div>
            <div className="text-sm text-blue-100">Average Package</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.highestPackage}</div>
            <div className="text-sm text-blue-100">Highest Package</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.topRecruiters}</div>
            <div className="text-sm text-blue-100">Top Recruiters</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{stats.upcomingDrives}</div>
            <div className="text-sm text-blue-100">Upcoming Drives</div>
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
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link to={action.link} key={index}>
              <div className={`bg-gradient-to-r ${action.color} rounded-xl p-6 text-white hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8" />
                  <span className="text-3xl font-bold">{action.count}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-white text-opacity-90">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Department Stats & Monthly Placements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Department-wise Placement Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Department-wise Placement</h2>
                <p className="text-sm text-gray-600 mt-1">Placement statistics by department</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details →
              </button>
            </div>

            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{dept.dept}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({dept.placed}/{dept.total})
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">{dept.percentage}%</span>
                      <span className="text-sm text-green-600">{dept.avgPackage}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2"
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly Placement Trend */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Placement Trend</h3>
              <div className="flex items-end justify-between h-40">
                {monthlyPlacements.map((month, index) => (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <div className="relative w-full px-1">
                      <div
                        className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg"
                        style={{ height: `${(month.count / 110) * 100}px` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Recruiters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRecruiters.map((recruiter) => (
                <div key={recruiter.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${recruiter.color} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                      {recruiter.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{recruiter.name}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{recruiter.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center text-sm">
                    <div>
                      <p className="font-semibold text-gray-900">{recruiter.positions}</p>
                      <p className="text-xs text-gray-500">Positions</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{recruiter.students}</p>
                      <p className="text-xs text-gray-500">Placed</p>
                    </div>
                    <div>
                      <p className="font-semibold text-green-600">{recruiter.package}</p>
                      <p className="text-xs text-gray-500">Package</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activities & Upcoming Drives */}
        <div className="space-y-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="h-5 w-5 text-blue-600 mr-2" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`${activity.color} p-2 rounded-lg`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Placement Drives */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-2" />
              Upcoming Drives
            </h2>
            <div className="space-y-4">
              {upcomingDrives.map((drive) => (
                <div key={drive.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{drive.company}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(drive.date).toLocaleDateString()} at {drive.time}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Users className="h-3 w-3 mr-1" />
                        {drive.registered} registered • {drive.positions} positions
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {drive.mode}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Deadline: {new Date(drive.deadline).toLocaleDateString()}
                    </span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Placement Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Target</span>
                <span className="font-bold">500 Students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Achieved</span>
                <span className="font-bold">{stats.placedStudents} Students</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Remaining</span>
                <span className="font-bold">{stats.pendingPlacements} Students</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
                <div
                  className="bg-white rounded-full h-2"
                  style={{ width: `${stats.placementPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-white text-opacity-90 mt-2">
                {stats.placementPercentage}% of target achieved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPODashboard;