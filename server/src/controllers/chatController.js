const { GoogleGenerativeAI } = require('@google/generative-ai');
const { supabase } = require('../config/supabase');
const AppError = require('../utils/AppError');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return next(new AppError('Message is required', 400));
    }

    // Get user context
    const { data: userData } = await supabase
      .from('users')
      .select('*, students(*)')
      .eq('id', userId)
      .single();

    // Prepare context for AI
    let context = '';
    if (userData?.role === 'student' && userData.students) {
      context = `The user is a ${userData.year}th year ${userData.department} student.`;
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a career guidance assistant for a college placement portal.
      Provide helpful, accurate advice about careers, skills, interviews.
      Keep responses concise and friendly.
      
      Context: ${context}
      User: ${message}
      
      Response:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Save to chat history
    await supabase.from('chat_history').insert([{
      user_id: userId,
      message,
      response: text
    }]);

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
    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return next(new AppError('Failed to fetch history', 500));
    }

    res.status(200).json({
      success: true,
      data: { history: data }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendMessage, getHistory };