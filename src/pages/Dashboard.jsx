import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, CheckCircle2 } from 'lucide-react';
import { useGateStore, GATES } from '../store/gateStore';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import candidatesData from '../data/candidates.json';
import VoterVerifyModal from '../components/VoterVerifyModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const { gates } = useGateStore();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const handleDownload = () => {
    // Create a mock PDF blob
    const blob = new Blob(["Mock Voter Slip PDF Content - GlobalElect 2026\n\nName: User\nConstituency: WB-01 Kolkata Paschim\nBooth: Room 2, Assembly HS\nPhase: 7 (May 20, 2026)"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Voter_Slip_WB_01.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Protected Route Check
    if (gates[GATES.S5].status !== 'complete') {
      navigate('/navigate');
    }
  }, [gates, navigate]);

  if (gates[GATES.S5].status !== 'complete') return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold text-white">Your Electoral Dashboard</h1>
          <Badge variant="green">S5 Verified</Badge>
        </div>

        {/* Top Info Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-navy-2 border border-white/10 p-4 rounded-lg flex flex-col justify-center">
            <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Constituency</span>
            <strong className="text-white font-mono text-lg">WB-01 Kolkata Paschim</strong>
          </div>
          <div className="bg-navy-2 border border-white/10 p-4 rounded-lg flex flex-col justify-center">
            <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">Polling Booth</span>
            <strong className="text-white font-mono text-lg">Room 2, Assembly HS</strong>
          </div>
          <div className="bg-navy-2 border border-[#f59e0b]/30 p-4 rounded-lg flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]" />
            <span className="text-xs text-[#f59e0b] uppercase tracking-wider mb-1">Election Phase 7</span>
            <strong className="text-white font-mono text-lg">May 20, 2026</strong>
          </div>
        </div>

        {/* Priority Actions */}
        <h2 className="text-xl font-display font-bold text-white mb-4">Priority Actions</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card accent="amber" hover>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold mb-1">Verify Your Name on Roll</h3>
                <p className="text-sm text-slate-400">Ensure your name appears on the final electoral roll.</p>
              </div>
              <Badge variant="amber">Due in 5 days</Badge>
            </div>
            <div className="w-full bg-navy-3 rounded-full h-2 mt-4 mb-2">
              <div className="bg-[#f59e0b] h-2 rounded-full w-[80%]" />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setShowVerifyModal(true)} variant="ghost" className="text-[#f59e0b] border-[#f59e0b]/30">Verify Now</Button>
            </div>
          </Card>

          <Card accent="teal" hover>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-bold mb-1">Download Voter Slip</h3>
                <p className="text-sm text-slate-400">Official ECI slip required at the polling booth.</p>
              </div>
              <CheckCircle2 size={24} className="text-[#14b8a6]" />
            </div>
            <div className="flex justify-end mt-8">
              <Button onClick={handleDownload} className="bg-[#14b8a6] hover:bg-[#2dd4bf] text-navy flex items-center gap-2">
                <Download size={16} /> Download PDF
              </Button>
            </div>
          </Card>
        </div>

        {/* Candidates Table */}
        <h2 className="text-xl font-display font-bold text-white mb-4">Candidates (Kolkata Paschim)</h2>
        <Card className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500 font-mono">
                <th className="pb-3 px-4">Candidate Name</th>
                <th className="pb-3 px-4">Party</th>
                <th className="pb-3 px-4">Symbol</th>
                <th className="pb-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {candidatesData.map((cand, idx) => (
                <tr key={cand.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-medium text-white">{cand.name}</td>
                  <td className="py-4 px-4">
                    <Badge variant={idx === 0 ? 'green' : idx === 1 ? 'amber' : 'red'}>{cand.partyCode}</Badge>
                    <span className="text-slate-400 text-sm ml-2 hidden sm:inline">{cand.party}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-mono text-sm">{cand.symbol}</td>
                  <td className="py-4 px-4 text-right">
                    <Badge variant="teal">{cand.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </motion.div>
      <VoterVerifyModal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
    </>
  );
}
