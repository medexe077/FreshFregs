"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

// TikTok icon component since lucide-react doesn't have it
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-serif mb-4">
              Join Our World
            </h3>
            <p className="text-background/70 mb-8 text-sm tracking-wide">
              Subscribe for exclusive access to new arrivals, limited editions,
              and curated fragrance insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:border-[var(--gold)] transition-colors text-sm tracking-wider"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[var(--gold)] text-white text-sm tracking-[0.2em] uppercase hover:bg-[var(--gold-light)] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="text-xs tracking-[0.5em] uppercase text-[var(--gold)] font-medium block mb-1">
                Parfumerie
              </span>
              <h2 className="text-xl tracking-[0.15em] uppercase font-serif">
                Garden of Eden
              </h2>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Discover luxury fragrances in perfectly portioned 10ml decants.
              Experience the world&apos;s finest scents without the commitment.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-background/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6">Shop</h4>
            <ul className="space-y-4">
              {[
                "All Fragrances",
                "For Him",
                "For Her",
                "Unisex",
                "New Arrivals",
                "Best Sellers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-background/60 text-sm hover:text-[var(--gold)] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6">
              Information
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Our Story", href: "/about" },
                { label: "How It Works", href: "/about" },
                { label: "Shipping & Returns", href: "/contact" },
                { label: "FAQ", href: "/contact" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-background/60 text-sm hover:text-[var(--gold)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4 text-background/60 text-sm">
              <li>contact@gardenofeden.dz</li>
              <li>+213 (0) 41 123 456</li>
              <li>
                Boulevard de l&apos;ANP
                <br />
                Oran 31000, Algeria
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-background/50 text-xs tracking-wider">
            <p>© {currentYear} Garden of Eden Parfumerie. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-[var(--gold)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[var(--gold)] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}