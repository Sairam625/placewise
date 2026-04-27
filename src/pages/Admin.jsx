import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, X, ArrowLeft, LogOut, Code2, BrainCircuit, MessageSquare, Lightbulb } from 'lucide-react';
import './Admin.css';

const API_URL = 'http://localhost:5001/api/companies';

export default function Admin() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Modal states
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  // Form states
  const [companyForm, setCompanyForm] = useState({ name: '', type: 'Service', status: 'Hiring' });
  const [questionForm, setQuestionForm] = useState({ title: '', category: 'coding', difficulty: 'Medium', content: '', company: '' });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

  const fetchQuestionsForCompany = async (companyName) => {
    try {
      const response = await fetch(`http://localhost:5001/api/questions?company=${encodeURIComponent(companyName)}`);
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    fetchQuestionsForCompany(company.name);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
    setQuestions([]);
  };

  // --- CRUD COMPANY ---
  const openAddCompany = () => {
    setEditingCompany(null);
    setCompanyForm({ name: '', type: 'Service', status: 'Hiring' });
    setShowCompanyModal(true);
  };

  const openEditCompany = (e, company) => {
    e.stopPropagation(); // prevent row click
    setEditingCompany(company);
    setCompanyForm({ name: company.name, type: company.type, status: company.status });
    setShowCompanyModal(true);
  };

  const submitCompany = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      try {
        const response = await fetch(`${API_URL}/${editingCompany._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyForm)
        });
        if (response.ok) {
          fetchCompanies();
          setShowCompanyModal(false);
        }
      } catch (err) {
        console.error('Error updating company:', err);
      }
    } else {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyForm)
        });
        if (response.ok) {
          fetchCompanies();
          setShowCompanyModal(false);
        }
      } catch (err) {
        console.error('Error adding company:', err);
      }
    }
  };

  const handleDeleteCompany = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this company? All associated questions will remain but unlinked.')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchCompanies();
      } catch (err) {
        console.error('Error deleting company:', err);
      }
    }
  };

  // --- CRUD QUESTION ---
  const openAddQuestion = () => {
    setQuestionForm({ title: '', category: 'coding', difficulty: 'Medium', content: '', company: selectedCompany.name });
    setShowQuestionModal(true);
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionForm)
      });
      if (response.ok) {
        fetchQuestionsForCompany(selectedCompany.name);
        setShowQuestionModal(false);
      }
    } catch (err) {
      console.error('Error adding question:', err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await fetch(`http://localhost:5001/api/questions/${id}`, { method: 'DELETE' });
        fetchQuestionsForCompany(selectedCompany.name);
      } catch (err) {
        console.error('Error deleting question:', err);
      }
    }
  };

  const ModalOverlay = ({ children, onClose }) => (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
    }}>
      <div style={{
        background: 'white', padding: '2rem', borderRadius: '16px', width: '90%', maxWidth: '500px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid #E5E7EB',
        maxHeight: '90vh', overflowY: 'auto', position: 'relative', color: '#1F2937'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="admin-container" style={{ width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <div className="admin-topbar">
        <div className="admin-logo" style={{ marginBottom: 0 }}>
          <div className="logo-icon-premium">PW</div>
          PlaceWise Admin
        </div>
        <button 
          className="btn btn-outline" 
          style={{ border: '1px solid #E5E7EB', padding: '0.5rem 1rem', borderRadius: '8px', background: 'white', color: '#4B5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={() => navigate('/dashboard')}
        >
          <LogOut size={16} /> Exit Admin
        </button>
      </div>

      <div className="admin-content-area" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="admin-header-flex">
          <div>
            <h1 className="gradient-text">{selectedCompany ? selectedCompany.name : 'Companies Directory'}</h1>
            <p className="admin-subtitle">
              {selectedCompany 
                ? 'Manage preparation resources and questions for this specific company.' 
                : 'Select a company to manage its placement preparation resources.'}
            </p>
          </div>
          <div>
            {selectedCompany ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  style={{ border: '1px solid #E5E7EB', padding: '0.5rem 1rem', borderRadius: '8px', background: 'white', color: '#4B5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onClick={handleBackToCompanies}
                >
                  <ArrowLeft size={16} /> Back to Companies
                </button>
                <button className="btn-glow" onClick={openAddQuestion}>
                  <Plus size={18} /> Add Resource
                </button>
              </div>
            ) : (
              <button className="btn-glow" onClick={openAddCompany}>
                <Plus size={18} /> Add Company
              </button>
            )}
          </div>
        </div>

        {!selectedCompany ? (
          <div className="glass-card">
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: '#F9FAFB', borderRadius: '8px', padding: '0.5rem 1rem', width: '300px', border: '1px solid #E5E7EB' }}>
                <Search size={16} color="#9CA3AF" style={{ marginRight: '8px' }} />
                <input type="text" placeholder="Search companies..." style={{ background: 'transparent', border: 'none', color: '#111827', outline: 'none', width: '100%' }} />
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280' }}>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Company Name</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Type</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map(company => (
                    <tr 
                      key={company._id} 
                      onClick={() => handleSelectCompany(company)}
                      style={{ borderBottom: '1px solid #F3F4F6', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem', fontWeight: 'bold', color: '#111827' }}>{company.name}</td>
                      <td style={{ padding: '1rem', color: '#4B5563' }}>{company.type}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 500,
                          backgroundColor: company.status === 'Hiring' ? '#ECFDF5' : '#FEF3C7',
                          color: company.status === 'Hiring' ? '#059669' : '#D97706', border: `1px solid ${company.status === 'Hiring' ? '#A7F3D0' : '#FDE68A'}`
                        }}>
                          {company.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={(e) => openEditCompany(e, company)} style={{ background: 'transparent', border: 'none', color: '#3B82F6', cursor: 'pointer', marginRight: '1rem' }}><Edit2 size={16} /></button>
                        <button onClick={(e) => handleDeleteCompany(e, company._id)} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {companies.length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>No companies found. Click "Add Company" to begin.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-card">
            <div className="card-header" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>Resources & Questions</h3>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB', color: '#6B7280' }}>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Category</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Question Title</th>
                    <th style={{ padding: '1rem', fontWeight: 500 }}>Difficulty</th>
                    <th style={{ padding: '1rem', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map(q => (
                    <tr key={q._id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize', color: '#4B5563' }}>
                        {q.category === 'coding' && <Code2 size={16} color="#3B82F6"/>}
                        {q.category === 'aptitude' && <BrainCircuit size={16} color="#10B981"/>}
                        {q.category === 'verbal' && <MessageSquare size={16} color="#8B5CF6"/>}
                        {q.category === 'logical' && <Lightbulb size={16} color="#F59E0B"/>}
                        {q.category}
                      </td>
                      <td style={{ padding: '1rem', color: '#111827', fontWeight: 500 }}>{q.title}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                          backgroundColor: q.difficulty === 'Easy' ? '#ECFDF5' : q.difficulty === 'Medium' ? '#FEF3C7' : '#FEF2F2',
                          color: q.difficulty === 'Easy' ? '#059669' : q.difficulty === 'Medium' ? '#D97706' : '#DC2626'
                        }}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={() => handleDeleteQuestion(q._id)} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {questions.length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>No resources added for {selectedCompany.name} yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showCompanyModal && (
        <ModalOverlay onClose={() => setShowCompanyModal(false)}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#111827', fontSize: '1.25rem', fontWeight: 'bold' }}>{editingCompany ? 'Edit Company' : 'Add New Company'}</h3>
          <form onSubmit={submitCompany}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Company Name</label>
              <input type="text" value={companyForm.name} onChange={e => setCompanyForm({...companyForm, name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#111827', boxSizing: 'border-box' }} required />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Company Type</label>
              <select value={companyForm.type} onChange={e => setCompanyForm({...companyForm, type: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: 'white', color: '#111827', boxSizing: 'border-box' }}>
                <option value="Service">Service-Based</option>
                <option value="Product">Product-Based</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Hiring Status</label>
              <select value={companyForm.status} onChange={e => setCompanyForm({...companyForm, status: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: 'white', color: '#111827', boxSizing: 'border-box' }}>
                <option value="Hiring">Hiring</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowCompanyModal(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: '#4B5563', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button type="submit" className="btn-glow" style={{ padding: '0.5rem 1.5rem', borderRadius: '6px' }}>Save Company</button>
            </div>
          </form>
        </ModalOverlay>
      )}

      {showQuestionModal && (
        <ModalOverlay onClose={() => setShowQuestionModal(false)}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#111827', fontSize: '1.25rem', fontWeight: 'bold' }}>Add Resource to {selectedCompany?.name}</h3>
          <form onSubmit={submitQuestion}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Question Title</label>
              <input type="text" value={questionForm.title} onChange={e => setQuestionForm({...questionForm, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#111827', boxSizing: 'border-box' }} required />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Category</label>
                <select value={questionForm.category} onChange={e => setQuestionForm({...questionForm, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: 'white', color: '#111827', boxSizing: 'border-box' }}>
                  <option value="coding">Coding</option>
                  <option value="aptitude">Aptitude</option>
                  <option value="logical">Logical Reasoning</option>
                  <option value="verbal">Verbal Ability</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Difficulty</label>
                <select value={questionForm.difficulty} onChange={e => setQuestionForm({...questionForm, difficulty: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: 'white', color: '#111827', boxSizing: 'border-box' }}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.875rem', color: '#374151' }}>Question Content</label>
              <textarea value={questionForm.content} onChange={e => setQuestionForm({...questionForm, content: e.target.value})} rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#111827', boxSizing: 'border-box', fontFamily: 'monospace' }} placeholder="Enter the detailed question text or code here..." required />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowQuestionModal(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: '#4B5563', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
              <button type="submit" className="btn-glow" style={{ padding: '0.5rem 1.5rem', borderRadius: '6px' }}>Save Resource</button>
            </div>
          </form>
        </ModalOverlay>
      )}
    </div>
  );
}
