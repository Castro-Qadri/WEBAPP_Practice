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

// Real GFC Washing Machine products
const GFC_WASHERS: Product[] = [
  {
    id: 12,
    name: "GF-1100 Twin Tub",
    model_code: "GF-1100-TT",
    tagline: "Washer & Dryer with Brake System",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800",
    price_pkr: 37800,
  },
  {
    id: 13,
    name: "GF-6600 Deluxe AC-DC",
    model_code: "GF-6600-DX",
    tagline: "Dual Power for Uninterrupted Operation",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg?v=1745391055&width=800",
    price_pkr: 25700,
  },
  {
    id: 14,
    name: "GF-900 Standard",
    model_code: "GF-900-ST",
    tagline: "Reliable Performance for Everyday Needs",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf900.jpg?v=1745391055&width=800",
    price_pkr: 32500,
  },
];

// Washer parts for animation
const WASHER_PARTS = [
  { label: "Wash Drum", detail: "Stainless steel pulsator for powerful agitation", icon: "🔄" },
  { label: "Spin Basket", detail: "High-speed spin for efficient drying", icon: "💨" },
  { label: "Motor System", detail: "Dual motor for wash and spin operations", icon: "⚙️" },
  { label: "Control Panel", detail: "Timer and cycle selection controls", icon: "🎛️" },
];

// Washer specifications
const WASHER_SPECS = [
  { label: "Wash Capacity", value: "11 KG", icon: "👕" },
  { label: "Spin Speed", value: "1300 RPM", icon: "💨" },
  { label: "Motor Type", value: "Dual Motor", icon: "⚙️" },
  { label: "Timer", value: "15 Min", icon: "⏱️" },
  { label: "Power", value: "AC/DC", icon: "🔌" },
  { label: "Material", value: "Steel Body", icon: "🛡️" },
];

// Wash cycle phases
const WASH_CYCLES = [
  { name: "Fill", duration: "2 min", icon: "💧", color: "#3B82F6" },
  { name: "Wash", duration: "8 min", icon: "🔄", color: "#8B5CF6" },
  { name: "Rinse", duration: "3 min", icon: "🌊", color: "#06B6D4" },
  { name: "Spin", duration: "5 min", icon: "💨", color: "#10B981" },
];

export default function WashingMachinesExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drumRotation, setDrumRotation] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

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
        { scale: 0.8, opacity: 0, rotateY: -15 },
        {
          scale: 1,
          opacity: 1,
          rotateY: 0,
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

      // Drum rotation on scroll
      ScrollTrigger.create({
        trigger: ".section-product",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          setDrumRotation(self.progress * 360);
        }
      });

      // Cycle phase animation
      ScrollTrigger.create({
        trigger: ".section-cycle",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          const phase = Math.floor(self.progress * 4);
          setActivePhase(Math.min(phase, 3));
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

      // Motor animation
      gsap.fromTo(".motor-ring",
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-motor",
            start: "top 60%",
          }
        }
      );

      // Drive belt animation
      gsap.fromTo(".belt-path",
        { strokeDashoffset: 800 },
        {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section-motor",
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
            <Link href="/experience/coolers" className="hover:text-gfc-300 transition-colors">Coolers</Link>
            <Link href="/experience/washing-machines" className="text-gfc-300 font-semibold">Washers</Link>
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
          {/* Bubbles animation */}
          <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce" style={{ animationDuration: '2s' }} />
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-purple-400/15 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
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
            Washing Machines
          </p>
          <p className="brand-tagline text-lg text-gray-500 mt-4 max-w-xl mx-auto">
            Powerful cleaning. Gentle care. Built to last.
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
                GF-1100
              </h2>
              <h3 className="text-2xl text-gfc-300 mb-6">Twin Tub Washer & Dryer</h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The GF-1100 combines powerful washing and efficient drying in one machine. 
                With its innovative brake system and dual motors, it delivers thorough cleaning 
                while being gentle on your clothes.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">11KG</p>
                  <p className="text-gray-400 mt-1">Wash Capacity</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">1300</p>
                  <p className="text-gray-400 mt-1">RPM Spin</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">2</p>
                  <p className="text-gray-400 mt-1">Motors</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">15</p>
                  <p className="text-gray-400 mt-1">Min Timer</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="gfc-gradient-bg text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
                  Rs. 37,800
                </button>
                <Link
                  href="/products/12"
                  className="border-2 border-gfc-500 text-gfc-500 px-8 py-4 rounded-xl font-bold text-lg hover:gfc-gradient-bg hover:text-white transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Product Image with Drum Animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gfc-500/20 to-transparent rounded-3xl blur-3xl" />
              <div className="product-hero-image relative">
                <img
                  src="https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800"
                  alt="GFC GF-1100 Washing Machine"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-purple-500/20"
                />
                {/* Rotating drum indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="4" />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#A855F7" 
                      strokeWidth="4"
                      strokeDasharray="280"
                      strokeDashoffset={280 - (drumRotation / 360) * 280}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Wash Cycle Animation */}
      <section className="section-cycle min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#100a15] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Wash Technology</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Complete <span className="text-gfc-500">Wash Cycle</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Our intelligent wash cycle ensures thorough cleaning while being gentle on fabrics.
            </p>
          </div>

          {/* Cycle visualization */}
          <div className="relative max-w-4xl mx-auto">
            <div className="flex justify-between items-center relative">
              {/* Connection line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-gfc-500 to-purple-400 -translate-y-1/2 transition-all duration-500"
                style={{ width: `${(activePhase + 1) * 25}%` }}
              />
              
              {WASH_CYCLES.map((cycle, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                      i <= activePhase 
                        ? 'gfc-gradient-bg scale-110' 
                        : 'bg-gray-800'
                    }`}
                  >
                    {cycle.icon}
                  </div>
                  <p className={`mt-4 font-bold ${i <= activePhase ? 'text-gfc-300' : 'text-gray-500'}`}>
                    {cycle.name}
                  </p>
                  <p className="text-gray-600 text-sm">{cycle.duration}</p>
                </div>
              ))}
            </div>

            {/* Active phase description */}
            <div className="mt-16 text-center">
              <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-8 max-w-lg mx-auto">
                <span className="text-4xl mb-4 block">{WASH_CYCLES[activePhase].icon}</span>
                <h3 className="text-2xl font-bold text-gfc-300 mb-2">{WASH_CYCLES[activePhase].name} Phase</h3>
                <p className="text-gray-400">Duration: {WASH_CYCLES[activePhase].duration}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Parts Breakdown */}
      <section className="section-parts min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Built to Last</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Premium <span className="text-gfc-500">Components</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Every GFC washing machine is built with high-quality materials for years of reliable service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WASHER_PARTS.map((part, i) => (
              <div 
                key={i}
                className="part-card bg-gradient-to-br from-white/5 to-purple-900/10 border border-gfc-500/20 rounded-3xl p-8 hover:border-gfc-500/50 transition-all duration-300 group"
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

      {/* Section 5: Motor & Drive System */}
      <section className="section-motor min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#100a15] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Motor Diagram */}
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-md">
                {/* Wash motor (left) */}
                <circle className="motor-ring" cx="130" cy="200" r="70" fill="none" stroke="url(#motorGradientPurple)" strokeWidth="4" />
                <circle className="motor-ring" cx="130" cy="200" r="50" fill="url(#motorCorePurple)" />
                <circle className="motor-ring" cx="130" cy="200" r="25" fill="#0a0a0a" />
                <text x="130" y="290" fill="#9CA3AF" fontSize="12" textAnchor="middle">WASH MOTOR</text>
                
                {/* Spin motor (right) */}
                <circle className="motor-ring" cx="270" cy="200" r="70" fill="none" stroke="url(#motorGradientPurple)" strokeWidth="4" />
                <circle className="motor-ring" cx="270" cy="200" r="50" fill="url(#motorCorePurple)" />
                <circle className="motor-ring" cx="270" cy="200" r="25" fill="#0a0a0a" />
                <text x="270" y="290" fill="#9CA3AF" fontSize="12" textAnchor="middle">SPIN MOTOR</text>
                
                {/* Drive belt connection */}
                <path 
                  className="belt-path"
                  d="M130 130 Q200 80 270 130 M130 270 Q200 320 270 270"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="3"
                  strokeDasharray="800"
                  strokeDashoffset="800"
                  strokeLinecap="round"
                />
                
                {/* Center connection */}
                <rect className="motor-ring" x="175" y="175" width="50" height="50" rx="8" fill="none" stroke="#A855F7" strokeWidth="2" />
                <text x="200" y="205" fill="#A855F7" fontSize="10" textAnchor="middle" fontWeight="bold">BRAKE</text>
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="motorGradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <radialGradient id="motorCorePurple">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#100a15" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Motor Info */}
            <div>
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Dual Motor System</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                Independent <span className="text-gfc-500">Motors</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                The GF-1100 features a dual motor system with independent wash and spin motors. 
                This allows simultaneous washing and drying operations, plus the innovative brake 
                system ensures safety and precise control during spin cycles.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {WASHER_SPECS.map((spec, i) => (
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

      {/* Section 6: Features Highlight */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Why Choose GFC</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Key <span className="text-gfc-500">Features</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/5 to-purple-900/10 border border-gfc-500/20 rounded-3xl p-8 text-center hover:border-gfc-500/50 transition-all">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-300 mb-3">AC/DC Compatible</h3>
              <p className="text-gray-400">Works with both AC power and DC inverter for uninterrupted operation during load shedding.</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-purple-900/10 border border-gfc-500/20 rounded-3xl p-8 text-center hover:border-gfc-500/50 transition-all">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🛑</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-300 mb-3">Brake System</h3>
              <p className="text-gray-400">Innovative brake mechanism stops the spin basket instantly for safe and convenient access.</p>
            </div>
            <div className="bg-gradient-to-br from-white/5 to-purple-900/10 border border-gfc-500/20 rounded-3xl p-8 text-center hover:border-gfc-500/50 transition-all">
              <div className="w-20 h-20 mx-auto gfc-gradient-bg/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-300 mb-3">Steel Body</h3>
              <p className="text-gray-400">Durable steel construction ensures long-lasting performance and rust resistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Products Grid */}
      <section className="section-products min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#100a15] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Explore Collection</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              GFC <span className="text-gfc-500">Washers</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Find the perfect washing machine for your household needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GFC_WASHERS.map((product) => (
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
                      const fallback = 'https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800';
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
                      className="gfc-gradient-bg text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="inline-flex items-center gap-2 gfc-gradient-bg text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Reliable Cleaning with <span className="text-gfc-500">GFC</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Powerful performance, gentle care, and lasting durability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="gfc-gradient-bg text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
              Shop Now
            </Link>
            <Link href="/" className="border-2 border-gfc-500 text-gfc-500 px-10 py-4 rounded-xl font-bold text-lg hover:gfc-gradient-bg hover:text-white transition-all">
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
