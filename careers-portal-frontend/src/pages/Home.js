import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16 px-6 text-center shadow">
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-xl">Explore opportunities tailored for you</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">Latest Job Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No job listings found.</p>
          ) : (
            jobs.map(job => (
              <Link
                key={job._id}
                to={`/job/${job._id}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="text-indigo-500 w-6 h-6" />
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-1">{job.location || 'Location not specified'}</p>
                <p className="text-gray-500 text-sm mb-4">
                  {job.description?.slice(0, 100) || 'No description'}...
                </p>
                <span className="inline-block mt-auto text-indigo-600 hover:underline text-sm">
                  View Details →
                </span>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2025 CareerPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
