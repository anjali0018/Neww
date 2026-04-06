const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

// Get messages between user and company for a job
router.get('/:jobId', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      jobId: req.params.jobId,
      $or: [
        { senderId: req.user.id },
        { receiverId: req.user.id }
      ]
    }).sort('createdAt');
    
    // Mark messages as read
    await Message.updateMany(
      { receiverId: req.user.id, read: false },
      { $set: { read: true } }
    );
    
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send message
router.post('/', protect, async (req, res) => {
  try {
    const { jobId, receiverId, message } = req.body;
    
    const newMessage = await Message.create({
      jobId,
      senderId: req.user.id,
      receiverId,
      message
    });
    
    // Create notification for receiver
    await Notification.create({
      userId: receiverId,
      title: 'New Message',
      message: `You have a new message regarding your job application`,
      type: 'message',
      relatedId: newMessage._id,
      relatedModel: 'Message'
    });
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;