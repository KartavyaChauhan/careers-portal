import React from 'react';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "We're looking for a talented software engineer to join our team."
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      description: "Lead product development and strategy for our core platform."
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      description: "Create beautiful and intuitive user experiences for our clients."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="p-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <a href="/" className="text-purple-600 text-lg font-semibold hover:text-purple-800 transition-colors">
            CareerPortal
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Jobs</h1>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map(job => (
            <div 
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h2>
              <div className="text-gray-600 mb-4">
                <p className="mb-1">{job.company} • {job.location}</p>
                <p className="text-sm">{job.type}</p>
              </div>
              <p className="text-gray-600 mb-4">
                {job.description}
              </p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 py-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-gray-500 text-center">
            © 2024 CareerPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Jobs; 