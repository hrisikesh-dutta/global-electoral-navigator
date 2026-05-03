import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import GateFlow from './pages/GateFlow';
import Dashboard from './pages/Dashboard';
import TimelinePage from './pages/TimelinePage';
import ConstituencyFinder from './pages/ConstituencyFinder';
import HowToVote from './pages/HowToVote';
import Learn from './pages/Learn';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ElectionsManager from './admin/ElectionsManager';
import DataManager from './admin/DataManager';
import StateMachineEditor from './admin/StateMachineEditor';
import LocalizationManager from './admin/LocalizationManager';
import AlertsComposer from './admin/AlertsComposer';
import RolesManager from './admin/RolesManager';

import { useGateStore, GATES } from './store/gateStore';

// Main Layout with Header
function MainLayout({ children }) {
  return (
    <div className="min-h-screen text-slate-300 font-body selection:bg-[#f59e0b] selection:text-navy relative overflow-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }}></div>
      <div className="fixed bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)' }}></div>
      <div className="fixed top-[40%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none -z-10" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)' }}></div>
      
      <Header />
      <main className="relative z-0">{children}</main>
    </div>
  );
}

// Guard for Constituency Finder (Requires S2 complete)
function RequireS2({ children }) {
  const { gates } = useGateStore();
  const s2Complete = gates[GATES.S2].status === 'complete';
  if (!s2Complete) return <Navigate to="/navigate" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
        <Route path="/navigate" element={<MainLayout><GateFlow /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/timeline" element={<MainLayout><TimelinePage /></MainLayout>} />
        <Route path="/find" element={<MainLayout><RequireS2><ConstituencyFinder /></RequireS2></MainLayout>} />
        <Route path="/guide" element={<MainLayout><HowToVote /></MainLayout>} />
        <Route path="/learn" element={<MainLayout><Learn /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="elections" element={<ElectionsManager />} />
          <Route path="constituencies" element={<DataManager defaultTab="Constituencies" />} />
          <Route path="candidates" element={<DataManager defaultTab="Candidates" />} />
          <Route path="data" element={<DataManager defaultTab="Elections" />} />
          <Route path="statemachine" element={<StateMachineEditor />} />
          <Route path="localization" element={<LocalizationManager />} />
          <Route path="alerts" element={<AlertsComposer />} />
          <Route path="roles" element={<RolesManager />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
