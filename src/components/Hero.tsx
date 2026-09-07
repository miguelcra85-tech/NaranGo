import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Droplets, ShieldCheck, Flame } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { ProductVisual } from './ProductVisual';

interface HeroProps {
  onExploreFlavors: () => void;
  onExploreProduct: () => void;
  onAddToCart: (flavorId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFlavors,
  onExploreProduct,
  onAddToCart,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const flagship = FLAVORS[0]; // Naran Go Mango & Orange

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20 md:py-32"
    >
      {/* Ambient Lighting & Warm Orange Light Leaks over the Fixed Background */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        {/* Cinematic Warm Orange & Gold Light Leaks */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#FF6B00]/25 blur-[130px] animate-pulse-glow"
          style={{
            transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full bg-[#FFB347]/20 blur-[140px] animate-subtle-float"
          style={{
            transform: `translate(${-mousePos.x * 30}px, ${-mousePos.y * 30}px)`,
          }}
        />
        <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-[#38EFA0]/10 blur-[120px]" />
      </div>

      {/* Floating 3D Fruits, Mint Leaves and Ice Cubes with Parallax Depth */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Floating Orange Slice (Top Right) */}
        <div
          className="absolute top-28 right-[8%] sm:right-[15%] w-24 sm:w-32 h-24 sm:h-32 transition-transform duration-300 ease-out animate-subtle-float"
          style={{
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px) rotate(${15 + mousePos.x * 8}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_25px_rgba(255,107,0,0.5)]">
            <circle cx="50" cy="50" r="46" fill="#FF6B00" stroke="#FFD180" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="38" fill="#FF8F3D" />
            <path d="M50 50 L30 20 A 40 40 0 0 1 70 20 Z" fill="#FFE2B8" opacity="0.95" />
            <path d="M50 50 L80 35 A 40 40 0 0 1 85 68 Z" fill="#FFE2B8" opacity="0.95" />
            <path d="M50 50 L75 80 A 40 40 0 0 1 35 85 Z" fill="#FFE2B8" opacity="0.95" />
            <path d="M50 50 L18 65 A 40 40 0 0 1 20 32 Z" fill="#FFE2B8" opacity="0.95" />
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Floating Crystalline Ice Cube (Top Left) */}
        <div
          className="absolute top-36 left-[5%] sm:left-[12%] w-16 sm:w-20 h-16 sm:h-20 transition-transform duration-300 ease-out animate-float-reverse"
          style={{
            transform: `translate(${-mousePos.x * 25}px, ${-mousePos.y * 25}px) rotate(${-10 + mousePos.y * 6}deg)`,
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-white/20 via-cyan-100/30 to-white/60 backdrop-blur-md border border-white/40 shadow-[0_15px_30px_rgba(0,210,255,0.25)] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/70 blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Floating Tropical Mint Leaf (Bottom Left) */}
        <div
          className="absolute bottom-28 left-[10%] w-14 sm:w-16 h-14 sm:h-16 transition-transform duration-300 ease-out animate-subtle-float"
          style={{
            transform: `translate(${mousePos.x * 20}px, ${-mousePos.y * 20}px) rotate(${45 + mousePos.x * 12}deg)`,
          }}
        >
          <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-[0_10px_20px_rgba(56,239,160,0.35)]">
            <path
              d="M10 50 C10 20 30 10 50 10 C50 40 30 50 10 50 Z"
              fill="url(#mintGrad)"
            />
            <path d="M12 48 Q30 30 48 12" stroke="#A7F3D0" strokeWidth="1.5" fill="none" opacity="0.8" />
            <defs>
              <linearGradient id="mintGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#38EFA0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Golden Mango Wedge (Bottom Right) */}
        <div
          className="absolute bottom-24 right-[12%] w-20 sm:w-24 h-16 sm:h-20 transition-transform duration-300 ease-out animate-float-reverse"
          style={{
            transform: `translate(${-mousePos.x * 28}px, ${mousePos.y * 28}px) rotate(${-25 + mousePos.y * 10}deg)`,
          }}
        >
          <svg viewBox="0 0 80 60" className="w-full h-full drop-shadow-[0_15px_25px_rgba(255,179,71,0.4)]">
            <path
              d="M10 50 C20 15 65 10 75 35 C65 55 25 55 10 50 Z"
              fill="url(#mangoGrad)"
            />
            <defs>
              <linearGradient id="mangoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="50%" stopColor="#FFB347" />
                <stop offset="100%" stopColor="#FF6B00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines, Credibility & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Eyebrow */}
            <div
              id="hero-eyebrow"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,107,0,0.15)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-200 tracking-wide uppercase">
                Edición Limitada de Cosecha 2026
              </span>
              <span className="text-xs text-[#FFB347] font-bold">★ Cero Azúcar Añadida</span>
            </div>

            {/* Large Bold Headline */}
            <h1
              id="hero-headline"
              className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-2xl"
            >
              El sabor que te hace{' '}
              <span className="text-gradient-orange inline-block drop-shadow-[0_4px_30px_rgba(255,107,0,0.5)]">
                Naran Go
              </span>
            </h1>

            {/* Subheadline with elegant spacing */}
            <p
              id="hero-subheadline"
              className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-xl mb-9"
            >
              Una explosión botánica de cítricos puros prensados en frío, mango silvestre y electrolitos minerales.
              Sin endulzantes artificiales, con la energía radiante del sol caribeño.
            </p>

            {/* Two CTAs: primary gradient button + secondary glass button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              {/* Primary Gradient CTA */}
              <button
                id="hero-cta-primary"
                onClick={onExploreFlavors}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFB347] text-white font-bold text-base flex items-center justify-center gap-3 shadow-[0_12px_35px_rgba(255,107,0,0.45)] hover:shadow-[0_16px_45px_rgba(255,107,0,0.65)] hover:scale-[1.03] transition-all duration-300 group cursor-pointer"
              >
                <span>Explorar los 7 Sabores</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Glass CTA */}
              <button
                id="hero-cta-secondary"
                onClick={onExploreProduct}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-white font-semibold text-base backdrop-blur-xl flex items-center justify-center gap-2.5 transition-all duration-300 hover:border-white/40 cursor-pointer shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#FFB347]" />
                <span>Nuestra Fórmula Artesanal</span>
              </button>
            </div>

            {/* Trust Highlights Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 w-full max-w-lg">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-white font-bold text-base sm:text-lg">
                  <Droplets className="w-4 h-4 text-[#38EFA0]" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-gray-400">Fruta Natural HPP</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-white font-bold text-base sm:text-lg">
                  <Flame className="w-4 h-4 text-[#FFB347]" />
                  <span>42 Kcal</span>
                </div>
                <span className="text-xs text-gray-400">Ligera & Vital</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-white font-bold text-base sm:text-lg">
                  <ShieldCheck className="w-4 h-4 text-[#00D2FF]" />
                  <span>0%</span>
                </div>
                <span className="text-xs text-gray-400">Azúcar Añadida</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Floating Product Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Center Stage Glowing Aura */}
            <div className="relative w-full max-w-md flex items-center justify-center">
              {/* Radial Backdrop Glow */}
              <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#FF6B00]/40 via-[#FFB347]/30 to-transparent blur-[60px] -z-10 animate-pulse-glow" />

              {/* Floating Can with Soft Interactive Tilt */}
              <div
                className="transition-transform duration-500 ease-out flex items-center justify-center"
                style={{
                  transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) rotate(${-mousePos.x * 4}deg)`,
                }}
              >
                <ProductVisual
                  flavor={flagship}
                  size="hero"
                  enablePopOut={false}
                />
              </div>

              {/* Floating Glass Pill Card 1: Bestseller */}
              <div
                className="absolute -top-4 -left-4 sm:left-2 bg-black/20 hover:bg-black/30 backdrop-blur-[2px] border border-white/20 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-3 transition-transform duration-300"
                style={{
                  transform: `translate(${-mousePos.x * 20}px, ${-mousePos.y * 20}px)`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/25 border border-[#FF6B00]/40 flex items-center justify-center text-[#FFB347] font-bold shadow-[0_0_15px_rgba(255,107,0,0.3)]">
                  ★
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">#1 en Preferencia</p>
                  <p className="text-[11px] text-gray-200">Mango & Naranja Silvestre</p>
                </div>
              </div>

              {/* Floating Glass Pill Card 2: Quick Action "Añadir a Carrito" */}
              <div
                className="absolute -bottom-6 -right-2 sm:right-4 bg-black/20 hover:bg-black/30 backdrop-blur-[2px] border border-white/20 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-3.5 transition-transform duration-300"
                style={{
                  transform: `translate(${mousePos.x * 22}px, ${mousePos.y * 22}px)`,
                }}
              >
                <div>
                  <p className="text-xs text-gray-200">Precio especial</p>
                  <p className="text-lg font-bold text-white leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    ${flagship.price.toFixed(0)} MXN{' '}
                    {flagship.originalPrice && (
                      <span className="text-xs text-gray-300 font-normal line-through">
                        ${flagship.originalPrice.toFixed(0)} MXN
                      </span>
                    )}
                  </p>
                </div>
                <button
                  id="hero-quick-add-btn"
                  onClick={() => onAddToCart(flagship.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] hover:from-[#FF8F3D] hover:to-[#FF6B00] text-white font-bold text-xs shadow-[0_4px_15px_rgba(255,107,0,0.4)] transition-all cursor-pointer"
                >
                  + Añadir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
