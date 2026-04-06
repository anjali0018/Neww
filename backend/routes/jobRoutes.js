const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect, authorize } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// @route   GET /api/jobs
// @desc    Get all active jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, location, search } = req.query;
    
    // Build filter object
    let filter = { status: 'active' };
    
    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    const jobs = await Job.find(filter)
      .populate('recruiterId', 'name company')
      .sort('-postedDate');

    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiterId', 'name company');
    
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    res.json({ success: true, job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Recruiters only)
router.post(
  '/',
  protect,
  authorize('recruiter'),
  [
    body('title').not().isEmpty().withMessage('Job title is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
    body('requirements').not().isEmpty().withMessage('Requirements are required'),
    body('location').not().isEmpty().withMessage('Location is required'),
    body('category').not().isEmpty().withMessage('Category is required'),
    body('company').not().isEmpty().withMessage('Company name is required')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const jobData = {
        ...req.body,
        recruiterId: req.user.id,
        company: req.body.company || req.user.company
      };

      const job = await Job.create(jobData);

      res.status(201).json({ success: true, job });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
);

// @route   GET /api/jobs/recruiter/myjobs
// @desc    Get jobs posted by recruiter
// @access  Private (Recruiters only)
router.get('/recruiter/myjobs', protect, authorize('recruiter'), async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user.id }).sort('-postedDate');
    res.json({ success: true, jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private (Recruiters only)
router.put('/:id', protect, authorize('recruiter'), async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    // Check if user is the job owner
    if (job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private (Recruiters only)
router.delete('/:id', protect, authorize('recruiter'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }

    // Check if user is the job owner
    if (job.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await job.deleteOne();

    res.json({ success: true, message: 'Job removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;