import React from 'react';
import { FaFilePdf, FaVideo, FaLink, FaExternalLinkAlt } from 'react-icons/fa';

function Resources() {
  const resources = {
    templates: [
      { name: 'Basic Resume Template', link: 'https://create.microsoft.com/en-us/template/simple-resume-4c17d980-cd0d-4a41-9c2e-ef5173fa1de0', type: 'Microsoft Word' },
      { name: 'Modern Resume Template', link: 'https://create.microsoft.com/en-us/template/modern-resume-2cd69b85-d018-473e-9110-f951f6d93503', type: 'Microsoft Word' },
      { name: 'Cover Letter Template', link: 'https://create.microsoft.com/en-us/template/cover-letter-67a2cf1c-2f72-45b5-9359-c81b5abfe1a2', type: 'Microsoft Word' },
      { name: 'Thank You Email Template', link: 'https://create.microsoft.com/en-us/template/thank-you-letter-for-job-interview-b2bcaa2c-4892-4fec-beb7-65524a75bf24', type: 'Microsoft Word' }
    ],
    tools: [
      { name: 'Grammarly - Writing Assistant', link: 'https://www.grammarly.com', source: 'Free + Premium' },
      { name: 'Canva - Resume Builder', link: 'https://www.canva.com/create/resumes/', source: 'Free + Premium' },
      { name: 'Google Docs - Free Templates', link: 'https://docs.google.com/templates', source: 'Free' },
      { name: 'JobScan - ATS Checker', link: 'https://www.jobscan.co', source: 'Free (limited)' }
    ],
    courses: [
      { name: 'Google Career Certificates', link: 'https://grow.google/certificates/', source: 'Google' },
      { name: 'FreeCodeCamp', link: 'https://www.freecodecamp.org', source: 'Free' },
      { name: 'Coursera Free Courses', link: 'https://www.coursera.org/browse', source: 'Free + Paid' },
      { name: 'LinkedIn Learning (Free Trial)', link: 'https://www.linkedin.com/learning/', source: '1 Month Free' }
    ]
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Free Resources</h1>
        <p>Tools and templates to boost your job search</p>
      </div>

      <div style={styles.content}>
        {/* Templates Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <FaFilePdf size={24} color="#0066B3" />
            <h2>Resume & Cover Letter Templates</h2>
          </div>
          <div style={styles.resourcesGrid}>
            {resources.templates.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.resourceCard}>
                <div>
                  <h4>{item.name}</h4>
                  <p style={styles.resourceType}>{item.type}</p>
                </div>
                <FaExternalLinkAlt size={14} color="#0066B3" />
              </a>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <FaLink size={24} color="#0066B3" />
            <h2>Useful Tools</h2>
          </div>
          <div style={styles.resourcesGrid}>
            {resources.tools.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.resourceCard}>
                <div>
                  <h4>{item.name}</h4>
                  <p style={styles.resourceType}>{item.source}</p>
                </div>
                <FaExternalLinkAlt size={14} color="#0066B3" />
              </a>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <FaVideo size={24} color="#0066B3" />
            <h2>Free Courses</h2>
          </div>
          <div style={styles.resourcesGrid}>
            {resources.courses.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.resourceCard}>
                <div>
                  <h4>{item.name}</h4>
                  <p style={styles.resourceType}>{item.source}</p>
                </div>
                <FaExternalLinkAlt size={14} color="#0066B3" />
              </a>
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={styles.noteBox}>
          <p>💡 <strong>Pro Tip:</strong> Always customize templates to match your personal style and the job you're applying for.</p>
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
  section: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  resourceCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#333',
    transition: 'all 0.2s ease',
    border: '1px solid #e9ecef',
  },
  resourceType: {
    fontSize: '0.7rem',
    color: '#6c757d',
    marginTop: '0.2rem',
  },
  noteBox: {
    background: '#e8f0fe',
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    fontSize: '0.9rem',
  },
};

export default Resources;