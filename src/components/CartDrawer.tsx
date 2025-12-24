"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-DZ").format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-serif">Shopping Bag</h2>
                <span className="text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                  <p className="text-lg font-serif mb-2">Your bag is empty</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Discover our collection of luxury fragrances
                  </p>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="px-8 py-3 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-[var(--gold)] transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 pb-6 border-b border-border"
                    >
                      <div className="relative w-24 h-32 bg-secondary shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                              {item.product.brand}
                            </p>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.size
                                )
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-4 text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.size
                                )
                              }
                              className="p-2 hover:bg-secondary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-medium">
                            {formatPrice(item.product.price * item.quantity)} DZD
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-lg font-serif">
                    {formatPrice(getSubtotal())} DZD
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="block w-full py-4 bg-foreground text-background text-center text-sm tracking-widest uppercase hover:bg-[var(--gold)] transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full py-3 border border-border text-sm tracking-widest uppercase hover:bg-secondary transition-colors"
                >
                  Clear Bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
