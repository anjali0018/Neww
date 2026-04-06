const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description']
  },
  requirements: {
    type: String,
    required: [true, 'Please provide job requirements']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location']
  },
  salary: {
    type: String,
    default: 'Not specified'
  },
  company: {
    type: String,
    required: [true, 'Please provide company name']
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Please provide job category'],
    enum: ['Software Engineering', 'Web Development', 'Sales', 'Marketing', 'Data Science', 'UI/UX Design', 'Product Management', 'Human Resources', 'Other']
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active'
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  deadline: Date
});

module.exports = mongoose.model('Job', JobSchema);