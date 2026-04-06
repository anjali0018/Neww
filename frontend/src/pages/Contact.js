import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaHeadset, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    setTimeout(() => {
      toast.success('Message sent successfully! Our team will respond within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>

      <div style={styles.content}>
        {/* Contact Options */}
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <FaHeadset size={32} color="#0066B3" />
            <h3>24/7 Support</h3>
            <p>We're here to help anytime</p>
          </div>
          <div style={styles.infoCard}>
            <FaEnvelope size={32} color="#0066B3" />
            <h3>Email Us</h3>
            <p style={styles.emailText}>smartrecruit.contact@gmail.com</p>
          </div>
          <div style={styles.infoCard}>
            <FaWhatsapp size={32} color="#0066B3" />
            <h3>WhatsApp Support</h3>
            <p>Available 9 AM - 6 PM</p>
          </div>
          <div style={styles.infoCard}>
            <FaClock size={32} color="#0066B3" />
            <h3>Response Time</h3>
            <p>Within 24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={styles.formSection}>
          <h2>Send us a message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              style={styles.input} 
              required 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              style={styles.input} 
              required 
            />
            <input 
              type="text" 
              placeholder="Subject" 
              value={formData.subject} 
              onChange={(e) => setFormData({...formData, subject: e.target.value})} 
              style={styles.input} 
              required 
            />
            <textarea 
              placeholder="Your Message" 
              rows="5" 
              value={formData.message} 
              onChange={(e) => setFormData({...formData, message: e.target.value})} 
              style={styles.textarea} 
              required 
            />
            <button type="submit" style={styles.button} disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
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
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  infoSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  infoCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    wordBreak: 'break-word',
  },
  emailText: {
    color: '#0066B3',
    fontWeight: '500',
    fontSize: '0.9rem',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  },
  formSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #e9ecef',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  input: {
    padding: '0.8rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '0.9rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '0.8rem',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '0.9rem',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.8rem',
    background: '#0066B3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

export default Contact;