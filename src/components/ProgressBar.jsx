import React from 'react';

export default function ProgressBar({ readiness }) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-white/10 p-4 shadow-md backdrop-blur-md bg-opacity-80">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <span className="font-semibold text-sm text-primary uppercase tracking-wider">Voter Readiness</span>
        <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${readiness}%` }}
          />
        </div>
        <span className="font-bold text-sm text-secondary">{readiness}%</span>
      </div>
    </div>
  );
}
