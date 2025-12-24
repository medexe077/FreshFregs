"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts, Product } from "@/lib/products";
import {
  Minus,
  Plus,
  Heart,
  Share2,
  Check,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
} from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
            <Link
              href="/shop"
              className="text-[var(--gold)] hover:underline"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const similarProducts = getSimilarProducts(product, 4);
  const images = product.images || [product.image];
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 lg:pt-32">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Product Section */}
        <section className="pb-20 lg:pb-32 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="aspect-[3/4] relative bg-[var(--beige)] overflow-hidden">
                  <Image
                    src={images[selectedImage]}
                    alt={`${product.brand} ${product.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.isNew && (
                    <span className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-6 left-6 px-4 py-2 bg-[var(--gold)] text-white text-xs tracking-[0.2em] uppercase">
                      Best Seller
                    </span>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-4">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-20 h-24 relative border-2 transition-colors ${
                          selectedImage === i
                            ? "border-[var(--gold)]"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:py-8"
              >
                <div className="mb-6">
                  <p className="text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-2">
                    {product.brand}
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-serif mb-4">
                    {product.name}
                  </h1>
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl">${product.price.toFixed(2)}</span>
                    <span className="text-muted-foreground">/ 10ml</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs px-2 py-1 bg-[var(--gold)]/10 text-[var(--gold)]">
                          Save {savings}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Notes */}
                <div className="mb-8 space-y-4">
                  <h3 className="text-sm tracking-[0.2em] uppercase mb-4">
                    Fragrance Notes
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[var(--cream)] p-4">
                      <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
                        Top
                      </p>
                      <p className="text-sm">{product.notes.top.join(", ")}</p>
                    </div>
                    <div className="bg-[var(--cream)] p-4">
                      <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
                        Heart
                      </p>
                      <p className="text-sm">{product.notes.middle.join(", ")}</p>
                    </div>
                    <div className="bg-[var(--cream)] p-4">
                      <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
                        Base
                      </p>
                      <p className="text-sm">{product.notes.base.join(", ")}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Longevity
                    </p>
                    <p className="text-sm">{product.longevity}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Sillage
                    </p>
                    <p className="text-sm">{product.sillage}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-muted-foreground mb-1">
                      Best For
                    </p>
                    <p className="text-sm">{product.occasion.slice(0, 2).join(", ")}</p>
                  </div>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-4 mb-8">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-[var(--beige)] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-[var(--beige)] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button className="flex-1 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase hover:bg-primary/90 transition-colors">
                    Add to Bag
                  </button>
                </div>

                {/* Actions */}
                <div className="flex gap-6 mb-10 pb-10 border-b border-border">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Heart size={18} />
                    <span>Add to Wishlist</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>

                {/* Guarantees */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--beige)] flex items-center justify-center">
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">
                        On orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--beige)] flex items-center justify-center">
                      <RotateCcw size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--beige)] flex items-center justify-center">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">100% Authentic</p>
                      <p className="text-xs text-muted-foreground">
                        Guaranteed genuine fragrances
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Decanting Process */}
        <section className="py-20 lg:py-28 bg-[var(--beige)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                Our Process
              </p>
              <h2 className="text-3xl lg:text-4xl font-serif">
                Transparency in Every Drop
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Source",
                  description:
                    "We acquire only from authorized retailers and verified suppliers",
                },
                {
                  step: "02",
                  title: "Verify",
                  description:
                    "Each bottle is authenticated through batch codes and expert inspection",
                },
                {
                  step: "03",
                  title: "Decant",
                  description:
                    "Hand-filled in a sterile environment using precision equipment",
                },
                {
                  step: "04",
                  title: "Seal",
                  description:
                    "Atomizer sealed and packaged with care in protective materials",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="py-20 lg:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                  You May Also Like
                </p>
                <h2 className="text-3xl lg:text-4xl font-serif">
                  Similar Fragrances
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                {similarProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    brand={p.brand}
                    price={p.price}
                    image={p.image}
                    category={p.category}
                    isNew={p.isNew}
                    isBestSeller={p.isBestSeller}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}