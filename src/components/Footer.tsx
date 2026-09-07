import React, { useState } from 'react';
import { Mail, Instagram, Twitter, Music, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { MigueStrategyLogo } from './MigueStrategyLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer className="relative bg-black/10 backdrop-blur-[2px] text-gray-300 overflow-hidden pt-20 pb-12 border-t border-white/10">
      {/* Soft Top Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/60 to-transparent" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-[#FF6B00]/10 blur-[40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1 & 2: Brand Story & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="md" />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Naran Go redefine las bebidas tropicales con fruta 100% real prensada en frío,
              electrolitos puros y cero azúcar añadida. Diseñado para elevar tu energía diaria
              sin comprometer tu salud.
            </p>

            {/* Newsletter Glass Input */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
                Únete al Naran Club (15% OFF en tu primera orden)
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] text-white text-xs font-bold transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
                >
                  {subscribed ? '¡Listo! ✓' : <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>

          {/* Col 3: Navegación */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explorar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#inicio" className="hover:text-[#FF6B00] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#producto" className="hover:text-[#FF6B00] transition-colors">
                  Elaboración HPP
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-[#FF6B00] transition-colors">
                  Beneficios & Nutrición
                </a>
              </li>
              <li>
                <a href="#sabores" className="hover:text-[#FF6B00] transition-colors">
                  Los 7 Sabores
                </a>
              </li>
              <li>
                <a href="#comprar" className="hover:text-[#FF6B00] transition-colors">
                  Tienda Online
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Sabores Destacados */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Colección
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#sabores" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]"></span> Naran Go Clásico
                </a>
              </li>
              <li>
                <a href="#sabores" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB347]"></span> Piña Go Tropical
                </a>
              </li>
              <li>
                <a href="#sabores" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38EFA0]"></span> Kiwi Fresa Multi
                </a>
              </li>
              <li>
                <a href="#sabores" className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span> BlueBerry Energy ⚡
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacto & Redes */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contacto & Comunidad
            </h4>
            <p className="text-sm mb-3">
              Atención al cliente VIP: <br />
              <span className="text-white font-medium">hola@narango.com</span>
            </p>
            <p className="text-sm mb-4">
              WhatsApp Concierge: <br />
              <span className="text-white font-medium">+34 910 203 040</span>
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#38EFA0] transition-colors"
                aria-label="Spotify Playlist"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Migue Strategy (Izquierda) + Enlaces Legales (Centro) + Naran Go (Derecha) */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Lado Izquierdo: Marca de Marketing con inicial "MS" en escudo y "Migue Strategy" */}
          <div className="flex items-center">
            <MigueStrategyLogo size="md" showSubtitle={true} />
          </div>

          {/* Centro: Enlaces Legales & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} Naran Go Beverage Labs</span>
            <div className="flex items-center gap-3">
              <span className="hover:text-white transition-colors cursor-pointer">Aviso Legal</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Privacidad</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Términos</span>
            </div>
          </div>

          {/* Lado Derecho: Naran Go */}
          <div className="flex items-center">
            <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl px-4 py-2 transition-all duration-300 shadow-sm">
              <div className="text-right">
                <span className="block text-sm font-black text-white leading-none">Naran Go</span>
                <span className="text-[10px] text-[#FFB347] font-bold tracking-wider uppercase">Cold-Pressed Beverage</span>
              </div>
              <Logo size="sm" showWordmark={false} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
