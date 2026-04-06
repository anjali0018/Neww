import React from 'react';
import { FaLightbulb, FaFileAlt, FaVideo, FaHandshake, FaChartLine, FaLaptop, FaUsers, FaCheckCircle } from 'react-icons/fa';

function CareerTips() {
  const tips = [
    { 
      icon: <FaFileAlt />, 
      title: 'Resume Masterclass', 
      desc: 'Create an ATS-friendly resume that gets noticed by recruiters. Focus on keywords, achievements, and clean formatting.',
      color: '#0066B3' 
    },
    { 
      icon: <FaVideo />, 
      title: 'Interview Success', 
      desc: 'Ace virtual and in-person interviews with proven strategies. Research the company, practice common questions, and follow up.',
      color: '#00A86B' 
    },
    { 
      icon: <FaHandshake />, 
      title: 'Networking Skills', 
      desc: 'Build meaningful professional connections online and offline. Attend industry events and engage on LinkedIn.',
      color: '#FFB347' 
    },
    { 
      icon: <FaChartLine />, 
      title: 'Career Growth', 
      desc: 'Plan your career path and achieve your professional goals. Set milestones and continuously upskill.',
      color: '#8e44ad' 
    },
    { 
      icon: <FaLaptop />, 
      title: 'Remote Work', 
      desc: 'Thrive in remote and hybrid work environments. Master communication tools and maintain work-life balance.',
      color: '#17A2B8' 
    },
    { 
      icon: <FaUsers />, 
      title: 'Personal Branding', 
      desc: 'Build a strong personal brand on LinkedIn and beyond. Share insights and showcase your expertise.',
      color: '#dc3545' 
    }
  ];

  const quickTips = [
    'Update your LinkedIn profile regularly',
    'Set up job alerts for your target roles',
    'Follow companies you want to work for',
    'Connect with recruiters in your industry',
    'Take online courses to learn new skills',
    'Practice mock interviews with friends'
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1>Career Development Tips</h1>
        <p>Expert advice to accelerate your career growth</p>
      </div>

      <div style={styles.content}>
        {/* Main Tips Grid */}
        <div style={styles.tipsGrid}>
          {tips.map((tip, i) => (
            <div key={i} style={styles.tipCard}>
              <div style={{...styles.tipIcon, background: tip.color}}>
                {tip.icon}
              </div>
              <h3>{tip.title}</h3>
              <p>{tip.desc}</p>
            </div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <div style={styles.quickTipsSection}>
          <h2>Quick Career Tips</h2>
          <div style={styles.quickTipsGrid}>
            {quickTips.map((tip, i) => (
              <div key={i} style={styles.quickTipCard}>
                <FaCheckCircle color="#00A86B" size={18} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  tipCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease',
  },
  tipIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    color: 'white',
    fontSize: '24px',
  },
  quickTipsSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid #e9ecef',
  },
  quickTipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  quickTipCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '0.9rem',
  },
};

export default CareerTips;