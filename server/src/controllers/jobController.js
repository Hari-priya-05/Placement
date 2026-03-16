const { supabase } = require('../config/supabase');

const getAllJobs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, recruiters(*)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch jobs' 
      });
    }

    res.json({
      success: true,
      data: { jobs: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch jobs' 
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('jobs')
      .select('*, recruiters(*)')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    res.json({
      success: true,
      data: { job: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch job' 
    });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, description, skills_required, salary, deadline } = req.body;

    const { data: recruiter } = await supabase
      .from('recruiters')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        title,
        company,
        description,
        skills_required,
        salary,
        deadline,
        recruiter_id: recruiter.id
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create job' 
      });
    }

    res.status(201).json({
      success: true,
      data: { job: data },
      message: 'Job created successfully'
    });
  } catch (error) {
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

    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update job' 
      });
    }

    res.json({
      success: true,
      data: { job: data },
      message: 'Job updated successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update job' 
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to delete job' 
      });
    }

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete job' 
    });
  }
};

const getRecruiterJobs = async (req, res) => {
  try {
    const { data: recruiter } = await supabase
      .from('recruiters')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('recruiter_id', recruiter.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch jobs' 
      });
    }

    res.json({
      success: true,
      data: { jobs: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch jobs' 
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getRecruiterJobs
};
