'use client';

import React from 'react';
import Link from 'next/link';

const experiences = [
  {
    title: 'Fans Experience',
    subtitle: 'Live airflow motion + motor breakdown',
    href: '/category/fans',
    image:
      'https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859',
  },
  {
    title: 'Coolers Experience',
    subtitle: 'Turbo cooling + parts animation',
    href: '/category/coolers',
    image:
      'https://www.gfcfans.com/cdn/shop/files/7800cooler_b20acda9-459b-4758-b966-27ea5e575a5f.jpg?v=1767702443',
  },
  {
    title: 'Washing Machines Experience',
    subtitle: 'Wash cycle motion + motor insight',
    href: '/category/washing-machines',
    image:
      'https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651',
  },
];

export default function ExperienceSelector() {
  return (
    <section className="py-20 sm:py-28 bg-primary px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-title text-gold mb-4">Choose Your Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select a category to enter a fully animated single-page product story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl overflow-hidden border border-gold/20 bg-secondary shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.subtitle}</p>
                <span className="text-gold">Enter Experience →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
