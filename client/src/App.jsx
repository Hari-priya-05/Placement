import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleRoute from './components/auth/RoleRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentJobs from './pages/student/Jobs';
import StudentApplications from "./pages/student/Applications";
import StudentProfile from './pages/student/Profile';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';

// TPO Pages
import TPODashboard from './pages/tpo/Dashboard';
import ManageStudents from './pages/tpo/ManageStudents';
import ManageRecruiters from './pages/tpo/ManageRecruiters';

// Chatbot
import ChatBot from './components/chatbot/ChatBot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Routes */}
              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['student']}>
                      <StudentDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/jobs"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['student']}>
                      <StudentJobs />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/applications"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['student']}>
                      <StudentApplications />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['student']}>
                      <StudentProfile />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />

              {/* Recruiter Routes */}
              <Route
                path="/recruiter/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['recruiter']}>
                      <RecruiterDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiter/post-job"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['recruiter']}>
                      <PostJob />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recruiter/manage-jobs"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['recruiter']}>
                      <ManageJobs />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />

              {/* TPO Routes */}
              <Route
                path="/tpo/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['tpo']}>
                      <TPODashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tpo/manage-students"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['tpo']}>
                      <ManageStudents />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
                            <Route
                path="/tpo/manage-recruiters"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRoles={['tpo']}>
                      <ManageRecruiters />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;