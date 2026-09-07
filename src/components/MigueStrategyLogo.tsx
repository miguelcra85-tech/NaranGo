import React from 'react';

interface MigueStrategyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const MigueStrategyLogo: React.FC<MigueStrategyLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const shieldDimensions = {
    sm: 'w-8 h-10',
    md: 'w-10 h-12',
    lg: 'w-13 h-16',
  }[size];

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Escudo con Iniciales "MS" */}
      <div className={`relative ${shieldDimensions} flex-shrink-0`}>
        {/* Resplandor ambiental azul suave detrás del escudo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#00D2FF]/40 via-[#3B82F6]/30 to-transparent blur-[8px] opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <svg
          viewBox="0 0 100 118"
          className="relative w-full h-full drop-shadow-[0_4px_14px_rgba(0,210,255,0.45)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente exterior del borde del escudo */}
            <linearGradient id="msShieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="45%" stopColor="#38BDF8" />
              <stop offset="80%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>

            {/* Fondo oscuro profundo del escudo */}
            <linearGradient id="msShieldBody" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="50%" stopColor="#080D1A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Brillo interno superior */}
            <linearGradient id="msInnerReflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            {/* Gradiente azul para la letra S del monograma */}
            <linearGradient id="msLetterSGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38EFA0" stopOpacity="0" />
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="60%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>

          {/* Silueta exterior del Escudo */}
          <path
            d="M 50 4 L 90 16 C 90 60 72 98 50 114 C 28 98 10 60 10 16 Z"
            fill="url(#msShieldBody)"
            stroke="url(#msShieldBorder)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Bisel / Marco interior reflectante */}
          <path
            d="M 50 11 L 82 21 C 82 56 67 88 50 102 C 33 88 18 56 18 21 Z"
            fill="url(#msInnerReflection)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />

          {/* Cresta o divisor central sutil */}
          <line
            x1="50"
            y1="14"
            x2="50"
            y2="42"
            stroke="rgba(0, 210, 255, 0.4)"
            strokeWidth="1.2"
            strokeDasharray="2 3"
          />

          {/* Monograma "MS" Heráldico */}
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
            {/* Letra M (Blanco sólido con sombra profunda) */}
            <text
              x="36"
              y="74"
              textAnchor="middle"
              fontSize="38"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-2"
              fill="#FFFFFF"
            >
              M
            </text>

            {/* Letra S (Degradado azul brillante entrelazada) */}
            <text
              x="64"
              y="74"
              textAnchor="middle"
              fontSize="38"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-2"
              fill="url(#msLetterSGrad)"
            >
              S
            </text>
          </g>

          {/* Punto de luz inferior en el vértice del escudo */}
          <circle cx="50" cy="103" r="2" fill="#00D2FF" opacity="0.85" />
        </svg>
      </div>

      {/* Leyenda: "Migue Strategy" */}
      <div className="flex flex-col justify-center">
        <div className={`flex items-baseline gap-1.5 font-black tracking-tight leading-none ${titleSizes}`}>
          {/* "Migue" de un color blanco sólido */}
          <span className="text-white group-hover:text-gray-100 transition-colors">
            Migue
          </span>

          {/* "Strategy" degradado con azul */}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#3B82F6] bg-clip-text text-transparent font-black tracking-tight">
            Strategy
          </span>
        </div>

        {showSubtitle && (
          <span className="text-[10px] text-gray-400 group-hover:text-gray-300 font-medium tracking-wider uppercase mt-1 transition-colors">
            Marketing & Growth
          </span>
        )}
      </div>
    </div>
  );
};
