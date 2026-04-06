import React from 'react';

function Blog() {
  const posts = [
    { title: '10 Tips for Remote Job Interviews', date: 'Mar 15, 2024', excerpt: 'Master virtual interviews with these proven strategies...', image: '🎥' },
    { title: 'How to Write a Resume That Gets Noticed', date: 'Mar 10, 2024', excerpt: 'Learn the secrets of ATS-friendly resumes that recruiters love...', image: '📝' },
    { title: 'Top 5 In-Demand Skills for 2024', date: 'Mar 5, 2024', excerpt: 'Stay ahead of the curve with these emerging skills...', image: '📊' },
    { title: 'Negotiating Your Salary: A Complete Guide', date: 'Feb 28, 2024', excerpt: 'Don\'t leave money on the table. Learn to negotiate effectively...', image: '💰' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1>Career Blog</h1>
        <p>Insights, tips, and advice for your career journey</p>
      </div>

      <div style={styles.content}>
        <div style={styles.blogGrid}>
          {posts.map((post, i) => (
            <div key={i} style={styles.blogCard}>
              <div style={styles.blogImage}>{post.image}</div>
              <div style={styles.blogContent}>
                <span style={styles.blogDate}>{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <button style={styles.readMore}>Read More →</button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.newsletter}>
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get weekly career tips and job alerts</p>
          <div style={styles.subscribeForm}>
            <input type="email" placeholder="Your email address" style={styles.subscribeInput} />
            <button style={styles.subscribeBtn}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#f8f9fa' },
  hero: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '4rem 2rem', textAlign: 'center' },
  content: { maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' },
  blogGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' },
  blogCard: { background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' },
  blogImage: { fontSize: '4rem', textAlign: 'center', padding: '2rem', background: '#f8f9fa' },
  blogContent: { padding: '1.5rem' },
  blogDate: { fontSize: '0.8rem', color: '#667eea' },
  readMore: { marginTop: '1rem', background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontWeight: '600' },
  newsletter: { background: 'white', padding: '2rem', borderRadius: '15px', textAlign: 'center' },
  subscribeForm: { display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' },
  subscribeInput: { flex: 1, padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '8px' },
  subscribeBtn: { padding: '0.8rem 1.5rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Blog;