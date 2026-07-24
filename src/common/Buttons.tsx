import React from 'react';
import './css/buttons.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'negative' | 'action';
  block?: boolean;
}

export function Button({ variant = 'primary', block, className = '', children, ...props }: ButtonProps) {
  let inlineStyle: React.CSSProperties = { 
    width: block ? '100%' : 'auto',
    border: '1px solid var(--text-main)',
    background: variant === 'primary' ? 'var(--text-main)' : 'transparent',
    color: variant === 'primary' ? 'var(--bg-color)' : (variant === 'negative' ? 'var(--pop-amppari-red)' : 'var(--text-main)'),
    borderColor: variant === 'negative' ? 'var(--pop-amppari-red)' : 'var(--text-main)',
    padding: '12px 24px',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor: 'pointer',
    flex: block ? 'none' : 1
  };

  return (
    <button style={inlineStyle} {...props}>
      {children}
    </button>
  );
}