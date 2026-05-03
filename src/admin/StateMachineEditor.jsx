import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, X, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { GATES } from '../store/gateStore';

const DEFAULT_CONDITIONS = {
  S1: 'Auto IP || Manual override',
  S2: 'age >= 18 && citizenship == "Indian"',
  S3: 'valid(epic) && match(elections.json)',
  S4: 'match(constituencies.json)',
  S5: 'S1..S4 == complete'
};

const COLORS = {
  S1: 'teal',
  S2: 'amber',
  S3: 'blue',
  S4: 'purple',
  S5: 'green'
};

export default function StateMachineEditor() {
  const [conditions, setConditions] = useState(DEFAULT_CONDITIONS);
  const [testModal, setTestModal] = useState({ isOpen: false, gateId: null, result: null });

  useEffect(() => {
    const local = localStorage.getItem('data_gate_conditions');
    if (local) setConditions(JSON.parse(local));
  }, []);

  const handleConditionChange = (id, value) => {
    setConditions(prev => ({ ...prev, [id]: value }));
  };

  const handleConditionBlur = () => {
    localStorage.setItem('data_gate_conditions', JSON.stringify(conditions));
  };

  const handleTestGate = (id) => {
    setTestModal({ isOpen: true, gateId: id, result: null });
    // Simulate test delay
    setTimeout(() => {
      setTestModal(prev => ({
        ...prev,
        result: Math.random() > 0.3 ? 'pass' : 'fail'
      }));
    }, 1000);
  };

  const handleExportConfig = () => {
    const config = Object.entries(GATES).map(([id, name]) => ({
      id,
      name,
      triggerCondition: conditions[id]
    }));
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gates-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const gateEntries = Object.entries(GATES);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display font-bold text-white">State Machine Editor</h1>
        <Button onClick={handleExportConfig} variant="ghost" className="border-white/20 flex items-center gap-2">
          <Download size={16} /> Export Config
        </Button>
      </div>

      <Card accent="amber" className="mb-8 bg-gradient-to-r from-navy-card to-[#f59e0b]/10">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Priority Mode Active</h3>
            <p className="text-sm text-slate-400">Gate rules are currently locked for the active election phase. Only super-admins can override.</p>
          </div>
          <Button variant="ghost" className="border-[#f59e0b]/50 text-[#f59e0b]">Request Override</Button>
        </div>
      </Card>

      <h2 className="text-lg font-bold text-white mb-4">Pipeline Visualizer</h2>
      <Card className="mb-8 overflow-x-auto pb-8">
        <div className="flex items-center justify-between min-w-[700px] px-4 pt-4">
          {gateEntries.map(([id, name], idx) => {
            const color = COLORS[id];
            return (
              <React.Fragment key={id}>
                <div className="flex flex-col items-center w-32 relative">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg mb-3 shadow-[0_0_15px_rgba(0,0,0,0.5)] border bg-navy-3 border-${color}-500/50 text-${color}-400`}>
                    {id}
                  </div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 text-center">{name}</span>
                </div>
                {idx < gateEntries.length - 1 && (
                  <div className="flex-1 h-[2px] bg-white/10 -mt-8 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-white/30 rotate-45" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Card>

      <h2 className="text-lg font-bold text-white mb-4">Gate Configuration</h2>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono text-slate-500">
              <th className="pb-3 pr-4 w-16">ID</th>
              <th className="pb-3 px-4 w-48">Gate Name</th>
              <th className="pb-3 px-4">Trigger Condition</th>
              <th className="pb-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gateEntries.map(([id, name]) => (
              <tr key={id} className="border-b border-white/5 last:border-0 text-sm">
                <td className="py-4 pr-4 font-bold text-white">{id}</td>
                <td className="py-4 px-4 font-mono text-slate-300">{name}</td>
                <td className="py-4 px-4">
                  <textarea 
                    value={conditions[id] || ''}
                    onChange={(e) => handleConditionChange(id, e.target.value)}
                    onBlur={handleConditionBlur}
                    className="w-full bg-navy border border-white/10 rounded px-3 py-2 text-[#14b8a6] font-mono text-xs focus:border-[#f59e0b] outline-none min-h-[40px] resize-y"
                  />
                </td>
                <td className="py-4 pl-4 text-right">
                  <Button onClick={() => handleTestGate(id)} variant="ghost" className="text-xs py-1.5 px-3 flex items-center gap-1 ml-auto">
                    <Play size={12} /> Test Gate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Test Modal */}
      <AnimatePresence>
        {testModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setTestModal({ isOpen: false })} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-navy-card border border-white/10 shadow-2xl rounded-xl overflow-hidden z-10 p-6 text-center">
              <h2 className="text-lg font-bold text-white mb-2">Testing Gate {testModal.gateId}</h2>
              <p className="text-slate-400 text-sm mb-6">Evaluating condition: <code className="text-[#14b8a6] bg-navy-2 px-1 rounded">{conditions[testModal.gateId]}</code></p>
              
              <div className="h-24 flex items-center justify-center">
                {!testModal.result ? (
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-[#f59e0b] rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-[#f59e0b] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-3 h-3 bg-[#f59e0b] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                ) : testModal.result === 'pass' ? (
                  <div className="flex flex-col items-center text-[#10b981]">
                    <CheckCircle size={40} className="mb-2" />
                    <span className="font-bold">CONDITION PASSED</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-[#ef4444]">
                    <AlertCircle size={40} className="mb-2" />
                    <span className="font-bold">CONDITION FAILED</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <Button onClick={() => setTestModal({ isOpen: false })} className="w-full">Close</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
