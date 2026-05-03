import React from 'react';
import { Check, Lock, ChevronDown } from 'lucide-react';
import Badge from './Badge';
import Card from './Card';

export default function GateStep({ 
  status = 'locked', // locked, active, complete
  title, 
  description, 
  stepNumber,
  children 
}) {
  const isComplete = status === 'complete';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  let iconContent = <Lock size={16} className="text-slate-400" />;
  let iconBg = 'bg-slate-800 border-slate-700';
  let badgeVariant = 'gray';
  let badgeText = 'Locked';

  if (isComplete) {
    iconContent = <Check size={16} className="text-[#10b981]" />;
    iconBg = 'bg-[#10b981]/10 border-[#10b981]/30';
    badgeVariant = 'green';
    badgeText = 'Complete';
  } else if (isActive) {
    iconContent = <div className="w-2.5 h-2.5 bg-[#f59e0b] rotate-45 animate-pulse" />;
    iconBg = 'bg-[#f59e0b]/10 border-[#f59e0b]/30 animate-pulse-ring';
    badgeVariant = 'amber';
    badgeText = 'In Progress';
  }

  const cardBorderClass = isComplete ? 'flash-complete shadow-[0_0_16px_rgba(16,185,129,0.12)]' : isActive ? 'border-[#f59e0b]/50 animate-glow-pulse' : 'border-white/5 opacity-60';

  return (
    <div className={`transition-all duration-300 ${isLocked ? 'opacity-60 grayscale-[0.5]' : ''}`}>
      <Card className={`border ${cardBorderClass} overflow-hidden transition-all duration-500`}>
        <div className="flex items-start gap-4">
          <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${iconBg}`}>
            {iconContent}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="text-slate-500 text-sm font-mono tracking-wider">S{stepNumber}</span>
                {title}
              </h3>
              <Badge variant={badgeVariant}>{badgeText}</Badge>
            </div>
            <p className="text-slate-400 text-sm mb-0">
              {description}
            </p>
            
            {/* Expanded Content for Active State */}
            {isActive && (
              <div className="mt-6 pt-4 border-t border-white/10 animate-[fadeIn_0.3s_ease-in-out]">
                {children}
              </div>
            )}
            
            {/* Summary info for Complete State */}
            {isComplete && children && (
               <div className="mt-4 pt-4 border-t border-white/5 text-sm text-slate-300">
                 {/* When complete, we might pass a summary to children or a prop. We assume caller handles it via conditional rendering */}
                 {children}
               </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
