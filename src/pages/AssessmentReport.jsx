import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Timer,
  CheckCircle2,
  XCircle,
  Target,
  ArrowRight,
  TrendingUp,
  Lightbulb
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import './AssessmentReport.css';

const DonutChart = ({ percentage, color, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="donut-chart-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="donut-bg"
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="donut-segment"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      <div className="donut-text">
        <span className="donut-value" style={{ color: color }}>{percentage}%</span>
      </div>
    </div>
  );
};

export default function AssessmentReport() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
      
      <div className="dashboard-main report-main">
        {/* Top Header */}
        <div className="report-header">
          <a href="#" className="back-link">
            <ArrowLeft size={16} /> Back to Quizzes
          </a>
          <div className="user-profile">
            <div className="fire-streak">🔥 7</div>
            <div className="user-mini-info">
              <span>Hi, {user?.name ? user.name.split(' ')[0] : 'User'} 👋</span>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="report-title-section">
          <div className="title-info">
            <div className="title-row">
              <h1>Assessment Report</h1>
              <span className="badge badge-success">Completed</span>
            </div>
            <h2>Aptitude Quiz – Number System</h2>
            <div className="quiz-meta">
              <span><Calendar size={14} /> May 20, 2024</span>
              <span><Clock size={14} /> 10:30 AM</span>
              <span><HelpCircle size={14} /> 20 Questions</span>
              <span><Timer size={14} /> 15 min</span>
            </div>
          </div>
          
          <div className="trophy-illustration">
            {/* SVG Trophy Placeholder */}
            🏆
          </div>

          <div className="title-actions">
            <button className="btn btn-outline"><FileText size={16} className="mr-2"/> Review Answers</button>
            <button className="btn btn-primary try-again-btn"><RotateCcw size={16} className="mr-2"/> Try Again</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="report-stats-grid">
          {/* Main Score Card */}
          <div className="stat-card score-card">
            <div className="score-details">
              <p className="score-label">Your Score</p>
              <h2 className="score-value">16 <span className="score-total">/ 20</span></h2>
              <div className="score-badge">🏆 Excellent! 🔥</div>
              <p className="score-desc">You scored higher than <strong>85%</strong> of PlaceWise users</p>
            </div>
            <div className="score-chart">
               <DonutChart percentage={80} color="#7C3AED" size={100} strokeWidth={8} />
               <p className="percentile-label">Percentile</p>
            </div>
          </div>

          {/* Small Stat Cards */}
          <div className="small-stats-grid">
            <div className="small-stat-card">
              <div className="stat-icon-wrap green-light"><CheckCircle2 size={20} color="#10B981"/></div>
              <p className="small-stat-label">Correct Answers</p>
              <h3>16</h3>
              <p className="stat-trend text-green">80%</p>
            </div>
            
            <div className="small-stat-card">
              <div className="stat-icon-wrap red-light"><XCircle size={20} color="#EF4444"/></div>
              <p className="small-stat-label">Incorrect Answers</p>
              <h3>4</h3>
              <p className="stat-trend text-red">20%</p>
            </div>
            
            <div className="small-stat-card">
              <div className="stat-icon-wrap orange-light"><Clock size={20} color="#F59E0B"/></div>
              <p className="small-stat-label">Time Taken</p>
              <h3>12m 45s</h3>
              <p className="stat-trend text-gray">Avg. 15m 00s</p>
            </div>
            
            <div className="small-stat-card">
              <div className="stat-icon-wrap blue-light"><Target size={20} color="#3B82F6"/></div>
              <p className="small-stat-label">Accuracy</p>
              <h3>80%</h3>
              <p className="stat-trend text-gray">Great Job! 🎯</p>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          <div className="chart-card line-chart-card">
            <div className="card-header-flex">
              <h3>Performance Overview</h3>
              <select className="dropdown-select"><option>Last 5 Assessments</option></select>
            </div>
            <div className="mock-line-chart">
              {/* CSS Mock of line chart */}
              <svg viewBox="0 0 400 150" className="line-svg">
                <polyline fill="none" stroke="#7C3AED" strokeWidth="2" points="0,120 100,70 200,60 300,40 400,20"/>
                <circle cx="0" cy="120" r="4" fill="#7C3AED" />
                <circle cx="100" cy="70" r="4" fill="#7C3AED" />
                <circle cx="200" cy="60" r="4" fill="#7C3AED" />
                <circle cx="300" cy="40" r="4" fill="#7C3AED" />
                <circle cx="400" cy="20" r="4" fill="#7C3AED" />
                <text x="0" y="145" fontSize="10" fill="#9CA3AF">Jan</text>
                <text x="100" y="145" fontSize="10" fill="#9CA3AF">Feb</text>
                <text x="200" y="145" fontSize="10" fill="#9CA3AF">Mar</text>
                <text x="300" y="145" fontSize="10" fill="#9CA3AF">Apr</text>
                <text x="400" y="145" fontSize="10" fill="#7C3AED" fontWeight="bold">May</text>
              </svg>
            </div>
            <div className="chart-footer-msg">
              <TrendingUp size={16} color="#10B981" />
              <div>
                <span className="msg-title">Great Progress!</span>
                <span className="msg-desc">You've improved by <strong className="text-green">15%</strong> compared to your last assessment.</span>
              </div>
            </div>
          </div>

          <div className="chart-card donut-breakdown-card">
            <h3>Section Wise Performance</h3>
            <div className="donut-flex">
              <DonutChart percentage={80} color="#10B981" size={140} strokeWidth={12} />
              
              <div className="legend-list">
                <div className="legend-item">
                  <div className="legend-dot bg-green"></div>
                  <span className="legend-label">Number System</span>
                  <span className="legend-score">8 / 10</span>
                  <span className="legend-percent text-green">80%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot bg-blue"></div>
                  <span className="legend-label">Averages</span>
                  <span className="legend-score">5 / 6</span>
                  <span className="legend-percent text-blue">83%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot bg-orange"></div>
                  <span className="legend-label">Percentages</span>
                  <span className="legend-score">3 / 4</span>
                  <span className="legend-percent text-orange">75%</span>
                </div>
              </div>
            </div>
            <a href="#" className="view-all-link">View all section analysis <ArrowRight size={14}/></a>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="details-row">
          <div className="details-card question-breakdown">
            <h3>Question Breakdown</h3>
            <div className="filter-tabs">
              <button className="tab active">All (20)</button>
              <button className="tab text-green">Correct (16)</button>
              <button className="tab text-red">Incorrect (4)</button>
              <button className="tab">Unattempted (0)</button>
            </div>
            
            <div className="question-bubbles">
              {[...Array(20)].map((_, i) => {
                const isIncorrect = [4, 9, 14, 16].includes(i + 1);
                return (
                  <div key={i} className={`q-bubble ${isIncorrect ? 'incorrect' : 'correct'}`}>
                    {i + 1}
                  </div>
                );
              })}
            </div>
            
            <div className="bubble-legend-footer">
              <div className="bubble-legend">
                <span><div className="dot bg-green"></div> Correct</span>
                <span><div className="dot bg-red"></div> Incorrect</span>
                <span><div className="dot bg-gray"></div> Unattempted</span>
              </div>
              <button className="btn btn-outline btn-sm">Review Answers</button>
            </div>
          </div>

          <div className="details-card topic-analysis">
            <div className="topic-columns">
              <div className="topic-col">
                <h4 className="text-green"><Target size={16}/> Strong Topics</h4>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Number System</span><span>8/10</span></div>
                  <div className="progress-bar"><div className="fill bg-green" style={{width:'80%'}}></div></div>
                </div>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Averages</span><span>5/6</span></div>
                  <div className="progress-bar"><div className="fill bg-green" style={{width:'83%'}}></div></div>
                </div>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Ratio & Proportion</span><span>3/4</span></div>
                  <div className="progress-bar"><div className="fill bg-green" style={{width:'75%'}}></div></div>
                </div>
              </div>
              
              <div className="topic-col">
                <h4 className="text-red"><TrendingUp size={16} className="rotate-180"/> Topics to Improve</h4>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Percentages</span><span>2/4</span></div>
                  <div className="progress-bar"><div className="fill bg-red" style={{width:'50%'}}></div></div>
                </div>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Profit & Loss</span><span>1/3</span></div>
                  <div className="progress-bar"><div className="fill bg-red" style={{width:'33%'}}></div></div>
                </div>
                <div className="topic-bar-item">
                  <div className="topic-info"><span>Time & Work</span><span>1/2</span></div>
                  <div className="progress-bar"><div className="fill bg-red" style={{width:'50%'}}></div></div>
                </div>
              </div>
            </div>
            <div className="tip-box">
              <Lightbulb size={16} color="#F59E0B" />
              <span><strong>Tip:</strong> Practice more on weak topics to improve your overall score!</span>
            </div>
          </div>
        </div>

        {/* Next Action Footer */}
        <div className="next-action-banner">
          <div className="banner-left">
             <div className="target-icon">🎯</div>
             <div>
               <h4>What's Next?</h4>
               <p>Keep the momentum going! Attempt more quizzes and track your progress.</p>
             </div>
          </div>
          <button className="btn btn-primary">Explore More Quizzes <ArrowRight size={16}/></button>
        </div>

      </div>
    </div>
  );
}

// Helper icons specifically for this component to avoid missing imports
const RotateCcw = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="1 4 1 10 7 10"></polyline>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
  </svg>
);
const FileText = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);
