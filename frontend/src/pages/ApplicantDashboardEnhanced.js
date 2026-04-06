import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, FaClock, FaCheckCircle, FaTimesCircle, 
  FaHourglassHalf, FaUser, FaBell, FaBookmark, 
  FaPaperPlane, FaVideo, FaEnvelope, FaChartLine,
  FaUpload, FaFilePdf, FaFileWord, FaTrash, FaEye
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import ChatBox from '../components/ChatBox';

function ApplicantDashboardEnhanced() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobsList, setSavedJobsList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState(localStorage.getItem('resumeName') || '');
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0,
    interviewRate: 0
  });
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedJobForChat, setSelectedJobForChat] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    fetchAllData();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchApplications(),
      fetchSavedJobs(),
      fetchInterviews(),
      fetchNotifications()
    ]);
    setLoading(false);
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applications/my-applications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      const applicationsList = data.applications || [];
      setApplications(applicationsList);
      
      const total = applicationsList.length;
      const shortlisted = applicationsList.filter(a => a.status === 'shortlisted').length;
      const hired = applicationsList.filter(a => a.status === 'hired').length;
      
      setStats({
        totalApplications: total,
        pending: applicationsList.filter(a => a.status === 'pending').length,
        shortlisted: shortlisted,
        rejected: applicationsList.filter(a => a.status === 'rejected').length,
        hired: hired,
        interviewRate: total > 0 ? ((shortlisted / total) * 100).toFixed(1) : 0
      });
      
      // Generate activity data
      const last7Days = [];
      const today = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        const dayApps = applicationsList.filter(app => {
          const appDate = new Date(app.appliedDate);
          appDate.setHours(0, 0, 0, 0);
          return appDate >= date && appDate < nextDate;
        }).length;
        last7Days.push({
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          applications: dayApps
        });
      }
      setActivityData(last7Days);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/saved-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSavedJobsList(data.savedJobs || []);
    } catch (error) {
      console.error('Failed to fetch saved jobs:', error);
      setSavedJobsList([]);
    }
  };

  const fetchInterviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/interviews/my-interviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setInterviews(data.interviews || []);
    } catch (error) {
      console.error('Failed to fetch interviews:', error);
      setInterviews([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const [notifRes, countRes] = await Promise.all([
        fetch('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/notifications/unread-count', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      const notifData = await notifRes.json();
      const countData = await countRes.json();
      setNotifications(notifData.notifications || []);
      setUnreadCount(countData.count || 0);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleResumeUpload = (e) => {
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
      setResumeName(file.name);
      localStorage.setItem('resumeName', file.name);
      
      // In real app, upload to server here
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('resumeData', reader.result);
      };
      reader.readAsDataURL(file);
      
      toast.success('Resume uploaded successfully!');
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeName('');
    localStorage.removeItem('resumeName');
    localStorage.removeItem('resumeData');
    toast.info('Resume removed');
  };

  const markNotificationRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllRead = async () => {
    try {
      await fetch('http://localhost:5000/api/notifications/read-all', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const hasApplied = (jobId) => {
    return applications.some(app => app.jobId?._id === jobId);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: '#f39c12', text: 'Pending Review', icon: <FaHourglassHalf /> },
      reviewed: { color: '#3498db', text: 'Reviewed', icon: <FaClock /> },
      shortlisted: { color: '#2ecc71', text: 'Shortlisted!', icon: <FaCheckCircle /> },
      rejected: { color: '#e74c3c', text: 'Not Selected', icon: <FaTimesCircle /> },
      hired: { color: '#27ae60', text: 'Hired! 🎉', icon: <FaCheckCircle /> }
    };
    return badges[status] || badges.pending;
  };

  const maxApplications = Math.max(...activityData.map(d => d.applications), 1);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="spinner"></div>
        <style>{`
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

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>My Dashboard</h1>
          <p style={styles.subtitle}>Track your job applications</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.notificationIcon} onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell size={20} />
            {unreadCount > 0 && <span style={styles.notificationBadge}>{unreadCount}</span>}
          </div>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>{user?.name?.charAt(0) || 'U'}</div>
            <span style={styles.userName}>{user?.name}</span>
          </div>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div style={styles.notificationsDropdown}>
          <div style={styles.dropdownHeader}>
            <h4>Notifications</h4>
            {unreadCount > 0 && <button onClick={markAllRead} style={styles.markAllBtn}>Mark all read</button>}
          </div>
          {notifications.length > 0 ? (
            notifications.map(notif => (
              <div key={notif._id} style={{...styles.notificationItem, ...(!notif.read ? styles.notificationUnread : {})}} onClick={() => markNotificationRead(notif._id)}>
                <div style={styles.notificationContent}>
                  <div style={styles.notificationTitle}>{notif.title}</div>
                  <div style={styles.notificationMessage}>{notif.message}</div>
                  <div style={styles.notificationTime}>{new Date(notif.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noNotifications}>No notifications</div>
          )}
        </div>
      )}

      {/* Resume Upload Section */}
      <div style={styles.resumeCard}>
        <div style={styles.resumeIcon}><FaUpload size={24} /></div>
        <div style={styles.resumeContent}>
          <h3>Your Resume</h3>
          <p>Upload your resume to apply faster. Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
          {resumeName ? (
            <div style={styles.resumeFileInfo}>
              <span><FaFilePdf /> {resumeName}</span>
              <button onClick={removeResume} style={styles.removeResumeBtn}><FaTrash /> Remove</button>
            </div>
          ) : (
            <label style={styles.uploadBtn}>
              <FaUpload /> Upload Resume
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} style={{ display: 'none' }} />
            </label>
          )}
        </div>
      </div>

      {/* Welcome Card */}
      <div style={styles.welcomeCard}>
        <div>
          <h2 style={styles.welcomeTitle}>Welcome back, {user?.name}! 👋</h2>
          <p style={styles.welcomeText}>Your job search journey at a glance</p>
          <div style={styles.statsSummary}>
            <div style={styles.statSummaryItem}>
              <span style={styles.statSummaryValue}>{stats.totalApplications}</span>
              <span>Applications</span>
            </div>
            <div style={styles.statSummaryItem}>
              <span style={styles.statSummaryValue}>{stats.shortlisted}</span>
              <span>Shortlisted</span>
            </div>
            <div style={styles.statSummaryItem}>
              <span style={styles.statSummaryValue}>{stats.interviewRate}%</span>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
        <div style={styles.progressCircle}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5"/>
            <circle cx="40" cy="40" r="35" fill="none" stroke="white" strokeWidth="5" 
              strokeDasharray={`${2 * Math.PI * 35 * 0.7} ${2 * Math.PI * 35}`} strokeLinecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <span>70%</span>
          <small>Profile</small>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#1a73e8'}}><FaBriefcase size={18} /></div>
          <div><div style={styles.statLabel}>Applications</div><div style={styles.statValue}>{stats.totalApplications}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#f39c12'}}><FaHourglassHalf size={18} /></div>
          <div><div style={styles.statLabel}>Pending</div><div style={styles.statValue}>{stats.pending}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#2ecc71'}}><FaCheckCircle size={18} /></div>
          <div><div style={styles.statLabel}>Shortlisted</div><div style={styles.statValue}>{stats.shortlisted}</div></div>
        </div>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#e74c3c'}}><FaTimesCircle size={18} /></div>
          <div><div style={styles.statLabel}>Rejected</div><div style={styles.statValue}>{stats.rejected}</div></div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      {interviews.filter(i => i.status === 'scheduled').length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}><FaVideo style={{ marginRight: '8px', color: '#1a73e8' }} /> Upcoming Interviews</h3>
          {interviews.filter(i => i.status === 'scheduled').map(interview => (
            <div key={interview._id} style={styles.interviewCard}>
              <div>
                <h4>{interview.jobId?.title}</h4>
                <p>{interview.jobId?.company}</p>
                <div style={styles.interviewTime}><FaClock size={12} /> {new Date(interview.scheduledTime).toLocaleString()}</div>
              </div>
              <a href={interview.meetLink} target="_blank" rel="noopener noreferrer" style={styles.joinMeetBtn}><FaVideo /> Join Meeting</a>
            </div>
          ))}
        </div>
      )}

      {/* Activity Chart */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><FaChartLine style={{ marginRight: '8px', color: '#1a73e8' }} /> Application Activity</h3>
        <div style={styles.chartContainer}>
          {activityData.map((day, i) => (
            <div key={i} style={styles.chartBar}>
              <div style={{...styles.bar, height: `${(day.applications / maxApplications) * 100}px`}}>
                {day.applications > 0 && <span style={styles.barLabel}>{day.applications}</span>}
              </div>
              <span style={styles.barDay}>{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.actionGrid}>
          <button onClick={() => navigate('/jobs')} style={styles.actionCard}>🔍 Browse Jobs</button>
          <button onClick={() => navigate('/applicant/applications')} style={styles.actionCard}>📋 My Applications</button>
          <button onClick={() => fetchSavedJobs()} style={styles.actionCard}>❤️ Saved ({savedJobsList.length})</button>
        </div>
      </div>

      {/* Recent Applications */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Recent Applications</h3>
          <button onClick={() => navigate('/applicant/applications')} style={styles.viewAllLink}>View All →</button>
        </div>
        {applications.length > 0 ? (
          applications.slice(0, 5).map(app => {
            const badge = getStatusBadge(app.status);
            return (
              <div key={app._id} style={styles.applicationCard}>
                <div style={styles.applicationInfo}>
                  <div>
                    <h4>{app.jobId?.title || 'Job Title'}</h4>
                    <p>{app.jobId?.company} • {app.jobId?.location}</p>
                  </div>
                  <span style={{...styles.statusBadge, background: badge.color}}>
                    {badge.icon} {badge.text}
                  </span>
                </div>
                <div style={styles.applicationFooter}>
                  <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                  <div style={styles.applicationActions}>
                    <button onClick={() => navigate(`/jobs/${app.jobId?._id}`)} style={styles.viewJobBtn}><FaEye /> View Job</button>
                    <button onClick={() => { setSelectedJobForChat(app.jobId); setShowChat(true); }} style={styles.chatBtn}><FaPaperPlane /> Chat</button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyState}>
            <FaBriefcase size={48} style={{ color: '#ccc' }} />
            <h4>No applications yet</h4>
            <button onClick={() => navigate('/jobs')} style={styles.primaryBtn}>Browse Jobs</button>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {showChat && selectedJobForChat && (
        <ChatBox job={selectedJobForChat} companyId={selectedJobForChat.recruiterId?._id} companyName={selectedJobForChat.company} onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e0e0e0' },
  title: { fontSize: '1.75rem', fontWeight: '600', color: '#202124', marginBottom: '0.25rem' },
  subtitle: { fontSize: '0.875rem', color: '#5f6368' },
  headerActions: { display: 'flex', alignItems: 'center', gap: '1rem' },
  notificationIcon: { position: 'relative', cursor: 'pointer', padding: '0.5rem', color: '#5f6368' },
  notificationBadge: { position: 'absolute', top: '0', right: '0', background: '#ea4335', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem 0.25rem 0.25rem', background: '#f1f3f4', borderRadius: '30px' },
  userAvatar: { width: '32px', height: '32px', background: '#1a73e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' },
  userName: { fontSize: '14px', fontWeight: '500', color: '#202124' },
  notificationsDropdown: { position: 'absolute', right: '2rem', top: '5rem', width: '380px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000 },
  dropdownHeader: { padding: '12px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' },
  markAllBtn: { background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', fontSize: '12px' },
  notificationItem: { padding: '12px 16px', borderBottom: '1px solid #f1f3f4', cursor: 'pointer' },
  notificationUnread: { background: '#e8f0fe' },
  notificationTitle: { fontSize: '13px', fontWeight: '600', color: '#202124' },
  notificationMessage: { fontSize: '12px', color: '#5f6368', marginTop: '4px' },
  notificationTime: { fontSize: '10px', color: '#9aa0a6', marginTop: '4px' },
  noNotifications: { padding: '20px', textAlign: 'center', color: '#5f6368' },
  resumeCard: { background: 'linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%)', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' },
  resumeIcon: { width: '50px', height: '50px', background: '#1a73e8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
  resumeContent: { flex: 1 },
  resumeFileInfo: { display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' },
  uploadBtn: { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#1a73e8', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '0.5rem' },
  removeResumeBtn: { padding: '0.3rem 0.8rem', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  welcomeCard: { background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)', borderRadius: '20px', padding: '2rem', color: 'white', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  welcomeTitle: { fontSize: '1.25rem', fontWeight: '500', marginBottom: '0.5rem' },
  welcomeText: { fontSize: '0.875rem', opacity: 0.9, marginBottom: '1rem' },
  statsSummary: { display: 'flex', gap: '2rem' },
  statSummaryItem: { textAlign: 'center' },
  statSummaryValue: { fontSize: '1.5rem', fontWeight: '600', display: 'block' },
  progressCircle: { position: 'relative', width: '80px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  statCard: { background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #e0e0e0' },
  statIcon: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' },
  statLabel: { fontSize: '12px', color: '#5f6368' },
  statValue: { fontSize: '22px', fontWeight: '600', color: '#202124' },
  section: { background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem', border: '1px solid #e0e0e0' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  sectionTitle: { fontSize: '1.125rem', fontWeight: '600', color: '#202124', margin: 0 },
  viewAllLink: { background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', fontSize: '0.875rem' },
  interviewCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '12px', marginBottom: '0.75rem' },
  interviewTime: { fontSize: '12px', color: '#5f6368', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' },
  joinMeetBtn: { padding: '8px 16px', background: '#1a73e8', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' },
  chartContainer: { display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '150px', gap: '1rem', marginTop: '1rem' },
  chartBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  bar: { width: '100%', maxWidth: '40px', background: 'linear-gradient(180deg, #1a73e8 0%, #0d47a1 100%)', borderRadius: '8px 8px 4px 4px', transition: 'height 0.5s ease', position: 'relative', display: 'flex', justifyContent: 'center' },
  barLabel: { position: 'absolute', top: '-22px', fontSize: '11px', fontWeight: '600', color: '#1a73e8' },
  barDay: { marginTop: '8px', fontSize: '11px', color: '#5f6368' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' },
  actionCard: { padding: '0.8rem', background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '10px', cursor: 'pointer', textAlign: 'center', fontSize: '0.875rem', fontWeight: '500' },
  applicationCard: { padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '12px', marginBottom: '0.75rem' },
  applicationInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' },
  statusBadge: { padding: '0.25rem 0.75rem', borderRadius: '20px', color: 'white', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' },
  applicationFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#5f6368', flexWrap: 'wrap', gap: '0.5rem' },
  applicationActions: { display: 'flex', gap: '0.5rem' },
  viewJobBtn: { padding: '0.25rem 0.75rem', background: '#f1f3f4', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' },
  chatBtn: { padding: '0.25rem 0.75rem', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' },
  emptyState: { textAlign: 'center', padding: '2rem', color: '#5f6368' },
  primaryBtn: { marginTop: '1rem', padding: '0.5rem 1.5rem', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default ApplicantDashboardEnhanced;