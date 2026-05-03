import React from 'react';

const variantStyles = {
  amber: 'bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/10 text-[#fbbf24] border-[#f59e0b]/30',
  teal: 'bg-gradient-to-r from-[#14b8a6]/20 to-[#0891b2]/10 text-[#2dd4bf] border-[#14b8a6]/30',
  green: 'bg-gradient-to-r from-[#10b981]/20 to-[#059669]/10 text-[#34d399] border-[#10b981]/30',
  red: 'bg-gradient-to-r from-[#ef4444]/20 to-[#b91c1c]/10 text-[#f87171] border-[#ef4444]/30',
  gray: 'bg-gradient-to-r from-white/10 to-white/5 text-[#94a3b8] border-white/10',
  blue: 'bg-gradient-to-r from-[#3b82f6]/20 to-[#2563eb]/10 text-[#60a5fa] border-[#3b82f6]/30',
  purple: 'bg-gradient-to-r from-[#8b5cf6]/20 to-[#6d28d9]/10 text-[#a78bfa] border-[#8b5cf6]/30',
};

export default function Badge({ children, variant = 'gray', className = '' }) {
  const baseStyle = 'rounded-full uppercase text-[10px] font-mono tracking-[0.06em] border px-2 py-0.5 inline-flex items-center justify-center backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.1)]';
  const appliedStyle = variantStyles[variant] || variantStyles.gray;

  return (
    <span className={`${baseStyle} ${appliedStyle} ${className}`}>
      {children}
    </span>
  );
}
