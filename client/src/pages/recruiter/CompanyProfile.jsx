import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Zap as ZapIcon
} from 'lucide-react';

const CompanyProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
          {
            icon: '💰',
            title: 'Competitive Salary',
            description: 'Industry-leading compensation packages with performance bonuses'
          },
          {
            icon: '🏥',
            title: 'Health Insurance',
            description: 'Comprehensive medical coverage for you and your family'
          },
          {
            icon: '🏠',
            title: 'Remote Work',
            description: 'Flexible work options including work from home'
          },
          {
            icon: '📚',
            title: 'Learning Budget',
            description: '₹50,000 annual budget for courses and certifications'
          },
          {
            icon: '💪',
            title: 'Gym Membership',
            description: 'Free access to partner gyms and fitness centers'
          },
          {
            icon: '🍕',
            title: 'Free Meals',
            description: 'Breakfast, lunch, and snacks at office'
          },
          {
            icon: '✈️',
            title: 'Vacation',
            description: '24 paid leaves + 12 sick leaves per year'
          },
          {
            icon: '🚗',
            title: 'Transport',
            description: 'Cab facility for late evenings'
          }
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
          },
          {
            id: 3,
            type: 'image',
            url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Team Outing'
          },
          {
            id: 4,
            type: 'video',
            url: '#',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            title: 'Company Culture Video'
          }
        ],
        achievements: [
          {
            id: 1,
            title: 'Great Place to Work 2023',
            issuer: 'GPTW Institute',
            date: '2023-12',
            logo: '🏆'
          },
          {
            id: 2,
            title: 'Best Employer Brand',
            issuer: 'LinkedIn',
            date: '2023-10',
            logo: '🌟'
          },
          {
            id: 3,
            title: 'Top 50 Innovative Companies',
            issuer: 'Forbes India',
            date: '2023-08',
            logo: '📈'
          }
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
          },
          {
            id: 3,
            title: 'Data Scientist',
            location: 'Bangalore',
            type: 'Full-time',
            experience: '2-5 years',
            skills: ['Python', 'ML', 'SQL'],
            applicants: 28,
            posted: '5 days ago'
          }
        ]
      };

      setCompanyData(mockCompany);
      setFormData(mockCompany);
      setLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setCompanyData(formData);
    setEditMode(false);
    setSuccessMessage('Company profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
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
          src={companyData.basicInfo.coverImage}
          alt="Company Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        
        {/* Company Logo */}
        <div className="absolute bottom-8 left-8 flex items-end space-x-6">
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl border-4 border-white shadow-xl">
              {companyData.basicInfo.logo}
            </div>
            {editMode && (
              <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">{companyData.basicInfo.companyName}</h1>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {companyData.basicInfo.headquarters}
              </span>
              <span className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Est. {companyData.basicInfo.founded}
              </span>
              <span className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1" />
                {companyData.basicInfo.companySize}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
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
              className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-green-700 transition-all flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData(companyData);
              }}
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

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600">Total Hires</p>
          <p className="text-2xl font-bold text-gray-900">{companyData.recruitmentStats.totalHires}</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-blue-600">Campus Hires</p>
          <p className="text-2xl font-bold text-blue-700">{companyData.recruitmentStats.campusHires}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-600">Avg Package</p>
          <p className="text-2xl font-bold text-green-700">{companyData.recruitmentStats.avgPackage}</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-purple-600">Highest</p>
          <p className="text-2xl font-bold text-purple-700">{companyData.recruitmentStats.highestPackage}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-600">Openings</p>
          <p className="text-2xl font-bold text-yellow-700">{companyData.recruitmentStats.openPositions}</p>
        </div>
        <div className="bg-pink-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-pink-600">Applications</p>
          <p className="text-2xl font-bold text-pink-700">{companyData.recruitmentStats.applicationsThisMonth}</p>
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
                <p className="text-gray-600 leading-relaxed">{companyData.basicInfo.description}</p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <Target className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600">{companyData.basicInfo.mission}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-5">
                  <Eye className="h-6 w-6 text-purple-600 mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600">{companyData.basicInfo.vision}</p>
                </div>
              </div>

              {/* Core Values */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Values</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {companyData.basicInfo.values.map((value, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
                      <Sparkles className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                      <span className="text-sm font-medium text-gray-700">{value}</span>
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
                    <a href={companyData.basicInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {companyData.basicInfo.website}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{companyData.basicInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{companyData.basicInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span>{companyData.basicInfo.headquarters}</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href={companyData.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href={companyData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href={companyData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href={companyData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href={companyData.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a href={companyData.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {companyData.achievements.map((achievement) => (
                    <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
                      <span className="text-3xl mb-2 block">{achievement.logo}</span>
                      <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.issuer}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
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
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{companyData.culture.workLifeBalance}</div>
                    <p className="text-sm text-gray-600 mt-1">Work-Life Balance</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{companyData.culture.learningOpportunities}</div>
                    <p className="text-sm text-gray-600 mt-1">Learning</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{companyData.culture.careerGrowth}</div>
                    <p className="text-sm text-gray-600 mt-1">Career Growth</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">{companyData.culture.managementSupport}</div>
                    <p className="text-sm text-gray-600 mt-1">Management</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600">{companyData.culture.overallRating}</div>
                    <p className="text-sm text-gray-600 mt-1">Overall</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {companyData.benefits.map((benefit, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <span className="text-2xl mb-2 block">{benefit.icon}</span>
                      <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee Reviews */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Reviews</h3>
                <div className="space-y-4">
                  {companyData.culture.reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-600">{review.role}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
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
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {companyData.hrTeam.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      {editMode && (
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {member.phone}
                      </div>
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
                {companyData.openPositions.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {job.type}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.experience}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {job.applicants} Applicants
                        </span>
                        <p className="text-xs text-gray-500 mt-2">{job.posted}</p>
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
                  <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Media
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {companyData.gallery.map((item) => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <p className="text-white text-sm">{item.title}</p>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full">
                        <Video className="h-4 w-4" />
                      </div>
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
                    <p className="text-2xl font-bold text-blue-700">567</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-green-600">Shortlisted</p>
                    <p className="text-2xl font-bold text-green-700">385</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-purple-600">Interviewed</p>
                    <p className="text-2xl font-bold text-purple-700">212</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-yellow-600">Offers</p>
                    <p className="text-2xl font-bold text-yellow-700">98</p>
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
                        <span className="font-medium text-gray-900">{companyData.recruitmentStats.interviewRate}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${companyData.recruitmentStats.interviewRate}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Offer Acceptance</span>
                        <span className="font-medium text-gray-900">{companyData.recruitmentStats.offerAcceptance}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: `${companyData.recruitmentStats.offerAcceptance}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-4">Campus Hiring</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Campus Hires</span>
                      <span className="font-medium text-gray-900">{companyData.recruitmentStats.campusHires}</span>
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

      {/* Quick Actions */}
      <div className="fixed bottom-6 left-6 bg-white rounded-xl shadow-lg p-2">
        <div className="flex flex-col space-y-2">
          <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700" title="Share Profile">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700" title="Download Profile">
            <Download className="h-5 w-5" />
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors text-gray-700" title="Settings">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;