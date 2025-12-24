"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";
import { Heart, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="text-[var(--gold)]" size={28} />
              <h1 className="text-4xl lg:text-5xl font-serif text-foreground">
                Your Wishlist
              </h1>
            </div>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved for later
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="pb-24 lg:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <Heart size={64} className="mx-auto text-muted-foreground/50 mb-6" />
              <h2 className="text-2xl font-serif mb-4 text-foreground">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Save your favorite fragrances by clicking the heart icon on any product.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background text-sm tracking-widest uppercase hover:bg-[var(--gold)] transition-colors"
              >
                <ShoppingBag size={18} />
                <span>Browse Collection</span>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Actions */}
              <div className="flex justify-between items-center mb-8">
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? "fragrance" : "fragrances"} in your wishlist
                </p>
                <button
                  onClick={clearWishlist}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Clear All
                </button>
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {items.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    category={product.category}
                    isNew={product.isNew}
                    isBestSeller={product.isBestSeller}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}