const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const Notification = require('../models/Notification');
const { protect, authorize } = require('../middleware/auth');

// Schedule interview (Recruiter only)
router.post('/', protect, authorize('recruiter'), async (req, res) => {
  try {
    const { jobId, applicationId, applicantId, meetLink, scheduledTime, duration, notes } = req.body;
    
    const interview = await Interview.create({
      jobId,
      applicationId,
      recruiterId: req.user.id,
      applicantId,
      meetLink,
      scheduledTime,
      duration,
      notes
    });
    
    // Notify applicant
    await Notification.create({
      userId: applicantId,
      title: 'Interview Scheduled',
      message: `You have been invited for an interview on ${new Date(scheduledTime).toLocaleString()}. Click to join.`,
      type: 'interview',
      relatedId: interview._id,
      relatedModel: 'Interview'
    });
    
    res.json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get interviews for applicant
router.get('/my-interviews', protect, async (req, res) => {
  try {
    const interviews = await Interview.find({ applicantId: req.user.id })
      .populate('jobId', 'title company')
      .sort('-scheduledTime');
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get interviews for recruiter's jobs
router.get('/my-scheduled', protect, authorize('recruiter'), async (req, res) => {
  try {
    const interviews = await Interview.find({ recruiterId: req.user.id })
      .populate('jobId', 'title')
      .populate('applicantId', 'name email')
      .sort('-scheduledTime');
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;