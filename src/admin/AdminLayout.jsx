import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, GitMerge, Languages, BellRing, Vote, MapPin, Users, Shield, Lock, LogOut, Eye, EyeOff } from 'lucide-react';

// Simple hardcoded credentials — good enough for a demo/hackathon submission
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'GlobalElect@2026';

const MENU_GROUPS = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={16} /> }
    ]
  },
  {
    title: 'Elections & Data',
    items: [
      { name: 'Elections', path: '/admin/elections', icon: <Vote size={16} /> },
      { name: 'Constituencies', path: '/admin/constituencies', icon: <MapPin size={16} /> },
      { name: 'Candidates', path: '/admin/candidates', icon: <Users size={16} /> },
      { name: 'Data Manager', path: '/admin/data', icon: <Database size={16} /> }
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'State Machine Editor', path: '/admin/statemachine', icon: <GitMerge size={16} /> },
      { name: 'Localization', path: '/admin/localization', icon: <Languages size={16} /> },
      { name: 'Alerts Composer', path: '/admin/alerts', icon: <BellRing size={16} /> },
      { name: 'Roles & Access', path: '/admin/roles', icon: <Shield size={16} /> }
    ]
  }
];

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1a2e 40%, #0d1520 70%, #0a0e1a 100%)' }}>
      {/* Background orbs */}
      <div className="fixed top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 70%)' }} />

      <div className="w-full max-w-sm mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-[#f59e0b]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            ADMIN<span style={{ color: '#f59e0b' }}>PANEL</span>
          </h1>
          <p className="text-slate-500 text-sm">Restricted access — GlobalElect</p>
        </div>

        {/* Login Card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '16px' }} className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-lg text-white text-sm outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-sm text-[#0a0e1a] cursor-pointer transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ef6c00)' }}
            >
              Sign In to Admin
            </button>
          </form>

          <p className="text-center text-slate-600 text-xs mt-4">
            Demo: admin / GlobalElect@2026
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-4">
          <Link to="/" className="hover:text-slate-400 transition-colors">← Back to GlobalElect</Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true');

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return <AdminLogin onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <div className="flex h-screen text-slate-300 overflow-hidden">
      {/* Sidebar */}
      <div className="w-[200px] bg-[rgba(255,255,255,0.02)] backdrop-blur-md border-r border-white/5 flex flex-col z-10">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link to="/" className="text-lg font-display font-bold">
            <span className="text-white">ADMIN</span><span className="text-gradient-saffron">PANEL</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          {MENU_GROUPS.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="px-6 text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-2">{group.title}</h4>
              <ul>
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className={`flex items-center gap-3 px-6 py-2 text-sm transition-colors border-l-2 ${
                          isActive 
                            ? 'border-[#f59e0b] bg-white/10 backdrop-blur-md text-white shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]' 
                            : 'border-transparent hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative z-0">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
