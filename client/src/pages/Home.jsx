import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Users, Award, TrendingUp, Shield, MessageCircle } from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Briefcase,
      title: 'Job Listings',
      description: 'Access hundreds of job opportunities from top recruiters'
    },
    {
      icon: Users,
      title: 'Connect with Recruiters',
      description: 'Direct interaction with company HR and recruitment teams'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Resources and guidance to enhance your skills'
    },
    {
      icon: TrendingUp,
      title: 'Track Applications',
      description: 'Real-time updates on your application status'
    },
    {
      icon: Shield,
      title: 'Verified Recruiters',
      description: 'All recruiters are verified by TPO'
    },
    {
      icon: MessageCircle,
      title: 'AI Career Assistant',
      description: '24/7 AI-powered guidance for your career questions'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20 -mt-8 -mx-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI-Powered Career Placement Portal
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your gateway to dream jobs. Connect with top recruiters, track applications,
            and get AI-powered career guidance all in one place.
          </p>
          {!isAuthenticated ? (
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to={`/${user.role}/dashboard`}
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Portal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Job Opportunities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Recruiters</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-gray-600">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;