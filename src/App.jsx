import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CompaniesList from './pages/CompaniesList';
import CompanyPrep from './pages/CompanyPrep';
import PrepPage from './pages/PrepPage';
import AssessmentReport from './pages/AssessmentReport';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies-prep" element={<CompanyPrep />} />
        <Route path="/prep/:category" element={<PrepPage />} />
        <Route path="/company-questions/:companyName" element={<PrepPage />} />
        <Route path="/report" element={<AssessmentReport />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
