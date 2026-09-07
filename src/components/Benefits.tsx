import React from 'react';
import { Apple, Flame, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { BENEFITS } from '../data/flavors';
import { Card3D } from './Card3D';

export const Benefits: React.FC = () => {
  const iconMap = {
    Apple: Apple,
    Flame: Flame,
    Zap: Zap,
    ShieldCheck: ShieldCheck,
  };

  return (
    <section id="beneficios" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF6B00]/12 blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-[#38EFA0]/10 blur-[160px] animate-subtle-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md mb-4 text-xs font-semibold text-[#38EFA0] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Pureza & Rendimiento
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Creado para quienes no aceptan <br />
            <span className="text-gradient-gold">compromisos en su bienestar</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-200">
            Cuatro pilares innegociables que marcan la diferencia entre una bebida convencional
            y una experiencia de vitalidad auténtica.
          </p>
        </div>

        {/* 4 Benefit Cards in Modern Bento-Style Grid with 3D hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* Card 1 (Spans 7 cols on desktop) */}
          <div className="md:col-span-7">
            <Card3D maxTilt={7} className="h-full">
              <div
                id="benefit-card-0"
                className="h-full rounded-3xl p-8 sm:p-10 bg-black/10 hover:bg-black/20 backdrop-blur-[2px] border border-white/15 hover:border-[#FF6B00]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.2)] group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FF6B00]/25 blur-[50px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Glowing circle icon */}
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FF6B00]/30 to-[#FF6B00]/10 border border-[#FF6B00]/40 shadow-[0_0_25px_rgba(255,107,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <Apple className="w-8 h-8 text-[#FF6B00]" />
                    </div>
                    {/* Big Stat Callout */}
                    <div className="text-right">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {BENEFITS[0].stat}
                      </span>
                      <span className="text-xs text-[#FFB347] font-semibold uppercase tracking-wider">
                        {BENEFITS[0].statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                    {BENEFITS[0].title}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed max-w-lg">
                    {BENEFITS[0].description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
                  <span>Sin concentrados industriales ni pulpas deshidratadas</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Card 2 (Spans 5 cols on desktop) */}
          <div className="md:col-span-5">
            <Card3D maxTilt={7} className="h-full">
              <div
                id="benefit-card-1"
                className="h-full rounded-3xl p-8 sm:p-10 bg-black/10 hover:bg-black/20 backdrop-blur-[2px] border border-white/15 hover:border-[#FFB347]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.2)] group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FFB347]/25 blur-[50px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FFB347]/30 to-[#FFB347]/10 border border-[#FFB347]/40 shadow-[0_0_25px_rgba(255,179,71,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <Flame className="w-8 h-8 text-[#FFB347]" />
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {BENEFITS[1].stat}
                      </span>
                      <span className="text-xs text-[#FFB347] font-semibold uppercase tracking-wider">
                        {BENEFITS[1].statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {BENEFITS[1].title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    {BENEFITS[1].description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#FFB347]"></span>
                  <span>Apto para dietas keto y control glucémico</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Card 3 (Spans 5 cols on desktop) */}
          <div className="md:col-span-5">
            <Card3D maxTilt={7} className="h-full">
              <div
                id="benefit-card-2"
                className="h-full rounded-3xl p-8 sm:p-10 bg-black/10 hover:bg-black/20 backdrop-blur-[2px] border border-white/15 hover:border-[#38EFA0]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.2)] group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#38EFA0]/25 blur-[50px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#38EFA0]/30 to-[#38EFA0]/10 border border-[#38EFA0]/40 shadow-[0_0_25px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-8 h-8 text-[#38EFA0]" />
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {BENEFITS[2].stat}
                      </span>
                      <span className="text-xs text-[#38EFA0] font-semibold uppercase tracking-wider">
                        {BENEFITS[2].statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-3">
                    {BENEFITS[2].title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    {BENEFITS[2].description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#38EFA0]"></span>
                  <span>Absorción celular inmediata post-entrenamiento</span>
                </div>
              </div>
            </Card3D>
          </div>

          {/* Card 4 (Spans 7 cols on desktop) */}
          <div className="md:col-span-7">
            <Card3D maxTilt={7} className="h-full">
              <div
                id="benefit-card-3"
                className="h-full rounded-3xl p-8 sm:p-10 bg-black/10 hover:bg-black/20 backdrop-blur-[2px] border border-white/15 hover:border-[#00D2FF]/60 transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.2)] group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#00D2FF]/25 blur-[50px] group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#00D2FF]/30 to-[#00D2FF]/10 border border-[#00D2FF]/40 shadow-[0_0_25px_rgba(0,210,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck className="w-8 h-8 text-[#00D2FF]" />
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-white block drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {BENEFITS[3].stat}
                      </span>
                      <span className="text-xs text-[#00D2FF] font-semibold uppercase tracking-wider">
                        {BENEFITS[3].statLabel}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
                    {BENEFITS[3].title}
                  </h3>
                  <p className="text-gray-200 text-base leading-relaxed max-w-lg">
                    {BENEFITS[3].description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3 text-xs text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF]"></span>
                  <span>Cero plástico de un solo uso en toda la cadena</span>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
