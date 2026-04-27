import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ArrowRight, FileText, Lightbulb } from 'lucide-react';
import './CompanyPrep.css';

const CompanyCard = ({ type, name, subtitle, totalRounds, rounds, colorClass }) => (
  <div className={`prep-card ${colorClass}`}>
    <div className="prep-card-header">
      <div className="prep-company-info">
        <div className={`prep-company-logo ${name.toLowerCase()}`}>
          {name === 'TCS' ? <span className="tcs-text">tcs</span> : 
           name === 'Apple' ? <span className="apple-icon"></span> : 
           name === 'Google' ? <span className="google-icon">G</span> : name}
        </div>
        <div>
          <h3>{name}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="prep-company-graphic">
        {/* Mock graphic for the right side of the header */}
        <div className="building-icon">🏢</div>
      </div>
    </div>
    
    <div className="total-rounds-badge">
      Total Rounds: {totalRounds}
    </div>

    <div className="rounds-list">
      {rounds.map((round, index) => (
        <div className="round-item" key={index}>
          <div className="round-number">{index + 1}</div>
          <div className="round-details">
            <h4>{round.title}</h4>
            <p>{round.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="practice-btn-container">
      <button className="practice-link-btn" onClick={() => window.location.href = `/company-questions/${name}`}>
        <FileText size={16} />
        <span>Practice Questions</span>
        <span className="sub">Topic-wise & Company-wise Questions</span>
        <ArrowRight size={16} className="arrow" />
      </button>
    </div>
  </div>
);

export default function CompanyPrep() {
  const serviceCompanies = [
    {
      name: 'Infosys', subtitle: 'Navigate your next', rounds: 3, colorClass: 'blue-theme',
      stages: [
        { title: 'Aptitude Test', desc: 'Quantitative, Logical Reasoning, Verbal Ability' },
        { title: 'Technical Assessment', desc: 'Core Subjects / Programming' },
        { title: 'HR Interview', desc: 'Communication, HR Questions' }
      ]
    },
    {
      name: 'TCS', subtitle: 'Building on belief', rounds: 3, colorClass: 'red-theme',
      stages: [
        { title: 'Aptitude Test', desc: 'Quantitative, Logical Reasoning, Verbal' },
        { title: 'Technical Assessment', desc: 'Coding / Technical Questions' },
        { title: 'HR Interview', desc: 'HR, Situational & Behavioral Questions' }
      ]
    },
    {
      name: 'Wipro', subtitle: 'Engineering Ambitions', rounds: 3, colorClass: 'green-theme',
      stages: [
        { title: 'Written Test', desc: 'Aptitude, Verbal & Reasoning' },
        { title: 'Technical Interview', desc: 'Core/Programming Questions' },
        { title: 'HR Interview', desc: 'Personal & Behavioral Questions' }
      ]
    },
    {
      name: 'HCL', subtitle: 'Supercharging Progress', rounds: 3, colorClass: 'blue-theme',
      stages: [
        { title: 'Aptitude Test', desc: 'Quantitative, Logical, Verbal Ability' },
        { title: 'Technical Interview', desc: 'Technical / Coding Questions' },
        { title: 'HR Interview', desc: 'HR & Behavioral Questions' }
      ]
    },
    {
      name: 'Accenture', subtitle: 'Let there be change', rounds: 3, colorClass: 'purple-theme',
      stages: [
        { title: 'Cognitive Assessment', desc: 'Aptitude, Reasoning, English' },
        { title: 'Technical Interview', desc: 'Technical / Coding Questions' },
        { title: 'HR Interview', desc: 'HR, Caselet & Behavioral Questions' }
      ]
    }
  ];

  const productCompanies = [
    {
      name: 'Google', subtitle: "Don't be evil", rounds: 4, colorClass: 'green-theme',
      stages: [
        { title: 'Online Assessment', desc: 'Coding, Aptitude, Reasoning' },
        { title: 'Technical Screen', desc: 'DSA / Coding Problems' },
        { title: 'Onsite Interviews', desc: 'Multiple Technical Rounds' },
        { title: 'HR Interview', desc: 'Culture Fit & Behavioral' }
      ]
    },
    {
      name: 'Microsoft', subtitle: 'Empower every person', rounds: 4, colorClass: 'orange-theme',
      stages: [
        { title: 'Online Assessment', desc: 'Coding, Aptitude, Logical Reasoning' },
        { title: 'Technical Screen', desc: 'DSA / Coding Questions' },
        { title: 'Onsite Interviews', desc: 'Technical + System Design' },
        { title: 'HR Interview', desc: 'Behavioral & Leadership Fit' }
      ]
    },
    {
      name: 'Apple', subtitle: 'Think different', rounds: 4, colorClass: 'gray-theme',
      stages: [
        { title: 'Online Assessment', desc: 'Aptitude, Coding' },
        { title: 'Technical Interview 1', desc: 'DSA / Coding Problems' },
        { title: 'Technical Interview 2', desc: 'System Design / Deep Dive' },
        { title: 'HR Interview', desc: 'Culture Fit & Behavioral' }
      ]
    },
    {
      name: 'Adobe', subtitle: 'Creativity for all', rounds: 4, colorClass: 'red-theme',
      stages: [
        { title: 'Online Assessment', desc: 'Coding, Aptitude, Logical' },
        { title: 'Technical Interview 1', desc: 'DSA / Coding Questions' },
        { title: 'Technical Interview 2', desc: 'System Design / Case Study' },
        { title: 'HR Interview', desc: 'Behavioral & Culture Fit' }
      ]
    },
    {
      name: 'IBM', subtitle: "Let's create", rounds: 4, colorClass: 'blue-theme',
      stages: [
        { title: 'Online Assessment', desc: 'Aptitude, Coding, Reasoning' },
        { title: 'Technical Interview 1', desc: 'DSA / Coding Questions' },
        { title: 'Technical Interview 2', desc: 'Advanced Technical / Design' },
        { title: 'HR Interview', desc: 'Behavioral & Organizational Fit' }
      ]
    }
  ];

  return (
    <div className="dashboard-layout">
      <div className="desktop-sidebar">
        <Sidebar />
      </div>
      
      <div className="dashboard-main admin-main" style={{padding:0}}>
        <div className="company-prep-page">
          <div className="prep-section">
        <div className="section-title">
          <div className="title-icon purple-bg"><Building2 /></div>
          <div>
            <h2>SERVICE-BASED COMPANIES</h2>
            <p>Preparation paths, rounds and practice questions for top service-based companies</p>
          </div>
        </div>
        
        <div className="prep-grid">
          {serviceCompanies.map(c => (
            <CompanyCard key={c.name} {...c} rounds={c.stages} totalRounds={c.rounds} />
          ))}
        </div>
      </div>

      <div className="prep-section mt-4">
        <div className="section-title">
          <div className="title-icon green-bg">&lt;/&gt;</div>
          <div>
            <h2>PRODUCT-BASED COMPANIES</h2>
            <p>Preparation paths, rounds and practice questions for top product-based companies</p>
          </div>
        </div>
        
        <div className="prep-grid">
          {productCompanies.map(c => (
            <CompanyCard key={c.name} {...c} rounds={c.stages} totalRounds={c.rounds} />
          ))}
        </div>
      </div>

      <div className="practice-banner">
        <div className="banner-content">
          <div className="bulb-icon"><Lightbulb size={32} color="#F59E0B" /></div>
          <div>
            <h3>Practice makes perfect!</h3>
            <p>Solve topic-wise and company-wise practice questions to strengthen your preparation and boost your confidence.</p>
          </div>
        </div>
        <button className="btn btn-primary explore-practice-btn">
          Explore Practice Questions <ArrowRight size={16} />
        </button>
      </div>
    </div>
      </div>
    </div>
  );
}

// Inline component for the building icon since we aren't importing it properly above
const Building2 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);
