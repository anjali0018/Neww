import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService, applicationService } from '../services/api';
import { 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaClock, 
  FaBuilding, 
  FaArrowLeft, 
  FaBriefcase,
  FaEnvelope,
  FaFileAlt,
  FaUpload,
  FaTimes
} from 'react-icons/fa';
import { toast } from 'react-toastify';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [application, setApplication] = useState({
    resume: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchJobDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJobById(id);
      setJob(response.job);
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      toast.error('Failed to load job details');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!token) {
      toast.info('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    if (user?.role !== 'applicant') {
      toast.error('Only applicants can apply for jobs');
      return;
    }

    setShowApplyModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF or DOC/DOCX file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      setResumeFile(file);
      setResumeFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setApplication({...application, resume: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    
    if (!application.resume || !application.coverLetter) {
      toast.error('Please upload your resume and write a cover letter');
      return;
    }

    setSubmitting(true);
    try {
      await applicationService.applyForJob({
        jobId: id,
        ...application
      });
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      setApplication({ resume: '', coverLetter: '' });
      setResumeFile(null);
      setResumeFileName('');
    } catch (error) {
      console.error('Application failed:', error);
      toast.error(error.response?.data?.error || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <style>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #1a73e8;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>Job not found</h2>
        <button onClick={() => navigate('/jobs')} style={styles.backBtn}>Back to Jobs</button>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backButtonContainer}>
        <button onClick={() => navigate('/jobs')} style={styles.backBtn}>
          <FaArrowLeft /> Back to Jobs
        </button>
      </div>

      <div style={styles.jobCard}>
        <div style={styles.jobHeader}>
          <div style={styles.jobIcon}>
            <FaBriefcase />
          </div>
          <div style={styles.jobTitleSection}>
            <h1>{job.title}</h1>
            <div style={styles.companyInfo}>
              <FaBuilding />
              <span>{job.company}</span>
            </div>
          </div>
          <button style={styles.applyNowBtn} onClick={handleApplyClick}>
            Apply Now →
          </button>
        </div>

        <div style={styles.jobMetaGrid}>
          <div style={styles.metaItem}>
            <FaMapMarkerAlt style={styles.metaIcon} />
            <div>
              <label>Location</label>
              <p>{job.location}</p>
            </div>
          </div>
          <div style={styles.metaItem}>
            <FaMoneyBillWave style={styles.metaIcon} />
            <div>
              <label>Salary</label>
              <p>{job.salary || 'Negotiable'}</p>
            </div>
          </div>
          <div style={styles.metaItem}>
            <FaClock style={styles.metaIcon} />
            <div>
              <label>Posted Date</label>
              <p>{new Date(job.postedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div style={styles.metaItem}>
            <FaBriefcase style={styles.metaIcon} />
            <div>
              <label>Category</label>
              <p>{job.category || 'General'}</p>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div style={styles.section}>
          <h2>Requirements</h2>
          <p>{job.requirements}</p>
        </div>

        <div style={styles.applyBottomSection}>
          <button style={styles.applyBottomBtn} onClick={handleApplyClick}>
            Apply for this Position
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div style={styles.modalOverlay} onClick={() => setShowApplyModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Apply for {job.title}</h2>
              <button style={styles.modalClose} onClick={() => setShowApplyModal(false)}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.jobSummary}>
                <p><strong>{job.company}</strong> • {job.location}</p>
              </div>
              
              <form onSubmit={handleApplySubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <FaUpload /> Upload Resume *
                  </label>
                  <label style={styles.uploadLabel}>
                    {resumeFileName || '📄 Click to upload PDF/DOC/DOCX'}
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                  {resumeFileName && <p style={styles.uploadSuccess}>✅ {resumeFileName} uploaded successfully</p>}
                  <small style={styles.formHint}>Upload your resume (PDF, DOC, DOCX up to 5MB)</small>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <FaEnvelope /> Cover Letter *
                  </label>
                  <textarea
                    style={styles.textarea}
                    rows="5"
                    placeholder="Explain why you're the perfect candidate for this role..."
                    value={application.coverLetter}
                    onChange={(e) => setApplication({...application, coverLetter: e.target.value})}
                    required
                  />
                  <small style={styles.formHint}>Tell us why you're interested and what makes you unique</small>
                </div>
                
                <div style={styles.modalActions}>
                  <button type="button" style={styles.cancelBtn} onClick={() => setShowApplyModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" style={styles.submitBtn} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: '#f8fafc',
    padding: '2rem'
  },
  backButtonContainer: {
    maxWidth: '1000px',
    margin: '0 auto 1.5rem auto'
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    background: 'white',
    border: '1px solid #cbd5e1',
    borderRadius: '30px',
    color: '#1a73e8',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  jobCard: {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden'
  },
  jobHeader: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  jobIcon: {
    width: '70px',
    height: '70px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  },
  jobTitleSection: {
    flex: 1
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: 0.9,
    marginTop: '0.3rem'
  },
  applyNowBtn: {
    padding: '0.8rem 2rem',
    background: 'white',
    color: '#1a73e8',
    border: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  jobMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    padding: '2rem',
    background: '#f8fafc',
    borderBottom: '1px solid #e2e8f0'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  metaIcon: {
    fontSize: '1.5rem',
    color: '#1a73e8'
  },
  section: {
    padding: '2rem',
    borderBottom: '1px solid #e2e8f0'
  },
  applyBottomSection: {
    padding: '2rem',
    textAlign: 'center',
    background: '#f8fafc'
  },
  applyBottomBtn: {
    padding: '1rem 3rem',
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0'
  },
  modalClose: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#999'
  },
  modalBody: {
    padding: '1.5rem'
  },
  jobSummary: {
    background: '#f8fafc',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  formLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500'
  },
  uploadLabel: {
    display: 'block',
    padding: '12px',
    background: '#f8fafc',
    border: '2px dashed #cbd5e1',
    borderRadius: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '5px',
    color: '#1a73e8'
  },
  uploadSuccess: {
    marginTop: '8px',
    fontSize: '12px',
    color: '#34a853'
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  formHint: {
    display: 'block',
    marginTop: '0.3rem',
    color: '#999',
    fontSize: '0.8rem'
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.8rem',
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  submitBtn: {
    flex: 2,
    padding: '0.8rem',
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default JobDetails;