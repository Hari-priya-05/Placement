import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  Calendar,
  Download,
  Upload,
  Filter,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MapPin,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  Zap,
  Target,
  Heart,
  Share2,
  Printer
} from 'lucide-react';

const ManageStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showBulkActionModal, setShowBulkActionModal] = useState(false);
  const [filters, setFilters] = useState({
    cgpaMin: '',
    cgpaMax: '',
    skills: [],
    placed: 'all',
    year: 'all'
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockStudents = [
        { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@college.edu', phone: '+91 98765 43210', cgpa: 8.5, placed: true, applications: 5, interviews: 3, year: '4th', branch: 'Computer Science' },
        { id: 2, name: 'Priya Patel', email: 'priya.patel@college.edu', phone: '+91 98765 43211', cgpa: 9.2, placed: true, applications: 8, interviews: 5, year: '4th', branch: 'Information Technology' },
        { id: 3, name: 'Amit Kumar', email: 'amit.kumar@college.edu', phone: '+91 98765 43212', cgpa: 7.8, placed: false, applications: 3, interviews: 1, year: '4th', branch: 'Electronics' },
        { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@college.edu', phone: '+91 98765 43213', cgpa: 8.9, placed: true, applications: 6, interviews: 4, year: '4th', branch: 'Computer Science' },
        { id: 5, name: 'Vikram Singh', email: 'vikram.singh@college.edu', phone: '+91 98765 43214', cgpa: 7.2, placed: false, applications: 2, interviews: 0, year: '3rd', branch: 'Mechanical' },
        { id: 6, name: 'Anjali Gupta', email: 'anjali.gupta@college.edu', phone: '+91 98765 43215', cgpa: 8.8, placed: true, applications: 7, interviews: 4, year: '4th', branch: 'Computer Science' },
        { id: 7, name: 'Rohan Mishra', email: 'rohan.mishra@college.edu', phone: '+91 98765 43216', cgpa: 6.9, placed: false, applications: 1, interviews: 0, year: '3rd', branch: 'Civil' },
        { id: 8, name: 'Kavya Nair', email: 'kavya.nair@college.edu', phone: '+91 98765 43217', cgpa: 9.0, placed: true, applications: 9, interviews: 6, year: '4th', branch: 'Information Technology' },
      ];
      setStudents(mockStudents);
    }, 500);
  }, []);

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{students.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-green-600">Placed</p>
          <p className="text-2xl font-bold text-green-700">{students.filter(s => s.placed).length}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-yellow-600">Eligible</p>
          <p className="text-2xl font-bold text-yellow-700">{students.filter(s => s.cgpa >= 7.0 && !s.placed).length}</p>
        </div>
        <div className="bg-purple-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-purple-600">Applied</p>
          <p className="text-2xl font-bold text-purple-700">{students.filter(s => s.applications > 0).length}</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-blue-600">Interviews</p>
          <p className="text-2xl font-bold text-blue-700">{students.filter(s => s.interviews > 0).length}</p>
        </div>
        <div className="bg-indigo-50 rounded-xl shadow-sm p-4">
          <p className="text-sm text-indigo-600">Avg CGPA</p>
          <p className="text-2xl font-bold text-indigo-700">
            {students.length > 0 ? (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2) : '0.00'}
          </p>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStudents.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-700">{selectedStudents.length} students selected</span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Send Email
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Update Status
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 md:mt-0 flex space-x-3">
        <button
          onClick={() => setShowImportModal(true)}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          Import
        </button>
        <button
          onClick={() => setShowExportModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CGPA Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.cgpaMin}
                    onChange={(e) => setFilters({...filters, cgpaMin: e.target.value})}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.cgpaMax}
                    onChange={(e) => setFilters({...filters, cgpaMax: e.target.value})}
                    className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Placement Status</label>
                <select
                  value={filters.placed}
                  onChange={(e) => setFilters({...filters, placed: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All</option>
                  <option value="placed">Placed</option>
                  <option value="not_placed">Not Placed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Years</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Import Students</h3>
            <p className="text-gray-600 mb-6">Upload a CSV file with student data. Download the template below.</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop your file here</p>
              <p className="text-xs text-gray-500">or</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Browse Files
              </button>
            </div>

            <div className="flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Download Template
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Export Data</h3>
            <div className="space-y-4 mb-6">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="export" className="mr-3" defaultChecked />
                <div>
                  <p className="font-medium text-gray-900">All Students</p>
                  <p className="text-sm text-gray-500">Export complete student database</p>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="export" className="mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Placed Students Only</p>
                  <p className="text-sm text-gray-500">Export only placed students data</p>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="export" className="mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Eligible Students</p>
                  <p className="text-sm text-gray-500">Students eligible for placements</p>
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
