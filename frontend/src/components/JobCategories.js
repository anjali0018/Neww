import React from 'react';
import { Link } from 'react-router-dom';

function JobCategories() {
  const categories = [
    {
      id: 1,
      title: "Software Engineering",
      jobs: "1,234 jobs available",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#667eea"
    },
    {
      id: 2,
      title: "Web Development",
      jobs: "892 jobs available",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#764ba2"
    },
    {
      id: 3,
      title: "Sales Executive",
      jobs: "567 jobs available",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#f093fb"
    },
    {
      id: 4,
      title: "Marketing",
      jobs: "723 jobs available",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#6a3093"
    },
    {
      id: 5,
      title: "Data Science",
      jobs: "445 jobs available",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#a044ff"
    },
    {
      id: 6,
      title: "UI/UX Design",
      jobs: "678 jobs available",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#4568DC"
    },
    {
      id: 7,
      title: "Product Management",
      jobs: "334 jobs available",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#B06AB3"
    },
    {
      id: 8,
      title: "Human Resources",
      jobs: "289 jobs available",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "#7F00FF"
    }
  ];

  return (
    <section className="job-categories-section">
      <div className="container">
        <h2 className="section-title">Browse Jobs by Category</h2>
        <p className="section-subtitle">Find your dream job in your preferred field</p>
        
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              to={`/jobs?category=${category.title}`} 
              key={category.id} 
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-image-wrapper">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="category-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${category.title.replace(' ', '+')}&size=200&background=${category.color.replace('#', '')}&color=fff`;
                  }}
                />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.jobs}</p>
                <span className="category-link">View Jobs →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .job-categories-section {
          padding: 5rem 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
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

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .category-card {
          text-decoration: none;
          border-radius: 15px;
          overflow: hidden;
          background: white;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          position: relative;
          display: block;
        }

        .category-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
        }

        .category-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
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

        .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1), var(--category-color, #667eea));
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .category-card:hover .category-overlay {
          opacity: 0.9;
        }

        .category-content {
          padding: 1.5rem;
          position: relative;
          background: white;
        }

        .category-content h3 {
          color: #333;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .category-content p {
          color: #667eea;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .category-link {
          color: var(--category-color, #667eea);
          font-weight: 600;
          font-size: 0.9rem;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .category-card:hover .category-link {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
          
          .category-image-wrapper {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
}

export default JobCategories;