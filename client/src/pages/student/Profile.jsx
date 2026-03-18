import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  FileText,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Download,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Camera,
  Star,
  TrendingUp,
  Clock,
  Building,
  DollarSign,
  Map,
  ChevronRight,
  Plus,
  Trash2
} from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockProfile = {
        personalInfo: {
          name: user?.name || 'Rahul Sharma',
          email: 'rahul.sharma@college.edu',
          phone: '+91 98765 43210',
          alternatePhone: '+91 98765 43211',
          dateOfBirth: '2002-05-15',
          gender: 'Male',
          address: '123, Sector 15, CBD Belapur',
          city: 'Navi Mumbai',
          state: 'Maharashtra',
          pincode: '400614',
          nationality: 'Indian',
          linkedin: 'https://linkedin.com/in/rahulsharma',
          github: 'https://github.com/rahulsharma',
          portfolio: 'https://rahulsharma.dev',
          bio: 'Passionate Computer Science student with expertise in full-stack development. Looking for opportunities in software engineering.'
        },
        academicInfo: {
          rollNumber: 'CS2021001',
          department: 'Computer Science',
          year: 4,
          semester: 8,
          cgpa: 8.7,
          sgpa: 8.9,
          tenth: {
            school: 'Delhi Public School',
            board: 'CBSE',
            percentage: 92.4,
            year: 2018
          },
          twelfth: {
            school: 'Delhi Public School',
            board: 'CBSE',
            percentage: 89.6,
            year: 2020
          }
        },
        skills: ['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'AWS'],
        education: [
          {
            id: 1,
            degree: 'Bachelor of Technology',
            field: 'Computer Science',
            institution: 'National Institute of Technology',
            location: 'Mumbai',
            startYear: '2021',
            endYear: '2025',
            current: true,
            cgpa: 8.7
          },
          {
            id: 2,
            degree: 'Senior Secondary (XII)',
            field: 'Science',
            institution: 'Delhi Public School',
            location: 'Delhi',
            startYear: '2019',
            endYear: '2021',
            current: false,
            percentage: 89.6
          }
        ],
        projects: [
          {
            id: 1,
            title: 'AI-Powered Placement Portal',
            description: 'Developed a full-stack placement portal with AI chatbot for career guidance. Implemented role-based access and real-time notifications.',
            technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
            role: 'Full Stack Developer',
            startDate: '2024-01',
            endDate: '2024-03',
            current: false,
            github: 'https://github.com/rahul/placement-portal',
            live: 'https://placement-portal.com'
          },
          {
            id: 2,
            title: 'E-Learning Platform',
            description: 'Built an interactive e-learning platform with video streaming and quiz features. Implemented real-time chat and progress tracking.',
            technologies: ['Next.js', 'Express', 'PostgreSQL', 'Socket.io'],
            role: 'Lead Developer',
            startDate: '2023-09',
            endDate: '2023-12',
            current: false,
            github: 'https://github.com/rahul/elearning',
            live: 'https://elearning-platform.com'
          }
        ],
        certifications: [
          {
            id: 1,
            name: 'Meta Frontend Developer',
            issuer: 'Coursera',
            issueDate: '2024-01',
            expiryDate: '',
            credentialId: 'META123456',
            credentialUrl: 'https://coursera.org/verify/META123456'
          },
          {
            id: 2,
            name: 'AWS Certified Cloud Practitioner',
            issuer: 'Amazon Web Services',
            issueDate: '2023-08',
            expiryDate: '2026-08',
            credentialId: 'AWS789012',
            credentialUrl: 'https://aws.amazon.com/verification'
          },
          {
            id: 3,
            name: 'Google Data Analytics',
            issuer: 'Google',
            issueDate: '2023-05',
            expiryDate: '',
            credentialId: 'GOOG345678',
            credentialUrl: 'https://coursera.org/verify/GOOG345678'
          }
        ],
        workExperience: [
          {
            id: 1,
            company: 'Tech Corp India',
            position: 'Software Engineer Intern',
            location: 'Bangalore',
            startDate: '2024-01',
            endDate: '2024-03',
            current: true,
            description: 'Working on developing RESTful APIs using Node.js and Express. Collaborating with cross-functional teams to implement new features.',
            responsibilities: [
              'Developed microservices for user authentication',
              'Implemented database optimization techniques',
              'Participated in daily stand-ups and sprint planning'
            ]
          }
        ],
        placementInfo: {
          status: 'interview',
          preferredCompanies: ['Google', 'Microsoft', 'Amazon'],
          preferredRoles: ['SDE', 'Full Stack Developer'],
          preferredLocations: ['Bangalore', 'Hyderabad', 'Pune'],
          expectedSalary: '15-20 LPA',
          availability: 'Immediate',
          offers: [
            {
              company: 'Tech Corp',
              role: 'SDE Intern',
              package: '10 LPA',
              status: 'offer'
            }
          ]
        },
        resume: {
          url: 'https://example.com/resume.pdf',
          name: 'Rahul_Sharma_Resume.pdf',
          updatedAt: '2024-01-15',
          views: 45
        }
      };

      setProfileData(mockProfile);
      setFormData(mockProfile.personalInfo);
      setSkills(mockProfile.skills);
      setEducation(mockProfile.education);
      setProjects(mockProfile.projects);
      setCertifications(mockProfile.certifications);
      setWorkExperience(mockProfile.workExperience);
      setLoading(false);
    }, 1500);
  }, [user]);

  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Projects', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'placement', label: 'Placement', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSaveProfile = () => {
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    setEditMode(false);
  };

  const handleResumeUpload = () => {
    // Simulate upload
    setSuccessMessage('Resume uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'applied': 'bg-blue-100 text-blue-800',
      'shortlisted': 'bg-green-100 text-green-800',
      'interview': 'bg-purple-100 text-purple-800',
      'offer': 'bg-yellow-100 text-yellow-800',
      'selected': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Cover Photo */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl"></div>
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {profileData?.personalInfo?.name?.charAt(0) || 'R'}
                </span>
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Camera className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-white">{profileData?.personalInfo?.name}</h1>
            <p className="text-white text-opacity-90">{profileData?.academicInfo?.rollNumber}</p>
          </div>
        </div>
        <div className="absolute top-4 right-8 flex space-x-3">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center text-gray-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-all flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {errorMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap flex items-center ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-8">
          {/* Personal Info Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      disabled
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !editMode ? 'bg-gray-50' : 'bg-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode || ''}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      !editMode ? 'bg-gray-50' : 'bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="github"
                      value={formData.github || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        !editMode ? 'bg-gray-50' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Info Tab */}
          {activeTab === 'academic' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                  <GraduationCap className="h-8 w-8 mb-3" />
                  <p className="text-sm opacity-90">Current CGPA</p>
                  <p className="text-3xl font-bold">{profileData?.academicInfo?.cgpa}</p>
                  <p className="text-sm opacity-75 mt-2">Semester: {profileData?.academicInfo?.semester}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-6 text-white">
                  <Award className="h-8 w-8 mb-3" />
                  <p className="text-sm opacity-90">SGPA (Current)</p>
                  <p className="text-3xl font-bold">{profileData?.academicInfo?.sgpa}</p>
                  <p className="text-sm opacity-75 mt-2">Semester {profileData?.academicInfo?.semester}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 text-white">
                  <BookOpen className="h-8 w-8 mb-3" />
                  <p className="text-sm opacity-90">Backlogs</p>
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-sm opacity-75 mt-2">All cleared</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-medium text-gray-900">{profileData?.academicInfo?.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium text-gray-900">{profileData?.academicInfo?.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year of Study</p>
                    <p className="font-medium text-gray-900">{profileData?.academicInfo?.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Semester</p>
                    <p className="font-medium text-gray-900">{profileData?.academicInfo?.semester}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class X</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">School</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.tenth.school}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Board</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.tenth.board}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Percentage</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.tenth.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Year of Passing</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.tenth.year}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Class XII</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">School</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.twelfth.school}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Board</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.twelfth.board}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Percentage</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.twelfth.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Year of Passing</p>
                      <p className="font-medium text-gray-900">{profileData?.academicInfo?.twelfth.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills & Projects Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Skills Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                  {editMode && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        placeholder="Add a skill"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm"
                    >
                      {skill}
                      {editMode && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                  {editMode && (
                    <button
                      onClick={() => setShowProjectModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Project
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.role}</p>
                          <p className="text-sm text-gray-500 mt-2">{project.description}</p>
                        </div>
                        {editMode && (
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.startDate} - {project.current ? 'Present' : project.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                {editMode && (
                  <button
                    onClick={() => setShowExpModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-1">{exp.location}</p>
                      </div>
                      {editMode && (
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-3 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>

                    <p className="text-sm text-gray-700 mt-3">{exp.description}</p>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Responsibilities:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{resp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placement Tab */}
          {activeTab === 'placement' && (
            <div className="space-y-6">
              {/* Placement Status Card */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Placement Status</h3>
                    <p className="text-blue-100">Your current placement journey</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium bg-white ${getStatusColor(profileData?.placementInfo?.status)}`}>
                    {profileData?.placementInfo?.status?.charAt(0).toUpperCase() + profileData?.placementInfo?.status?.slice(1)}
                  </span>
                </div>
              </div>

              {/* Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="h-5 w-5 text-blue-600 mr-2" />
                    Preferred Companies
                  </h4>
                  <div className="space-y-2">
                    {profileData?.placementInfo?.preferredCompanies.map((company, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                        {company}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                    Preferred Roles
                  </h4>
                  <div className="space-y-2">
                    {profileData?.placementInfo?.preferredRoles.map((role, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                        {role}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 text-green-600 mr-2" />
                    Preferred Locations
                  </h4>
                  <div className="space-y-2">
                    {profileData?.placementInfo?.preferredLocations.map((location, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                        {location}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 text-yellow-600 mr-2" />
                    Expected Salary
                  </h4>
                  <p className="text-2xl font-bold text-gray-900">{profileData?.placementInfo?.expectedSalary}</p>
                  <p className="text-sm text-gray-500 mt-2">Availability: {profileData?.placementInfo?.availability}</p>
                </div>
              </div>

              {/* Offers Received */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Offers Received</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData?.placementInfo?.offers.map((offer, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold text-gray-900">{offer.company}</h5>
                          <p className="text-sm text-gray-600">{offer.role}</p>
                          <p className="text-sm text-green-600 font-medium mt-2">{offer.package}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                          {offer.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Resume Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
                  <button
                    onClick={handleResumeUpload}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{profileData?.resume.name}</p>
                      <p className="text-sm text-gray-500">
                        Updated: {new Date(profileData?.resume.updatedAt).toLocaleDateString()} • {profileData?.resume.views} views
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                  {editMode && (
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start">
                        <Award className="h-6 w-6 text-yellow-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900">{cert.name}</h4>
                          <p className="text-sm text-gray-600">{cert.issuer}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Issued: {cert.issueDate} {cert.expiryDate && `• Expires: ${cert.expiryDate}`}
                          </p>
                          <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <LinkIcon className="h-5 w-5" />
                        </a>
                        {editMode && (
                          <button className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;