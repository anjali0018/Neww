const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
// const emailService = require('../services/emailService'); // Comment out for now

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register user
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role, company } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists', 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    company: role === 'recruiter' ? company : undefined,
    isEmailVerified: false
  });

  // Send welcome email (commented out until email service is configured)
  // await emailService.sendWelcomeEmail(user);

  // Generate token
  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    }
  });
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  // Generate token
  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company
    }
  });
});

// Get current user
exports.getMe = catchAsync(async (req, res, next) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('No user found with this email', 404));
  }

  // Generate reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send email (commented out)
  // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  // For now, just return the token in development
  res.json({
    success: true,
    message: 'Password reset token generated',
    resetToken: resetToken // Remove this in production
  });
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid or expired token', 400));
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const jwtToken = generateToken(user._id);

  res.json({
    success: true,
    token: jwtToken,
    message: 'Password reset successful'
  });
});

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    message: 'Password updated successfully'
  });
});