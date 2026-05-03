import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, constituencies: 0, languages: 3 });
  const [alerts, setAlerts] = useState([]);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // 1. Stats
      try {
        const votersData = localStorage.getItem('data_voters') 
          ? JSON.parse(localStorage.getItem('data_voters')) 
          : (await import('../data/voters.json')).default;
          
        const constituenciesData = localStorage.getItem('data_constituencies')
          ? JSON.parse(localStorage.getItem('data_constituencies'))
          : (await import('../data/constituencies.json')).default;

        setStats({
          users: votersData.length * 1000,
          constituencies: constituenciesData.length,
          languages: 3 // en, hi, bn
        });
      } catch (e) { console.error("Error loading stats:", e); }

      // 2. Alerts
      try {
        const localAlerts = localStorage.getItem('data_alerts');
        if (localAlerts) {
          setAlerts(JSON.parse(localAlerts));
        } else {
          const modAlerts = (await import('../data/alerts.json')).default;
          setAlerts(modAlerts);
          localStorage.setItem('data_alerts', JSON.stringify(modAlerts));
        }
      } catch (e) { console.error("Error loading alerts:", e); }

      // 3. Phases
      try {
        const localElec = localStorage.getItem('data_elections');
        let electionsData = localElec ? JSON.parse(localElec) : (await import('../data/elections.json')).default;
        
        // Find priority election, else first
        const activeElec = electionsData.find(e => e.isPriority) || electionsData[0];
        if (activeElec && activeElec.phases) {
          setPhases(activeElec.phases);
        }
      } catch (e) { console.error("Error loading phases:", e); }
    };
    
    loadData();
  }, []);

  const dismissAlert = (id) => {
    const updated = alerts.filter(a => a.id !== id);
    setAlerts(updated);
    localStorage.setItem('data_alerts', JSON.stringify(updated));
  };

  const getAlertIcon = (type) => {
    if (type === 'error') return <AlertCircle className="text-[#ef4444] shrink-0" size={18} />;
    if (type === 'success') return <CheckCircle2 className="text-[#10b981] shrink-0" size={18} />;
    if (type === 'warning') return <AlertCircle className="text-[#f59e0b] shrink-0" size={18} />;
    return <Info className="text-[#3b82f6] shrink-0" size={18} />;
  };

  const getAlertColors = (type) => {
    if (type === 'error') return 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]';
    if (type === 'success') return 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]';
    if (type === 'warning') return 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]';
    return 'bg-[#3b82f6]/10 border-[#3b82f6]/20 text-[#3b82f6]';
  };

  const getPhaseVariant = (status) => {
    if (status === 'completed') return 'green';
    if (status === 'active') return 'amber';
    return 'gray';
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-white mb-6">System Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard color="teal" value={(stats.users / 1000000).toFixed(1) + 'M'} label="Active Users (Mock)" />
        <StatCard color="amber" value={stats.constituencies} label="Constituencies" />
        <StatCard color="blue" value={stats.languages} label="Languages" />
        <StatCard color="purple" value="99.9%" label="Uptime" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Phase Progress Table */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-bold text-white mb-4">Priority Election Progress</h2>
            <div className="overflow-x-auto">
              {phases.length === 0 ? (
                <div className="text-slate-500 text-sm py-4">No phase data available.</div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-mono text-slate-500">
                      <th className="pb-3 pr-4">Phase</th>
                      <th className="pb-3 px-4">Date</th>
                      <th className="pb-3 px-4">Regions</th>
                      <th className="pb-3 pl-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phases.map((p, idx) => (
                      <tr key={idx} className="border-b border-white/5 last:border-0 text-sm">
                        <td className="py-3 pr-4 text-white">Phase {p.phase}</td>
                        <td className="py-3 px-4 text-slate-300">{p.date}</td>
                        <td className="py-3 px-4 text-slate-400 truncate max-w-[150px]">{p.regions}</td>
                        <td className="py-3 pl-4 text-right"><Badge variant={getPhaseVariant(p.status)} className="capitalize">{p.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        </div>

        {/* System Alerts */}
        <div>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">System Alerts</h2>
              <span className="text-xs bg-white/10 px-2 py-1 rounded text-slate-300">{alerts.length}</span>
            </div>
            
            {alerts.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">All clear. No active alerts.</div>
            ) : (
              <div className="space-y-4">
                {alerts.slice(0, 5).map(alert => (
                  <div key={alert.id} className={`flex gap-3 border p-3 rounded-lg relative group ${getAlertColors(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                    <div className="pr-4">
                      <h4 className="text-sm font-bold mb-1">{alert.title}</h4>
                      <p className="text-xs opacity-80">{alert.message}</p>
                    </div>
                    <button 
                      onClick={() => dismissAlert(alert.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
