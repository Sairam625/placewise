import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Search, Filter, BookOpen } from 'lucide-react';
import './PrepPage.css';

export default function PrepPage() {
  const { category, companyName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Capitalize category for display
  const title = companyName ? `${companyName} Preparation` : (category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : 'Preparation');

  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:5001/api/questions?';
    if (companyName) url += `company=${companyName}`;
    else if (category) url += `category=${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching questions", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="dashboard-layout">
      <div className="desktop-sidebar">
        <Sidebar />
      </div>
      
      <div className="dashboard-main prep-main">
        <div className="prep-header">
          <h2>{title} Practice</h2>
          <p>Master these questions to ace your placement interviews.</p>
        </div>

        <div className="prep-toolbar">
          <div className="search-bar">
            <Search size={18} color="#9CA3AF" />
            <input type="text" placeholder={`Search ${title} questions...`} />
          </div>
          <button className="btn btn-outline filter-btn">
            <Filter size={18} className="mr-2" /> Filter
          </button>
        </div>

        <div className="questions-list">
          {loading ? (
            <div className="loading-state">Loading questions...</div>
          ) : questions.length > 0 ? (
            questions.map(q => (
              <div key={q._id} className="question-card">
                <div className="question-card-header">
                  <div className="q-title-row">
                    <BookOpen size={18} className="q-icon" />
                    <h3>{q.title}</h3>
                  </div>
                  <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                </div>
                
                <div className="question-content">
                  <p>{q.content}</p>
                </div>

                <div className="question-footer">
                  {q.company && q.company !== 'General' ? (
                    <span className="company-tag">{q.company}</span>
                  ) : (
                    <div></div>
                  )}
                  <button className="btn btn-primary solve-btn">Solve Now</button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No questions available in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
