import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Briefcase,
  Award,
  DollarSign,
  Calendar,
  Download,
  Filter,
  ChevronRight,
  Star,
  Target,
  Activity,
  Sparkles,
  Zap,
  CheckCircle,
  Clock,
  Building,
  GraduationCap,
  BookOpen,
  MapPin,
  Globe,
  Heart,
  Share2,
  Eye,
  FileText,
  Printer
} from 'lucide-react';

const AnalyticsReport = () => {
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockReport = {
        overview: {
          totalStudents: 450,
          placedStudents: 385,
          placementPercentage: 85.6,
          averagePackage: '8.5 LPA',
          highestPackage: '45 LPA',
          totalCompanies: 48,
          totalOffers: 412,
          multipleOffers: 27
        },
        branchWise: [
          { branch: 'Computer Science', total: 120, placed: 108, percentage: 90, avgPackage: '12.5 LPA', highest: '45 LPA' },
          { branch: 'Information Technology', total: 95, placed: 82, percentage: 86.3, avgPackage: '10.2 LPA', highest: '38 LPA' },
          { branch: 'Electronics', total: 85, placed: 70, percentage: 82.4, avgPackage: '8.5 LPA', highest: '32 LPA' },
          { branch: 'Mechanical', total: 75, placed: 58, percentage: 77.3, avgPackage: '7.2 LPA', highest: '28 LPA' },
          { branch: 'Civil', total: 45, placed: 32, percentage: 71.1, avgPackage: '6.8 LPA', highest: '25 LPA' },
          { branch: 'Electrical', total: 30, placed: 22, percentage: 73.3, avgPackage: '7.5 LPA', highest: '30 LPA' }
        ],
        monthlyPlacements: [
          { month: 'Jan', count: 45 },
          { month: 'Feb', count: 62 },
          { month: 'Mar', count: 78 },
          { month: 'Apr', count: 95 },
          { month: 'May', count: 110 },
          { month: 'Jun', count: 85 },
          { month: 'Jul', count: 72 },
          { month: 'Aug', count: 58 },
          { month: 'Sep', count: 42 },
          { month: 'Oct', count: 35 },
          { month: 'Nov', count: 28 },
          { month: 'Dec', count: 20 }
        ],
        companyWise: [
          { company: 'Google', offers: 15, package: '45 LPA' },
          { company: 'Microsoft', offers: 18, package: '42 LPA' },
          { company: 'Amazon', offers: 22, package: '38 LPA' },
          { company: 'Goldman Sachs', offers: 12, package: '35 LPA' },
          { company: 'Flipkart', offers: 14, package: '32 LPA' },
          { company: 'Uber', offers: 8, package: '30 LPA' }
        ],
        packageDistribution: [
          { range: '5-10 LPA', count: 85 },
          { range: '10-15 LPA', count: 120 },
          { range: '15-20 LPA', count: 95 },
          { range: '20-25 LPA', count: 45 },
          { range: '25-30 LPA', count: 28 },
          { range: '30+ LPA', count: 12 }
        ],
        genderWise: {
          male: 280,
          female: 165,
          other: 5
        },
        topRecruiters: [
          { name: 'Google', count: 15, package: '45 LPA' },
          { name: 'Microsoft', count: 18, package: '42 LPA' },
          { name: 'Amazon', count: 22, package: '38 LPA' },
          { name: 'Goldman Sachs', count: 12, package: '35 LPA' },
          { name: 'Flipkart', count: 14, package: '32 LPA' }
        ],
        skillDemand: [
          { skill: 'React', demand: 85 },
          { skill: 'Node.js', demand: 78 },
          { skill: 'Python', demand: 92 },
          { skill: 'Java', demand: 88 },
          { skill: 'AWS', demand: 72 },
          { skill: 'Docker', demand: 65 },
          { skill: 'SQL', demand: 94 },
          { skill: 'Machine Learning', demand: 70 }
        ],
        placementTrends: {
          '2020': 72,
          '2021': 78,
          '2022': 82,
          '2023': 84,
          '2024': 85.6
        }
      };

      setReportData(mockReport);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BarChart3 className="h-8 w-8 text-blue-600 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <BarChart3 className="h-8 w-8 mr-3" />
              Placement Analytics Report
            </h1>
            <p className="text-blue-100 text-lg">
              Comprehensive insights and statistics for placement season 2024
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex space-x-4 mt-6">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-700 bg-white border-0 focus:ring-2 focus:ring-white"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-4 py-2 rounded-lg text-gray-700 bg-white border-0 focus:ring-2 focus:ring-white"
          >
            <option value="all">All Branches</option>
            <option value="cse">Computer Science</option>
            <option value="it">Information Technology</option>
            <option value="ece">Electronics</option>
            <option value="mech">Mechanical</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Placement %</p>
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reportData.overview.placementPercentage}%</p>
          <p className="text-xs text-green-600 mt-1">↑ 2.4% from 2023</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Package</p>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reportData.overview.averagePackage}</p>
          <p className="text-xs text-green-600 mt-1">↑ 8.2% from 2023</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Companies</p>
            <Building className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reportData.overview.totalCompanies}</p>
          <p className="text-xs text-gray-500 mt-1">+6 new this year</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Offers</p>
            <Award className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{reportData.overview.totalOffers}</p>
          <p className="text-xs text-gray-500 mt-1">{reportData.overview.multipleOffers} students with multiple offers</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Branch-wise Placement */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Branch-wise Placement</h2>
            <div className="space-y-4">
              {reportData.branchWise.map((branch, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{branch.branch}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({branch.placed}/{branch.total})
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">{branch.percentage}%</span>
                      <span className="text-sm text-green-600">{branch.avgPackage}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full h-2"
                      style={{ width: `${branch.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Placement Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Placement Trend</h2>
            <div className="flex items-end justify-between h-64">
              {reportData.monthlyPlacements.map((month, idx) => (
                <div key={idx} className="flex flex-col items-center w-1/12">
                  <div className="relative w-full px-1">
                    <div
                      className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg"
                      style={{ height: `${(month.count / 110) * 200}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Package Distribution</h2>
            <div className="space-y-3">
              {reportData.packageDistribution.map((pkg, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{pkg.range}</span>
                    <span className="text-sm font-medium text-gray-900">{pkg.count} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full h-2"
                      style={{ width: `${(pkg.count / 120) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Top Recruiters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Recruiters</h2>
            <div className="space-y-4">
              {reportData.topRecruiters.map((recruiter, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {recruiter.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{recruiter.name}</p>
                      <p className="text-xs text-gray-500">{recruiter.count} offers</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">{recruiter.package}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Demand */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Most Demanded Skills</h2>
            <div className="space-y-3">
              {reportData.skillDemand.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{skill.skill}</span>
                    <span className="text-sm font-medium text-gray-900">{skill.demand}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-full h-2"
                      style={{ width: `${skill.demand}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Trends */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Year-on-Year Trend</h2>
            <div className="space-y-3">
              {Object.entries(reportData.placementTrends).map(([year, percentage]) => (
                <div key={year}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">{year}</span>
                    <span className="text-sm font-medium text-gray-900">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full h-2"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-green-600 mt-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              {reportData.placementTrends['2024'] - reportData.placementTrends['2020']}% growth since 2020
            </p>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h2>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Male</span>
                  <span className="text-sm font-medium text-gray-900">{reportData.genderWise.male}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${(reportData.genderWise.male / reportData.overview.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Female</span>
                  <span className="text-sm font-medium text-gray-900">{reportData.genderWise.female}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-pink-600 rounded-full h-2"
                    style={{ width: `${(reportData.genderWise.female / reportData.overview.totalStudents) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReport;