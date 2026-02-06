"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Category data with theme colors
const CATEGORIES = [
  {
    id: "fans",
    title: "Ceiling Fans",
    subtitle: "Premium Air Circulation",
    description: "Three decades of innovation in ceiling fan technology. Pure copper motors, aerodynamic blades, whisper-quiet operation.",
    image: "https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800",
    link: "/experience/fans",
    color: "rgb(186, 118, 58)",
    gradient: "from-[rgb(186,118,58)] to-[rgb(193,128,64)]",
    stats: { models: "137+", rpm: "1400", warranty: "3 Years" }
  },
  {
    id: "coolers",
    title: "Air Coolers",
    subtitle: "Natural Cooling Power",
    description: "Turbo cooling performance with honeycomb pads and high-capacity tanks. Energy-efficient evaporative cooling.",
    image: "https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800",
    link: "/experience/coolers",
    color: "rgb(250, 248, 179)",
    gradient: "from-[rgb(186,118,58)] via-[rgb(250,248,179)] to-[rgb(193,128,64)]",
    stats: { capacity: "45L", throw: "50ft", coverage: "400sqft" }
  },
  {
    id: "washers",
    title: "Washing Machines",
    subtitle: "Powerful & Gentle Care",
    description: "Twin tub washers with dual motor system, brake technology, and AC/DC compatibility for uninterrupted cleaning.",
    image: "https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800",
    link: "/experience/washing-machines",
    color: "rgb(193, 128, 64)",
    gradient: "from-[rgb(193,128,64)] to-[rgb(186,118,58)]",
    stats: { capacity: "11KG", spin: "1300rpm", motor: "Dual" }
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const ctx = gsap.context(() => {
      // Hero brand animation
      gsap.fromTo(".hero-letter",
        { opacity: 0, y: 150, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.5
        }
      );

      gsap.fromTo(".hero-tagline",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1.8, ease: "power3.out" }
      );

      gsap.fromTo(".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 2.2, ease: "power3.out" }
      );

      // Scroll indicator bounce
      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut"
      });

      // Category cards animation
      gsap.fromTo(".category-card",
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".categories-section",
            start: "top 70%",
          }
        }
      );

      // Feature items animation
      gsap.fromTo(".feature-item",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 70%",
          }
        }
      );

      // Stats counter animation
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
          }
        }
      );

      // Parallax background
      gsap.to(".parallax-element", {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl text-black"
              style={{ background: 'linear-gradient(135deg, rgb(186, 118, 58) 0%, rgb(250, 248, 179) 50%, rgb(193, 128, 64) 100%)' }}>
              G
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">GFC</span>
              <span className="text-xs text-gray-400 block -mt-1">Pakistan</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/experience/fans" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Fans</Link>
            <Link href="/experience/coolers" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Coolers</Link>
            <Link href="/experience/washing-machines" className="hover:text-gfc-300 transition-colors text-sm sm:text-base">Washers</Link>
            <Link href="/products" className="gfc-gradient-bg text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all text-sm sm:text-base">
              Shop All
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="parallax-element absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gfc-500/10 rounded-full blur-[120px]" />
          <div className="parallax-element absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gfc-300/10 rounded-full blur-[100px]" />
          <div className="parallax-element absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-gfc-400/10 rounded-full blur-[80px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 hero-tagline">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Trusted by millions since 1994</span>
          </div>

          {/* Main Title */}
          <h1 className="text-[5.5rem] sm:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter mb-5">
            <span className="flex justify-center">
              {"GFC".split("").map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block"
                  style={{
                    background: `linear-gradient(135deg, ${CATEGORIES[i % 3].color} 0%, ${CATEGORIES[(i + 1) % 3].color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline text-xl sm:text-2xl lg:text-3xl text-gray-300 font-light max-w-3xl mx-auto mb-3">
            Experience Premium Home Appliances
          </p>
          <p className="hero-tagline text-base text-gray-500 max-w-2xl mx-auto mb-8">
            Ceiling Fans • Air Coolers • Washing Machines
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row justify-center gap-3 mb-4 sm:mb-6">
            <Link 
              href="#explore" 
              className="gfc-gradient-bg text-black px-8 py-3 rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-lg shadow-gfc-500/25"
            >
              Explore Collections
            </Link>
            <Link 
              href="/products" 
              className="border-2 border-white/20 text-white px-8 py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-white/5 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator mt-2 sm:mt-4 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-xs text-gray-500 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gfc-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="explore" className="categories-section py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Product Categories</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black">
              Choose Your <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
              Dive into immersive product experiences. Explore animations, engineering details, and discover what makes GFC special.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href={category.link}
                className="category-card group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                onMouseEnter={() => setActiveCategory(index)}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                  style={{ background: category.color }}
                />

                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  
                  {/* Floating badge */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-black"
                    style={{ background: category.color }}
                  >
                    Explore →
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-sm tracking-wider uppercase mb-2" style={{ color: category.color }}>
                    {category.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4">
                    {Object.entries(category.stats).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-lg px-3 py-2">
                        <p className="text-lg font-bold" style={{ color: category.color }}>{value}</p>
                        <p className="text-xs text-gray-500 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-32 px-6 relative bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Feature List */}
            <div>
              <p className="text-gfc-500 text-sm tracking-[0.3em] uppercase mb-4">Why GFC</p>
              <h2 className="text-4xl sm:text-5xl font-black mb-8">
                Quality You Can <span className="text-gfc-300">Trust</span>
              </h2>
              
              <div className="space-y-6">
                <div className="feature-item flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gfc-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">30+ Years of Excellence</h3>
                    <p className="text-gray-400">Pioneering fan technology in Pakistan since 1994.</p>
                  </div>
                </div>
                <div className="feature-item flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gfc-300/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔶</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Pure Copper Motors</h3>
                    <p className="text-gray-400">100% copper winding for maximum efficiency and durability.</p>
                  </div>
                </div>
                <div className="feature-item flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gfc-400/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Extended Warranty</h3>
                    <p className="text-gray-400">Up to 3-year warranty with nationwide service support.</p>
                  </div>
                </div>
                <div className="feature-item flex gap-4 items-start">
                  <div className="w-12 h-12 bg-gfc-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Energy Efficient</h3>
                    <p className="text-gray-400">Designed to minimize power consumption without compromising performance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Showcase */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gfc-500/10 via-gfc-300/5 to-gfc-400/10 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-8">
                <img
                  src="https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800"
                  alt="GFC Premium Products"
                  className="w-full rounded-2xl"
                />
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-gfc-500 text-sm">Featured Product</p>
                    <h3 className="text-2xl font-bold">Future Series</h3>
                  </div>
                  <Link href="/experience/fans" className="gfc-gradient-bg text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <p className="text-5xl sm:text-6xl font-black gradient-text">30+</p>
              <p className="text-gray-400 mt-2">Years Experience</p>
            </div>
            <div className="stat-item text-center">
              <p className="text-5xl sm:text-6xl font-black gradient-text">137+</p>
              <p className="text-gray-400 mt-2">Fan Models</p>
            </div>
            <div className="stat-item text-center">
              <p className="text-5xl sm:text-6xl font-black gradient-text">1M+</p>
              <p className="text-gray-400 mt-2">Happy Customers</p>
            </div>
            <div className="stat-item text-center">
              <p className="text-5xl sm:text-6xl font-black gradient-text">100%</p>
              <p className="text-gray-400 mt-2">Copper Motors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1205]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            Ready to Experience <span className="gradient-text">GFC</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Explore our immersive product experiences or browse our complete catalog.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/experience/fans" className="gfc-gradient-bg text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-gfc-500/25">
              Start with Fans
            </Link>
            <Link href="/products" className="border-2 border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-2xl text-black"
                  style={{ background: 'linear-gradient(135deg, rgb(186, 118, 58) 0%, rgb(250, 248, 179) 50%, rgb(193, 128, 64) 100%)' }}>
                  G
                </div>
                <div>
                  <span className="font-bold text-xl">GFC Pakistan</span>
                </div>
              </Link>
              <p className="text-gray-400 max-w-md">
                For the last three decades, G.F.C has introduced innovative fan models to satisfy the needs of its customers.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://www.facebook.com/GFCfansPakistan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span>📘</span>
                </a>
                <a href="https://www.instagram.com/gfcfanspakistan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span>📸</span>
                </a>
                <a href="https://www.youtube.com/@gfcfansofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span>▶️</span>
                </a>
                <a href="https://www.tiktok.com/@gfcfanspakistan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span>🎵</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Experiences</h4>
              <ul className="space-y-2">
                <li><Link href="/experience/fans" className="text-gray-400 hover:text-gfc-300 transition-colors">Fans Experience</Link></li>
                <li><Link href="/experience/coolers" className="text-gray-400 hover:text-gfc-300 transition-colors">Coolers Experience</Link></li>
                <li><Link href="/experience/washing-machines" className="text-gray-400 hover:text-gfc-300 transition-colors">Washers Experience</Link></li>
                <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1st Floor, Plaza No. 11</li>
                <li>Block-MB, Phase-6C, DHA</li>
                <li>Lahore, Pakistan</li>
                <li className="pt-2">
                  <a href="tel:+924237132812" className="hover:text-gfc-300 transition-colors">+92-42-37132812</a>
                </li>
                <li>
                  <a href="mailto:gfc@gfcfan.com" className="hover:text-gfc-300 transition-colors">gfc@gfcfan.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2026 GFC Pakistan. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="https://www.gfcfans.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
              <a href="https://www.gfcfans.com/pages/terms-of-services" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">Terms</a>
              <a href="https://www.gfcfans.com/pages/refund-policy" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">Refunds</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
