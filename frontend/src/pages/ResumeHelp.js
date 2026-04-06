import React, { useState } from 'react';
import { FaCheckCircle, FaFileAlt, FaStar, FaTrophy, FaUpload, FaFilePdf, FaFileWord, FaTimes, FaInfoCircle, FaDownload, FaEye, FaLightbulb, FaPenFancy, FaChartLine } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ResumeHelp() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF, DOC, or DOCX file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setUploadedFile(file);
      setFileName(file.name);
      toast.success('Resume uploaded successfully!');
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileName('');
    toast.info('File removed');
  };

  const tips = [
    'Keep your resume to 1-2 pages only',
    'Use action verbs like "achieved", "developed", "led"',
    'Quantify achievements with numbers and percentages',
    'Tailor your resume for each job application',
    'Include relevant keywords from job description',
    'Use a clean, professional font (Arial, Calibri, Helvetica)',
    'Add a professional summary at the top (2-3 sentences)',
    'Include links to LinkedIn and portfolio (if applicable)',
    'Remove old/irrelevant experience (last 10-15 years only)',
    'Proofread multiple times for spelling and grammar errors'
  ];

  const sampleResume = `[Your Name]
[Your Phone] | [Your Email] | [LinkedIn URL]

PROFESSIONAL SUMMARY
Results-driven professional with 5+ years of experience in [Your Field]. 
Proven track record of [achievement]. Seeking [Job Title] position at [Company Name].

WORK EXPERIENCE
[Company Name] | [Location]
[Job Title] | [Dates]
• Achieved [quantifiable result] by [action taken]
• Led team of [number] to accomplish [project]
• Increased [metric] by [percentage]%

EDUCATION
[Degree] in [Field]
[University Name], [Year]

SKILLS
• Technical: [Skill 1], [Skill 2], [Skill 3]
• Soft: [Skill 1], [Skill 2], [Skill 3]`;

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Resume Help Center</h1>
        <p style={styles.heroSubtitle}>Create a winning resume that gets you noticed</p>
      </div>

      <div style={styles.content}>
        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statIcon}><FaStar size={28} color="#0066B3" /></div>
            <h3 style={styles.statNumber}>95%</h3>
            <p style={styles.statLabel}>Interview Success Rate</p>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statIcon}><FaTrophy size={28} color="#0066B3" /></div>
            <h3 style={styles.statNumber}>50K+</h3>
            <p style={styles.statLabel}>Resumes Improved</p>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statIcon}><FaFileAlt size={28} color="#0066B3" /></div>
            <h3 style={styles.statNumber}>100+</h3>
            <p style={styles.statLabel}>Tips & Resources</p>
          </div>
        </div>

        {/* Resume Writing Tips Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <FaPenFancy size={24} color="#0066B3" />
            <h2 style={styles.sectionTitle}>Resume Writing Tips</h2>
          </div>
          <p style={styles.sectionSubtitle}>Expert advice to make your resume stand out</p>
          <div style={styles.tipsGrid}>
            {tips.map((tip, i) => (
              <div key={i} style={styles.tipItem}>
                <FaCheckCircle color="#00A86B" size={18} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Resume Template Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <FaFileAlt size={24} color="#0066B3" />
            <h2 style={styles.sectionTitle}>Sample Resume Template</h2>
          </div>
          <p style={styles.sectionSubtitle}>Use this template as a starting point for your resume</p>
          <div style={styles.templateBox}>
            <pre style={styles.templatePre}>{sampleResume}</pre>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(sampleResume);
                toast.success('Template copied to clipboard!');
              }}
              style={styles.copyBtn}
            >
              <FaDownload /> Copy Template
            </button>
          </div>
        </div>

        {/* Resume Upload Section */}
        <div style={styles.uploadSection}>
          <div style={styles.uploadIcon}>📄</div>
          <h3 style={styles.uploadTitle}>Upload Your Resume for Review</h3>
          <p style={styles.uploadText}>Get feedback on your existing resume (Optional)</p>
          
          {!fileName ? (
            <label style={styles.uploadBtn}>
              <FaUpload /> Upload Resume (PDF/DOC)
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          ) : (
            <div style={styles.fileInfo}>
              <div style={styles.fileDetails}>
                {fileName.endsWith('.pdf') ? <FaFilePdf size={24} color="#dc3545" /> : <FaFileWord size={24} color="#0066B3" />}
                <span>{fileName}</span>
              </div>
              <button onClick={removeFile} style={styles.removeFileBtn}>
                <FaTimes /> Remove
              </button>
            </div>
          )}
          <p style={styles.uploadNote}>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          
          {fileName && (
            <div style={styles.aiFeedback}>
              <FaInfoCircle size={16} color="#0066B3" />
              <span>AI analysis in progress... Your resume will be reviewed shortly.</span>
            </div>
          )}
        </div>

        {/* Do's and Don'ts Section */}
        <div style={styles.dosDontsSection}>
          <div style={styles.sectionHeader}>
            <FaLightbulb size={24} color="#0066B3" />
            <h2 style={styles.sectionTitle}>Resume Do's & Don'ts</h2>
          </div>
          <div style={styles.dosDontsGrid}>
            <div style={styles.dosCard}>
              <h3 style={styles.dosTitle}>✓ DO's</h3>
              <ul style={styles.dosList}>
                <li>Customize for each job</li>
                <li>Use keywords from job description</li>
                <li>Highlight achievements with numbers</li>
                <li>Keep formatting consistent</li>
                <li>Use a professional email address</li>
                <li>Include a strong professional summary</li>
              </ul>
            </div>
            <div style={styles.dontsCard}>
              <h3 style={styles.dontsTitle}>✗ DON'Ts</h3>
              <ul style={styles.dontsList}>
                <li>Don't use fancy fonts or colors</li>
                <li>Don't include irrelevant hobbies</li>
                <li>Don't lie about experience</li>
                <li>Don't use generic phrases</li>
                <li>Don't exceed 2 pages</li>
                <li>Don't forget to proofread</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Tips Section */}
        <div style={styles.extraTipsSection}>
          <div style={styles.sectionHeader}>
            <FaChartLine size={24} color="#0066B3" />
            <h2 style={styles.sectionTitle}>Pro Tips for Success</h2>
          </div>
          <div style={styles.extraTipsGrid}>
            <div style={styles.extraTipCard}>
              <span>🎯</span>
              <h4>ATS-Friendly</h4>
              <p>Use standard section headings and avoid tables or graphics</p>
            </div>
            <div style={styles.extraTipCard}>
              <span>📊</span>
              <h4>Show Impact</h4>
              <p>Use numbers: "Increased sales by 40%" not "Responsible for sales"</p>
            </div>
            <div style={styles.extraTipCard}>
              <span>🔍</span>
              <h4>Keywords Matter</h4>
              <p>Mirror language from the job description</p>
            </div>
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
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: '1.1rem',
    opacity: 0.9,
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statBox: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid #e9ecef',
    transition: 'transform 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  statIcon: {
    marginBottom: '0.5rem',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.25rem',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#6c757d',
  },
  section: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  sectionSubtitle: {
    color: '#6c757d',
    marginBottom: '1.5rem',
    fontSize: '0.85rem',
    paddingLeft: '2.5rem',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '0.8rem',
  },
  tipItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.6rem',
    background: '#f8f9fa',
    borderRadius: '10px',
    fontSize: '0.85rem',
    lineHeight: '1.4',
  },
  templateBox: {
    background: '#f8f9fa',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid #e9ecef',
  },
  templatePre: {
    background: '#f8f9fa',
    padding: '1rem',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    margin: 0,
    lineHeight: '1.5',
    color: '#2c3e50',
  },
  copyBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#0066B3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
  },
  uploadSection: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    padding: '2rem',
    borderRadius: '20px',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  uploadIcon: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
  },
  uploadTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.3rem',
  },
  uploadText: {
    color: '#6c757d',
    marginBottom: '1rem',
    fontSize: '0.85rem',
  },
  uploadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.7rem 1.5rem',
    background: '#0066B3',
    color: 'white',
    borderRadius: '30px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    border: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.8rem',
    background: 'white',
    borderRadius: '12px',
    marginTop: '1rem',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  fileDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  removeFileBtn: {
    padding: '0.3rem 0.8rem',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  uploadNote: {
    fontSize: '0.7rem',
    color: '#6c757d',
    marginTop: '0.8rem',
  },
  aiFeedback: {
    marginTop: '1rem',
    padding: '0.8rem',
    background: '#e8f0fe',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
    color: '#0066B3',
  },
  dosDontsSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    marginBottom: '2rem',
    border: '1px solid #e9ecef',
  },
  dosDontsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginTop: '0.5rem',
  },
  dosCard: {
    padding: '1.2rem',
    background: '#e6f4ea',
    borderRadius: '14px',
  },
  dosTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#00A86B',
    marginBottom: '0.8rem',
  },
  dosList: {
    margin: 0,
    paddingLeft: '1.2rem',
    color: '#2c3e50',
    fontSize: '0.85rem',
    lineHeight: '1.8',
  },
  dontsCard: {
    padding: '1.2rem',
    background: '#fce8e6',
    borderRadius: '14px',
  },
  dontsTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: '0.8rem',
  },
  dontsList: {
    margin: 0,
    paddingLeft: '1.2rem',
    color: '#2c3e50',
    fontSize: '0.85rem',
    lineHeight: '1.8',
  },
  extraTipsSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid #e9ecef',
  },
  extraTipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem',
  },
  extraTipCard: {
    textAlign: 'center',
    padding: '1.2rem',
    background: '#f8f9fa',
    borderRadius: '12px',
    transition: 'transform 0.2s ease',
  },
};

export default ResumeHelp;