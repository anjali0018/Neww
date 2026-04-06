import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEye, FaTrash, FaCheckDouble } from 'react-icons/fa';
import { toast } from 'react-toastify';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/contact/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMessages();
        toast.success('Message deleted');
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Contact Messages</h1>
      <p>Messages from users who contacted us</p>

      {messages.length === 0 ? (
        <div style={styles.emptyState}>No messages yet</div>
      ) : (
        <div style={styles.messagesList}>
          {messages.map(msg => (
            <div key={msg._id} style={{...styles.messageCard, ...(msg.status === 'unread' ? styles.unread : {})}}>
              <div style={styles.messageHeader}>
                <div>
                  <h3>{msg.name}</h3>
                  <p style={styles.email}>{msg.email}</p>
                </div>
                <div style={styles.messageActions}>
                  {msg.status === 'unread' && (
                    <button onClick={() => markAsRead(msg._id)} style={styles.readBtn} title="Mark as read">
                      <FaCheckDouble />
                    </button>
                  )}
                  <button onClick={() => deleteMessage(msg._id)} style={styles.deleteBtn} title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div style={styles.messageSubject}>
                <strong>Subject:</strong> {msg.subject}
              </div>
              <div style={styles.messageContent}>
                <p>{msg.message}</p>
              </div>
              <div style={styles.messageFooter}>
                <small>Received: {new Date(msg.createdAt).toLocaleString()}</small>
                <span style={{...styles.statusBadge, background: msg.status === 'unread' ? '#ea4335' : '#34a853'}}>
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '1000px', margin: '2rem auto', padding: '0 2rem' },
  messagesList: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' },
  messageCard: { background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' },
  unread: { background: '#e8f0fe', borderLeft: '4px solid #1a73e8' },
  messageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
  email: { color: '#5f6368', fontSize: '0.875rem' },
  messageActions: { display: 'flex', gap: '0.5rem' },
  readBtn: { padding: '0.5rem', background: '#34a853', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  deleteBtn: { padding: '0.5rem', background: '#ea4335', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  messageSubject: { marginBottom: '0.5rem' },
  messageContent: { marginBottom: '1rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' },
  messageFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#5f6368' },
  statusBadge: { padding: '2px 8px', borderRadius: '12px', color: 'white', fontSize: '0.7rem' },
  emptyState: { textAlign: 'center', padding: '4rem', color: '#5f6368' }
};

export default AdminMessages;