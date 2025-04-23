import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)' }}
    transition={{ duration: 0.3 }}
    className="job-card"
  >
    <Link to={`/job/${job._id}`} className="job-card-link">
      <div className="job-card-header">
        <div className="job-card-info">
          <div className="job-icon-container">
            <Briefcase className="job-icon" />
          </div>
          <div>
            <h3 className="job-title">{job.title}</h3>
            <p className="job-company">{job.company || 'Company Name'}</p>
          </div>
        </div>
        <span className="job-type">{job.type || 'Full-time'}</span>
      </div>
      
      <p className="job-description">{job.description}</p>
      
      <div className="job-footer">
        <div className="job-meta">
          <span className="job-meta-item">
            <Building2 className="meta-icon" />
            {job.company || 'Company Name'}
          </span>
          <span className="job-meta-item">
            <MapPin className="meta-icon" />
            {job.location || 'Remote'}
          </span>
        </div>
        <span className="job-details-link">
          View Details →
        </span>
      </div>
    </Link>
  </motion.div>
);

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #312e81); /* Deep space to neon gradient */
          color: #ffffff;
          overflow: hidden;
        }

        /* Navigation */
        .nav {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.5rem 0;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(49, 46, 129, 0.3);
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: center;
        }

        .nav-logo {
          color: #38bdf8;
          font-size: 2rem;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .nav-logo:hover {
          color: #22d3ee;
          text-shadow: 0 0 10px #22d3ee, 0 0 20px #38bdf8;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(90deg, #1e40af, #3b82f6);
          padding: 6rem 1rem;
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
          animation: slideUp 1.5s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: #ffffff;
          text-shadow: 0 0 10px #3b82f6;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #bfdbfe;
          max-width: 700px;
          margin: 0 auto 2.5rem;
          font-weight: 500;
        }

        /* Job Listings */
        .jobs-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 1rem;
          margin-top: -4rem;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          perspective: 1000px;
        }

        .job-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          overflow: hidden;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(191, 219, 254, 0.2);
        }

        .job-card-link {
          display: block;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .job-card-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .job-icon-container {
          background: rgba(56, 189, 248, 0.1);
          padding: 0.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .job-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #38bdf8;
        }

        .job-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .job-card:hover .job-title {
          color: #22d3ee;
        }

        .job-company {
          font-size: 1rem;
          color: #bfdbfe;
        }

        .job-type {
          font-size: 0.875rem;
          font-weight: 600;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 0.25rem 1rem;
          border-radius: 9999px;
        }

        .job-description {
          font-size: 1rem;
          color: #a3bffa;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .job-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          color: #a3bffa;
        }

        .job-meta {
          display: flex;
          gap: 1.5rem;
        }

        .job-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: #bfdbfe;
        }

        .job-details-link {
          color: #22d3ee;
          font-weight: 600;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .job-card:hover .job-details-link {
          color: #3b82f6;
          transform: translateX(6px);
        }

        .loading {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 0;
          color: #a3bffa;
          font-size: 1.25rem;
          font-weight: 500;
        }

        /* Footer */
        .footer {
          padding: 2.5rem 0;
          background: rgba(15, 23, 42, 0.9);
          border-top: 1px solid rgba(191, 219, 254, 0.2);
          width: 100%;
          text-align: center;
          animation: fadeIn 1.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-text {
          color: #bfdbfe;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .jobs-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.25rem;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="home-container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              CareerPortal
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero">
          <div className="hero-container">
            <h1 className="hero-title">Latest Opportunities</h1>
            <p className="hero-subtitle">{jobs.length} jobs available</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="jobs-container">
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="loading">Loading jobs...</div>
            ) : (
              jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">
              © 2025 CareerPortal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;