import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Star,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  Calendar,
  TrendingUp,
  UserCheck,
  UserX,
  MoreVertical,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  Zap,
  Target,
  Heart,
  Share2,
  Printer,
  RefreshCw,
  Clock,
  MessageCircle,
  Bell,
  Settings,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Layout,
  Grid,
  List,
  Filter as FilterIcon,
  Plus,
  Minus,
  Send,
  Loader,
  Info,
  AlertTriangle,
  Shield,
  Medal,
  Trophy,
  Crown,
  Gem,
  Diamond,
  Coins,
  PiggyBank,
  LineChart,
  BarChart,
  Radar,
  Network,
  UsersRound,
  Building,
  Briefcase,
  DollarSign,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  Copy,
  Share,
  Bookmark,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Laugh,
  HeartHandshake,
  Handshake,
  UsersIcon
} from 'lucide-react';

const ManageStudents = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterCGPA, setFilterCGPA] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    placed: 0,
    interviewing: 0,
    applied: 0,
    eligible: 0,
    notApplied: 0,
    averageCGPA: 0,
    placementRate: 0,
    topPerformers: [],
    departmentWise: {},
    yearWise: {},
    cgpaDistribution: {}
  });

  // Mock data with advanced student profiles
  useEffect(() => {
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@college.edu',
          phone: '+91 98765 43210',
          rollNo: 'CS2021001',
          department: 'Computer Science',
          year: 4,
          semester: 8,
          cgpa: 8.7,
          skills: ['React', 'Node.js', 'Python', 'MongoDB', 'Docker'],
          projects: [
            { title: 'AI Placement Portal', technologies: ['React', 'Node.js', 'OpenAI'], status: 'completed' },
            { title: 'E-commerce Platform', technologies: ['MERN', 'Redux'], status: 'ongoing' }
          ],
          achievements: [
            'CodeChef 4⭐', 'Hackathon Winner 2023', 'Best Project Award'
          ],
          placementStatus: 'interview',
          appliedCompanies: ['Google', 'Microsoft', 'Amazon'],
          offers: [],
          interviews: [
            { company: 'Google', date: '2024-03-25', round: 'Technical' },
            { company: 'Microsoft', date: '2024-03-28', round: 'System Design' }
          ],
          attendance: 92,
          backlogs: 0,
          profileStrength: 85,
          createdAt: '2021-06-15',
          lastActive: '2024-03-20',
          resumeUrl: '/resumes/rahul.pdf',
          linkedin: 'https://linkedin.com/in/rahul',
          github: 'https://github.com/rahul',
          portfolio: 'https://rahul.dev'
        },
        {
          id: 2,
          name: 'Priya Patel',
          email: 'priya.patel@college.edu',
          phone: '+91 98765 43211',
          rollNo: 'CS2021023',
          department: 'Computer Science',
          year: 4,
          semester: 8,
          cgpa: 8.9,
          skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Kubernetes'],
          projects: [
            { title: 'Cloud Migration Tool', technologies: ['AWS', 'Java'], status: 'completed' },
            { title: 'Microservices Architecture', technologies: ['Spring Cloud', 'Docker'], status: 'completed' }
          ],
          achievements: [
            'AWS Certified Solutions Architect', 'Google Cloud Certified', 'Published Research Paper'
          ],
          placementStatus: 'placed',
          appliedCompanies: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
          offers: [
            { company: 'Google', package: '45 LPA', role: 'SDE', status: 'accepted' },
            { company: 'Microsoft', package: '42 LPA', role: 'SDE', status: 'declined' }
          ],
          interviews: [],
          attendance: 95,
          backlogs: 0,
          profileStrength: 95,
          createdAt: '2021-06-15',
          lastActive: '2024-03-21',
          resumeUrl: '/resumes/priya.pdf',
          linkedin: 'https://linkedin.com/in/priya',
          github: 'https://github.com/priya'
        },
        {
          id: 3,
          name: 'Amit Kumar',
          email: 'amit.kumar@college.edu',
          phone: '+91 98765 43212',
          rollNo: 'CS2021045',
          department: 'Computer Science',
          year: 4,
          semester: 8,
          cgpa: 7.8,
          skills: ['JavaScript', 'React', 'Django', 'PostgreSQL'],
          projects: [
            { title: 'Task Management App', technologies: ['React', 'Django'], status: 'completed' }
          ],
          achievements: [],
          placementStatus: 'applied',
          appliedCompanies: ['Flipkart', 'Amazon'],
          offers: [],
          interviews: [],
          attendance: 85,
          backlogs: 1,
          profileStrength: 65,
          createdAt: '2021-06-15',
          lastActive: '2024-03-18',
          resumeUrl: '/resumes/amit.pdf'
        },
        {
          id: 4,
          name: 'Neha Singh',
          email: 'neha.singh@college.edu',
          phone: '+91 98765 43213',
          rollNo: 'EC2021067',
          department: 'Electronics',
          year: 4,
          semester: 8,
          cgpa: 8.2,
          skills: ['VLSI', 'Embedded C', 'MATLAB', 'Python'],
          projects: [
            { title: 'IoT Smart Home', technologies: ['Arduino', 'Raspberry Pi'], status: 'completed' }
          ],
          achievements: ['IEEE Paper Published'],
          placementStatus: 'shortlisted',
          appliedCompanies: ['Texas Instruments', 'Intel'],
          offers: [],
          interviews: [{ company: 'Texas Instruments', date: '2024-03-30', round: 'Technical' }],
          attendance: 88,
          backlogs: 0,
          profileStrength: 72,
          createdAt: '2021-06-15',
          lastActive: '2024-03-19',
          resumeUrl: '/resumes/neha.pdf'
        },
        {
          id: 5,
          name: 'Vikram Reddy',
          email: 'vikram.reddy@college.edu',
          phone: '+91 98765 43214',
          rollNo: 'ME2021089',
          department: 'Mechanical',
          year: 4,
          semester: 8,
          cgpa: 7.5,
          skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB'],
          projects: [
            { title: 'CAD Design Project', technologies: ['AutoCAD'], status: 'completed' }
          ],
          achievements: [],
          placementStatus: 'not_applied',
          appliedCompanies: [],
          offers: [],
          interviews: [],
          attendance: 75,
          backlogs: 2,
          profileStrength: 45,
          createdAt: '2021-06-15',
          lastActive: '2024-03-15',
          resumeUrl: '/resumes/vikram.pdf'
        },
        {
          id: 6,
          name: 'Sneha Gupta',
          email: 'sneha.gupta@college.edu',
          phone: '+91 98765 43215',
          rollNo: 'CS2022112',
          department: 'Computer Science',
          year: 3,
          semester: 6,
          cgpa: 9.2,
          skills: ['Python', 'C++', 'Data Structures', 'Algorithms', 'Machine Learning'],
          projects: [
            { title: 'ML Image Classifier', technologies: ['Python', 'TensorFlow'], status: 'completed' },
            { title: 'Portfolio Website', technologies: ['React', 'Tailwind'], status: 'completed' }
          ],
          achievements: ['Google Code Jam Finalist', 'GeeksforGeeks 5⭐'],
          placementStatus: 'eligible',
          appliedCompanies: [],
          offers: [],
          interviews: [],
          attendance: 98,
          backlogs: 0,
          profileStrength: 88,
          createdAt: '2022-06-15',
          lastActive: '2024-03-21',
          resumeUrl: '/resumes/sneha.pdf',
          linkedin: 'https://linkedin.com/in/sneha',
          github: 'https://github.com/sneha'
        }
      ];

      // Calculate stats
      const total = mockStudents.length;
      const placed = mockStudents.filter(s => s.placementStatus === 'placed').length;
      const interviewing = mockStudents.filter(s => s.placementStatus === 'interview').length;
      const applied = mockStudents.filter(s => s.placementStatus === 'applied').length;
      const eligible = mockStudents.filter(s => s.placementStatus === 'eligible').length;
      const notApplied = mockStudents.filter(s => s.placementStatus === 'not_applied').length;
      const averageCGPA = (mockStudents.reduce((sum, s) => sum + s.cgpa, 0) / total).toFixed(2);
      const placementRate = ((placed / total) * 100).toFixed(1);

      // Department-wise stats
      const departmentWise = {};
      mockStudents.forEach(s => {
        if (!departmentWise[s.department]) {
          departmentWise[s.department] = { total: 0, placed: 0, averageCGPA: 0, totalCGPA: 0 };
        }
        departmentWise[s.department].total++;
        departmentWise[s.department].totalCGPA += s.cgpa;
        if (s.placementStatus === 'placed') departmentWise[s.department].placed++;
      });
      Object.keys(departmentWise).forEach(dept => {
        departmentWise[dept].averageCGPA = (departmentWise[dept].totalCGPA / departmentWise[dept].total).toFixed(2);
      });

      // Year-wise stats
      const yearWise = {};
      mockStudents.forEach(s => {
        if (!yearWise[s.year]) {
          yearWise[s.year] = { total: 0, placed: 0 };
        }
        yearWise[s.year].total++;
        if (s.placementStatus === 'placed') yearWise[s.year].placed++;
      });

      // CGPA Distribution
      const cgpaDistribution = {
        '9+': mockStudents.filter(s => s.cgpa >= 9).length,
        '8-9': mockStudents.filter(s => s.cgpa >= 8 && s.cgpa < 9).length,
        '7-8': mockStudents.filter(s => s.cgpa >= 7 && s.cgpa < 8).length,
        '6-7': mockStudents.filter(s => s.cgpa >= 6 && s.cgpa < 7).length,
        '<6': mockStudents.filter(s => s.cgpa < 6).length
      };

      // Top performers
      const topPerformers = [...mockStudents]
        .sort((a, b) => b.cgpa - a.cgpa)
        .slice(0, 5)
        .map(s => ({ name: s.name, cgpa: s.cgpa, department: s.department, status: s.placementStatus }));

      setStats({
        total,
        placed,
        interviewing,
        applied,
        eligible,
        notApplied,
        averageCGPA,
        placementRate,
        topPerformers,
        departmentWise,
        yearWise,
        cgpaDistribution
      });

      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...students];

    if (searchTerm) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.placementStatus === filterStatus);
    }

    if (filterDepartment !== 'all') {
      filtered = filtered.filter(s => s.department === filterDepartment);
    }

    if (filterYear !== 'all') {
      filtered = filtered.filter(s => s.year === parseInt(filterYear));
    }

    if (filterCGPA !== 'all') {
      if (filterCGPA === '9+') filtered = filtered.filter(s => s.cgpa >= 9);
      else if (filterCGPA === '8-9') filtered = filtered.filter(s => s.cgpa >= 8 && s.cgpa < 9);
      else if (filterCGPA === '7-8') filtered = filtered.filter(s => s.cgpa >= 7 && s.cgpa < 8);
      else if (filterCGPA === '6-7') filtered = filtered.filter(s => s.cgpa >= 6 && s.cgpa < 7);
      else if (filterCGPA === '<6') filtered = filtered.filter(s => s.cgpa < 6);
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      if (sortBy === 'cgpa') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });

    setFilteredStudents(filtered);
  }, [searchTerm, filterStatus, filterDepartment, filterYear, filterCGPA, sortBy, sortOrder, students]);

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sId => sId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleBulkAction = () => {
    if (!bulkAction) return;
    
    if (bulkAction === 'email') {
      setShowEmailModal(true);
    } else if (bulkAction === 'export') {
      exportData();
    } else if (bulkAction === 'update_status') {
      // Update status logic
      const updatedStudents = students.map(s => {
        if (selectedStudents.includes(s.id)) {
          return { ...s, placementStatus: 'shortlisted' };
        }
        return s;
      });
      setStudents(updatedStudents);
      setSelectedStudents([]);
      setShowBulkActionModal(false);
    } else if (bulkAction === 'delete') {
      if (confirm('Are you sure you want to delete selected students?')) {
        const updatedStudents = students.filter(s => !selectedStudents.includes(s.id));
        setStudents(updatedStudents);
        setSelectedStudents([]);
        setShowBulkActionModal(false);
      }
    }
  };

  const exportData = () => {
    const data = selectedStudents.length > 0 
      ? students.filter(s => selectedStudents.includes(s.id))
      : filteredStudents;
    
    const csv = [
      ['Name', 'Email', 'Roll No', 'Department', 'Year', 'CGPA', 'Skills', 'Placement Status', 'Applied Companies', 'Offers'],
      ...data.map(s => [
        s.name,
        s.email,
        s.rollNo,
        s.department,
        s.year,
        s.cgpa,
        s.skills.join('; '),
        s.placementStatus,
        s.appliedCompanies.join('; '),
        s.offers.map(o => `${o.company}(${o.package})`).join('; ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendBulkEmail = async () => {
    setSendingEmail(true);
    // Simulate API call
    setTimeout(() => {
      setSendingEmail(false);
      setShowEmailModal(false);
      setEmailContent('');
      setEmailSubject('');
      alert(`Email sent to ${selectedStudents.length} students!`);
    }, 2000);
  };

  const getStatusBadge = (status) => {
    const config = {
      'placed': { bg: 'bg-green-100', text: 'text-green-800', icon: Trophy, label: 'Placed' },
      'interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar, label: 'Interview' },
      'shortlisted': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Star, label: 'Shortlisted' },
      'applied': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Send, label: 'Applied' },
      'eligible': { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: CheckCircle, label: 'Eligible' },
      'not_applied': { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle, label: 'Not Applied' }
    };
    const StatusIcon = config[status]?.icon || XCircle;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="w-3 h-3 mr-1" />
        {config[status]?.label}
      </span>
    );
  };

  const departments = ['all', 'Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'Civil', 'Electrical'];
  const years = ['all', '1', '2', '3', '4'];
  const statuses = ['all', 'placed', 'interview', 'shortlisted', 'applied', 'eligible', 'not_applied'];
  const cgpaRanges = ['all', '9+', '8-9', '7-8', '6-7', '<6'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Users className="h-8 w-8 mr-3" />
              Student Management System
            </h1>
            <p className="text-blue-100 text-lg">
              Comprehensive student tracking, analytics, and management
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setShowImportModal(true)}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center"
            >
              <Upload className="h-5 w-5 mr-2" />
              Import
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-green-600 mt-1">+12 this year</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4 border border-green-100 hover:shadow-md transition-all">
          <p className="text-sm text-green-600">Placed</p>
          <p className="text-2xl font-bold text-green-700">{stats.placed}</p>
          <p className="text-xs text-green-600">{stats.placementRate}% of total</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4 border border-purple-100 hover:shadow-md transition-all">
          <p className="text-sm text-purple-600">Interviewing</p>
          <p className="text-2xl font-bold text-purple-700">{stats.interviewing}</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4 border border-blue-100 hover:shadow-md transition-all">
          <p className="text-sm text-blue-600">Applied</p>
          <p className="text-2xl font-bold text-blue-700">{stats.applied}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4 border border-yellow-100 hover:shadow-md transition-all">
          <p className="text-sm text-yellow-600">Eligible</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.eligible}</p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-all">
          <p className="text-sm text-gray-600">Not Applied</p>
          <p className="text-2xl font-bold text-gray-700">{stats.notApplied}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl shadow-sm p-4 border border-indigo-100 hover:shadow-md transition-all">
          <p className="text-sm text-indigo-600">Avg CGPA</p>
          <p className="text-2xl font-bold text-indigo-700">{stats.averageCGPA}</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
              Placement Analytics Dashboard
            </h2>
            <button onClick={() => setShowAnalytics(false)} className="text-gray-400 hover:text-gray-600">
              <XCircle className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department-wise Stats */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Department-wise Performance</h3>
              <div className="space-y-3">
                {Object.entries(stats.departmentWise).map(([dept, data]) => (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{dept}</span>
                      <span className="text-gray-600">{data.placed}/{data.total} placed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2"
                        style={{ width: `${(data.placed / data.total) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Avg CGPA: {data.averageCGPA}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CGPA Distribution */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">CGPA Distribution</h3>
              <div className="space-y-3">
                {Object.entries(stats.cgpaDistribution).map(([range, count]) => (
                  <div key={range}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{range}</span>
                      <span className="text-gray-600">{count} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full h-2"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Year-wise Stats */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Year-wise Distribution</h3>
              <div className="space-y-3">
                {Object.entries(stats.yearWise).map(([year, data]) => (
                  <div key={year}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Year {year}</span>
                      <span className="text-gray-600">{data.placed}/{data.total} placed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-2"
                        style={{ width: `${(data.placed / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-4">🏆 Top Performers</h3>
              <div className="space-y-3">
                {stats.topPerformers.map((performer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{performer.name}</p>
                        <p className="text-xs text-gray-500">{performer.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">{performer.cgpa} CGPA</p>
                      <p className="text-xs text-gray-500">{performer.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, email, roll no, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year === 'all' ? 'All Years' : `Year ${year}`}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={filterCGPA}
            onChange={(e) => setFilterCGPA(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cgpaRanges.map(range => (
              <option key={range} value={range}>{range === 'all' ? 'All CGPA' : `${range} CGPA`}</option>
            ))}
          </select>
        </div>

        {/* Sort Controls */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
            >
              <option value="name">Name</option>
              <option value="cgpa">CGPA</option>
              <option value="year">Year</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 hover:bg-gray-100 rounded-lg"
            >
              {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedStudents.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between animate-slideDown">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">{selectedStudents.length} students selected</span>
          </div>
          <div className="flex space-x-3">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Bulk Actions</option>
              <option value="email">Send Email</option>
              <option value="update_status">Update Status</option>
              <option value="export">Export Selected</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              Apply
            </button>
            <button
              onClick={() => setSelectedStudents([])}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Students Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">{student.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{student.name}</h3>
                      <p className="text-xs text-blue-100">{student.rollNo}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleSelectStudent(student.id)}
                    className="w-5 h-5 rounded border-white bg-white bg-opacity-20 checked:bg-white"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{student.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">{student.cgpa} CGPA</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {student.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {student.skills.length > 3 && (
                    <span className="text-xs text-gray-400">+{student.skills.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  {getStatusBadge(student.placementStatus)}
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Year {student.year}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Profile Strength</span>
                    <span className="text-blue-600">{student.profileStrength}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-1.5"
                      style={{ width: `${student.profileStrength}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowDetailsModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">CGPA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Skills</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.email}</p>
                          <p className="text-xs text-gray-400">{student.rollNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Year {student.year}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${student.cgpa >= 8 ? 'text-green-600' : student.cgpa >= 7 ? 'text-yellow-600' : 'text-orange-600'}`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {student.skills.length > 2 && (
                          <span className="text-xs text-gray-500">+{student.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(student.placementStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                  <p className="text-gray-600">{selectedStudent.rollNo} • {selectedStudent.department} • Year {selectedStudent.year}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{selectedStudent.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{selectedStudent.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">CGPA</p>
                  <p className="font-medium text-gray-900">{selectedStudent.cgpa}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="font-medium text-gray-900">{selectedStudent.attendance}%</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              {selectedStudent.projects?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Projects</h3>
                  <div className="space-y-2">
                    {selectedStudent.projects.map((project, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-gray-900">{project.title}</h4>
                          <span className="text-xs text-gray-500">{project.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {selectedStudent.achievements?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Achievements</h3>
                  <div className="space-y-1">
                    {selectedStudent.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placement Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Placement Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Applied Companies</p>
                    <p className="font-medium text-gray-900">{selectedStudent.appliedCompanies.join(', ') || 'None'}</p>
                  </div>
                  {selectedStudent.offers?.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Offers</p>
                      {selectedStudent.offers.map((offer, idx) => (
                        <p key={idx} className="font-medium text-gray-900">
                          {offer.company} - {offer.package} ({offer.status})
                        </p>
                      ))}
                    </div>
                  )}
                  {selectedStudent.interviews?.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Upcoming Interviews</p>
                      {selectedStudent.interviews.map((interview, idx) => (
                        <p key={idx} className="font-medium text-gray-900">
                          {interview.company} - {interview.round} on {new Date(interview.date).toLocaleDateString()}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Social & Professional</h3>
                <div className="flex space-x-3">
                  {selectedStudent.linkedin && (
                    <a href={selectedStudent.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {selectedStudent.github && (
                    <a href={selectedStudent.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {selectedStudent.portfolio && (
                    <a href={selectedStudent.portfolio} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Send Email</h3>
              <button onClick={() => setShowEmailModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={sendBulkEmail}
                  disabled={sendingEmail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                >
                  {sendingEmail ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Export Data</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">CSV Format</p>
                    <p className="text-sm text-gray-500">Excel compatible format</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Excel Format</p>
                    <p className="text-sm text-gray-500">.xlsx format with formatting</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    exportData();
                    setShowExportModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Import Students</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop your file here</p>
              <p className="text-xs text-gray-500">or</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Browse Files
              </button>
              <p className="text-xs text-gray-500 mt-3">Supports: CSV, Excel</p>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;