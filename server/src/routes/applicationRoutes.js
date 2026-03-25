const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  applyForJob,
  getStudentApplications,
  getJobApplications,
  getRecruiterApplications,
  updateApplicationStatus,
  getApplicationStats
} = require('../controllers/applicationController');

const router = express.Router();

// Student routes
router.post('/', protect, authorize('student'), applyForJob);
router.get('/my-applications', protect, authorize('student'), getStudentApplications);

// Recruiter routes
router.get('/recruiter', protect, authorize('recruiter'), getRecruiterApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'tpo'), getJobApplications);
router.put('/:id', protect, authorize('recruiter', 'tpo'), updateApplicationStatus);

// TPO routes
router.get('/stats', protect, authorize('tpo'), getApplicationStats);

module.exports = router;
