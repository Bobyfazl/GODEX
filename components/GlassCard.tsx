
'use client';

import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM as any;

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  as?: 'div' | 'link' | 'button' | 'a';
  to?: string;
  href?: string;
  onClick?: () => void;
  gradientColor?: 'indigo' | 'purple' | 'blue' | 'slate'; 
  [key: string]: any;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hoverEffect = true, 
  as = 'div',
  to,
  href,
  onClick,
  gradientColor = 'indigo',
  ...props 
}) => {
  
  const colorMap = {
    indigo: {
        shadow: 'group-hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.25)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(99,102,241,0.15)]',
        radial: 'bg-[radial-gradient(closest-side,rgba(99,102,241,0.18),transparent)]'
    },
    purple: {
        shadow: 'group-hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.25)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(168,85,247,0.15)]',
        radial: 'bg-[radial-gradient(closest-side,rgba(168,85,247,0.18),transparent)]'
    },
    blue: {
        shadow: 'group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.15)]',
        radial: 'bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent)]'
    },
    slate: {
        shadow: 'group-hover:shadow-[0_25px_50px_-12px_rgba(148,163,184,0.25)] dark:group-hover:shadow-[0_25px_50px_-12px_rgba(148,163,184,0.15)]',
        radial: 'bg-[radial-gradient(closest-side,rgba(148,163,184,0.12),transparent)]'
    }
  };

  const colors = colorMap[gradientColor];

  const baseStyles = `
    relative block
    overflow-hidden
    border border-white/60 dark:border-white/5
    transform-gpu backface-hidden
  `;

  const interactionStyles = hoverEffect ? `
    group
    cursor-pointer
    card-interactive
    shadow-sm
    ${colors.shadow}
    hover:border-white/80 dark:hover:border-white/20
  ` : '';

  const combinedClasses = `${baseStyles} ${interactionStyles} ${className}`;

  const InnerContent = () => (
    <>
      <div className="absolute inset-0 bg-white/80 dark:bg-[#0f172a]/40 backdrop-blur-md transition-all duration-1000 ease-apple" />
      
      {hoverEffect && (
        <div className="absolute inset-0 bg-white/95 dark:bg-[#0f172a]/70 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-apple" />
      )}
      
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none z-0" />
      
      {hoverEffect && (
        <div 
            className={`absolute -top-40 -right-40 w-96 h-96 ${colors.radial} opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-110 transition-all duration-[1500ms] ease-apple pointer-events-none z-0`} 
        />
      )}

      <div className="relative z-20 h-full">
        {children}
      </div>
    </>
  );

  // Map 'to' prop to React Router Link
  if (as === 'link' && to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        <InnerContent />
      </Link>
    );
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        <InnerContent />
      </a>
    );
  }

  if (as === 'button') {
    return (
      <button onClick={onClick} className={combinedClasses} {...props}>
        <InnerContent />
      </button>
    );
  }

  return (
    <div className={combinedClasses} {...props}>
      <InnerContent />
    </div>
  );
};
