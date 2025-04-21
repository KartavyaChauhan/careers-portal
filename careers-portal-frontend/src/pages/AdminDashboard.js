import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data));
  }, []);

  const fetchApplications = async (jobId) => {
    const res = await axios.get(
      `http://localhost:5000/api/jobs/${jobId}/applications`
    );
    setSelectedJobId(jobId);
    setApplications(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/applications/${id}/status`,
        { status: newStatus }
      );

      if (res.status === 200) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        toast.success("Status updated ✅");
      } else {
        toast.error("Failed to update status ❌");
      }
    } catch (err) {
      console.error(err);
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
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-2">Post a New Job</h2>
      <input
        placeholder="Title"
        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) =>
          setJobData({ ...jobData, description: e.target.value })
        }
      />
      <input
        placeholder="Requirements (comma separated)"
        onChange={(e) =>
          setJobData({ ...jobData, requirements: e.target.value })
        }
      />
      <input
        placeholder="Type (Full-Time, Internship)"
        onChange={(e) => setJobData({ ...jobData, type: e.target.value })}
      />
      <input
        placeholder="Location"
        onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
      />
      <button
        onClick={postJob}
        className="bg-green-500 text-white px-4 py-1 mt-2"
      >
        Post
      </button>

      <h3 className="mt-6 text-lg font-semibold">View Applications</h3>
      {jobs.map((job) => (
        <div key={job._id} className="mt-2">
          <span>{job.title}</span>
          <button
            onClick={() => fetchApplications(job._id)}
            className="ml-2 bg-blue-400 px-2 text-white"
          >
            View
          </button>
        </div>
      ))}

      {selectedJobId && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">Applications</h4>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1 mr-2"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="default">Sort by...</option>
            <option value="status">Status</option>
            <option value="name">Name</option>
          </select>

          {displayedApps.map((app) => (
            <li key={app._id} className="border p-2 my-1">
              <p>
                <strong>{app.applicantName}</strong> ({app.applicantEmail})
              </p>
              <p>
                Resume:{" "}
                <a href={app.resumeLink} target="_blank" rel="noreferrer">
                  View
                </a>
              </p>

              <div className="my-2">
                <label>Status: </label>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app._id, e.target.value)}
                  className="border px-2 py-1"
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
              >
                <input
                  type="datetime-local"
                  name="date"
                  required
                  disabled={app.status === "Rejected"}
                />
                <input
                  type="url"
                  name="link"
                  placeholder="Interview Link"
                  required
                  disabled={app.status === "Rejected"}
                />
                <button
                  type="submit"
                  className="bg-yellow-400 px-2 ml-2"
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
              >
                <input
                  type="text"
                  name="feedback"
                  placeholder="Feedback"
                  required
                  disabled={app.status === "Rejected"}
                />
                <button
                  type="submit"
                  className="bg-purple-400 px-2 ml-2"
                  disabled={app.status === "Rejected"}
                >
                  Submit
                </button>
              </form>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
