import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ApplicationDetails() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch job details
      const jobResponse = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
      const jobData = await jobResponse.json();
      setJob(jobData.job);
      
      // Fetch applications
      const appsResponse = await fetch(`http://localhost:5000/api/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appsData = await appsResponse.json();
      setApplications(appsData.applications || []);
      
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Application marked as ${newStatus}`);
        fetchData();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <style>{`
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
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

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        <FaArrowLeft /> Back
      </button>

      {job && (
        <div style={styles.jobSummary}>
          <h1>{job.title}</h1>
          <p>{job.company} • {job.location}</p>
        </div>
      )}

      <h2 style={styles.sectionTitle}>Applications ({applications.length})</h2>

      {applications.length > 0 ? (
        <div style={styles.applicationsGrid}>
          {applications.map(app => (
            <div key={app._id} style={styles.applicationCard}>
              <div style={styles.applicantInfo}>
                <div style={styles.avatar}>
                  <FaUser />
                </div>
                <div>
                  <h3>{app.applicantId?.name}</h3>
                  <p><FaEnvelope /> {app.applicantId?.email}</p>
                </div>
              </div>

              <div style={styles.applicationMeta}>
                <p><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> 
                  <span style={{...styles.statusBadge, backgroundColor: 
                    app.status === 'pending' ? '#f39c12' :
                    app.status === 'shortlisted' ? '#2ecc71' :
                    app.status === 'rejected' ? '#e74c3c' : '#3498db'
                  }}>
                    {app.status}
                  </span>
                </p>
              </div>

              <div style={styles.docs}>
                <div>
                  <h4>Resume</h4>
                  <p>{app.resume}</p>
                </div>
                <div>
                  <h4>Cover Letter</h4>
                  <p>{app.coverLetter}</p>
                </div>
              </div>

              <div style={styles.actions}>
                <select 
                  value={app.status}
                  onChange={(e) => handleStatusUpdate(app._id, e.target.value)}
                  style={styles.statusSelect}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>

                <div style={styles.quickActions}>
                  <button 
                    style={styles.successBtn}
                    onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                    title="Shortlist"
                  >
                    <FaCheck />
                  </button>
                  <button 
                    style={styles.dangerBtn}
                    onClick={() => handleStatusUpdate(app._id, 'rejected')}
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <h3>No applications yet</h3>
          <p>Applications will appear here when candidates apply</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '0 2rem'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  },
  jobSummary: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    marginBottom: '1.5rem',
    color: '#333'
  },
  applicationsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  applicationCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  applicantInfo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  avatar: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem'
  },
  applicationMeta: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e0e0e0'
  },
  statusBadge: {
    marginLeft: '0.5rem',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.85rem',
    textTransform: 'capitalize'
  },
  docs: {
    marginBottom: '1rem'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0'
  },
  statusSelect: {
    padding: '0.5rem',
    border: '2px solid #e0e0e0',
    borderRadius: '8px'
  },
  quickActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  successBtn: {
    width: '40px',
    height: '40px',
    background: '#d4edda',
    color: '#155724',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  dangerBtn: {
    width: '40px',
    height: '40px',
    background: '#f8d7da',
    color: '#721c24',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem',
    background: 'white',
    borderRadius: '15px'
  }
};

export default ApplicationDetails;