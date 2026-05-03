import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, MapPin } from 'lucide-react';
import { useJourney } from '../context/JourneyContext';

export default function JourneyMap() {
  const { profile } = useJourney();

  const milestones = [
    { id: 1, title: 'Check Registration', desc: 'Verify your name on the electoral roll.', status: profile.voterStatus.includes('Yes') ? 'completed' : 'current' },
    { id: 2, title: 'Understand EVM/VVPAT', desc: 'Learn how to cast your vote securely.', status: profile.voterStatus.includes('Yes') ? 'current' : 'locked' },
    { id: 3, title: 'Find Polling Booth', desc: 'Locate where you need to go on Election Day.', status: 'locked' },
    { id: 4, title: 'Vote!', desc: 'Exercise your democratic right.', status: 'locked' }
  ];

  return (
    <div className="bg-surface rounded-3xl p-8 border border-white/5 shadow-2xl">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
        <MapPin className="text-primary" /> Your Electoral Journey
      </h3>
      <div className="relative ml-4">
        {/* The line */}
        <div className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-white/10" />
        
        {milestones.map((m, idx) => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative flex gap-6 mb-10 last:mb-0 ${m.status === 'locked' ? 'opacity-50' : ''}`}
          >
            <div className="relative z-10 flex-shrink-0">
              {m.status === 'completed' && (
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center ring-4 ring-surface">
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
              {m.status === 'current' && (
                <div className="w-6 h-6 bg-primary rounded-full animate-pulse ring-4 ring-surface" />
              )}
              {m.status === 'locked' && (
                <div className="w-6 h-6 bg-surface border-2 border-white/20 rounded-full flex items-center justify-center ring-4 ring-surface">
                  <Circle className="w-3 h-3 text-white/20" />
                </div>
              )}
            </div>
            <div>
              <h4 className={`text-lg font-bold ${m.status === 'current' ? 'text-primary' : 'text-white'}`}>{m.title}</h4>
              <p className="text-gray-400 text-sm mt-1">{m.desc}</p>
              {m.status === 'current' && (
                <button className="mt-3 px-4 py-2 bg-primary/20 text-primary font-semibold rounded-lg text-sm hover:bg-primary/30 transition-colors">
                  Start Module
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
