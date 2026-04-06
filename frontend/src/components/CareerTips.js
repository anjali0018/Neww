import React from 'react';
import { FaFileAlt, FaVideo, FaHandshake, FaChartLine } from 'react-icons/fa';

function CareerTips() {
  const tips = [
    {
      icon: <FaFileAlt />,
      title: "Resume Writing",
      description: "Learn how to craft a standout resume that gets noticed by recruiters."
    },
    {
      icon: <FaVideo />,
      title: "Interview Preparation",
      description: "Tips and tricks to ace your next interview, from preparation to follow-up."
    },
    {
      icon: <FaHandshake />,
      title: "Negotiation Skills",
      description: "Master the art of salary negotiation and get the compensation you deserve."
    },
    {
      icon: <FaChartLine />,
      title: "Career Growth",
      description: "Strategies to advance your career and achieve your professional goals."
    }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Career Development Tips</h2>
        <p style={styles.subtitle}>Expert advice to boost your career</p>
        
        <div style={styles.grid}>
          {tips.map((tip, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.icon}>{tip.icon}</div>
              <h3 style={styles.cardTitle}>{tip.title}</h3>
              <p style={styles.cardDescription}>{tip.description}</p>
              <a href="#" style={styles.readMore}>Read More →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '5rem 0',
    background: 'white'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '3rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '2rem',
    textAlign: 'center',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0'
  },
  icon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: 'white',
    fontSize: '2rem'
  },
  cardTitle: {
    color: '#333',
    marginBottom: '1rem',
    fontSize: '1.2rem'
  },
  cardDescription: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  readMore: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'inline-block',
    transition: 'all 0.3s ease'
  }
};

export default CareerTips;