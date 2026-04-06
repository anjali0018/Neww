import React from 'react';

function JobMarketTrends() {
  const trends = [
    { label: 'Tech Jobs Posted', value: '12.5K+', change: '+25%' },
    { label: 'Active Candidates', value: '45.2K', change: '+15%' },
    { label: 'Companies Hiring', value: '3.8K', change: '+30%' },
    { label: 'Average Salary', value: '$85K', change: '+8%' }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Live Job Market Trends</h2>
        <div style={styles.grid}>
          {trends.map((trend, index) => (
            <div key={index} style={styles.trendItem}>
              <div style={styles.trendNumber}>{trend.value}</div>
              <div style={styles.trendLabel}>{trend.label}</div>
              <div style={styles.trendChange}>{trend.change} this week</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '4rem 0',
    color: 'white'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    fontWeight: '700'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    textAlign: 'center'
  },
  trendItem: {
    padding: '1rem'
  },
  trendNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '0.5rem'
  },
  trendLabel: {
    fontSize: '1.1rem',
    opacity: '0.9',
    marginBottom: '0.5rem'
  },
  trendChange: {
    color: '#90EE90',
    fontSize: '1rem'
  }
};

export default JobMarketTrends;