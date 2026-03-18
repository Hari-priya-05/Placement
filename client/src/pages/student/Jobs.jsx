import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Building,
  Star,
  ChevronDown,
  X,
  Bookmark,
  Share2,
  Eye,
  TrendingUp,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Code,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Heart,
  ThumbsUp
} from 'lucide-react';

const Jobs = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: [],
    experienceLevel: [],
    salaryRange: '',
    skills: [],
    companyType: [],
    postedWithin: '',
    sortBy: 'newest'
  });

  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'Google India',
          companyLogo: 'G',
          location: 'Bangalore',
          type: 'Full-time',
          experience: '3-5 years',
          salary: '₹15,00,000 - ₹20,00,000',
          description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building responsive web applications using modern frameworks.',
          requirements: [
            'Strong experience with React and TypeScript',
            'Knowledge of Next.js and modern frontend tools',
            'Understanding of web performance optimization',
            'Experience with state management (Redux, MobX)'
          ],
          responsibilities: [
            'Develop new user-facing features',
            'Build reusable components and libraries',
            'Optimize applications for maximum speed',
            'Collaborate with backend teams'
          ],
          skills: ['React', 'TypeScript', 'Next.js', 'Redux', 'Tailwind CSS'],
          postedDate: '2024-01-15',
          deadline: '2024-12-31',
          openings: 5,
          applicants: 124,
          views: 1250,
          companyRating: 4.8,
          companySize: '10,000+ employees',
          industry: 'Technology',
          perks: [
            'Competitive salary',
            'Health insurance',
            'Flexible work hours',
            'Learning budget'
          ],
          remote: 'Hybrid',
          featured: true,
          urgent: false
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'Microsoft',
          companyLogo: 'M',
          location: 'Hyderabad',
          type: 'Full-time',
          experience: '2-4 years',
          salary: '₹12,00,000 - ₹18,00,000',
          description: 'Join our backend team to build scalable APIs and microservices. Work with cutting-edge technology stack.',
          requirements: [
            'Proficiency in Node.js or Python',
            'Experience with databases (PostgreSQL, MongoDB)',
            'Knowledge of RESTful APIs',
            'Understanding of cloud services (AWS/Azure)'
          ],
          responsibilities: [
            'Design and implement APIs',
            'Optimize database queries',
            'Ensure application performance',
            'Write clean, maintainable code'
          ],
          skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
          postedDate: '2024-01-16',
          deadline: '2024-12-31',
          openings: 8,
          applicants: 89,
          views: 890,
          companyRating: 4.7,
          companySize: '10,000+ employees',
          industry: 'Technology',
          perks: [
            'Stock options',
            'Wellness benefits',
            'Remote work option',
            'Professional development'
          ],
          remote: 'Remote',
          featured: true,
          urgent: false
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          company: 'Amazon',
          companyLogo: 'A',
          location: 'Chennai',
          type: 'Full-time',
          experience: '1-3 years',
          salary: '₹10,00,000 - ₹15,00,000',
          description: 'Exciting opportunity for a full stack developer to work on our flagship e-commerce platform.',
          requirements: [
            'Experience with React and Node.js',
            'Knowledge of databases',
            'Understanding of cloud services',
            'Problem-solving skills'
          ],
          responsibilities: [
            'Develop end-to-end features',
            'Optimize application performance',
            'Collaborate with cross-functional teams',
            'Participate in code reviews'
          ],
          skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'GraphQL'],
          postedDate: '2024-01-17',
          deadline: '2024-11-30',
          openings: 12,
          applicants: 156,
          views: 1450,
          companyRating: 4.6,
          companySize: '10,000+ employees',
          industry: 'E-commerce',
          perks: [
            'Sign-on bonus',
            'Relocation assistance',
            'Health benefits',
            'Employee discounts'
          ],
          remote: 'On-site',
          featured: false,
          urgent: true
        },
        {
          id: 4,
          title: 'DevOps Engineer',
          company: 'Goldman Sachs',
          companyLogo: 'G',
          location: 'Bangalore',
          type: 'Full-time',
          experience: '2-5 years',
          salary: '₹14,00,000 - ₹22,00,000',
          description: 'Join our infrastructure team to build and maintain cloud infrastructure.',
          requirements: [
            'Experience with AWS/Azure',
            'Knowledge of Docker and Kubernetes',
            'Scripting skills (Python/Bash)',
            'CI/CD pipeline experience'
          ],
          responsibilities: [
            'Manage cloud infrastructure',
            'Implement CI/CD pipelines',
            'Monitor system performance',
            'Automate deployment processes'
          ],
          skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
          postedDate: '2024-01-18',
          deadline: '2024-12-15',
          openings: 4,
          applicants: 67,
          views: 780,
          companyRating: 4.5,
          companySize: '10,000+ employees',
          industry: 'Finance',
          perks: [
            'Performance bonus',
            'Health coverage',
            'Gym membership',
            'Learning stipend'
          ],
          remote: 'Hybrid',
          featured: false,
          urgent: false
        },
        {
          id: 5,
          title: 'Data Scientist',
          company: 'Flipkart',
          companyLogo: 'F',
          location: 'Bangalore',
          type: 'Full-time',
          experience: '2-4 years',
          salary: '₹16,00,000 - ₹24,00,000',
          description: 'Looking for a data scientist to analyze complex data and build ML models.',
          requirements: [
            'Strong Python skills',
            'Experience with ML frameworks',
            'Statistical analysis',
            'Data visualization'
          ],
          responsibilities: [
            'Build predictive models',
            'Analyze user behavior',
            'Optimize algorithms',
            'Present insights to stakeholders'
          ],
          skills: ['Python', 'TensorFlow', 'SQL', 'Statistics', 'Tableau'],
          postedDate: '2024-01-19',
          deadline: '2024-12-20',
          openings: 3,
          applicants: 92,
          views: 920,
          companyRating: 4.4,
          companySize: '10,000+ employees',
          industry: 'E-commerce',
          perks: [
            'Competitive package',
            'Stock options',
            'Flexible timing',
            'Food coupons'
          ],
          remote: 'Remote',
          featured: true,
          urgent: false
        },
        {
          id: 6,
          title: 'UI/UX Designer',
          company: 'Adobe',
          companyLogo: 'A',
          location: 'Noida',
          type: 'Full-time',
          experience: '2-4 years',
          salary: '₹12,00,000 - ₹18,00,000',
          description: 'Join our design team to create beautiful and intuitive user experiences.',
          requirements: [
            'Experience with Figma/Sketch',
            'Portfolio of design work',
            'Understanding of user research',
            'Knowledge of design systems'
          ],
          responsibilities: [
            'Create wireframes and prototypes',
            'Conduct user research',
            'Design user interfaces',
            'Collaborate with developers'
          ],
          skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Adobe XD'],
          postedDate: '2024-01-20',
          deadline: '2024-12-25',
          openings: 2,
          applicants: 45,
          views: 560,
          companyRating: 4.6,
          companySize: '5,000-10,000 employees',
          industry: 'Technology',
          perks: [
            'Creative environment',
            'Design conferences',
            'Health benefits',
            'Flexible hours'
          ],
          remote: 'Hybrid',
          featured: false,
          urgent: true
        }
      ];

      // Mock applied jobs
      const mockApplied = [1, 3];
      const mockSaved = [2, 5];

      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setAppliedJobs(mockApplied);
      setSavedJobs(mockSaved);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower)) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Job type filter
    if (filters.jobType.length > 0) {
      filtered = filtered.filter(job => filters.jobType.includes(job.type));
    }

    // Experience filter
    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter(job => {
        const exp = job.experience.split('-')[0].trim();
        return filters.experienceLevel.some(level => {
          if (level === '0-1' && parseInt(exp) <= 1) return true;
          if (level === '1-3' && parseInt(exp) >= 1 && parseInt(exp) <= 3) return true;
          if (level === '3-5' && parseInt(exp) >= 3 && parseInt(exp) <= 5) return true;
          if (level === '5+' && parseInt(exp) >= 5) return true;
          return false;
        });
      });
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter(job =>
        filters.skills.every(skill =>
          job.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    // Sort
    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    } else if (filters.sortBy === 'salary-high') {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
        const bSalary = parseInt(b.salary.split(' - ')[1].replace(/[^0-9]/g, ''));
        return bSalary - aSalary;
      });
    } else if (filters.sortBy === 'salary-low') {
      filtered.sort((a, b) => {
        const aSalary = parseInt(a.salary.split(' - ')[0].replace(/[^0-9]/g, ''));
        const bSalary = parseInt(b.salary.split(' - ')[0].replace(/[^0-9]/g, ''));
        return aSalary - bSalary;
      });
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleFilterChange = (key, value) => {
    setTempFilters({ ...tempFilters, [key]: value });
  };

  const applyFilters = () => {
    setFilters({ ...tempFilters });
    setShowFilters(false);
  };

  const clearFilters = () => {
    const cleared = {
      search: '',
      location: '',
      jobType: [],
      experienceLevel: [],
      salaryRange: '',
      skills: [],
      companyType: [],
      postedWithin: '',
      sortBy: 'newest'
    };
    setTempFilters(cleared);
    setFilters(cleared);
  };

  const handleApplyJob = (job) => {
    setApplyingJob(job);
    setShowApplyModal(true);
  };

  const submitApplication = () => {
    setApplicationSubmitted(true);
    setAppliedJobs([...appliedJobs, applyingJob.id]);
    setTimeout(() => {
      setShowApplyModal(false);
      setApplicationSubmitted(false);
      setApplyingJob(null);
    }, 2000);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Contract'];
  const experienceLevels = ['0-1', '1-3', '3-5', '5+'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'salary-high', label: 'Salary: High to Low' },
    { value: 'salary-low', label: 'Salary: Low to High' }
  ];
  const locations = ['Bangalore', 'Hyderabad', 'Chennai', 'Mumbai', 'Pune', 'Delhi', 'Noida', 'Remote'];
  const skillsList = ['React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'];

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getDaysLeft = (deadline) => {
    const days = Math.floor((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-blue-100 text-lg">
          Discover opportunities from top recruiters and take the next step in your career
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={tempFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-4 border rounded-xl flex items-center transition-all ${
                showFilters ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {(filters.jobType.length > 0 || filters.experienceLevel.length > 0 || filters.skills.length > 0) && (
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {filters.jobType.length + filters.experienceLevel.length + filters.skills.length}
                </span>
              )}
            </button>
            <select
              value={tempFilters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={tempFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters.jobType.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('jobType', [...tempFilters.jobType, type]);
                          } else {
                            handleFilterChange('jobType', tempFilters.jobType.filter(t => t !== type));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters.experienceLevel.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleFilterChange('experienceLevel', [...tempFilters.experienceLevel, level]);
                          } else {
                            handleFilterChange('experienceLevel', tempFilters.experienceLevel.filter(l => l !== level));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{level} years</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills Filter */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map(skill => (
                    <button
                      key={skill}
                      onClick={() => {
                        if (tempFilters.skills.includes(skill)) {
                          handleFilterChange('skills', tempFilters.skills.filter(s => s !== skill));
                        } else {
                          handleFilterChange('skills', [...tempFilters.skills, skill]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        tempFilters.skills.includes(skill)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Stats */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
        </p>
        <p className="text-sm text-gray-500">
          Last updated: Today at 10:30 AM
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer border-2 ${
                selectedJob?.id === job.id ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${
                    job.company === 'Google India' ? 'from-blue-500 to-blue-600' :
                    job.company === 'Microsoft' ? 'from-purple-500 to-purple-600' :
                    job.company === 'Amazon' ? 'from-orange-500 to-orange-600' :
                    'from-green-500 to-green-600'
                  } rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                    {job.companyLogo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      {job.featured && (
                        <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Featured
                        </span>
                      )}
                      {job.urgent && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{job.skills.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Posted {getTimeAgo(job.postedDate)}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {job.applicants} applicants
                        </span>
                      </div>
                      <span className={`flex items-center ${
                        getDaysLeft(job.deadline) < 7 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        <Calendar className="h-3 w-3 mr-1" />
                        {getDaysLeft(job.deadline)} days left
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveJob(job.id);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {savedJobs.includes(job.id) ? (
                      <Bookmark className="h-5 w-5 text-blue-600 fill-current" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {appliedJobs.includes(job.id) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyJob(job);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Job Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedJob ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Job Details</h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Company Header */}
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${
                    selectedJob.company === 'Google India' ? 'from-blue-500 to-blue-600' :
                    selectedJob.company === 'Microsoft' ? 'from-purple-500 to-purple-600' :
                    selectedJob.company === 'Amazon' ? 'from-orange-500 to-orange-600' :
                    'from-green-500 to-green-600'
                  } rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                    {selectedJob.companyLogo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedJob.company}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      {selectedJob.companyRating}
                    </div>
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedJob.title}</h4>
                  <p className="text-sm text-gray-600">{selectedJob.experience} experience</p>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Salary</p>
                    <p className="font-medium text-gray-900">{selectedJob.salary}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-900">{selectedJob.location}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Job Type</p>
                    <p className="font-medium text-gray-900">{selectedJob.type}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Openings</p>
                    <p className="font-medium text-gray-900">{selectedJob.openings}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Description</h5>
                  <p className="text-sm text-gray-600">{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Requirements</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Responsibilities</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Skills Required</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perks */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Perks & Benefits</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedJob.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                {!appliedJobs.includes(selectedJob.id) && (
                  <button
                    onClick={() => handleApplyJob(selectedJob)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Apply for this position
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Job Selected</h3>
              <p className="text-sm text-gray-600">Click on any job to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && applyingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8">
            {!applicationSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Apply for Job</h2>
                  <p className="text-gray-600 mt-2">{applyingJob.title} at {applyingJob.company}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Position:</span>
                        <span className="font-medium text-gray-900">{applyingJob.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-medium text-gray-900">{applyingJob.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-900">{applyingJob.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary:</span>
                        <span className="font-medium text-gray-900">{applyingJob.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Please review your profile</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Make sure your resume is updated and all information is correct before applying.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I confirm that all the information provided is accurate
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowApplyModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitApplication}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700"
                  >
                    Submit Application
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Your application for {applyingJob.title} has been successfully submitted.
                </p>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
