import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, GitMerge, Languages, BellRing, Vote, MapPin, Users, Shield } from 'lucide-react';

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

export default function AdminLayout() {
  const location = useLocation();

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
