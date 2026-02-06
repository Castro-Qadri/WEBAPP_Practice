"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: number;
  name: string;
  model_code: string;
  tagline: string;
  image_url: string;
  price_pkr: number;
}

// Real GFC Air Cooler products
const GFC_COOLERS: Product[] = [
  {
    id: 9,
    name: "GF-7800 Turbo Cool",
    model_code: "GF-7800-AC",
    tagline: "Maximum Cooling Power for Large Spaces",
    image_url: "https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800",
    price_pkr: 32900,
  },
  {
    id: 10,
    name: "GF-6700 Supreme",
    model_code: "GF-6700-AC",
    tagline: "Premium Comfort with Efficient Cooling",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg?v=1745391055&width=800",
    price_pkr: 29500,
  },
  {
    id: 11,
    name: "GF-6600 Deluxe Plus",
    model_code: "GF-6600-DX",
    tagline: "Advanced Features for Modern Living",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg?v=1745391055&width=800",
    price_pkr: 28800,
  },
];

// Cooler parts for animation
const COOLER_PARTS = [
  { label: "Honeycomb Pads", detail: "High-absorption cellulose pads for maximum cooling efficiency", icon: "❄️" },
  { label: "Turbo Blower", detail: "High-velocity blower for wide area coverage", icon: "🌀" },
  { label: "Water Tank", detail: "45L capacity for extended cooling sessions", icon: "💧" },
  { label: "Pump System", detail: "Powerful submersible pump for uniform distribution", icon: "⚙️" },
];

// Cooler specifications
const COOLER_SPECS = [
  { label: "Tank Capacity", value: "45 Liters", icon: "💧" },
  { label: "Air Throw", value: "50+ Feet", icon: "💨" },
  { label: "Pad Type", value: "Honeycomb", icon: "🧊" },
  { label: "Speed Settings", value: "3 Levels", icon: "⚡" },
  { label: "Power", value: "180W", icon: "🔌" },
  { label: "Coverage", value: "400 sq ft", icon: "📐" },
];

export default function CoolersExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waterLevel, setWaterLevel] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Brand reveal animation
      gsap.fromTo(".brand-letter", 
        { opacity: 0, y: 100, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power4.out",
          delay: 0.3
        }
      );

      gsap.fromTo(".brand-tagline",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
      );

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });

      // Product showcase animation
      gsap.fromTo(".product-hero-image", 
        { scale: 0.8, opacity: 0, x: 100 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-product",
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // Water flow animation on scroll
      ScrollTrigger.create({
        trigger: ".section-product",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          setWaterLevel(self.progress * 100);
        }
      });

      // Parts animation
      gsap.fromTo(".part-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-parts",
            start: "top 70%",
          }
        }
      );

      // Cooling system animation
      gsap.fromTo(".cooling-ring",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-cooling",
            start: "top 60%",
          }
        }
      );

      // Water flow path animation
      gsap.fromTo(".water-path",
        { strokeDashoffset: 600 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section-cooling",
            start: "top 50%",
          }
        }
      );

      // Products grid animation
      gsap.fromTo(".product-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-products",
            start: "top 70%",
          }
        }
      );

      // Parallax background
      gsap.to(".parallax-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-black"
              style={{ background: 'linear-gradient(135deg, rgb(186, 118, 58) 0%, rgb(250, 248, 179) 50%, rgb(193, 128, 64) 100%)' }}>
              G
            </div>
            <span className="font-bold text-lg hidden sm:block">GFC</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/experience/fans" className="hover:text-gfc-300 transition-colors">Fans</Link>
            <Link href="/experience/coolers" className="text-gfc-300 font-semibold">Coolers</Link>
            <Link href="/experience/washing-machines" className="hover:text-gfc-300 transition-colors">Washers</Link>
            <Link href="/products" className="gfc-gradient-bg text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-colors">
              Shop
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Brand Reveal */}
      <section className="section-hero min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 parallax-bg">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 gfc-gradient-bg/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gfc-400/10 rounded-full blur-[100px]" />
          {/* Water droplet particles */}
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Brand Title */}
        <div className="relative z-10 text-center">
          <div className="flex justify-center items-center text-[12rem] sm:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter">
            {"GFC".split("").map((letter, i) => (
              <span key={i} className="brand-letter inline-block bg-gradient-to-b from-gfc-300 via-gfc-300 to-gfc-400 bg-clip-text text-transparent">
                {letter}
              </span>
            ))}
          </div>
          <p className="brand-tagline text-2xl sm:text-3xl text-gray-400 mt-8 tracking-[0.3em] uppercase">
            Air Coolers
          </p>
          <p className="brand-tagline text-lg text-gray-500 mt-4 max-w-xl mx-auto">
            Turbo cooling performance. Natural comfort. Energy efficient.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Scroll to Explore</span>
          <svg className="w-6 h-6 text-gfc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: Hero Product Showcase */}
      <section className="section-product min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Info */}
            <div>
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Flagship Model</p>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
                GF-7800
              </h2>
              <h3 className="text-2xl text-gfc-300 mb-6">Turbo Cool AC</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The GF-7800 delivers exceptional cooling power for large spaces. 
                With its high-efficiency honeycomb pads and powerful turbo blower, 
                it provides natural, refreshing air circulation.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">45L</p>
                  <p className="text-gray-400 mt-1">Tank Capacity</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">50ft</p>
                  <p className="text-gray-400 mt-1">Air Throw</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">180W</p>
                  <p className="text-gray-400 mt-1">Power</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">400</p>
                  <p className="text-gray-400 mt-1">Sq Ft Coverage</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="gfc-gradient-bg text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
                  Rs. 32,900
                </button>
                <Link
                  href="/products/9"
                  className="border-2 border-gfc-500 text-gfc-500 px-8 py-4 rounded-xl font-bold text-lg hover:gfc-gradient-bg hover:text-black transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Product Image with Water Level Animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gfc-500/20 to-transparent rounded-3xl blur-3xl" />
              <div className="product-hero-image relative">
                <img
                  src="https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800"
                  alt="GFC GF-7800 Air Cooler"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-cyan-500/20"
                />
                {/* Water level indicator overlay */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-48 bg-black/50 rounded-2xl border border-gfc-500/30 overflow-hidden">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gfc-500/80 to-cyan-400/40 transition-all duration-300"
                    style={{ height: `${waterLevel}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{Math.round(waterLevel)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Parts Breakdown */}
      <section className="section-parts min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#0a1520] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Cooling Technology</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Advanced <span className="text-gfc-500">Components</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Every GFC cooler combines premium materials with innovative design for maximum cooling efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COOLER_PARTS.map((part, i) => (
              <div 
                key={i}
                className="part-card bg-gradient-to-br from-white/5 to-cyan-900/10 border border-gfc-500/20 rounded-3xl p-8 hover:border-gfc-500/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 gfc-gradient-bg/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{part.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gfc-300 mb-3">{part.label}</h3>
                <p className="text-gray-400">{part.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Cooling System Visualization */}
      <section className="section-cooling min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Cooling System Diagram */}
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-md">
                {/* Outer cooling rings */}
                <circle className="cooling-ring" cx="200" cy="200" r="180" fill="none" stroke="url(#coolGradient)" strokeWidth="4" opacity="0.3" />
                <circle className="cooling-ring" cx="200" cy="200" r="150" fill="none" stroke="url(#coolGradient)" strokeWidth="3" opacity="0.5" />
                <circle className="cooling-ring" cx="200" cy="200" r="120" fill="none" stroke="url(#coolGradient)" strokeWidth="3" opacity="0.7" />
                
                {/* Water flow paths */}
                <path 
                  className="water-path"
                  d="M200 50 Q100 100 100 200 Q100 300 200 350"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="4"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  strokeLinecap="round"
                />
                <path 
                  className="water-path"
                  d="M200 50 Q300 100 300 200 Q300 300 200 350"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="4"
                  strokeDasharray="600"
                  strokeDashoffset="600"
                  strokeLinecap="round"
                />
                
                {/* Center pump icon */}
                <circle cx="200" cy="200" r="50" fill="url(#pumpGradient)" className="cooling-ring" />
                <circle cx="200" cy="200" r="30" fill="#0a0a0a" className="cooling-ring" />
                
                {/* Honeycomb pads (top) */}
                <rect x="170" y="40" width="60" height="30" rx="5" fill="#22D3EE" opacity="0.5" className="cooling-ring" />
                
                {/* Water tank (bottom) */}
                <rect x="170" y="330" width="60" height="40" rx="5" fill="#06B6D4" opacity="0.5" className="cooling-ring" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="coolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <radialGradient id="pumpGradient">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#0a1520" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Cooling Info */}
            <div>
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Cooling System</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                Natural <span className="text-gfc-500">Evaporative</span> Cooling
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                GFC coolers use the natural principle of evaporative cooling. Water flows through honeycomb pads 
                while the turbo blower draws hot air through them. The water absorbs heat and evaporates, 
                delivering cool, fresh air to your space.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {COOLER_SPECS.map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-gfc-500/20 rounded-xl p-4 hover:border-gfc-500/50 transition-colors">
                    <span className="text-2xl">{spec.icon}</span>
                    <p className="text-gfc-500 font-bold mt-2">{spec.value}</p>
                    <p className="text-gray-500 text-sm">{spec.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Working Principle */}
      <section className="section-principle py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#0a1520] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">How It Works</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Cooling <span className="text-gfc-500">Process</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">💧</span>
              </div>
              <div className="text-gfc-500 text-4xl font-black mb-2">01</div>
              <h3 className="text-xl font-bold mb-2">Water Fills</h3>
              <p className="text-gray-400">Pump draws water from the tank</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🧊</span>
              </div>
              <div className="text-gfc-500 text-4xl font-black mb-2">02</div>
              <h3 className="text-xl font-bold mb-2">Pads Saturate</h3>
              <p className="text-gray-400">Honeycomb pads absorb water</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🌀</span>
              </div>
              <div className="text-gfc-500 text-4xl font-black mb-2">03</div>
              <h3 className="text-xl font-bold mb-2">Air Passes</h3>
              <p className="text-gray-400">Blower draws hot air through pads</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">❄️</span>
              </div>
              <div className="text-gfc-500 text-4xl font-black mb-2">04</div>
              <h3 className="text-xl font-bold mb-2">Cool Air</h3>
              <p className="text-gray-400">Fresh, cool air is delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Products Grid */}
      <section className="section-products min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Explore Collection</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              GFC <span className="text-gfc-500">Coolers</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Choose the perfect cooler for your space and enjoy natural, energy-efficient cooling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GFC_COOLERS.map((product) => (
              <div 
                key={product.id}
                className="product-card group bg-gradient-to-br from-white/5 to-transparent border border-gfc-500/20 rounded-3xl overflow-hidden hover:border-gfc-500/50 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const fallback = 'https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-gfc-500 text-xs tracking-wider uppercase">{product.model_code}</p>
                  <h3 className="text-2xl font-bold mt-2 group-hover:text-gfc-500 transition-colors">{product.name}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{product.tagline}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-gfc-500 font-bold text-xl">Rs. {product.price_pkr.toLocaleString()}</span>
                    <Link
                      href={`/products/${product.id}`}
                      className="gfc-gradient-bg text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="inline-flex items-center gap-2 gfc-gradient-bg text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-cyan-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Stay Cool with <span className="text-gfc-500">GFC</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Natural cooling, energy efficiency, and unmatched durability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="gfc-gradient-bg text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
              Shop Now
            </Link>
            <Link
              href="/"
              className="border-2 border-gfc-500 text-gfc-500 px-10 py-4 rounded-xl font-bold text-lg hover:text-black hover:border-transparent hover:bg-[linear-gradient(135deg,rgba(186,118,58,1)_0%,rgba(250,248,179,1)_50%,rgba(193,128,64,1)_100%)] transition-all"
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 GFC Pakistan. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/GFCfansPakistan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gfc-500 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/gfcfanspakistan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gfc-500 transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@gfcfansofficial" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gfc-500 transition-colors">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
