import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Timeline from '../components/Timeline';
import Button from '../components/Button';

const events = [
  {
    title: 'Model Code of Conduct Announced',
    date: 'Feb 15, 2026',
    description: 'ECI announces election dates; MCC comes into effect immediately.',
    status: 'past'
  },
  {
    title: 'Voter Roll Modification Window',
    date: 'Feb 20 - Mar 1, 2026',
    description: 'Final opportunity to add or correct names in the electoral roll.',
    status: 'current',
    action: <Button variant="ghost" className="border-[#f59e0b] text-[#f59e0b]">Verify Name</Button>
  },
  {
    title: 'Filing of Nominations Starts',
    date: 'Mar 5, 2026',
    description: 'Candidates can start filing their official nomination papers.',
    status: 'future'
  },
  {
    title: 'Final Candidate List Published',
    date: 'Mar 18, 2026',
    description: 'Withdrawal period ends and the final list of contesting candidates is published.',
    status: 'future'
  },
  {
    title: 'Campaign Silence Period',
    date: 'Apr 18, 2026',
    description: 'All public campaigning must stop 48 hours before polling begins.',
    status: 'future'
  },
  {
    title: 'POLLING DAY (Phase 7)',
    date: 'May 20, 2026',
    description: 'Voting day for Kolkata Paschim constituency.',
    status: 'future',
    highlight: true
  }
];

export default function TimelinePage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Election Timeline</h1>
          <p className="text-slate-400">Key dates for West Bengal · Phase 7</p>
        </div>
        <Button variant="ghost" className="flex items-center gap-2">
          <Calendar size={16} /> <span className="hidden sm:inline">Export to Calendar</span>
        </Button>
      </div>

      <Timeline events={events} />
      
    </motion.div>
  );
}
