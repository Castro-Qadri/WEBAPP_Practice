'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import apiClient from '@/lib/api';

interface Product {
  id: number;
  name: string;
  model_code: string;
  category: string;
  tagline: string;
  image_url: string;
  price_pkr: number;
  price_usd?: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
}

export default function CategoryProducts() {
  const [categories, setCategories] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products/by-category');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      ceiling_fan: '🌀 Ceiling Fans',
      pedestal_fan: '🌬️ Pedestal Fans',
      bracket_fan: '📌 Bracket Fans',
      exhaust_fan: '💨 Exhaust Fans',
      air_cooler: '❄️ Air Coolers',
      washing_machine: '🌊 Washing Machines',
      dryer: '🔥 Dryers',
      air_purifier: '💨 Air Purifiers',
      geyser: '🚿 Geysers',
    };
    return titles[category] || category.replace('_', ' ');
  };

  const getCategoryExperienceLink = (category: string) => {
    const map: Record<string, string> = {
      ceiling_fan: '/category/fans',
      pedestal_fan: '/category/fans',
      bracket_fan: '/category/fans',
      exhaust_fan: '/category/fans',
      air_cooler: '/category/coolers',
      washing_machine: '/category/washing-machines',
    };
    return map[category];
  };

  return (
    <section id="categories" className="py-20 sm:py-32 bg-secondary px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-gold mb-4">Product Categories</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Browse our complete collection organized by category
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
            <p className="text-gray-400 mt-4">Loading categories...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchCategoryProducts}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Categories */}
        {!loading && !error && Object.keys(categories).length > 0 && (
          <div className="space-y-20">
            {Object.entries(categories).map(([categoryKey, products]) => (
              <div key={categoryKey} className="space-y-8">
                <div className="border-l-4 border-gold pl-6 flex flex-col gap-3">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                      {getCategoryTitle(categoryKey)}
                    </h3>
                    <p className="text-gray-400">
                      Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {getCategoryExperienceLink(categoryKey) && (
                    <Link
                      href={getCategoryExperienceLink(categoryKey)}
                      className="text-gold hover:text-white transition-colors w-fit"
                    >
                      View Full Animated Experience →
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {products.map((product) => (
                    <div key={product.id} className="animate-slide-up">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && Object.keys(categories).length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No categories found</p>
          </div>
        )}
      </div>
    </section>
  );
}
