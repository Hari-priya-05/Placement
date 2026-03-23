import React, { useState, useEffect, useRef } from 'react';
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
  Trash2,
  Sparkles,
  Zap,
  Shield,
  FileCheck,
  Eye,
  BarChart3,
  Target,
  Lightbulb,
  Heart,
  Share2,
  Download as DownloadIcon,
  Loader,
  Info,
  AlertTriangle
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

  // ATS Scanner States
  const [resumeFile, setResumeFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [showScanResults, setShowScanResults] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const fileInputRef = useRef(null);

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
          }
        ],
        projects: [
          {
            id: 1,
            title: 'AI-Powered Placement Portal',
            description: 'Developed a full-stack placement portal with AI chatbot for career guidance.',
            technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
            role: 'Full Stack Developer',
            startDate: '2024-01',
            endDate: '2024-03',
            github: 'https://github.com/rahul/placement-portal',
            live: 'https://placement-portal.com'
          }
        ],
        certifications: [
          {
            id: 1,
            name: 'Meta Frontend Developer',
            issuer: 'Coursera',
            issueDate: '2024-01',
            credentialId: 'META123456'
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
            description: 'Working on developing RESTful APIs using Node.js and Express.'
          }
        ],
        resume: {
          url: 'https://example.com/resume.pdf',
          name: 'Rahul_Sharma_Resume.pdf',
          uploadedAt: '2024-01-15',
          size: '245 KB',
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
      setResumeUploaded(!!mockProfile.resume.url);
      setLoading(false);
    }, 1500);
  }, [user]);

  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Projects', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'resume', label: 'Resume & ATS', icon: FileCheck },
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

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setResumeFile(file);
      setIsScanning(true);
      setShowScanResults(false);
      
      // Simulate ATS scanning (In real implementation, this would call an API)
      setTimeout(() => {
        const mockAnalysis = {
          score: 85,
          keywordMatch: 92,
          formatting: 78,
          contentQuality: 88,
          actionWords: 82,
          sections: {
            contact: { score: 95, status: 'good', message: 'Contact information complete' },
            summary: { score: 70, status: 'warning', message: 'Add a professional summary' },
            skills: { score: 85, status: 'good', message: 'Good technical skills, consider adding more' },
            experience: { score: 82, status: 'good', message: 'Add quantifiable achievements' },
            education: { score: 90, status: 'good', message: 'Education section complete' }
          },
          suggestions: [
            {
              category: 'Keywords',
              severity: 'high',
              issues: ['Missing "Machine Learning" keyword', 'Add more technical skills'],
              suggestions: ['Include "Python" and "SQL" in skills section', 'Add specific frameworks like React, Node.js']
            },
            {
              category: 'Formatting',
              severity: 'medium',
              issues: ['Length is optimal', 'Use bullet points consistently'],
              suggestions: ['Add a professional summary', 'Highlight achievements with numbers']
            },
            {
              category: 'Content',
              severity: 'high',
              issues: ['Add quantifiable achievements', 'Include more project details'],
              suggestions: ['Add metrics like "Improved performance by 30%"', 'Describe your role in projects clearly']
            },
            {
              category: 'ATS Compatibility',
              severity: 'low',
              issues: ['File format is good', 'Simple formatting'],
              suggestions: ['Avoid images and tables', 'Use standard section headings']
            }
          ],
          keywordsFound: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB', 'Git'],
          keywordsMissing: ['Python', 'SQL', 'AWS', 'Docker', 'Machine Learning', 'TypeScript'],
          matchedJobs: [
            { title: 'Frontend Developer', match: 85, company: 'Google', salary: '₹45-60 LPA' },
            { title: 'Full Stack Developer', match: 78, company: 'Microsoft', salary: '₹40-55 LPA' },
            { title: 'React Developer', match: 92, company: 'Flipkart', salary: '₹30-45 LPA' },
            { title: 'MERN Stack Developer', match: 88, company: 'Amazon', salary: '₹35-50 LPA' }
          ],
          improvements: [
            'Add a professional summary section at the top',
            'Include quantifiable achievements (e.g., "Improved performance by 30%")',
            'Add more technical skills: Python, SQL, AWS',
            'Use action verbs: "Developed", "Implemented", "Led"',
            'Keep formatting simple - avoid columns and tables'
          ]
        };
        
        setAtsScore(mockAnalysis.score);
        setAtsAnalysis(mockAnalysis);
        setIsScanning(false);
        setShowScanResults(true);
        setResumeUploaded(true);
        setSuccessMessage('Resume uploaded and analyzed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 2500);
    } else {
      setErrorMessage('Please upload a PDF or Word document');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDownloadResume = () => {
    // In real implementation, this would download the actual file
    alert('Download functionality would be implemented here');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
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
            {editMode && (
              <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            )}
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

      {/* ATS Score Banner */}
      {atsScore && (
        <div className={`${getScoreBgColor(atsScore)} rounded-xl p-4 flex items-center justify-between`}>
          <div className="flex items-center space-x-4">
            <div className={`text-3xl font-bold ${getScoreColor(atsScore)}`}>{atsScore}%</div>
            <div>
              <p className="font-medium text-gray-900">Resume ATS Score</p>
              <p className="text-sm text-gray-600">
                {atsScore >= 80 ? 'Excellent! Your resume is well-optimized.' :
                 atsScore >= 60 ? 'Good! Some improvements recommended.' :
                 'Needs improvement. Follow suggestions below.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowScanResults(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}

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
          {/* Resume & ATS Tab */}
          {activeTab === 'resume' && (
            <div className="space-y-8">
              {/* Resume Upload Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-dashed border-blue-300">
                <div className="text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Resume</h3>
                  <p className="text-gray-600 mb-4">Upload your resume for ATS scanning and analysis</p>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: PDF, DOC, DOCX</p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    disabled={isScanning}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto disabled:opacity-50"
                  >
                    {isScanning ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        Scanning Resume...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 mr-2" />
                        Choose File
                      </>
                    )}
                  </button>
                </div>

                {resumeUploaded && !isScanning && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{profileData?.resume?.name || 'Resume.pdf'}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded: {profileData?.resume?.uploadedAt || 'Just now'} • {profileData?.resume?.size || '245 KB'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleDownloadResume}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Download"
                        >
                          <DownloadIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => fileInputRef.current.click()}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Replace"
                        >
                          <Upload className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ATS Scan Results Modal */}
              {showScanResults && atsAnalysis && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                  <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                          <FileCheck className="h-6 w-6 text-green-600 mr-2" />
                          Resume ATS Analysis Report
                        </h2>
                        <p className="text-gray-600 mt-1">Detailed analysis and recommendations</p>
                      </div>
                      <button
                        onClick={() => setShowScanResults(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Score Card */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100 mb-1">Overall ATS Score</p>
                            <p className="text-5xl font-bold">{atsAnalysis.score}%</p>
                            <p className="text-blue-100 mt-2">
                              {atsAnalysis.score >= 80 ? 'Excellent! Your resume is well-optimized' :
                               atsAnalysis.score >= 60 ? 'Good! Some improvements recommended' :
                               'Needs improvement. Follow recommendations below'}
                            </p>
                          </div>
                          <div className="text-center">
                            <div className="bg-white bg-opacity-20 rounded-full p-4">
                              <Target className="h-12 w-12" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500">Keyword Match</p>
                          <p className="text-xl font-bold text-gray-900">{atsAnalysis.keywordMatch}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500">Formatting</p>
                          <p className="text-xl font-bold text-gray-900">{atsAnalysis.formatting}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500">Content Quality</p>
                          <p className="text-xl font-bold text-gray-900">{atsAnalysis.contentQuality}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500">Action Words</p>
                          <p className="text-xl font-bold text-gray-900">{atsAnalysis.actionWords}%</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-500">Overall</p>
                          <p className="text-xl font-bold text-gray-900">{atsAnalysis.score}%</p>
                        </div>
                      </div>

                      {/* Section Scores */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Section Analysis</h3>
                        <div className="space-y-3">
                          {Object.entries(atsAnalysis.sections).map(([section, data]) => (
                            <div key={section}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="capitalize text-sm font-medium text-gray-700">
                                  {section}
                                </span>
                                <span className={`text-sm font-medium ${getScoreColor(data.score)}`}>
                                  {data.score}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`rounded-full h-2 ${data.score >= 80 ? 'bg-green-600' : data.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                                  style={{ width: `${data.score}%` }}
                                ></div>
                              </div>
                              <p className={`text-xs mt-1 ${
                                data.status === 'good' ? 'text-green-600' :
                                data.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {data.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Keywords Found
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {atsAnalysis.keywordsFound.map((keyword, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Missing Keywords
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {atsAnalysis.keywordsMissing.map((keyword, idx) => (
                              <span key={idx} className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-sm">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                          Improvement Suggestions
                        </h3>
                        <div className="space-y-4">
                          {atsAnalysis.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="border-l-4 border-blue-500 pl-4">
                              <div className="flex items-center mb-2">
                                {getSeverityIcon(suggestion.severity)}
                                <h4 className="font-semibold text-gray-900 ml-2">{suggestion.category}</h4>
                              </div>
                              <ul className="list-disc list-inside space-y-1">
                                {suggestion.issues.map((issue, i) => (
                                  <li key={i} className="text-sm text-gray-600">{issue}</li>
                                ))}
                              </ul>
                              <ul className="list-disc list-inside space-y-1 mt-2">
                                {suggestion.suggestions.map((sugg, i) => (
                                  <li key={i} className="text-sm text-green-600">{sugg}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Improvements */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          Quick Wins
                        </h3>
                        <ul className="space-y-2">
                          {atsAnalysis.improvements.map((improvement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Matched Jobs */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                          Jobs Matching Your Resume
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {atsAnalysis.matchedJobs.map((job, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                  <p className="text-sm text-gray-600">{job.company}</p>
                                  <p className="text-xs text-green-600 mt-1">{job.salary}</p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBgColor(job.match)} ${getScoreColor(job.match)}`}>
                                    {job.match}% Match
                                  </span>
                                </div>
                              </div>
                              <button className="mt-3 w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                View Job
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
                      <button
                        onClick={() => setShowScanResults(false)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Close Report
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other tabs content remains the same as before */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Personal Info content - same as before */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
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

          {/* Academic Tab */}
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
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{profileData?.resume?.name || 'No resume uploaded'}</p>
                      {profileData?.resume?.uploadedAt && (
                        <p className="text-xs text-gray-500">
                          Updated: {new Date(profileData.resume.uploadedAt).toLocaleDateString()} • {profileData.resume.views} views
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Update
                  </button>
                </div>
              </div>

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
                          <p className="text-xs text-gray-500 mt-1">Issued: {cert.issueDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {cert.credentialId && (
                          <span className="text-xs text-gray-500">ID: {cert.credentialId}</span>
                        )}
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