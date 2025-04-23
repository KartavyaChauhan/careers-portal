import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password,
      });

      localStorage.setItem('adminToken', res.data.token);
      toast.success('Logged in successfully!');
      setTimeout(() => navigate('/admin'), 1500); // Navigate after toast
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-container {
          min-height: 100vh;
          background-color: #f9fafb;
          display: flex;
          flex-direction: column;
        }

        /* Navigation (consistent with other pages) */
        .nav {
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .nav-logo {
          color: #6b46c1;
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-logo:hover {
          color: #553c9a;
        }

        /* Main Content */
        .main-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }

        .login-card {
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          transition: box-shadow 0.3s ease;
        }

        .login-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .error-message {
          font-size: 0.875rem;
          color: #c53030;
          margin-bottom: 1rem;
          text-align: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 0.5rem;
        }

        .form-input {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          color: #1a202c;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #6b46c1;
          box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
        }

        .form-input::placeholder {
          color: #a0aec0;
        }

        .submit-button {
          background: linear-gradient(90deg, #3182ce, #2b6cb0);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Footer */
        .footer {
          padding: 2rem 0;
          background: linear-gradient(180deg, #ffffff, #f1f5f9);
          border-top: 1px solid #e2e8f0;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-text {
          color: #718096;
          text-align: center;
          font-size: 0.875rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-card {
            padding: 1.5rem;
          }

          .login-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
      <div className="login-container">
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
          <div className="login-card">
            <h2 className="login-title">Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <button type="submit" className="submit-button">
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <p className="footer-text">
              © 2024 CareerPortal. All rights reserved.
            </p>
          </div>
        </footer>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;