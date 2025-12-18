import React from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import Landing from './pages/Landing';
import Recruiter from './pages/Recruiter';
import Researcher from './pages/Researcher';
import TechLead from './pages/TechLead';

function AppContent() {
  const { role } = useRole();
  
  // Route to specific page based on role
  if (role === 'recruiter') return <Recruiter />;
  if (role === 'professor') return <Researcher />;
  if (role === 'tech_head') return <TechLead />;
  
  // Default to landing page
  return <Landing />;
}

export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}