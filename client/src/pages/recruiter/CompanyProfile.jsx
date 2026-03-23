import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Building,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Award,
  Star,
  Heart,
  Share2,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Upload,
  Camera,
  Plus,
  Trash2,
  ExternalLink,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Github,
  DollarSign,
  Clock,
  TrendingUp,
  Target,
  Shield,
  Zap,
  Sparkles,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Settings,
  Eye,
  ThumbsUp,
  MessageCircle,
  BarChart3,
  Users as UsersIcon,
  GraduationCap,
  BookOpen,
  Coffee,
  Gift,
  Home,
  Wifi,
  Briefcase as BriefcaseIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Loader,
  RefreshCw,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  MinusCircle,
  Move,
  Copy,
  Flag,
  ShieldCheck,
  Verified
} from 'lucide-react';

const CompanyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [companyData, setCompanyData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [newBenefit, setNewBenefit] = useState({ icon: '💰', title: '', description: '' });
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', email: '', phone: '', avatar: '', color: 'from-blue-500 to-blue-600' });
  const [newAchievement, setNewAchievement] = useState({ title: '', issuer: '', date: '', logo: '🏆' });
  const [newJob, setNewJob] = useState({ title: '', location: '', type: '', experience: '', skills: [], applicants: 0 });
  const [newSkill, setNewSkill] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Color options for team members
  const colorOptions = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-pink-500 to-pink-600',
    'from-orange-500 to-orange-600',
    'from-indigo-500 to-indigo-600',
    'from-red-500 to-red-600',
    'from-teal-500 to-teal-600'
  ];

  // Benefit icons
  const benefitIcons = ['💰', '🏥', '🏠', '📚', '💪', '🍕', '✈️', '🚗', '🎮', '🎵', '🎨', '🏋️', '🧘', '☕', '🍔', '🎉'];

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockCompany = {
        basicInfo: {
          companyName: 'Tech Corp India',
          logo: 'T',
          coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          founded: '2015',
          headquarters: 'Bangalore, India',
          companySize: '500-1000 employees',
          industry: 'Information Technology',
          website: 'https://techcorpindia.com',
          email: 'careers@techcorpindia.com',
          phone: '+91 80 4123 4567',
          description: 'Tech Corp India is a leading technology company specializing in AI, Cloud Computing, and Digital Transformation. We work with Fortune 500 companies to deliver innovative solutions that drive business growth.',
          mission: 'To empower businesses through innovative technology solutions that transform industries and improve lives.',
          vision: 'To be the most trusted technology partner for enterprises globally, known for excellence and innovation.',
          values: [
            'Innovation First',
            'Customer Success',
            'Integrity & Transparency',
            'Diversity & Inclusion',
            'Continuous Learning'
          ]
        },
        socialMedia: {
          linkedin: 'https://linkedin.com/company/techcorp',
          twitter: 'https://twitter.com/techcorp',
          facebook: 'https://facebook.com/techcorp',
          instagram: 'https://instagram.com/techcorp',
          youtube: 'https://youtube.com/techcorp',
          github: 'https://github.com/techcorp'
        },
        hrTeam: [
          {
            id: 1,
            name: 'Priya Sharma',
            role: 'HR Director',
            email: 'priya.sharma@techcorp.com',
            phone: '+91 98765 43210',
            avatar: 'PS',
            color: 'from-pink-500 to-rose-500'
          },
          {
            id: 2,
            name: 'Rahul Verma',
            role: 'Senior Talent Acquisition',
            email: 'rahul.verma@techcorp.com',
            phone: '+91 98765 43211',
            avatar: 'RV',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            id: 3,
            name: 'Anjali Reddy',
            role: 'Campus Recruitment Lead',
            email: 'anjali.reddy@techcorp.com',
            phone: '+91 98765 43212',
            avatar: 'AR',
            color: 'from-purple-500 to-indigo-500'
          }
        ],
        recruitmentStats: {
          totalHires: 345,
          campusHires: 128,
          avgPackage: '12.5 LPA',
          highestPackage: '45 LPA',
          openPositions: 24,
          applicationsThisMonth: 567,
          interviewRate: 68,
          offerAcceptance: 82
        },
        benefits: [
          { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation packages with performance bonuses' },
          { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive medical coverage for you and your family' },
          { icon: '🏠', title: 'Remote Work', description: 'Flexible work options including work from home' },
          { icon: '📚', title: 'Learning Budget', description: '₹50,000 annual budget for courses and certifications' },
          { icon: '💪', title: 'Gym Membership', description: 'Free access to partner gyms and fitness centers' },
          { icon: '🍕', title: 'Free Meals', description: 'Breakfast, lunch, and snacks at office' }
        ],
        culture: {
          workLifeBalance: 4.5,
          learningOpportunities: 4.8,
          careerGrowth: 4.6,
          managementSupport: 4.3,
          overallRating: 4.6,
          reviews: [
            {
              id: 1,
              name: 'Current Employee',
              role: 'Software Engineer',
              rating: 5,
              comment: 'Great work culture, amazing learning opportunities. Management is very supportive.',
              date: '2024-02-15'
            },
            {
              id: 2,
              name: 'Former Employee',
              role: 'Data Scientist',
              rating: 4,
              comment: 'Excellent projects to work on. Good work-life balance.',
              date: '2024-02-10'
            }
          ]
        },
        gallery: [
          {
            id: 1,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Team Meeting'
          },
          {
            id: 2,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Office Space'
          }
        ],
        achievements: [
          { id: 1, title: 'Great Place to Work 2023', issuer: 'GPTW Institute', date: '2023-12', logo: '🏆' },
          { id: 2, title: 'Best Employer Brand', issuer: 'LinkedIn', date: '2023-10', logo: '🌟' },
          { id: 3, title: 'Top 50 Innovative Companies', issuer: 'Forbes India', date: '2023-08', logo: '📈' }
        ],
        openPositions: [
          {
            id: 1,
            title: 'Senior Frontend Developer',
            location: 'Bangalore',
            type: 'Full-time',
            experience: '3-5 years',
            skills: ['React', 'TypeScript', 'Next.js'],
            applicants: 45,
            posted: '2 days ago'
          },
          {
            id: 2,
            title: 'Backend Engineer',
            location: 'Hyderabad',
            type: 'Full-time',
            experience: '2-4 years',
            skills: ['Node.js', 'Python', 'AWS'],
            applicants: 32,
            posted: '3 days ago'
          }
        ]
      };

      setCompanyData(mockCompany);
      setOriginalData(JSON.parse(JSON.stringify(mockCompany)));
      setFormData(mockCompany);
      setLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e, section = null, subSection = null) => {
    const { name, value } = e.target;
    
    if (section === 'basicInfo') {
      setFormData({
        ...formData,
        basicInfo: {
          ...formData.basicInfo,
          [name]: value
        }
      });
    } else if (section === 'socialMedia') {
      setFormData({
        ...formData,
        socialMedia: {
          ...formData.socialMedia,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleArrayAdd = (section, newItem, itemIdKey = 'id') => {
    const newId = Math.max(...(formData[section]?.map(item => item.id) || [0])) + 1;
    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), { ...newItem, id: newId }]
    });
  };

  const handleArrayRemove = (section, id) => {
    setFormData({
      ...formData,
      [section]: formData[section].filter(item => item.id !== id)
    });
  };

  const handleArrayUpdate = (section, id, field, value) => {
    setFormData({
      ...formData,
      [section]: formData[section].map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const handleValueAdd = (section, value) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [section]: [...(formData[section] || []), value.trim()]
      });
    }
  };

  const handleValueRemove = (section, index) => {
    const newValues = [...formData[section]];
    newValues.splice(index, 1);
    setFormData({
      ...formData,
      [section]: newValues
    });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingLogo(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              logo: e.target.result
            }
          });
          setUploadingLogo(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingCover(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              coverImage: e.target.result
            }
          });
          setUploadingCover(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setCompanyData(formData);
      setOriginalData(JSON.parse(JSON.stringify(formData)));
      setEditMode(false);
      setSaving(false);
      setSuccessMessage('Company profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setFormData(JSON.parse(JSON.stringify(originalData)));
    setEditMode(false);
  };

  const addBenefit = () => {
    if (newBenefit.title && newBenefit.description) {
      const newId = Math.max(...(formData.benefits?.map(b => b.id) || [0])) + 1;
      setFormData({
        ...formData,
        benefits: [...(formData.benefits || []), { ...newBenefit, id: newId }]
      });
      setNewBenefit({ icon: '💰', title: '', description: '' });
    }
  };

  const addTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      const newId = Math.max(...(formData.hrTeam?.map(m => m.id) || [0])) + 1;
      const avatar = newTeamMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
      setFormData({
        ...formData,
        hrTeam: [...(formData.hrTeam || []), { ...newTeamMember, id: newId, avatar }]
      });
      setNewTeamMember({ name: '', role: '', email: '', phone: '', avatar: '', color: 'from-blue-500 to-blue-600' });
    }
  };

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.issuer) {
      const newId = Math.max(...(formData.achievements?.map(a => a.id) || [0])) + 1;
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), { ...newAchievement, id: newId }]
      });
      setNewAchievement({ title: '', issuer: '', date: '', logo: '🏆' });
    }
  };

  const addGalleryItem = () => {
    // This would typically open a file picker
    alert('Add gallery item feature - would open file picker');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'culture', label: 'Culture & Benefits', icon: Heart },
    { id: 'team', label: 'HR Team', icon: Users },
    { id: 'positions', label: 'Open Positions', icon: Briefcase },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'stats', label: 'Statistics', icon: BarChart3 }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Building className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cover Image */}
      <div className="relative h-80 rounded-2xl overflow-hidden">
        <img
          src={formData?.basicInfo?.coverImage || formData?.basicInfo?.coverImage}
          alt="Company Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {editMode && (
          <>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <button
              onClick={() => coverInputRef.current.click()}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-lg hover:bg-black/70 transition-colors flex items-center"
            >
              {uploadingCover ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Camera className="h-4 w-4 mr-2" />
              )}
              Change Cover
            </button>
          </>
        )}
        
        {/* Company Logo */}
        <div className="absolute bottom-8 left-8 flex items-end space-x-6">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-xl overflow-hidden">
              {typeof formData?.basicInfo?.logo === 'string' && formData.basicInfo.logo.startsWith('data:') ? (
                <img src={formData.basicInfo.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                formData?.basicInfo?.logo
              )}
            </div>
            {editMode && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  {uploadingLogo ? (
                    <Loader className="h-4 w-4 text-gray-600 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </>
            )}
          </div>
          <div className="text-white">
            {editMode ? (
              <input
                type="text"
                name="companyName"
                value={formData?.basicInfo?.companyName || ''}
                onChange={(e) => handleInputChange(e, 'basicInfo')}
                className="text-4xl font-bold bg-transparent border-b-2 border-white/50 focus:border-white outline-none px-2"
              />
            ) : (
              <h1 className="text-4xl font-bold mb-2">{formData?.basicInfo?.companyName}</h1>
            )}
            <div className="flex items-center space-x-4">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="headquarters"
                    value={formData?.basicInfo?.headquarters || ''}
                    onChange={(e) => handleInputChange(e, 'basicInfo')}
                    className="text-sm bg-transparent border-b border-white/50 focus:border-white outline-none px-1"
                    placeholder="Headquarters"
                  />
                  <input
                    type="text"
                    name="founded"
                    value={formData?.basicInfo?.founded || ''}
                    onChange={(e) => handleInputChange(e, 'basicInfo')}
                    className="text-sm bg-transparent border-b border-white/50 focus:border-white outline-none px-1"
                    placeholder="Founded"
                  />
                  <input
                    type="text"
                    name="companySize"
                    value={formData?.basicInfo?.companySize || ''}
                    onChange={(e) => handleInputChange(e, 'basicInfo')}
                    className="text-sm bg-transparent border-b border-white/50 focus:border-white outline-none px-1"
                    placeholder="Company Size"
                  />
                </>
              ) : (
                <>
                  <span className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {formData?.basicInfo?.headquarters}
                  </span>
                  <span className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Est. {formData?.basicInfo?.founded}
                  </span>
                  <span className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {formData?.basicInfo?.companySize}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center text-gray-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-green-700 transition-all flex items-center disabled:opacity-50"
            >
              {saving ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-gray-700 transition-all flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center animate-slideDown">
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600">Total Hires</p>
          <p className="text-2xl font-bold text-gray-900">{formData?.recruitmentStats?.totalHires}</p>
          {editMode && (
            <input
              type="number"
              name="totalHires"
              value={formData?.recruitmentStats?.totalHires || 0}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, totalHires: parseInt(e.target.value) }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-blue-600">Campus Hires</p>
          <p className="text-2xl font-bold text-blue-700">{formData?.recruitmentStats?.campusHires}</p>
          {editMode && (
            <input
              type="number"
              value={formData?.recruitmentStats?.campusHires || 0}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, campusHires: parseInt(e.target.value) }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-600">Avg Package</p>
          <p className="text-2xl font-bold text-green-700">{formData?.recruitmentStats?.avgPackage}</p>
          {editMode && (
            <input
              type="text"
              value={formData?.recruitmentStats?.avgPackage || ''}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, avgPackage: e.target.value }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-purple-600">Highest Package</p>
          <p className="text-2xl font-bold text-purple-700">{formData?.recruitmentStats?.highestPackage}</p>
          {editMode && (
            <input
              type="text"
              value={formData?.recruitmentStats?.highestPackage || ''}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, highestPackage: e.target.value }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-600">Open Positions</p>
          <p className="text-2xl font-bold text-yellow-700">{formData?.recruitmentStats?.openPositions}</p>
          {editMode && (
            <input
              type="number"
              value={formData?.recruitmentStats?.openPositions || 0}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, openPositions: parseInt(e.target.value) }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
        <div className="bg-pink-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-pink-600">Applications</p>
          <p className="text-2xl font-bold text-pink-700">{formData?.recruitmentStats?.applicationsThisMonth}</p>
          {editMode && (
            <input
              type="number"
              value={formData?.recruitmentStats?.applicationsThisMonth || 0}
              onChange={(e) => setFormData({
                ...formData,
                recruitmentStats: { ...formData.recruitmentStats, applicationsThisMonth: parseInt(e.target.value) }
              })}
              className="mt-1 w-full text-sm border rounded px-2 py-1"
            />
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap flex items-center transition-colors ${
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

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Company Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About Us</h3>
                {editMode ? (
                  <textarea
                    name="description"
                    value={formData?.basicInfo?.description || ''}
                    onChange={(e) => handleInputChange(e, 'basicInfo')}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-600 leading-relaxed">{formData?.basicInfo?.description}</p>
                )}
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <Target className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
                  {editMode ? (
                    <textarea
                      name="mission"
                      value={formData?.basicInfo?.mission || ''}
                      onChange={(e) => handleInputChange(e, 'basicInfo')}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData?.basicInfo?.mission}</p>
                  )}
                </div>
                <div className="bg-purple-50 rounded-xl p-5">
                  <Eye className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                  {editMode ? (
                    <textarea
                      name="vision"
                      value={formData?.basicInfo?.vision || ''}
                      onChange={(e) => handleInputChange(e, 'basicInfo')}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{formData?.basicInfo?.vision}</p>
                  )}
                </div>
              </div>

              {/* Core Values */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Core Values</h3>
                  {editMode && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a value"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && e.target.value) {
                            handleValueAdd('basicInfo.values', e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData?.basicInfo?.values?.map((value, idx) => (
                    <div key={idx} className="relative">
                      <div className="bg-gray-50 rounded-lg p-3 text-center min-w-[120px]">
                        <Sparkles className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                        {editMode ? (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => {
                              const newValues = [...formData.basicInfo.values];
                              newValues[idx] = e.target.value;
                              setFormData({
                                ...formData,
                                basicInfo: { ...formData.basicInfo, values: newValues }
                              });
                            }}
                            className="text-sm text-center bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-700">{value}</span>
                        )}
                      </div>
                      {editMode && (
                        <button
                          onClick={() => handleValueRemove('basicInfo.values', idx)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    {editMode ? (
                      <input
                        type="url"
                        name="website"
                        value={formData?.basicInfo?.website || ''}
                        onChange={(e) => handleInputChange(e, 'basicInfo')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <a href={formData?.basicInfo?.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {formData?.basicInfo?.website}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData?.basicInfo?.email || ''}
                        onChange={(e) => handleInputChange(e, 'basicInfo')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span>{formData?.basicInfo?.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    {editMode ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData?.basicInfo?.phone || ''}
                        onChange={(e) => handleInputChange(e, 'basicInfo')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span>{formData?.basicInfo?.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    {editMode ? (
                      <input
                        type="text"
                        name="headquarters"
                        value={formData?.basicInfo?.headquarters || ''}
                        onChange={(e) => handleInputChange(e, 'basicInfo')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <span>{formData?.basicInfo?.headquarters}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect With Us</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(formData?.socialMedia || {}).map(([platform, url]) => (
                    <div key={platform} className="flex items-center space-x-2">
                      {platform === 'linkedin' && <Linkedin className="h-5 w-5 text-blue-700" />}
                      {platform === 'twitter' && <Twitter className="h-5 w-5 text-blue-400" />}
                      {platform === 'facebook' && <Facebook className="h-5 w-5 text-blue-600" />}
                      {platform === 'instagram' && <Instagram className="h-5 w-5 text-pink-600" />}
                      {platform === 'youtube' && <Youtube className="h-5 w-5 text-red-600" />}
                      {platform === 'github' && <Github className="h-5 w-5 text-gray-800" />}
                      {editMode ? (
                        <input
                          type="url"
                          name={platform}
                          value={url}
                          onChange={(e) => handleInputChange(e, 'socialMedia')}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`${platform} URL`}
                        />
                      ) : (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                          {platform}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                  {editMode && (
                    <button
                      onClick={() => {
                        setNewAchievement({ title: '', issuer: '', date: '', logo: '🏆' });
                        // Open modal or inline form
                        const title = prompt('Achievement Title');
                        const issuer = prompt('Issuer');
                        if (title && issuer) {
                          addAchievement();
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Achievement
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData?.achievements?.map((achievement) => (
                    <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 relative">
                      <span className="text-3xl mb-2 block">{achievement.logo}</span>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            value={achievement.title}
                            onChange={(e) => handleArrayUpdate('achievements', achievement.id, 'title', e.target.value)}
                            className="font-medium text-gray-900 w-full mb-1 border rounded px-2 py-1"
                          />
                          <input
                            type="text"
                            value={achievement.issuer}
                            onChange={(e) => handleArrayUpdate('achievements', achievement.id, 'issuer', e.target.value)}
                            className="text-sm text-gray-600 w-full border rounded px-2 py-1"
                          />
                          <input
                            type="text"
                            value={achievement.date}
                            onChange={(e) => handleArrayUpdate('achievements', achievement.id, 'date', e.target.value)}
                            className="text-xs text-gray-500 w-full mt-1 border rounded px-2 py-1"
                          />
                          <button
                            onClick={() => handleArrayRemove('achievements', achievement.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.issuer}</p>
                          <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Culture & Benefits Tab */}
          {activeTab === 'culture' && (
            <div className="space-y-8">
              {/* Culture Ratings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Culture Ratings</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(formData?.culture || {}).map(([key, value]) => {
                    if (key !== 'reviews' && key !== 'overallRating') {
                      return (
                        <div key={key} className="text-center">
                          <div className="text-3xl font-bold text-blue-600">
                            {editMode ? (
                              <input
                                type="number"
                                step="0.1"
                                value={value}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  culture: { ...formData.culture, [key]: parseFloat(e.target.value) }
                                })}
                                className="w-20 text-center text-2xl font-bold border rounded px-2 py-1"
                              />
                            ) : (
                              value
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">{formData?.culture?.overallRating}</div>
                    <p className="text-sm text-gray-600 mt-1">Overall</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Benefits & Perks</h3>
                  {editMode && (
                    <button
                      onClick={() => {
                        const title = prompt('Benefit Title');
                        const description = prompt('Benefit Description');
                        if (title && description) {
                          const newId = Math.max(...(formData.benefits?.map(b => b.id) || [0])) + 1;
                          setFormData({
                            ...formData,
                            benefits: [...(formData.benefits || []), { id: newId, icon: '💰', title, description }]
                          });
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Benefit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData?.benefits?.map((benefit, idx) => (
                    <div key={benefit.id} className="border border-gray-200 rounded-lg p-4 relative">
                      <span className="text-2xl mb-2 block">
                        {editMode ? (
                          <select
                            value={benefit.icon}
                            onChange={(e) => handleArrayUpdate('benefits', benefit.id, 'icon', e.target.value)}
                            className="text-2xl bg-transparent"
                          >
                            {benefitIcons.map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        ) : (
                          benefit.icon
                        )}
                      </span>
                      {editMode ? (
                        <>
                          <input
                            type="text"
                            value={benefit.title}
                            onChange={(e) => handleArrayUpdate('benefits', benefit.id, 'title', e.target.value)}
                            className="font-medium text-gray-900 w-full mb-1 border rounded px-2 py-1 text-sm"
                          />
                          <input
                            type="text"
                            value={benefit.description}
                            onChange={(e) => handleArrayUpdate('benefits', benefit.id, 'description', e.target.value)}
                            className="text-xs text-gray-600 w-full border rounded px-2 py-1"
                          />
                          <button
                            onClick={() => handleArrayRemove('benefits', benefit.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <>
                          <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee Reviews */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Reviews</h3>
                <div className="space-y-4">
                  {formData?.culture?.reviews?.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {editMode ? (
                              <input
                                type="text"
                                value={review.name}
                                onChange={(e) => handleArrayUpdate('culture.reviews', review.id, 'name', e.target.value)}
                                className="border rounded px-2 py-1"
                              />
                            ) : (
                              review.name
                            )}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {editMode ? (
                              <input
                                type="text"
                                value={review.role}
                                onChange={(e) => handleArrayUpdate('culture.reviews', review.id, 'role', e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                              />
                            ) : (
                              review.role
                            )}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          {editMode && (
                            <input
                              type="number"
                              min="1"
                              max="5"
                              value={review.rating}
                              onChange={(e) => handleArrayUpdate('culture.reviews', review.id, 'rating', parseInt(e.target.value))}
                              className="w-12 ml-2 border rounded px-1 py-1 text-sm"
                            />
                          )}
                        </div>
                      </div>
                      {editMode ? (
                        <textarea
                          value={review.comment}
                          onChange={(e) => handleArrayUpdate('culture.reviews', review.id, 'comment', e.target.value)}
                          className="text-sm text-gray-600 w-full border rounded px-3 py-2"
                          rows="2"
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                      {editMode && (
                        <button
                          onClick={() => handleArrayRemove('culture.reviews', review.id)}
                          className="mt-2 text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove Review
                        </button>
                      )}
                    </div>
                  ))}
                  {editMode && (
                    <button
                      onClick={() => {
                        const newReview = {
                          id: Math.max(...(formData.culture?.reviews?.map(r => r.id) || [0])) + 1,
                          name: 'New Reviewer',
                          role: 'Employee',
                          rating: 4,
                          comment: 'Write your review here...',
                          date: new Date().toISOString().split('T')[0]
                        };
                        setFormData({
                          ...formData,
                          culture: {
                            ...formData.culture,
                            reviews: [...(formData.culture?.reviews || []), newReview]
                          }
                        });
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* HR Team Tab */}
          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">HR Team</h3>
                {editMode && (
                  <button
                    onClick={() => {
                      const name = prompt('Team Member Name');
                      const role = prompt('Role');
                      if (name && role) {
                        const newId = Math.max(...(formData.hrTeam?.map(m => m.id) || [0])) + 1;
                        const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();
                        setFormData({
                          ...formData,
                          hrTeam: [...(formData.hrTeam || []), {
                            id: newId,
                            name,
                            role,
                            email: '',
                            phone: '',
                            avatar,
                            color: colorOptions[Math.floor(Math.random() * colorOptions.length)]
                          }]
                        });
                      }
                    }}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData?.hrTeam?.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-xl p-5 relative">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleArrayUpdate('hrTeam', member.id, 'name', e.target.value)}
                              className="font-semibold text-gray-900 w-full border rounded px-2 py-1 mb-1"
                            />
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleArrayUpdate('hrTeam', member.id, 'role', e.target.value)}
                              className="text-sm text-gray-600 w-full border rounded px-2 py-1"
                            />
                          </>
                        ) : (
                          <>
                            <h4 className="font-semibold text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </>
                        )}
                      </div>
                      {editMode && (
                        <button
                          onClick={() => handleArrayRemove('hrTeam', member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {editMode ? (
                          <input
                            type="email"
                            value={member.email}
                            onChange={(e) => handleArrayUpdate('hrTeam', member.id, 'email', e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Email"
                          />
                        ) : (
                          member.email || 'Not provided'
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {editMode ? (
                          <input
                            type="tel"
                            value={member.phone}
                            onChange={(e) => handleArrayUpdate('hrTeam', member.id, 'phone', e.target.value)}
                            className="flex-1 border rounded px-2 py-1"
                            placeholder="Phone"
                          />
                        ) : (
                          member.phone || 'Not provided'
                        )}
                      </div>
                      {editMode && (
                        <select
                          value={member.color}
                          onChange={(e) => handleArrayUpdate('hrTeam', member.id, 'color', e.target.value)}
                          className="w-full mt-2 text-sm border rounded px-2 py-1"
                        >
                          {colorOptions.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Open Positions Tab */}
          {activeTab === 'positions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Open Positions</h3>
                <Link to="/recruiter/post-job">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </button>
                </Link>
              </div>
              <div className="space-y-4">
                {formData?.openPositions?.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        {editMode ? (
                          <input
                            type="text"
                            value={job.title}
                            onChange={(e) => handleArrayUpdate('openPositions', job.id, 'title', e.target.value)}
                            className="font-semibold text-gray-900 text-lg border rounded px-2 py-1 mb-2 w-64"
                          />
                        ) : (
                          <h4 className="font-semibold text-gray-900 text-lg">{job.title}</h4>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {editMode ? (
                              <input
                                type="text"
                                value={job.location}
                                onChange={(e) => handleArrayUpdate('openPositions', job.id, 'location', e.target.value)}
                                className="border rounded px-2 py-1 w-32"
                              />
                            ) : (
                              job.location
                            )}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {editMode ? (
                              <input
                                type="text"
                                value={job.type}
                                onChange={(e) => handleArrayUpdate('openPositions', job.id, 'type', e.target.value)}
                                className="border rounded px-2 py-1 w-28"
                              />
                            ) : (
                              job.type
                            )}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {editMode ? (
                              <input
                                type="text"
                                value={job.experience}
                                onChange={(e) => handleArrayUpdate('openPositions', job.id, 'experience', e.target.value)}
                                className="border rounded px-2 py-1 w-28"
                              />
                            ) : (
                              job.experience
                            )}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {editMode && (
                            <button
                              onClick={() => {
                                const newSkill = prompt('Add skill');
                                if (newSkill) {
                                  const updatedSkills = [...job.skills, newSkill];
                                  handleArrayUpdate('openPositions', job.id, 'skills', updatedSkills);
                                }
                              }}
                              className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200"
                            >
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.applicants} Applicants
                        </span>
                        <p className="text-xs text-gray-500 mt-2">{job.posted}</p>
                        {editMode && (
                          <button
                            onClick={() => handleArrayRemove('openPositions', job.id)}
                            className="mt-2 text-red-500 hover:text-red-700 text-xs"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Gallery</h3>
                {editMode && (
                  <button
                    onClick={addGalleryItem}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Media
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData?.gallery?.map((item) => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      {editMode ? (
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleArrayUpdate('gallery', item.id, 'title', e.target.value)}
                          className="text-white text-sm bg-transparent border-b border-white/50 focus:border-white outline-none w-full"
                        />
                      ) : (
                        <p className="text-white text-sm">{item.title}</p>
                      )}
                    </div>
                    {editMode && (
                      <button
                        onClick={() => handleArrayRemove('gallery', item.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Statistics Tab */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              {/* Recruitment Funnel */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Funnel</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-blue-600">Applications</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {editMode ? (
                        <input
                          type="number"
                          value={formData?.recruitmentStats?.applicationsThisMonth}
                          onChange={(e) => setFormData({
                            ...formData,
                            recruitmentStats: { ...formData.recruitmentStats, applicationsThisMonth: parseInt(e.target.value) }
                          })}
                          className="w-20 text-center text-2xl font-bold border rounded"
                        />
                      ) : (
                        formData?.recruitmentStats?.applicationsThisMonth
                      )}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-green-600">Shortlisted</p>
                    <p className="text-2xl font-bold text-green-700">
                      {Math.round(formData?.recruitmentStats?.applicationsThisMonth * 0.68)}
                    </p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-purple-600">Interviewed</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {Math.round(formData?.recruitmentStats?.applicationsThisMonth * 0.45)}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-yellow-600">Offers</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {Math.round(formData?.recruitmentStats?.applicationsThisMonth * 0.28)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hiring Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Hiring Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Interview Rate</span>
                        <span className="font-medium text-gray-900">
                          {editMode ? (
                            <input
                              type="number"
                              value={formData?.recruitmentStats?.interviewRate}
                              onChange={(e) => setFormData({
                                ...formData,
                                recruitmentStats: { ...formData.recruitmentStats, interviewRate: parseInt(e.target.value) }
                              })}
                              className="w-16 text-right border rounded px-2 py-1"
                            />
                          ) : (
                            `${formData?.recruitmentStats?.interviewRate}%`
                          )}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${formData?.recruitmentStats?.interviewRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Offer Acceptance</span>
                        <span className="font-medium text-gray-900">
                          {editMode ? (
                            <input
                              type="number"
                              value={formData?.recruitmentStats?.offerAcceptance}
                              onChange={(e) => setFormData({
                                ...formData,
                                recruitmentStats: { ...formData.recruitmentStats, offerAcceptance: parseInt(e.target.value) }
                              })}
                              className="w-16 text-right border rounded px-2 py-1"
                            />
                          ) : (
                            `${formData?.recruitmentStats?.offerAcceptance}%`
                          )}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${formData?.recruitmentStats?.offerAcceptance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Campus Hiring</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Campus Hires</span>
                      <span className="font-medium text-gray-900">
                        {editMode ? (
                          <input
                            type="number"
                            value={formData?.recruitmentStats?.campusHires}
                            onChange={(e) => setFormData({
                              ...formData,
                              recruitmentStats: { ...formData.recruitmentStats, campusHires: parseInt(e.target.value) }
                            })}
                            className="w-20 text-right border rounded px-2 py-1"
                          />
                        ) : (
                          formData?.recruitmentStats?.campusHires
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Target for 2024</span>
                      <span className="font-medium text-gray-900">150</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Campus Package</span>
                      <span className="font-medium text-gray-900">₹10.5 LPA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;