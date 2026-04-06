import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ChatBox({ job, companyId, companyName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/messages/${job._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          jobId: job._id,
          receiverId: user.role === 'applicant' ? companyId : job.applicantId,
          message: newMessage
        })
      });
      const data = await response.json();
      if (data.success) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.chatWindow}>
        <div style={styles.header}>
          <h3>Chat with {companyName}</h3>
          <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
        </div>
        
        <div style={styles.messagesArea}>
          {loading ? (
            <div style={styles.loading}>Loading messages...</div>
          ) : messages.length === 0 ? (
            <div style={styles.emptyState}>No messages yet. Start a conversation!</div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.message,
                  ...(msg.senderId === user?.id ? styles.sent : styles.received)
                }}
              >
                <p>{msg.message}</p>
                <span style={styles.time}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} style={styles.inputArea}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            style={styles.input}
          />
          <button type="submit" disabled={sending} style={styles.sendBtn}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  },
  chatWindow: {
    width: '350px',
    height: '500px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    padding: '15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.2rem'
  },
  messagesArea: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    background: '#f8f9fa'
  },
  message: {
    maxWidth: '80%',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    position: 'relative'
  },
  sent: {
    background: '#667eea',
    color: 'white',
    marginLeft: 'auto'
  },
  received: {
    background: 'white',
    color: '#333',
    border: '1px solid #e0e0e0'
  },
  time: {
    fontSize: '10px',
    opacity: 0.7,
    display: 'block',
    marginTop: '5px'
  },
  inputArea: {
    padding: '10px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '10px',
    background: 'white'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    outline: 'none'
  },
  sendBtn: {
    width: '40px',
    height: '40px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    color: '#999'
  },
  emptyState: {
    textAlign: 'center',
    padding: '20px',
    color: '#999'
  }
};

export default ChatBox;