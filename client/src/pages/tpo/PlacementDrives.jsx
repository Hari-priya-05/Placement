import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Building,
  MapPin,
  Clock,
  Users,
  Briefcase,
  DollarSign,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Share2,
  Filter,
  Search,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Star,
  Heart,
  Clock as Hourglass,
  Calendar as CalendarIcon,
  FileText,
  Upload,
  RefreshCw
} from 'lucide-react';

const PlacementDrives = () => {
  const [loading, setLoading] = useState(true);
  const [drives, setDrives] = useState([]);
  const [filteredDrives, setFilteredDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    date: '',
    time: '',
    mode: 'On-Campus',
    location: '',
    roles: [''],
    eligibility: {
      cgpa: 7.0,
      backlogs: 0,
      branches: []
    },
    package: '',
    positions: '',
    description: '',
    requirements: [''],
    registrationDeadline: '',
    contactPerson: {
      name: '',
      email: '',
      phone: ''
    }
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockDrives = [
        {
          id: 1,
          company: 'Google',
          logo: 'G',
          color: 'from-blue-500 to-blue-600',
          date: '2024-03-25',
          time: '10:00 AM',
          mode: 'Virtual',
          location: 'Online',
          roles: ['Software Engineer', 'Data Scientist'],
          eligibility: {
            cgpa: 7.5,
            backlogs: 0,
            branches: ['CSE', 'IT', 'ECE']
          },
          package: '₹45-60 LPA',
          positions: 25,
          registered: 180,
          shortlisted: 45,
          attended: 42,
          selected: 15,
          description: 'Google is hiring for multiple roles. This is a great opportunity for final year students.',
          requirements: [
            'Strong DSA skills',
            'Good academic record',
            'Problem-solving ability'
          ],
          registrationDeadline: '2024-03-20',
          contactPerson: {
            name: 'Priya Sharma',
            email: 'priya.s@google.com',
            phone: '+91 98765 43210'
          },
          status: 'upcoming',
          registeredStudents: [
            { id: 101, name: 'Rahul Sharma', cgpa: 8.7, branch: 'CSE', status: 'registered' },
            { id: 102, name: 'Priya Patel', cgpa: 8.9, branch: 'IT', status: 'registered' },
            { id: 103, name: 'Amit Kumar', cgpa: 7.8, branch: 'ECE', status: 'registered' }
          ],
          schedule: [
            { time: '10:00 AM', activity: 'Pre-placement Talk' },
            { time: '11:00 AM', activity: 'Online Test' },
            { time: '02:00 PM', activity: 'Technical Interviews' }
          ],
          createdAt: '2024-03-01'
        },
        {
          id: 2,
          company: 'Microsoft',
          logo: 'M',
          color: 'from-purple-500 to-purple-600',
          date: '2024-04-05',
          time: '09:30 AM',
          mode: 'On-Campus',
          location: 'Hyderabad',
          roles: ['SDE', 'Cloud Engineer'],
          eligibility: {
            cgpa: 7.0,
            backlogs: 0,
            branches: ['CSE', 'IT', 'EEE']
          },
          package: '₹40-55 LPA',
          positions: 30,
          registered: 210,
          shortlisted: 65,
          attended: 58,
          selected: 18,
          description: 'Microsoft India campus recruitment drive for 2024 batch.',
          requirements: [
            'Strong coding skills',
            'Azure knowledge preferred',
            'Good communication'
          ],
          registrationDeadline: '2024-03-30',
          contactPerson: {
            name: 'Rahul Verma',
            email: 'rahul.v@microsoft.com',
            phone: '+91 98765 43211'
          },
          status: 'upcoming',
          registeredStudents: [
            { id: 201, name: 'Neha Singh', cgpa: 8.5, branch: 'CSE', status: 'registered' },
            { id: 202, name: 'Vikram Reddy', cgpa: 7.9, branch: 'IT', status: 'registered' }
          ],
          schedule: [
            { time: '09:30 AM', activity: 'Coding Test' },
            { time: '01:00 PM', activity: 'Technical Round 1' },
            { time: '03:00 PM', activity: 'Technical Round 2' }
          ],
          createdAt: '2024-03-05'
        },
        {
          id: 3,
          company: 'Amazon',
          logo: 'A',
          color: 'from-orange-500 to-orange-600',
          date: '2024-03-28',
          time: '11:00 AM',
          mode: 'Virtual',
          location: 'Online',
          roles: ['SDE', 'Data Scientist'],
          eligibility: {
            cgpa: 7.0,
            backlogs: 0,
            branches: ['CSE', 'IT', 'ECE', 'MECH']
          },
          package: '₹35-50 LPA',
          positions: 40,
          registered: 320,
          shortlisted: 85,
          attended: 78,
          selected: 22,
          description: 'Amazon hiring drive for 2024 batch. Multiple roles available.',
          requirements: [
            'Problem-solving skills',
            'Leadership principles',
            'Strong fundamentals'
          ],
          registrationDeadline: '2024-03-22',
          contactPerson: {
            name: 'Anjali Reddy',
            email: 'anjali.r@amazon.com',
            phone: '+91 98765 43212'
          },
          status: 'ongoing',
          registeredStudents: [
            { id: 301, name: 'Sneha Gupta', cgpa: 8.2, branch: 'CSE', status: 'shortlisted' },
            { id: 302, name: 'Rajesh Kumar', cgpa: 7.5, branch: 'ECE', status: 'attended' }
          ],
          schedule: [
            { time: '11:00 AM', activity: 'Online Assessment' },
            { time: '02:00 PM', activity: 'Technical Interview' }
          ],
          createdAt: '2024-03-10'
        },
        {
          id: 4,
          company: 'Goldman Sachs',
          logo: 'G',
          color: 'from-blue-700 to-blue-800',
          date: '2024-05-15',
          time: '10:30 AM',
          mode: 'On-Campus',
          location: 'Mumbai',
          roles: ['Software Engineer', 'Data Analyst'],
          eligibility: {
            cgpa: 8.0,
            backlogs: 0,
            branches: ['CSE', 'Finance', 'Economics']
          },
          package: '₹30-45 LPA',
          positions: 20,
          registered: 150,
          shortlisted: 40,
          attended: 35,
          selected: 8,
          description: 'Goldman Sachs campus recruitment for technology and analytics roles.',
          requirements: [
            'Strong analytical skills',
            'Financial knowledge',
            'Programming skills'
          ],
          registrationDeadline: '2024-05-05',
          contactPerson: {
            name: 'Neha Gupta',
            email: 'neha.g@gs.com',
            phone: '+91 98765 43213'
          },
          status: 'upcoming',
          registeredStudents: [],
          schedule: [
            { time: '10:30 AM', activity: 'Aptitude Test' },
            { time: '01:30 PM', activity: 'Technical Interview' },
            { time: '04:00 PM', activity: 'HR Interview' }
          ],
          createdAt: '2024-03-15'
        },
        {
          id: 5,
          company: 'Flipkart',
          logo: 'F',
          color: 'from-yellow-500 to-yellow-600',
          date: '2024-04-10',
          time: '09:00 AM',
          mode: 'On-Campus',
          location: 'Bangalore',
          roles: ['SDE', 'Product Manager'],
          eligibility: {
            cgpa: 7.0,
            backlogs: 0,
            branches: ['CSE', 'IT', 'MECH']
          },
          package: '₹30-45 LPA',
          positions: 35,
          registered: 280,
          shortlisted: 70,
          attended: 62,
          selected: 12,
          description: 'Flipkart recruitment drive for engineering and product roles.',
          requirements: [
            'Problem-solving skills',
            'Product thinking',
            'Communication skills'
          ],
          registrationDeadline: '2024-04-02',
          contactPerson: {
            name: 'Karthik Menon',
            email: 'karthik.m@flipkart.com',
            phone: '+91 98765 43214'
          },
          status: 'completed',
          registeredStudents: [
            { id: 501, name: 'Arjun Nair', cgpa: 8.3, branch: 'CSE', status: 'selected' },
            { id: 502, name: 'Divya Krishnan', cgpa: 8.1, branch: 'IT', status: 'selected' }
          ],
          schedule: [
            { time: '09:00 AM', activity: 'Coding Round' },
            { time: '12:00 PM', activity: 'Technical Interview' },
            { time: '03:00 PM', activity: 'HR Round' }
          ],
          createdAt: '2024-02-20'
        }
      ];

      setDrives(mockDrives);
      setFilteredDrives(mockDrives);
      setSelectedDrive(mockDrives[0]);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...drives];

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.roles.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(d => d.status === filterStatus);
    }

    if (filterMonth !== 'all') {
      const month = parseInt(filterMonth);
      filtered = filtered.filter(d => new Date(d.date).getMonth() + 1 === month);
    }

    setFilteredDrives(filtered);
  }, [searchTerm, filterStatus, filterMonth, drives]);

  const getStatusBadge = (status) => {
    const config = {
      'upcoming': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Calendar, label: 'Upcoming' },
      'ongoing': { bg: 'bg-green-100', text: 'text-green-800', icon: Zap, label: 'Ongoing' },
      'completed': { bg: 'bg-gray-100', text: 'text-gray-800', icon: CheckCircle, label: 'Completed' }
    };
    const StatusIcon = config[status]?.icon || Calendar;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {config[status]?.label}
      </span>
    );
  };

  const months = [
    { value: 'all', label: 'All Months' },
    { value: '3', label: 'March 2024' },
    { value: '4', label: 'April 2024' },
    { value: '5', label: 'May 2024' },
    { value: '6', label: 'June 2024' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    total: drives.length,
    upcoming: drives.filter(d => d.status === 'upcoming').length,
    ongoing: drives.filter(d => d.status === 'ongoing').length,
    completed: drives.filter(d => d.status === 'completed').length,
    totalPositions: drives.reduce((sum, d) => sum + d.positions, 0),
    totalRegistered: drives.reduce((sum, d) => sum + d.registered, 0),
    totalSelected: drives.reduce((sum, d) => sum + d.selected, 0)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Calendar className="h-8 w-8 mr-3" />
              Placement Drives
            </h1>
            <p className="text-blue-100 text-lg">
              Schedule and manage all company placement drives
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Drive
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Total Drives</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Upcoming</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Positions</p>
            <p className="text-2xl font-bold">{stats.totalPositions}</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-3">
            <p className="text-xs opacity-75">Selected</p>
            <p className="text-2xl font-bold">{stats.totalSelected}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content - Drives List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drives List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Drives ({filteredDrives.length})</h2>
          
          {filteredDrives.map((drive) => (
            <div
              key={drive.id}
              onClick={() => setSelectedDrive(drive)}
              className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer transition-all border-2 ${
                selectedDrive?.id === drive.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${drive.color} rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                  {drive.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{drive.company}</h3>
                    {getStatusBadge(drive.status)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(drive.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center text-gray-600">
                      <Users className="h-3 w-3 mr-1" />
                      {drive.registered} registered
                    </span>
                    <span className="flex items-center text-green-600">
                      <Award className="h-3 w-3 mr-1" />
                      {drive.selected} selected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drive Details */}
        <div className="lg:col-span-2">
          {selectedDrive ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${selectedDrive.color} rounded-2xl flex items-center justify-center text-white font-bold text-3xl`}>
                    {selectedDrive.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDrive.company}</h2>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(selectedDrive.date).toLocaleDateString()} at {selectedDrive.time}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedDrive.mode} • {selectedDrive.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Package</p>
                  <p className="text-lg font-bold text-gray-900">{selectedDrive.package}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-600">Positions</p>
                  <p className="text-lg font-bold text-blue-700">{selectedDrive.positions}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-600">Registered</p>
                  <p className="text-lg font-bold text-green-700">{selectedDrive.registered}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-purple-600">Selected</p>
                  <p className="text-lg font-bold text-purple-700">{selectedDrive.selected}</p>
                </div>
              </div>

              {/* Drive Information */}
              <div className="space-y-6">
                {/* Roles */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                    Hiring Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDrive.roles.map((role, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Target className="h-5 w-5 text-purple-600 mr-2" />
                    Eligibility Criteria
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Min CGPA</p>
                      <p className="text-lg font-bold text-gray-900">{selectedDrive.eligibility.cgpa}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Backlogs</p>
                      <p className="text-lg font-bold text-gray-900">{selectedDrive.eligibility.backlogs}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Branches</p>
                      <p className="text-sm font-medium text-gray-900">{selectedDrive.eligibility.branches.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedDrive.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedDrive.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Schedule */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-2" />
                    Schedule
                  </h3>
                  <div className="space-y-2">
                    {selectedDrive.schedule.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-24 text-sm font-medium text-gray-600">{item.time}</div>
                        <div className="flex-1 text-sm text-gray-800">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Person */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 text-indigo-600 mr-2" />
                    Contact Person
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{selectedDrive.contactPerson.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a href={`mailto:${selectedDrive.contactPerson.email}`} className="font-medium text-blue-600 hover:underline">
                        {selectedDrive.contactPerson.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a href={`tel:${selectedDrive.contactPerson.phone}`} className="font-medium text-blue-600 hover:underline">
                        {selectedDrive.contactPerson.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Registered Students */}
                {selectedDrive.registeredStudents.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Users className="h-5 w-5 text-orange-600 mr-2" />
                      Registered Students
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Branch</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">CGPA</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedDrive.registeredStudents.map((student) => (
                            <tr key={student.id}>
                              <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.branch}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{student.cgpa}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  student.status === 'selected' ? 'bg-green-100 text-green-800' :
                                  student.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                                  student.status === 'attended' ? 'bg-purple-100 text-purple-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {student.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Drive</h3>
              <p className="text-gray-600">Choose a placement drive from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacementDrives;