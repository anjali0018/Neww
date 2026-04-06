const express = require('express');
const router = express.Router();
const SavedJob = require('../models/SavedJob');
const { protect } = require('../middleware/auth');

// Get saved jobs
router.get('/', protect, async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ applicantId: req.user.id })
      .populate('jobId')
      .sort('-savedAt');
    res.json({ success: true, savedJobs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save job
router.post('/', protect, async (req, res) => {
  try {
    const { jobId } = req.body;
    
    const existing = await SavedJob.findOne({ jobId, applicantId: req.user.id });
    if (existing) {
      return res.json({ success: true, message: 'Job already saved' });
    }
    
    const savedJob = await SavedJob.create({
      jobId,
      applicantId: req.user.id
    });
    
    res.json({ success: true, savedJob });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove saved job
router.delete('/:jobId', protect, async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      jobId: req.params.jobId,
      applicantId: req.user.id
    });
    res.json({ success: true, message: 'Job removed from saved' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;