const mongoose = require('mongoose');

const SavedJobSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure unique save per job per applicant
SavedJobSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

module.exports = mongoose.model('SavedJob', SavedJobSchema);