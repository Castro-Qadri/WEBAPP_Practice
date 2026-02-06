'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-gold/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-black font-bold">
                GFC
              </div>
              <span className="text-gold">Showcase</span>
            </h3>
            <p className="text-gray-400">
              Premium GFC products for your home and lifestyle needs.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: '🔵', label: 'Facebook', href: 'https://facebook.com/GFCfansPakistan' },
                { icon: '📷', label: 'Instagram', href: 'https://instagram.com/gfcfanspakistan' },
                { icon: '▶️', label: 'YouTube', href: 'https://youtube.com/@gfcfansofficial' },
                { icon: '🎵', label: 'TikTok', href: 'https://tiktok.com/@gfcfanspakistan' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-gold/20 flex items-center justify-center transition-colors"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Products', href: '#products' },
                { label: 'Categories', href: '#categories' },
                { label: 'Contact', href: '#contact' },
                { label: 'About Us', href: '#about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-bold mb-6 text-gold">Categories</h4>
            <ul className="space-y-3">
              {[
                'Ceiling Fans',
                'Air Coolers',
                'Washing Machines',
                'Air Purifiers',
              ].map((category) => (
                <li key={category}>
                  <a
                    href="#categories"
                    className="text-gray-400 hover:text-gold transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-gold">Contact</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <a
                  href="tel:+924237132812"
                  className="text-white hover:text-gold transition-colors"
                >
                  +92-42-37132812
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <a
                  href="mailto:gfc@gfcfan.com"
                  className="text-white hover:text-gold transition-colors"
                >
                  gfc@gfcfan.com
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Address</p>
                <p className="text-white">
                  DHA, Lahore<br />Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {currentYear} GFC Showcase. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-gold transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
