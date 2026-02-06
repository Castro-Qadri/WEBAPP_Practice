'use client';

import React, { useEffect } from 'react';
import { titleLetterAnimation } from '@/lib/animations';

export default function Hero() {
  useEffect(() => {
    titleLetterAnimation('.hero-title');
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title */}
        <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-white">
          GFC SHOWCASE
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Authentic GFC Products - Ceiling Fans, Air Coolers & Washing Machines
        </p>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.7s' }}>
          Experience premium quality products trusted by thousands. From energy-efficient ceiling fans to smart washing machines, discover the perfect solution for your home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <button className="btn-primary text-lg px-10 py-4 relative group overflow-hidden">
            <span className="relative z-10">Explore Products</span>
            <div className="absolute inset-0 bg-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </button>
          <button className="btn-secondary text-lg px-10 py-4">
            View Categories
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
