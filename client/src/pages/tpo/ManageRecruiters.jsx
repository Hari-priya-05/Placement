import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Award,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Shield,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  FileText,
  Download as DownloadIcon,
  RefreshCw,
  Plus,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Target,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github,
  Youtube
} from 'lucide-react';

const ManageRecruiters = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockRecruiters = [
        {
          id: 1,
          companyName: 'Google India',
          logo: 'G',
          color: 'from-blue-500 to-blue-600',
          email: 'hiring@google.com',
          phone: '+91 80 4123 4567',
          website: 'https://careers.google.com',
          industry: 'Technology',
          founded: '2010',
          headquarters: 'Bangalore, India',
          size: '10,000+ employees',
          description: 'Google India is a leading technology company specializing in internet-related services and products. We are committed to organizing the world\'s information and making it universally accessible and useful.',
          mission: 'To organize the world\'s information and make it universally accessible and useful.',
          vision: 'To provide access to the world\'s information in one click.',
          values: ['Innovation', 'User Focus', 'Speed', 'Transparency', 'Collaboration'],
          
          hrDetails: {
            name: 'Priya Sharma',
            role: 'HR Director',
            email: 'priya.sharma@google.com',
            phone: '+91 98765 43210',
            linkedin: 'https://linkedin.com/in/priya-sharma'
          },
          
          recruitmentStats: {
            totalHires: 245,
            campusHires: 78,
            avgPackage: '28.5 LPA',
            highestPackage: '62 LPA',
            openPositions: 15,
            applicationsThisMonth: 1240,
            interviewRate: 68,
            offerAcceptance: 82,
            avgResponseTime: '3.2 days'
          },
          
          placementDetails: {
            previousYear: {
              hires: 85,
              avgPackage: '26.5 LPA',
              highestPackage: '58 LPA',
              branches: ['CSE', 'IT', 'ECE']
            },
            currentYear: {
              target: 95,
              achieved: 45,
              inProcess: 30,
              remaining: 20
            },
            preferredBranches: ['Computer Science', 'Information Technology', 'Electronics'],
            eligibility: {
              cgpa: 7.5,
              backlogs: 0,
              additional: 'Strong DSA skills'
            }
          },
          
          jobs: [
            {
              id: 101,
              title: 'Software Engineer',
              location: 'Bangalore',
              type: 'Full-time',
              experience: '0-2 years',
              salary: '₹28-35 LPA',
              openings: 25,
              applicants: 450,
              status: 'active',
              posted: '2024-03-01',
              deadline: '2024-03-30'
            },
            {
              id: 102,
              title: 'Data Scientist',
              location: 'Hyderabad',
              type: 'Full-time',
              experience: '1-3 years',
              salary: '₹30-40 LPA',
              openings: 15,
              applicants: 320,
              status: 'active',
              posted: '2024-03-05',
              deadline: '2024-04-05'
            },
            {
              id: 103,
              title: 'Product Manager',
              location: 'Bangalore',
              type: 'Full-time',
              experience: '2-4 years',
              salary: '₹35-45 LPA',
              openings: 8,
              applicants: 210,
              status: 'active',
              posted: '2024-03-10',
              deadline: '2024-04-10'
            }
          ],
          
          placementDrives: [
            {
              id: 201,
              date: '2024-04-15',
              type: 'On-Campus',
              roles: ['SDE', 'Data Scientist'],
              eligibility: '7.5+ CGPA',
              status: 'scheduled'
            },
            {
              id: 202,
              date: '2024-05-10',
              type: 'Virtual',
              roles: ['Product Manager'],
              eligibility: '8.0+ CGPA',
              status: 'planned'
            }
          ],
          
          status: 'active',
          verified: true,
          joinedDate: '2023-08-15',
          lastActive: '2024-03-18',
          rating: 4.9,
          reviews: 128,
          
          socialMedia: {
            linkedin: 'https://linkedin.com/company/google',
            twitter: 'https://twitter.com/google',
            facebook: 'https://facebook.com/google',
            instagram: 'https://instagram.com/google',
            youtube: 'https://youtube.com/google'
          },
          
          benefits: [
            'Competitive Salary',
            'Health Insurance',
            'Free Meals',
            'Gym Membership',
            'Learning Budget',
            'Flexible Hours'
          ],
          
          achievements: [
            'Great Place to Work 2023',
            'Best Employer Brand 2023',
            'Top 50 Innovative Companies'
          ]
        },
        {
          id: 2,
          companyName: 'Microsoft India',
          logo: 'M',
          color: 'from-purple-500 to-purple-600',
          email: 'careers@microsoft.com',
          phone: '+91 40 4123 4567',
          website: 'https://careers.microsoft.com',
          industry: 'Technology',
          founded: '2011',
          headquarters: 'Hyderabad, India',
          size: '10,000+ employees',
          description: 'Microsoft India is a leading technology company empowering every person and organization on the planet to achieve more.',
          mission: 'To empower every person and organization to achieve more.',
          vision: 'To help people and businesses throughout the world realize their full potential.',
          values: ['Innovation', 'Diversity', 'Customer Focus', 'Integrity', 'Respect'],
          
          hrDetails: {
            name: 'Rahul Verma',
            role: 'Talent Acquisition Lead',
            email: 'rahul.verma@microsoft.com',
            phone: '+91 98765 43211',
            linkedin: 'https://linkedin.com/in/rahul-verma'
          },
          
          recruitmentStats: {
            totalHires: 312,
            campusHires: 95,
            avgPackage: '26.8 LPA',
            highestPackage: '55 LPA',
            openPositions: 22,
            applicationsThisMonth: 1850,
            interviewRate: 65,
            offerAcceptance: 78,
            avgResponseTime: '4.1 days'
          },
          
          placementDetails: {
            previousYear: {
              hires: 92,
              avgPackage: '24.5 LPA',
              highestPackage: '52 LPA',
              branches: ['CSE', 'IT', 'ECE', 'EEE']
            },
            currentYear: {
              target: 110,
              achieved: 52,
              inProcess: 35,
              remaining: 23
            },
            preferredBranches: ['Computer Science', 'Information Technology', 'Electronics', 'Electrical'],
            eligibility: {
              cgpa: 7.0,
              backlogs: 0,
              additional: 'Strong coding skills'
            }
          },
          
          jobs: [
            {
              id: 201,
              title: 'SDE',
              location: 'Hyderabad',
              type: 'Full-time',
              experience: '0-3 years',
              salary: '₹25-35 LPA',
              openings: 30,
              applicants: 580,
              status: 'active',
              posted: '2024-03-02',
              deadline: '2024-04-02'
            }
          ],
          
          placementDrives: [
            {
              id: 301,
              date: '2024-04-20',
              type: 'On-Campus',
              roles: ['SDE', 'Cloud Engineer'],
              eligibility: '7.0+ CGPA',
              status: 'scheduled'
            }
          ],
          
          status: 'active',
          verified: true,
          joinedDate: '2023-09-10',
          lastActive: '2024-03-17',
          rating: 4.8,
          reviews: 156,
          
          socialMedia: {
            linkedin: 'https://linkedin.com/company/microsoft',
            twitter: 'https://twitter.com/microsoft'
          },
          
          benefits: [
            'Competitive Salary',
            'Health Insurance',
            'Stock Options',
            'Learning Budget',
            'Remote Work'
          ],
          
          achievements: [
            'Best Workplace 2023',
            'Top Employer 2023'
          ]
        },
        {
          id: 3,
          companyName: 'Amazon India',
          logo: 'A',
          color: 'from-orange-500 to-orange-600',
          email: 'hiring@amazon.in',
          phone: '+91 44 4123 4567',
          website: 'https://amazon.jobs',
          industry: 'E-commerce',
          founded: '2012',
          headquarters: 'Chennai, India',
          size: '50,000+ employees',
          description: 'Amazon India is a leading e-commerce company dedicated to being Earth\'s most customer-centric company.',
          mission: 'To be Earth\'s most customer-centric company.',
          vision: 'To create a place where people can find and discover anything they want to buy online.',
          values: ['Customer Obsession', 'Innovation', 'Bias for Action', 'Ownership', 'High Standards'],
          
          hrDetails: {
            name: 'Anjali Reddy',
            role: 'HR Manager',
            email: 'anjali.reddy@amazon.com',
            phone: '+91 98765 43212',
            linkedin: 'https://linkedin.com/in/anjali-reddy'
          },
          
          recruitmentStats: {
            totalHires: 425,
            campusHires: 112,
            avgPackage: '24.2 LPA',
            highestPackage: '48 LPA',
            openPositions: 35,
            applicationsThisMonth: 2100,
            interviewRate: 62,
            offerAcceptance: 75,
            avgResponseTime: '4.5 days'
          },
          
          placementDetails: {
            previousYear: {
              hires: 105,
              avgPackage: '22.5 LPA',
              highestPackage: '45 LPA',
              branches: ['CSE', 'IT', 'ECE', 'MECH']
            },
            currentYear: {
              target: 125,
              achieved: 48,
              inProcess: 42,
              remaining: 35
            },
            preferredBranches: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical'],
            eligibility: {
              cgpa: 7.0,
              backlogs: 0,
              additional: 'Problem solving skills'
            }
          },
          
          status: 'pending',
          verified: false,
          joinedDate: '2024-03-10',
          lastActive: '2024-03-18',
          rating: 4.5,
          reviews: 45
        },
        {
          id: 4,
          companyName: 'Goldman Sachs',
          logo: 'G',
          color: 'from-blue-700 to-blue-800',
          email: 'campus@gs.com',
          phone: '+91 22 4123 4567',
          website: 'https://goldmansachs.com/careers',
          industry: 'Finance',
          founded: '2015',
          headquarters: 'Mumbai, India',
          size: '5,000-10,000 employees',
          description: 'Goldman Sachs is a leading global investment banking, securities and investment management firm.',
          mission: 'To advance sustainable economic growth and financial opportunity.',
          vision: 'To be the world\'s most exceptional financial institution.',
          values: ['Excellence', 'Integrity', 'Partnership', 'Client Focus'],
          
          hrDetails: {
            name: 'Neha Gupta',
            role: 'Campus Recruitment Lead',
            email: 'neha.gupta@gs.com',
            phone: '+91 98765 43213',
            linkedin: 'https://linkedin.com/in/neha-gupta'
          },
          
          recruitmentStats: {
            totalHires: 156,
            campusHires: 45,
            avgPackage: '32.5 LPA',
            highestPackage: '55 LPA',
            openPositions: 12,
            applicationsThisMonth: 890,
            interviewRate: 58,
            offerAcceptance: 85,
            avgResponseTime: '5.2 days'
          },
          
          placementDetails: {
            previousYear: {
              hires: 42,
              avgPackage: '30.5 LPA',
              highestPackage: '52 LPA',
              branches: ['CSE', 'Finance']
            },
            currentYear: {
              target: 50,
              achieved: 18,
              inProcess: 15,
              remaining: 17
            },
            preferredBranches: ['Computer Science', 'Finance', 'Economics'],
            eligibility: {
              cgpa: 8.0,
              backlogs: 0,
              additional: 'Strong analytical skills'
            }
          },
          
          status: 'inactive',
          verified: true,
          joinedDate: '2023-10-05',
          lastActive: '2024-03-10',
          rating: 4.6,
          reviews: 67
        }
      ];

      setRecruiters(mockRecruiters);
      setFilteredRecruiters(mockRecruiters);
      setSelectedRecruiter(mockRecruiters[0]);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...recruiters];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.hrDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    // Industry filter
    if (filterIndustry !== 'all') {
      filtered = filtered.filter(r => r.industry === filterIndustry);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.joinedDate) - new Date(b.joinedDate));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'hires') {
      filtered.sort((a, b) => b.recruitmentStats.totalHires - a.recruitmentStats.totalHires);
    }

    setFilteredRecruiters(filtered);
  }, [searchTerm, filterStatus, filterIndustry, sortBy, recruiters]);

  const getStatusBadge = (status) => {
    const config = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Active' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      'inactive': { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle, label: 'Inactive' }
    };
    const StatusIcon = config[status]?.icon || Clock;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {config[status]?.label}
      </span>
    );
  };

  const industries = ['all', 'Technology', 'Finance', 'E-commerce', 'Consulting', 'Manufacturing'];
  const statuses = ['all', 'active', 'pending', 'inactive'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'hires', label: 'Most Hires' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Building className="h-8 w-8 mr-3" />
          Manage Recruiters
        </h1>
        <p className="text-blue-100 text-lg">
          View, approve, and manage all company partnerships
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Recruiters</p>
            <Building className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{recruiters.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-5 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-green-600">Active</p>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-700">
            {recruiters.filter(r => r.status === 'active').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-5 border border-yellow-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-yellow-600">Pending</p>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-700">
            {recruiters.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-5 border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-purple-600">Total Jobs</p>
            <Briefcase className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-700">
            {recruiters.reduce((sum, r) => sum + (r.recruitmentStats?.openPositions || 0), 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by company, email, or HR name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry === 'all' ? 'All Industries' : industry}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content - Recruiters List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recruiters List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recruiters ({filteredRecruiters.length})</h2>
          
          {filteredRecruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              onClick={() => setSelectedRecruiter(recruiter)}
              className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer transition-all border-2 ${
                selectedRecruiter?.id === recruiter.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${recruiter.color} rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                  {recruiter.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{recruiter.companyName}</h3>
                    {getStatusBadge(recruiter.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{recruiter.industry}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {recruiter.headquarters.split(',')[0]}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center text-gray-600">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {recruiter.recruitmentStats?.openPositions || 0} jobs
                    </span>
                    <span className="flex items-center text-yellow-600">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {recruiter.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredRecruiters.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recruiters found</h3>
              <p className="text-sm text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Recruiter Details */}
        <div className="lg:col-span-2">
          {selectedRecruiter ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header with Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${selectedRecruiter.color} rounded-2xl flex items-center justify-center text-white font-bold text-3xl`}>
                    {selectedRecruiter.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedRecruiter.companyName}</h2>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="text-sm text-gray-600">{selectedRecruiter.industry}</span>
                      <span className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedRecruiter.headquarters}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {selectedRecruiter.status === 'pending' && (
                    <>
                      <button
                        onClick={() => setShowApproveModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </>
                  )}
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Total Hires</p>
                  <p className="text-xl font-bold text-gray-900">{selectedRecruiter.recruitmentStats.totalHires}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600">Avg Package</p>
                  <p className="text-xl font-bold text-blue-700">{selectedRecruiter.recruitmentStats.avgPackage}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-600">Open Jobs</p>
                  <p className="text-xl font-bold text-green-700">{selectedRecruiter.recruitmentStats.openPositions}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-purple-600">Rating</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold text-purple-700 mr-2">{selectedRecruiter.rating}</p>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-6 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: Building },
                    { id: 'placement', label: 'Placement Details', icon: Target },
                    { id: 'jobs', label: 'Jobs', icon: Briefcase },
                    { id: 'drives', label: 'Drives', icon: Calendar },
                    { id: 'contact', label: 'Contact', icon: Users }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors flex items-center ${
                          activeTab === tab.id
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <>
                    {/* Company Description */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">About Company</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{selectedRecruiter.description}</p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <Target className="h-5 w-5 text-blue-600 mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">Mission</h4>
                        <p className="text-sm text-gray-600">{selectedRecruiter.mission}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <Eye className="h-5 w-5 text-purple-600 mb-2" />
                        <h4 className="font-medium text-gray-900 mb-1">Vision</h4>
                        <p className="text-sm text-gray-600">{selectedRecruiter.vision}</p>
                      </div>
                    </div>

                    {/* Core Values */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Core Values</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecruiter.values?.map((value, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Achievements</h3>
                      <div className="space-y-2">
                        {selectedRecruiter.achievements?.map((achievement, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <Award className="h-4 w-4 text-yellow-500 mr-2" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Benefits Offered</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecruiter.benefits?.map((benefit, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Placement Details Tab */}
                {activeTab === 'placement' && (
                  <>
                    {/* Previous Year Stats */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Previous Year (2023)</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Hires</p>
                          <p className="text-xl font-bold text-gray-900">{selectedRecruiter.placementDetails.previousYear.hires}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Avg Package</p>
                          <p className="text-xl font-bold text-gray-900">{selectedRecruiter.placementDetails.previousYear.avgPackage}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Highest</p>
                          <p className="text-xl font-bold text-gray-900">{selectedRecruiter.placementDetails.previousYear.highestPackage}</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Year Progress */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Current Year (2024)</h3>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-xs text-green-600">Target</p>
                          <p className="text-xl font-bold text-green-700">{selectedRecruiter.placementDetails.currentYear.target}</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-600">Achieved</p>
                          <p className="text-xl font-bold text-blue-700">{selectedRecruiter.placementDetails.currentYear.achieved}</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-xs text-purple-600">In Process</p>
                          <p className="text-xl font-bold text-purple-700">{selectedRecruiter.placementDetails.currentYear.inProcess}</p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          style={{ width: `${(selectedRecruiter.placementDetails.currentYear.achieved / selectedRecruiter.placementDetails.currentYear.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Eligibility Criteria */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Eligibility Criteria</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Minimum CGPA</p>
                          <p className="text-lg font-bold text-gray-900">{selectedRecruiter.placementDetails.eligibility.cgpa}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs text-gray-500">Backlogs Allowed</p>
                          <p className="text-lg font-bold text-gray-900">{selectedRecruiter.placementDetails.eligibility.backlogs}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{selectedRecruiter.placementDetails.eligibility.additional}</p>
                    </div>

                    {/* Preferred Branches */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Preferred Branches</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecruiter.placementDetails.preferredBranches.map((branch, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                            {branch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                  <div className="space-y-4">
                    {selectedRecruiter.jobs?.map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </span>
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" />
                                {job.type}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {job.experience}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{job.salary}</p>
                            <p className="text-xs text-gray-500 mt-1">{job.applicants} applicants</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Drives Tab */}
                {activeTab === 'drives' && (
                  <div className="space-y-4">
                    {selectedRecruiter.placementDrives?.map((drive) => (
                      <div key={drive.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{drive.type} Drive</h4>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                            {drive.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">{new Date(drive.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Roles</p>
                            <p className="font-medium">{drive.roles.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Eligibility</p>
                            <p className="font-medium">{drive.eligibility}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    {/* HR Contact */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        HR Contact
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Name</span>
                          <span className="font-medium text-gray-900">{selectedRecruiter.hrDetails.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Role</span>
                          <span className="font-medium text-gray-900">{selectedRecruiter.hrDetails.role}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Email</span>
                          <a href={`mailto:${selectedRecruiter.hrDetails.email}`} className="font-medium text-blue-600 hover:underline">
                            {selectedRecruiter.hrDetails.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Phone</span>
                          <a href={`tel:${selectedRecruiter.hrDetails.phone}`} className="font-medium text-blue-600 hover:underline">
                            {selectedRecruiter.hrDetails.phone}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">LinkedIn</span>
                          <a href={selectedRecruiter.hrDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Company Contact */}
                    <div className="bg-gray-50 rounded-lg p-5">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Building className="h-5 w-5 text-purple-600 mr-2" />
                        Company Contact
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Email</span>
                          <a href={`mailto:${selectedRecruiter.email}`} className="font-medium text-blue-600 hover:underline">
                            {selectedRecruiter.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Phone</span>
                          <a href={`tel:${selectedRecruiter.phone}`} className="font-medium text-blue-600 hover:underline">
                            {selectedRecruiter.phone}
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Website</span>
                          <a href={selectedRecruiter.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Visit Site
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Social Media */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Social Media</h3>
                      <div className="flex space-x-4">
                        {selectedRecruiter.socialMedia?.linkedin && (
                          <a href={selectedRecruiter.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                            <Linkedin className="h-6 w-6" />
                          </a>
                        )}
                        {selectedRecruiter.socialMedia?.twitter && (
                          <a href={selectedRecruiter.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                            <Twitter className="h-6 w-6" />
                          </a>
                        )}
                        {selectedRecruiter.socialMedia?.facebook && (
                          <a href={selectedRecruiter.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                            <Facebook className="h-6 w-6" />
                          </a>
                        )}
                        {selectedRecruiter.socialMedia?.instagram && (
                          <a href={selectedRecruiter.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                            <Instagram className="h-6 w-6" />
                          </a>
                        )}
                        {selectedRecruiter.socialMedia?.youtube && (
                          <a href={selectedRecruiter.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                            <Youtube className="h-6 w-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Recruiter</h3>
              <p className="text-gray-600">Choose a company from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && selectedRecruiter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Approve Recruiter</h2>
              <p className="text-gray-600">
                Are you sure you want to approve <span className="font-semibold">{selectedRecruiter.companyName}</span>?
                They will be able to post jobs and access student profiles.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  // Update status
                  setRecruiters(recruiters.map(r =>
                    r.id === selectedRecruiter.id ? { ...r, status: 'active', verified: true } : r
                  ));
                  setShowApproveModal(false);
                }}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Yes, Approve
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRecruiter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reject Recruiter</h2>
              <p className="text-gray-600">
                Are you sure you want to reject <span className="font-semibold">{selectedRecruiter.companyName}</span>?
                They will not be able to access the portal.
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                placeholder="Reason for rejection (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="3"
              ></textarea>
              <button
                onClick={() => {
                  // Update status
                  setRecruiters(recruiters.map(r =>
                    r.id === selectedRecruiter.id ? { ...r, status: 'inactive' } : r
                  ));
                  setShowRejectModal(false);
                }}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Reject
              </button>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRecruiters;