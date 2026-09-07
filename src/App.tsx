/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FLAVORS } from './data/flavors';
import { CartItem, Flavor } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductSpotlight } from './components/ProductSpotlight';
import { Benefits } from './components/Benefits';
import { FlavorsGrid } from './components/FlavorsGrid';
import { PurchaseSection } from './components/PurchaseSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ScrubVideoBackground } from './components/ScrubVideoBackground';

export default function App() {
  // Initial cart with sample products for immediate visual fullness
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { flavor: FLAVORS[0], quantity: 2 }, // Naran Go (Mango & Orange)
    { flavor: FLAVORS[4], quantity: 2 }, // Maracu Go
    { flavor: FLAVORS[6], quantity: 1 }, // BlueBerry Energy
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  // Total item count in cart
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger bounce on cart badge
  const triggerCartBounce = () => {
    setIsCartBouncing(true);
    setTimeout(() => {
      setIsCartBouncing(false);
    }, 900);
  };

  // Add to cart handler
  const handleAddToCart = (flavorId: string) => {
    const flavor = FLAVORS.find((f) => f.id === flavorId);
    if (!flavor) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.flavor.id === flavorId);
      if (existing) {
        return prev.map((item) =>
          item.flavor.id === flavorId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { flavor, quantity: 1 }];
    });

    triggerCartBounce();
  };

  // Update quantity handler
  const handleUpdateQuantity = (flavorId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.flavor.id === flavorId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove item handler
  const handleRemoveItem = (flavorId: string) => {
    setCartItems((prev) => prev.filter((item) => item.flavor.id !== flavorId));
  };

  // Clear cart handler
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add Default Starter Pack
  const handleAddDefaultItems = () => {
    setCartItems([
      { flavor: FLAVORS[0], quantity: 2 },
      { flavor: FLAVORS[1], quantity: 2 },
      { flavor: FLAVORS[2], quantity: 2 },
      { flavor: FLAVORS[6], quantity: 2 },
    ]);
    triggerCartBounce();
  };

  // Scroll helpers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[#F3F4F6] relative selection:bg-[#FF6B00] selection:text-white font-sans">
      {/* 0. Fixed Native Scrub / Scroll-driven Video Background with Fallback Frames Cache */}
      <ScrubVideoBackground videoSrc="https://res.cloudinary.com/hw31kdln/video/upload/v1788758454/portada-huerto_namsyo.mp4" />

      {/* 1. Fixed Header with glassmorphism & animated cart counter */}
      <Header
        totalCartItems={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        isCartBouncing={isCartBouncing}
      />

      {/* Main Page Layout in Strict Order */}
      <main>
        {/* 2. Hero Section (Full Viewport) */}
        <Hero
          onExploreFlavors={() => scrollToSection('sabores')}
          onExploreProduct={() => scrollToSection('producto')}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Product Section (Two-column asymmetric layout) */}
        <ProductSpotlight
          onAddToCart={handleAddToCart}
          onExploreFlavors={() => scrollToSection('sabores')}
        />

        {/* 4. Benefits Section (4 Bento-style glassmorphism cards) */}
        <Benefits />

        {/* 5. Flavors Section (Most important visual section, 7 flavors) */}
        <FlavorsGrid
          onAddToCart={handleAddToCart}
        />

        {/* 6. Purchase Section (Live cart summary, delivery form, integrated map, payment) */}
        <PurchaseSection
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onAddDefaultItems={handleAddDefaultItems}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Interactive Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => scrollToSection('comprar')}
      />
    </div>
  );
}
