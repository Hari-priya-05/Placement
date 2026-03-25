// Mock authentication for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'student@demo.com',
    password: 'demo123',
    name: 'Rahul Sharma',
    role: 'student',
    department: 'Computer Science',
    year: 3
  },
  {
    id: '2',
    email: 'recruiter@demo.com',
    password: 'demo123',
    name: 'Priya Patel',
    role: 'recruiter',
    department: 'HR',
    company_name: 'Tech Corp India'
  },
  {
    id: '3',
    email: 'tpo@demo.com',
    password: 'demo123',
    name: 'Dr. Ajay Kumar',
    role: 'tpo',
    department: 'Training & Placement'
  }
];

const mockLogin = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: 'mock_jwt_token_' + Date.now()
      }
    };
  }
  return null;
};

module.exports = { mockLogin, mockUsers };