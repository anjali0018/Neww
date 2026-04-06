import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaHeadset, FaEnvelope, FaPhone, FaClock, FaWhatsapp } from 'react-icons/fa';

function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Support request sent! We\'ll respond within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  const faqs = [
    { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
    { q: 'How do I apply for a job?', a: 'Browse jobs, click "Apply Now", fill in your resume and cover letter, and submit.' },
    { q: 'How do I track my application status?', a: 'Log in to your applicant dashboard to see real-time status updates.' },
    { q: 'How do I post a job as a recruiter?', a: 'Register as a recruiter, then click "Post Job" on your dashboard.' },
    { q: 'What documents are accepted for resumes?', a: 'We accept PDF, DOC, and DOCX files up to 5MB.' },
    { q: 'How can I contact support directly?', a: 'Use the contact form below or email support@smartrecruit.com' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Support Center</h1>
        <p>How can we help you today?</p>
      </div>

      <div style={styles.content}>
        {/* Contact Options */}
        <div style={styles.contactOptions}>
          <div style={styles.contactCard}>
            <FaHeadset size={32} color="#1a73e8" />
            <h3>24/7 Support</h3>
            <p>We're here to help anytime</p>
          </div>
          <div style={styles.contactCard}>
            <FaEnvelope size={32} color="#1a73e8" />
            <h3>Email Us</h3>
            <p>support@smartrecruit.com</p>
          </div>
          <div style={styles.contactCard}>
            <FaWhatsapp size={32} color="#1a73e8" />
            <h3>WhatsApp</h3>
            <p>+91 98765 43210</p>
          </div>
          <div style={styles.contactCard}>
            <FaClock size={32} color="#1a73e8" />
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div style={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div style={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqCard}>
                <h3>❓ {faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div style={styles.contactSection}>
          <h2>Still need help?</h2>
          <p>Fill out the form below and we'll get back to you</p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={styles.input} required />
            <input type="email" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={styles.input} required />
            <input type="text" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} style={styles.input} required />
            <textarea placeholder="Describe your issue..." rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={styles.textarea} required />
            <button type="submit" style={styles.button} disabled={submitting}>{submitting ? 'Sending...' : 'Submit Request'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8fafc' },
  hero: { background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center' },
  content: { maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' },
  contactOptions: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
  contactCard: { background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  faqSection: { background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #e2e8f0' },
  faqGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem', marginTop: '1rem' },
  faqCard: { padding: '1rem', background: '#f8fafc', borderRadius: '12px' },
  contactSection: { background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' },
  input: { padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem' },
  textarea: { padding: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '0.9rem', resize: 'vertical' },
  button: { padding: '0.8rem', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }
};

export default Support;