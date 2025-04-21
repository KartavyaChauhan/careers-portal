// src/pages/Landing.js
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Launch Your Career Today</h1>
          <p className="text-xl mb-8">Find internships, jobs, and career resources — all in one place.</p>
          <Link to="/home">
            <button className="bg-white text-indigo-700 px-6 py-3 font-semibold rounded-lg shadow hover:bg-indigo-100 transition">
              Explore Job Listings
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-indigo-800">Why Choose CareerPortal?</h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="text-indigo-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">Real Job Opportunities</h3>
              </div>
              <p className="text-gray-600">Browse hand-picked roles from top employers and startups tailored to students and fresh grads.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-indigo-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">Resume & Interview Help</h3>
              </div>
              <p className="text-gray-600">Get tips to improve your resume, and prepare confidently for interviews with curated resources.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-indigo-600 w-6 h-6" />
                <h3 className="text-xl font-semibold">Admin & Student Friendly</h3>
              </div>
              <p className="text-gray-600">Built for both students and placement cells to manage, track and update listings easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          © 2025 CareerPortal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
