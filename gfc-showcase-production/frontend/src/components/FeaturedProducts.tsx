'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products/featured');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError('Failed to load featured products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" className="py-20 sm:py-32 bg-primary px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-gold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our premium selection of GFC products handpicked for you
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
            </div>
            <p className="text-gray-400 mt-4">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchFeaturedProducts}
              className="mt-4 btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No products found</p>
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && products.length > 0 && (
          <div className="text-center mt-16">
            <button className="btn-primary text-lg px-10 py-4">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
