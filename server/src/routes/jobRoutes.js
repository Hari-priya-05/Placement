const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs
} = require('../controllers/jobController');

const router = express.Router();

router.get('/', protect, getAllJobs);
router.get('/my-jobs', protect, authorize('recruiter'), getRecruiterJobs);
router.get('/:id', protect, getJobById);
router.post('/', protect, authorize('recruiter', 'tpo'), createJob);
router.put('/:id', protect, authorize('recruiter', 'tpo'), updateJob);
router.delete('/:id', protect, authorize('recruiter', 'tpo'), deleteJob);

module.exports = router;
