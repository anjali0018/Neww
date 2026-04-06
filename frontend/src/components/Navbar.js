import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt, FaChartBar } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          🎯 SmartRecruit
        </Link>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            <FaHome /> Home
          </Link>

          <Link to="/jobs" style={styles.navLink}>
            <FaBriefcase /> Jobs
          </Link>

          {token && user && (
            <Link to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/applicant/dashboard'} style={styles.navLink}>
              <FaChartBar /> Dashboard
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </>
          ) : (
            <>
              <span style={styles.userName}>
                <FaUser /> {user.name}
              </span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'white',
    borderBottom: '1px solid #e9ecef',
    padding: '0.75rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#0066B3',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  navLink: {
    color: '#495057',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  registerBtn: {
    background: '#0066B3',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  userName: {
    color: '#495057',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
  },
  logoutBtn: {
    background: '#f8f9fa',
    border: '1px solid #dee2e6',
    color: '#495057',
    padding: '0.4rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
};

export default Navbar;