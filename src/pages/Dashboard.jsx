import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, ChevronDown, Calendar, Send, Trophy, ClipboardCheck, ArrowRight, Menu, Users, LogOut, Code2, TrendingUp, Award, BrainCircuit, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [topCompanies, setTopCompanies] = useState([]);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/companies')
      .then(res => res.json())
      .then(data => setTopCompanies(data.slice(0, 7))) // Get top 7
      .catch(err => console.error("Error fetching companies", err));

    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5001/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching user", err));
    }
  }, []);
  return (
    <div className="dashboard-layout">
      <div className="desktop-sidebar">
        <Sidebar />
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="mobile-menu-btn">
            <Menu size={24} color="#1F2937" />
          </div>
          
          <div className="header-actions">
            <div className="notification-btn">
              <Bell size={20} color="#1F2937" />
            </div>
            
            <div className="user-profile" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowDropdown(!showDropdown)}>
              <div className="user-info">
                <span className="user-name">{user?.name || "Loading..."}</span>
              </div>
              <ChevronDown size={16} color="#6B7280" />
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  minWidth: '150px',
                  zIndex: 1000
                }}>
                  <div 
                    onClick={handleLogout}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#DC2626',
                      fontWeight: '500',
                      borderBottom: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={16} />
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="welcome-section">
            <h1>Good Morning, {user?.name ? user.name.split(' ')[0] : '...'}! 👋</h1>
            <p>Let's make today a step closer to your dream job.</p>
          </div>

          <div className="hero-banner">
            <div className="hero-content">
              <span className="hero-subtitle">Your Placement Journey</span>
              <h2>Keep Learning.<br/><span className="text-highlight">Keep Growing.</span></h2>
              <p>Consistency today, success tomorrow.</p>
              <button className="btn hero-btn" onClick={() => navigate('/companies-prep')}>
                Continue Learning <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="hero-graphics">
              <div className="readiness-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="72, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">72%</text>
                </svg>
                <span className="readiness-label">Placement Readiness</span>
              </div>
              <div className="rocket-illustration">
                🚀
              </div>
            </div>
          </div>

          <div className="companies-section section-card" style={{ marginBottom: '2rem' }}>
            <div className="section-header">
               <h3>Top Companies Hiring Now</h3>
               <a href="/companies-prep" className="view-all">View All Companies</a>
            </div>
            <div className="companies-row" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
               {topCompanies.length > 0 ? (
                 topCompanies.map(company => (
                   <div 
                     key={company._id} 
                     className="company-pill"
                     style={{ cursor: 'pointer' }}
                     onClick={() => navigate(`/company-questions/${company.name}`)}
                   >
                     {company.name}
                   </div>
                 ))
               ) : (
                 <div className="company-pill">No companies available</div>
               )}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper blue">
                <Code2 size={24} color="#2A5FEA" />
              </div>
              <div className="stat-info">
                <span className="stat-label">Questions Solved</span>
                <span className="stat-value">142</span>
                <span className="stat-subtext">Top 10% this week</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon-wrapper green">
                <ClipboardCheck size={24} color="#38C77B" />
              </div>
              <div className="stat-info">
                <span className="stat-label">Tests Attempted</span>
                <span className="stat-value">12</span>
                <span className="stat-subtext text-green">Avg Score: 82%</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper purple">
                <TrendingUp size={24} color="#9333EA" />
              </div>
              <div className="stat-info">
                <span className="stat-label">Current Streak</span>
                <span className="stat-value">5 Days</span>
                <span className="stat-subtext text-purple">Keep it going! 🔥</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper orange">
                <Award size={24} color="#EA580C" />
              </div>
              <div className="stat-info">
                <span className="stat-label">Accuracy Rate</span>
                <span className="stat-value">85%</span>
                <span className="stat-subtext text-orange">+2% from last week</span>
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="schedule-section section-card">
              <div className="section-header">
                <h3>Continue Practicing</h3>
                <a href="/prep/coding" className="view-all">All Topics</a>
              </div>
              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="company-logo generic-blue" style={{display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px'}}><BrainCircuit size={20} color="white" /></div>
                  <div className="schedule-details">
                    <h4>Aptitude: Time & Work</h4>
                    <p>Last practiced: Today</p>
                  </div>
                  <span className="badge badge-blue">Resume</span>
                </div>
                <div className="schedule-item">
                  <div className="company-logo generic-green" style={{display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px'}}><Code2 size={20} color="white" /></div>
                  <div className="schedule-details">
                    <h4>Coding: Arrays & Strings</h4>
                    <p>Last practiced: Yesterday</p>
                  </div>
                  <span className="badge badge-green">Resume</span>
                </div>
                <div className="schedule-item">
                  <div className="company-logo generic-purple" style={{display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', backgroundColor: '#9333EA'}}><Lightbulb size={20} color="white" /></div>
                  <div className="schedule-details">
                    <h4>Logical: Blood Relations</h4>
                    <p>Last practiced: 2 days ago</p>
                  </div>
                  <span className="badge badge-purple">Resume</span>
                </div>
              </div>
              <button className="btn btn-outline full-width mt-3">
                <Code2 size={16} className="mr-2"/> View All Subjects
              </button>
            </div>

            <div className="recommendations-section section-card">
              <div className="section-header">
                <h3>Recommended for You</h3>
                <a href="#" className="view-all">View All</a>
              </div>
              <div className="recommendations-list">
                <div className="recommendation-item">
                  <div className="rec-icon rec-green">+-×÷</div>
                  <div className="rec-details">
                    <h4>Aptitude - Profit & Loss</h4>
                    <p>75% Completed</p>
                    <div className="mini-progress"><div className="fill fill-green" style={{width: '75%'}}></div></div>
                  </div>
                  <ChevronDown size={16} className="rotate-270" color="#9CA3AF" />
                </div>
                <div className="recommendation-item">
                  <div className="rec-icon rec-blue">&lt;/&gt;</div>
                  <div className="rec-details">
                    <h4>Data Structures in C++</h4>
                    <p>60% Completed</p>
                    <div className="mini-progress"><div className="fill fill-blue" style={{width: '60%'}}></div></div>
                  </div>
                  <ChevronDown size={16} className="rotate-270" color="#9CA3AF" />
                </div>
                <div className="recommendation-item">
                  <div className="rec-icon rec-purple"><Users size={16}/></div>
                  <div className="rec-details">
                    <h4>HR Interview Questions</h4>
                    <p>45% Completed</p>
                    <div className="mini-progress"><div className="fill fill-purple" style={{width: '45%'}}></div></div>
                  </div>
                  <ChevronDown size={16} className="rotate-270" color="#9CA3AF" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
