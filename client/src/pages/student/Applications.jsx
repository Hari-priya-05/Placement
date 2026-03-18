import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock as Hourglass,
  TrendingUp,
  Award,
  Eye,
  FileText,
  Download,
  Share2,
  ChevronRight,
  ChevronLeft,
  Filter,
  Search,
  Star,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Sparkles,
  Bell,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  BookOpen,
  Users,
  Target,
  Rocket
} from 'lucide-react';

const Applications = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({});
  const [showTimeline, setShowTimeline] = useState(false);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockApplications = [
        {
          id: 101,
          jobTitle: 'Senior Frontend Developer',
          company: 'Google',
          companyLogo: 'G',
          color: 'from-blue-500 to-blue-600',
          location: 'Bangalore, India',
          salary: '₹45-60 LPA',
          type: 'Full-time',
          status: 'Interview',
          appliedDate: '2024-03-10',
          lastUpdate: '2024-03-15',
          experience: '3-5 years',
          skills: ['React', 'TypeScript', 'Next.js', 'Redux'],
          description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building responsive web applications using modern frameworks.',
          requirements: [
            'Strong experience with React and TypeScript',
            'Knowledge of Next.js and modern frontend tools',
            'Understanding of web performance optimization',
            'Experience with state management'
          ],
          timeline: [
            { date: '2024-03-10', event: 'Application Submitted', status: 'completed', description: 'Your application has been received' },
            { date: '2024-03-12', event: 'Application Reviewed', status: 'completed', description: 'HR reviewed your profile' },
            { date: '2024-03-14', event: 'Shortlisted', status: 'completed', description: 'You have been shortlisted for interview' },
            { date: '2024-03-18', event: 'Technical Interview', status: 'upcoming', description: 'First round technical interview' },
            { date: '2024-03-22', event: 'Final Decision', status: 'pending', description: 'Awaiting final outcome' }
          ],
          interviewDetails: {
            round: 'Technical Interview',
            date: 'March 18, 2024',
            time: '11:00 AM',
            duration: '60 minutes',
            mode: 'Virtual (Google Meet)',
            interviewer: 'Sarah Johnson (Senior Engineer)',
            preparation: [
              'Review Data Structures & Algorithms',
              'Practice React concepts',
              'Prepare project explanations',
              'Review system design basics'
            ],
            topics: ['React', 'JavaScript', 'System Design', 'Problem Solving'],
            meetingLink: 'https://meet.google.com/abc-defg-hij',
            contactPerson: {
              name: 'HR Team',
              email: 'hiring@google.com',
              phone: '+91 98765 43210'
            }
          },
          notes: [
            { date: '2024-03-15', note: 'HR called to schedule interview' },
            { date: '2024-03-14', note: 'Application shortlisted' }
          ],
          attachments: [
            { name: 'Resume.pdf', size: '245 KB' },
            { name: 'Cover_Letter.pdf', size: '120 KB' },
            { name: 'Portfolio.pdf', size: '1.2 MB' }
          ]
        },
        {
          id: 102,
          jobTitle: 'Backend Engineer',
          company: 'Microsoft',
          companyLogo: 'M',
          color: 'from-purple-500 to-purple-600',
          location: 'Hyderabad, India',
          salary: '₹40-55 LPA',
          type: 'Full-time',
          status: 'Shortlisted',
          appliedDate: '2024-03-12',
          lastUpdate: '2024-03-16',
          experience: '2-4 years',
          skills: ['Node.js', 'Python', 'AWS', 'Docker'],
          description: 'Join our backend team to build scalable APIs and microservices.',
          requirements: [
            'Proficiency in Node.js or Python',
            'Experience with databases',
            'Knowledge of RESTful APIs',
            'Understanding of cloud services'
          ],
          timeline: [
            { date: '2024-03-12', event: 'Application Submitted', status: 'completed' },
            { date: '2024-03-15', event: 'Application Reviewed', status: 'completed' },
            { date: '2024-03-16', event: 'Shortlisted', status: 'current' },
            { date: '2024-03-20', event: 'Technical Interview', status: 'upcoming' }
          ],
          interviewDetails: {
            round: 'Technical Interview',
            date: 'March 20, 2024',
            time: '2:00 PM',
            duration: '75 minutes',
            mode: 'Virtual (Teams)',
            interviewer: 'Rahul Verma (Tech Lead)',
            preparation: [
              'Review system design',
              'Practice coding problems',
              'Prepare previous projects'
            ],
            topics: ['System Design', 'Algorithms', 'Database Design'],
            meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc',
            contactPerson: {
              name: 'Recruitment Team',
              email: 'careers@microsoft.com'
            }
          },
          notes: [],
          attachments: [
            { name: 'Resume.pdf', size: '245 KB' },
            { name: 'Projects.pdf', size: '890 KB' }
          ]
        },
        {
          id: 103,
          jobTitle: 'Data Scientist',
          company: 'Amazon',
          companyLogo: 'A',
          color: 'from-orange-500 to-orange-600',
          location: 'Chennai, India',
          salary: '₹35-50 LPA',
          type: 'Full-time',
          status: 'Applied',
          appliedDate: '2024-03-15',
          lastUpdate: '2024-03-15',
          experience: '2-4 years',
          skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
          description: 'Looking for a data scientist to analyze complex data and build ML models.',
          requirements: [
            'Strong Python skills',
            'Experience with ML frameworks',
            'Statistical analysis',
            'Data visualization'
          ],
          timeline: [
            { date: '2024-03-15', event: 'Application Submitted', status: 'current' },
            { date: '2024-03-18', event: 'Under Review', status: 'upcoming' }
          ],
          notes: [],
          attachments: [
            { name: 'Resume.pdf', size: '245 KB' },
            { name: 'Research_Papers.pdf', size: '2.1 MB' }
          ]
        },
        {
          id: 104,
          jobTitle: 'Full Stack Developer',
          company: 'Flipkart',
          companyLogo: 'F',
          color: 'from-yellow-500 to-yellow-600',
          location: 'Bangalore, India',
          salary: '₹30-45 LPA',
          type: 'Full-time',
          status: 'Selected',
          appliedDate: '2024-03-05',
          lastUpdate: '2024-03-18',
          experience: '2-4 years',
          skills: ['React', 'Node.js', 'MongoDB', 'Express'],
          description: 'Exciting opportunity for a full stack developer to work on our flagship e-commerce platform.',
          requirements: [
            'Experience with React and Node.js',
            'Knowledge of databases',
            'Understanding of cloud services',
            'Problem-solving skills'
          ],
          timeline: [
            { date: '2024-03-05', event: 'Application Submitted', status: 'completed' },
            { date: '2024-03-07', event: 'Application Reviewed', status: 'completed' },
            { date: '2024-03-09', event: 'Shortlisted', status: 'completed' },
            { date: '2024-03-12', event: 'Technical Interview', status: 'completed' },
            { date: '2024-03-15', event: 'HR Interview', status: 'completed' },
            { date: '2024-03-18', event: 'Offer Received', status: 'completed' }
          ],
          offerDetails: {
            package: '₹32 LPA',
            joiningDate: 'June 1, 2024',
            location: 'Bangalore',
            role: 'SDE II',
            benefits: [
              'Health Insurance',
              'Stock Options',
              'Relocation Assistance',
              'Learning Budget'
            ],
            documents: [
              'Offer Letter',
              'Terms & Conditions',
              'NDA Agreement'
            ],
            deadline: 'March 25, 2024'
          },
          attachments: [
            { name: 'Resume.pdf', size: '245 KB' },
            { name: 'Offer_Letter.pdf', size: '450 KB' }
          ]
        },
        {
          id: 105,
          jobTitle: 'DevOps Engineer',
          company: 'Uber',
          companyLogo: 'U',
          color: 'from-gray-800 to-black',
          location: 'Bangalore, India',
          salary: '₹35-50 LPA',
          type: 'Full-time',
          status: 'Rejected',
          appliedDate: '2024-03-01',
          lastUpdate: '2024-03-10',
          experience: '3-5 years',
          skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
          description: 'Join our infrastructure team to build and maintain cloud infrastructure.',
          requirements: [
            'Experience with AWS/Azure',
            'Knowledge of Docker and Kubernetes',
            'Scripting skills',
            'CI/CD pipeline experience'
          ],
          timeline: [
            { date: '2024-03-01', event: 'Application Submitted', status: 'completed' },
            { date: '2024-03-03', event: 'Application Reviewed', status: 'completed' },
            { date: '2024-03-05', event: 'Technical Assessment', status: 'completed' },
            { date: '2024-03-08', event: 'Technical Interview', status: 'completed' },
            { date: '2024-03-10', event: 'Application Rejected', status: 'completed' }
          ],
          feedback: {
            reason: 'Technical skills not matching',
            details: 'We were looking for more experience with Kubernetes and Terraform',
            suggestions: [
              'Take advanced Kubernetes certification',
              'Build more infrastructure projects',
              'Gain experience with Terraform'
            ]
          },
          attachments: [
            { name: 'Resume.pdf', size: '245 KB' }
          ]
        },
        {
          id: 106,
          jobTitle: 'Product Manager',
          company: 'Goldman Sachs',
          companyLogo: 'G',
          color: 'from-blue-700 to-blue-800',
          location: 'Mumbai, India',
          salary: '₹40-55 LPA',
          type: 'Full-time',
          status: 'Interview',
          appliedDate: '2024-03-08',
          lastUpdate: '2024-03-14',
          experience: '3-5 years',
          skills: ['Product Strategy', 'Analytics', 'Agile', 'Communication'],
          description: 'Lead product development initiatives for our investment banking division.',
          requirements: [
            'Experience in product management',
            'Strong analytical skills',
            'Excellent communication',
            'Domain knowledge in finance'
          ],
          timeline: [
            { date: '2024-03-08', event: 'Application Submitted', status: 'completed' },
            { date: '2024-03-11', event: 'Application Reviewed', status: 'completed' },
            { date: '2024-03-13', event: 'Shortlisted', status: 'completed' },
            { date: '2024-03-19', event: 'Case Study Round', status: 'upcoming' }
          ],
          interviewDetails: {
            round: 'Case Study',
            date: 'March 19, 2024',
            time: '3:30 PM',
            duration: '90 minutes',
            mode: 'Virtual',
            topics: ['Product Strategy', 'Market Analysis', 'Metrics']
          }
        }
      ];

      // Calculate stats
      const statusCounts = {
        all: mockApplications.length,
        applied: mockApplications.filter(a => a.status === 'Applied').length,
        shortlisted: mockApplications.filter(a => a.status === 'Shortlisted').length,
        interview: mockApplications.filter(a => a.status === 'Interview').length,
        selected: mockApplications.filter(a => a.status === 'Selected').length,
        rejected: mockApplications.filter(a => a.status === 'Rejected').length
      };

      setStats({
        total: mockApplications.length,
        ...statusCounts,
        responseRate: 68,
        avgResponseTime: '3.2 days',
        interviewRate: 42
      });

      setApplications(mockApplications);
      setSelectedApplication(mockApplications[0]);
      setLoading(false);
    }, 1500);
  }, []);

  const getStatusBadge = (status) => {
    const config = {
      'Applied': { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Applied' },
      'Shortlisted': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Shortlisted' },
      'Interview': { bg: 'bg-purple-100', text: 'text-purple-800', icon: Calendar, label: 'Interview' },
      'Selected': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Award, label: 'Selected' },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Rejected' }
    };
    const StatusIcon = config[status]?.icon || Clock;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config[status]?.bg} ${config[status]?.text}`}>
        <StatusIcon className="h-3 w-3 mr-1" />
        {config[status]?.label}
      </span>
    );
  };

  const getTimelineStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current': return <Zap className="h-5 w-5 text-blue-500 animate-pulse" />;
      case 'upcoming': return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <HelpCircle className="h-5 w-5 text-gray-300" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter !== 'all' && app.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return app.jobTitle.toLowerCase().includes(term) ||
             app.company.toLowerCase().includes(term) ||
             app.skills.some(s => s.toLowerCase().includes(term));
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="h-8 w-8 text-blue-600 animate-pulse" />
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
          <Briefcase className="h-8 w-8 mr-3" />
          My Applications
        </h1>
        <p className="text-blue-100 text-lg">
          Track and manage all your job applications in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4 border border-blue-100">
          <p className="text-sm text-blue-600">Applied</p>
          <p className="text-2xl font-bold text-blue-700">{stats.applied}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4 border border-green-100">
          <p className="text-sm text-green-600">Shortlisted</p>
          <p className="text-2xl font-bold text-green-700">{stats.shortlisted}</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4 border border-purple-100">
          <p className="text-sm text-purple-600">Interviews</p>
          <p className="text-2xl font-bold text-purple-700">{stats.interview}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4 border border-yellow-100">
          <p className="text-sm text-yellow-600">Selected</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.selected}</p>
        </div>
        <div className="bg-red-50 rounded-xl shadow-sm p-4 border border-red-100">
          <p className="text-sm text-red-600">Rejected</p>
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl shadow-sm p-4 border border-indigo-100">
          <p className="text-sm text-indigo-600">Response</p>
          <p className="text-2xl font-bold text-indigo-700">{stats.responseRate}%</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {['all', 'applied', 'shortlisted', 'interview', 'selected', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplication(app)}
              className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer transition-all border-2 ${
                selectedApplication?.id === app.id
                  ? 'border-blue-500 shadow-md'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${app.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {app.companyLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{app.jobTitle}</h3>
                    {getStatusBadge(app.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{app.company}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {app.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
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
          ))}

          {filteredApplications.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-sm text-gray-600">Try adjusting your filters or search</p>
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedApplication.color} rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
                    {selectedApplication.companyLogo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.jobTitle}</h2>
                    <p className="text-gray-600">{selectedApplication.company}</p>
                  </div>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-gray-900 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                    {selectedApplication.location.split(',')[0]}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Salary</p>
                  <p className="font-medium text-gray-900">{selectedApplication.salary}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-gray-900">{selectedApplication.type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Experience</p>
                  <p className="font-medium text-gray-900">{selectedApplication.experience}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setShowTimeline(false)}
                    className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                      !showTimeline
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setShowTimeline(true)}
                    className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                      showTimeline
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Timeline
                  </button>
                </div>
              </div>

              {!showTimeline ? (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      Job Description
                    </h3>
                    <p className="text-sm text-gray-600">{selectedApplication.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedApplication.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interview Details (if status is Interview) */}
                  {selectedApplication.status === 'Interview' && selectedApplication.interviewDetails && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                      <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Upcoming Interview
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-purple-700">Date & Time</p>
                            <p className="font-medium text-purple-900">{selectedApplication.interviewDetails.date} at {selectedApplication.interviewDetails.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-700">Duration</p>
                            <p className="font-medium text-purple-900">{selectedApplication.interviewDetails.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-700">Mode</p>
                            <p className="font-medium text-purple-900">{selectedApplication.interviewDetails.mode}</p>
                          </div>
                          <div>
                            <p className="text-xs text-purple-700">Interviewer</p>
                            <p className="font-medium text-purple-900">{selectedApplication.interviewDetails.interviewer}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-purple-700 mb-1">Topics to Cover</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedApplication.interviewDetails.topics?.map((topic, idx) => (
                              <span key={idx} className="px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-purple-700 mb-1">Preparation Tips</p>
                          <ul className="list-disc list-inside">
                            {selectedApplication.interviewDetails.preparation?.map((tip, idx) => (
                              <li key={idx} className="text-xs text-purple-800">{tip}</li>
                            ))}
                          </ul>
                        </div>

                        <a
                          href={selectedApplication.interviewDetails.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Meeting
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Offer Details (if status is Selected) */}
                  {selectedApplication.status === 'Selected' && selectedApplication.offerDetails && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Offer Details
                      </h3>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-green-700">Package</p>
                          <p className="font-bold text-green-900 text-lg">{selectedApplication.offerDetails.package}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700">Joining Date</p>
                          <p className="font-medium text-green-900">{selectedApplication.offerDetails.joiningDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700">Location</p>
                          <p className="font-medium text-green-900">{selectedApplication.offerDetails.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700">Role</p>
                          <p className="font-medium text-green-900">{selectedApplication.offerDetails.role}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-green-700 mb-1">Benefits</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.offerDetails.benefits.map((benefit, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-red-600 mt-3">Accept by: {selectedApplication.offerDetails.deadline}</p>
                    </div>
                  )}

                  {/* Feedback (if status is Rejected) */}
                  {selectedApplication.status === 'Rejected' && selectedApplication.feedback && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                      <h3 className="font-semibold text-red-900 mb-2 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        Feedback
                      </h3>
                      <p className="text-sm text-red-800 mb-2"><span className="font-medium">Reason:</span> {selectedApplication.feedback.reason}</p>
                      <p className="text-sm text-red-800 mb-3">{selectedApplication.feedback.details}</p>
                      <p className="text-xs font-medium text-red-900 mb-2">Suggestions for improvement:</p>
                      <ul className="list-disc list-inside">
                        {selectedApplication.feedback.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-xs text-red-800">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Attachments */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {selectedApplication.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({file.size})</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedApplication.notes && selectedApplication.notes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Activity Notes</h3>
                      <div className="space-y-2">
                        {selectedApplication.notes.map((note, idx) => (
                          <div key={idx} className="flex items-start p-2 bg-gray-50 rounded-lg">
                            <MessageCircle className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm text-gray-700">{note.note}</p>
                              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      <MessageCircle className="h-4 w-4 inline mr-2" />
                      Contact Recruiter
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Timeline View */
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Application Timeline</h3>
                  <div className="relative">
                    {selectedApplication.timeline.map((item, index) => (
                      <div key={index} className="flex items-start mb-6 relative">
                        {/* Timeline line */}
                        {index < selectedApplication.timeline.length - 1 && (
                          <div className="absolute left-5 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
                          {getTimelineStatusIcon(item.status)}
                        </div>
                        
                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{item.event}</h4>
                            <span className="text-xs text-gray-500">{item.date}</span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
              <p className="text-sm text-gray-600">Choose an application from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;