import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>🎯 SmartRecruit</h3>
            <p style={styles.text}>Revolutionizing the way companies hire and candidates find their dream jobs. Trusted by 5000+ companies worldwide.</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <ul style={styles.links}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/jobs" style={styles.link}>Browse Jobs</Link></li>
              <li><Link to="/companies" style={styles.link}>Companies</Link></li>
              <li><Link to="/about" style={styles.link}>About Us</Link></li>
              <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>For Candidates</h3>
            <ul style={styles.links}>
              <li><Link to="/register" style={styles.link}>Create Account</Link></li>
              <li><Link to="/career-tips" style={styles.link}>Career Tips</Link></li>
              <li><Link to="/resume-help" style={styles.link}>Resume Help</Link></li>
              <li><Link to="/interview-tips" style={styles.link}>Interview Tips</Link></li>
              <li><Link to="/salary-guide" style={styles.link}>Salary Guide</Link></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>For Employers</h3>
            <ul style={styles.links}>
              <li>
                {token && user?.role === 'recruiter' ? (
                  <Link to="/recruiter/jobs/post" style={styles.link}>Post a Job</Link>
                ) : (
                  <Link to="/register" state={{ role: 'recruiter' }} style={styles.link}>Post a Job</Link>
                )}
              </li>
              <li><Link to="/resources" style={styles.link}>Resources</Link></li>
              <li><Link to="/support" style={styles.link}>Support</Link></li>
              <li><Link to="/blog" style={styles.link}>Blog</Link></li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>
            © {currentYear} SmartRecruit. All rights reserved. | 
            <Link to="/privacy" style={styles.bottomLink}> Privacy Policy</Link>
          </p>
          <p style={styles.madeWith}>
            Made with <FaHeart color="#ff6b6b" /> for better recruitment
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: '#1a1a2e',
    color: 'white',
    padding: '4rem 0 2rem',
    marginTop: '4rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem'
  },
  section: {
    textAlign: 'left'
  },
  sectionTitle: {
    color: 'white',
    marginBottom: '1.5rem',
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  text: {
    color: '#b0b0b0',
    lineHeight: '1.8',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  links: {
    listStyle: 'none',
    padding: 0
  },
  link: {
    color: '#b0b0b0',
    textDecoration: 'none',
    lineHeight: '2.2',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    fontSize: '0.9rem'
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: '#b0b0b0',
    fontSize: '0.85rem'
  },
  bottomLink: {
    color: '#667eea',
    textDecoration: 'none',
    margin: '0 0.3rem'
  },
  madeWith: {
    marginTop: '1rem',
    fontSize: '0.85rem'
  }
};

export default Footer;