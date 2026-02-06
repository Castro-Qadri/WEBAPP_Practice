'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { getOfficialImage } from '@/lib/product-images';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const fallbackImage = useMemo(() => getOfficialImage({
    name: product.name,
    model_code: product.model_code,
    category: product.category,
  }), [product.name, product.model_code, product.category]);

  const [imgSrc, setImgSrc] = useState(getOfficialImage(product));

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group card cursor-pointer h-full flex flex-col overflow-hidden border border-white/10 hover:border-gfc-500">
        {/* Image Container */}
        <div className="relative h-64 sm:h-72 bg-white/5 overflow-hidden">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImage) {
                setImgSrc(fallbackImage);
              }
            }}
            loading="lazy"
          />
          {product.is_featured && (
            <div className="absolute top-4 right-4 gfc-gradient-bg text-black px-3 py-1 rounded-full text-sm font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col">
          {/* Category Badge */}
          <div className="inline-flex w-fit">
            <span className="text-xs font-semibold text-gfc-300 uppercase tracking-wider">
              {product.category.replace('_', ' ')}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-bold mt-3 group-hover:text-gfc-300 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-gray-400 mt-2 line-clamp-2 flex-1">
            {product.tagline}
          </p>

          {/* Model Code */}
          <p className="text-xs text-gray-500 mt-3 font-mono">
            {product.model_code}
          </p>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-xs text-gray-400">({product.review_count})</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gfc-300 font-bold text-lg">Rs.{product.price_pkr.toLocaleString()}</span>
              {product.price_usd && (
                <span className="text-xs text-gray-400">${product.price_usd}</span>
              )}
            </div>
            <button
              className="gfc-gradient-bg text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
