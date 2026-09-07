import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Minimalist Orange Slice inside Glowing Circle */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group`}>
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#FFB347] blur-[8px] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="naranOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8F3D" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#D94E00" />
            </linearGradient>
            <linearGradient id="naranSliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="100%" stopColor="#FFB347" />
            </linearGradient>
          </defs>

          {/* Outer circle / rind */}
          <circle cx="50" cy="50" r="46" fill="url(#naranOrangeGrad)" stroke="#FFE2B8" strokeWidth="2.5" />

          {/* Inner ring */}
          <circle cx="50" cy="50" r="38" fill="#FF5500" opacity="0.9" />

          {/* Stylized orange slice pulp segments */}
          {/* Segment 1 */}
          <path d="M50 48 L32 30 A 24 24 0 0 1 48 24 Z" fill="url(#naranSliceGrad)" />
          {/* Segment 2 */}
          <path d="M52 48 L52 24 A 24 24 0 0 1 68 30 Z" fill="url(#naranSliceGrad)" />
          {/* Segment 3 */}
          <path d="M52 50 L70 34 A 24 24 0 0 1 76 50 Z" fill="url(#naranSliceGrad)" />
          {/* Segment 4 */}
          <path d="M52 52 L76 52 A 24 24 0 0 1 68 70 Z" fill="url(#naranSliceGrad)" />
          {/* Segment 5 */}
          <path d="M50 52 L50 76 A 24 24 0 0 1 32 70 Z" fill="url(#naranSliceGrad)" />
          {/* Segment 6 */}
          <path d="M48 50 L24 50 A 24 24 0 0 1 30 34 Z" fill="url(#naranSliceGrad)" />

          {/* Center core pip */}
          <circle cx="50" cy="50" r="5" fill="#FFF2D6" />
          
          {/* Tropical leaf accent */}
          <path
            d="M50 6 C62 0 74 6 72 16 C62 18 52 14 50 6 Z"
            fill="#38EFA0"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex items-baseline tracking-tight font-extrabold leading-none">
          <span className={`font-heading ${textSizes[size]} text-white`}>Naran</span>
          <span className={`font-heading ${textSizes[size]} text-[#FF6B00] ml-1 tracking-wider`}>Go</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#38EFA0] ml-1 inline-block shadow-[0_0_8px_#38EFA0]"></span>
        </div>
      )}
    </div>
  );
};
