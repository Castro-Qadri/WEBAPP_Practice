'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/10"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(186, 118, 58) 0%, rgb(250, 248, 179) 50%, rgb(193, 128, 64) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-black/10">
              <img
                src="/gfc-logo.png"
                alt="GFC"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="font-bold text-xl text-[#2b1a0e] hidden sm:inline group-hover:opacity-80 transition-opacity">
              Showcase
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[#2b1a0e]">
            <Link href="/category/fans" className="hover:text-black transition-colors">
              Fans
            </Link>
            <Link href="/category/coolers" className="hover:text-black transition-colors">
              Coolers
            </Link>
            <Link href="/category/washing-machines" className="hover:text-black transition-colors">
              Washing Machines
            </Link>
            <Link href="/products" className="hover:text-black transition-colors">
              All Products
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 hover:gap-2 transition-all"
          >
            <div className={`h-0.5 w-full bg-[#2b1a0e] transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`h-0.5 w-full bg-[#2b1a0e] ${isOpen ? 'opacity-0' : ''}`} />
            <div className={`h-0.5 w-full bg-[#2b1a0e] transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4 text-[#2b1a0e]">
            <Link href="/category/fans" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Fans
            </Link>
            <Link href="/category/coolers" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Coolers
            </Link>
            <Link href="/category/washing-machines" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Washing Machines
            </Link>
            <Link href="/products" className="hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              All Products
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
