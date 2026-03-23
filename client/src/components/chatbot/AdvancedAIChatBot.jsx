import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Copy,
  Share2,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Trash2,
  Settings,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Loader,
  Zap,
  Brain,
  Waves,
  Headphones,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Download,
  Upload,
  FileText,
  Image,
  Paperclip,
  Smile,
  Edit3,
  Globe,
  Shield,
  Star,
  Award,
  TrendingUp,
  Lightbulb,
  Target,
  Compass,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Building
} from 'lucide-react';

const AdvancedAIChatBot = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [conversationContext, setConversationContext] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [typingIndicator, setTypingIndicator] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  // Mock AI responses database
  const aiResponses = {
    greetings: {
      patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hello! How can I assist you with your career journey today?",
        "Hi there! I'm your AI career assistant. What would you like to explore?",
        "Hey! Ready to help you with your placement preparation. What's on your mind?",
        "Greetings! I'm here to guide you through your career path. Ask me anything!"
      ]
    },
    careerPaths: {
      patterns: ['career', 'path', 'job', 'role', 'profession', 'field', 'industry'],
      responses: [
        "Based on current market trends, here are promising career paths:\n\n💻 **Technology**\n• Frontend Developer\n• Backend Engineer\n• Full Stack Developer\n• Data Scientist\n• AI/ML Engineer\n• DevOps Engineer\n\n📊 **Business**\n• Product Manager\n• Business Analyst\n• Digital Marketer\n• HR Manager\n\n🎨 **Creative**\n• UI/UX Designer\n• Graphic Designer\n• Content Creator\n\nWhich area interests you?"
      ]
    },
    skills: {
      patterns: ['skill', 'learn', 'course', 'training', 'certification'],
      responses: [
        "📚 **Top Skills in Demand 2024**\n\n**Technical Skills:**\n• Programming: Python, JavaScript, Java\n• Web Dev: React, Node.js, Next.js\n• Data: SQL, Python, Machine Learning\n• Cloud: AWS, Azure, GCP\n• DevOps: Docker, Kubernetes, CI/CD\n\n**Soft Skills:**\n• Communication\n• Problem Solving\n• Leadership\n• Adaptability\n• Teamwork\n\nWould you like specific learning resources?"
      ]
    },
    interview: {
      patterns: ['interview', 'prepare', 'crack', 'tips', 'questions', 'round'],
      responses: [
        "🎯 **Interview Preparation Guide**\n\n**Before Interview:**\n• Research company thoroughly\n• Practice common questions\n• Prepare your introduction\n• Review your resume\n\n**Common Questions:**\n1. Tell me about yourself\n2. Why do you want to work here?\n3. What are your strengths/weaknesses?\n4. Describe a challenge you faced\n5. Where do you see yourself in 5 years?\n\n**Technical Round:**\n• Practice coding daily\n• Understand DSA concepts\n• Explain your approach clearly\n• Write clean code\n\n**HR Round:**\n• Be confident and authentic\n• Show enthusiasm\n• Ask thoughtful questions\n\nNeed help with specific topics?"
      ]
    },
    resume: {
      patterns: ['resume', 'cv', 'portfolio', 'application'],
      responses: [
        "📄 **Resume Tips for Success**\n\n**Key Elements:**\n• Professional summary\n• Education with CGPA\n• Technical skills\n• Projects with details\n• Internships/Experience\n• Certifications\n• Achievements (with numbers!)\n\n**Pro Tips:**\n✓ Keep it to 1 page\n✓ Use action verbs\n✓ Quantify achievements\n✓ Tailor for each job\n✓ Proofread multiple times\n\n**ATS Optimization:**\n• Use keywords from job description\n• Simple formatting\n• Standard section headings\n• Avoid tables and images\n\nWould you like me to review your resume?"
      ]
    },
    company: {
      patterns: ['company', 'google', 'microsoft', 'amazon', 'flipkart', 'uber', 'goldman'],
      responses: [
        "🏢 **Top Companies Hiring**\n\n**Google**\n• Package: ₹45-60 LPA\n• Roles: SDE, Data Scientist, PM\n• Eligibility: 7.5+ CGPA\n\n**Microsoft**\n• Package: ₹40-55 LPA\n• Roles: SDE, Cloud Engineer\n• Eligibility: 7.0+ CGPA\n\n**Amazon**\n• Package: ₹35-50 LPA\n• Roles: SDE, Data Scientist\n• Eligibility: 7.0+ CGPA\n\n**Flipkart**\n• Package: ₹30-45 LPA\n• Roles: SDE, Product Manager\n• Eligibility: 7.0+ CGPA\n\nWhich company would you like to know more about?"
      ]
    },
    placement: {
      patterns: ['placement', 'drive', 'recruitment', 'hiring', 'apply'],
      responses: [
        "📢 **Upcoming Placement Drives**\n\n**Google** - March 25, 2024\n• Roles: SDE, Data Scientist\n• Package: ₹45-60 LPA\n• Deadline: March 20\n\n**Microsoft** - April 5, 2024\n• Roles: SDE, Cloud Engineer\n• Package: ₹40-55 LPA\n• Deadline: March 30\n\n**Amazon** - March 28, 2024\n• Roles: SDE, Data Scientist\n• Package: ₹35-50 LPA\n• Deadline: March 22\n\n**Goldman Sachs** - May 15, 2024\n• Roles: Software Engineer\n• Package: ₹30-45 LPA\n• Deadline: May 5\n\nWould you like to register for any drive?"
      ]
    },
    default: "🌟 I'm here to help with your career journey!\n\nYou can ask me about:\n• 📚 Skills & Learning\n• 🎯 Interview Preparation\n• 📄 Resume Tips\n• 🏢 Company Information\n• 📢 Placement Drives\n• 💼 Career Paths\n\nWhat would you like to explore?"
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        // Auto-send after voice input
        setTimeout(() => handleSendMessage(transcript), 100);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  // Load available voices for speech synthesis
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        // Prefer a female English voice
        const preferredVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices[0];
        setSelectedVoice(preferredVoice);
      }
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Typing animation
  useEffect(() => {
    const phrases = [
      'Analyzing your query...',
      'Thinking...',
      'Searching knowledge base...',
      'Generating response...',
      'Consulting career database...',
      'Preparing insights...'
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

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setConversationContext(prev => [...prev, { role: 'user', content: message }]);
    setInputMessage('');
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(message);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        suggestions: response.suggestions || [],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setConversationContext(prev => [...prev, { role: 'bot', content: response.text }]);
      setIsTyping(false);
      
      if (response.suggestions) {
        setSuggestions(response.suggestions);
      }
      
      // Auto-speak response if not muted
      if (!isMuted && isOpen) {
        speakText(response.text);
      }
    }, 1500 + Math.random() * 1000);
  };

  const generateResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    // Check patterns and return appropriate response
    for (const [category, data] of Object.entries(aiResponses)) {
      if (category !== 'default' && data.patterns) {
        if (data.patterns.some(pattern => lowerMsg.includes(pattern))) {
          const responses = Array.isArray(data.responses) ? data.responses : [data.responses];
          const responseText = responses[Math.floor(Math.random() * responses.length)];
          return { text: responseText, suggestions: getSuggestions(category) };
        }
      }
    }
    
    return { 
      text: aiResponses.default, 
      suggestions: ['Career paths', 'Skills to learn', 'Interview tips', 'Resume help', 'Placement drives'] 
    };
  };

  const getSuggestions = (category) => {
    const suggestionsMap = {
      greetings: ['Career paths', 'Skills to learn', 'Interview tips'],
      careerPaths: ['Frontend Developer', 'Data Scientist', 'Product Manager', 'UI/UX Designer'],
      skills: ['Web Development', 'Data Science', 'Cloud Computing', 'Soft Skills'],
      interview: ['Coding questions', 'HR questions', 'Company research', 'Salary negotiation'],
      resume: ['Resume template', 'Portfolio examples', 'Cover letter help', 'LinkedIn tips'],
      company: ['Google details', 'Microsoft details', 'Amazon details', 'Salary benchmarks'],
      placement: ['Upcoming drives', 'Eligibility', 'Apply process', 'Preparation tips']
    };
    return suggestionsMap[category] || suggestionsMap.default;
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && isSpeaking) {
      stopSpeaking();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const clearConversation = () => {
    setMessages([]);
    setConversationContext([]);
  };

  const formatMessage = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} className="font-bold text-base mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('•') || line.match(/^\d+\./)) {
        return <div key={i} className="ml-2 text-sm">{line}</div>;
      }
      return <div key={i} className="text-sm leading-relaxed">{line}</div>;
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50 group"
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Career Assistant
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 transition-all duration-300 ${
      isExpanded ? 'w-[800px] h-[700px]' : 'w-96 md:w-[450px] h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold flex items-center">
                AI Career Assistant
                <Sparkles className="h-4 w-4 ml-2 text-yellow-300" />
              </h3>
              <p className="text-xs text-blue-100 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                {getGreeting()}, {user?.name?.split(' ')[0] || 'Guest'}!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white border-opacity-20 text-xs">
          <span className="flex items-center">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
            Online
          </span>
          <span className="flex items-center">
            <Brain className="h-3 w-3 mr-1" />
            GPT-4 Powered
          </span>
          <span className="flex items-center">
            <Mic className="h-3 w-3 mr-1" />
            Voice Enabled
          </span>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 border-b border-gray-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Voice Speed</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-xs text-gray-500">{speechRate}x</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Voice Pitch</span>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speechPitch}
              onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
              className="w-32"
            />
            <span className="text-xs text-gray-500">{speechPitch}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Voice</span>
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => setSelectedVoice(availableVoices.find(v => v.name === e.target.value))}
              className="text-sm border rounded px-2 py-1"
            >
              {availableVoices.slice(0, 10).map(voice => (
                <option key={voice.name} value={voice.name}>{voice.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={clearConversation}
            className="w-full text-sm text-red-600 hover:text-red-700 flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear Conversation
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                  <div className="whitespace-pre-wrap">
                    {formatMessage(message.content)}
                  </div>
                </div>
                
                {/* Message Actions */}
                <div className="flex items-center space-x-2 mt-1 ml-2">
                  <button 
                    onClick={() => handleCopyMessage(message.content)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  {message.type === 'bot' && !isMuted && (
                    <button 
                      onClick={() => speakText(message.content)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Speak"
                    >
                      <Volume2 className="h-3 w-3" />
                    </button>
                  )}
                  <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Like">
                    <ThumbsUp className="h-3 w-3" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Share">
                    <Share2 className="h-3 w-3" />
                  </button>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 ml-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition-colors flex items-center"
                      >
                        {suggestion}
                        <ChevronDown className="h-3 w-3 ml-1" />
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
      {suggestions.length > 0 && (
        <div className="px-4 py-2 bg-white border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2 flex items-center">
            <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
            Quick suggestions
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 4).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(suggestion)}
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
              placeholder="Ask me anything about your career..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32 text-sm"
              rows="1"
              style={{ minHeight: '48px' }}
              disabled={isListening}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <button 
                className={`p-1.5 rounded-lg transition-colors ${
                  isListening ? 'text-red-500 bg-red-50 animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                onClick={handleVoiceInput}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping || isListening}
            className={`p-3 rounded-xl transition-all ${
              inputMessage.trim() && !isTyping && !isListening
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Voice Status */}
        {isListening && (
          <div className="mt-2 text-xs text-center text-red-500 animate-pulse flex items-center justify-center">
            <Mic className="h-3 w-3 mr-1" />
            Listening... Speak now
          </div>
        )}

        {/* Status Info */}
        <p className="text-xs text-gray-400 mt-2 flex items-center justify-center">
          <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
          AI-powered • Real-time • Voice enabled • Free to use
        </p>
      </div>
    </div>
  );
};

export default AdvancedAIChatBot;