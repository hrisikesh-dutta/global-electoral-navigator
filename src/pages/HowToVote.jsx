import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Volume2, Accessibility } from 'lucide-react';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function HowToVote() {
  const steps = [
    {
      num: 1,
      color: 'amber',
      bgClass: 'bg-[#f59e0b]',
      title: 'Check Your Name on Voter List',
      desc: 'Verify your name is present on the official electoral roll before heading to the booth.'
    },
    {
      num: 2,
      color: 'teal',
      bgClass: 'bg-[#14b8a6]',
      title: 'Carry Valid ID Proof',
      desc: 'Bring your EPIC (Voter ID) or any of the 11 alternative photo ID documents approved by ECI.'
    },
    {
      num: 3,
      color: 'blue',
      bgClass: 'bg-[#3b82f6]',
      title: 'Identify Your Polling Booth',
      desc: 'Go to your designated polling station. Officials will check your name and ID.'
    },
    {
      num: 4,
      color: 'purple',
      bgClass: 'bg-[#8b5cf6]',
      title: 'Cast Your Vote on EVM',
      desc: 'Press the blue button next to your chosen candidate. A red light will glow.',
      extra: (
        <div className="mt-3 p-3 bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 rounded-md flex items-start gap-3">
          <Badge variant="purple">VVPAT Note</Badge>
          <span className="text-sm text-slate-300">Check the printed slip in the VVPAT machine glass window for 7 seconds to verify your vote was recorded correctly.</span>
        </div>
      )
    },
    {
      num: 5,
      color: 'green',
      bgClass: 'bg-[#10b981]',
      title: 'Vote Cast!',
      desc: 'An indelible ink mark will be applied to your left index finger. Your vote is now securely recorded.',
      isFinal: true
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">How to Vote</h1>
          <p className="text-slate-400">Your step-by-step guide to the polling process.</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white transition-colors">
          <Globe size={14} />
          <span>English</span>
        </button>
      </div>

      {/* Accessibility Banner */}
      <div className="mb-10 bg-[#f59e0b]/10 border border-[#f59e0b]/30 p-4 rounded-lg flex items-start gap-3">
        <Accessibility className="text-[#f59e0b] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[#f59e0b] font-medium mb-1">Accessibility Services Available</h4>
          <p className="text-sm text-[#f59e0b]/80">Braille ballot papers, audio guides, and wheelchair assistance are available at all polling stations. <span className="underline cursor-pointer">Learn more</span></p>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <Card 
            key={step.num} 
            className={`relative pl-16 sm:pl-20 ${step.isFinal ? 'border-2 border-[#10b981]/50 bg-[#10b981]/5' : ''}`}
          >
            <div className={`absolute top-5 left-4 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-bold text-navy ${step.bgClass}`}>
              {step.num}
            </div>
            
            <h3 className="text-xl font-display font-bold text-white mb-2">{step.title}</h3>
            <p className="text-slate-400 mb-0">{step.desc}</p>
            {step.extra}
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
