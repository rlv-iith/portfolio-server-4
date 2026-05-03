// src/App.jsx
import React from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import Landing from './pages/Landing';
import Recruiter from './pages/Recruiter';
// import Researcher from './pages/Researcher';

function AppContent() {
  const { role } = useRole();

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