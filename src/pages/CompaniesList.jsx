import React from 'react';
import { Menu, Check } from 'lucide-react';
import './CompaniesList.css';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="url(#paint0_linear_logo)"/>
    <path d="M30 65V35C30 32.2386 32.2386 30 35 30H55C60.5228 30 65 34.4772 65 40C65 45.5228 60.5228 50 55 50H40V65H30Z" fill="white"/>
    <path d="M45 70L65 50L75 60L55 80L45 70Z" fill="white" fillOpacity="0.8"/>
    <path d="M60 40L80 20L75 15L55 35L60 40Z" fill="white" fillOpacity="0.9"/>
    <path d="M70 20H80V30L70 20Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_logo" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2A5FEA"/>
        <stop offset="1" stopColor="#38C77B"/>
      </linearGradient>
    </defs>
  </svg>
);

const CompanyItem = ({ logo, name, jobs, selected }) => (
  <div className="company-list-item">
    <div className="company-list-info">
      <div className={`company-list-logo ${logo.toLowerCase()}`}>
         {name === 'TCS' ? <span className="tcs-logo-text">tcs</span> : 
          name === 'Apple' ? <span className="apple-logo-icon"></span> : 
          name === 'Google' ? <span className="google-logo-icon">G</span> : name}
      </div>
      <div>
        <h4>{name}</h4>
        <p>{jobs} Open Jobs</p>
      </div>
    </div>
    {selected && (
      <div className="check-circle">
        <Check size={14} color="#6B7280" />
      </div>
    )}
  </div>
);

export default function CompaniesList() {
  const serviceCompanies = [
    { name: 'Infosys', jobs: 48, selected: false },
    { name: 'TCS', jobs: 54, selected: true },
    { name: 'Wipro', jobs: 45, selected: true },
    { name: 'HCL Technologies', jobs: 39, selected: true },
    { name: 'Accenture', jobs: 42, selected: true },
  ];

  const productCompanies = [
    { name: 'Google', jobs: 52, selected: false },
    { name: 'Microsoft', jobs: 47, selected: true },
    { name: 'Apple', jobs: 41, selected: true },
    { name: 'Adobe', jobs: 37, selected: true },
    { name: 'IBM', jobs: 44, selected: true },
  ];

  return (
    <div className="companies-list-page">
      <div className="mobile-mockup">
        <div className="app-header">
          <div className="app-logo">
            <Logo />
            <span>PlaceWise</span>
          </div>
          <Menu size={24} color="#6B7280" />
        </div>

        <div className="company-type-header">
          <h2>Service Based Companies</h2>
          <p>Placement preparation and job postings for top IT services firms.</p>
        </div>

        <div className="hero-graphic service-hero">
          <div className="abstract-shapes"></div>
        </div>

        <div className="companies-scroll-list">
          {serviceCompanies.map(c => (
            <CompanyItem key={c.name} logo={c.name} name={c.name} jobs={c.jobs} selected={c.selected} />
          ))}
        </div>

        <div className="action-footer">
          <button className="btn btn-primary full-width explore-btn service-btn">
            Explore Service Jobs &gt;
          </button>
          <button className="btn-text">Skip</button>
        </div>
      </div>

      <div className="mobile-mockup">
        <div className="app-header">
          <div className="app-logo">
            <Logo />
            <span>PlaceWise</span>
          </div>
          <Menu size={24} color="#6B7280" />
        </div>

        <div className="company-type-header">
          <h2>Product Based Companies</h2>
          <p>Placement preparation and job postings for leading tech giants.</p>
        </div>

        <div className="hero-graphic product-hero">
          <div className="abstract-shapes"></div>
        </div>

        <div className="companies-scroll-list">
          {productCompanies.map(c => (
            <CompanyItem key={c.name} logo={c.name} name={c.name} jobs={c.jobs} selected={c.selected} />
          ))}
        </div>

        <div className="action-footer">
          <button className="btn btn-primary full-width explore-btn product-btn">
            Explore Product Jobs &gt;
          </button>
          <button className="btn-text">Back</button>
        </div>
      </div>
    </div>
  );
}
