import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Users, 
  Eye, 
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Download,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          location: 'Bangalore',
          applications: 24,
          shortlisted: 8,
          interviewed: 4,
          selected: 2,
          status: 'active',
          posted: '2024-01-15',
          deadline: '2024-12-31',
          views: 345,
          salary: '₹15-20 LPA',
          experience: '3-5 years',
          type: 'Full-time'
        },
        {
          id: 2,
          title: 'Backend Engineer',
          location: 'Hyderabad',
          applications: 18,
          shortlisted: 6,
          interviewed: 3,
          selected: 1,
          status: 'active',
          posted: '2024-01-16',
          deadline: '2024-12-31',
          views: 234,
          salary: '₹18-25 LPA',
          experience: '4-6 years',
          type: 'Full-time'
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          location: 'Remote',
          applications: 32,
          shortlisted: 12,
          interviewed: 5,
          selected: 0,
          status: 'active',
          posted: '2024-01-17',
          deadline: '2024-11-30',
          views: 456,
          salary: '₹12-18 LPA',
          experience: '2-4 years',
          type: 'Full-time'
        },
        {
          id: 4,
          title: 'DevOps Engineer',
          location: 'Pune',
          applications: 12,
          shortlisted: 4,
          interviewed: 2,
          selected: 1,
          status: 'closed',
          posted: '2024-01-10',
          deadline: '2024-10-15',
          views: 189,
          salary: '₹16-22 LPA',
          experience: '3-5 years',
          type: 'Full-time'
        },
        {
          id: 5,
          title: 'UI/UX Designer',
          location: 'Mumbai',
          applications: 15,
          shortlisted: 5,
          interviewed: 2,
          selected: 0,
          status: 'draft',
          posted: '2024-01-18',
          deadline: '2024-12-15',
          views: 0,
          salary: '₹10-15 LPA',
          experience: '2-4 years',
          type: 'Full-time'
        }
      ];
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = jobs;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }
    
    setFilteredJobs(filtered);
  }, [searchTerm, statusFilter, jobs]);

  const handleDeleteJob = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter(j => j.id !== selectedJob.id));
    setShowDeleteModal(false);
    setSelectedJob(null);
  };

  const getStatusBadge = (status) => {
    const config = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      'closed': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Closed' },
      'draft': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Draft' }
    };
    const statusConfig = config[status] || config.draft;
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
        {statusConfig.label}
      </span>
    );
  };

  const calculateConversionRate = (applications, selected) => {
    if (applications === 0) return 0;
    return ((selected / applications) * 100).toFixed(1);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="text-gray-600 mt-2">View and manage all your job postings</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link to="/recruiter/post-job">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Post New Job
            </button>
          </Link>
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Conversion</p>
              <p className="text-2xl font-bold text-gray-900">
                {calculateConversionRate(
                  jobs.reduce((sum, job) => sum + job.applications, 0),
                  jobs.reduce((sum, job) => sum + job.selected, 0)
                )}%
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
            
            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Job Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Applications</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Shortlisted</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Interviewed</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Selected</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <span>{job.type}</span>
                        <span className="mx-2">•</span>
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {job.views} views
                        <Calendar className="h-4 w-4 ml-3 mr-1" />
                        Posted {job.posted}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.applications}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {job.shortlisted}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {job.interviewed}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{job.selected}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({calculateConversionRate(job.applications, job.selected)}%)
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className={new Date(job.deadline) < new Date() ? 'text-red-600' : 'text-gray-600'}>
                        {new Date(job.deadline).toLocaleDateString()}
                      </span>
                      {new Date(job.deadline) > new Date() && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link to={`/recruiter/job/${job.id}`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                          <Eye className="h-5 w-5" />
                        </button>
                      </Link>
                      <Link to={`/recruiter/job/${job.id}/edit`}>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="h-5 w-5" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDeleteJob(job)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="More">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete Job Posting</h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete "{selectedJob?.title}"? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;