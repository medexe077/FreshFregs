"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, Sun, Moon, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();

  return (
    <>
      <header
        className={`fixed top-0 bg-white left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center h-20 lg:h-24">
            {/* Mobile: Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 -ml-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop: Left Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo - Centered */}
            <Link href="/" className="flex-shrink-0 mx-auto lg:mx-0">
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] font-medium">
                  Parfumerie
                </span>
                <h1 className="text-lg lg:text-xl tracking-[0.1em] uppercase font-serif text-foreground whitespace-nowrap">
                  Garden of Eden
                </h1>
              </div>
            </Link>

            {/* Desktop: Right Navigation */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4 ml-4 lg:ml-8">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                href="/wishlist"
                className="p-2 text-foreground/70 hover:text-foreground transition-colors relative hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-[10px] text-white rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-foreground/70 hover:text-foreground transition-colors relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--gold)] text-[10px] text-white rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-b border-border overflow-hidden"
            >
              <nav className="flex flex-col py-8 px-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block py-4 text-lg tracking-[0.15em] uppercase border-b border-border/50 text-foreground hover:text-[var(--gold)] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="/wishlist"
                    className="block py-4 text-lg tracking-[0.15em] uppercase border-b border-border/50 text-foreground hover:text-[var(--gold)] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist ({wishlistCount})
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="w-full text-left py-4 text-lg tracking-[0.15em] uppercase text-foreground hover:text-[var(--gold)] transition-colors"
                  >
                    Search
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}