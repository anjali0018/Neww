import React from 'react';
import { FaUsers, FaBriefcase, FaChartLine, FaShieldAlt } from 'react-icons/fa';

function About() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>About SmartRecruit</h1>
        <p>Transforming recruitment with technology</p>
      </div>
      
      <div style={styles.content}>
        <div style={styles.section}>
          <h2>Our Mission</h2>
          <p>To connect talented professionals with their dream jobs and help companies build exceptional teams through intelligent, efficient recruitment technology.</p>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <FaUsers size={40} color="#667eea" />
            <h3>50,000+</h3>
            <p>Active Candidates</p>
          </div>
          <div style={styles.statCard}>
            <FaBriefcase size={40} color="#667eea" />
            <h3>10,000+</h3>
            <p>Jobs Posted</p>
          </div>
          <div style={styles.statCard}>
            <FaChartLine size={40} color="#667eea" />
            <h3>5,000+</h3>
            <p>Companies</p>
          </div>
          <div style={styles.statCard}>
            <FaShieldAlt size={40} color="#667eea" />
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
        </div>
        
        <div style={styles.section}>
          <h2>Why Choose Us?</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <h3>🚀 Fast & Efficient</h3>
              <p>Streamlined application process that saves time for both recruiters and candidates.</p>
            </div>
            <div style={styles.feature}>
              <h3>🔒 Secure & Reliable</h3>
              <p>Your data is protected with enterprise-grade security measures.</p>
            </div>
            <div style={styles.feature}>
              <h3>📊 Smart Analytics</h3>
              <p>Data-driven insights to optimize your recruitment strategy.</p>
            </div>
            <div style={styles.feature}>
              <h3>💬 Real-time Communication</h3>
              <p>Chat directly with candidates and recruiters.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa' },
  hero: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center' },
  content: { maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' },
  section: { marginBottom: '3rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' },
  statCard: { background: 'white', padding: '2rem', borderRadius: '15px', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' },
  feature: { background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }
};

export default About;