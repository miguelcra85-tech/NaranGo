import React, { useState } from 'react';
import { Sparkles, Plus, Check, Info, Zap } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { Flavor } from '../types';
import { Card3D } from './Card3D';
import { ProductVisual } from './ProductVisual';

interface FlavorsGridProps {
  onAddToCart: (flavorId: string) => void;
  onSelectFlavorDetail?: (flavor: Flavor) => void;
}

export const FlavorsGrid: React.FC<FlavorsGridProps> = ({
  onAddToCart,
}) => {
  const [filter, setFilter] = useState<'all' | 'citrus' | 'tropical' | 'wellness' | 'energy'>('all');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [activeModalFlavor, setActiveModalFlavor] = useState<Flavor | null>(null);

  const filteredFlavors = FLAVORS.filter((f) => {
    if (filter === 'all') return true;
    return f.category === filter;
  });

  const handleAddWithMicroInteraction = (flavorId: string) => {
    setAddedAnimationId(flavorId);
    onAddToCart(flavorId);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  return (
    <section id="sabores" className="relative py-28 md:py-36 overflow-visible">
      {/* Dynamic Background Colored Ambient Lighting */}
      <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full bg-[#FF6B00]/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[650px] h-[650px] rounded-full bg-[#8A2BE2]/15 blur-[170px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#00D2FF]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md mb-4 text-xs font-semibold text-[#FFB347] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Colección Sensorial
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Descubre los <span className="text-gradient-orange">7 Sabores Tropicales</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-200">
            Cada variante nace de frutas exóticas rigurosamente seleccionadas, formuladas para ofrecer
            perfiles sensoriales irrepetibles que revitalizan cuerpo y mente con pop-out 3D interactivo.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-20">
          {[
            { id: 'all', label: 'Todos (7)' },
            { id: 'citrus', label: 'Cítricos Puros' },
            { id: 'tropical', label: 'Exótico & Tropical' },
            { id: 'wellness', label: 'Multivitamínico' },
            { id: 'energy', label: '⚡ Electric Energy' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`filter-tab-${tab.id}`}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] text-white border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                  : 'bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border-white/20 backdrop-blur-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 7 Flavors Grid: Pop-out effect, 3D tilt, adaptive inner glow, parallax depth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-16 gap-x-8 pt-6">
          {filteredFlavors.map((flavor) => {
            const isAdded = addedAnimationId === flavor.id;
            const isEnergy = flavor.id === 'blueberry-energy';

            return (
              <div
                key={flavor.id}
                id={`flavor-card-${flavor.id}`}
                className="relative pt-6 group"
              >
                <Card3D maxTilt={10} overflowVisible={true} className="h-full">
                  {/* Outer Glass Container */}
                  <div
                    className={`h-full rounded-3xl p-7 pt-4 flex flex-col justify-between relative transition-all duration-500 border overflow-visible ${
                      isEnergy
                        ? 'bg-black/15 hover:bg-black/25 backdrop-blur-[2px] border-cyan-400/50 shadow-[0_15px_35px_rgba(0,210,255,0.2)]'
                        : 'bg-black/15 hover:bg-black/25 backdrop-blur-[2px] border-white/20 hover:border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.3)]'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: `0 20px 45px -10px rgba(0,0,0,0.5), 0 0 30px -5px ${flavor.glowHex || flavor.color}33`,
                    }}
                  >
                    {/* Resplandor ambiental por sabor (Layer 1: Inner Glow detrás del producto) */}
                    <div
                      className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-[75px] pointer-events-none opacity-45 group-hover:opacity-90 transition-all duration-700"
                      style={{
                        background: flavor.glowHex || flavor.color,
                        willChange: 'opacity, transform',
                        zIndex: 10,
                      }}
                    />

                    {/* Energy Lightning Overlay for BlueBerry */}
                    {isEnergy && (
                      <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden opacity-35 group-hover:opacity-65 transition-opacity duration-500 z-10">
                        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#3B82F6]/30 blur-[60px]" />
                        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-400/20 blur-[60px]" />
                      </div>
                    )}

                    {/* Top Header: Badge & Info Action (Layer 4) */}
                    <div
                      className="flex items-center justify-between mb-2 relative"
                      style={{ zIndex: 40, transform: 'translateZ(30px)' }}
                    >
                      {flavor.badge ? (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border tracking-wide shadow-sm ${
                            isEnergy
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,210,255,0.4)]'
                              : 'bg-[#FF6B00]/20 text-[#FFB347] border-[#FF6B00]/40'
                          }`}
                        >
                          {flavor.badge}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-300 bg-white/5 border border-white/10">
                          {flavor.calories} Kcal • 355ml
                        </span>
                      )}

                      <button
                        onClick={() => setActiveModalFlavor(flavor)}
                        aria-label={`Ver notas de ${flavor.name}`}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                        title="Ver notas sensoriales"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Center: Interactive Product Visual with Pop-out & Multi-Plane Parallax */}
                    <div className={`py-2 flex items-center justify-center relative overflow-visible ${
                      isEnergy ? 'min-h-[320px] -my-4' : 'min-h-[300px] -my-6'
                    }`}>
                      <ProductVisual
                        flavor={flavor}
                        size="md"
                        enablePopOut={true}
                      />
                    </div>

                    {/* Bottom: Typography, Notes, Price and Add Button (Layer 4) */}
                    <div
                      className="relative mt-2"
                      style={{ zIndex: 40, transform: 'translateZ(25px)' }}
                    >
                      <div className="mb-4">
                        <div className="flex items-baseline justify-between mb-1">
                          <h3 className="font-heading text-2xl font-black text-white group-hover:text-white transition-colors flex items-center gap-2">
                            {flavor.name}
                            {isEnergy && <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                          </h3>
                          <span className="text-xs text-gray-400 font-medium">{flavor.volume.split('/')[0]}</span>
                        </div>
                        <p className="text-sm font-semibold text-[#FFB347] mb-1.5">{flavor.subtitle}</p>
                        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                          {flavor.tagline}
                        </p>
                      </div>

                      {/* Sensory Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {flavor.notes.map((note) => (
                          <span
                            key={note}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* Price & Add to Cart Button with Micro-Interaction */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-white">
                              ${flavor.price.toFixed(0)} <span className="text-xs font-semibold text-[#FFB347]">MXN</span>
                            </span>
                            {flavor.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                ${flavor.originalPrice.toFixed(0)} MXN
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                            Envío gratis &gt; $350 MXN
                          </span>
                        </div>

                        <button
                          id={`add-btn-${flavor.id}`}
                          onClick={() => handleAddWithMicroInteraction(flavor.id)}
                          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg overflow-hidden ${
                            isAdded
                              ? 'bg-emerald-500 text-white shadow-[0_0_20px_#10B981] scale-105'
                              : isEnergy
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(0,210,255,0.4)]'
                              : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] hover:from-[#FF7F24] hover:to-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.35)]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 animate-in zoom-in" />
                              <span>¡Añadido!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Añadir</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flavor Detail Modal (Glassmorphism popover) */}
      {activeModalFlavor && (
        <div
          id="flavor-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setActiveModalFlavor(null)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-[#1A1A2E]/95 border border-white/20 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none"
              style={{ background: activeModalFlavor.glowHex || activeModalFlavor.color }}
            />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFB347]">
                  {activeModalFlavor.subtitle}
                </span>
                <h3 className="font-heading text-3xl font-black text-white mt-1">
                  {activeModalFlavor.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalFlavor(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 relative z-10">
              {activeModalFlavor.description}
            </p>

            <div className="mb-6 relative z-10">
              <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2.5">
                Ingredientes Puros & Botánicos:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                {activeModalFlavor.ingredients.map((ing) => (
                  <li key={ing} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
              <div>
                <span className="text-xs text-gray-400 block">Formato Sleek 355ml</span>
                <span className="text-2xl font-black text-white">${activeModalFlavor.price.toFixed(0)} MXN</span>
              </div>
              <button
                onClick={() => {
                  handleAddWithMicroInteraction(activeModalFlavor.id);
                  setActiveModalFlavor(null);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,107,0,0.5)] cursor-pointer"
              >
                Añadir al Carrito Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
