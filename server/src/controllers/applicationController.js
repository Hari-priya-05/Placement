const { supabase } = require('../config/supabase');

const applyForJob = async (req, res) => {
  try {
    const { job_id } = req.body;

    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (studentError) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student profile not found' 
      });
    }

    const { data: existing } = await supabase
      .from('applications')
      .select('*')
      .eq('student_id', student.id)
      .eq('job_id', job_id)
      .single();

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already applied for this job' 
      });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([{
        student_id: student.id,
        job_id,
        status: 'Applied'
      }])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to apply for job' 
      });
    }

    res.status(201).json({
      success: true,
      data: { application: data },
      message: 'Applied successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to apply for job' 
    });
  }
};

const getStudentApplications = async (req, res) => {
  try {
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    if (studentError) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student profile not found' 
      });
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*, jobs(*)')
      .eq('student_id', student.id)
      .order('applied_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch applications' 
      });
    }

    res.json({
      success: true,
      data: { applications: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications' 
    });
  }
};

const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const { data, error } = await supabase
      .from('applications')
      .select('*, students!inner(*, users!inner(*))')
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false });

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch applications' 
      });
    }

    res.json({
      success: true,
      data: { applications: data }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch applications' 
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update application' 
      });
    }

    res.json({
      success: true,
      data: { application: data },
      message: 'Application status updated'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update application' 
    });
  }
};

const getApplicationStats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('status');

    if (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch statistics' 
      });
    }

    const stats = {
      total: data.length,
      applied: data.filter(a => a.status === 'Applied').length,
      shortlisted: data.filter(a => a.status === 'Shortlisted').length,
      interview: data.filter(a => a.status === 'Interview').length,
      selected: data.filter(a => a.status === 'Selected').length,
      rejected: data.filter(a => a.status === 'Rejected').length
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
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
  updateApplicationStatus,
  getApplicationStats
};
