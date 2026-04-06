module.exports = {
  emailConfig: {
    service: 'gmail', // or 'sendgrid', 'mailgun'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  },
  fromEmail: process.env.FROM_EMAIL || 'noreply@recruitment.com',
  fromName: 'SmartRecruit System'
};