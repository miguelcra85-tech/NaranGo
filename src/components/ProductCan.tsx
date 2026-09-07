import React from 'react';
import { Flavor } from '../types';

interface ProductCanProps {
  flavor: Flavor;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  animate?: boolean;
}

export const ProductCan: React.FC<ProductCanProps> = ({
  flavor,
  size = 'md',
  className = '',
  animate = true,
}) => {
  const sizeClasses = {
    sm: 'w-24 h-48',
    md: 'w-36 h-72',
    lg: 'w-48 h-96',
    hero: 'w-64 h-[480px] sm:w-80 sm:h-[580px]',
  };

  const isEnergy = flavor.id === 'blueberry-energy';

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses[size]} ${className}`}>
      {/* Dynamic Ambient Backlight matching flavor color */}
      <div
        className={`absolute inset-0 rounded-full blur-[45px] transition-all duration-700 pointer-events-none ${animate ? 'animate-pulse-glow' : ''}`}
        style={{
          background: flavor.glowColor,
          transform: 'scale(0.85)',
        }}
      />

      {/* Floating Water Droplet Particles */}
      <div className="absolute -top-3 -right-2 w-3 h-3 rounded-full bg-white/70 blur-[0.5px] shadow-[0_0_8px_white] animate-subtle-float" />
      <div className="absolute top-1/3 -left-3 w-2.5 h-2.5 rounded-full bg-cyan-200/80 blur-[0.5px] shadow-[0_0_6px_cyan] animate-float-reverse" />
      <div className="absolute bottom-12 -right-3 w-2 h-2 rounded-full bg-white/80 blur-[0.5px]" />

      {/* Realistic 3D Rendered Aluminum Slim Can SVG */}
      <svg
        viewBox="0 0 160 360"
        className="w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)] filter transition-transform duration-500 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Can Rim Metallic Gradient */}
          <linearGradient id={`canTopRim-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A8F98" />
            <stop offset="20%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Can Body Main Gradient */}
          <linearGradient id={`canBodyGrad-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isEnergy ? '#070913' : '#14141E'} />
            <stop offset="15%" stopColor={flavor.color} />
            <stop offset="45%" stopColor={isEnergy ? '#0A1128' : flavor.accentColor} />
            <stop offset="70%" stopColor={flavor.color} />
            <stop offset="90%" stopColor={isEnergy ? '#05050A' : '#101018'} />
            <stop offset="100%" stopColor="#050508" />
          </linearGradient>

          {/* Specular Cylindrical Reflection */}
          <linearGradient id={`cylindricalHighlight-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="28%" stopColor="white" stopOpacity="0.05" />
            <stop offset="35%" stopColor="white" stopOpacity="0.55" />
            <stop offset="42%" stopColor="white" stopOpacity="0.1" />
            <stop offset="85%" stopColor="white" stopOpacity="0" />
            <stop offset="96%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Soft Shadow Under Top Lip */}
          <linearGradient id={`lipShadow-${flavor.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="black" stopOpacity="0.6" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </linearGradient>

          {/* Base bottom metallic taper */}
          <linearGradient id={`bottomBase-${flavor.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* 1. TOP LID / RIM */}
        {/* Top oval lip rim */}
        <ellipse cx="80" cy="22" rx="46" ry="11" fill={`url(#canTopRim-${flavor.id})`} stroke="#CBD5E1" strokeWidth="1" />
        <ellipse cx="80" cy="21" rx="42" ry="9" fill="#1E293B" opacity="0.6" />
        {/* Pull tab outline */}
        <path d="M74 18 C74 15 86 15 86 18 C86 21 82 23 80 23 C78 23 74 21 74 18 Z" fill="#E2E8F0" />
        <circle cx="80" cy="18" r="2" fill="#0F172A" />

        {/* Top Neck Slope */}
        <path
          d="M34 22 C34 27 30 36 24 45 L136 45 C130 36 126 27 126 22 Z"
          fill={`url(#canTopRim-${flavor.id})`}
        />

        {/* Top Rim Seam Shadow */}
        <rect x="24" y="44" width="112" height="3" fill="#0F172A" opacity="0.5" />

        {/* 2. CAN CYLINDRICAL MAIN BODY */}
        <rect
          x="24"
          y="46"
          width="112"
          height="270"
          rx="4"
          fill={`url(#canBodyGrad-${flavor.id})`}
        />

        {/* Can Graphic Details per Flavor */}
        {isEnergy ? (
          /* BlueBerry Energy - Dark Panther & Lightning */
          <g>
            {/* Electric lightning streaks */}
            <path
              d="M70 60 L85 100 L74 110 L94 165 L65 175 L80 230"
              stroke="#00D2FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #00D2FF)"
              opacity="0.9"
            />
            <path
              d="M90 85 L100 120 L92 128 L108 175"
              stroke="#7928CA"
              strokeWidth="1.8"
              opacity="0.75"
            />
            {/* Glowing Panther Eyes Silhouette */}
            <ellipse cx="65" cy="140" rx="8" ry="3.5" fill="#00D2FF" transform="rotate(-10 65 140)" />
            <ellipse cx="95" cy="140" rx="8" ry="3.5" fill="#00D2FF" transform="rotate(10 95 140)" />
            <circle cx="65" cy="140" r="1.5" fill="#FFFFFF" />
            <circle cx="95" cy="140" r="1.5" fill="#FFFFFF" />
            
            <text x="80" y="200" fill="#00D2FF" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="3" filter="drop-shadow(0 0 6px #00D2FF)">
              ENERGY LAB
            </text>
          </g>
        ) : (
          /* Fresh Fruit Slice & Water Wave Graphics */
          <g opacity="0.85">
            {/* Ambient sun/slice circle */}
            <circle cx="80" cy="140" r="32" fill="white" opacity="0.12" />
            <circle cx="80" cy="140" r="26" stroke="white" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
            
            {/* Tropical leaf wave */}
            <path
              d="M30 190 Q60 170 80 185 T130 175"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M30 205 Q60 185 80 200 T130 190"
              stroke={flavor.accentColor}
              strokeWidth="2"
              fill="none"
              opacity="0.4"
            />

            {/* Central icon or fruit silhouette */}
            <circle cx="80" cy="140" r="15" fill={flavor.accentColor} opacity="0.7" />
            <circle cx="80" cy="140" r="10" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}

        {/* 3. BRAND WORDMARK ON CAN */}
        {/* Brand Name "Naran Go" */}
        <text
          x="80"
          y="105"
          fill="#FFFFFF"
          fontSize="17"
          fontWeight="900"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          letterSpacing="1.5"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
        >
          {flavor.name.toUpperCase()}
        </text>

        {/* Flavor Subtitle */}
        <text
          x="80"
          y="120"
          fill={isEnergy ? '#00D2FF' : '#FFE8B8'}
          fontSize="8"
          fontWeight="700"
          fontFamily="Plus Jakarta Sans, sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          {flavor.subtitle.toUpperCase()}
        </text>

        {/* Features badges on can */}
        <g transform="translate(48, 230)">
          <rect x="0" y="0" width="64" height="15" rx="7.5" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <text x="32" y="10.5" fill="#FFFFFF" fontSize="7" fontWeight="600" textAnchor="middle">
            {flavor.calories} KCAL • {flavor.volume.split('/')[0]}
          </text>
        </g>

        <g transform="translate(40, 252)">
          <text x="40" y="9" fill="rgba(255,255,255,0.7)" fontSize="6.5" fontWeight="500" textAnchor="middle" letterSpacing="0.5">
            PREMIUM COLD PRESSED
          </text>
        </g>

        {/* Condensation Droplets on Surface (Ultra-premium crisp touch) */}
        <g opacity="0.75">
          <ellipse cx="45" cy="80" rx="1.8" ry="2.2" fill="#FFFFFF" opacity="0.8" />
          <ellipse cx="46" cy="81" rx="1.2" ry="1.4" fill="rgba(0,0,0,0.3)" />

          <ellipse cx="62" cy="115" rx="1.5" ry="1.9" fill="#FFFFFF" opacity="0.8" />
          <ellipse cx="112" cy="95" rx="2" ry="2.5" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="118" cy="160" rx="1.8" ry="2.2" fill="#FFFFFF" opacity="0.75" />
          
          <ellipse cx="40" cy="180" rx="2.2" ry="3" fill="#FFFFFF" opacity="0.85" />
          <path d="M40 183 Q39 195 40 200" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" />

          <ellipse cx="110" cy="225" rx="2.5" ry="3.2" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="55" cy="270" rx="1.6" ry="2.1" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* Cylindrical Glass / Aluminum Specular Sheen Overlay */}
        <rect
          x="24"
          y="46"
          width="112"
          height="270"
          rx="4"
          fill={`url(#cylindricalHighlight-${flavor.id})`}
          pointerEvents="none"
        />

        {/* 4. CAN BOTTOM TAPER & BASE */}
        <path
          d="M24 316 C30 324 36 332 38 338 L122 338 C124 332 130 324 136 316 Z"
          fill={`url(#bottomBase-${flavor.id})`}
        />
        {/* Bottom edge rim */}
        <ellipse cx="80" cy="338" rx="42" ry="5.5" fill="#334155" />
        <ellipse cx="80" cy="337" rx="38" ry="4" fill="#0F172A" />

        {/* Bottom contact shadow */}
        <ellipse cx="80" cy="354" rx="55" ry="6" fill="#000000" opacity="0.6" />
      </svg>
    </div>
  );
};
