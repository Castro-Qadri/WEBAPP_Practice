"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import apiClient from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  model_code: string;
  category: string;
  tagline: string;
  description: string;
  image_url: string;
  price_pkr: number;
  price_usd?: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
}

type CategoryConfig = {
  title: string;
  subtitle: string;
  categories: string[];
  heroHint: string;
  parts: { label: string; detail: string; x: string; y: string }[];
  motor: { title: string; detail: string }[];
  circuit: { type: string; detail: string };
  accent: string;
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  fans: {
    title: "GFC Fans",
    subtitle: "High-air-throw comfort crafted for homes and businesses",
    categories: ["ceiling_fan", "pedestal_fan", "bracket_fan", "exhaust_fan"],
    heroHint: "Flagship model: Future / Apex series",
    parts: [
      { label: "Aero Blades", detail: "Optimized airflow & low vibration", x: "15%", y: "20%" },
      { label: "Copper Winding", detail: "High torque pure copper motor", x: "70%", y: "40%" },
      { label: "Ball Bearing", detail: "Smooth rotation, extended life", x: "20%", y: "70%" },
      { label: "Die-cast Housing", detail: "Rigid body, heat dissipation", x: "75%", y: "70%" },
    ],
    motor: [
      { title: "Pure Copper Coil", detail: "High conductivity winding for stable RPM." },
      { title: "Magnetic Core", detail: "Balanced torque with low noise." },
      { title: "Cooling Vent", detail: "Designed for continuous long runtime." },
    ],
    circuit: {
      type: "AC / Inverter",
      detail: "Simplified AC drive with speed regulator and thermal protection.",
    },
    accent: "#D4AF37",
  },
  coolers: {
    title: "GFC Air Coolers",
    subtitle: "Turbo cooling performance for large spaces",
    categories: ["air_cooler"],
    heroHint: "Flagship model: GF-7800 Turbo Cool",
    parts: [
      { label: "Cooling Pads", detail: "High absorption honeycomb pads", x: "18%", y: "25%" },
      { label: "Blower Fan", detail: "High airflow delivery system", x: "70%", y: "35%" },
      { label: "Water Tank", detail: "Large capacity for longer runtime", x: "20%", y: "70%" },
      { label: "Pump System", detail: "Uniform water distribution", x: "72%", y: "70%" },
    ],
    motor: [
      { title: "High-Torque Motor", detail: "Consistent performance under load." },
      { title: "Energy Efficient", detail: "Optimized power draw for cooling." },
      { title: "Thermal Guard", detail: "Built-in protection for long life." },
    ],
    circuit: {
      type: "AC Cooling Circuit",
      detail: "Simplified cooling circuit with pump control and fan speed selector.",
    },
    accent: "#D4AF37",
  },
  "washing-machines": {
    title: "GFC Washing Machines",
    subtitle: "Reliable performance with powerful wash cycles",
    categories: ["washing_machine"],
    heroHint: "Flagship model: GF-1100 Twin Tub",
    parts: [
      { label: "Wash Tub", detail: "Stainless steel drum for durability", x: "20%", y: "25%" },
      { label: "Spin Motor", detail: "High speed spin-dry performance", x: "70%", y: "35%" },
      { label: "Drain System", detail: "Quick drain for fast cycles", x: "20%", y: "70%" },
      { label: "Control Panel", detail: "Intuitive wash programs", x: "70%", y: "70%" },
    ],
    motor: [
      { title: "Dual Motor Drive", detail: "Dedicated wash and spin motors." },
      { title: "Torque Balance", detail: "Low vibration with strong agitation." },
      { title: "Water Seal", detail: "Protected motor housing." },
    ],
    circuit: {
      type: "AC Motor Circuit",
      detail: "Simplified circuit for wash/spin control with timer switch.",
    },
    accent: "#D4AF37",
  },
};

export default function CategoryExperiencePage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const config = CATEGORY_CONFIG[slug];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const heroProduct = useMemo(() => {
    if (!products.length) return null;
    return products.find((p) => p.is_featured) || products[0];
  }, [products]);

  useEffect(() => {
    if (!config) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".brand-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".hero-product",
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    gsap.to(".hero-product", {
      rotate: 6,
      y: -10,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.utils.toArray<HTMLElement>(".fade-section").forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".part-chip").forEach((chip, index) => {
      gsap.fromTo(
        chip,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".parts-section",
            start: "top 70%",
          },
        }
      );
    });

    gsap.fromTo(
      ".circuit-path",
      { strokeDashoffset: 300 },
      {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".circuit-section",
          start: "top 75%",
        },
      }
    );
  }, [config]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!config) return;
      try {
        setLoading(true);
        const response = await apiClient.get("/products/by-category");
        const categoryData = response.data as Record<string, Product[]>;
        const selected = config.categories.flatMap((key) => categoryData[key] || []);
        setProducts(selected);
      } catch (err) {
        console.error("Failed to load category products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [config]);

  if (!config) {
    return (
      <div className="min-h-screen bg-primary text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">Category not found</h1>
        <p className="text-gray-300 mb-8">Choose a category from the homepage.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-primary text-white">
      <section className="hero-section min-h-screen pt-28 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute -top-10 right-0 text-[18rem] font-black text-white/5 tracking-widest select-none">
          GFC
        </div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-gold mb-4">GFC • Signature Experience</p>
            <h1 className="brand-title text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {config.title}
            </h1>
            <p className="text-lg text-gray-200 mb-6">{config.subtitle}</p>
            <p className="text-gold mb-8">{config.heroHint}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#categories" className="btn-primary">Explore Catalog</Link>
              <Link href="/products" className="btn-secondary">View All Products</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl opacity-40 blur-3xl" style={{ background: config.accent }} />
            {heroProduct ? (
              <img
                src={heroProduct.image_url}
                alt={heroProduct.name}
                className="hero-product relative w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="hero-product h-80 rounded-2xl bg-black/30 flex items-center justify-center">
                <span className="text-gray-300">Loading hero...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="fade-section py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Live Product Motion</h2>
            <p className="text-gray-300 mb-6">
              Scroll-driven motion highlights real product performance and how it moves in action.
            </p>
            <ul className="space-y-3 text-gray-200">
              <li>• Smooth airflow and balanced rotation</li>
              <li>• Optimized blade and motor performance</li>
              <li>• Quiet, efficient operation</li>
            </ul>
          </div>
          <div className="relative">
            {heroProduct ? (
              <img
                src={heroProduct.image_url}
                alt={`${heroProduct.name} in motion`}
                className="w-full max-w-md mx-auto rounded-2xl border border-gold/30 shadow-xl"
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="parts-section fade-section py-24 px-6 lg:px-12 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Exploded Parts View</h2>
          <p className="text-gray-300 mb-10">Detailed breakdown of the critical components.</p>
          <div className="relative min-h-[420px] rounded-3xl bg-black/40 border border-gold/20">
            {heroProduct && (
              <img
                src={heroProduct.image_url}
                alt="Exploded view"
                className="absolute inset-0 w-full h-full object-contain opacity-60"
              />
            )}
            {config.parts.map((part, index) => (
              <div
                key={index}
                className="part-chip absolute bg-black/70 border border-gold/40 rounded-xl px-4 py-3 text-sm"
                style={{ left: part.x, top: part.y }}
              >
                <p className="text-gold font-semibold">{part.label}</p>
                <p className="text-gray-200 text-xs mt-1">{part.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fade-section py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Motor & Core Engineering</h2>
            <p className="text-gray-300 mb-6">Precision engineering designed for durability and efficiency.</p>
            <div className="space-y-4">
              {config.motor.map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-black/30 border border-gold/20">
                  <h3 className="font-semibold text-gold">{item.title}</h3>
                  <p className="text-gray-200 text-sm mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border border-gold/50 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-gold/40 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gold/20 border border-gold/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="circuit-section fade-section py-24 px-6 lg:px-12 bg-secondary">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Circuit Insight</h2>
            <p className="text-gray-300 mb-6">{config.circuit.detail}</p>
            <p className="text-gold font-semibold">{config.circuit.type}</p>
          </div>
          <svg viewBox="0 0 400 220" className="w-full max-w-lg mx-auto">
            <path
              className="circuit-path"
              d="M20 110 H120 L150 70 H230 L260 150 H360"
              stroke="#D4AF37"
              strokeWidth="3"
              fill="none"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            <circle cx="20" cy="110" r="8" fill="#D4AF37" />
            <circle cx="120" cy="110" r="8" fill="#D4AF37" />
            <circle cx="150" cy="70" r="8" fill="#D4AF37" />
            <circle cx="230" cy="70" r="8" fill="#D4AF37" />
            <circle cx="260" cy="150" r="8" fill="#D4AF37" />
            <circle cx="360" cy="150" r="8" fill="#D4AF37" />
          </svg>
        </div>
      </section>

      <section className="fade-section py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Remaining Products</h2>
            <Link href="/products" className="text-gold">See full catalog →</Link>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
