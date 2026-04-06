const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const { protect, authorize } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Private (Applicants only)
router.post(
  '/',
  protect,
  authorize('applicant'),
  [
    body('jobId').not().isEmpty().withMessage('Job ID is required'),
    body('resume').not().isEmpty().withMessage('Resume is required'),
    body('coverLetter').not().isEmpty().withMessage('Cover letter is required')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { jobId, resume, coverLetter } = req.body;

      // Check if job exists and is active
      const job = await Job.findOne({ _id: jobId, status: 'active' });
      if (!job) {
        return res.status(404).json({ success: false, error: 'Job not found or no longer active' });
      }

      // Check if already applied
      const existingApplication = await Application.findOne({
        jobId,
        applicantId: req.user.id
      });

      if (existingApplication) {
        return res.status(400).json({ success: false, error: 'You have already applied for this job' });
      }

      // Create application
      const application = await Application.create({
        jobId,
        applicantId: req.user.id,
        resume,
        coverLetter
      });

      res.status(201).json({ success: true, application });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
);

// @route   GET /api/applications/my-applications
// @desc    Get current user's applications
// @access  Private (Applicants only)
router.get('/my-applications', protect, authorize('applicant'), async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.user.id })
      .populate({
        path: 'jobId',
        populate: { path: 'recruiterId', select: 'name company' }
      })
      .sort('-appliedDate');

    res.json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/applications/job/:jobId
// @desc    Get applications for a specific job
// @access  Private (Recruiters only)
router.get('/job/:jobId', protect, authorize('recruiter'), async (req, res) => {
  try {
    // Check if job belongs to recruiter
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiterId: req.user.id
    });

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found or unauthorized' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('applicantId', 'name email')
      .sort('-appliedDate');

    res.json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private (Recruiters only)
router.put('/:id/status', protect, authorize('recruiter'), async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id).populate({
      path: 'jobId',
      select: 'recruiterId'
    });

    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    // Check if job belongs to recruiter
    if (application.jobId.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.json({ success: true, application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;