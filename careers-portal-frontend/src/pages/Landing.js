import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e1e2f, #2c2c54, #4a00e0); /* Futuristic gradient */
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }

        /* Navigation */
        .nav {
          background: rgba(30, 30, 47, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.5rem 0;
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 255, 0.2);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: center;
        }

        .nav-logo {
          color: #00d4ff;
          font-size: 2rem;
          font-weight: 800;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .nav-logo:hover {
          color: #00ffcc;
          text-shadow: 0 0 10px #00ffcc, 0 0 20px #00d4ff;
        }

        /* Main Content */
        .main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Hero Section */
        .hero {
          margin-bottom: 5rem;
          text-align: center;
          animation: fadeIn 2s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          color: #00d4ff;
          line-height: 1.1;
          margin-bottom: 1rem;
          text-shadow: 0 0 15px #00d4ff, 0 0 30px #4a00e0;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: #a3bffa;
          max-width: 700px;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e1e2f;
          background: linear-gradient(90deg, #00d4ff, #00ffcc);
          padding: 1rem 2rem;
          border-radius: 50px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid #00ffcc;
        }

        .hero-cta:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 212, 255, 0.5);
        }

        .cta-arrow {
          margin-left: 0.75rem;
          width: 1.2rem;
          height: 1.2rem;
          transition: transform 0.3s ease;
        }

        .hero-cta:hover .cta-arrow {
          transform: translateX(6px);
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          width: 100%;
          max-width: 1200px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0, 212, 255, 0.2);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(163, 191, 250, 0.3);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 212, 255, 0.4);
        }

        .feature-image-container {
          overflow: hidden;
          position: relative;
        }

        .feature-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: brightness(1.1);
        }

        .feature-card:hover .feature-image {
          transform: scale(1.1);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #00d4ff;
          margin: 1.5rem 1.5rem 1rem;
          transition: color 0.3s ease;
        }

        .feature-card:hover .feature-title {
          color: #00ffcc;
          text-shadow: 0 0 5px #00ffcc;
        }

        .feature-description {
          font-size: 1.1rem;
          color: #a3bffa;
          margin: 0 1.5rem 1.5rem;
          line-height: 1.6;
        }

        /* Footer */
        .footer {
          padding: 2.5rem 0;
          background: rgba(30, 30, 47, 0.9);
          border-top: 1px solid rgba(163, 191, 250, 0.2);
          width: 100%;
          text-align: center;
          animation: fadeIn 2s ease-in-out 1s backwards;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .footer-text {
          color: #a3bffa;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.25rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="landing-container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              Career Portal
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="main-container">
          {/* Hero Section */}
          <div className="hero">
            <h1 className="hero-title">
              Launch Your
              <br />
              Career Today
            </h1>
            <p className="hero-subtitle">
              Discover the best opportunities in the tech industry
            </p>
            <Link to="/home" className="hero-cta">
              Explore Job Listings
              <svg
                className="cta-arrow"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Features */}
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-image-container">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=60"
                  alt="Modern office space"
                  className="feature-image"
                />
              </div>
              <h2 className="feature-title">Cutting-Edge Companies</h2>
              <p className="feature-description">
                Connect with leading tech companies driving innovation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-image-container">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60"
                  alt="Person using modern technology"
                  className="feature-image"
                />
              </div>
              <h2 className="feature-title">Innovative Projects</h2>
              <p className="feature-description">
                Work on groundbreaking projects with latest technologies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-image-container">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop&q=60"
                  alt="Team collaborating"
                  className="feature-image"
                />
              </div>
              <h2 className="feature-title">Collaborative Environment</h2>
              <p className="feature-description">
                Join a team of talented and forward-thinking professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">
              © 2025 Career Portal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;