import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (flavorId: string, delta: number) => void;
  onRemoveItem: (flavorId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.flavor.price * item.quantity,
    0
  );

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#12121E]/95 backdrop-blur-2xl border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Tu Selección Naran Go</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-300 font-semibold mb-1">Aún no has añadido bebidas</p>
                <p className="text-xs text-gray-500">
                  Explora los 7 sabores tropicales y prueba la frescura pura.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.flavor.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-14 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 bg-white/5 border border-white/10 overflow-hidden p-1 relative"
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
                      <h4 className="text-sm font-bold text-white">{item.flavor.name}</h4>
                      <p className="text-[11px] text-[#FFB347]">{item.flavor.subtitle}</p>
                      <span className="text-xs font-semibold text-white">
                        ${item.flavor.price.toFixed(0)} MXN
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#0B0B12] rounded-lg p-1 border border-white/10">
                      <button
                        onClick={() => onUpdateQuantity(item.flavor.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.flavor.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.flavor.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="pt-5 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-400">Subtotal</span>
                <span className="text-2xl font-extrabold text-white">
                  ${subtotal.toFixed(0)} <span className="text-sm font-bold">MXN</span>
                </span>
              </div>
              <p className="text-[11px] text-gray-300 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#38EFA0]" />
                {subtotal >= 350
                  ? '¡Envío refrigerado GRATIS activado!'
                  : `Te faltan $${(350 - subtotal).toFixed(0)} MXN para Envío Gratis`}
              </p>
              <button
                id="drawer-checkout-btn"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8F3D] hover:from-[#FF7F24] hover:to-[#FF6B00] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,107,0,0.4)] cursor-pointer"
              >
                <span>Ir a Pagar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
