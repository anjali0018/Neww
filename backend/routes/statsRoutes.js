const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/stats/recruiter
// @desc    Get recruiter statistics
// @access  Private (Recruiters only)
router.get('/recruiter', protect, authorize('recruiter'), async (req, res) => {
  try {
    // Get all jobs by this recruiter
    const jobs = await Job.find({ recruiterId: req.user.id });
    const jobIds = jobs.map(job => job._id);

    // Get applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } });

    const stats = {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(j => j.status === 'active').length,
      totalApplications: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      reviewed: applications.filter(a => a.status === 'reviewed').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length,
      hired: applications.filter(a => a.status === 'hired').length,
      rejected: applications.filter(a => a.status === 'rejected').length
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/stats/applicant
// @desc    Get applicant statistics
// @access  Private (Applicants only)
router.get('/applicant', protect, authorize('applicant'), async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id });

    const stats = {
      totalApplications: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      reviewed: applications.filter(a => a.status === 'reviewed').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length,
      hired: applications.filter(a => a.status === 'hired').length,
      rejected: applications.filter(a => a.status === 'rejected').length
    };

    res.json({ success: true, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;