import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaEye, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ManageJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/jobs/recruiter/myjobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs || []);
      } else {
        toast.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          toast.success('Job deleted successfully');
          fetchJobs();
        } else {
          toast.error('Failed to delete job');
        }
      } catch (error) {
        console.error('Failed to delete job:', error);
        toast.error('Failed to delete job');
      }
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
      <div style={styles.header}>
        <h1>Manage Jobs</h1>
        <button onClick={() => navigate('/recruiter/jobs/post')} style={styles.postBtn}>
          <FaPlus /> Post New Job
        </button>
      </div>

      {jobs.length > 0 ? (
        <div style={styles.jobsList}>
          {jobs.map(job => (
            <div key={job._id} style={styles.jobCard}>
              <div style={styles.jobHeader}>
                <div>
                  <h3>{job.title}</h3>
                  <p style={styles.jobMeta}>{job.location} • {job.category}</p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: job.status === 'active' ? '#2ecc71' : '#e74c3c'
                }}>
                  {job.status}
                </span>
              </div>
              <p style={styles.jobDetails}>
                <strong>Salary:</strong> {job.salary || 'Not specified'} | 
                <strong> Posted:</strong> {new Date(job.postedDate).toLocaleDateString()}
              </p>
              <div style={styles.buttonGroup}>
                <button 
                  onClick={() => navigate(`/recruiter/applications/${job._id}`)} 
                  style={styles.viewBtn}
                >
                  <FaEye /> View Applications
                </button>
                <button 
                  onClick={() => handleDelete(job._id)} 
                  style={styles.deleteBtn}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <FaBriefcase size={50} style={{ color: '#ccc' }} />
          <h3>No jobs posted yet</h3>
          <p>Post your first job to start receiving applications</p>
          <button onClick={() => navigate('/recruiter/jobs/post')} style={styles.primaryBtn}>
            <FaPlus /> Post Your First Job
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '0 2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  postBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  jobCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    border: '1px solid #e0e0e0'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.8rem',
    flexWrap: 'wrap',
    gap: '0.5rem'
  },
  jobMeta: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.3rem'
  },
  jobDetails: {
    color: '#666',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  statusBadge: {
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.8rem',
    textTransform: 'capitalize'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem'
  },
  viewBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  primaryBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '0.8rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default ManageJobs;