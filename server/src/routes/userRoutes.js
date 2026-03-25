const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getAllStudents,
  getAllRecruiters,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/students', protect, authorize('tpo'), getAllStudents);
router.get('/recruiters', protect, authorize('tpo'), getAllRecruiters);
router.get('/', protect, authorize('tpo'), getAllUsers);
router.delete('/:id', protect, authorize('tpo'), deleteUser);

module.exports = router;
