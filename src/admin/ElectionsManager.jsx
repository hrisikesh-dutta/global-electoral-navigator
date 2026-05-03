import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, CheckCircle, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

export default function ElectionsManager() {
  const [elections, setElections] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'National',
    country: 'India',
    phasesCount: 1,
    dateRange: '',
    isPriority: false
  });

  // Load from localStorage
  useEffect(() => {
    const loadData = async () => {
      const local = localStorage.getItem('data_elections');
      if (local) {
        setElections(JSON.parse(local));
      } else {
        try {
          const mod = await import('../data/elections.json');
          setElections(mod.default || mod);
        } catch(e) {
          console.error(e);
        }
      }
    };
    loadData();
  }, []);

  const saveElections = (newElections) => {
    setElections(newElections);
    localStorage.setItem('data_elections', JSON.stringify(newElections));
  };

  const handleOpenDrawer = (election = null) => {
    if (election) {
      setEditingId(election.id);
      setFormData({ ...election });
    } else {
      setEditingId(null);
      setFormData({
        name: '', type: 'National', country: 'India', phasesCount: 1, dateRange: '', isPriority: false
      });
    }
    setIsDrawerOpen(true);
  };

  const handleTogglePriority = (id) => {
    const updated = elections.map(e => ({
      ...e,
      isPriority: e.id === id ? !e.isPriority : false // Only one priority allowed
    }));
    saveElections(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedElections = [...elections];
    
    // Enforce mutually exclusive priority
    if (formData.isPriority) {
      updatedElections = updatedElections.map(e => ({ ...e, isPriority: false }));
    }

    if (editingId) {
      updatedElections = updatedElections.map(e => 
        e.id === editingId ? { ...formData, id: editingId, phases: e.phases || [] } : e
      );
    } else {
      updatedElections.push({ 
        ...formData, 
        id: `elec-${Date.now()}`,
        phases: [] // Mock empty phases for new
      });
    }

    saveElections(updatedElections);
    setIsDrawerOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto relative h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Elections Manager</h1>
          <p className="text-slate-400 text-sm">Configure national, state, and local election events.</p>
        </div>
        <Button onClick={() => handleOpenDrawer()} className="flex items-center gap-2">
          <Plus size={16} /> Add Election
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {elections.map(elec => (
          <Card key={elec.id} className="relative flex flex-col justify-between" accent={elec.isPriority ? "amber" : null}>
            {elec.isPriority && (
              <div className="absolute top-4 right-4 text-[#f59e0b] flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                <CheckCircle size={14} /> Priority
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={elec.type === 'National' ? 'teal' : 'blue'}>{elec.type}</Badge>
                <span className="text-slate-500 text-xs font-mono">{elec.country}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 pr-16">{elec.name}</h3>
              
              <div className="space-y-2 text-sm text-slate-300 font-mono bg-navy-2 p-3 rounded mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Dates:</span>
                  <span>{elec.dateRange || 'TBD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phases:</span>
                  <span>{elec.phasesCount} Phase(s)</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
              <button 
                onClick={() => handleTogglePriority(elec.id)}
                className={`text-xs uppercase tracking-wider font-bold transition-colors ${elec.isPriority ? 'text-slate-500 hover:text-slate-300' : 'text-[#f59e0b] hover:text-[#fbbf24]'}`}
              >
                {elec.isPriority ? 'Remove Priority' : 'Set as Priority'}
              </button>
              <button onClick={() => handleOpenDrawer(elec)} className="p-2 text-slate-400 hover:text-white transition-colors">
                <Edit2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Right-Side Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-navy-card border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-display font-bold text-white">{editingId ? 'Edit Election' : 'Add Election'}</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Election Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none">
                      <option>National</option>
                      <option>State</option>
                      <option>Local</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Country</label>
                    <input type="text" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Date Range</label>
                  <input type="text" placeholder="e.g. Mar 15, 2026 - May 25, 2026" value={formData.dateRange} onChange={e => setFormData({...formData, dateRange: e.target.value})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Number of Phases</label>
                  <input type="number" min="1" max="10" value={formData.phasesCount} onChange={e => setFormData({...formData, phasesCount: parseInt(e.target.value)})} className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none" />
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  <input type="checkbox" id="isPriority" checked={formData.isPriority} onChange={e => setFormData({...formData, isPriority: e.target.checked})} className="w-4 h-4 accent-[#f59e0b]" />
                  <label htmlFor="isPriority" className="text-sm text-white font-medium cursor-pointer">Set as Priority Election</label>
                </div>
              </form>

              <div className="p-6 border-t border-white/10 bg-navy/50 flex gap-3">
                <Button onClick={() => setIsDrawerOpen(false)} variant="ghost" className="flex-1 text-slate-300 border-white/20">Cancel</Button>
                <Button onClick={handleSubmit} className="flex-1">Save Election</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
