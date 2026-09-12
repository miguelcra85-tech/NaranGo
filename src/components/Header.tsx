import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  totalCartItems: number;
  onOpenCart: () => void;
  isCartBouncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalCartItems,
  onOpenCart,
  isCartBouncing = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['inicio', 'producto', 'beneficios', 'sabores', 'comprar'];
      const scrollPos = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#inicio', id: 'inicio' },
    { label: 'Producto', href: '#producto', id: 'producto' },
    { label: 'Beneficios', href: '#beneficios', id: 'beneficios' },
    { label: 'Sabores', href: '#sabores', id: 'sabores' },
    { label: 'Comprar', href: '#comprar', id: 'comprar' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 sm:px-6 md:px-8 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`w-full max-w-6xl rounded-2xl flex items-center justify-between transition-all duration-500 border ${
          isScrolled
            ? 'bg-white/[0.08] backdrop-blur-xl border-white/25 py-2.5 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
            : 'bg-white/[0.04] backdrop-blur-md border-white/20 py-3.5 px-6 shadow-[0_5px_20px_rgba(0,0,0,0.15)]'
        }`}
      >
        {/* Logo left */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#inicio');
          }}
          className="focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/60 rounded-lg"
          id="header-logo"
        >
          <Logo size={isScrolled ? 'sm' : 'md'} />
        </a>

        {/* Center navigation links */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                id={`nav-${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B00]/25 to-[#FFB347]/15 border border-[#FF6B00]/40 -z-10 shadow-[0_0_15px_rgba(255,107,0,0.3)]" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Cart Button with animated badge */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            aria-label="Abrir Carrito"
            className={`relative flex items-center gap-2.5 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 border ${
              isScrolled
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#E55300] hover:from-[#FF7F24] hover:to-[#FF6B00] text-white border-orange-400/40 shadow-[0_0_20px_rgba(255,107,0,0.4)]'
                : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              {totalCartItems > 0 && (
                <span
                  className={`absolute -top-2.5 -right-2.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#FFB347] text-[#0B0B12] font-black text-[11px] flex items-center justify-center shadow-[0_0_10px_#FFB347] ${
                    isCartBouncing ? 'animate-bounce scale-110' : ''
                  }`}
                >
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Carrito</span>
            {totalCartItems > 0 && (
              <span className="hidden sm:inline text-xs opacity-80 border-l border-white/20 pl-2">
                {totalCartItems} {totalCartItems === 1 ? 'lata' : 'latas'}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 border border-white/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden absolute top-20 left-4 right-4 bg-[#1A1A2E]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl flex flex-col gap-3 animate-in fade-in duration-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="px-4 py-2.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/10 font-medium text-base transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
            <span className="flex items-center gap-1 text-[#FFB347]">
              <Sparkles className="w-3.5 h-3.5" /> 100% Prensado en frío
            </span>
            <span>Envío Express 24h</span>
          </div>
        </div>
      )}
    </header>
  );
};
