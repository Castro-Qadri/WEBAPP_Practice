'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import apiClient from '@/lib/api';
import { STATIC_PRODUCTS, type Product } from '@/lib/products-data';
import { getOfficialImage } from '@/lib/product-images';

const categoryColors: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  ceiling_fan: { bg: 'bg-gfc-500', text: 'text-gfc-300', border: 'border-gfc-500/30', hover: 'hover:border-gfc-500' },
  pedestal_fan: { bg: 'bg-gfc-400', text: 'text-gfc-300', border: 'border-gfc-400/30', hover: 'hover:border-gfc-400' },
  bracket_fan: { bg: 'bg-gfc-400', text: 'text-gfc-300', border: 'border-gfc-400/30', hover: 'hover:border-gfc-400' },
  air_cooler: { bg: 'bg-gfc-300', text: 'text-gfc-300', border: 'border-gfc-300/30', hover: 'hover:border-gfc-300' },
  washing_machine: { bg: 'bg-gfc-400', text: 'text-gfc-300', border: 'border-gfc-400/30', hover: 'hover:border-gfc-400' },
  default: { bg: 'bg-gfc-500', text: 'text-gfc-300', border: 'border-gfc-500/30', hover: 'hover:border-gfc-500' },
};

function getCategoryColor(category: string) {
  return categoryColors[category] || categoryColors.default;
}

function getFallbackImage(label: string, category?: string, modelCode?: string) {
  return getOfficialImage({ name: label, category, model_code: modelCode });
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products');
      const apiProducts = Array.isArray(response.data) ? response.data : response.data.results || [];
      if (apiProducts.length > 0) {
        setProducts(apiProducts);
      } else {
        // Use static data as fallback
        setProducts(STATIC_PRODUCTS);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      // Use static data as fallback when API fails
      setProducts(STATIC_PRODUCTS);
      setError(null); // Don't show error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price_pkr - b.price_pkr;
        case 'price-high':
          return b.price_pkr - a.price_pkr;
        case 'rating':
          return b.rating - a.rating;
        case 'latest':
        default:
          return b.id - a.id;
      }
    });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="gradient-text">
              All Products
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Browse our complete collection of premium GFC home appliances
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const colors = getCategoryColor(cat);
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                      isSelected
                        ? `${colors.bg} text-black shadow-lg`
                        : `bg-white/5 text-gray-400 hover:text-white border ${colors.border} ${colors.hover}`
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:border-gfc-500 outline-none transition-colors cursor-pointer"
            >
              <option value="latest" className="bg-[#1a1a1a]">Latest</option>
              <option value="price-low" className="bg-[#1a1a1a]">Price: Low to High</option>
              <option value="price-high" className="bg-[#1a1a1a]">Price: High to Low</option>
              <option value="rating" className="bg-[#1a1a1a]">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 mb-8">
          Showing <span className="text-white font-semibold">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-gfc-500/20 border-t-gfc-500 rounded-full animate-spin" />
            </div>
            <p className="text-gray-400 mt-6 text-lg">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-400 mb-6 text-lg">{error}</p>
            <button
              onClick={fetchAllProducts}
              className="gfc-gradient-bg text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-gfc-500/30 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => {
              const colors = getCategoryColor(product.category);
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden ${colors.hover} transition-all duration-500 hover:shadow-xl`}
                >
                  {/* Featured Badge */}
                  {product.is_featured && (
                    <div className={`absolute top-4 left-4 z-10 ${colors.bg} px-3 py-1 rounded-full text-xs font-bold text-black`}>
                      Featured
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <img
                      src={getOfficialImage(product)}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const fallback = getFallbackImage(product.name, product.category, product.model_code);
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <span className={`text-xs font-medium ${colors.text} uppercase tracking-wider`}>
                      {product.category.replace('_', ' ')}
                    </span>

                    {/* Name */}
                    <h3 className="text-xl font-bold mt-2 mb-1 group-hover:text-white transition-colors">
                      {product.name}
                    </h3>

                    {/* Model Code */}
                    <p className="text-gray-500 text-sm mb-3">{product.model_code}</p>

                    {/* Tagline */}
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{product.tagline}</p>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-white">
                        {formatPrice(product.price_pkr)}
                      </span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gfc-300 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm text-gray-400">{product.rating.toFixed(1)}</span>
                        <span className="text-xs text-gray-500">({product.review_count})</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div className={`absolute top-6 right-6 w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-400 mb-6 text-lg">No products found in this category</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="gfc-gradient-bg text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-gfc-500/30 transition-all"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
