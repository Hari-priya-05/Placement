const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ChatHistory, User } = require('../models');
const AppError = require('../utils/AppError');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message) {
      return next(new AppError('Message is required', 400));
    }

    // Get user context
    const userData = await User.findById(userId);

    // Prepare context for AI
    let context = '';
    if (userData?.role === 'student') {
      context = `The user is a student named ${userData.name}.`;
    } else if (userData?.role === 'recruiter') {
      context = `The user is a recruiter named ${userData.name}.`;
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a career guidance assistant for a college placement portal.
      Provide helpful, accurate advice about careers, skills, interviews, and job searching.
      Keep responses concise and friendly.
      
      Context: ${context}
      User: ${message}
      
      Response:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Find or create chat history document for user
    let chatHistory = await ChatHistory.findOne({ user: userId });
    
    if (!chatHistory) {
      chatHistory = new ChatHistory({
        user: userId,
        messages: [],
        context: {
          userType: userData.role,
          userName: userData.name
        }
      });
    }

    // Add messages to history
    chatHistory.messages.push({
      role: 'user',
      content: message
    });
    chatHistory.messages.push({
      role: 'assistant',
      content: text
    });

    // Keep only last 50 messages
    if (chatHistory.messages.length > 50) {
      chatHistory.messages = chatHistory.messages.slice(-50);
    }

    await chatHistory.save();

    res.status(200).json({
      success: true,
      data: { response: text }
    });
  } catch (error) {
    console.error('Chat error:', error);
    next(new AppError('Failed to process message', 500));
  }
};

const getHistory = async (req, res, next) => {
  try {
    const chatHistory = await ChatHistory.findOne({ user: req.user._id });

    if (!chatHistory) {
      return res.status(200).json({
        success: true,
        data: { history: [] }
      });
    }

    res.status(200).json({
      success: true,
      data: { history: chatHistory.messages }
    });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    next(new AppError('Failed to fetch history', 500));
  }
};

const clearHistory = async (req, res, next) => {
  try {
    await ChatHistory.findOneAndDelete({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    next(new AppError('Failed to clear history', 500));
  }
};

module.exports = { sendMessage, getHistory, clearHistory };
