import React, { useState, useEffect } from 'react';
import axios from '/src/api/axios';
import Card from '/src/components/ui/Card';
import { Clock, Briefcase, Building, Calendar } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/applications/my-applications');
      setApplications(response.data.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Selected': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Applied': return '📝';
      case 'Shortlisted': return '⭐';
      case 'Interview': return '🎯';
      case 'Selected': return '🎉';
      case 'Rejected': return '❌';
      default: return '📌';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">Track the status of your job applications</p>
      </div>

      {applications.length === 0 ? (
        <Card className="text-center py-12">
          <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-600">Start applying to jobs to see them here</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {app.jobs?.title}
                      </h2>
                      <div className="flex items-center mt-1 text-gray-600">
                        <Building className="h-4 w-4 mr-1" />
                        {app.jobs?.company}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)} {app.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Applied: {new Date(app.applied_at).toLocaleDateString()}
                    </div>
                    {app.jobs?.deadline && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2" />
                        Deadline: {new Date(app.jobs.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {app.jobs?.skills_required && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Skills required:</span> {app.jobs.skills_required}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;