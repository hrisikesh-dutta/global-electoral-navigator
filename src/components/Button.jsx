import React from 'react';

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button', disabled = false }) {
  const baseClass = variant === 'ghost' ? 'btn-ghost' : 'btn-primary';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button 
      type={type} 
      className={`${baseClass} ${disabledClass} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
