import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle,
  Truck,
  Sparkles,
  Tag,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { ProductMap } from './ProductMap';

interface PurchaseSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (flavorId: string, delta: number) => void;
  onRemoveItem: (flavorId: string) => void;
  onClearCart: () => void;
  onAddDefaultItems: () => void;
}

export const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddDefaultItems,
}) => {
  // Form State with Floating Labels
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'CDMX / Área Metropolitana',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    exp: '',
    cvc: '',
  });

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Price calculations in Mexican Pesos (MXN)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.flavor.price * item.quantity,
    0
  );
  const discount = subtotal * (discountPercent / 100);
  const freeShippingThreshold = 350;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 65;
  const total = Math.max(0, subtotal - discount + shipping);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NARANGO10') {
      setDiscountPercent(10);
      setPromoMessage('¡Cupón NARANGO10 aplicado! 10% de descuento');
    } else if (promoCode.trim().toUpperCase() === 'TROPICAL20') {
      setDiscountPercent(20);
      setPromoMessage('¡Cupón TROPICAL20 aplicado! 20% de descuento VIP');
    } else {
      setPromoMessage('Cupón no válido. Prueba NARANGO10');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Por favor, añade al menos una bebida a tu carrito.');
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      alert('Por favor, completa los campos obligatorios de entrega.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `NG-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderConfirmed(true);

      // Trigger Luxury Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B00', '#FFB347', '#38EFA0', '#FFFFFF', '#00D2FF'],
      });
    }, 1500);
  };

  return (
    <section id="comprar" className="relative py-28 md:py-36 overflow-hidden">
      {/* Soft Orange Ambient Backlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#FF6B00]/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#FFB347]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md mb-4 text-xs font-semibold text-[#FF6B00] uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" />
            Checkout Inmediato
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Lleva la experiencia <span className="text-gradient-orange">a tu puerta</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-200">
            Cadena de frío garantizada. Embalaje térmico 100% reciclable para recibir tus latas
            a la temperatura exacta de degustación.
          </p>
        </div>

        {orderConfirmed ? (
          /* Order Confirmed Screen */
          <div
            id="order-confirmation-success"
            className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 bg-black/20 border border-[#38EFA0]/40 backdrop-blur-sm text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="w-20 h-20 rounded-full bg-[#38EFA0]/20 border border-[#38EFA0]/50 flex items-center justify-center mx-auto mb-6 text-[#38EFA0] shadow-[0_0_30px_rgba(56,239,160,0.4)] animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#38EFA0]">
              ¡Pago y Pedido Confirmado con Éxito!
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-black text-white mt-2 mb-3">
              Gracias, {formData.name || 'Amante del sabor'}
            </h3>
            <p className="text-gray-200 text-sm sm:text-base mb-6 max-w-lg mx-auto">
              Tu pedido <span className="font-mono font-bold text-[#FFB347]">{orderId}</span> está siendo
              preparado en nuestra bodega refrigerada y saldrá rumbo a{' '}
              <span className="text-white font-semibold">{formData.address || 'tu domicilio'}</span>.
            </p>

            {/* Delivery Status Card */}
            <div className="p-5 rounded-2xl bg-black/25 border border-white/15 text-left mb-8 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="flex items-center gap-2 text-white font-semibold">
                  <Truck className="w-4 h-4 text-[#FF6B00]" /> Envío Refrigerado Express
                </span>
                <span className="text-[#38EFA0] font-bold">En Preparación</span>
              </div>
              <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#FF6B00] to-[#38EFA0] h-full w-2/5 rounded-full" />
              </div>
              <p className="text-xs text-gray-300">
                Tiempo estimado de entrega: <span className="text-white font-bold">35 - 50 minutos</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] text-white font-bold text-sm shadow-[0_0_20px_rgba(255,107,0,0.4)] cursor-pointer"
              >
                Hacer otro Pedido
              </button>
            </div>
          </div>
        ) : (
          /* Main Two-Column Purchase Interface */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Side: Live Cart Summary inside Ultra-Transparent Glass Panel (Spans 5 cols) */}
            <div className="lg:col-span-5">
              <div
                id="cart-summary-panel"
                className="rounded-3xl p-6 sm:p-8 bg-black/10 hover:bg-black/15 backdrop-blur-[2px] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.2)] sticky top-28"
              >
                {/* Cart Title & Count */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00]">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">Resumen del Carrito</h3>
                      <p className="text-xs text-gray-300">
                        {cartItems.reduce((acc, i) => acc + i.quantity, 0)} latas seleccionadas
                      </p>
                    </div>
                  </div>
                  {cartItems.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                    >
                      Vaciar
                    </button>
                  )}
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="mb-6 p-4 rounded-2xl bg-black/20 border border-white/10">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-200 font-medium flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#38EFA0]" />
                      {subtotal >= freeShippingThreshold
                        ? '¡Envío express GRATIS activado!'
                        : `Te faltan $${(freeShippingThreshold - subtotal).toFixed(0)} MXN para Envío Gratis`}
                    </span>
                    <span className="text-xs font-bold text-[#FFB347]">
                      ${freeShippingThreshold} MXN meta
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6B00] to-[#38EFA0] rounded-full transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items List */}
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-gray-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-gray-300 font-medium mb-2">Tu carrito está vacío</p>
                    <p className="text-xs text-gray-400 mb-6">
                      Añade tus sabores favoritos arriba o carga nuestro pack sugerido.
                    </p>
                    <button
                      id="load-starter-pack-btn"
                      onClick={onAddDefaultItems}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      + Añadir Pack Bestseller (4 Sabores)
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[320px] overflow-y-auto pr-1 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.flavor.id}
                        id={`cart-item-${item.flavor.id}`}
                        className="flex items-center justify-between p-3 rounded-2xl bg-black/20 border border-white/10 group hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {/* Mini visual indicator with real image */}
                          <div
                            className="w-11 h-14 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-inner flex-shrink-0 bg-white/5 border border-white/10 overflow-hidden p-0.5 relative"
                            style={{ boxShadow: `0 0 15px ${item.flavor.glowHex || item.flavor.color}33` }}
                          >
                            {item.flavor.imageFile ? (
                              <img
                                src={item.flavor.imageFile}
                                alt={item.flavor.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div
                                className="w-full h-full rounded-lg flex items-center justify-center font-bold text-xs text-white"
                                style={{ backgroundColor: item.flavor.color }}
                              >
                                {item.flavor.name.slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white leading-tight">
                              {item.flavor.name}
                            </h4>
                            <p className="text-[11px] text-gray-300">{item.flavor.subtitle}</p>
                            <span className="text-xs font-bold text-[#FFB347]">
                              ${item.flavor.price.toFixed(0)} MXN c/u
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls & Delete */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-1 border border-white/10">
                            <button
                              onClick={() => onUpdateQuantity(item.flavor.id, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Disminuir"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.flavor.id, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.flavor.id)}
                            className="text-gray-400 hover:text-red-400 p-1.5 transition-colors"
                            aria-label="Eliminar item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Código promo (ej: NARANGO10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/20 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B00] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] mt-2 font-medium ${
                        discountPercent > 0 ? 'text-[#38EFA0]' : 'text-[#FFB347]'
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Cost Breakdown */}
                <div className="pt-4 border-t border-white/10 space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)} MXN</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-[#38EFA0]">
                      <span>Descuento ({discountPercent}%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)} MXN</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-300">
                    <span className="flex items-center gap-1.5">
                      Envío Express
                      {shipping === 0 && (
                        <span className="text-[10px] bg-emerald-500/20 text-[#38EFA0] px-1.5 py-0.5 rounded font-bold">
                          GRATIS (Orden mayor a $350)
                        </span>
                      )}
                    </span>
                    <span className="text-white font-medium">
                      {shipping === 0 ? '$0.00 MXN' : `$${shipping.toFixed(2)} MXN`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                    <div>
                      <span className="font-heading text-lg font-bold text-white block">
                        Total a Pagar
                      </span>
                      <span className="text-[10px] text-gray-400">Impuestos y empaque incluidos</span>
                    </div>
                    <span className="font-heading text-3xl font-black text-gradient-orange">
                      ${total.toFixed(2)} <span className="text-lg font-bold text-white">MXN</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Delivery Form + Integrated Map + Payment Buttons (Spans 7 cols) */}
            <div className="lg:col-span-7">
              <form
                id="purchase-delivery-form"
                onSubmit={handleSubmitOrder}
                className="rounded-3xl p-6 sm:p-10 bg-black/10 hover:bg-black/15 backdrop-blur-[2px] border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.2)] space-y-8"
              >
                {/* 1. Delivery Details with Modern Floating Labels */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-5 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FF6B00]" />
                    <span>1. Datos de Entrega Prioritaria</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="form-name"
                        required
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                      />
                      <label
                        htmlFor="form-name"
                        className="absolute text-xs text-gray-400 duration-200 transform -translate-y-2.5 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF6B00]"
                      >
                        Nombre Completo *
                      </label>
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <input
                        type="tel"
                        id="form-phone"
                        required
                        placeholder=" "
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                      />
                      <label
                        htmlFor="form-phone"
                        className="absolute text-xs text-gray-400 duration-200 transform -translate-y-2.5 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF6B00]"
                      >
                        Teléfono / Móvil para SMS *
                      </label>
                    </div>

                    {/* Address */}
                    <div className="relative sm:col-span-2">
                      <input
                        type="text"
                        id="form-address"
                        required
                        placeholder=" "
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                      />
                      <label
                        htmlFor="form-address"
                        className="absolute text-xs text-gray-400 duration-200 transform -translate-y-2.5 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF6B00]"
                      >
                        Dirección de entrega (Calle, Número, Colonia/Código Postal) *
                      </label>
                    </div>

                    {/* Delivery Notes */}
                    <div className="relative sm:col-span-2">
                      <input
                        type="text"
                        id="form-notes"
                        placeholder=" "
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="peer w-full px-4 pt-6 pb-2 rounded-2xl bg-black/20 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
                      />
                      <label
                        htmlFor="form-notes"
                        className="absolute text-xs text-gray-400 duration-200 transform -translate-y-2.5 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-[#FF6B00]"
                      >
                        Instrucciones adicionales (ej: Dejar en recepción)
                      </label>
                    </div>
                  </div>
                </div>

                {/* 2. Integrated Map Container with MapTiler (#mapa-producto) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" /> Cobertura en Tiempo Real & Punto de Entrega
                    </span>
                    <span className="text-xs text-[#38EFA0] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38EFA0] animate-ping" />
                      Ruta Fría Activa (35-45 min)
                    </span>
                  </div>

                  {/* Contenedor transparente sin bordes por defecto con bordes redondeados */}
                  <ProductMap />
                </div>

                {/* 3. Payment Section: Two Transparent Buttons (PayPal vs Stripe) */}
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#FFB347]" />
                    <span>2. Método de Pago Seguro</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* Stripe / Credit Card Button */}
                    <button
                      type="button"
                      id="payment-method-card"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-[#FF6B00]/15 border-[#FF6B00] shadow-[0_0_20px_rgba(255,107,0,0.25)] text-white'
                          : 'bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/25 text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                          <CreditCard className="w-5 h-5 text-[#FFB347]" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Tarjeta de Crédito / Débito</p>
                          <p className="text-[11px] text-gray-300">Stripe 256-bit SSL</p>
                        </div>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'card' ? 'border-[#FF6B00] bg-[#FF6B00]' : 'border-gray-400'
                        }`}
                      >
                        {paymentMethod === 'card' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>

                    {/* PayPal Button */}
                    <button
                      type="button"
                      id="payment-method-paypal"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        paymentMethod === 'paypal'
                          ? 'bg-[#0070BA]/20 border-[#0070BA] shadow-[0_0_20px_rgba(0,112,186,0.25)] text-white'
                          : 'bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/25 text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0070BA]/30 flex items-center justify-center text-[#00D2FF] font-black text-lg">
                          P
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">PayPal Express</p>
                          <p className="text-[11px] text-gray-300">Protección al comprador</p>
                        </div>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'paypal' ? 'border-[#0070BA] bg-[#0070BA]' : 'border-gray-400'
                        }`}
                      >
                        {paymentMethod === 'paypal' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  </div>

                  {/* Card Details (if card selected) */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-3">
                        <label className="text-[11px] text-gray-400 block mb-1">Número de Tarjeta</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• 4242"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] text-gray-400 block mb-1">Vencimiento</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={cardData.exp}
                          onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-400 block mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Primary CTA: "Confirmar Pedido y Pagar" */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="submit-order-btn"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFB347] text-white font-heading font-black text-lg tracking-wide uppercase flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(255,107,0,0.5)] hover:shadow-[0_20px_50px_rgba(255,107,0,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Procesando Pago Seguro...</span>
                      </div>
                    ) : (
                      <>
                        <span>Confirmar Pedido y Pagar (${total.toFixed(2)} MXN)</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#38EFA0]" /> Cifrado SSL 256-bit
                    </span>
                    <span>Envío gratis a partir de $350 MXN</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
