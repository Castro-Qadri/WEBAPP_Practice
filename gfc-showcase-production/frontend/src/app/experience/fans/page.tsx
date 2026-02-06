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

// Real GFC Fan products data
const GFC_FANS: Product[] = [
  {
    id: 1,
    name: "Future",
    model_code: "GFC-FUTURE",
    tagline: "Modern Design with Premium Finish",
    image_url: "https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800",
    price_pkr: 15880,
  },
  {
    id: 2,
    name: "Spring",
    model_code: "GFC-SPRING",
    tagline: "Classic Design with Powerful Performance",
    image_url: "https://www.gfcfans.com/cdn/shop/files/SPRING_3.jpg?v=1767938344&width=800",
    price_pkr: 15400,
  },
  {
    id: 3,
    name: "Apex",
    model_code: "GFC-APEX",
    tagline: "Premium Quality Ceiling Fan",
    image_url: "https://www.gfcfans.com/cdn/shop/files/5_20250812_112018_0000-ezgif.com-webp-to-jpg-converter.jpg?v=1756127144&width=800",
    price_pkr: 10460,
  },
  {
    id: 4,
    name: "Glamour",
    model_code: "GFC-GLAMOUR",
    tagline: "Elegant Style with Superior Airflow",
    image_url: "https://www.gfcfans.com/cdn/shop/files/glamour_48a71490-dc17-4530-bd30-033d4379064e.jpg?v=1744776993&width=800",
    price_pkr: 17080,
  },
  {
    id: 5,
    name: "Sapphire",
    model_code: "GFC-SAPPHIRE",
    tagline: "Precision Engineering for Premium Comfort",
    image_url: "https://www.gfcfans.com/cdn/shop/files/sapphire2_2ffe8125-9fba-4f71-a996-c773fc87d02e.jpg?v=1744779107&width=800",
    price_pkr: 11600,
  },
  {
    id: 6,
    name: "Heritage",
    model_code: "GFC-HERITAGE",
    tagline: "Traditional Craftsmanship, Modern Performance",
    image_url: "https://www.gfcfans.com/cdn/shop/files/heritage4_00505761-803d-4632-9d2c-624ec4457694.jpg?v=1744788149&width=800",
    price_pkr: 9085,
  },
];

// Fan parts for animation
const FAN_PARTS = [
  { id: "blade1", label: "Aerodynamic Blades", detail: "3 precision-balanced aluminum blades for maximum airflow", angle: 0 },
  { id: "blade2", label: "Blade Design", detail: "Optimized pitch angle for silent operation", angle: 120 },
  { id: "blade3", label: "Blade Material", detail: "Die-cast aluminum for durability", angle: 240 },
  { id: "motor", label: "Copper Motor", detail: "100% pure copper winding for efficiency", angle: -1 },
  { id: "bearing", label: "Ball Bearing", detail: "Double sealed bearings for long life", angle: -1 },
  { id: "capacitor", label: "Capacitor", detail: "High-grade capacitor for stable speed", angle: -1 },
];

// Motor specifications
const MOTOR_SPECS = [
  { label: "Winding", value: "100% Pure Copper", icon: "🔶" },
  { label: "Insulation", value: "Class B (130°C)", icon: "🛡️" },
  { label: "Bearings", value: "Sealed Ball Bearings", icon: "⚙️" },
  { label: "Speed", value: "1400 RPM Max", icon: "💨" },
  { label: "Power", value: "65W Energy Efficient", icon: "⚡" },
  { label: "Voltage", value: "AC 220-240V", icon: "🔌" },
];

export default function FansExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [fanRotation, setFanRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize animations
    const ctx = gsap.context(() => {
      // Initial brand reveal
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

      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });

      // Section 1: Hero to Product transition
      ScrollTrigger.create({
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          setCurrentSection(0);
        }
      });

      // Section 2: Product showcase
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

      // Fan rotation on scroll
      ScrollTrigger.create({
        trigger: ".section-product",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          setFanRotation(self.progress * 720);
          setCurrentSection(1);
        }
      });

      // Section 3: Parts explosion
      gsap.fromTo(".part-item",
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".section-parts",
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          }
        }
      );

      // Section 4: Motor animation
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

      // Copper winding animation
      gsap.fromTo(".winding-line",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-motor",
            start: "top 50%",
          }
        }
      );

      // Section 5: Circuit animation
      gsap.fromTo(".circuit-path",
        { strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".section-circuit",
            start: "top 60%",
          }
        }
      );

      gsap.fromTo(".circuit-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".section-circuit",
            start: "top 50%",
          }
        }
      );

      // Section 6: Products grid
      gsap.fromTo(".product-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-products",
            start: "top 70%",
          }
        }
      );

      // Parallax effects
      gsap.to(".parallax-bg", {
        yPercent: 50,
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
            <Link href="/experience/fans" className="text-gfc-300 font-semibold">Fans</Link>
            <Link href="/experience/coolers" className="hover:text-gfc-300 transition-colors">Coolers</Link>
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
            Ceiling Fans
          </p>
          <p className="brand-tagline text-lg text-gray-500 mt-4 max-w-xl mx-auto">
            Three decades of innovation. Precision engineering. Pure comfort.
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
            <div className="order-2 lg:order-1">
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Flagship Model</p>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6">
                Future
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                The Future ceiling fan represents the pinnacle of GFC engineering. 
                With its aerodynamic blade design and whisper-quiet motor, it delivers 
                exceptional airflow while consuming minimal energy.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">1400</p>
                  <p className="text-gray-400 mt-1">RPM Max Speed</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">65W</p>
                  <p className="text-gray-400 mt-1">Power Consumption</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">48"</p>
                  <p className="text-gray-400 mt-1">Blade Span</p>
                </div>
                <div className="bg-white/5 border border-gfc-500/20 rounded-2xl p-6">
                  <p className="text-4xl font-bold text-gfc-500">3Y</p>
                  <p className="text-gray-400 mt-1">Warranty</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="gfc-gradient-bg text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
                  Rs. 15,880
                </button>
                <Link
                  href="/products/1"
                  className="border-2 border-gfc-500 text-gfc-500 px-8 py-4 rounded-xl font-bold text-lg hover:gfc-gradient-bg hover:text-black transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gfc-500/20 to-transparent rounded-full blur-3xl" />
              <div className="product-hero-image relative">
                <img
                  src="https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800"
                  alt="GFC Future Ceiling Fan"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-amber-500/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Parts Explosion */}
      <section className="section-parts min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Engineering Excellence</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Precision <span className="text-gfc-500">Components</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Every GFC fan is built with carefully selected components that work in harmony to deliver unmatched performance.
            </p>
          </div>

          <div className="relative min-h-[600px]">
            {/* Center Fan Image */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
              <div className="absolute inset-0 gfc-gradient-bg/20 rounded-full blur-3xl" />
              <img
                src="https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=600"
                alt="Fan Components"
                className="relative w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Parts around the fan */}
            <div className="part-item absolute top-[10%] left-[10%] bg-black/80 border border-gfc-500/30 rounded-2xl p-6 max-w-xs backdrop-blur-sm">
              <div className="w-12 h-12 gfc-gradient-bg/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔶</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-500">Aerodynamic Blades</h3>
              <p className="text-gray-400 mt-2">3 precision-balanced aluminum blades optimized for maximum airflow with minimal noise.</p>
            </div>

            <div className="part-item absolute top-[10%] right-[10%] bg-black/80 border border-gfc-500/30 rounded-2xl p-6 max-w-xs backdrop-blur-sm">
              <div className="w-12 h-12 gfc-gradient-bg/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-500">Ball Bearings</h3>
              <p className="text-gray-400 mt-2">Double-sealed ball bearings for smooth, silent rotation and extended lifespan.</p>
            </div>

            <div className="part-item absolute bottom-[10%] left-[10%] bg-black/80 border border-gfc-500/30 rounded-2xl p-6 max-w-xs backdrop-blur-sm">
              <div className="w-12 h-12 gfc-gradient-bg/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔌</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-500">Copper Winding</h3>
              <p className="text-gray-400 mt-2">100% pure copper motor winding for high efficiency and reliable performance.</p>
            </div>

            <div className="part-item absolute bottom-[10%] right-[10%] bg-black/80 border border-gfc-500/30 rounded-2xl p-6 max-w-xs backdrop-blur-sm">
              <div className="w-12 h-12 gfc-gradient-bg/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gfc-500">Die-Cast Housing</h3>
              <p className="text-gray-400 mt-2">Premium die-cast aluminum housing for durability and efficient heat dissipation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Motor Engineering */}
      <section className="section-motor min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Motor Visualization */}
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full max-w-md">
                {/* Outer ring */}
                <circle className="motor-ring" cx="200" cy="200" r="180" fill="none" stroke="url(#motorGradient)" strokeWidth="4" />
                <circle className="motor-ring" cx="200" cy="200" r="150" fill="none" stroke="url(#motorGradient)" strokeWidth="3" opacity="0.7" />
                <circle className="motor-ring" cx="200" cy="200" r="120" fill="none" stroke="url(#motorGradient)" strokeWidth="2" opacity="0.5" />
                
                {/* Copper winding visualization */}
                <path 
                  className="winding-line"
                  d="M200 50 Q350 100 350 200 Q350 300 200 350 Q50 300 50 200 Q50 100 200 50"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="3"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
                <path 
                  className="winding-line"
                  d="M200 80 Q320 120 320 200 Q320 280 200 320 Q80 280 80 200 Q80 120 200 80"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                />
                
                {/* Core */}
                <circle cx="200" cy="200" r="60" fill="url(#coreGradient)" className="motor-ring" />
                <circle cx="200" cy="200" r="30" fill="#1a1a1a" stroke="#D97706" strokeWidth="2" className="motor-ring" />
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="motorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <radialGradient id="coreGradient">
                    <stop offset="0%" stopColor="#D97706" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Motor Info */}
            <div>
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Heart of Performance</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                Pure Copper <span className="text-gfc-500">Motor</span>
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                At the core of every GFC fan is our legendary copper motor. Hand-wound with 100% pure copper wire, 
                it delivers superior torque, exceptional efficiency, and whisper-quiet operation that lasts for decades.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {MOTOR_SPECS.map((spec, i) => (
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

      {/* Section 5: Circuit Diagram */}
      <section className="section-circuit min-h-screen py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Electrical Engineering</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              AC Motor <span className="text-gfc-500">Circuit</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Simplified circuit design with integrated speed regulator and thermal protection for safe, reliable operation.
            </p>
          </div>

          <div className="relative">
            <svg viewBox="0 0 800 400" className="w-full max-w-4xl mx-auto">
              {/* Main circuit path */}
              <path
                className="circuit-path"
                d="M50 200 L150 200 L200 100 L300 100 L350 200 L450 200 L500 300 L600 300 L650 200 L750 200"
                fill="none"
                stroke="#D97706"
                strokeWidth="3"
                strokeDasharray="500"
                strokeDashoffset="500"
              />
              
              {/* Circuit nodes */}
              <circle className="circuit-node" cx="50" cy="200" r="12" fill="#D97706" />
              <circle className="circuit-node" cx="150" cy="200" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="200" cy="100" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="300" cy="100" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="350" cy="200" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="450" cy="200" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="500" cy="300" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="600" cy="300" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="650" cy="200" r="10" fill="#D97706" />
              <circle className="circuit-node" cx="750" cy="200" r="12" fill="#D97706" />
              
              {/* Labels */}
              <text x="50" y="240" fill="#9CA3AF" fontSize="12" textAnchor="middle">AC Input</text>
              <text x="250" y="80" fill="#9CA3AF" fontSize="12" textAnchor="middle">Capacitor</text>
              <text x="400" y="180" fill="#9CA3AF" fontSize="12" textAnchor="middle">Regulator</text>
              <text x="550" y="340" fill="#9CA3AF" fontSize="12" textAnchor="middle">Thermal Cut-off</text>
              <text x="750" y="240" fill="#9CA3AF" fontSize="12" textAnchor="middle">Motor</text>
              
              {/* Component boxes */}
              <rect x="220" y="85" width="60" height="30" rx="4" fill="none" stroke="#F59E0B" strokeWidth="2" className="circuit-node" />
              <rect x="370" y="185" width="60" height="30" rx="4" fill="none" stroke="#F59E0B" strokeWidth="2" className="circuit-node" />
              <rect x="520" y="285" width="60" height="30" rx="4" fill="none" stroke="#F59E0B" strokeWidth="2" className="circuit-node" />
            </svg>

            {/* Circuit info cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="bg-black/50 border border-gfc-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-gfc-500 mb-3">Speed Regulator</h3>
                <p className="text-gray-400">Variable speed control from off to maximum, with smooth transitions and stable performance at each setting.</p>
              </div>
              <div className="bg-black/50 border border-gfc-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-gfc-500 mb-3">Thermal Protection</h3>
                <p className="text-gray-400">Built-in thermal cut-off prevents overheating, automatically shutting down if temperature exceeds safe limits.</p>
              </div>
              <div className="bg-black/50 border border-gfc-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-gfc-500 mb-3">Capacitor Start</h3>
                <p className="text-gray-400">High-grade capacitor provides smooth starting torque and maintains consistent speed under varying loads.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Remaining Products */}
      <section className="section-products min-h-screen py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Explore Collection</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              More GFC <span className="text-gfc-500">Fans</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Discover our complete range of ceiling fans, each designed with the same commitment to quality and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GFC_FANS.map((product) => (
              <div 
                key={product.id}
                className="product-card group bg-gradient-to-br from-white/5 to-transparent border border-gfc-500/20 rounded-3xl overflow-hidden hover:border-gfc-500/50 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-amber-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            Experience the <span className="text-gfc-500">GFC</span> Difference
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of satisfied customers who trust GFC for their comfort needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="gfc-gradient-bg text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all">
              Shop Now
            </Link>
            <Link href="/" className="border-2 border-gfc-500 text-gfc-500 px-10 py-4 rounded-xl font-bold text-lg hover:gfc-gradient-bg hover:text-black transition-all">
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
