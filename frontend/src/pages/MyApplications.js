import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import { toast } from 'react-toastify';

function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: '#f39c12', icon: <FaHourglassHalf />, text: 'Pending' },
      reviewed: { color: '#3498db', icon: <FaClock />, text: 'Reviewed' },
      shortlisted: { color: '#2ecc71', icon: <FaCheckCircle />, text: 'Shortlisted' },
      rejected: { color: '#e74c3c', icon: <FaTimesCircle />, text: 'Rejected' },
      hired: { color: '#27ae60', icon: <FaCheckCircle />, text: 'Hired' }
    };
    return badges[status] || badges.pending;
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
      <h1 style={styles.title}>My Applications</h1>
      
      {applications.length > 0 ? (
        <div style={styles.applicationsList}>
          {applications.map((app) => {
            const badge = getStatusBadge(app.status);
            return (
              <div key={app._id} style={styles.applicationCard}>
                <div style={styles.applicationHeader}>
                  <div style={styles.jobInfo}>
                    <h2 style={styles.jobTitle}>{app.jobId?.title || 'Job Title'}</h2>
                    <p style={styles.companyName}>{app.jobId?.company || 'Company Name'}</p>
                  </div>
                  <span style={{...styles.statusBadge, backgroundColor: badge.color}}>
                    {badge.icon} {badge.text}
                  </span>
                </div>
                
                <div style={styles.applicationDetails}>
                  <p><strong>Location:</strong> {app.jobId?.location || 'Not specified'}</p>
                  <p><strong>Salary:</strong> {app.jobId?.salary || 'Negotiable'}</p>
                  <p><strong>Applied on:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
                </div>
                
                <div style={styles.applicationFooter}>
                  <Link to={`/jobs/${app.jobId?._id}`} style={styles.viewJobLink}>
                    View Job Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <FaBriefcase size={60} style={{ color: '#ccc' }} />
          <h2 style={styles.emptyTitle}>No applications yet</h2>
          <p style={styles.emptyText}>Start applying for jobs to track them here</p>
          <Link to="/jobs" style={styles.primaryBtn}>Browse Jobs</Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '0 2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '100vh'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  },
  title: {
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '700'
  },
  applicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  applicationCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    border: '1px solid #f0f0f0'
  },
  applicationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  jobInfo: {
    flex: 1
  },
  jobTitle: {
    color: '#333',
    fontSize: '1.3rem',
    marginBottom: '0.3rem',
    fontWeight: '600'
  },
  companyName: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  statusBadge: {
    padding: '0.5rem 1rem',
    borderRadius: '25px',
    fontSize: '0.85rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    color: 'white'
  },
  applicationDetails: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f0f0f0'
  },
  applicationDetails: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f0f0f0'
  },
  applicationFooter: {
    paddingTop: '0.5rem'
  },
  viewJobLink: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  emptyTitle: {
    marginTop: '1rem',
    color: '#333'
  },
  emptyText: {
    color: '#666',
    marginTop: '0.5rem'
  },
  primaryBtn: {
    display: 'inline-block',
    padding: '0.8rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    marginTop: '1rem',
    transition: 'all 0.3s ease'
  }
};

export default MyApplications;