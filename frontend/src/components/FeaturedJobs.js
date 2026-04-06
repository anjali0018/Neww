import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaClock } from 'react-icons/fa';

function FeaturedJobs() {
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/google.com",
      category: "Software Engineering"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$90k - $110k",
      type: "Full-time",
      posted: "1 day ago",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/microsoft.com",
      category: "Web Development"
    },
    {
      id: 3,
      title: "Sales Executive",
      company: "Global Sales Co.",
      location: "New York, NY",
      salary: "$70k + Commission",
      type: "Full-time",
      posted: "3 days ago",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/salesforce.com",
      category: "Sales"
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Austin, TX",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "5 days ago",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/amazon.com",
      category: "Product Management"
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Seattle, WA",
      salary: "$125k - $145k",
      type: "Full-time",
      posted: "1 week ago",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/ibm.com",
      category: "Data Science"
    },
    {
      id: 6,
      title: "UX Designer",
      company: "Creative Studio",
      location: "Los Angeles, CA",
      salary: "$85k - $105k",
      type: "Full-time",
      posted: "4 days ago",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      logo: "https://logo.clearbit.com/adobe.com",
      category: "UI/UX Design"
    }
  ];

  return (
    <section className="featured-jobs-section">
      <div className="container">
        <h2 className="section-title">Featured Jobs</h2>
        <p className="section-subtitle">Hand-picked opportunities for you</p>
        
        <div className="featured-jobs-grid">
          {featuredJobs.map(job => (
            <div key={job.id} className="featured-job-card">
              <div className="job-image-wrapper">
                <img 
                  src={job.image} 
                  alt={job.title}
                  className="job-image"
                  loading="lazy"
                />
                <div className="job-category-tag">{job.category}</div>
              </div>
              
              <div className="job-content">
                <div className="company-info">
                  <img 
                    src={job.logo} 
                    alt={job.company}
                    className="company-logo"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${job.company}&size=50&background=667eea&color=fff`;
                    }}
                  />
                  <div>
                    <h3 className="job-title-featured">{job.title}</h3>
                    <p className="company-name-featured">{job.company}</p>
                  </div>
                </div>
                
                <div className="job-details-featured">
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaBriefcase /> {job.type}</span>
                  <span><FaClock /> {job.posted}</span>
                </div>
                
                <div className="job-salary-featured">
                  {job.salary}
                </div>
                
                <Link to={`/job/${job.id}`} className="btn-view-job">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-5">
          <Link to="/jobs" className="btn-browse-all">
            Browse All Jobs →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .featured-jobs-section {
          padding: 5rem 0;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
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

        .featured-jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .featured-job-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .featured-job-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
        }

        .job-image-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .job-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .featured-job-card:hover .job-image {
          transform: scale(1.1);
        }

        .job-category-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(102, 126, 234, 0.9);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 25px;
          font-size: 0.8rem;
          font-weight: 600;
          backdrop-filter: blur(5px);
        }

        .job-content {
          padding: 1.5rem;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .company-logo {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          object-fit: cover;
          border: 2px solid #f0f0f0;
        }

        .job-title-featured {
          color: #333;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .company-name-featured {
          color: #667eea;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .job-details-featured {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          color: #666;
          font-size: 0.9rem;
        }

        .job-details-featured span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .job-salary-featured {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .btn-view-job {
          display: inline-block;
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-view-job:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-browse-all {
          display: inline-block;
          padding: 1rem 3rem;
          background: transparent;
          color: #667eea;
          text-decoration: none;
          border: 2px solid #667eea;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-browse-all:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        @media (max-width: 768px) {
          .featured-jobs-grid {
            grid-template-columns: 1fr;
          }
          
          .job-image-wrapper {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
}

export default FeaturedJobs;