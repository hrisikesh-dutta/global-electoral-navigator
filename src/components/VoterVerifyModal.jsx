import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import votersData from '../data/voters.json';

export default function VoterVerifyModal({ isOpen, onClose }) {
  const [epic, setEpic] = useState('WB/01/232/123456');
  const [dob, setDob] = useState('1990-01-01');
  const [result, setResult] = useState(null); // 'found', 'not_found', 'error'
  const [voterDetails, setVoterDetails] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Reset state on open
      setResult(null);
      setVoterDetails(null);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const match = votersData.find(v => v.epic.toLowerCase().trim() === epic.toLowerCase().trim() && v.dob === dob);
      if (match) {
        setResult('found');
        setVoterDetails(match);
      } else {
        setResult('not_found');
        setVoterDetails(null);
      }
    } catch (err) {
      setResult('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md animate-[fadeIn_0.2s_ease-in-out]">
        <Card className="relative overflow-hidden bg-navy-card">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
          
          <h2 className="text-xl font-display font-bold text-white mb-6 pr-8">Verify Electoral Roll</h2>
          
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">EPIC / Voter ID Number</label>
                <input 
                  type="text" 
                  value={epic} 
                  onChange={(e) => setEpic(e.target.value)}
                  className="w-full bg-navy-2 border border-white/10 rounded px-4 py-2 text-white focus:border-[#f59e0b] outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-navy-2 border border-white/10 rounded px-4 py-2 text-white focus:border-[#f59e0b] outline-none"
                  required
                />
              </div>
              <Button type="submit" className="w-full flex justify-center items-center gap-2 mt-2">
                <Search size={16} /> Check Roll
              </Button>
            </form>
          )}

          {result === 'found' && voterDetails && (
            <div className="bg-[#10b981]/10 border border-[#10b981]/30 p-5 rounded-lg text-center animate-[fadeIn_0.2s_ease-in-out]">
              <CheckCircle className="text-[#10b981] mx-auto mb-3" size={40} />
              <h3 className="text-[#10b981] font-bold text-lg mb-1">Voter Found!</h3>
              <p className="text-slate-300 mb-4">Your name is present in the electoral roll.</p>
              
              <div className="bg-navy-2 p-3 rounded text-left space-y-2 mb-4">
                <div><span className="text-slate-500 text-xs uppercase block">Name</span><span className="text-white font-medium">{voterDetails.name}</span></div>
                <div><span className="text-slate-500 text-xs uppercase block">Constituency</span><span className="text-white font-medium">{voterDetails.constituencyId} - {voterDetails.constituencyName}</span></div>
                <div><span className="text-slate-500 text-xs uppercase block">Booth</span><span className="text-white font-medium">{voterDetails.boothName}</span></div>
              </div>
              <Button onClick={() => setResult(null)} variant="ghost" className="w-full">Search Again</Button>
            </div>
          )}

          {result === 'not_found' && (
            <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 p-5 rounded-lg text-center animate-[fadeIn_0.2s_ease-in-out]">
              <AlertTriangle className="text-[#f59e0b] mx-auto mb-3" size={40} />
              <h3 className="text-[#f59e0b] font-bold text-lg mb-1">Not Found</h3>
              <p className="text-slate-300 text-sm mb-4">We couldn't find a matching record. Please verify your details or check the official ECI portal.</p>
              <div className="flex gap-2">
                <Button onClick={() => setResult(null)} variant="ghost" className="flex-1 text-slate-300 border-white/20">Go Back</Button>
                <Button className="flex-1">Visit ECI →</Button>
              </div>
            </div>
          )}

          {result === 'error' && (
            <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 p-5 rounded-lg text-center animate-[fadeIn_0.2s_ease-in-out]">
              <XCircle className="text-[#ef4444] mx-auto mb-3" size={40} />
              <h3 className="text-[#ef4444] font-bold text-lg mb-1">System Error</h3>
              <p className="text-slate-300 text-sm mb-4">An error occurred while checking the database.</p>
              <Button onClick={() => setResult(null)} variant="ghost" className="w-full">Try Again</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
