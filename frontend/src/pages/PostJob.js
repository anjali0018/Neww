import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    category: 'Software Engineering'
  });

  const categories = [
    'Software Engineering',
    'Web Development',
    'Data Science',
    'Sales',
    'Marketing',
    'UI/UX Design',
    'Product Management',
    'Human Resources'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          company: user?.company || 'Your Company'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success('Job posted successfully!');
        navigate('/recruiter/jobs');
      } else {
        toast.error(data.error || 'Failed to post job');
      }
    } catch (error) {
      console.error('Failed to post job:', error);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Post a New Job</h1>
        <p>Fill in the details below to create a job listing</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="e.g., Senior Software Engineer"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="e.g., New York, NY or Remote"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Salary (Optional)</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              style={styles.input}
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Job Description *</label>
            <textarea
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              required
              placeholder="Describe the role, responsibilities, and ideal candidate..."
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Requirements *</label>
            <textarea
              name="requirements"
              rows="5"
              value={formData.requirements}
              onChange={handleChange}
              style={styles.textarea}
              required
              placeholder="List the required skills, experience, and qualifications..."
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={() => navigate(-1)} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 2rem'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
  },
  inputGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#555',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    resize: 'vertical'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem',
    background: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default PostJob;