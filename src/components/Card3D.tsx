import React, { useRef, useState, MouseEvent, createContext, useContext } from 'react';

export interface Card3DContextValue {
  rotation: { x: number; y: number };
  isHovered: boolean;
  mousePos: { x: number; y: number };
}

export const Card3DContext = createContext<Card3DContextValue>({
  rotation: { x: 0, y: 0 },
  isHovered: false,
  mousePos: { x: 0, y: 0 },
});

export const useCard3D = () => useContext(Card3DContext);

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees
  glare?: boolean;
  overflowVisible?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 8,
  glare = true,
  overflowVisible = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalise from -1 to 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setMousePos({ x: normX, y: normY });

    setRotation({
      x: -normY * maxTilt,
      y: normX * maxTilt,
    });

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.25,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <Card3DContext.Provider value={{ rotation, isHovered, mousePos }}>
      <div
        style={{ perspective: '1000px' }}
        className={`relative ${overflowVisible ? 'overflow-visible' : ''} ${className}`}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
              isHovered ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'
            }`,
            transformStyle: 'preserve-3d',
            transition: isHovered
              ? 'transform 0.12s ease-out'
              : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`w-full h-full relative ${overflowVisible ? 'overflow-visible' : ''}`}
        >
          {children}

          {/* Dynamic Specular Glare */}
          {glare && (
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
              style={{
                opacity: glarePos.opacity,
                background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35), transparent 70%)`,
              }}
            />
          )}
        </div>
      </div>
    </Card3DContext.Provider>
  );
};
