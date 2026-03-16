const { supabase } = require('../config/supabase');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new AppError('Not authorized, no token', 401));
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return next(new AppError('Not authorized, invalid token', 401));
    }

    // Get user details from database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return next(new AppError('User not found', 404));
    }

    req.user = userData;
    req.token = token;
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not authorized for this role', 403));
    }

    next();
  };
};

module.exports = { protect, authorize };