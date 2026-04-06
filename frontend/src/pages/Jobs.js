import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaSearch, FaBriefcase, FaBuilding, FaFilter, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: ''
  });
  const navigate = useNavigate();
  
  // Get user from localStorage instead of useAuth
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const categories = [
    'All Categories',
    'Software Engineering',
    'Web Development',
    'Data Science',
    'Sales',
    'Marketing',
    'UI/UX Design',
    'Product Management',
    'Human Resources'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      toast.error('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId) => {
    if (!token) {
      toast.info('Please login to apply for jobs');
      navigate('/login');
      return;
    }
    
    if (user?.role === 'applicant') {
      navigate(`/jobs/${jobId}`);
    } else {
      toast.info('Only applicants can apply for jobs');
    }
  };

  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job => {
    const matchesSearch = filters.search === '' || 
      (job.title && job.title.toLowerCase().includes(filters.search.toLowerCase())) ||
      (job.company && job.company.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesLocation = filters.location === '' || 
      (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));
    
    const matchesCategory = filters.category === '' || filters.category === 'All Categories' || 
      (job.category && job.category === filters.category);
    
    return matchesSearch && matchesLocation && matchesCategory;
  }) : [];

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: ''
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <style>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
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
    <div className="jobs-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of opportunities from top companies</p>
          
          <div className="search-container">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Job title, company, or keyword"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="search-input"
              />
            </div>
            <div className="search-input-group">
              <FaMapMarkerAlt className="search-icon" />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="search-input"
              />
            </div>
            <button className="search-btn">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-container">
        {/* Filters Bar */}
        <div className="filters-bar">
          <div className="filters-left">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <FaFilter /> Filter
            </button>
            {(filters.search || filters.location || filters.category) && (
              <button className="clear-filters" onClick={clearFilters}>
                <FaTimes /> Clear all filters
              </button>
            )}
          </div>
          <div className="results-count">
            <FaBriefcase /> {filteredJobs.length} Jobs Found
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job._id} className="job-card">
                <div className="job-card-header">
                  <div className="job-icon">
                    <FaBriefcase />
                  </div>
                  <div className="job-title-section">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="company-info">
                      <FaBuilding className="company-icon" />
                      <span className="company-name">{job.company}</span>
                    </div>
                  </div>
                </div>

                <div className="job-details">
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{job.location}</span>
                  </div>
                  <div className="detail-item">
                    <FaMoneyBillWave className="detail-icon" />
                    <span>{job.salary || 'Negotiable'}</span>
                  </div>
                  <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <span>Posted {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>

                <p className="job-description">
                  {job.description ? (
                    job.description.length > 120 
                      ? `${job.description.substring(0, 120)}...` 
                      : job.description
                  ) : 'No description provided'}
                </p>

                <div className="job-footer">
                  <span className="job-category">{job.category || 'General'}</span>
                  <button 
                    className="apply-btn"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No jobs found</h3>
            <p>Try adjusting your search filters or check back later</p>
            <button className="reset-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .jobs-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: moveBackground 20s linear infinite;
        }

        @keyframes moveBackground {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-section h1 {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .hero-section p {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
        }

        .search-container {
          display: flex;
          gap: 1rem;
          background: white;
          padding: 0.5rem;
          border-radius: 60px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .search-input-group {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 2.8rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          background: #f8f9fa;
        }

        .search-input:focus {
          outline: none;
          background: white;
          box-shadow: 0 0 0 2px #667eea;
        }

        .search-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filters-left {
          display: flex;
          gap: 1rem;
        }

        .filter-toggle, .clear-filters {
          padding: 0.6rem 1.2rem;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .results-count {
          padding: 0.6rem 1.2rem;
          background: white;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: #667eea;
        }

        .filters-panel {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 600;
          color: #333;
        }

        .filter-select {
          padding: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 0.95rem;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .job-card {
          background: white;
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(102,126,234,0.15);
        }

        .job-card-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .job-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }

        .job-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.3rem;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #666;
          font-size: 0.9rem;
        }

        .job-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.8rem 0;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.85rem;
        }

        .detail-icon {
          color: #667eea;
        }

        .job-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .job-category {
          background: #f0f0f0;
          color: #666;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
        }

        .apply-btn {
          padding: 0.5rem 1.2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
        }

        .empty-state {
          text-align: center;
          padding: 4rem;
          background: white;
          border-radius: 20px;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .reset-btn {
          margin-top: 1rem;
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 2rem;
          }
          
          .search-container {
            flex-direction: column;
            border-radius: 20px;
            background: transparent;
            padding: 0;
          }
          
          .search-input-group {
            background: white;
            border-radius: 50px;
          }
          
          .jobs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Jobs;