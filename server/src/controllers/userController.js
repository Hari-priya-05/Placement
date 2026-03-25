const { User } = require('../models');

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: { user: user }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile' 
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone, department, year, skills, cgpa, resume_url, portfolio, company_name, website, hr_name } = req.body;

    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      data: { user: user },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update profile' 
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .sort({ createdAt: -1 })
      .select('-password');

    res.json({
      success: true,
      data: { students: students }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch students' 
    });
  }
};

const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({ role: 'recruiter' })
      .sort({ createdAt: -1 })
      .select('-password');

    res.json({
      success: true,
      data: { recruiters: recruiters }
    });
  } catch (error) {
    console.error('Error fetching recruiters:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch recruiters' 
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select('-password');

    res.json({
      success: true,
      data: { users: users }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch users' 
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const requestingUser = req.user;

    // Authorization check: only allow self-deletion OR TPOs deleting others
    const isSelfDeletion = userIdToDelete === requestingUser._id.toString();
    const isTPO = requestingUser.role === 'tpo';
    
    if (!isSelfDeletion && !isTPO) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this user. You can only delete your own account.' 
      });
    }

    const user = await User.findByIdAndDelete(userIdToDelete);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete user' 
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllStudents,
  getAllRecruiters,
  getAllUsers,
  deleteUser
};
