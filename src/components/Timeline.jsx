import React from 'react';
import Card from './Card';
import Badge from './Badge';

export default function Timeline({ events }) {
  return (
    <div className="relative border-l border-white/10 ml-4 py-2 space-y-8">
      {events.map((event, idx) => {
        const isCurrent = event.status === 'current';
        const isPast = event.status === 'past';
        const isFuture = event.status === 'future';

        let dotClass = 'border-slate-600 bg-white/5';
        if (isPast) dotClass = 'border-transparent bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-[0_0_10px_rgba(16,185,129,0.5)]';
        if (isCurrent) dotClass = 'border-transparent bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] animate-pulse-ring shadow-[0_0_15px_rgba(245,158,11,0.6)]';

        return (
          <div key={idx} className="relative pl-8">
            {/* Timeline Dot */}
            <div 
              className={`absolute -left-[5px] top-4 w-[9px] h-[9px] rounded-full border-2 ${dotClass}`} 
            />
            
            <Card 
              className={`${isCurrent ? 'border-l-4 border-l-[#f59e0b]' : ''} ${event.highlight ? 'bg-gradient-to-br from-navy-card to-saffron/10 border-saffron/30' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-display font-bold text-white text-lg">{event.title}</h4>
                <Badge variant={isPast ? 'green' : isCurrent ? 'amber' : 'gray'}>
                  {event.date}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 mb-0">
                {event.description}
              </p>
              {isCurrent && event.action && (
                <div className="mt-4">
                  {event.action}
                </div>
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
