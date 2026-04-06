import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, FaUsers, FaCheckCircle, FaClock, FaPlus, 
  FaEye, FaBuilding, FaSignOutAlt, FaCalendarAlt, 
  FaPaperPlane, FaFilePdf, FaDownload, FaChartLine,
  FaHourglassHalf, FaStar, FaUserCheck, FaUserTimes,
  FaSearch, FaFilter, FaArrowLeft
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChatBox from '../components/ChatBox';

function RecruiterDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedJobForChat, setSelectedJobForChat] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    meetLink: '',
    scheduledTime: '',
    duration: 60,
    notes: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
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
        const jobsList = data.jobs || [];
        setJobs(jobsList);
        
        let totalApps = 0;
        let pending = 0, reviewed = 0, shortlisted = 0, hired = 0, rejected = 0;
        
        for (const job of jobsList) {
          const appsResponse = await fetch(`http://localhost:5000/api/applications/job/${job._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const appsData = await appsResponse.json();
          const apps = appsData.applications || [];
          
          totalApps += apps.length;
          pending += apps.filter(a => a.status === 'pending').length;
          reviewed += apps.filter(a => a.status === 'reviewed').length;
          shortlisted += apps.filter(a => a.status === 'shortlisted').length;
          hired += apps.filter(a => a.status === 'hired').length;
          rejected += apps.filter(a => a.status === 'rejected').length;
        }
        
        setStats({
          totalJobs: jobsList.length,
          totalApplications: totalApps,
          pending, reviewed, shortlisted, hired, rejected
        });
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (jobId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications || []);
        setSelectedJob(jobs.find(j => j._id === jobId));
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      toast.error('Failed to load applications');
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

  const updateApplicationStatus = async (applicationId, newStatus) => {
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
        if (selectedJob) {
          fetchApplications(selectedJob._id);
        }
        fetchJobs();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const openScheduleModal = (application) => {
    setSelectedApplication(application);
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApplication || !selectedJob) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: selectedJob._id,
          applicationId: selectedApplication._id,
          applicantId: selectedApplication.applicantId._id,
          meetLink: scheduleData.meetLink,
          scheduledTime: scheduleData.scheduledTime,
          duration: scheduleData.duration,
          notes: scheduleData.notes
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Interview scheduled successfully!`);
        setShowScheduleModal(false);
        setScheduleData({ meetLink: '', scheduledTime: '', duration: 60, notes: '' });
        setSelectedApplication(null);
      } else {
        toast.error(data.error || 'Failed to schedule interview');
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error);
      toast.error('Failed to schedule interview');
    }
  };

  const downloadResume = (resumeData, applicantName) => {
    if (resumeData && resumeData.startsWith('data:application/')) {
      const link = document.createElement('a');
      link.href = resumeData;
      link.download = `${applicantName}_resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Downloading resume...');
    } else {
      toast.info('Resume text available below');
    }
  };

  const getFilteredApplications = () => {
    if (filterStatus === 'all') return applications;
    return applications.filter(app => app.status === filterStatus);
  };

  const getStatusCount = (status) => {
    if (status === 'all') return applications.length;
    return applications.filter(app => app.status === status).length;
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: { bg: '#fef7e0', color: '#b06000', label: 'Pending' },
      reviewed: { bg: '#e8f0fe', color: '#0066B3', label: 'Reviewed' },
      shortlisted: { bg: '#e6f4ea', color: '#00A86B', label: 'Shortlisted' },
      hired: { bg: '#e6f4ea', color: '#00A86B', label: 'Hired' },
      rejected: { bg: '#fce8e6', color: '#dc3545', label: 'Rejected' }
    };
    return styles[status] || styles.pending;
  };

  const statusFilters = [
    { value: 'all', label: 'All', icon: <FaUsers />, color: '#0066B3' },
    { value: 'pending', label: 'Pending', icon: <FaHourglassHalf />, color: '#f39c12' },
    { value: 'reviewed', label: 'Reviewed', icon: <FaEye />, color: '#3498db' },
    { value: 'shortlisted', label: 'Shortlisted', icon: <FaStar />, color: '#2ecc71' },
    { value: 'hired', label: 'Hired', icon: <FaUserCheck />, color: '#27ae60' },
    { value: 'rejected', label: 'Rejected', icon: <FaUserTimes />, color: '#e74c3c' }
  ];

  if (loading && !selectedJob && jobs.length === 0) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <style>{`
          .spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #0066B3; border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  // Applications View (when a job is selected)
  if (selectedJob) {
    const filteredApps = getFilteredApplications();
    
    return (
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={() => setSelectedJob(null)} style={styles.backBtn}>
            <FaArrowLeft /> Back to Jobs
          </button>
          <button onClick={handleLogout} style={styles.logoutBtnSmall}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Job Info Card */}
        <div style={styles.jobInfoCard}>
          <h1 style={styles.jobInfoTitle}>{selectedJob.title}</h1>
          <div style={styles.jobInfoDetails}>
            <span>📍 {selectedJob.location}</span>
            <span>📁 {selectedJob.category}</span>
            <span>🏢 {selectedJob.company}</span>
            <span>📅 Posted {new Date(selectedJob.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Status Filter Pills */}
        <div style={styles.filterPills}>
          {statusFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              style={{
                ...styles.filterPill,
                ...(filterStatus === filter.value ? { ...styles.filterPillActive, borderColor: filter.color, color: filter.color } : {})
              }}
            >
              {filter.icon}
              <span>{filter.label}</span>
              <span style={{...styles.filterPillCount, background: filterStatus === filter.value ? filter.color : '#e9ecef', color: filterStatus === filter.value ? 'white' : '#6c757d'}}>
                {getStatusCount(filter.value)}
              </span>
            </button>
          ))}
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div style={styles.emptyAppsCard}>
            <FaUsers size={60} style={{ color: '#ccc' }} />
            <h3>No {filterStatus} applications</h3>
            <p>When candidates apply, they will appear here</p>
          </div>
        ) : (
          <div style={styles.appsGrid}>
            {filteredApps.map(app => {
              const statusStyle = getStatusStyle(app.status);
              return (
                <div key={app._id} style={styles.appCard}>
                  {/* Applicant Header */}
                  <div style={styles.appHeader}>
                    <div>
                      <h3 style={styles.appName}>{app.applicantId?.name}</h3>
                      <p style={styles.appEmail}>{app.applicantId?.email}</p>
                    </div>
                    <span style={{...styles.statusPill, background: statusStyle.bg, color: statusStyle.color}}>
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div style={styles.statusDropdownContainer}>
                    <label style={styles.statusLabel}>Update Status:</label>
                    <select
                      value={app.status}
                      onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                      style={styles.statusSelect}
                    >
                      <option value="pending">📋 Pending Review</option>
                      <option value="reviewed">👁️ Mark as Reviewed</option>
                      <option value="shortlisted">⭐ Shortlist Candidate</option>
                      <option value="hired">✅ Hire Candidate</option>
                      <option value="rejected">❌ Reject Candidate</option>
                    </select>
                  </div>

                  {/* Resume Section */}
                  <div style={styles.resumeBox}>
                    <div style={styles.resumeHeader}>
                      <FaFilePdf size={16} color="#dc3545" />
                      <strong>Resume:</strong>
                    </div>
                    {app.resume && app.resume.startsWith('data:application/') ? (
                      <button onClick={() => downloadResume(app.resume, app.applicantId?.name)} style={styles.downloadResumeBtn}>
                        <FaDownload /> Download Resume (PDF)
                      </button>
                    ) : (
                      <p style={styles.resumeText}>{app.resume || 'No resume provided'}</p>
                    )}
                  </div>

                  {/* Cover Letter */}
                  <div style={styles.coverBox}>
                    <strong>Cover Letter:</strong>
                    <p style={styles.coverText}>{app.coverLetter || 'No cover letter provided'}</p>
                  </div>

                  {/* Action Buttons */}
                  <div style={styles.actionButtons}>
                    <button onClick={() => openScheduleModal(app)} style={styles.scheduleInterviewBtn}>
                      <FaCalendarAlt /> Schedule Interview
                    </button>
                    <button onClick={() => {
                      setSelectedJobForChat({...selectedJob, applicantId: app.applicantId?._id});
                      setShowChat(true);
                    }} style={styles.chatBtn}>
                      <FaPaperPlane /> Chat
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && selectedApplication && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <h3>Schedule Interview</h3>
                <button onClick={() => setShowScheduleModal(false)} style={styles.modalClose}>×</button>
              </div>
              <div style={styles.modalBody}>
                <p><strong>Candidate:</strong> {selectedApplication.applicantId?.name}</p>
                <p><strong>Position:</strong> {selectedJob?.title}</p>
                
                <form onSubmit={handleScheduleSubmit}>
                  <div style={styles.formGroup}>
                    <label>Google Meet Link *</label>
                    <input type="text" placeholder="https://meet.google.com/xxx-xxxx-xxx" value={scheduleData.meetLink} onChange={(e) => setScheduleData({...scheduleData, meetLink: e.target.value})} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Date & Time *</label>
                    <input type="datetime-local" value={scheduleData.scheduledTime} onChange={(e) => setScheduleData({...scheduleData, scheduledTime: e.target.value})} style={styles.input} required />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Duration (minutes)</label>
                    <input type="number" value={scheduleData.duration} onChange={(e) => setScheduleData({...scheduleData, duration: e.target.value})} style={styles.input} min="15" step="15" />
                  </div>
                  <div style={styles.modalActions}>
                    <button type="button" onClick={() => setShowScheduleModal(false)} style={styles.cancelBtn}>Cancel</button>
                    <button type="submit" style={styles.submitBtn}><FaCalendarAlt /> Schedule</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChat && selectedJobForChat && (
          <ChatBox job={selectedJobForChat} companyId={user?._id} companyName={user?.company} onClose={() => setShowChat(false)} />
        )}
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Recruiter Dashboard</h1>
          <p style={styles.pageSubtitle}>Manage jobs & track applicants</p>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userAvatarLarge}>
            <span>{user?.name?.charAt(0) || 'R'}</span>
          </div>
          <div>
            <p style={styles.userNameLarge}>{user?.name}</p>
            <p style={styles.userCompany}>{user?.company}</p>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIconBg, background: '#0066B3'}}><FaBriefcase size={20} color="white" /></div>
          <div><div style={styles.statLabel}>Total Jobs</div><div style={styles.statValue}>{stats.totalJobs}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIconBg, background: '#00A86B'}}><FaUsers size={20} color="white" /></div>
          <div><div style={styles.statLabel}>Applications</div><div style={styles.statValue}>{stats.totalApplications}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIconBg, background: '#f39c12'}}><FaHourglassHalf size={20} color="white" /></div>
          <div><div style={styles.statLabel}>Pending</div><div style={styles.statValue}>{stats.pending}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIconBg, background: '#2ecc71'}}><FaStar size={20} color="white" /></div>
          <div><div style={styles.statLabel}>Shortlisted</div><div style={styles.statValue}>{stats.shortlisted}</div></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActionsCard}>
        <h3 style={styles.cardTitle}>Quick Actions</h3>
        <div style={styles.quickActionsGrid}>
          <button onClick={() => navigate('/recruiter/jobs/post')} style={styles.quickActionBtn}>
            <span style={styles.quickActionIcon}>📝</span>
            <span>Post a Job</span>
          </button>
          <button onClick={() => navigate('/recruiter/jobs')} style={styles.quickActionBtn}>
            <span style={styles.quickActionIcon}>💼</span>
            <span>Manage Jobs</span>
          </button>
        </div>
      </div>

      {/* Jobs Section */}
      <div style={styles.jobsCard}>
        <h3 style={styles.cardTitle}>Your Job Postings</h3>
        {jobs.length === 0 ? (
          <div style={styles.emptyJobs}>
            <FaBriefcase size={50} style={{ color: '#ccc' }} />
            <p>No jobs posted yet</p>
            <button onClick={() => navigate('/recruiter/jobs/post')} style={styles.postJobBtn}>Post Your First Job</button>
          </div>
        ) : (
          <div style={styles.jobsGrid}>
            {jobs.map(job => (
              <div key={job._id} style={styles.jobCard}>
                <div style={styles.jobCardHeader}>
                  <h4 style={styles.jobCardTitle}>{job.title}</h4>
                  <span style={job.status === 'active' ? styles.activeBadge : styles.closedBadge}>
                    {job.status}
                  </span>
                </div>
                <p style={styles.jobCardMeta}>{job.location} • {job.category}</p>
                <p style={styles.jobCardDate}>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
                <button onClick={() => fetchApplications(job._id)} style={styles.viewAppsBtn}>
                  <FaEye /> View Applications
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  
  // Header
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' },
  pageTitle: { fontSize: '1.75rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.25rem' },
  pageSubtitle: { fontSize: '0.875rem', color: '#6c757d' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8f9fa', padding: '0.5rem 1rem', borderRadius: '50px' },
  userAvatarLarge: { width: '40px', height: '40px', background: '#0066B3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '1.2rem' },
  userNameLarge: { fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.1rem' },
  userCompany: { fontSize: '0.75rem', color: '#6c757d' },
  logoutBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' },
  logoutBtnSmall: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' },
  
  // Back Button
  backBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#0066B3', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' },
  
  // Stats
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  statCard: { background: 'white', borderRadius: '16px', padding: '1.2rem', border: '1px solid #e9ecef', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  statIconBg: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.2rem' },
  statValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  
  // Quick Actions
  quickActionsCard: { background: 'white', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #e9ecef' },
  cardTitle: { fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1a1a1a' },
  quickActionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' },
  quickActionBtn: { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '12px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: 'all 0.2s' },
  quickActionIcon: { fontSize: '1.3rem' },
  
  // Jobs Section
  jobsCard: { background: 'white', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e9ecef' },
  jobsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem', marginTop: '0.5rem' },
  jobCard: { padding: '1rem', border: '1px solid #e9ecef', borderRadius: '12px', transition: 'all 0.2s' },
  jobCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  jobCardTitle: { fontSize: '1rem', fontWeight: '600', color: '#1a1a1a' },
  activeBadge: { padding: '2px 8px', background: '#e6f4ea', color: '#00A86B', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '500' },
  closedBadge: { padding: '2px 8px', background: '#fce8e6', color: '#dc3545', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '500' },
  jobCardMeta: { fontSize: '0.75rem', color: '#6c757d', marginBottom: '0.3rem' },
  jobCardDate: { fontSize: '0.7rem', color: '#adb5bd', marginBottom: '0.8rem' },
  viewAppsBtn: { width: '100%', padding: '0.5rem', background: '#0066B3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  
  // Job Info Card (Applications View)
  jobInfoCard: { background: 'linear-gradient(135deg, #0066B3 0%, #004C8C 100%)', color: 'white', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' },
  jobInfoTitle: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' },
  jobInfoDetails: { display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', opacity: 0.9 },
  
  // Filter Pills
  filterPills: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' },
  filterPill: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'white', border: '1px solid #e9ecef', borderRadius: '30px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' },
  filterPillActive: { background: '#f8f9fa', borderWidth: '2px' },
  filterPillCount: { padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '600' },
  
  // Applications Grid
  appsGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
  appCard: { background: 'white', padding: '1.2rem', borderRadius: '16px', border: '1px solid #e9ecef', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
  appHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' },
  appName: { fontSize: '1rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.2rem' },
  appEmail: { fontSize: '0.75rem', color: '#6c757d' },
  statusPill: { padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500' },
  
  // Status Dropdown
  statusDropdownContainer: { marginBottom: '1rem' },
  statusLabel: { fontSize: '0.7rem', color: '#6c757d', display: 'block', marginBottom: '0.3rem' },
  statusSelect: { padding: '0.5rem', border: '1px solid #e9ecef', borderRadius: '8px', fontSize: '0.8rem', width: '100%', background: '#f8f9fa', cursor: 'pointer' },
  
  // Resume & Cover Letter
  resumeBox: { marginBottom: '0.8rem', padding: '0.8rem', background: '#f8f9fa', borderRadius: '10px' },
  resumeHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
  downloadResumeBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: '#0066B3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem' },
  resumeText: { fontSize: '0.75rem', color: '#6c757d', lineHeight: '1.4', maxHeight: '60px', overflowY: 'auto' },
  coverBox: { marginBottom: '1rem', padding: '0.8rem', background: '#f8f9fa', borderRadius: '10px' },
  coverText: { fontSize: '0.75rem', color: '#6c757d', lineHeight: '1.4', marginTop: '0.3rem' },
  
  // Action Buttons
  actionButtons: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
  scheduleInterviewBtn: { padding: '0.5rem 1rem', background: '#8e44ad', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  chatBtn: { padding: '0.5rem 1rem', background: '#1abc9c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  
  // Empty States
  emptyJobs: { textAlign: 'center', padding: '2rem', color: '#6c757d' },
  emptyAppsCard: { textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '16px', border: '1px solid #e9ecef' },
  postJobBtn: { marginTop: '1rem', padding: '0.5rem 1rem', background: '#0066B3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  
  // Modal
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalContent: { background: 'white', borderRadius: '16px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { padding: '1rem 1.5rem', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalClose: { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' },
  modalBody: { padding: '1.5rem' },
  formGroup: { marginBottom: '1rem' },
  input: { width: '100%', padding: '0.6rem', border: '1px solid #e9ecef', borderRadius: '8px', fontSize: '0.85rem', marginTop: '0.3rem' },
  modalActions: { display: 'flex', gap: '1rem', marginTop: '1.5rem' },
  cancelBtn: { flex: 1, padding: '0.6rem', background: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px', cursor: 'pointer' },
  submitBtn: { flex: 1, padding: '0.6rem', background: '#0066B3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }
};

export default RecruiterDashboard;