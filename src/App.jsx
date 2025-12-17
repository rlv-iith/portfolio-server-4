import React from 'react';
import { RoleProvider, useRole } from './context/RoleContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const { role } = useRole();
  // Simple router: If role is selected, show Dashboard. Else, show Landing.
  return role ? <Dashboard /> : <Landing />;
}

export default function App() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}