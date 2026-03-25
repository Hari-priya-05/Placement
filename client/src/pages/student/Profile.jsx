import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getStudentProfile, 
  updateStudentProfile,
  getStudentStats 
} from '../../services/placementDataService';
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
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    interviews: 0,
    selected: 0
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);

  // Load profile data from localStorage
  useEffect(() => {
    if (user) {
      loadProfileData();
      
      // Listen for data updates
      window.addEventListener('placementDataUpdated', loadProfileData);
      return () => window.removeEventListener('placementDataUpdated', loadProfileData);
    }
  }, [user]);

  const loadProfileData = () => {
    if (!user) return;
    
    try {
      // Get student profile from localStorage
      const studentProfile = getStudentProfile(user.id);
      const studentStats = getStudentStats(user.id);
      
      if (studentProfile) {
        setProfileData(studentProfile);
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: studentProfile.phone || '',
          alternatePhone: studentProfile.alternatePhone || '',
          dateOfBirth: studentProfile.dateOfBirth || '',
          gender: studentProfile.gender || '',
          address: studentProfile.address || '',
          city: studentProfile.city || '',
          state: studentProfile.state || '',
          pincode: studentProfile.pincode || '',
          nationality: studentProfile.nationality || 'Indian',
          linkedin: studentProfile.linkedin || '',
          github: studentProfile.github || '',
          portfolio: studentProfile.portfolio || '',
          bio: studentProfile.bio || '',
          skills: studentProfile.skills || [],
          cgpa: studentProfile.cgpa || 0,
          resumeUrl: studentProfile.resumeUrl || null,
          resumeName: studentProfile.resumeName || null
        });
        
        setSkills(studentProfile.skills || []);
        setEducation(studentProfile.education || []);
        setProjects(studentProfile.projects || []);
        setCertifications(studentProfile.certifications || []);
        setWorkExperience(studentProfile.workExperience || []);
      }
      
      setStats(studentStats);
    } catch (error) {
      console.error('Error loading profile:', error);
      setErrorMessage('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setFormData({ ...formData, skills: updatedSkills });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    
    try {
      // Prepare data to save
      const updatedProfile = {
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        nationality: formData.nationality,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        bio: formData.bio,
        skills: skills,
        cgpa: formData.cgpa,
        education: education,
        projects: projects,
        certifications: certifications,
        workExperience: workExperience
      };
      
      // Save to localStorage
      const result = updateStudentProfile(user.id, updatedProfile);
      
      if (result) {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setEditMode(false);
        
        // Update user name in auth context if changed
        if (formData.name !== user.name) {
          // You might want to update the user object in AuthContext
          const updatedUser = { ...user, name: formData.name };
          localStorage.setItem('current_user', JSON.stringify(updatedUser));
        }
      } else {
        setErrorMessage('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Error saving profile');
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      
      setUploadingResume(true);
      
      // Simulate upload (in real app, you'd upload to cloud storage)
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Store resume as base64 (for demo)
          const resumeData = {
            url: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString()
          };
          
          updateStudentProfile(user.id, { 
            resumeUrl: resumeData.url,
            resumeName: file.name,
            resumeSize: file.size,
            resumeType: file.type
          });
          
          setFormData({ 
            ...formData, 
            resumeUrl: resumeData.url,
            resumeName: file.name 
          });
          setUploadingResume(false);
          setSuccessMessage('Resume uploaded successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        };
        reader.readAsDataURL(file);
      }, 1000);
    } else {
      setErrorMessage('Please upload a PDF or Word document');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
      {/* Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl"></div>
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user?.name?.charAt(0) || 'S'}
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
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="text-2xl font-bold text-white bg-transparent border-b-2 border-white/50 focus:border-white outline-none px-2"
              />
            ) : (
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
            )}
            <p className="text-white text-opacity-90">{user?.email}</p>
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
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-600">Shortlisted</p>
          <p className="text-2xl font-bold text-green-700">{stats.shortlisted}</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-purple-600">Interviews</p>
          <p className="text-2xl font-bold text-purple-700">{stats.interviews}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-600">Selected</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.selected}</p>
        </div>
      </div>

      {/* Main Content - Personal Info Form */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        
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
                  value={user?.email || ''}
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
                  placeholder="+91 98765 43210"
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
              placeholder="Tell us about yourself, your skills, and career goals..."
            />
          </div>

          {/* Skills Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              {editMode && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm"
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
              {skills.length === 0 && (
                <p className="text-sm text-gray-500 italic">No skills added yet</p>
              )}
            </div>
          </div>

          {/* CGPA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current CGPA
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                step="0.01"
                name="cgpa"
                value={formData.cgpa || ''}
                onChange={handleInputChange}
                disabled={!editMode}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !editMode ? 'bg-gray-50' : 'bg-white'
                }`}
                placeholder="8.5"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formData.resumeName || 'No resume uploaded'}
                  </p>
                  {formData.resumeName && (
                    <p className="text-xs text-gray-500">
                      Uploaded and saved in your profile
                    </p>
                  )}
                </div>
              </div>
              {editMode && (
                <div className="flex space-x-2">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.getElementById('resume-upload').click()}
                    disabled={uploadingResume}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
                  >
                    {uploadingResume ? (
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {formData.resumeName ? 'Update' : 'Upload'}
                  </button>
                  {formData.resumeUrl && (
                    <button
                      onClick={() => window.open(formData.resumeUrl, '_blank')}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center"
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      View
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social & Professional Links</h3>
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
                    placeholder="https://linkedin.com/in/username"
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
                    placeholder="https://github.com/username"
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
                    placeholder="https://yourportfolio.com"
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
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;