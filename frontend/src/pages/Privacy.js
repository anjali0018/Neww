import React from 'react';

function Privacy() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Privacy Policy</h1>
        <p>Last updated: January 1, 2024</p>
      </div>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2>Information We Collect</h2>
          <p>We collect personal information you provide directly to us, such as your name, email address, phone number, resume, and cover letter when you register or apply for jobs.</p>
        </div>
        <div style={styles.section}>
          <h2>How We Use Your Information</h2>
          <p>We use your information to facilitate job applications, communicate with you about applications, improve our services, and comply with legal obligations.</p>
        </div>
        <div style={styles.section}>
          <h2>Information Sharing</h2>
          <p>We share your information with employers when you apply for jobs. We do not sell your personal information to third parties.</p>
        </div>
        <div style={styles.section}>
          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.</p>
        </div>
        <div style={styles.section}>
          <h2>Your Rights</h2>
          <p>You can access, update, or delete your account information at any time through your dashboard.</p>
        </div>
        <div style={styles.section}>
          <h2>Contact Us</h2>
          <p>If you have questions about this privacy policy, contact us at privacy@smartrecruit.com</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa' },
  hero: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '3rem 2rem', textAlign: 'center' },
  content: { maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' },
  section: { background: 'white', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }
};

export default Privacy;