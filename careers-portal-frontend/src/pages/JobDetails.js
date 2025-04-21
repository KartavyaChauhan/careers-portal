import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, LinkIcon } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', resumeLink: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs`)
      .then(res => {
        const found = res.data.find(j => j._id === id);
        setJob(found);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {
      applicantName: form.name,
      applicantEmail: form.email,
      resumeLink: form.resumeLink,
    });
    alert("Application submitted!");
    setForm({ name: '', email: '', resumeLink: '' });
  };

  if (!job) return <div className="text-center text-gray-500 py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl mt-10">
      {/* Job Info */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-indigo-600 flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          {job.title}
        </h2>
        <p className="text-gray-600 mt-2">{job.description}</p>
        <div className="mt-4 text-gray-500 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location || "Remote"}
          </span>
        </div>
      </div>

      {/* Application Form */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Apply Now</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-400"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-400"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium flex items-center gap-1">
              Resume Link <LinkIcon className="h-4 w-4" />
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-400"
              placeholder="https://your-resume.com"
              value={form.resumeLink}
              onChange={(e) => setForm({ ...form, resumeLink: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
