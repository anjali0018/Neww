import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaChartLine, FaShieldAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect if already logged in
  useEffect(() => {
    if (token && user) {
      navigate(user.role === 'recruiter' ? '/recruiter/dashboard' : '/applicant/dashboard');
    }
  }, [token, user, navigate]);

  const categories = [
    {
      id: 1,
      title: "Software Engineering",
      jobs: "1,234 jobs available",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Web Development",
      jobs: "892 jobs available",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "Sales Executive",
      jobs: "567 jobs available",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "Data Science",
      jobs: "445 jobs available",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    }
  ];

  const handleBrowseClick = () => {
    if (token && user) {
      navigate(user.role === 'applicant' ? '/applicant/dashboard' : '/recruiter/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find Your <span className="gradient-text">Dream Job</span> Today
            </h1>
            <p className="hero-subtitle">
              Thousands of jobs from top companies. Apply in minutes and track your applications.
            </p>
            <div className="hero-buttons">
              {!token ? (
                <>
                  <Link to="/register" className="btn-primary">
                    <FaUserPlus /> Get Started
                  </Link>
                  <Link to="/login" className="btn-secondary">
                    <FaSignInAlt /> Login
                  </Link>
                </>
              ) : (
                <button onClick={handleBrowseClick} className="btn-primary">
                  <FaBriefcase /> Go to Dashboard
                </button>
              )}
            </div>

            {/* Stats Counter */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <p>Jobs Posted</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <p>Candidates</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">5K+</span>
                <p>Companies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse Jobs by Category</h2>
          <p className="section-subtitle">Click on any category to explore opportunities</p>
          
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                onClick={handleBrowseClick}
              >
                <div className="category-image-wrapper">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="category-image"
                  />
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.jobs}</p>
                  <span className="category-link">Browse Jobs →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose SmartRecruit?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaBriefcase />
              </div>
              <h3>Easy Job Posting</h3>
              <p>Create and manage job listings with our intuitive interface. Reach thousands of qualified candidates.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Applicant Tracking</h3>
              <p>Track applications in real-time. Review, shortlist, and manage candidates efficiently.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Analytics Dashboard</h3>
              <p>Get insights into your recruitment process with detailed analytics and reports.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Secure & Reliable</h3>
              <p>Your data is safe with us. Role-based access control ensures only authorized users can access sensitive information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Create Account</h4>
              <p>Sign up as a recruiter or job seeker</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Post or Browse Jobs</h4>
              <p>Recruiters post jobs, applicants browse opportunities</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Apply & Track</h4>
              <p>Submit applications and track their status</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Get Hired</h4>
              <p>Successful candidates get hired and join the team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Career Journey?</h2>
          <p>Join thousands of professionals who found their dream jobs through SmartRecruit</p>
          {!token ? (
            <Link to="/register" className="btn-primary btn-large">Create Free Account</Link>
          ) : (
            <button onClick={handleBrowseClick} className="btn-primary btn-large">Go to Dashboard</button>
          )}
        </div>
      </section>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 5rem 0;
          color: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .btn-primary {
          background: white;
          color: #667eea;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          border: 2px solid white;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: white;
          color: #667eea;
          transform: translateY(-2px);
        }

        .btn-large {
          padding: 1rem 3rem;
          font-size: 1.2rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }

        .categories-section {
          padding: 4rem 0;
          background: #f8f9fa;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .section-subtitle {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 3rem;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .category-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(102,126,234,0.2);
        }

        .category-image-wrapper {
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .category-card:hover .category-image {
          transform: scale(1.1);
        }

        .category-content {
          padding: 1.5rem;
          text-align: center;
        }

        .category-content h3 {
          color: #333;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .category-content p {
          color: #667eea;
          font-weight: 600;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .category-link {
          color: #667eea;
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .category-card:hover .category-link {
          transform: translateX(5px);
        }

        .features-section {
          padding: 4rem 0;
          background: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem;
          border-radius: 15px;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
          font-size: 1.8rem;
        }

        .how-it-works {
          padding: 4rem 0;
          background: #f8f9fa;
        }

        .steps-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .cta-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4rem 0;
          text-align: center;
          color: white;
        }

        @media (max-width: 992px) {
          .categories-grid, .features-grid, .steps-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }
          
          .categories-grid, .features-grid, .steps-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;