"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { products, Product } from "@/lib/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery) ||
        product.type.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );
    setResults(filtered);
  }, [query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-DZ").format(price);
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50"
        >
          <div className="max-w-3xl mx-auto px-6 pt-24">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search fragrances, brands..."
                className="w-full py-4 pl-12 pr-12 text-lg bg-transparent border-b-2 border-border focus:border-foreground outline-none transition-colors"
              />
              <button
                onClick={handleClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="mt-8">
              {query.trim() === "" ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Start typing to search our collection
                  </p>
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground mb-4">
                      Popular searches
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Creed", "Tom Ford", "Baccarat", "Oud", "Fresh"].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-4 py-2 border border-border text-sm hover:bg-secondary transition-colors"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg font-serif mb-2">No results found</p>
                  <p className="text-muted-foreground">
                    Try searching for a different fragrance or brand
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {results.length} {results.length === 1 ? "result" : "results"}{" "}
                    found
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pb-8">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={handleClose}
                        className="flex gap-4 p-4 border border-border hover:bg-secondary transition-colors group"
                      >
                        <div className="relative w-20 h-24 bg-secondary shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            {product.brand}
                          </p>
                          <h3 className="font-medium group-hover:text-[var(--gold)] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(product.price)} DZD
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
