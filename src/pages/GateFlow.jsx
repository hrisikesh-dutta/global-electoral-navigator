import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGateStore, GATES } from '../store/gateStore';
import { useLanguage } from '../context/LanguageContext';
import GateStep from '../components/GateStep';
import Button from '../components/Button';

export default function GateFlow() {
  const navigate = useNavigate();
  const { gates, completeGate, getCurrentGate, submitEpicLookup, isS3Loading, s3Error } = useGateStore();
  const { t } = useLanguage();
  const currentGate = getCurrentGate();
  
  const [epicInput, setEpicInput] = useState('WB/01/232/123456');

  // Redirect to dashboard if S5 is complete
  useEffect(() => {
    if (gates[GATES.S5].status === 'complete') {
      navigate('/dashboard');
    }
  }, [gates, navigate]);

  const handleS1Complete = () => {
    completeGate(GATES.S1, { location: 'West Bengal', method: 'auto' });
  };

  const handleS2Complete = (e) => {
    e.preventDefault();
    completeGate(GATES.S2, { ageVerified: true, citizenship: 'Indian' });
  };

  const handleS3Complete = (e) => {
    e.preventDefault();
    submitEpicLookup(epicInput);
  };

  const handleS4Complete = () => {
    completeGate(GATES.S4, { constituency: 'WB-01', booth: '1250' });
  };

  // Progress Bar Dots
  const renderProgressDot = (stepKey) => {
    const status = gates[stepKey].status;
    let dotClass = 'border-slate-600 bg-transparent'; // locked
    if (status === 'complete') dotClass = 'border-[#10b981] bg-[#10b981]';
    if (status === 'active') dotClass = 'border-[#f59e0b] bg-[#f59e0b] animate-pulse-ring';
    
    return <div key={stepKey} className={`w-3 h-3 rounded-full border-2 ${dotClass} z-10 transition-all duration-300`} />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-2">{t('nav.navigate') || 'Electoral Verification'}</h1>
        <p className="text-slate-400">Complete the steps below to access your personalized dashboard.</p>
      </div>

      {/* Progress Bar */}
      <div className="relative flex justify-between items-center mb-12 px-4">
        <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-white/10 -translate-y-1/2" />
        {/* Dynamic fill line based on current gate */}
        <div 
          className="absolute top-1/2 left-4 h-[2px] bg-[#10b981] -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${Object.values(GATES).indexOf(currentGate) * 25}%` }}
        />
        {Object.values(GATES).map(renderProgressDot)}
      </div>

      {/* Gates */}
      <div className="space-y-4">
        <GateStep 
          stepNumber="1"
          title="Location Detection" 
          description="We need your state and constituency to provide relevant election data."
          status={gates[GATES.S1].status}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-300">
              Auto-detected: <strong className="text-white">West Bengal</strong>
            </div>
            <Button onClick={handleS1Complete}>Confirm Location</Button>
          </div>
        </GateStep>

        <GateStep 
          stepNumber="2"
          title="Eligibility Check" 
          description="Verify your age and citizenship status to proceed."
          status={gates[GATES.S2].status}
        >
          <form onSubmit={handleS2Complete} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Date of Birth</label>
                <input required type="date" defaultValue="1990-01-01" className="w-full bg-navy-2 border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Citizenship</label>
                <select required className="w-full bg-navy-2 border border-white/10 rounded px-3 py-2 text-white focus:border-[#f59e0b] outline-none transition-colors">
                  <option value="Indian">Indian Citizen</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <Button type="submit" className="w-full sm:w-auto">Verify Eligibility</Button>
          </form>
        </GateStep>

        <GateStep 
          stepNumber="3"
          title="Voter ID (EPIC) Lookup" 
          description="Enter your Electoral Photo Identity Card number to fetch your details."
          status={gates[GATES.S3].status}
        >
          <form onSubmit={handleS3Complete} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input required type="text" value={epicInput} onChange={(e) => setEpicInput(e.target.value)} placeholder="Enter EPIC Number (e.g. WB/01/232/123456)" className="flex-1 bg-navy-2 border border-white/10 rounded px-4 py-2 text-white font-mono focus:border-[#f59e0b] outline-none transition-colors" />
              <Button type="submit" disabled={isS3Loading}>{isS3Loading ? 'Loading...' : 'Lookup details'}</Button>
            </div>
            {s3Error && <p className="text-red-400 text-sm">{s3Error}</p>}
          </form>
        </GateStep>

        <GateStep 
          stepNumber="4"
          title="Booth Assignment" 
          description="Matching your voter ID with the 2026 electoral rolls."
          status={gates[GATES.S4].status}
        >
          <div className="p-4 bg-navy-2 border border-white/10 rounded-lg mb-4">
             <div className="grid grid-cols-2 gap-4 text-sm font-mono">
               <div><span className="text-slate-500 block mb-1">Constituency</span><span className="text-white">{gates[GATES.S4].data?.constituency?.name || 'WB-01 Kolkata Paschim'}</span></div>
               <div><span className="text-slate-500 block mb-1">Polling Booth</span><span className="text-white">Booth #{gates[GATES.S4].data?.boothId || '1250'}</span></div>
             </div>
          </div>
          <Button onClick={handleS4Complete} className="w-full">Confirm & Unlock Dashboard</Button>
        </GateStep>
        
        {/* Note: S5 is DASHBOARD_READY, which redirects. We don't render it here as a step */}
      </div>
    </motion.div>
  );
}
