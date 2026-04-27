import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, CheckCircle2 } from 'lucide-react';
import logoImage from '../assets/image.png';
import './Onboarding.css';

const LogoHeader = () => (
  <div className="onboarding-header">
    <div className="onboarding-logo">
      <img src={logoImage} alt="PlaceWise Logo" width="32" height="32" style={{ objectFit: 'contain' }} />
      <span>PlaceWise</span>
    </div>
    <button className="menu-btn">
      <Menu size={24} color="#1F2937" />
    </button>
  </div>
);

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('fresher');
  const [target, setTarget] = useState('service');
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      try {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:5001/api/users/onboarding', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({ experienceLevel: experience, targetType: target }),
        });
      } catch (err) {
        console.error("Error saving onboarding data:", err);
      }
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="onboarding-container">
      <LogoHeader />
      
      <div className="onboarding-content">
        <div className="step-indicator">Step {step}</div>
        
        {step === 1 ? (
          <>
            <h1 className="onboarding-title">Choose Your Experience Level</h1>
            <div className="cards-container">
              <div 
                className={`selection-card ${experience === 'fresher' ? 'selected' : ''}`}
                onClick={() => setExperience('fresher')}
              >
                <div className="card-image-container fresher-bg">
                  <img src="/onboarding_fresher.png" alt="Fresher" className="card-illustration" />
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h3>Fresher</h3>
                    <p>0-2 Years Experience</p>
                  </div>
                  {experience === 'fresher' && <CheckCircle2 className="check-icon" size={24} fill="white" color="#2A5FEA" />}
                </div>
              </div>

              <div 
                className={`selection-card ${experience === 'experienced' ? 'selected' : ''}`}
                onClick={() => setExperience('experienced')}
              >
                <div className="card-image-container experienced-bg">
                  <img src="/onboarding_experienced.png" alt="Experienced" className="card-illustration" />
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h3>Experienced</h3>
                    <p>2+ Years Experience</p>
                  </div>
                  {experience === 'experienced' && <CheckCircle2 className="check-icon" size={24} fill="white" color="#2A5FEA" />}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="onboarding-title">Select Job Target Type</h1>
            <div className="cards-container">
              <div 
                className={`selection-card ${target === 'service' ? 'selected' : ''}`}
                onClick={() => setTarget('service')}
              >
                <div className="card-image-container service-bg">
                  <img src="/onboarding_service.png" alt="Service Based" className="card-illustration" />
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h3>Service Based Company</h3>
                    <p>Hiring for roles across multiple domains</p>
                  </div>
                  {target === 'service' && <CheckCircle2 className="check-icon" size={24} fill="white" color="#2A5FEA" />}
                </div>
              </div>

              <div 
                className={`selection-card ${target === 'product' ? 'selected' : ''}`}
                onClick={() => setTarget('product')}
              >
                <div className="card-image-container product-bg">
                  <img src="/onboarding_product.png" alt="Product Based" className="card-illustration" />
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h3>Product Based Company</h3>
                    <p>Hiring for engineering-focused roles</p>
                  </div>
                  {target === 'product' && <CheckCircle2 className="check-icon" size={24} fill="white" color="#2A5FEA" />}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="onboarding-actions">
          <button className="btn btn-primary action-btn" onClick={handleNext}>
            {step === 1 ? 'Continue' : 'Confirm'}
          </button>
          
          {step === 1 ? (
             <button className="text-btn">Skip</button>
          ) : (
             <button className="text-btn" onClick={handleBack}>Back</button>
          )}
        </div>
      </div>
    </div>
  );
}
