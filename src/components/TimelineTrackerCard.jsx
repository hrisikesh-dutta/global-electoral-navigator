import React from 'react';
import { Clock } from 'lucide-react';

export default function TimelineTrackerCard() {
  const events = [
    { date: 'Oct 1, 2025', title: 'Voter Registration Opens' },
    { date: 'Jan 15, 2026', title: 'Deadline for Mail-in Request' },
    { date: 'Apr 4, 2026', title: 'Early Voting Begins' },
    { date: 'May 1, 2026', title: 'Election Day' },
  ];

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-xl border border-white/5 h-full">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" /> Timeline
      </h3>
      <div className="relative border-l border-gray-700 ml-3 space-y-6">
        {events.map((evt, idx) => (
          <div key={idx} className="relative pl-6">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 ring-4 ring-surface" />
            <div className="text-xs text-secondary font-bold mb-1">{evt.date}</div>
            <div className="text-sm text-gray-300">{evt.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
