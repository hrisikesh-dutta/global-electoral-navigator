import React from 'react';

export default function Card({ children, className = '', accent = '', hover = false }) {
  const accentClass = accent ? `accent-${accent}` : '';
  const hoverClass = hover ? 'card-hover' : '';
  
  return (
    <div className={`glass-card ${accentClass} ${hoverClass} p-5 ${className}`}>
      {children}
    </div>
  );
}
