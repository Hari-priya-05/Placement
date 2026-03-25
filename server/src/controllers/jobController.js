const { Job } = require('../models');

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' })
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { jobs: jobs }
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch jobs' 
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id)
      .populate('recruiter', 'name email phone');

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    res.json({
      success: true,
      data: { job: job }
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch job' 
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      requirements,
      responsibilities,
      openings,
      deadline
    } = req.body;

    const job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      requirements,
      responsibilities,
      openings,
      deadline,
      recruiter: req.user._id
    });

    await job.save();

    res.status(201).json({
      success: true,
      data: { job: job },
      message: 'Job created successfully'
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create job' 
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    res.json({
      success: true,
      data: { job: job },
      message: 'Job updated successfully'
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update job' 
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete job' 
    });
  }
};

const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { jobs: jobs }
    });
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch jobs' 
    });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { query, location, jobType, experienceLevel } = req.query;
    
    let filter = { status: 'active' };
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { skills: { $in: [new RegExp(query, 'i')] } }
      ];
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    
    if (jobType) {
      filter.jobType = jobType;
    }
    
    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    const jobs = await Job.find(filter)
      .populate('recruiter', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { jobs: jobs }
    });
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search jobs' 
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs,
  searchJobs
};
