import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { toast } from 'react-toastify';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      // Get unread count
      const countRes = await fetch('http://localhost:5000/api/notifications/unread-count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const countData = await countRes.json();
      setUnreadCount(countData.count || 0);

      // Get recent notifications
      const notifRes = await fetch('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const notifData = await notifRes.json();
      setNotifications(notifData.notifications || []);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id) => {
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

  const getTypeColor = (type) => {
    const colors = {
      info: '#3498db',
      success: '#2ecc71',
      warning: '#f39c12',
      error: '#e74c3c',
      interview: '#9b59b6',
      message: '#1abc9c'
    };
    return colors[type] || colors.info;
  };

  return (
    <div style={styles.container}>
      <div style={styles.bellIcon} onClick={() => setShowDropdown(!showDropdown)}>
        <FaBell size={22} />
        {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
      </div>

      {showDropdown && (
        <div style={styles.dropdown}>
          <div style={styles.dropdownHeader}>
            <h4>Notifications</h4>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={styles.markAllBtn}>
                Mark all as read
              </button>
            )}
          </div>
          <div style={styles.notificationsList}>
            {notifications.length === 0 ? (
              <div style={styles.emptyState}>No notifications</div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif._id}
                  style={{
                    ...styles.notificationItem,
                    ...(!notif.read ? styles.unread : {})
                  }}
                  onClick={() => markAsRead(notif._id)}
                >
                  <div style={{
                    ...styles.typeIndicator,
                    background: getTypeColor(notif.type)
                  }} />
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>{notif.title}</div>
                    <div style={styles.notificationMessage}>{notif.message}</div>
                    <div style={styles.notificationTime}>
                      {new Date(notif.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'relative'
  },
  bellIcon: {
    cursor: 'pointer',
    position: 'relative',
    padding: '8px',
    color: 'white'
  },
  badge: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '10px',
    minWidth: '18px',
    textAlign: 'center'
  },
  dropdown: {
    position: 'absolute',
    top: '45px',
    right: '0',
    width: '350px',
    maxHeight: '450px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    zIndex: 1000,
    overflow: 'hidden'
  },
  dropdownHeader: {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  markAllBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '12px'
  },
  notificationsList: {
    maxHeight: '400px',
    overflowY: 'auto'
  },
  notificationItem: {
    padding: '12px 15px',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    gap: '10px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  unread: {
    background: '#f0f7ff'
  },
  typeIndicator: {
    width: '4px',
    borderRadius: '2px'
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px'
  },
  notificationMessage: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '4px'
  },
  notificationTime: {
    fontSize: '11px',
    color: '#999'
  },
  emptyState: {
    padding: '20px',
    textAlign: 'center',
    color: '#999'
  }
};

export default NotificationBell;