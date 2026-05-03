import React from 'react';
import { CalendarDays, Map } from 'lucide-react';

export default function IndiaModule() {
  const states = [
    { name: "West Bengal", dates: "April - May 2026", status: "Upcoming" },
    { name: "Tamil Nadu", dates: "April - May 2026", status: "Upcoming" },
    { name: "Kerala", dates: "April - May 2026", status: "Upcoming" },
    { name: "Assam", dates: "April - May 2026", status: "Upcoming" },
    { name: "Puducherry", dates: "April - May 2026", status: "Upcoming" }
  ];

  return (
    <div className="bg-gradient-to-br from-[#FF9933]/10 via-surface to-[#138808]/10 rounded-2xl p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden mt-8">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="bg-[#FF9933]/20 p-3 rounded-full">
          <Map className="text-[#FF9933] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">India Module</h2>
          <p className="text-sm text-gray-400">2026 State Assembly Elections</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((state, idx) => (
          <div key={idx} className="bg-background/50 border border-white/5 rounded-xl p-4 hover:border-primary/50 transition-colors group">
            <h3 className="font-semibold text-lg text-white mb-2 group-hover:text-primary transition-colors">{state.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <CalendarDays className="w-4 h-4" />
              <span>{state.dates}</span>
            </div>
            <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs font-medium rounded-full">
              {state.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
