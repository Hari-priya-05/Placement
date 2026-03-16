const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getAllStudents,
  getAllRecruiters
} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/students', protect, authorize('tpo'), getAllStudents);
router.get('/recruiters', protect, authorize('tpo'), getAllRecruiters);

module.exports = router;
