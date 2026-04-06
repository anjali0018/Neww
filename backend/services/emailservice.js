const nodemailer = require('nodemailer');
const { emailConfig, fromEmail, fromName } = require('../config/email');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  async sendEmail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject,
        html
      });
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(user) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #667eea;">Welcome to SmartRecruit! 🎉</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for joining SmartRecruit. We're excited to help you with your recruitment journey!</p>
        ${user.role === 'recruiter' 
          ? '<p>Start posting jobs and find the best talent today.</p>'
          : '<p>Browse thousands of jobs and find your dream career.</p>'
        }
        <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">
          Get Started
        </a>
      </div>
    `;
    return this.sendEmail(user.email, 'Welcome to SmartRecruit!', html);
  }

  async sendApplicationStatusEmail(application, job, user, status) {
    const statusMessages = {
      reviewed: 'Your application has been reviewed!',
      shortlisted: 'Congratulations! You have been shortlisted!',
      rejected: 'Application status update',
      hired: 'Congratulations! You have been selected!'
    };

    const statusColors = {
      reviewed: '#3498db',
      shortlisted: '#2ecc71',
      rejected: '#e74c3c',
      hired: '#27ae60'
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: ${statusColors[status]};">${statusMessages[status]}</h2>
        <p>Hi ${user.name},</p>
        <p>Your application for <strong>${job.title}</strong> at <strong>${job.company}</strong> has been updated to: <strong style="color: ${statusColors[status]};">${status}</strong></p>
        ${status === 'shortlisted' ? '<p>We will contact you soon for the next steps.</p>' : ''}
        ${status === 'hired' ? '<p>Congratulations! Our HR team will reach out with the offer details.</p>' : ''}
        <a href="${process.env.FRONTEND_URL}/applicant/applications" style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">
          View Your Applications
        </a>
      </div>
    `;
    return this.sendEmail(user.email, `Application Status: ${status}`, html);
  }
}

module.exports = new EmailService();