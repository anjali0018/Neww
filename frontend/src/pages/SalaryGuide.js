import React from 'react';
import { FaChartLine, FaIndustry, FaGraduationCap, FaRupeeSign } from 'react-icons/fa';

function SalaryGuide() {
  const salaryData = [
    { role: 'Software Engineer', entry: '₹8L', mid: '₹15L', senior: '₹25L' },
    { role: 'Frontend Developer', entry: '₹6L', mid: '₹12L', senior: '₹20L' },
    { role: 'Backend Developer', entry: '₹7L', mid: '₹14L', senior: '₹24L' },
    { role: 'Full Stack Developer', entry: '₹8L', mid: '₹16L', senior: '₹28L' },
    { role: 'Data Scientist', entry: '₹9L', mid: '₹18L', senior: '₹30L' },
    { role: 'Product Manager', entry: '₹12L', mid: '₹22L', senior: '₹35L' },
    { role: 'UX Designer', entry: '₹6L', mid: '₹12L', senior: '₹20L' },
    { role: 'Sales Executive', entry: '₹5L + commission', mid: '₹10L + commission', senior: '₹18L + commission' },
    { role: 'Marketing Manager', entry: '₹6L', mid: '₹12L', senior: '₹22L' },
    { role: 'HR Manager', entry: '₹5L', mid: '₹10L', senior: '₹18L' },
    { role: 'DevOps Engineer', entry: '₹8L', mid: '₹16L', senior: '₹28L' },
    { role: 'Cloud Architect', entry: '₹12L', mid: '₹22L', senior: '₹40L' },
    { role: 'AI/ML Engineer', entry: '₹10L', mid: '₹20L', senior: '₹35L' },
    { role: 'Cybersecurity Analyst', entry: '₹7L', mid: '₹14L', senior: '₹25L' }
  ];

  const cities = [
    { name: 'Bengaluru', range: '₹18-25 LPA' },
    { name: 'Mumbai', range: '₹16-22 LPA' },
    { name: 'Hyderabad', range: '₹15-21 LPA' },
    { name: 'Pune', range: '₹14-20 LPA' },
    { name: 'Chennai', range: '₹13-18 LPA' },
    { name: 'Delhi NCR', range: '₹14-19 LPA' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Salary Guide 2026</h1>
        <p>Average salaries in India by role & experience (Updated 2026)</p>
      </div>

      <div style={styles.content}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <FaRupeeSign size={40} color="#1a73e8" />
            <h3>₹15,00,000</h3>
            <p>Average Tech Salary</p>
          </div>
          <div style={styles.statCard}>
            <FaChartLine size={40} color="#1a73e8" />
            <h3>+18%</h3>
            <p>Year-over-Year Growth</p>
          </div>
          <div style={styles.statCard}>
            <FaIndustry size={40} color="#1a73e8" />
            <h3>IT & Software</h3>
            <p>Highest Paying Industry</p>
          </div>
          <div style={styles.statCard}>
            <FaGraduationCap size={40} color="#1a73e8" />
            <h3>5+ Years</h3>
            <p>Experience for Senior Roles</p>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Salary by Role & Experience (2026)</h2>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Entry Level (0-2 yrs)</th>
                  <th>Mid Level (3-5 yrs)</th>
                  <th>Senior Level (5+ yrs)</th>
                </tr>
              </thead>
              <tbody>
                {salaryData.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.roleCell}><strong>{item.role}</strong></td>
                    <td style={styles.salaryCell}>{item.entry}</td>
                    <td style={styles.salaryCell}>{item.mid}</td>
                    <td style={styles.salaryCell}>{item.senior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Top Paying Cities in India (2026)</h2>
          <div style={styles.citiesGrid}>
            {cities.map((city, index) => (
              <div key={index} style={styles.cityCard}>
                <strong>{city.name}</strong>
                <span style={styles.cityRange}>{city.range}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.tipBox}>
          <h3>💡 Negotiation Tip</h3>
          <p>Always research market rates before salary discussions. The Indian tech market grew 18% in 2025-26. Don't settle for less than your worth!</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    minHeight: '100vh', 
    background: '#f8fafc' 
  },
  hero: { 
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)', 
    color: 'white', 
    padding: '4rem 2rem', 
    textAlign: 'center' 
  },
  content: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '3rem 2rem' 
  },
  statsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '1.5rem', 
    marginBottom: '3rem' 
  },
  statCard: { 
    background: 'white', 
    padding: '2rem', 
    borderRadius: '16px', 
    textAlign: 'center', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
    border: '1px solid #e2e8f0' 
  },
  section: { 
    background: 'white', 
    padding: '2rem', 
    borderRadius: '16px', 
    marginBottom: '2rem', 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)', 
    border: '1px solid #e2e8f0' 
  },
  tableContainer: { 
    overflowX: 'auto' 
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse' 
  },
  roleCell: { 
    padding: '12px', 
    borderBottom: '1px solid #e2e8f0', 
    textAlign: 'left' 
  },
  salaryCell: { 
    padding: '12px', 
    borderBottom: '1px solid #e2e8f0', 
    textAlign: 'center' 
  },
  citiesGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '1rem', 
    marginTop: '1rem' 
  },
  cityCard: { 
    background: '#f1f5f9', 
    padding: '1rem', 
    borderRadius: '12px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  cityRange: { 
    color: '#1a73e8', 
    fontWeight: '500' 
  },
  tipBox: { 
    background: '#e8f0fe', 
    padding: '1.5rem', 
    borderRadius: '16px', 
    borderLeft: '4px solid #1a73e8' 
  }
};

export default SalaryGuide;