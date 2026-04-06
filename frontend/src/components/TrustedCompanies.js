import React from 'react';

function TrustedCompanies() {
  const companies = [
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
    { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' }
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <p style={styles.text}>Trusted by leading companies</p>
        <div style={styles.logos}>
          {companies.map(company => (
            <img 
              key={company.name}
              src={company.logo} 
              alt={company.name}
              style={styles.logo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${company.name}&size=40&background=667eea&color=fff`;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'white',
    padding: '3rem 0',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center'
  },
  text: {
    color: '#666',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  logos: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    opacity: '0.7'
  },
  logo: {
    height: '40px',
    width: 'auto',
    filter: 'grayscale(100%)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }
};

export default TrustedCompanies;