"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const faqs = [
    {
      question: "Are your decants authentic?",
      answer:
        "Absolutely. We source all fragrances from authorized retailers and verified suppliers. Each bottle is authenticated before decanting.",
    },
    {
      question: "How long do decants last?",
      answer:
        "A 10ml decant provides approximately 100-150 sprays, which typically lasts 2-3 months with daily use.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unopened items. If you receive a damaged or incorrect product, we'll replace it immediately.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We ship to over 50 countries. International shipping typically takes 7-14 business days.",
    },
    {
      question: "How are the decants packaged?",
      answer:
        "Each decant comes in a high-quality glass atomizer, sealed for freshness, and packaged in protective materials to ensure safe delivery.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
              Get in Touch
            </p>
            <h1 className="text-5xl lg:text-6xl font-serif mb-4 text-foreground">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a question or need assistance? We&apos;re here to help with
              your fragrance journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif mb-8 text-foreground">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-secondary p-8 text-center border border-border">
                  <div className="w-16 h-16 bg-[var(--gold)] mx-auto mb-6 flex items-center justify-center">
                    <Send className="text-white" size={28} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-foreground">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm tracking-wider uppercase mb-2 text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border bg-transparent text-foreground focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-muted-foreground"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm tracking-wider uppercase mb-2 text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border bg-transparent text-foreground focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-muted-foreground"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm tracking-wider uppercase mb-2 text-foreground">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-border bg-transparent text-foreground appearance-none focus:outline-none focus:border-[var(--gold)] transition-colors cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Question</option>
                        <option value="shipping">Shipping & Delivery</option>
                        <option value="returns">Returns & Exchanges</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm tracking-wider uppercase mb-2 text-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border bg-transparent text-foreground resize-none focus:outline-none focus:border-[var(--gold)] transition-colors placeholder:text-muted-foreground"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:bg-[var(--gold)] hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif mb-8 text-foreground">Contact Information</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Email</h4>
                    <p className="text-muted-foreground">
                      contact@gardenofeden.dz
                    </p>
                    <p className="text-muted-foreground">
                      support@gardenofeden.dz
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Phone</h4>
                    <p className="text-muted-foreground">+213 (0) 41 123 456</p>
                    <p className="text-sm text-muted-foreground">
                      Sun-Thu 9am-6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Address</h4>
                    <p className="text-muted-foreground">
                      Boulevard de l&apos;ANP
                      <br />
                      Oran 31000
                      <br />
                      Algeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-foreground">Response Time</h4>
                    <p className="text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video relative bg-secondary overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="Location"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/90 backdrop-blur-sm px-6 py-4 text-center border border-border">
                    <p className="font-serif text-lg text-foreground">Visit Our Showroom</p>
                    <p className="text-sm text-muted-foreground">
                      By appointment only
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-[var(--gold)] mb-4">
                Help Center
              </p>
              <h2 className="text-4xl font-serif text-foreground">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-background border border-border"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? null : index)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-medium pr-4 text-foreground">{faq.question}</span>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 transition-transform text-muted-foreground ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}