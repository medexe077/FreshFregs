
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Award, Heart, Leaf, Users } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getBestSellers, getNewArrivals } from "./lib/readSheet";

export default async function HomePage() {
  const values = [
    {
      icon: Award,
      title: "Authenticity",
      description:
        "Every fragrance is sourced from authorized retailers and verified for authenticity. We stake our reputation on genuine products.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "Founded by fragrance enthusiasts, we understand the transformative power of scent and the joy of discovery.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Our decanting model reduces waste by enabling sampling before committing to full bottles that may go unused.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We're building a community of scent lovers who share recommendations, discoveries, and their fragrance journeys.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Started in a small apartment, decanting fragrances for friends who wanted to explore luxury scents.",
    },
    {
      year: "2020",
      title: "Online Launch",
      description:
        "Launched our e-commerce platform, reaching fragrance enthusiasts across the country.",
    },
    {
      year: "2022",
      title: "Expansion",
      description:
        "Grew our catalog to over 200 fragrances and shipped our 10,000th order.",
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Serving a global community of scent lovers with personalized recommendations and curated collections.",
    },
  ];

  // ========== ADDED: GOOGLE SHEETS CODE ==========
  const bestSellers = await getBestSellers();
  const newArrivals = await getNewArrivals();
  
  const displayedBestSellers = bestSellers.slice(0, 4);
  const displayedNewArrivals = newArrivals.slice(0, 4);
  // ========== END ADDED CODE ==========

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920&q=80"
            alt="Our Story"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center text-white max-w-3xl mx-auto">
              <p className="text-sm tracking-[0.4em] uppercase mb-6 text-white/80">
                Our Story
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6">
                The Art of
                <br />
                <span className="italic text-[#d4a849]">Discovery</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                We believe everyone deserves access to the world&apos;s finest
                fragrances — one decant at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif mb-8 text-foreground">
                Democratizing
                <br />
                <span className="italic">Luxury</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Garden of Eden was born from a simple frustration: falling in
                  love with a fragrance at a counter, only to realize the full
                  bottle costs more than your monthly groceries.
                </p>
                <p>
                  We started by decanting fragrances for friends and soon
                  realized we weren&apos;t alone. Thousands of fragrance lovers
                  wanted to explore beyond their comfort zone without the
                  financial commitment of a full bottle.
                </p>
                <p>
                  Today, we&apos;ve served over 50,000 customers worldwide,
                  helping them discover new signature scents and build
                  collections that tell their unique olfactory stories.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] relative">
                <Image
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"
                  alt="Fragrance collection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 lg:-right-12 bg-[var(--gold)] text-white p-8 max-w-[250px]">
                <p className="text-5xl font-serif mb-2">50K+</p>
                <p className="text-sm">Happy customers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              What We Stand For
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-background p-8 border border-border"
              >
                <div className="w-14 h-14 bg-[var(--gold)]/10 flex items-center justify-center mb-6">
                  <value.icon className="text-[var(--gold)]" size={26} />
                </div>
                <h3 className="font-serif text-xl mb-3 text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                Our Journey
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground">
                A Growing Legacy
              </h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-border lg:left-1/2 lg:-translate-x-1/2" />

              <div className="space-y-12 lg:space-y-16">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative pl-16 lg:pl-0 ${
                      index % 2 === 0
                        ? "lg:pr-[50%] lg:text-right"
                        : "lg:pl-[50%]"
                    }`}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-6 top-2 w-3 h-3 bg-[var(--gold)] rounded-full lg:left-1/2 lg:-translate-x-1/2`}
                    />

                    <div
                      className={`${
                        index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                      }`}
                    >
                      <span className="text-[var(--gold)] text-sm tracking-wider">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-2xl mt-1 mb-2 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADDED: BEST SELLERS SECTION ========== */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                Most Loved
              </p>
              <h2 className="text-4xl lg:text-5xl font-serif text-foreground">Best Sellers</h2>
            </div>
            <Link
              href="/shop"
              className="mt-6 sm:mt-0 flex items-center gap-2 text-sm tracking-wider text-foreground hover:text-[var(--gold)] transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {displayedBestSellers.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.image}
                category={product.category}
                isBestSeller={product.isBestSeller}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== ADDED: NEW ARRIVALS SECTION ========== */}
      <section className="py-24 lg:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              Just Added
            </p>
            <h2 className="text-4xl lg:text-5xl font-serif text-foreground">New Arrivals</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {displayedNewArrivals.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team / Founder */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square relative">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Founder"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold-light)] mb-4">
                From the Founder
              </p>
              <h2 className="text-4xl font-serif mb-8 italic">
                &ldquo;Fragrance is the most intimate form of self-expression.
                It&apos;s the invisible accessory you never take off.&rdquo;
              </h2>
              <p className="text-background/70 leading-relaxed mb-6">
                What started as a hobby turned into a mission. I believe
                everyone should have access to experience the artistry of great
                perfumery. Our decants are more than samples — they&apos;re
                invitations to explore.
              </p>
              <div>
                <p className="font-serif text-xl">Marcus Chen</p>
                <p className="text-sm text-background/60">
                  Founder & Creative Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-foreground">
                Ready to Explore?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
                Browse our curated collection and find your next signature scent.
                Every journey begins with a single spray.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-12 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors"
              >
                <span>Shop Collection</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}