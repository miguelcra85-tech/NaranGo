import React, { useState } from 'react';
import { CheckCircle2, Sparkles, Citrus, Droplet, Shield, Leaf, HeartHandshake } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { ProductVisual } from './ProductVisual';
import { Card3D } from './Card3D';

interface ProductSpotlightProps {
  onAddToCart: (flavorId: string) => void;
  onExploreFlavors: () => void;
}

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({
  onAddToCart,
  onExploreFlavors,
}) => {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const flagship = FLAVORS[0]; // Naran Go

  const features = [
    {
      title: 'Prensado en Frío HPP sin Pasteurización Térmica',
      description: 'Preservamos las enzimas vivas, los aromas volátiles y los fitonutrientes intactos aplicando alta presión hidrostática en vez de calor agresivo.',
      icon: Droplet,
      accent: '#FF6B00',
    },
    {
      title: 'Cítricos de Huertos Costeros Regenerativos',
      description: 'Nuestras naranjas y mangos crecen en tierras fértiles con riego solar y recolección manual únicamente en su punto exacto de madurez.',
      icon: Citrus,
      accent: '#FFB347',
    },
    {
      title: 'Balance Electrolítico Isotónico Natural',
      description: 'Infusionado con sales minerales marinas de manantial y agua de coco verde para una hidratación celular 3 veces más rápida que el agua sola.',
      icon: Sparkles,
      accent: '#38EFA0',
    },
    {
      title: 'Pureza Absoluta & Cero Aditivos Químicos',
      description: 'Sin aspartamo, sin sucralosa, sin jarabe de maíz de alta fructosa y sin colorantes sintéticos. El color y el dulzor provienen 100% de la fruta.',
      icon: Shield,
      accent: '#00D2FF',
    },
  ];

  return (
    <section id="producto" className="relative py-28 md:py-36 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#FF6B00]/15 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#FFB347]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md mb-4 text-xs font-semibold text-[#FFB347] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            La Ciencia de la Frescura
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Ingredientes botánicos que <br />
            <span className="text-gradient-orange">redefinen el refresco moderno</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-200">
            Diseñamos cada lata de Naran Go como una obra maestra sensorial: una textura aterciopelada,
            un estallido cítrico que hace cosquillas en el paladar y una energía limpia y constante.
          </p>
        </div>

        {/* Two-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: 3D Product Showcase with Floating Effect & Glass Cards */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-4">
            <Card3D maxTilt={10} overflowVisible={true} className="w-full max-w-md">
              <div className="relative rounded-3xl p-8 sm:p-10 bg-black/15 hover:bg-black/25 border border-white/20 backdrop-blur-[2px] shadow-[0_15px_40px_rgba(0,0,0,0.3)] flex flex-col items-center overflow-visible">
                {/* Radial Glow on Card */}
                <div className="absolute top-1/4 w-52 h-52 rounded-full bg-[#FF6B00]/30 blur-[50px] pointer-events-none" />
                
                {/* 3D Floating Product Image with pop-out */}
                <div className="py-2 relative z-10 overflow-visible">
                  <ProductVisual flavor={flagship} size="lg" enablePopOut={true} />
                </div>

                {/* Flavor Tag & Volume */}
                <div className="mt-4 text-center z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FFB347] text-xs font-bold mb-2">
                    {flagship.subtitle}
                  </div>
                  <h3 className="font-heading text-2xl font-extrabold text-white">Naran Go Original</h3>
                  <p className="text-sm text-gray-300 mt-1">Lata Sleek de Aluminio Satinado • 355ml</p>
                </div>

                {/* Quick Add Button inside Card */}
                <div className="w-full mt-6 pt-5 border-t border-white/10 flex items-center justify-between z-10">
                  <div>
                    <span className="text-xs text-gray-300 block">Precio especial</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-white">${flagship.price.toFixed(0)} MXN</span>
                      {flagship.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">${flagship.originalPrice.toFixed(0)} MXN</span>
                      )}
                    </div>
                  </div>
                  <button
                    id="spotlight-add-btn"
                    onClick={() => onAddToCart(flagship.id)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] transition-all cursor-pointer"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </Card3D>

            {/* Bottom floating spec badges */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mt-4">
              <div className="p-3.5 rounded-2xl bg-black/15 border border-white/15 backdrop-blur-[2px] text-center">
                <span className="text-xs text-gray-300 block">Vitamina C Pura</span>
                <span className="text-lg font-bold text-[#FFB347]">180% VDR</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/15 border border-white/15 backdrop-blur-[2px] text-center">
                <span className="text-xs text-gray-300 block">pH Equilibrado</span>
                <span className="text-lg font-bold text-[#38EFA0]">5.2 Suave</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean description + Feature List with Animated Check Icons */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              {features.map((feature, idx) => {
                const IconComponent = feature.icon;
                const isSelected = selectedFeature === idx;

                return (
                  <div
                    key={feature.title}
                    id={`feature-card-${idx}`}
                    onClick={() => setSelectedFeature(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-400 cursor-pointer text-left ${
                      isSelected
                        ? 'bg-black/25 border-[#FF6B00] shadow-[0_10px_30px_rgba(255,107,0,0.25)]'
                        : 'bg-black/10 hover:bg-black/20 border-white/10 hover:border-white/25 backdrop-blur-[1px]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Animated Check / Glowing Icon Container */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 shadow-md"
                        style={{
                          backgroundColor: `${feature.accent}20`,
                          border: `1px solid ${feature.accent}50`,
                          color: feature.accent,
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-lg sm:text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                            {feature.title}
                          </h4>
                          <CheckCircle2
                            className={`w-5 h-5 flex-shrink-0 transition-colors ${
                              isSelected ? 'text-[#FF6B00]' : 'text-gray-500'
                            }`}
                          />
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action bar */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="spotlight-explore-btn"
                onClick={onExploreFlavors}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Comparar los 7 Perfiles Sensoriales</span>
                <span className="text-[#FF6B00]">→</span>
              </button>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Leaf className="w-4 h-4 text-[#38EFA0]" />
                Certificado Vegano & Sin Gluten
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
