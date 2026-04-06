import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import ApplicantDashboard from './pages/ApplicantDashboardEnhanced';
import RecruiterDashboard from './pages/RecruiterDashboard';
import PostJob from './pages/PostJob';
import ManageJobs from './pages/ManageJobs';
import MyApplications from './pages/MyApplications';
import ApplicationDetails from './pages/ApplicationDetails';

// Info Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Companies from './pages/Companies';
import CareerTips from './pages/CareerTips';
import ResumeHelp from './pages/ResumeHelp';
import InterviewTips from './pages/InterviewTips';
import SalaryGuide from './pages/SalaryGuide';
import Resources from './pages/Resources';
import Support from './pages/Support';
import Blog from './pages/Blog';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/career-tips" element={<CareerTips />} />
        <Route path="/resume-help" element={<ResumeHelp />} />
        <Route path="/interview-tips" element={<InterviewTips />} />
        <Route path="/salary-guide" element={<SalaryGuide />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/support" element={<Support />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Applicant Routes */}
        <Route path="/applicant/dashboard" element={
          <ProtectedRoute allowedRoles={['applicant']}>
            <ApplicantDashboard />
          </ProtectedRoute>
        } />
        <Route path="/applicant/applications" element={
          <ProtectedRoute allowedRoles={['applicant']}>
            <MyApplications />
          </ProtectedRoute>
        } />

        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/jobs" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <ManageJobs />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/jobs/post" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <PostJob />
          </ProtectedRoute>
        } />
        <Route path="/recruiter/applications/:jobId" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <ApplicationDetails />
          </ProtectedRoute>
        } />

        {/* Redirect logged-in users from login/register to dashboard */}
        <Route path="/login" element={
          token && user ? (
            <Navigate to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/applicant/dashboard'} />
          ) : (
            <Login />
          )
        } />
        <Route path="/register" element={
          token && user ? (
            <Navigate to={user.role === 'recruiter' ? '/recruiter/dashboard' : '/applicant/dashboard'} />
          ) : (
            <Register />
          )
        } />

        {/* Catch all - 404 redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;