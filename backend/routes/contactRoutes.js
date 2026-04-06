const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { protect, authorize } = require('../middleware/auth');

// Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// Get all contact messages (Admin/Recruiter only)
router.get('/', protect, authorize('recruiter'), async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort('-createdAt');
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark message as read
router.put('/:id/read', protect, authorize('recruiter'), async (req, res) => {
  try {
    await ContactMessage.findByIdAndUpdate(req.params.id, { status: 'read' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete message
router.delete('/:id', protect, authorize('recruiter'), async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;