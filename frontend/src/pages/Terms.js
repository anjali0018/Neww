import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Terms of Service</h1>
        <p>Last updated: April 2026</p>
      </div>

      <div style={styles.content}>
        <div style={styles.summaryCard}>
          <h2>📄 Agreement Overview</h2>
          <p>By using SmartRecruit, you agree to these terms. Please read them carefully.</p>
        </div>

        <div style={styles.section}>
          <h2>1. Account Registration</h2>
          <p>To use our services, you must create an account. You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized use</li>
            <li>Be responsible for all activities under your account</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>2. User Responsibilities</h2>
          <p>As a user of SmartRecruit, you agree to:</p>
          <ul>
            <li>Use the platform only for legitimate recruitment purposes</li>
            <li>Provide accurate job information (for recruiters)</li>
            <li>Submit truthful applications (for job seekers)</li>
            <li>Respect other users' privacy and rights</li>
            <li>Not engage in any fraudulent or misleading activities</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>3. Content & Data</h2>
          <p>You retain ownership of content you post. By posting, you grant us:</p>
          <ul>
            <li>License to display your content on our platform</li>
            <li>Right to share applications with employers</li>
            <li>Permission to use anonymized data for analytics</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>4. Prohibited Activities</h2>
          <p>You may not use SmartRecruit for:</p>
          <ul>
            <li>Posting fraudulent or fake job listings</li>
            <li>Submitting false job applications</li>
            <li>Harassing other users</li>
            <li>Scraping or data mining</li>
            <li>Any illegal activities</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>5. Account Termination</h2>
          <p>We reserve the right to suspend or terminate accounts that:</p>
          <ul>
            <li>Violate these terms</li>
            <li>Post inappropriate content</li>
            <li>Engage in fraudulent activities</li>
            <li>Remain inactive for extended periods</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>6. Limitation of Liability</h2>
          <p>SmartRecruit is provided "as is" without warranties. We are not liable for:</p>
          <ul>
            <li>Job offers or hiring decisions made by employers</li>
            <li>Accuracy of job postings or applications</li>
            <li>Any damages resulting from platform use</li>
            <li>Third-party links or content</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>7. Changes to Terms</h2>
          <p>We may update these terms periodically. Continued use after changes constitutes acceptance.</p>
        </div>

        <div style={styles.contactBox}>
          <h3>Questions About Terms?</h3>
          <p>Contact our legal team at legal@smartrecruit.com</p>
          <Link to="/contact" style={styles.contactBtn}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
  },
  hero: {
    background: 'linear-gradient(135deg, #0066B3 0%, #004C8C 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  summaryCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  section: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    marginBottom: '1.5rem',
    border: '1px solid #e9ecef',
  },
  contactBox: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    marginTop: '2rem',
  },
  contactBtn: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.6rem 1.5rem',
    background: '#0066B3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '30px',
  },
};

export default Terms;