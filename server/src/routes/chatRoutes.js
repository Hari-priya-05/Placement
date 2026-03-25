const express = require('express');
const { protect } = require('../middleware/auth');
const {
  sendMessage,
  getHistory,
  clearHistory
} = require('../controllers/chatController');

const router = express.Router();

router.post('/message', protect, sendMessage);
router.get('/history', protect, getHistory);
router.delete('/history', protect, clearHistory);

module.exports = router;
