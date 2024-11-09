import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, FileSearch, Download } from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <header className="landing-header">
        <Link className="landing-logo" to="/">
          <FileSearch className="landing-logo-icon" />
          <span>AI Plagiarism Detector</span>
        </Link>
        <nav className="landing-nav">
          <a className="landing-nav-link" href="#features">
            Features
          </a>
          <a className="landing-nav-link" href="#contact">
            Contact
          </a>
        </nav>
      </header>
      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Real-time AI-Powered Plagiarism Detection
              </h1>
              <p className="hero-description">
                Ensure academic integrity with our cutting-edge AI plagiarism detection tool. Fast, accurate, and easy to use.
              </p>
              <div>
                <Link to="/upload">
                  <button className="cta-button">
                    Upload Your Document
                    <ArrowRight style={{ marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem' }} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="features-section">
          <div className="container">
            <h2 className="features-title">Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <Zap />
                </div>
                <h3>Lightning Fast</h3>
                <p>Get results in seconds, not minutes.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle />
                </div>
                <h3>Highly Accurate</h3>
                <p>Powered by advanced AI for precise detection.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <Download />
                </div>
                <h3>Detailed Reports</h3>
                <p>Download comprehensive plagiarism reports.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">© 2024 AI Plagiarism Detector. All rights reserved.</p>
            <nav className="footer-links">
              <a className="footer-link" href="#">
                Terms of Service
              </a>
              <a className="footer-link" href="#">
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;