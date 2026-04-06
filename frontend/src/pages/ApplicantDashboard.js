import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaUser, FaChartLine } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ApplicantDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const appsResponse = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appsData = await appsResponse.json();
      const applicationsList = appsData.applications || [];
      setApplications(applicationsList);
      
      setStats({
        totalApplications: applicationsList.length,
        pending: applicationsList.filter(a => a.status === 'pending').length,
        shortlisted: applicationsList.filter(a => a.status === 'shortlisted' || a.status === 'reviewed').length,
        rejected: applicationsList.filter(a => a.status === 'rejected').length
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
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
      <div style={styles.welcomeCard}>
        <div style={styles.welcomeContent}>
          <div>
            <h1>Welcome back, {user?.name}! 👋</h1>
            <p>Track your job applications and discover new opportunities</p>
          </div>
          <div style={styles.userAvatar}>
            <FaUser />
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#3498db'}}>
            <FaBriefcase />
          </div>
          <div>
            <h3>Total Applications</h3>
            <span style={styles.statNumber}>{stats.totalApplications}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#f39c12'}}>
            <FaHourglassHalf />
          </div>
          <div>
            <h3>Pending</h3>
            <span style={styles.statNumber}>{stats.pending}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#2ecc71'}}>
            <FaCheckCircle />
          </div>
          <div>
            <h3>Shortlisted</h3>
            <span style={styles.statNumber}>{stats.shortlisted}</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#e74c3c'}}>
            <FaTimesCircle />
          </div>
          <div>
            <h3>Rejected</h3>
            <span style={styles.statNumber}>{stats.rejected}</span>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2>Recent Applications</h2>
          <button onClick={() => navigate('/applicant/applications')} style={styles.viewAllLink}>
            View All →
          </button>
        </div>
        
        {applications.length > 0 ? (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                 </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map(app => {
                  const badge = getStatusBadge(app.status);
                  return (
                    <tr key={app._id}>
                      <td>{app.jobId?.title || 'N/A'}</td>
                      <td>{app.jobId?.company || 'N/A'}</td>
                      <td>{new Date(app.appliedDate).toLocaleDateString()}</td>
                      <td>
                        <span style={{...styles.statusBadge, background: badge.color}}>
                          {badge.icon} {badge.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <FaBriefcase size={50} style={{ color: '#ccc' }} />
            <h3>No applications yet</h3>
            <p>Start applying for jobs to see them here</p>
            <button onClick={() => navigate('/jobs')} style={styles.primaryBtn}>
              Browse Jobs
            </button>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h2>Quick Actions</h2>
        <div style={styles.actionGrid}>
          <button onClick={() => navigate('/jobs')} style={styles.actionCard}>
            <div style={styles.actionIcon}>🔍</div>
            <span>Browse Jobs</span>
          </button>
          <button onClick={() => navigate('/applicant/applications')} style={styles.actionCard}>
            <div style={styles.actionIcon}>📋</div>
            <span>My Applications</span>
          </button>
        </div>
      </div>

      <div style={styles.logoutSection}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <FaTimesCircle /> Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
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
  welcomeCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '2rem',
    color: 'white',
    marginBottom: '2rem',
    boxShadow: '0 10px 30px rgba(102,126,234,0.3)'
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userAvatar: {
    width: '60px',
    height: '60px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem'
  },
  statNumber: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333'
  },
  section: {
    background: 'white',
    borderRadius: '15px',
    padding: '1.5rem',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
    marginBottom: '2rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  viewAllLink: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  statusBadge: {
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    color: 'white'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: '#999'
  },
  primaryBtn: {
    marginTop: '1rem',
    padding: '0.8rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  actionCard: {
    padding: '1.5rem',
    background: '#f8f9fa',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  },
  actionIcon: {
    fontSize: '2rem'
  },
  logoutSection: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  logoutBtn: {
    padding: '0.8rem 2rem',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600'
  }
};

export default ApplicantDashboard;