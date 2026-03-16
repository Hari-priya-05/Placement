import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Building, 
  DollarSign, 
  Calendar, 
  MapPin,
  FileText,
  Tag,
  Clock,
  Save,
  X,
  Plus,
  AlertCircle
} from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company: user?.company_name || 'Tech Corp India',
    location: '',
    employmentType: 'full-time',
    experience: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    deadline: '',
    department: '',
    workMode: 'onsite' // onsite, remote, hybrid
  });

  const [errors, setErrors] = useState({});

  const employmentTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const workModes = [
    { value: 'onsite', label: 'On-site' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.description) newErrors.description = 'Job description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.experience) newErrors.experience = 'Experience required';
    if (!formData.deadline) newErrors.deadline = 'Application deadline is required';
    if (skills.length === 0) newErrors.skills = 'At least one skill is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success and redirect
      navigate('/recruiter/manage-jobs');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        <p className="text-gray-600 mt-2">Fill in the details to create a job posting and attract the best talent</p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., Senior Frontend Developer"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Engineering"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Bangalore, Mumbai, Remote"
                />
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Job Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {employmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Mode
              </label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {workModes.map(mode => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Required <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., 3-5 years"
              />
              {errors.experience && (
                <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ₹15,00,000 - ₹20,00,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.deadline ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.deadline && (
                <p className="mt-2 text-sm text-red-600">{errors.deadline}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a skill and press Enter or click Add"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.skills && (
              <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements & Qualifications
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List the key requirements and qualifications..."
            />
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Benefits & Perks
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the benefits, perks, and company culture..."
            />
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
            Preview Your Job Post
          </h3>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-lg">{formData.title || 'Job Title'}</h4>
            <p className="text-gray-600">{formData.company}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{formData.location || 'Location'}</span>
              <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" />{formData.experience || 'Experience'}</span>
              <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" />{formData.salary || 'Salary'}</span>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/recruiter/manage-jobs')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Post Job
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;