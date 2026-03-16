const express = require('express');
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getHistory
} = require('../controllers/chatController');

const router = express.Router();

router.post('/message', protect, sendMessage);
router.get('/history', protect, getHistory);

module.exports = router;
