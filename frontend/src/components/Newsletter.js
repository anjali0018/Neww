import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Successfully subscribed to newsletter!');
    setEmail('');
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Stay Updated with Latest Jobs</h2>
        <p style={styles.subtitle}>Subscribe to our newsletter and get weekly job alerts</p>
        
        <form onSubmit={handleSubscribe} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Subscribe
          </button>
        </form>
        
        <p style={styles.note}>
          No spam, unsubscribe anytime. 10,000+ professionals already subscribed.
        </p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'white',
    padding: '4rem 0',
    textAlign: 'center'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  input: {
    flex: '1',
    padding: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  button: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  note: {
    color: '#666',
    fontSize: '0.9rem'
  }
};

export default Newsletter;