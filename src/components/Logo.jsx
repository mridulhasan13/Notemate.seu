import React from 'react';

export default function Logo({ className = '', style = {} }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 95" 
      className={className} 
      style={{ width: 'auto', height: '100%', ...style }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eb6a4c" />
          <stop offset="100%" stopColor="#7a4b41" />
        </linearGradient>
      </defs>
      
      {/* Outer Rectangle with cutouts */}
      <path 
        d="M20 90 L20 20 L80 20 L80 40 L70 50 L70 28 L28 28 L28 78 L20 86 Z" 
        fill="url(#logoGrad)" 
      />
      <path 
        d="M30 85 L80 85 L80 45 L70 55 L70 78 L38 78 Z" 
        fill="url(#logoGrad)"
      />

      {/* Main diagonal line */}
      <path 
        d="M10 85 L75 35" 
        stroke="url(#logoGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* Center circle */}
      <circle cx="60" cy="55" r="9" fill="transparent" stroke="url(#logoGrad)" strokeWidth="5" />

      {/* Left side inner shape */}
      <path 
        d="M35 70 L35 55 A 5 5 0 0 1 40 50 L48 50" 
        fill="none" 
        stroke="url(#logoGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />

      {/* Bottom zig-zag mountain shapes */}
      <path 
        d="M40 80 L50 70 L60 80 M50 70 L55 60 L70 80" 
        fill="none" 
        stroke="url(#logoGrad)" 
        strokeWidth="5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
