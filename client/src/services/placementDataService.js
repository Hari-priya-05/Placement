// ============================================
// CENTRAL DATA SERVICE FOR ALL THREE ROLES
// ============================================
// All data is stored in localStorage and syncs across all dashboards
// No UI changes needed - just replace API calls with these functions

// Initialize storage structure
const initStorage = () => {
  if (!localStorage.getItem('placement_portal_data')) {
    const initialData = {
      // Core tables
      users: [],
      students: [],
      recruiters: [],
      jobs: [],
      applications: [],
      placementDrives: [],
      chatHistory: [],
      
      // Tracking
      nextIds: {
        user: 100,
        job: 1000,
        application: 2000,
        drive: 3000
      },
      
      // Metadata
      lastUpdated: new Date().toISOString()
    };
    
    // Add default demo data
    addDefaultData(initialData);
    localStorage.setItem('placement_portal_data', JSON.stringify(initialData));
  }
  return JSON.parse(localStorage.getItem('placement_portal_data'));
};

const saveData = (data) => {
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem('placement_portal_data', JSON.stringify(data));
  // Dispatch event to notify other components
  window.dispatchEvent(new CustomEvent('placementDataUpdated', { detail: data }));
};

// ============================================
// DEFAULT DEMO DATA
// ============================================
const addDefaultData = (data) => {
  // Demo Student
  data.users.push({
    id: '1',
    email: 'student@demo.com',
    password: 'demo123',
    name: 'Rahul Sharma',
    role: 'student',
    department: 'Computer Science',
    year: 4,
    createdAt: '2024-01-01'
  });
  
  data.students.push({
    id: '101',
    userId: '1',
    skills: ['React', 'Node.js', 'Python', 'JavaScript', 'SQL', 'MongoDB'],
    cgpa: 8.7,
    resumeUrl: null,
    portfolio: 'https://rahul.dev',
    linkedin: 'https://linkedin.com/in/rahul',
    github: 'https://github.com/rahul',
    bio: 'Passionate full-stack developer looking for SDE roles',
    phone: '+91 98765 43210',
    projects: [
      { title: 'AI Placement Portal', technologies: ['React', 'Node.js', 'AI'], year: '2024' },
      { title: 'E-commerce Platform', technologies: ['MERN', 'Redux'], year: '2023' }
    ],
    achievements: ['CodeChef 4⭐', 'Hackathon Winner 2023']
  });
  
  // Demo Recruiter
  data.users.push({
    id: '2',
    email: 'recruiter@demo.com',
    password: 'demo123',
    name: 'Priya Patel',
    role: 'recruiter',
    department: 'HR',
    createdAt: '2024-01-01'
  });
  
  data.recruiters.push({
    id: '201',
    userId: '2',
    companyName: 'Tech Corp India',
    website: 'https://techcorp.com',
    hrName: 'Priya Patel',
    hrEmail: 'priya@techcorp.com',
    hrPhone: '+91 98765 43211',
    description: 'Leading technology company specializing in AI and Cloud Computing',
    industry: 'Technology',
    companySize: '500-1000 employees',
    headquarters: 'Bangalore',
    founded: '2015',
    logo: 'T',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp'
    }
  });
  
  // Demo TPO
  data.users.push({
    id: '3',
    email: 'tpo@demo.com',
    password: 'demo123',
    name: 'Dr. Ajay Kumar',
    role: 'tpo',
    department: 'Training & Placement',
    createdAt: '2024-01-01'
  });
  
  // Demo Jobs
  const jobs = [
    {
      id: '1001',
      recruiterId: '201',
      title: 'Senior Frontend Developer',
      company: 'Tech Corp India',
      location: 'Bangalore',
      salary: '₹15-20 LPA',
      jobType: 'Full-time',
      experience: '3-5 years',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      description: 'Looking for an experienced frontend developer to lead our UI team. You will build responsive web applications using modern frameworks.',
      deadline: '2024-12-31',
      status: 'active',
      applicants: 24,
      posted: '2024-01-15',
      companyLogo: 'T'
    },
    {
      id: '1002',
      recruiterId: '201',
      title: 'Backend Engineer',
      company: 'Tech Corp India',
      location: 'Hyderabad',
      salary: '₹18-25 LPA',
      jobType: 'Full-time',
      experience: '2-4 years',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
      description: 'Join our backend team to build scalable APIs and microservices.',
      deadline: '2024-12-31',
      status: 'active',
      applicants: 18,
      posted: '2024-01-16',
      companyLogo: 'T'
    },
    {
      id: '1003',
      recruiterId: '201',
      title: 'Full Stack Developer',
      company: 'Tech Corp India',
      location: 'Remote',
      salary: '₹12-18 LPA',
      jobType: 'Full-time',
      experience: '2-4 years',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: 'Exciting opportunity for a full stack developer to work on our flagship product.',
      deadline: '2024-11-30',
      status: 'active',
      applicants: 32,
      posted: '2024-01-17',
      companyLogo: 'T'
    }
  ];
  
  data.jobs.push(...jobs);
  
  // Demo Applications
  data.applications.push({
    id: '2001',
    studentId: '1',
    jobId: '1001',
    jobTitle: 'Senior Frontend Developer',
    company: 'Tech Corp India',
    status: 'Shortlisted',
    appliedDate: '2024-01-20',
    interviewDate: '2024-03-25',
    interviewTime: '11:00 AM',
    interviewMode: 'Virtual',
    notes: []
  });
  
  // Demo Placement Drives
  data.placementDrives.push({
    id: '3001',
    company: 'Google',
    date: '2024-03-25',
    time: '10:00 AM',
    mode: 'Virtual',
    location: 'Online',
    roles: ['Software Engineer', 'Data Scientist', 'Product Manager'],
    package: '₹45-60 LPA',
    eligibleCgpa: 7.5,
    eligibleBranches: ['Computer Science', 'Information Technology'],
    positions: 25,
    deadline: '2024-03-20',
    registered: 180,
    shortlisted: 45,
    selected: 0,
    status: 'upcoming',
    description: 'Google is hiring for multiple roles. Great opportunity for final year students.'
  });
  
  data.nextIds = {
    user: 100,
    job: 2000,
    application: 3000,
    drive: 4000
  };
};

// ============================================
// EXPORTED FUNCTIONS FOR ALL ROLES
// ============================================

// ---------- AUTHENTICATION ----------
export const loginUser = (email, password) => {
  const data = initStorage();
  const user = data.users.find(u => u.email === email && u.password === password);
  if (user) {
    // Get role-specific profile
    let profile = null;
    if (user.role === 'student') {
      profile = data.students.find(s => s.userId === user.id);
    } else if (user.role === 'recruiter') {
      profile = data.recruiters.find(r => r.userId === user.id);
    }
    
    return { ...user, profile };
  }
  return null;
};

export const registerUser = (userData) => {
  const data = initStorage();
  const newId = (data.nextIds.user++).toString();
  
  const newUser = {
    id: newId,
    email: userData.email,
    password: userData.password,
    name: userData.name,
    role: userData.role,
    department: userData.department,
    year: userData.year || null,
    createdAt: new Date().toISOString()
  };
  
  data.users.push(newUser);
  
  // Create role-specific profile
  if (userData.role === 'student') {
    data.students.push({
      id: (data.nextIds.user++).toString(),
      userId: newId,
      skills: [],
      cgpa: 0,
      resumeUrl: null,
      portfolio: null,
      linkedin: null,
      github: null,
      bio: '',
      phone: '',
      projects: [],
      achievements: []
    });
  } else if (userData.role === 'recruiter') {
    data.recruiters.push({
      id: (data.nextIds.user++).toString(),
      userId: newId,
      companyName: '',
      website: '',
      hrName: userData.name,
      hrEmail: userData.email,
      description: '',
      industry: '',
      companySize: ''
    });
  }
  
  saveData(data);
  return newUser;
};

// ---------- STUDENT FUNCTIONS ----------
export const getStudentProfile = (userId) => {
  const data = initStorage();
  const student = data.students.find(s => s.userId === userId);
  const user = data.users.find(u => u.id === userId);
  return { ...user, ...student };
};

export const updateStudentProfile = (userId, updates) => {
  const data = initStorage();
  const studentIndex = data.students.findIndex(s => s.userId === userId);
  if (studentIndex !== -1) {
    data.students[studentIndex] = { ...data.students[studentIndex], ...updates };
    saveData(data);
    return data.students[studentIndex];
  }
  return null;
};

export const getStudentApplications = (studentId) => {
  const data = initStorage();
  return data.applications.filter(a => a.studentId === studentId).sort((a, b) => 
    new Date(b.appliedDate) - new Date(a.appliedDate)
  );
};

export const applyForJob = (studentId, jobId) => {
  const data = initStorage();
  const job = data.jobs.find(j => j.id === jobId);
  
  // Check if already applied
  const existing = data.applications.find(a => a.studentId === studentId && a.jobId === jobId);
  if (existing) return null;
  
  const newId = (data.nextIds.application++).toString();
  const newApplication = {
    id: newId,
    studentId,
    jobId,
    jobTitle: job.title,
    company: job.company,
    status: 'Applied',
    appliedDate: new Date().toISOString(),
    notes: []
  };
  
  data.applications.push(newApplication);
  
  // Update job applicants count
  const jobIndex = data.jobs.findIndex(j => j.id === jobId);
  if (jobIndex !== -1) {
    data.jobs[jobIndex].applicants++;
  }
  
  saveData(data);
  return newApplication;
};

export const getStudentStats = (studentId) => {
  const applications = getStudentApplications(studentId);
  return {
    totalApplications: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    selected: applications.filter(a => a.status === 'Selected').length,
    pending: applications.filter(a => a.status === 'Applied').length
  };
};

// ---------- RECRUITER FUNCTIONS ----------
export const getRecruiterProfile = (userId) => {
  const data = initStorage();
  const recruiter = data.recruiters.find(r => r.userId === userId);
  const user = data.users.find(u => u.id === userId);
  return { ...user, ...recruiter };
};

export const updateRecruiterProfile = (userId, updates) => {
  const data = initStorage();
  const recruiterIndex = data.recruiters.findIndex(r => r.userId === userId);
  if (recruiterIndex !== -1) {
    data.recruiters[recruiterIndex] = { ...data.recruiters[recruiterIndex], ...updates };
    saveData(data);
    return data.recruiters[recruiterIndex];
  }
  return null;
};

export const getRecruiterJobs = (recruiterId) => {
  const data = initStorage();
  return data.jobs.filter(j => j.recruiterId === recruiterId);
};

export const createJob = (recruiterId, jobData) => {
  const data = initStorage();
  const recruiter = data.recruiters.find(r => r.id === recruiterId);
  const newId = (data.nextIds.job++).toString();
  
  const newJob = {
    id: newId,
    recruiterId,
    company: recruiter.companyName,
    companyLogo: recruiter.logo || 'C',
    ...jobData,
    applicants: 0,
    status: 'active',
    posted: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  data.jobs.push(newJob);
  saveData(data);
  return newJob;
};

export const updateJob = (jobId, updates) => {
  const data = initStorage();
  const jobIndex = data.jobs.findIndex(j => j.id === jobId);
  if (jobIndex !== -1) {
    data.jobs[jobIndex] = { ...data.jobs[jobIndex], ...updates };
    saveData(data);
    return data.jobs[jobIndex];
  }
  return null;
};

export const deleteJob = (jobId) => {
  const data = initStorage();
  data.jobs = data.jobs.filter(j => j.id !== jobId);
  saveData(data);
  return true;
};

export const getRecruiterStats = (recruiterId) => {
  const data = initStorage();
  const jobs = getRecruiterJobs(recruiterId);
  const allApplications = [];
  jobs.forEach(job => {
    const apps = data.applications.filter(a => a.jobId === job.id);
    allApplications.push(...apps);
  });
  
  return {
    activeJobs: jobs.filter(j => j.status === 'active').length,
    totalApplications: allApplications.length,
    shortlisted: allApplications.filter(a => a.status === 'Shortlisted').length,
    interviewed: allApplications.filter(a => a.status === 'Interview').length,
    selected: allApplications.filter(a => a.status === 'Selected').length
  };
};

// ---------- TPO FUNCTIONS ----------
export const getAllStudents = () => {
  const data = initStorage();
  return data.users.filter(u => u.role === 'student').map(student => {
    const profile = data.students.find(s => s.userId === student.id);
    return { ...student, ...profile };
  });
};

export const getAllRecruiters = () => {
  const data = initStorage();
  return data.users.filter(u => u.role === 'recruiter').map(recruiter => {
    const profile = data.recruiters.find(r => r.userId === recruiter.id);
    return { ...recruiter, ...profile };
  });
};

export const getAllJobs = () => {
  const data = initStorage();
  return data.jobs;
};

export const getTPOStats = () => {
  const data = initStorage();
  const students = getAllStudents();
  const recruiters = getAllRecruiters();
  const jobs = getAllJobs();
  const applications = data.applications;
  
  return {
    totalStudents: students.length,
    placedStudents: applications.filter(a => a.status === 'Selected').length,
    placementPercentage: (applications.filter(a => a.status === 'Selected').length / students.length * 100).toFixed(1),
    averagePackage: '8.5 LPA',
    highestPackage: '45 LPA',
    totalRecruiters: recruiters.length,
    totalJobs: jobs.length,
    totalApplications: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    offers: applications.filter(a => a.status === 'Selected').length
  };
};

// ---------- JOB FUNCTIONS (Common) ----------
export const getAllJobsForStudent = () => {
  const data = initStorage();
  return data.jobs.filter(j => j.status === 'active').sort((a, b) => 
    new Date(b.posted) - new Date(a.posted)
  );
};

// ---------- PLACEMENT DRIVE FUNCTIONS ----------
export const getPlacementDrives = () => {
  const data = initStorage();
  return data.placementDrives;
};

export const createPlacementDrive = (driveData) => {
  const data = initStorage();
  const newId = (data.nextIds.drive++).toString();
  const newDrive = {
    id: newId,
    ...driveData,
    registered: 0,
    shortlisted: 0,
    selected: 0,
    createdAt: new Date().toISOString()
  };
  data.placementDrives.push(newDrive);
  saveData(data);
  return newDrive;
};

// ---------- CHAT FUNCTIONS ----------
export const saveChatMessage = (userId, message, response) => {
  const data = initStorage();
  data.chatHistory.push({
    id: Date.now().toString(),
    userId,
    message,
    response,
    timestamp: new Date().toISOString()
  });
  saveData(data);
};

export const getChatHistory = (userId) => {
  const data = initStorage();
  return data.chatHistory.filter(c => c.userId === userId).sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
};

// Initialize on load
initStorage();