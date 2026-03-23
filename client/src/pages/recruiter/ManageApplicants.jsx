import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Star,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  MessageCircle,
  Send,
  Loader,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX,
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
  Settings,
  Maximize2,
  Minimize2,
  Layout,
  Grid,
  List,
  Filter as FilterIcon,
  Plus,
  Minus,
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
  DollarSign,
  Globe,
  Linkedin,
  Github,
  Twitter,
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
  Handshake
} from 'lucide-react';

const ManageApplicants = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterJob, setFilterJob] = useState('all');
  const [filterScore, setFilterScore] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    mode: 'Virtual',
    link: '',
    interviewer: ''
  });
  const [statusHistory, setStatusHistory] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    reviewed: 0,
    shortlisted: 0,
    interview: 0,
    offered: 0,
    hired: 0,
    rejected: 0,
    averageScore: 0,
    responseRate: 0
  });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockApplicants = [
        {
          id: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@college.edu',
          phone: '+91 98765 43210',
          position: 'Frontend Developer',
          appliedDate: '2024-03-15',
          experience: '3 years',
          skills: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
          cgpa: 8.7,
          resume: '/resumes/rahul.pdf',
          portfolio: 'https://rahul.dev',
          linkedin: 'https://linkedin.com/in/rahul',
          github: 'https://github.com/rahul',
          status: 'shortlisted',
          statusHistory: [
            { status: 'applied', date: '2024-03-15', note: 'Application received' },
            { status: 'reviewed', date: '2024-03-16', note: 'Resume reviewed' },
            { status: 'shortlisted', date: '2024-03-17', note: 'Shortlisted for interview' }
          ],
          interviewScore: 85,
          notes: [
            { date: '2024-03-17', note: 'Strong React skills, good communication' }
          ],
          interviewSchedule: {
            date: '2024-03-25',
            time: '11:00 AM',
            mode: 'Virtual',
            link: 'https://meet.google.com/abc-defg-hij',
            interviewer: 'Priya Sharma (Tech Lead)'
          },
          matchScore: 92
        },
        {
          id: 2,
          name: 'Priya Patel',
          email: 'priya.patel@college.edu',
          phone: '+91 98765 43211',
          position: 'Backend Engineer',
          appliedDate: '2024-03-14',
          experience: '4 years',
          skills: ['Node.js', 'Python', 'AWS', 'Docker'],
          cgpa: 8.9,
          resume: '/resumes/priya.pdf',
          github: 'https://github.com/priya',
          status: 'interview',
          statusHistory: [
            { status: 'applied', date: '2024-03-14', note: 'Application received' },
            { status: 'shortlisted', date: '2024-03-15', note: 'Shortlisted' },
            { status: 'interview', date: '2024-03-16', note: 'Interview scheduled' }
          ],
          interviewScore: 88,
          notes: [],
          interviewSchedule: {
            date: '2024-03-26',
            time: '2:00 PM',
            mode: 'Virtual',
            link: 'https://teams.microsoft.com/l/meetup-join/abc',
            interviewer: 'Rahul Verma (Engineering Manager)'
          },
          matchScore: 95
        },
        {
          id: 3,
          name: 'Amit Kumar',
          email: 'amit.kumar@college.edu',
          phone: '+91 98765 43212',
          position: 'Full Stack Developer',
          appliedDate: '2024-03-13',
          experience: '2 years',
          skills: ['React', 'Node.js', 'MongoDB', 'Express'],
          cgpa: 7.8,
          resume: '/resumes/amit.pdf',
          status: 'applied',
          statusHistory: [
            { status: 'applied', date: '2024-03-13', note: 'Application received' }
          ],
          interviewScore: 0,
          notes: [],
          matchScore: 78
        },
        {
          id: 4,
          name: 'Neha Singh',
          email: 'neha.singh@college.edu',
          phone: '+91 98765 43213',
          position: 'Frontend Developer',
          appliedDate: '2024-03-12',
          experience: '3 years',
          skills: ['React', 'Vue.js', 'Angular', 'CSS'],
          cgpa: 8.2,
          resume: '/resumes/neha.pdf',
          status: 'offered',
          statusHistory: [
            { status: 'applied', date: '2024-03-12', note: 'Application received' },
            { status: 'shortlisted', date: '2024-03-13', note: 'Shortlisted' },
            { status: 'interview', date: '2024-03-15', note: 'Interview completed' },
            { status: 'offered', date: '2024-03-18', note: 'Offer sent' }
          ],
          interviewScore: 92,
          notes: [],
          matchScore: 88
        },
        {
          id: 5,
          name: 'Vikram Reddy',
          email: 'vikram.reddy@college.edu',
          phone: '+91 98765 43214',
          position: 'DevOps Engineer',
          appliedDate: '2024-03-11',
          experience: '5 years',
          skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
          cgpa: 7.5,
          resume: '/resumes/vikram.pdf',
          status: 'rejected',
          statusHistory: [
            { status: 'applied', date: '2024-03-11', note: 'Application received' },
            { status: 'reviewed', date: '2024-03-12', note: 'Resume reviewed' },
            { status: 'rejected', date: '2024-03-13', note: 'Skills mismatch' }
          ],
          interviewScore: 0,
          notes: [],
          matchScore: 65
        }
      ];

      setApplicants(mockApplicants);
      setFilteredApplicants(mockApplicants);
      
      // Calculate stats
      const total = mockApplicants.length;
      const newCount = mockApplicants.filter(a => a.status === 'applied').length;
      const shortlisted = mockApplicants.filter(a => a.status === 'shortlisted').length;
      const interview = mockApplicants.filter(a => a.status === 'interview').length;
      const offered = mockApplicants.filter(a => a.status === 'offered').length;
      const hired = mockApplicants.filter(a => a.status === 'hired').length;
      const rejected = mockApplicants.filter(a => a.status === 'rejected').length;
      const averageScore = Math.round(mockApplicants.reduce((sum, a) => sum + a.matchScore, 0) / total);
      
      setStats({
        total,
        new: newCount,
        reviewed: mockApplicants.filter(a => a.status !== 'applied').length,
        shortlisted,
        interview,
        offered,
        hired,
        rejected,
        averageScore,
        responseRate: Math.round((shortlisted + interview + offered + hired) / total * 100)
      });
      
      setLoading(false);
    }, 1500);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...applicants];

    if (searchTerm) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(a => a.status === filterStatus);
    }

    if (filterJob !== 'all') {
      filtered = filtered.filter(a => a.position === filterJob);
    }

    if (filterScore !== 'all') {
      if (filterScore === '90+') filtered = filtered.filter(a => a.matchScore >= 90);
      else if (filterScore === '80-89') filtered = filtered.filter(a => a.matchScore >= 80 && a.matchScore < 90);
      else if (filterScore === '70-79') filtered = filtered.filter(a => a.matchScore >= 70 && a.matchScore < 80);
      else if (filterScore === '<70') filtered = filtered.filter(a => a.matchScore < 70);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.appliedDate) - new Date(a.appliedDate)
          : new Date(a.appliedDate) - new Date(b.appliedDate);
      } else if (sortBy === 'name') {
        return sortOrder === 'desc'
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      } else if (sortBy === 'score') {
        return sortOrder === 'desc'
          ? b.matchScore - a.matchScore
          : a.matchScore - b.matchScore;
      }
      return 0;
    });

    setFilteredApplicants(filtered);
  }, [searchTerm, filterStatus, filterJob, filterScore, sortBy, sortOrder, applicants]);

  const handleStatusUpdate = (applicant, newStatus) => {
    const updatedApplicants = applicants.map(a => {
      if (a.id === applicant.id) {
        const newHistory = [...a.statusHistory, {
          status: newStatus,
          date: new Date().toISOString().split('T')[0],
          note: `Status changed to ${newStatus}`
        }];
        return { ...a, status: newStatus, statusHistory: newHistory };
      }
      return a;
    });
    setApplicants(updatedApplicants);
    setShowStatusModal(false);
    setNewStatus('');
  };

  const handleAddNote = (applicant) => {
    if (!newNotes.trim()) return;
    
    const updatedApplicants = applicants.map(a => {
      if (a.id === applicant.id) {
        const newNotesList = [...a.notes, {
          date: new Date().toISOString().split('T')[0],
          note: newNotes
        }];
        return { ...a, notes: newNotesList };
      }
      return a;
    });
    setApplicants(updatedApplicants);
    setShowNotesModal(false);
    setNewNotes('');
  };

  const handleScheduleInterview = (applicant) => {
    if (!interviewDetails.date || !interviewDetails.time) return;
    
    const updatedApplicants = applicants.map(a => {
      if (a.id === applicant.id) {
        return {
          ...a,
          status: 'interview',
          interviewSchedule: interviewDetails,
          statusHistory: [...a.statusHistory, {
            status: 'interview',
            date: new Date().toISOString().split('T')[0],
            note: `Interview scheduled for ${interviewDetails.date} at ${interviewDetails.time}`
          }]
        };
      }
      return a;
    });
    setApplicants(updatedApplicants);
    setShowScheduleModal(false);
    setInterviewDetails({ date: '', time: '', mode: 'Virtual', link: '', interviewer: '' });
  };

  const getStatusBadge = (status) => {
    const config = {
      'applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Applied' },
      'reviewed': { bg: 'bg-cyan-100', text: 'text-cyan-800', icon: Eye, label: 'Reviewed' },
      'shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: Star, label: 'Shortlisted' },
      'interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar, label: 'Interview' },
      'offered': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award, label: 'Offered' },
      'hired': { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: CheckCircle, label: 'Hired' },
      'rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' }
    };
    const StatusIcon = config[status]?.icon || Clock;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="w-3 h-3 mr-1" />
        {config[status]?.label}
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

  const statusOptions = [
    { value: 'applied', label: 'Applied', icon: Clock, color: 'blue' },
    { value: 'reviewed', label: 'Reviewed', icon: Eye, color: 'cyan' },
    { value: 'shortlisted', label: 'Shortlisted', icon: Star, color: 'green' },
    { value: 'interview', label: 'Interview', icon: Calendar, color: 'purple' },
    { value: 'offered', label: 'Offered', icon: Award, color: 'yellow' },
    { value: 'hired', label: 'Hired', icon: CheckCircle, color: 'emerald' },
    { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'red' }
  ];

  const jobs = ['all', 'Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer'];
  const scoreRanges = ['all', '90+', '80-89', '70-79', '<70'];

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
              Applicant Management
            </h1>
            <p className="text-blue-100 text-lg">
              Track and manage all job applicants with real-time status updates
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center">
              <Download className="h-5 w-5 mr-2" />
              Export Report
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Bulk Email
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-blue-600">New</p>
          <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-600">Shortlisted</p>
          <p className="text-2xl font-bold text-green-700">{stats.shortlisted}</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-purple-600">Interview</p>
          <p className="text-2xl font-bold text-purple-700">{stats.interview}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-600">Offered</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.offered}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-emerald-600">Hired</p>
          <p className="text-2xl font-bold text-emerald-700">{stats.hired}</p>
        </div>
        <div className="bg-red-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-red-600">Rejected</p>
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-indigo-600">Avg Score</p>
          <p className="text-2xl font-bold text-indigo-700">{stats.averageScore}%</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={filterJob}
            onChange={(e) => setFilterJob(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {jobs.map(job => (
              <option key={job} value={job}>{job === 'all' ? 'All Jobs' : job}</option>
            ))}
          </select>

          <select
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {scoreRanges.map(range => (
              <option key={range} value={range}>{range === 'all' ? 'All Scores' : `${range}% Match`}</option>
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
              <option value="date">Application Date</option>
              <option value="name">Name</option>
              <option value="score">Match Score</option>
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

      {/* Applicants Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {applicant.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{applicant.name}</h3>
                      <p className="text-xs text-gray-500">{applicant.position}</p>
                    </div>
                  </div>
                  {getStatusBadge(applicant.status)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Match Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Match Score</span>
                  <div className="flex items-center">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(applicant.matchScore)} ${getScoreColor(applicant.matchScore)}`}>
                      {applicant.matchScore}%
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {applicant.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {applicant.skills.length > 4 && (
                      <span className="text-xs text-gray-400">+{applicant.skills.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                    Experience: {applicant.experience}
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-gray-400" />
                    CGPA: {applicant.cgpa}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedApplicant(applicant);
                      setShowStatusModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Update Status
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setShowNotesModal(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      title="Add Note"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedApplicant(applicant);
                        setShowScheduleModal(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                      title="Schedule Interview"
                    >
                      <Calendar className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => window.open(applicant.resume)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      title="View Resume"
                    >
                      <FileText className="h-4 w-4" />
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Applicant</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Skills</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Match</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Applied</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {applicant.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{applicant.name}</p>
                          <p className="text-xs text-gray-500">{applicant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{applicant.position}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                        {applicant.skills.length > 2 && (
                          <span className="text-xs text-gray-400">+{applicant.skills.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(applicant.matchScore)} ${getScoreColor(applicant.matchScore)}`}>
                        {applicant.matchScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(applicant.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowStatusModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Update Status"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowNotesModal(true);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Add Note"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplicant(applicant);
                            setShowScheduleModal(true);
                          }}
                          className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Schedule Interview"
                        >
                          <Calendar className="h-4 w-4" />
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

      {filteredApplicants.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Update Status</h3>
              <button onClick={() => setShowStatusModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Applicant: <span className="font-medium text-gray-900">{selectedApplicant.name}</span></p>
                <p className="text-sm text-gray-600 mb-4">Current: {getStatusBadge(selectedApplicant.status)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select status...</option>
                  {statusOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
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
                  onClick={() => handleStatusUpdate(selectedApplicant, newStatus)}
                  disabled={!newStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Notes Modal */}
      {showNotesModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add Note</h3>
              <button onClick={() => setShowNotesModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Applicant: <span className="font-medium text-gray-900">{selectedApplicant.name}</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add your notes about this candidate..."
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddNote(selectedApplicant)}
                  disabled={!newNotes.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Schedule Interview</h3>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Applicant: <span className="font-medium text-gray-900">{selectedApplicant.name}</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
                <select
                  value={interviewDetails.mode}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Virtual">Virtual</option>
                  <option value="On-site">On-site</option>
                  <option value="Phone">Phone</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link (if virtual)</label>
                <input
                  type="url"
                  value={interviewDetails.link}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, link: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer</label>
                <input
                  type="text"
                  value={interviewDetails.interviewer}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, interviewer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Name and role"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleScheduleInterview(selectedApplicant)}
                  disabled={!interviewDetails.date || !interviewDetails.time}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicants;