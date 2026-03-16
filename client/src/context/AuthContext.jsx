import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock user data for demo
const MOCK_USERS = [
  {
    id: '1',
    email: 'student@demo.com',
    password: 'demo123',
    name: 'Rahul Sharma',
    role: 'student',
    department: 'Computer Science',
    year: 3,
    skills: 'React, Node.js, Python, JavaScript',
    cgpa: 8.5,
    resume_url: 'https://example.com/resume.pdf',
    portfolio: 'https://rahul.dev'
  },
  {
    id: '2',
    email: 'recruiter@demo.com',
    password: 'demo123',
    name: 'Priya Patel',
    role: 'recruiter',
    department: 'HR',
    company_name: 'Tech Corp India',
    website: 'https://techcorp.com',
    position: 'Senior HR Manager'
  },
  {
    id: '3',
    email: 'tpo@demo.com',
    password: 'demo123',
    name: 'Dr. Ajay Kumar',
    role: 'tpo',
    department: 'Training & Placement',
    experience: '15 years'
  }
];

// Mock jobs data
const MOCK_JOBS = [
  {
    id: '101',
    title: 'Senior Frontend Developer',
    company: 'Tech Corp India',
    description: 'Looking for an experienced frontend developer to lead our UI team. You will be responsible for building responsive web applications using modern frameworks.',
    skills_required: 'React, TypeScript, Next.js, Tailwind CSS',
    salary: '₹15,00,000 - ₹20,00,000 per year',
    location: 'Bangalore',
    deadline: '2024-12-31',
    posted_by: '2',
    posted_date: '2024-01-15'
  },
  {
    id: '102',
    title: 'Backend Engineer',
    company: 'Tech Corp India',
    description: 'Join our backend team to build scalable APIs and microservices. Work with cutting-edge technology stack.',
    skills_required: 'Node.js, Python, PostgreSQL, Redis, AWS',
    salary: '₹18,00,000 - ₹25,00,000 per year',
    location: 'Hyderabad',
    deadline: '2024-12-31',
    posted_by: '2',
    posted_date: '2024-01-16'
  },
  {
    id: '103',
    title: 'Full Stack Developer',
    company: 'Startup Innovations',
    description: 'Exciting opportunity for a full stack developer to work on our flagship product.',
    skills_required: 'React, Node.js, MongoDB, Docker',
    salary: '₹12,00,000 - ₹18,00,000 per year',
    location: 'Remote',
    deadline: '2024-11-30',
    posted_by: '2',
    posted_date: '2024-01-17'
  },
  {
    id: '104',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    description: 'Looking for a data scientist to analyze complex data and build ML models.',
    skills_required: 'Python, TensorFlow, SQL, Statistics',
    salary: '₹20,00,000 - ₹28,00,000 per year',
    location: 'Mumbai',
    deadline: '2024-12-15',
    posted_by: '2',
    posted_date: '2024-01-18'
  },
  {
    id: '105',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Ltd',
    description: 'Join our DevOps team to build and maintain cloud infrastructure.',
    skills_required: 'AWS, Docker, Kubernetes, Jenkins, Terraform',
    salary: '₹16,00,000 - ₹22,00,000 per year',
    location: 'Pune',
    deadline: '2024-12-20',
    posted_by: '2',
    posted_date: '2024-01-19'
  }
];

// Mock applications data
const MOCK_APPLICATIONS = [
  {
    id: '201',
    student_id: '1',
    job_id: '101',
    status: 'Shortlisted',
    applied_date: '2024-01-20',
    job: MOCK_JOBS[0]
  },
  {
    id: '202',
    student_id: '1',
    job_id: '102',
    status: 'Applied',
    applied_date: '2024-01-21',
    job: MOCK_JOBS[1]
  },
  {
    id: '203',
    student_id: '1',
    job_id: '103',
    status: 'Interview',
    applied_date: '2024-01-22',
    interview_date: '2024-02-05T10:30:00',
    job: MOCK_JOBS[2]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user
    const savedUser = localStorage.getItem('demo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🔐 Demo login attempt:', email);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create user object (remove password)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store in localStorage
      localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('demo_token', 'demo_jwt_token_' + Date.now());
      
      setUser(userWithoutPassword);
      toast.success(`Welcome ${userWithoutPassword.name}!`);
      
      return userWithoutPassword;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new mock user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        ...userData,
        password: userData.password // In real app, this would be hashed
      };

      // Add to mock users (in memory only)
      MOCK_USERS.push(newUser);
      
      // Create user object without password for storage
      const { password, ...userWithoutPassword } = newUser;
      
      // Store in localStorage
      localStorage.setItem('demo_user', JSON.stringify(userWithoutPassword));
      localStorage.setItem('demo_token', 'demo_jwt_token_' + Date.now());
      
      setUser(userWithoutPassword);
      toast.success('Registration successful!');
      
      return userWithoutPassword;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Mock API functions
  const getJobs = () => {
    return MOCK_JOBS;
  };

  const getJobById = (id) => {
    return MOCK_JOBS.find(job => job.id === id);
  };

  const getStudentApplications = () => {
    if (!user || user.role !== 'student') return [];
    return MOCK_APPLICATIONS.filter(app => app.student_id === user.id);
  };

  const applyForJob = (jobId) => {
    if (!user || user.role !== 'student') return null;
    
    const newApplication = {
      id: String(MOCK_APPLICATIONS.length + 1),
      student_id: user.id,
      job_id: jobId,
      status: 'Applied',
      applied_date: new Date().toISOString().split('T')[0],
      job: MOCK_JOBS.find(j => j.id === jobId)
    };
    
    MOCK_APPLICATIONS.push(newApplication);
    toast.success('Applied successfully!');
    return newApplication;
  };

  const getRecruiterJobs = () => {
    if (!user || user.role !== 'recruiter') return [];
    return MOCK_JOBS.filter(job => job.posted_by === user.id);
  };

  const postJob = (jobData) => {
    if (!user || user.role !== 'recruiter') return null;
    
    const newJob = {
      id: String(MOCK_JOBS.length + 1),
      ...jobData,
      posted_by: user.id,
      posted_date: new Date().toISOString().split('T')[0]
    };
    
    MOCK_JOBS.push(newJob);
    toast.success('Job posted successfully!');
    return newJob;
  };

  const getTPOStats = () => {
    return {
      totalStudents: MOCK_USERS.filter(u => u.role === 'student').length,
      totalRecruiters: MOCK_USERS.filter(u => u.role === 'recruiter').length,
      totalJobs: MOCK_JOBS.length,
      totalApplications: MOCK_APPLICATIONS.length,
      placedStudents: MOCK_APPLICATIONS.filter(a => a.status === 'Selected').length
    };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isRecruiter: user?.role === 'recruiter',
    isTPO: user?.role === 'tpo',
    // Mock API functions
    getJobs,
    getJobById,
    getStudentApplications,
    applyForJob,
    getRecruiterJobs,
    postJob,
    getTPOStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};