const { Application, Job } = require('../models');

const applyForJob = async (req, res) => {
  try {
    const { jobId, resume, coverLetter, answers } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    // Check if job is still accepting applications
    if (job.status !== 'active') {
      return res.status(400).json({ 
        success: false, 
        message: 'This job is no longer accepting applications' 
      });
    }

    // Check if deadline has passed
    if (job.deadline && new Date(job.deadline) < new Date()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Application deadline has passed' 
      });
    }

    // Check for existing application
    const existingApplication = await Application.findOne({
      student: req.user._id,
      job: jobId
    });

    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already applied for this job' 
      });
    }

    // Create application
    const application = new Application({
      student: req.user._id,
      job: jobId,
      resume,
      coverLetter,
      answers
    });

    await application.save();

    res.status(201).json({
      success: true,
      data: { application: application },
      message: 'Applied successfully'
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to apply for job' 
    });
  }
};

const getStudentApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user._id })
      .populate('job', 'title company location salary jobType status deadline')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: { applications: applications }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications' 
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and belongs to the recruiter
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate('student', 'name email phone')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: { applications: applications }
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications' 
    });
  }
};

const getRecruiterApplications = async (req, res) => {
  try {
    // Get all jobs by this recruiter
    const jobs = await Job.find({ recruiter: req.user._id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('student', 'name email phone')
      .populate('job', 'title company location')
      .sort({ appliedAt: -1 });

    res.json({
      success: true,
      data: { applications: applications }
    });
  } catch (error) {
    console.error('Error fetching recruiter applications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications' 
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    application.status = status;
    
    if (notes) {
      application.notes.push({
        text: notes,
        addedBy: req.user._id
      });
    }

    await application.save();

    res.json({
      success: true,
      data: { application: application },
      message: 'Application status updated'
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update application' 
    });
  }
};

const getApplicationStats = async (req, res) => {
  try {
    let filter = {};
    
    // If recruiter, only show their jobs
    if (req.user.role === 'recruiter') {
      const jobs = await Job.find({ recruiter: req.user._id }).select('_id');
      const jobIds = jobs.map(job => job._id);
      filter.job = { $in: jobIds };
    } else if (req.user.role === 'student') {
      filter.student = req.user._id;
    }

    const applications = await Application.find(filter).select('status');

    const stats = {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      reviewed: applications.filter(a => a.status === 'reviewed').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      selected: applications.filter(a => a.status === 'selected').length,
      offered: applications.filter(a => a.status === 'offered').length
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch statistics' 
    });
  }
};

module.exports = {
  applyForJob,
  getStudentApplications,
  getJobApplications,
  getRecruiterApplications,
  updateApplicationStatus,
  getApplicationStats
};
