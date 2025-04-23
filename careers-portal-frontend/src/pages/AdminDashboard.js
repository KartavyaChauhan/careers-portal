import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    type: "",
    location: "",
  });
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [isDeleting, setIsDeleting] = useState(false);

  const postJob = async () => {
    const formattedJob = {
      ...jobData,
      requirements: jobData.requirements.split(",").map((r) => r.trim()),
    };

    try {
      await axios.post("http://localhost:5000/api/jobs", formattedJob);
      toast.success("Job posted!");
    } catch (err) {
      console.error("Error posting job:", err);
      toast.error("Failed to post job");
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? This will also delete all associated applications.')) {
      return;
    }

    setIsDeleting(true);
    try {
      console.log('Attempting to delete job with ID:', jobId);
      
      if (!jobId) {
        throw new Error('Invalid job ID');
      }

      const url = `http://localhost:5000/api/jobs/${jobId}`;
      console.log('Delete URL:', url);

      const response = await axios.delete(url);
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
        toast.success(response.data.message || "Job deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting job:", err.response || err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.status === 404 ? "Job not found" :
                          "Failed to delete job";
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  const fetchApplications = async (jobId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobs/${jobId}/applications`
      );
      console.log('Fetched applications:', res.data); // Debug log
      setSelectedJobId(jobId);
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to fetch applications");
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      console.log('Updating status for application:', applicationId, 'to:', newStatus); // Debug log
      const res = await axios.put(
        `http://localhost:5000/api/jobs/${applicationId}/status`,
        { status: newStatus }
      );

      if (res.status === 200) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        toast.success("Status updated ✅");
      } else {
        toast.error("Failed to update status ❌");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Error updating status ❌");
    }
  };

  let displayedApps = [...applications].filter((app) =>
    app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "status") {
    displayedApps.sort((a, b) => a.status.localeCompare(b.status));
  } else if (sortOption === "name") {
    displayedApps.sort((a, b) =>
      a.applicantName.localeCompare(b.applicantName)
    );
  }

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a, #1e293b, #312e81); /* Futuristic gradient */
          color: #ffffff;
          padding: 2.5rem 1.5rem;
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
          max-width: 1280px;
          margin: 0 auto;
          animation: fadeIn 1.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Job Posting Section */
        .job-post-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          padding: 2rem;
          margin-bottom: 2.5rem;
          border: 1px solid rgba(191, 219, 254, 0.2);
          animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #38bdf8;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 5px #38bdf8;
        }

        .job-form {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .form-input {
          width: 100%;
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

        .post-button {
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

        .post-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(34, 211, 238, 0.4);
        }

        /* Job Listings Section */
        .job-list-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          padding: 2rem;
          margin-bottom: 2.5rem;
          border: 1px solid rgba(191, 219, 254, 0.2);
        }

        .job-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid rgba(191, 219, 254, 0.2);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .job-item:last-child {
          border-bottom: none;
        }

        .job-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }

        .job-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          transition: color 0.3s ease;
        }

        .job-item:hover .job-title {
          color: #22d3ee;
        }

        .view-button {
          background: rgba(56, 189, 248, 0.1);
          color: #38bdf8;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .view-button:hover {
          background-color: rgba(34, 211, 238, 0.2);
          color: #22d3ee;
        }

        .job-actions {
          display: flex;
          gap: 0.75rem;
        }

        .delete-button {
          background: #f56565;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .delete-button:hover {
          background-color: #e53e3e;
          transform: translateY(-2px);
        }

        .delete-button:disabled {
          background-color: #a3bffa;
          cursor: not-allowed;
          transform: none;
        }

        /* Applications Section */
        .applications-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(56, 189, 248, 0.2);
          padding: 2rem;
          border: 1px solid rgba(191, 219, 254, 0.2);
        }

        .search-sort-container {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .search-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid rgba(191, 219, 254, 0.3);
          border-radius: 10px;
          font-size: 1.1rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #22d3ee;
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.2);
        }

        .sort-select {
          padding: 1rem;
          border: 2px solid rgba(191, 219, 254, 0.3);
          border-radius: 10px;
          font-size: 1.1rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .sort-select:focus {
          outline: none;
          border-color: #22d3ee;
        }

        .application-item {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .application-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
        }

        .applicant-info {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.75rem;
          text-shadow: 0 0 5px #38bdf8;
        }

        .applicant-email {
          font-size: 1rem;
          color: #a3bffa;
        }

        .resume-link {
          color: #22d3ee;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .resume-link:hover {
          color: #3b82f6;
          text-shadow: 0 0 10px #22d3ee;
        }

        .status-container {
          margin: 0.75rem 0;
        }

        .status-label {
          font-size: 1rem;
          color: #a3bffa;
          margin-right: 0.75rem;
        }

        .status-select {
          padding: 0.75rem;
          border: 2px solid rgba(191, 219, 254, 0.3);
          border-radius: 10px;
          font-size: 1rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .status-select:focus {
          outline: none;
          border-color: #22d3ee;
        }

        .interview-form, .feedback-form {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .form-input-sm {
          padding: 0.75rem;
          border: 2px solid rgba(191, 219, 254, 0.3);
          border-radius: 10px;
          font-size: 1rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s ease;
        }

        .form-input-sm:focus {
          outline: none;
          border-color: #22d3ee;
          box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.2);
        }

        .form-input-sm:disabled {
          background-color: rgba(163, 191, 250, 0.2);
          cursor: not-allowed;
        }

        .schedule-button {
          background: linear-gradient(90deg, #f6e05e, #ecc94b);
          color: #1e293b;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .schedule-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(246, 224, 94, 0.4);
        }

        .schedule-button:disabled {
          background: #a3bffa;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .feedback-button {
          background: linear-gradient(90deg, #6b46c1, #553c9a);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feedback-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(107, 70, 193, 0.4);
        }

        .feedback-button:disabled {
          background: #a3bffa;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
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
          .job-form {
            grid-template-columns: 1fr;
          }

          .search-sort-container {
            flex-direction: column;
          }

          .interview-form, .feedback-form {
            flex-direction: column;
          }
        }
      `}</style>
      <div className="dashboard-container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              CareerPortal
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-container">
          <ToastContainer />
          {/* Job Posting Section */}
          <motion.div className="job-post-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="section-title">Post a New Job</h2>
            <div className="job-form">
              <input
                className="form-input"
                placeholder="Title"
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              />
              <input
                className="form-input"
                placeholder="Description"
                onChange={(e) =>
                  setJobData({ ...jobData, description: e.target.value })
                }
              />
              <input
                className="form-input"
                placeholder="Requirements (comma separated)"
                onChange={(e) =>
                  setJobData({ ...jobData, requirements: e.target.value })
                }
              />
              <input
                className="form-input"
                placeholder="Type (Full-Time, Internship)"
                onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
              />
              <input
                className="form-input"
                placeholder="Location"
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
              />
              <button className="post-button" onClick={postJob}>
                Post
              </button>
            </div>
          </motion.div>

          {/* Job Listings Section */}
          <motion.div className="job-list-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="section-title">View Applications</h3>
            {jobs.map((job) => (
              <div key={job._id} className="job-item">
                <span className="job-title">{job.title}</span>
                <div className="job-actions">
                  <button
                    onClick={() => fetchApplications(job._id)}
                    className="view-button"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className="delete-button"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Applications Section */}
          {selectedJobId && (
            <motion.div className="applications-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <h4 className="section-title">Applications</h4>
              <div className="search-sort-container">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Sort by...</option>
                  <option value="status">Status</option>
                  <option value="name">Name</option>
                </select>
              </div>
              {displayedApps.map((app) => (
                <div key={app._id} className="application-item">
                  <p className="applicant-info">
                    {app.applicantName} <span className="applicant-email">({app.applicantEmail})</span>
                  </p>
                  <p>
                    Resume: <a href={app.resumeLink} target="_blank" rel="noreferrer" className="resume-link">View</a>
                  </p>
                  <div className="status-container">
                    <label className="status-label">Status: </label>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                    </select>
                  </div>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const interviewDate = e.target.date.value;
                      const interviewLink = e.target.link.value;

                      try {
                        await axios.post(
                          `http://localhost:5000/api/jobs/${app._id}/schedule`,
                          { interviewDate, interviewLink }
                        );
                        toast.success("Interview scheduled ✅");
                        e.target.reset();
                      } catch (err) {
                        toast.error("Failed to schedule interview ❌");
                      }
                    }}
                    className="interview-form"
                  >
                    <input
                      type="datetime-local"
                      name="date"
                      required
                      disabled={app.status === "Rejected"}
                      className="form-input-sm"
                    />
                    <input
                      type="url"
                      name="link"
                      placeholder="Interview Link"
                      required
                      disabled={app.status === "Rejected"}
                      className="form-input-sm"
                    />
                    <button
                      type="submit"
                      className="schedule-button"
                      disabled={app.status === "Rejected"}
                    >
                      Schedule
                    </button>
                  </form>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const feedback = e.target.feedback.value;

                      try {
                        await axios.post(
                          `http://localhost:5000/api/jobs/${app._id}/feedback`,
                          { feedback }
                        );
                        toast.success("Feedback submitted ✅");
                        e.target.reset();
                      } catch (err) {
                        toast.error("Failed to submit feedback ❌");
                      }
                    }}
                    className="feedback-form"
                  >
                    <input
                      type="text"
                      name="feedback"
                      placeholder="Feedback"
                      required
                      disabled={app.status === "Rejected"}
                      className="form-input-sm"
                    />
                    <button
                      type="submit"
                      className="feedback-button"
                      disabled={app.status === "Rejected"}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ))}
            </motion.div>
          )}
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

export default AdminDashboard;