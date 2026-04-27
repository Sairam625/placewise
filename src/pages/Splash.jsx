import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/image.png';
import './Splash.css';

const Logo = () => (
  <img src={logoImage} alt="PlaceWise Logo" width="80" height="80" style={{ objectFit: 'contain' }} />
);

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time, then redirect to login
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo-container">
          <Logo />
          <h1 className="brand-title">PlaceWise</h1>
          <p className="brand-subtitle">Track. Prepare. Get Placed.</p>
        </div>

        <div className="illustration-container">
          <img src="/splash-illustration.png" alt="Preparation Illustration" className="illustration" />
        </div>

        <div className="loading-container">
          <p className="loading-text">Preparing your success journey...</p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-percentage">85%</span>
          </div>
          <p className="loading-subtext">Loading awesome opportunities...</p>
        </div>
      </div>
    </div>
  );
}
