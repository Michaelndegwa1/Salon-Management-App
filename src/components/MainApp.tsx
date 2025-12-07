import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Layout from './Layout';
import Calendar from './Calendar';
import ClientManagement from './ClientManagement';
import ClientDetail from './ClientDetail';
import ServicesManagement from './ServicesManagement';
import StaffManagement from './StaffManagement';
import StaffDetail from './StaffDetail';
import Reports from './Reports';
import Inventory from './Inventory';
import Settings from './Settings';
import Notifications from './Notifications';
import CallLogs from './CallLogs';
import ClientRetention from './ClientRetention';

interface MainAppProps {
  isMobile: boolean;
  onRestart: () => void;
}

export default function MainApp({ isMobile, onRestart }: MainAppProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" /> : 
            <Login onLogin={() => setIsAuthenticated(true)} isMobile={isMobile} onRestart={onRestart} />
          } 
        />
        
        {isAuthenticated ? (
          <Route path="/" element={<Layout isMobile={isMobile} />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard isMobile={isMobile} />} />
            <Route path="calendar" element={<Calendar isMobile={isMobile} />} />
            <Route path="clients" element={<ClientManagement isMobile={isMobile} />} />
            <Route path="clients/:id" element={<ClientDetail isMobile={isMobile} />} />
            <Route path="client-retention" element={<ClientRetention isMobile={isMobile} />} />
            <Route path="services" element={<ServicesManagement isMobile={isMobile} />} />
            <Route path="staff" element={<StaffManagement isMobile={isMobile} />} />
            <Route path="staff/:id" element={<StaffDetail isMobile={isMobile} />} />
            <Route path="call-logs" element={<CallLogs isMobile={isMobile} />} />
            <Route path="reports" element={<Reports isMobile={isMobile} />} />
            <Route path="inventory" element={<Inventory isMobile={isMobile} />} />
            <Route path="settings" element={<Settings isMobile={isMobile} />} />
            <Route path="notifications" element={<Notifications isMobile={isMobile} />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}