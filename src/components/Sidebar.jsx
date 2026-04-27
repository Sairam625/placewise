import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BrainCircuit, 
  MessageSquare, 
  Lightbulb, 
  Code2, 
  Building2, 
  ClipboardCheck, 
  FileText, 
  TrendingUp, 
  Bookmark, 
  Award, 
  Settings,
  Rocket
} from 'lucide-react';
import logoImage from '../assets/image.png';
import './Sidebar.css';

const Logo = () => (
  <img src={logoImage} alt="PlaceWise Logo" width="24" height="24" style={{ objectFit: 'contain' }} />
);

const NavItem = ({ icon: Icon, label, to }) => (
  <NavLink to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
    <Icon size={18} className="nav-icon" />
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Logo />
        <span>PlaceWise</span>
      </div>

      <div className="nav-menu">
        <NavItem icon={Home} label="Dashboard" to="/dashboard" />
        <NavItem icon={BrainCircuit} label="Aptitude" to="/prep/aptitude" />
        <NavItem icon={MessageSquare} label="Verbal Ability" to="/prep/verbal" />
        <NavItem icon={Lightbulb} label="Logical Reasoning" to="/prep/logical" />
        <NavItem icon={Code2} label="Coding" to="/prep/coding" />
        <NavItem icon={Building2} label="Company Prep" to="/companies-prep" />
        <NavItem icon={ClipboardCheck} label="Mock Tests" to="/prep/mock" />
        <NavItem icon={FileText} label="Previous Papers" to="/prep/previous" />
        <NavItem icon={TrendingUp} label="Progress Report" to="/report" />
        <NavItem icon={Bookmark} label="Bookmarks" to="/bookmarks" />
        <NavItem icon={Award} label="Achievements" to="/achievements" />
        <NavItem icon={Settings} label="Settings" to="/settings" />
      </div>

      <div className="premium-card rocket-card">
        <div className="rocket-icon-wrapper">
          <Rocket size={24} fill="#8B5CF6" color="#ffffff" className="rocket-icon" />
        </div>
        <h4>Keep Learning,<br/>Keep Growing!</h4>
        <p>Consistent practice leads to placement success.</p>
      </div>
    </div>
  );
}
