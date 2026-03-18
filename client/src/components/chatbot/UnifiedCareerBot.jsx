import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  TrendingUp,
  BookOpen,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  ChevronRight,
  Mic,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  GraduationCap,
  Code,
  Database,
  Globe,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Volume2,
  VolumeX,
  Sparkles,
  Building,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  ExternalLink,
  Rocket,
  Brain,
  Compass,
  Heart,
  Shield
} from 'lucide-react';

const UnifiedCareerBot = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [conversationContext, setConversationContext] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Comprehensive company database
  const companyDatabase = {
    tech: [
      {
        name: 'Google',
        logo: 'G',
        color: 'from-blue-500 to-blue-600',
        roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Cloud Engineer'],
        packages: {
          'Software Engineer': '₹45-60 LPA',
          'Data Scientist': '₹48-65 LPA',
          'Product Manager': '₹50-70 LPA',
          'UX Designer': '₹35-50 LPA',
          'Cloud Engineer': '₹42-58 LPA'
        },
        skills: {
          'Software Engineer': ['DSA', 'System Design', 'Java/Python', 'Problem Solving'],
          'Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Statistics'],
          'Product Manager': ['Product Strategy', 'Analytics', 'Communication', 'Leadership'],
          'UX Designer': ['Figma', 'User Research', 'Prototyping', 'UI Design'],
          'Cloud Engineer': ['AWS/GCP', 'Docker', 'Kubernetes', 'CI/CD']
        },
        locations: ['Bangalore', 'Hyderabad', 'Mumbai', 'Pune'],
        driveDate: 'March 25, 2024',
        deadline: 'March 20, 2024',
        eligibility: '7.5+ CGPA (No active backlogs)',
        requirements: 'Strong DSA, System Design knowledge',
        interviewProcess: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'HR Round'],
        openings: 150
      },
      {
        name: 'Microsoft',
        logo: 'M',
        color: 'from-purple-500 to-purple-600',
        roles: ['SDE', 'Data Engineer', 'Cloud Architect', 'Program Manager', 'ML Engineer'],
        packages: {
          'SDE': '₹40-55 LPA',
          'Data Engineer': '₹38-52 LPA',
          'Cloud Architect': '₹45-60 LPA',
          'Program Manager': '₹42-58 LPA',
          'ML Engineer': '₹44-62 LPA'
        },
        skills: {
          'SDE': ['C#/.NET', 'Azure', 'DSA', 'System Design'],
          'Data Engineer': ['Python', 'SQL', 'Azure Data Factory', 'Spark'],
          'Cloud Architect': ['Azure', 'AWS', 'Kubernetes', 'Terraform'],
          'Program Manager': ['Project Management', 'Agile', 'Communication', 'Leadership'],
          'ML Engineer': ['Python', 'TensorFlow', 'MLOps', 'Azure ML']
        },
        locations: ['Hyderabad', 'Bangalore', 'Noida', 'Pune'],
        driveDate: 'April 5, 2024',
        deadline: 'March 30, 2024',
        eligibility: '7.0+ CGPA',
        requirements: 'Strong coding skills, Azure knowledge',
        interviewProcess: ['Coding Test', 'Technical Interview', 'System Design', 'HR Round'],
        openings: 200
      },
      {
        name: 'Amazon',
        logo: 'A',
        color: 'from-orange-500 to-orange-600',
        roles: ['SDE', 'Data Scientist', 'Cloud Engineer', 'Product Manager', 'DevOps Engineer'],
        packages: {
          'SDE': '₹35-50 LPA',
          'Data Scientist': '₹40-55 LPA',
          'Cloud Engineer': '₹38-52 LPA',
          'Product Manager': '₹42-58 LPA',
          'DevOps Engineer': '₹36-48 LPA'
        },
        skills: {
          'SDE': ['Java/Python', 'AWS', 'DSA', 'OOPS'],
          'Data Scientist': ['Python', 'SQL', 'ML Algorithms', 'Statistics'],
          'Cloud Engineer': ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
          'Product Manager': ['Product Strategy', 'Analytics', 'Customer Focus'],
          'DevOps Engineer': ['AWS', 'Jenkins', 'Docker', 'CI/CD']
        },
        locations: ['Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Mumbai'],
        driveDate: 'March 28, 2024',
        deadline: 'March 22, 2024',
        eligibility: '7.0+ CGPA',
        requirements: 'Strong problem solving, Leadership principles',
        interviewProcess: ['Online Test', 'Technical Round 1', 'Technical Round 2', 'Manager Round', 'HR Round'],
        openings: 300
      },
      {
        name: 'Flipkart',
        logo: 'F',
        color: 'from-yellow-500 to-yellow-600',
        roles: ['SDE', 'Data Scientist', 'Product Manager', 'UI/UX Designer', 'DevOps Engineer'],
        packages: {
          'SDE': '₹30-45 LPA',
          'Data Scientist': '₹32-48 LPA',
          'Product Manager': '₹35-50 LPA',
          'UI/UX Designer': '₹25-38 LPA',
          'DevOps Engineer': '₹28-42 LPA'
        },
        skills: {
          'SDE': ['Java', 'Spring Boot', 'System Design', 'DSA'],
          'Data Scientist': ['Python', 'SQL', 'ML', 'Statistics'],
          'Product Manager': ['Product Strategy', 'Analytics', 'Communication'],
          'UI/UX Designer': ['Figma', 'Adobe XD', 'User Research'],
          'DevOps Engineer': ['AWS', 'Docker', 'Kubernetes', 'Jenkins']
        },
        locations: ['Bangalore', 'Mumbai', 'Gurgaon', 'Chennai'],
        driveDate: 'April 10, 2024',
        deadline: 'April 2, 2024',
        eligibility: '7.0+ CGPA',
        requirements: 'Strong problem solving',
        interviewProcess: ['Coding Test', 'Technical Interview', 'Product Discussion', 'HR Round'],
        openings: 150
      }
    ],
    finance: [
      {
        name: 'Goldman Sachs',
        logo: 'G',
        color: 'from-blue-700 to-blue-800',
        roles: ['Software Engineer', 'Data Analyst', 'Risk Analyst', 'Quant Analyst', 'Tech Analyst'],
        packages: {
          'Software Engineer': '₹30-45 LPA',
          'Data Analyst': '₹25-38 LPA',
          'Risk Analyst': '₹28-42 LPA',
          'Quant Analyst': '₹35-50 LPA',
          'Tech Analyst': '₹27-40 LPA'
        },
        skills: {
          'Software Engineer': ['Java/C++', 'DSA', 'Financial Knowledge'],
          'Data Analyst': ['Python', 'SQL', 'Excel', 'Statistics'],
          'Risk Analyst': ['Risk Management', 'Financial Modeling', 'Python'],
          'Quant Analyst': ['Mathematics', 'Statistics', 'Python/R', 'Finance'],
          'Tech Analyst': ['Java', 'Spring', 'Microservices', 'Databases']
        },
        locations: ['Bangalore', 'Mumbai', 'Hyderabad'],
        driveDate: 'May 15, 2024',
        deadline: 'May 5, 2024',
        eligibility: '8.0+ CGPA',
        requirements: 'Strong analytical skills',
        interviewProcess: ['Aptitude Test', 'Technical Round', 'Manager Round', 'HR Round'],
        openings: 80
      },
      {
        name: 'JPMorgan Chase',
        logo: 'J',
        color: 'from-indigo-600 to-indigo-700',
        roles: ['Software Engineer', 'Data Scientist', 'Business Analyst', 'Quant Developer'],
        packages: {
          'Software Engineer': '₹28-42 LPA',
          'Data Scientist': '₹30-45 LPA',
          'Business Analyst': '₹24-36 LPA',
          'Quant Developer': '₹32-48 LPA'
        },
        skills: {
          'Software Engineer': ['Java', 'Spring Boot', 'Microservices'],
          'Data Scientist': ['Python', 'ML', 'Big Data', 'Finance'],
          'Business Analyst': ['SQL', 'Excel', 'Communication', 'Domain Knowledge'],
          'Quant Developer': ['C++', 'Python', 'Mathematical Modeling']
        },
        locations: ['Mumbai', 'Bangalore', 'Hyderabad'],
        driveDate: 'June 10, 2024',
        deadline: 'May 30, 2024',
        eligibility: '7.5+ CGPA',
        requirements: 'Problem solving skills, Financial knowledge',
        interviewProcess: ['Online Test', 'Technical Interview', 'Case Study', 'HR Round'],
        openings: 60
      }
    ],
    product: [
      {
        name: 'Uber',
        logo: 'U',
        color: 'from-gray-800 to-black',
        roles: ['Software Engineer', 'Data Scientist', 'Product Manager', 'ML Engineer'],
        packages: {
          'Software Engineer': '₹35-50 LPA',
          'Data Scientist': '₹38-55 LPA',
          'Product Manager': '₹40-58 LPA',
          'ML Engineer': '₹42-60 LPA'
        },
        skills: {
          'Software Engineer': ['Go/Python', 'Distributed Systems', 'DSA'],
          'Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Experimentation'],
          'Product Manager': ['Product Strategy', 'Analytics', 'User Experience'],
          'ML Engineer': ['Python', 'TensorFlow', 'ML Pipelines', 'Spark']
        },
        locations: ['Bangalore', 'Hyderabad'],
        driveDate: 'May 20, 2024',
        deadline: 'May 10, 2024',
        eligibility: '8.0+ CGPA',
        requirements: 'Strong system design, Problem solving',
        interviewProcess: ['Coding Challenge', 'Technical Rounds', 'System Design', 'HR Round'],
        openings: 50
      }
    ]
  };

  // Upcoming drives
  const upcomingDrives = [
    {
      company: 'Google',
      date: 'March 25, 2024',
      roles: ['SDE', 'Data Scientist', 'Product Manager'],
      package: '₹45-60 LPA',
      location: 'Bangalore/Hyderabad',
      deadline: 'March 20, 2024',
      eligible: '7.5+ CGPA'
    },
    {
      company: 'Microsoft',
      date: 'April 5, 2024',
      roles: ['SDE', 'Cloud Engineer', 'Program Manager'],
      package: '₹40-55 LPA',
      location: 'Hyderabad/Bangalore',
      deadline: 'March 30, 2024',
      eligible: '7.0+ CGPA'
    },
    {
      company: 'Amazon',
      date: 'March 28, 2024',
      roles: ['SDE', 'Data Scientist', 'Cloud Engineer'],
      package: '₹35-50 LPA',
      location: 'Bangalore/Chennai',
      deadline: 'March 22, 2024',
      eligible: '7.0+ CGPA'
    },
    {
      company: 'Goldman Sachs',
      date: 'May 15, 2024',
      roles: ['Software Engineer', 'Data Analyst'],
      package: '₹30-45 LPA',
      location: 'Bangalore/Mumbai',
      deadline: 'May 5, 2024',
      eligible: '8.0+ CGPA'
    },
    {
      company: 'Flipkart',
      date: 'April 10, 2024',
      roles: ['SDE', 'Product Manager', 'Data Scientist'],
      package: '₹30-45 LPA',
      location: 'Bangalore/Mumbai',
      deadline: 'April 2, 2024',
      eligible: '7.0+ CGPA'
    },
    {
      company: 'Uber',
      date: 'May 20, 2024',
      roles: ['SDE', 'ML Engineer', 'Product Manager'],
      package: '₹35-50 LPA',
      location: 'Bangalore',
      deadline: 'May 10, 2024',
      eligible: '8.0+ CGPA'
    }
  ];

  // Skill-based career paths
  const careerPaths = {
    frontend: {
      title: 'Frontend Development',
      icon: '💻',
      roles: ['Frontend Developer', 'UI Engineer', 'Web Developer', 'React Developer'],
      skills: ['HTML/CSS', 'JavaScript', 'React/Vue/Angular', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      companies: ['Google', 'Microsoft', 'Flipkart', 'Uber', 'Amazon'],
      courses: [
        'The Complete React Developer Course',
        'JavaScript: The Advanced Concepts',
        'TypeScript Masterclass',
        'Advanced CSS and Sass'
      ],
      projects: [
        'E-commerce Platform with React',
        'Social Media Dashboard',
        'Portfolio Website',
        'Task Management App'
      ],
      salary: '₹8-25 LPA',
      demand: '🔥 Very High',
      learningTime: '4-6 months'
    },
    backend: {
      title: 'Backend Development',
      icon: '⚙️',
      roles: ['Backend Engineer', 'API Developer', 'System Architect', 'Node.js Developer'],
      skills: ['Node.js/Python/Java', 'Databases (SQL/NoSQL)', 'System Design', 'API Design', 'Microservices'],
      companies: ['Amazon', 'Microsoft', 'Google', 'Uber', 'Flipkart'],
      courses: [
        'Node.js: The Complete Guide',
        'Python Backend Development',
        'System Design Interview Course',
        'Microservices with Spring Boot'
      ],
      projects: [
        'RESTful API Service',
        'Real-time Chat Application',
        'URL Shortener Service',
        'Task Queue System'
      ],
      salary: '₹9-28 LPA',
      demand: '🔥 Very High',
      learningTime: '5-7 months'
    },
    fullstack: {
      title: 'Full Stack Development',
      icon: '🔄',
      roles: ['Full Stack Developer', 'Software Engineer', 'Product Engineer', 'MERN Stack Developer'],
      skills: ['React', 'Node.js', 'MongoDB', 'Express', 'System Design', 'DevOps Basics'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Uber'],
      courses: [
        'The Complete Web Developer Bootcamp',
        'MERN Stack Front to Back',
        'Full Stack Development with Next.js',
        'GraphQL with React and Node'
      ],
      projects: [
        'Netflix Clone',
        'E-learning Platform',
        'Food Delivery App',
        'Social Media Platform'
      ],
      salary: '₹10-30 LPA',
      demand: '🔥🔥 Extremely High',
      learningTime: '6-8 months'
    },
    data: {
      title: 'Data Science & AI',
      icon: '📊',
      roles: ['Data Scientist', 'Data Analyst', 'ML Engineer', 'AI Engineer'],
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'TensorFlow/PyTorch', 'Data Visualization'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Flipkart'],
      courses: [
        'Machine Learning Specialization',
        'Python for Data Science',
        'Deep Learning Specialization',
        'Data Science Bootcamp'
      ],
      projects: [
        'Sales Prediction Model',
        'Customer Segmentation',
        'Sentiment Analysis Tool',
        'Recommendation System'
      ],
      salary: '₹10-35 LPA',
      demand: '🔥🔥 Very High',
      learningTime: '6-9 months'
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: '☁️',
      roles: ['Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
      skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux'],
      companies: ['Amazon', 'Google', 'Microsoft', 'Oracle', 'Netflix'],
      courses: [
        'AWS Certified Solutions Architect',
        'Docker Mastery',
        'Kubernetes for Developers',
        'DevOps Bootcamp'
      ],
      projects: [
        'CI/CD Pipeline Setup',
        'Microservices Deployment',
        'Cloud Migration Project',
        'Monitoring Solution'
      ],
      salary: '₹9-32 LPA',
      demand: '🔥🔥 Very High',
      learningTime: '5-7 months'
    }
  };

  // Welcome message
  useEffect(() => {
    if (isOpen) {
      const role = user?.role || 'guest';
      let welcomeMessage = '';
      
      if (role === 'student') {
        const currentHour = new Date().getHours();
        const timeGreeting = currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';
        
        welcomeMessage = {
          id: Date.now(),
          type: 'bot',
          content: `🌟 **${timeGreeting}, ${user?.name?.split(' ')[0] || 'there'}!**\n\n` +
            `I'm your **Unified Career Assistant** - your personal guide to placements and career success.\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `**📢 LIVE UPDATES**\n` +
            `• ${upcomingDrives.length} Active Recruitment Drives\n` +
            `• ${Object.values(companyDatabase).flat().length}+ Top Companies Hiring\n` +
            `• Next Drive: ${upcomingDrives[0].company} on ${upcomingDrives[0].date}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `**🎯 WHAT I CAN HELP WITH**\n\n` +
            `🔹 **Company Info** - Packages, roles, eligibility\n` +
            `🔹 **Skill-Based Jobs** - Find jobs matching your skills\n` +
            `🔹 **Upcoming Drives** - Latest recruitment schedules\n` +
            `🔹 **Career Paths** - Roadmaps for different roles\n` +
            `🔹 **Interview Prep** - Tips, questions, processes\n` +
            `🔹 **Skill Development** - Courses, projects, resources\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `**💡 Try asking:**\n` +
            `"Show upcoming drives" | "Jobs for frontend developer" | "Tell me about Google" | "Interview tips for Amazon" | "How to become a Data Scientist"`,
          suggestions: [
            '📢 Upcoming Drives',
            '💻 Frontend Jobs',
            '⚙️ Backend Jobs',
            '📊 Data Science',
            '🏢 Google Info',
            '🎯 Interview Tips'
          ]
        };
      } else if (role === 'recruiter') {
        welcomeMessage = {
          id: Date.now(),
          type: 'bot',
          content: `👋 **Welcome, ${user?.name}!**\n\n` +
            `I'm your **Recruitment Assistant**. I can help you with market insights, job description templates, and candidate trends.\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `**📊 MARKET SNAPSHOT**\n` +
            `• Average Package: ₹12-18 LPA\n` +
            `• Most Demanded: Full Stack, Data Science\n` +
            `• Active Students: 450+\n\n` +
            `**💼 RECRUITMENT TOOLS**\n` +
            `• Job Description Templates\n` +
            `• Salary Benchmarks\n` +
            `• Interview Question Banks\n` +
            `• Candidate Screening Tips`,
          suggestions: [
            '📊 Market Trends',
            '📝 Job Description',
            '💰 Salary Benchmarks',
            '🎯 Interview Questions'
          ]
        };
      } else {
        welcomeMessage = {
          id: Date.now(),
          type: 'bot',
          content: `👋 **Welcome to Placement Portal!**\n\n` +
            `I'm your AI Assistant. Please log in to access personalized career guidance.\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `**🔑 DEMO ACCOUNTS**\n` +
            `• Student: student@demo.com / demo123\n` +
            `• Recruiter: recruiter@demo.com / demo123\n` +
            `• TPO: tpo@demo.com / demo123`,
          suggestions: ['🔑 Login', '📝 Register', 'ℹ️ About']
        };
      }

      setMessages([welcomeMessage]);
      setConversationContext([{ role: 'bot', content: welcomeMessage.content }]);
    }
  }, [isOpen, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Typing indicator
  useEffect(() => {
    const phrases = [
      'Analyzing...',
      'Fetching latest data...',
      'Checking opportunities...',
      'Preparing insights...',
      'Searching database...'
    ];
    
    let index = 0;
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingIndicator(phrases[index % phrases.length]);
        index++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };
    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, { role: 'user', content: inputMessage }]);
    setInputMessage('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        suggestions: response.suggestions || []
      };
      setMessages(prev => [...prev, botMessage]);
      setConversationContext(prev => [...prev, { role: 'bot', content: response.text }]);
      setIsTyping(false);
      
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
    }, 1500);
  };

  const generateResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const role = user?.role || 'guest';

    // Upcoming drives
    if (lowerMsg.includes('upcoming') || lowerMsg.includes('drive') || lowerMsg.includes('recruitment')) {
      let drivesText = `📢 **UPCOMING RECRUITMENT DRIVES**\n\n`;
      drivesText += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
      
      upcomingDrives.forEach((drive, index) => {
        drivesText += `**${index + 1}. ${drive.company}**\n`;
        drivesText += `   📅 Date: ${drive.date}\n`;
        drivesText += `   💼 Roles: ${drive.roles.join(', ')}\n`;
        drivesText += `   💰 Package: ${drive.package}\n`;
        drivesText += `   📍 Location: ${drive.location}\n`;
        drivesText += `   ⏰ Deadline: ${drive.deadline}\n`;
        drivesText += `   📊 Eligibility: ${drive.eligible}\n\n`;
      });

      return {
        text: drivesText,
        suggestions: ['Google details', 'Microsoft details', 'Amazon details', 'Eligibility criteria']
      };
    }

    // Company information
    if (lowerMsg.includes('google') || lowerMsg.includes('microsoft') || lowerMsg.includes('amazon') || 
        lowerMsg.includes('flipkart') || lowerMsg.includes('uber') || lowerMsg.includes('goldman')) {
      
      let company = null;
      if (lowerMsg.includes('google')) company = companyDatabase.tech.find(c => c.name === 'Google');
      else if (lowerMsg.includes('microsoft')) company = companyDatabase.tech.find(c => c.name === 'Microsoft');
      else if (lowerMsg.includes('amazon')) company = companyDatabase.tech.find(c => c.name === 'Amazon');
      else if (lowerMsg.includes('flipkart')) company = companyDatabase.tech.find(c => c.name === 'Flipkart');
      else if (lowerMsg.includes('uber')) company = companyDatabase.product.find(c => c.name === 'Uber');
      else if (lowerMsg.includes('goldman')) company = companyDatabase.finance.find(c => c.name === 'Goldman Sachs');

      if (company) {
        let companyText = `🏢 **${company.name} - DETAILED PROFILE**\n\n`;
        companyText += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        companyText += `**📋 COMPANY OVERVIEW**\n`;
        companyText += `• Openings: ${company.openings} positions\n`;
        companyText += `• Locations: ${company.locations.join(', ')}\n`;
        companyText += `• Next Drive: ${company.driveDate}\n`;
        companyText += `• Deadline: ${company.deadline}\n`;
        companyText += `• Eligibility: ${company.eligibility}\n\n`;
        
        companyText += `**💰 PACKAGE BREAKDOWN**\n`;
        Object.entries(company.packages).forEach(([role, pkg]) => {
          companyText += `• ${role}: ${pkg}\n`;
        });
        companyText += `\n`;
        
        companyText += `**🎯 REQUIRED SKILLS**\n`;
        Object.entries(company.skills).forEach(([role, skills]) => {
          companyText += `• ${role}: ${skills.join(', ')}\n`;
        });
        companyText += `\n`;
        
        companyText += `**📝 INTERVIEW PROCESS**\n`;
        company.interviewProcess.forEach((step, idx) => {
          companyText += `${idx + 1}. ${step}\n`;
        });

        return {
          text: companyText,
          suggestions: ['Eligibility', 'Interview tips', 'Apply process', 'Similar companies']
        };
      }
    }

    // Skill-based career paths
    if (lowerMsg.includes('frontend') || lowerMsg.includes('react')) {
      const path = careerPaths.frontend;
      return generateCareerPathResponse(path);
    }
    if (lowerMsg.includes('backend') || lowerMsg.includes('node')) {
      const path = careerPaths.backend;
      return generateCareerPathResponse(path);
    }
    if (lowerMsg.includes('fullstack') || lowerMsg.includes('mern') || lowerMsg.includes('mean')) {
      const path = careerPaths.fullstack;
      return generateCareerPathResponse(path);
    }
    if (lowerMsg.includes('data') || lowerMsg.includes('science') || lowerMsg.includes('ml') || lowerMsg.includes('ai')) {
      const path = careerPaths.data;
      return generateCareerPathResponse(path);
    }
    if (lowerMsg.includes('cloud') || lowerMsg.includes('devops') || lowerMsg.includes('aws')) {
      const path = careerPaths.cloud;
      return generateCareerPathResponse(path);
    }

    // Interview tips
    if (lowerMsg.includes('interview') || lowerMsg.includes('prepare') || lowerMsg.includes('crack')) {
      return {
        text: `🎯 **INTERVIEW PREPARATION GUIDE**\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `**📋 BEFORE THE INTERVIEW**\n` +
          `• Research company thoroughly\n` +
          `• Practice common questions\n` +
          `• Prepare your introduction\n` +
          `• Review your resume and projects\n` +
          `• Prepare questions for interviewer\n\n` +
          `**💡 COMMON QUESTIONS**\n` +
          `1. "Tell me about yourself"\n` +
          `2. "Why do you want to work here?"\n` +
          `3. "What are your strengths/weaknesses?"\n` +
          `4. "Describe a challenge you faced"\n` +
          `5. "Where do you see yourself in 5 years?"\n\n` +
          `**💻 TECHNICAL ROUND**\n` +
          `• Practice coding daily\n` +
          `• Understand DSA concepts\n` +
          `• Explain your approach clearly\n` +
          `• Write clean, optimized code\n` +
          `• Test with examples\n\n` +
          `**🎯 HR ROUND**\n` +
          `• Be confident and honest\n` +
          `• Show enthusiasm\n` +
          `• Ask thoughtful questions\n` +
          `• Discuss salary professionally\n` +
          `• Send thank-you email`,
        suggestions: ['Coding questions', 'HR questions', 'Company-wise tips', 'Salary negotiation']
      };
    }

    // Eligibility criteria
    if (lowerMsg.includes('eligibility') || lowerMsg.includes('criteria') || lowerMsg.includes('cgpa')) {
      return {
        text: `📊 **ELIGIBILITY CRITERIA**\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `**🏢 COMPANY-WISE CGPA**\n` +
          `• Google/Microsoft: 7.5+ CGPA\n` +
          `• Amazon/Flipkart: 7.0+ CGPA\n` +
          `• Goldman Sachs: 8.0+ CGPA\n` +
          `• Uber: 8.0+ CGPA\n` +
          `• Startups: 6.5+ CGPA\n\n` +
          `**📚 ACADEMIC REQUIREMENTS**\n` +
          `• 10th: 60% and above\n` +
          `• 12th: 60% and above\n` +
          `• No active backlogs\n` +
          `• Consistent academic record\n\n` +
          `**💼 OTHER REQUIREMENTS**\n` +
          `• Strong problem-solving skills\n` +
          `• Good communication\n` +
          `• Relevant internships (preferred)\n` +
          `• Project experience\n` +
          `• Leadership qualities`,
        suggestions: ['Company-wise criteria', 'Improve CGPA', 'Backlog policy']
      };
    }

    // Default response
    return {
      text: `🌟 **HOW CAN I HELP YOU?**\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `**📢 RECRUITMENT UPDATES**\n` +
        `• "Show upcoming drives"\n` +
        `• "Tell me about Google"\n` +
        `• "Amazon recruitment"\n\n` +
        `**💻 CAREER PATHS**\n` +
        `• "Frontend developer guide"\n` +
        `• "How to become Data Scientist"\n` +
        `• "Full stack roadmap"\n\n` +
        `**🎯 PREPARATION**\n` +
        `• "Interview tips"\n` +
        `• "Eligibility criteria"\n` +
        `• "Skill requirements"\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `**💡 Try any of the above queries!**`,
      suggestions: [
        '📢 Upcoming Drives',
        '🏢 Google Info',
        '💻 Frontend Guide',
        '📊 Data Science',
        '🎯 Interview Tips',
        '📋 Eligibility'
      ]
    };
  };

  const generateCareerPathResponse = (path) => {
    return {
      text: `${path.icon} **${path.title} - COMPLETE GUIDE**\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `**🎯 ROLES**\n${path.roles.map(r => `• ${r}`).join('\n')}\n\n` +
        `**📚 SKILLS TO MASTER**\n${path.skills.map(s => `• ${s}`).join('\n')}\n\n` +
        `**🏢 TOP HIRING COMPANIES**\n${path.companies.map(c => `• ${c}`).join('\n')}\n\n` +
        `**📖 RECOMMENDED COURSES**\n${path.courses.map(c => `• ${c}`).join('\n')}\n\n` +
        `**🚀 PROJECT IDEAS**\n${path.projects.map(p => `• ${p}`).join('\n')}\n\n` +
        `**💰 SALARY RANGE**\n• Fresher: ${path.salary}\n• Experienced: Up to 2x\n\n` +
        `**📊 MARKET DEMAND**\n• Demand: ${path.demand}\n• Learning Time: ${path.learningTime}`,
      suggestions: ['Courses', 'Projects', 'Companies hiring', 'Interview prep']
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    handleSendMessage();
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content.replace(/\*/g, '').replace(/━━━+/g, ''));
  };

  const formatMessage = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-bold text-lg mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.includes('━━━')) {
        return <div key={i} className="border-t border-gray-300 my-3"></div>;
      }
      if (line.startsWith('•') || line.match(/^\d+\./)) {
        return <div key={i} className="ml-2 text-sm">{line}</div>;
      }
      return <div key={i} className="text-sm">{line}</div>;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 hover:to-pink-700 transition-all transform hover:scale-110 z-50 group"
      >
        <Bot className="h-6 w-6" />
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Unified Career Assistant
        </span>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
          {upcomingDrives.length}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 md:w-[36rem] h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold flex items-center">
                Unified Career Assistant
                <Sparkles className="h-4 w-4 ml-2 text-yellow-300" />
              </h3>
              <p className="text-xs text-blue-100 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date().toLocaleTimeString()} • Live Updates
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {user?.role === 'student' && (
          <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-white border-opacity-20">
            <div className="text-center">
              <div className="text-xs opacity-75">Drives</div>
              <div className="font-semibold text-lg">{upcomingDrives.length}</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-75">Companies</div>
              <div className="font-semibold text-lg">{Object.values(companyDatabase).flat().length}+</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-75">Max CTC</div>
              <div className="font-semibold text-lg">60L</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-75">Next Drive</div>
              <div className="font-semibold text-xs">{upcomingDrives[0].date}</div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[90%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                    : 'bg-gradient-to-br from-green-500 to-teal-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
              <div>
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white shadow-sm border border-gray-200 text-gray-800'
                }`}>
                  <div className="text-sm whitespace-pre-wrap leading-relaxed font-mono">
                    {formatMessage(message.content)}
                  </div>
                </div>
                
                {/* Message Actions */}
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mt-1 ml-2">
                    <button 
                      onClick={() => handleCopyMessage(message.content)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Like">
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Share">
                      <Share2 className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition-colors flex items-center"
                      >
                        {suggestion}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{typingIndicator}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about drives, companies, careers..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 text-sm"
              rows="1"
              style={{ minHeight: '48px' }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={`p-3 rounded-xl transition-all ${
              inputMessage.trim() && !isTyping
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Status */}
        <p className="text-xs text-gray-400 mt-2 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
          {upcomingDrives.length} active drives • Updated daily • Ask me anything!
        </p>
      </div>
    </div>
  );
};

export default UnifiedCareerBot;