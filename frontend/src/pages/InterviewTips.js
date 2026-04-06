import React from 'react';
import { FaCheckCircle, FaLightbulb, FaVideo, FaHandshake, FaClock, FaUsers } from 'react-icons/fa';

function InterviewTips() {
  const tips = [
    { title: 'Research the Company', desc: 'Understand their mission, values, products, and recent news.', icon: <FaLightbulb /> },
    { title: 'Practice Common Questions', desc: 'Prepare answers for "Tell me about yourself", "Why this company?"', icon: <FaCheckCircle /> },
    { title: 'Prepare Your Questions', desc: 'Ask about team culture, growth opportunities, and expectations.', icon: <FaHandshake /> },
    { title: 'Test Your Tech Setup', desc: 'Test camera, microphone, and internet connection beforehand.', icon: <FaVideo /> },
    { title: 'Dress Professionally', desc: 'Even for video interviews, dress as you would for in-person.', icon: <FaUsers /> },
    { title: 'Follow Up', desc: 'Send a thank-you email within 24 hours after the interview.', icon: <FaClock /> }
  ];

  const commonQuestions = [
    'Tell me about yourself',
    'Why do you want to work here?',
    'What are your greatest strengths?',
    'Describe a challenge you overcame',
    'Where do you see yourself in 5 years?',
    'Why should we hire you?'
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Interview Tips</h1>
        <p>Ace your next interview with these proven strategies</p>
      </div>

      <div style={styles.content}>
        <div style={styles.tipsGrid}>
          {tips.map((tip, i) => (
            <div key={i} style={styles.tipCard}>
              <div style={styles.tipIcon}>{tip.icon}</div>
              <h3>{tip.title}</h3>
              <p>{tip.desc}</p>
            </div>
          ))}
        </div>

        <div style={styles.questionsSection}>
          <h2>Common Interview Questions</h2>
          <div style={styles.questionsGrid}>
            {commonQuestions.map((q, i) => (
              <div key={i} style={styles.questionCard}>
                <span style={styles.questionNumber}>{i + 1}</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.tipBox}>
          <h3>🎯 Bonus Tip: The STAR Method</h3>
          <p><strong>S</strong>ituation - Set the context<br />
          <strong>T</strong>ask - Describe your responsibility<br />
          <strong>A</strong>ction - Explain the steps you took<br />
          <strong>R</strong>esult - Share the outcome you achieved</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f5f7fa' },
  hero: { background: 'linear-gradient(135deg, #0066B3 0%, #004C8C 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center' },
  content: { maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' },
  tipsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
  tipCard: { background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #e9ecef' },
  tipIcon: { fontSize: '2rem', marginBottom: '1rem' },
  questionsSection: { background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #e9ecef' },
  questionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' },
  questionCard: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: '#f8f9fa', borderRadius: '8px' },
  questionNumber: { width: '30px', height: '30px', background: '#0066B3', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  tipBox: { background: '#e8f0fe', padding: '1.5rem', borderRadius: '16px', borderLeft: '4px solid #0066B3' }
};

export default InterviewTips;