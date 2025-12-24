"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Product } from "@/lib/products";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export default function ProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  category,
  isNew,
  isBestSeller,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-DZ').format(price);
  };

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const inWishlist = isInWishlist(id);
  const inCart = isInCart(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product: Product = {
      id,
      name,
      brand,
      price,
      originalPrice,
      image,
      category: (category as "masculine" | "feminine" | "unisex") || "unisex",
      type: "fresh",
      description: "",
      notes: { top: [], middle: [], base: [] },
      longevity: "",
      sillage: "",
      occasion: [],
    };
    
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product: Product = {
      id,
      name,
      brand,
      price,
      originalPrice,
      image,
      category: (category as "masculine" | "feminine" | "unisex") || "unisex",
      type: "fresh",
      description: "",
      notes: { top: [], middle: [], base: [] },
      longevity: "",
      sillage: "",
      occasion: [],
    };
    
    toggleItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link 
        href={`/product/${id}`} 
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-4">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={`${brand} ${name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1.5 bg-foreground text-background text-[10px] tracking-widest uppercase font-medium">
                New
              </span>
            )}
            {isBestSeller && (
              <span className="px-3 py-1.5 bg-[var(--gold)] text-white text-[10px] tracking-widest uppercase font-medium">
                Best Seller
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1.5 bg-red-600 text-white text-[10px] tracking-widest uppercase font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              inWishlist 
                ? "bg-[var(--gold)] text-white" 
                : "bg-white/90 text-foreground hover:bg-[var(--gold)] hover:text-white"
            }`}
          >
            <Heart size={18} className={inWishlist ? "fill-current" : ""} />
          </button>

          {/* Quick Add */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`w-full py-3 flex items-center justify-center gap-2 text-xs tracking-widest uppercase transition-colors ${
                addedToCart
                  ? "bg-green-600 text-white"
                  : inCart
                  ? "bg-[var(--gold)] text-white"
                  : "bg-foreground text-background hover:bg-[var(--gold)] hover:text-white"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : inCart ? (
                <>
                  <ShoppingBag size={16} />
                  <span>In Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            {brand}
          </p>
          <h3 className="text-sm font-medium text-foreground group-hover:text-[var(--gold)] transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-medium text-foreground">
              {formatPrice(price)} DZD
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)} DZD
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            10ml
          </p>
        </div>
      </Link>
    </motion.div>
  );
}