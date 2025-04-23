import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, LinkIcon, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', resumeLink: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => {
        const found = res.data.find(j => j._id === id);
        setJob(found);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {
        applicantName: form.name,
        applicantEmail: form.email,
        resumeLink: form.resumeLink,
      });
      alert("Application submitted!");
      setForm({ name: '', email: '', resumeLink: '' });
    } catch (err) {
      console.error(err);
      alert("Error submitting application. Please try again.");
    }
  };

  if (!job) return <div className="loading-text">Loading...</div>;

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .job-details-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #312e81); /* Futuristic gradient */
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

        /* Main Content */
        .main-container {
          max-width: 896px;
          margin: 0 auto;
          padding: 4rem 2rem;
          animation: fadeIn 1.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Back Button */
        .back-link {
          display: inline-flex;
          align-items: center;
          color: #22d3ee;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          margin-bottom: 2.5rem;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .back-link:hover {
          color: #3b82f6;
          transform: translateX(-5px);
        }

        .back-icon {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.5rem;
          transition: transform 0.3s ease;
        }

        .back-link:hover .back-icon {
          transform: rotate(-10deg);
        }

        /* Job Details Section */
        .job-details-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          padding: 2.5rem;
          margin-bottom: 2.5rem;
          border: 1px solid rgba(191, 219, 254, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .job-details-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(56, 189, 248, 0.4);
        }

        .job-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #38bdf8;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #38bdf8;
        }

        .job-icon {
          width: 1.8rem;
          height: 1.8rem;
          color: #22d3ee;
        }

        .job-description {
          font-size: 1.1rem;
          color: #a3bffa;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .job-meta {
          display: flex;
          gap: 1.5rem;
          color: #bfdbfe;
          font-size: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: #bfdbfe;
        }

        /* Application Form */
        .application-form-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          padding: 2.5rem;
          border: 1px solid rgba(191, 219, 254, 0.2);
          animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
          text-shadow: 0 0 5px #38bdf8;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .link-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: #22d3ee;
        }

        .form-input {
          padding: 1rem;
          border: 2px solid rgba(191, 219, 254, 0.3);
          border-radius: 10px;
          font-size: 1.1rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #22d3ee;
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.2);
        }

        .form-input::placeholder {
          color: #a3bffa;
        }

        .submit-button {
          background: linear-gradient(90deg, #3b82f6, #22d3ee);
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 700;
          padding: 1rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(34, 211, 238, 0.4);
        }

        /* Loading State */
        .loading-text {
          font-size: 1.5rem;
          color: #a3bffa;
          text-align: center;
          padding: 3rem;
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
        @media (max-width: 768px) {
          .job-title {
            font-size: 1.8rem;
          }

          .main-container {
            padding: 2rem 1rem;
          }

          .job-meta {
            flex-direction: column;
            gap: 0.75rem;
          }

          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <div className="job-details-container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              CareerPortal
            </Link>
          </div>
        </nav>

        <div className="main-container">
          {/* Back Button */}
          <Link to="/" className="back-link">
            <ArrowLeft className="back-icon" />
            Back to Jobs
          </Link>

          {/* Job Details */}
          <motion.div className="job-details-card" whileHover={{ scale: 1.01 }}>
            <h2 className="job-title">
              <Briefcase className="job-icon" />
              {job.title}
            </h2>
            <p className="job-description">{job.description}</p>
            <div className="job-meta">
              <span className="meta-item">
                <MapPin className="meta-icon" />
                {job.location || "Remote"}
              </span>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div className="application-form-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <h3 className="form-title">Apply Now</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Resume Link
                  <LinkIcon className="link-icon" />
                </label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://your-resume.com"
                  value={form.resumeLink}
                  onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit Application
              </button>
            </form>
          </motion.div>
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

export default JobDetails;