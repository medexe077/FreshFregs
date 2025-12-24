"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { Filter, X, ChevronDown } from "lucide-react";
type FilterCategory = "all" | "masculine" | "feminine" | "unisex";
type FilterType = "all" | "fresh" | "woody" | "floral" | "oriental" | "citrus";
type SortOption = "featured" | "price-low" | "price-high" | "name";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as FilterCategory) || "all";

  const [category, setCategory] = useState<FilterCategory>(initialCategory);
  const [type, setType] = useState<FilterType>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map((p) => p.brand))];
    return uniqueBrands.sort();
  }, []);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (type !== "all") {
      result = result.filter((p) => p.type === type);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result = [...result].sort(
          (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
        );
    }

    return result;
  }, [category, type, priceRange, selectedBrands, sortBy, searchQuery]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setCategory("all");
    setType("all");
    setPriceRange([0, 10000]);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    category !== "all" ||
    type !== "all" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 10000 ||
    selectedBrands.length > 0 ||
    searchQuery !== "";

  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "masculine", label: "For Him" },
    { value: "feminine", label: "For Her" },
    { value: "unisex", label: "Unisex" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "fresh", label: "Fresh" },
    { value: "woody", label: "Woody" },
    { value: "floral", label: "Floral" },
    { value: "oriental", label: "Oriental" },
    { value: "citrus", label: "Citrus" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              Our Collection
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-4 text-foreground">
              Shop Fragrances
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Discover our curated selection of premium fragrances, each available in authentic 10ml decants.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Category Tabs */}
            <div className="hidden md:flex items-center gap-8">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCategory(opt.value as FilterCategory)}
                  className={`text-sm tracking-wide transition-colors ${
                    category === opt.value
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-xs mx-4 md:mx-8">
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-border px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground text-foreground"
              />
            </div>

            {/* Filter & Sort */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Filter size={16} />
                <span className="hidden sm:inline">Filter</span>
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                )}
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-transparent text-sm text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none pr-6"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 bg-background">
        <div className="flex gap-12">
          {/* Sidebar Filters - Desktop */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-60 space-y-8">
                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear All
                    </button>
                  )}

                  {/* Type Filter */}
                  <div>
                    <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">
                      Fragrance Type
                    </h4>
                    <div className="space-y-2">
                      {typeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setType(opt.value as FilterType)}
                          className={`block w-full text-left py-1.5 text-sm transition-colors ${
                            type === opt.value
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">
                      Brand
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div
                            onClick={() => toggleBrand(brand)}
                            className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                              selectedBrands.includes(brand)
                                ? "border-foreground bg-foreground"
                                : "border-border group-hover:border-muted-foreground"
                            }`}
                          >
                            {selectedBrands.includes(brand) && (
                              <svg className="w-2.5 h-2.5 text-background" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                            {brand}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">
                      Price Range (DZD)
                    </h4>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full bg-transparent border-b border-border px-0 py-1.5 text-sm focus:outline-none focus:border-foreground text-center text-foreground"
                        placeholder="Min"
                      />
                      <span className="text-muted-foreground">—</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={10000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full bg-transparent border-b border-border px-0 py-1.5 text-sm focus:outline-none focus:border-foreground text-center text-foreground"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setShowFilters(false)}
                />
                <motion.aside
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-serif text-foreground">Filter</h3>
                      <button onClick={() => setShowFilters(false)} className="text-foreground">
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-8">
                      {/* Category - Mobile */}
                      <div>
                        <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">Category</h4>
                        <div className="flex flex-wrap gap-2">
                          {categoryOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setCategory(opt.value as FilterCategory)}
                              className={`px-4 py-2 text-sm border transition-colors ${
                                category === opt.value
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border text-foreground hover:border-foreground"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Type - Mobile */}
                      <div>
                        <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {typeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setType(opt.value as FilterType)}
                              className={`px-4 py-2 text-sm border transition-colors ${
                                type === opt.value
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border text-foreground hover:border-foreground"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brands - Mobile */}
                      <div>
                        <h4 className="text-xs tracking-widest uppercase mb-4 text-muted-foreground">Brand</h4>
                        <div className="flex flex-wrap gap-2">
                          {brands.map((brand) => (
                            <button
                              key={brand}
                              onClick={() => toggleBrand(brand)}
                              className={`px-3 py-1.5 text-xs border transition-colors ${
                                selectedBrands.includes(brand)
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border text-foreground hover:border-foreground"
                              }`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-6 border-t border-border space-y-3">
                      <button
                        onClick={() => {
                          clearFilters();
                          setShowFilters(false);
                        }}
                        className="w-full py-3 border border-border text-sm text-foreground hover:border-foreground transition-colors"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full py-3 bg-foreground text-background text-sm"
                      >
                        Show {filteredProducts.length} Results
                      </button>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-8">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>

            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <ProductCard
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
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-sm underline underline-offset-4 text-foreground hover:text-[var(--gold)] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}