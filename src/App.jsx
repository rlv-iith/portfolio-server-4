// src/App.jsx
import React from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import Landing from './pages/Landing';
import Recruiter from './pages/Recruiter';
import { useAnalytics } from './hooks/useAnalytics';
// import Researcher from './pages/Researcher';

function AppContent() {
  const { role } = useRole();
  useAnalytics();

  if (role === 'recruiter') return <Recruiter />;
  // if (role === 'professor') return <Researcher />;

  return <Landing />;
}

export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}