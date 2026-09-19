import React, { useState } from 'react';
import { Flavor } from '../types';
import { useCard3D } from './Card3D';
import { ProductCan } from './ProductCan';

interface ProductVisualProps {
  flavor: Flavor;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  enablePopOut?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  flavor,
  size = 'md',
  className = '',
  enablePopOut = true,
}) => {
  const { rotation, isHovered } = useCard3D();
  const [imageError, setImageError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);
  const isEnergy = flavor.id === 'blueberry-energy';

  // Sizing heights for images - Blueberry Energy is given extra scale and height to fill the card
  const sizeHeightClass = {
    sm: isEnergy ? 'max-h-[220px]' : 'max-h-[200px]',
    md: isEnergy ? 'max-h-[340px] sm:max-h-[360px]' : 'max-h-[290px]',
    lg: isEnergy ? 'max-h-[420px]' : 'max-h-[360px]',
    hero: 'max-h-[460px] sm:max-h-[520px]',
  }[size];

  // Parallax calculations: The bottle moves at a distinct rate from the card container
  const parallaxX = rotation.y * 1.6;
  const parallaxY = -rotation.x * 1.6;

  // Pop-out translation: lifts out over the top border of the card on hover
  const popOutY = enablePopOut && isHovered ? -16 : 0;
  const popOutScale = enablePopOut && isHovered ? 1.06 : 1.0;

  // Floating particles parallax (layer 3) moves even faster
  const particleParallaxX = rotation.y * 2.6;
  const particleParallaxY = -rotation.x * 2.6;

  // Determine current image source
  const rawImageSrc =
    triedFallback && flavor.id === 'pina-go'
      ? '/pina-go.webp'
      : flavor.imageFile;
  const imageSrc = rawImageSrc
    ? rawImageSrc.startsWith('http')
      ? rawImageSrc
      : `${import.meta.env.BASE_URL}${rawImageSrc.replace(/^\.?\//, '')}`
    : undefined;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ========================================================
          LAYER 1: (z-10) Resplandor por sabor (Ambient Inner Glow)
          ======================================================== */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${flavor.glowHex || flavor.color} 0%, transparent 70%)`,
          filter: 'blur(55px)',
          opacity: isHovered ? 0.85 : 0.45,
          transform: `scale(${isHovered ? 1.2 : 0.9}) translateZ(10px)`,
          willChange: 'transform, opacity',
          zIndex: 10,
        }}
      />

      {/* ========================================================
          LAYER 2: (z-20) Silueta del Producto (Pop-out & Parallax)
          ======================================================== */}
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY + popOutY}px, 45px) rotateX(${
            rotation.x * 1.2
          }deg) rotateY(${rotation.y * 1.2}deg) scale(${popOutScale})`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          zIndex: 20,
          /* Drop-Shadow suave por CSS para dar sensación de peso y profundidad real */
          filter: isHovered
            ? 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.55)) drop-shadow(0 30px 45px rgba(0, 0, 0, 0.4))'
            : 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45))',
        }}
      >
        {/* Render uploaded image file */}
        {imageSrc && !imageError ? (
          <div className="relative group flex items-center justify-center">
            <img
              src={imageSrc}
              alt={`${flavor.name} - Bebida tropical natural ${flavor.subtitle} en lata 355ml`}
              loading={size === 'hero' ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={size === 'hero' ? 'high' : 'auto'}
              referrerPolicy="no-referrer"
              onError={() => {
                if (!triedFallback && flavor.id === 'pina-go') {
                  setTriedFallback(true);
                } else {
                  setImageError(true);
                }
              }}
              className={`${sizeHeightClass} w-auto object-contain pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)] ${
                isEnergy ? 'scale-115 sm:scale-125 my-[-6px]' : ''
              }`}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            />
          </div>
        ) : (
          <ProductCan flavor={flavor} size={size} animate={false} />
        )}
      </div>

      {/* ========================================================
          LAYER 3: (z-30) Partículas Flotantes, Frutas & Destellos
          (Por encima del producto, pero por debajo de la interfaz)
          ======================================================== */}
      <div
        className="pointer-events-none absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${particleParallaxX}px, ${particleParallaxY}px, 70px)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          zIndex: 30,
        }}
      >
        {/* Top-Right Water Droplet Sparkle */}
        <div
          className="absolute -top-3 right-4 w-3.5 h-3.5 rounded-full bg-white/80 blur-[0.6px] shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-subtle-float"
          style={{ animationDuration: '3.5s' }}
        />

        {/* Left Floating Light Sparkle */}
        <div
          className="absolute top-1/4 -left-2 w-2.5 h-2.5 rounded-full blur-[0.5px] animate-float-reverse"
          style={{
            backgroundColor: flavor.glowHex || flavor.accentColor,
            boxShadow: `0 0 10px ${flavor.glowHex || flavor.accentColor}`,
            animationDuration: '4.2s',
          }}
        />

        {/* Bottom Droplet */}
        <div
          className="absolute bottom-6 right-2 w-2 h-2 rounded-full bg-white/70 blur-[0.4px] shadow-[0_0_6px_white] animate-subtle-float"
          style={{ animationDuration: '4.8s' }}
        />

        {/* Dynamic Energy Lightning Sparks or Fruit Splash Glow */}
        {isEnergy ? (
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <div className="absolute top-10 left-6 w-1.5 h-6 bg-cyan-300 rounded-full blur-[1px] shadow-[0_0_10px_#00D2FF] rotate-45 animate-pulse" />
            <div className="absolute bottom-16 right-6 w-2 h-7 bg-blue-400 rounded-full blur-[1px] shadow-[0_0_12px_#3B82F6] -rotate-12 animate-pulse" />
          </div>
        ) : (
          <div
            className="absolute -bottom-2 -left-1 w-4 h-4 rounded-full blur-[1px] opacity-70 transition-transform duration-500"
            style={{
              background: `radial-gradient(circle, ${flavor.accentColor}, transparent)`,
              transform: isHovered ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        )}
      </div>
    </div>
  );
};
