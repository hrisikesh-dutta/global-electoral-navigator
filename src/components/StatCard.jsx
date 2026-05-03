import React from 'react';
import Card from './Card';

export default function StatCard({ value, label, color = 'amber' }) {
  const gradientMap = {
    teal: 'linear-gradient(135deg, #14b8a6, #0891b2)',
    amber: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    blue: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    green: 'linear-gradient(135deg, #10b981, #34d399)',
    purple: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
  };
  
  return (
    <Card className="flex flex-col items-center justify-center text-center !bg-white/5 border-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div 
        className="text-4xl font-display font-bold mb-1"
        style={{
          background: gradientMap[color] || gradientMap.amber,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        {value}
      </div>
      <div className="text-sm text-slate-400 font-mono uppercase tracking-wider">
        {label}
      </div>
    </Card>
  );
}
