const { supabase } = require('../config/supabase');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    let query = supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (req.user.role === 'student') {
      query = supabase
        .from('users')
        .select('*, students(*)')
        .eq('id', userId)
        .single();
    } else if (req.user.role === 'recruiter') {
      query = supabase
        .from('users')
        .select('*, recruiters(*)')
        .eq('id', userId)
        .single();
    }

    const { data, error } = await query;

    if (error) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: { user: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile' 
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, department, year, skills, cgpa, resume_url, portfolio, company_name, website, hr_name } = req.body;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ name, department, year })
      .eq('id', userId)
      .select()
      .single();

    if (userError) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update profile' 
      });
    }

    if (req.user.role === 'student') {
      await supabase
        .from('students')
        .update({ skills, cgpa, resume_url, portfolio })
        .eq('user_id', userId);
    } else if (req.user.role === 'recruiter') {
      await supabase
        .from('recruiters')
        .update({ company_name, website, hr_name })
        .eq('user_id', userId);
    }

    res.json({
      success: true,
      data: { user: userData },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile' 
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, students(*)')
      .eq('role', 'student')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch students' 
      });
    }

    res.json({
      success: true,
      data: { students: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch students' 
    });
  }
};

const getAllRecruiters = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, recruiters(*)')
      .eq('role', 'recruiter')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch recruiters' 
      });
    }

    res.json({
      success: true,
      data: { recruiters: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recruiters' 
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllStudents,
  getAllRecruiters
};
