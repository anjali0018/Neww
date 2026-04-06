import React from 'react';

function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer at Google",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "Found my dream job through SmartRecruit within 2 weeks of applying! The platform made job hunting so much easier.",
      company: "Google"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote: "As a recruiter, this platform has transformed how we hire. We've filled 50+ positions in just 3 months.",
      company: "Microsoft"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "UX Designer at Adobe",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote: "The application tracking feature is a game-changer. I could see exactly where I stood in the hiring process.",
      company: "Adobe"
    }
  ];

  return (
    <section className="success-stories" style={styles.section}>
      <div className="container" style={styles.container}>
        <h2 style={styles.title}>Success Stories</h2>
        <p style={styles.subtitle}>Real people, real results</p>
        
        <div style={styles.grid}>
          {stories.map(story => (
            <div key={story.id} style={styles.card}>
              <img src={story.image} alt={story.name} style={styles.storyImage} />
              <div style={styles.content}>
                <p style={styles.quote}>"{story.quote}"</p>
                <div style={styles.author}>
                  <img src={story.image} alt={story.name} style={styles.avatar} />
                  <div style={styles.authorInfo}>
                    <h4 style={styles.authorName}>{story.name}</h4>
                    <p style={styles.authorRole}>{story.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '5rem 0',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: '700'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1rem',
    marginBottom: '3rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    background: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  storyImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '1.5rem'
  },
  quote: {
    fontSize: '1rem',
    color: '#555',
    fontStyle: 'italic',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  authorInfo: {
    flex: 1
  },
  authorName: {
    color: '#333',
    marginBottom: '0.2rem',
    fontSize: '1.1rem'
  },
  authorRole: {
    color: '#667eea',
    fontSize: '0.9rem',
    fontWeight: '600'
  }
};

export default SuccessStories;