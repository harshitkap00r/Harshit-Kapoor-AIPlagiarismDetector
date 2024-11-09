import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, ArrowLeft, AlertCircle } from 'lucide-react';
import './UploadPage.css';

// Simulated AI plagiarism detection function
const detectPlagiarism = async (file) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock result
  return {
    percentage: Math.random() * 100,
    flaggedSections: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ]
  };
};

function UploadPage() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    try {
      const plagiarismResult = await detectPlagiarism(file);
      setResult(plagiarismResult);
    } catch (error) {
      console.error('Error detecting plagiarism:', error);
      setError("An error occurred while analyzing the document. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="upload-page">
      <header className="upload-header">
        <Link className="upload-logo" to="/">
          <FileSearch className="upload-logo-icon" />
          <span>AI Plagiarism Detector</span>
        </Link>
      </header>
      <main className="upload-main">
        <Link to="/" className="back-link">
          <ArrowLeft className="back-icon" />
          Back to Home
        </Link>
        <h1 className="upload-title">Upload Document for Plagiarism Check</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            {file && <p className="file-name">Selected file: {file.name}</p>}
          </div>
          <button type="submit" disabled={!file || isAnalyzing} className="submit-button">
            {isAnalyzing ? 'Analyzing...' : 'Check for Plagiarism'}
          </button>
        </form>
        {error && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}
        {isAnalyzing && (
          <div className="analyzing-section">
            <p className="analyzing-text">Analyzing document...</p>
            <div className="progress-bar">
              <div className="progress-indicator" style={{ width: '66%' }} />
            </div>
          </div>
        )}
        {result && (
          <div className="results-container">
            <h2 className="results-title">Plagiarism Detection Results</h2>
            <p className="plagiarism-percentage">
              Plagiarism Percentage: <span className="percentage-value">{result.percentage.toFixed(2)}%</span>
            </p>
            <h3 className="flagged-sections-title">Flagged Sections:</h3>
            <ul className="flagged-sections-list">
              {result.flaggedSections.map((section, index) => (
                <li key={index}>{section}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="upload-footer">
        <p className="footer-text">© 2024 AI Plagiarism Detector. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UploadPage;