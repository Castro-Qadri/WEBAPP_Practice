'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import apiClient from '@/lib/api';
import { STATIC_PRODUCTS, type Product as StaticProduct } from '@/lib/products-data';
import { getOfficialImage } from '@/lib/product-images';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

type Product = StaticProduct & {
  stock?: number;
};

interface Params {
  id: string;
}

function getFallbackImage(product: Product) {
  return getOfficialImage({
    name: product.name,
    model_code: product.model_code,
    category: product.category,
  });
}

export default function ProductDetail({ params }: { params: Params }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [heroTransform, setHeroTransform] = useState('');
  const heroMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProductDetail();
  }, [params.id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/products/${params.id}`);
      const apiProduct = response.data as Product;
      setProduct(apiProduct);
      setImgSrc(getOfficialImage(apiProduct));

      try {
        const relatedResponse = await apiClient.get(`/products/${params.id}/related`);
        setRelatedProducts(relatedResponse.data || []);
      } catch {
        // Ignore related API failure and use static fallback later
      }
      setError(null);
    } catch (err) {
      const staticProduct = STATIC_PRODUCTS.find((p) => p.id === Number(params.id));
      if (staticProduct) {
        setProduct(staticProduct);
        setImgSrc(getOfficialImage(staticProduct));
        setError(null);
      } else {
        setError('Product not found');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!product) return;
    if (relatedProducts.length > 0) return;

    const fallbackRelated = STATIC_PRODUCTS
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);

    setRelatedProducts(fallbackRelated);
  }, [product, relatedProducts.length]);

  const handleAddToCart = () => {
    if (!product) return;
    toast.success(`Added ${quantity} ${product.name} to cart!`);
    setQuantity(1);
  };

  const handleContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const inStock = (product?.stock ?? 1) > 0;

  const galleryImages = useMemo(() => {
    if (!product) return [];
    const base = getOfficialImage(product);
    const withWidth = (url: string, width: number) =>
      url.includes('width=') ? url.replace(/width=\d+/, `width=${width}`) : url;
    const candidates = [
      base,
      withWidth(base, 1200),
      withWidth(base, 900),
      withWidth(base, 600),
    ];
    return Array.from(new Set(candidates.filter(Boolean)));
  }, [product]);

  const colorVariants = useMemo(() => {
    if (!product) return [];
    return [
      { name: 'GFC Gold', hex: 'rgb(186,118,58)' },
      { name: 'Ivory Mist', hex: 'rgb(250,248,179)' },
      { name: 'Copper Glow', hex: 'rgb(193,128,64)' },
      { name: 'Onyx Black', hex: '#0f0f0f' },
    ];
  }, [product]);

  const heroGradient = useMemo(() => {
    const accent = colorVariants[selectedColor]?.hex || 'rgb(186,118,58)';
    return {
      background: `linear-gradient(135deg, ${accent}33 0%, rgba(250,248,179,0.15) 50%, ${accent}33 100%)`,
    };
  }, [colorVariants, selectedColor]);

  const accentColor = colorVariants[selectedColor]?.hex || 'rgb(186,118,58)';

  useEffect(() => {
    if (!heroMediaRef.current) return;
    let rafId = 0;

    const updateTransform = () => {
      if (!heroMediaRef.current) return;
      const rect = heroMediaRef.current.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.min(
        Math.max((viewport - rect.top) / (viewport + rect.height), 0),
        1
      );
      const rotateX = (0.5 - progress) * 10;
      const rotateY = (progress - 0.5) * 8;
      const translateY = (0.5 - progress) * 24;
      setHeroTransform(`translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateTransform);
    };

    updateTransform();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const activeImage = imgSrc || galleryImages[0] || '';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-gfc-500/20 border-t-gfc-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-[#0a0a0a] text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
          <Link href="/products" className="gfc-gradient-bg text-black px-6 py-3 rounded-lg font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/products" className="text-gfc-300 hover:text-gfc-500 transition-colors">
          ← Back to Products
        </Link>
      </div>

      {/* Hero */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500" style={heroGradient}>
            <div
              key={selectedColor}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 30% 20%, ${accentColor}40, transparent 60%)` }}
            />
            <div
              ref={heroMediaRef}
              className="relative p-8 sm:p-12 group"
              style={{ perspective: '1200px', transform: heroTransform, transition: 'transform 0.25s ease-out' }}
            >
              <img
                src={activeImage}
                alt={product.name}
                className={`w-full h-auto max-h-[520px] object-contain drop-shadow-[0_35px_80px_rgba(0,0,0,0.4)] transition-transform duration-700 will-change-transform ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in group-hover:[transform:rotateY(-8deg)_rotateX(4deg)_scale(1.02)]'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => setIsZoomed((prev) => !prev)}
                onError={(e) => {
                  const fallback = getFallbackImage(product);
                  if (e.currentTarget.src !== fallback) {
                    setImgSrc(fallback);
                  }
                }}
              />
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 border border-white/10">
                {isZoomed ? 'Click to reset' : 'Click to zoom'}
              </div>
              {galleryImages.length > 1 && (
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  {galleryImages.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => {
                        setImgSrc(src);
                        setIsZoomed(false);
                      }}
                      className={`w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                        src === activeImage
                          ? 'border-gfc-500 shadow-[0_0_0_2px_rgba(186,118,58,0.3)]'
                          : 'border-white/10 hover:border-gfc-300'
                      }`}
                    >
                      <img src={src} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-gfc-300 border border-gfc-500/30">
                {product.category.replace('_', ' ')}
              </span>
              {product.is_featured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold gfc-gradient-bg text-black">
                  Featured
                </span>
              )}
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-black mb-3 gradient-text">{product.name}</h1>
              <p className="text-xl text-gray-400">{product.tagline}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Model</p>
                <p className="text-white font-mono font-bold mt-1">{product.model_code}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Availability</p>
                <p className={`font-semibold mt-1 ${inStock ? 'text-green-400' : 'text-red-400'}`}>
                  {inStock ? 'In stock' : 'Out of stock'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Price</p>
                <div className="flex items-baseline gap-4">
                  <h2 className="text-4xl font-black text-gfc-300">Rs.{product.price_pkr.toLocaleString()}</h2>
                  {product.price_usd && (
                    <span className="text-gray-500">${product.price_usd}</span>
                  )}
                </div>
              </div>
              {product.rating > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gfc-300">{'★'.repeat(Math.round(product.rating))}</span>
                    <span className="text-gray-500">({product.review_count})</span>
                  </div>
                </div>
              )}
            </div>

            {colorVariants.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Color Variants</p>
                <div className="flex flex-wrap gap-3">
                  {colorVariants.map((color, index) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(index)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
                        selectedColor === index
                          ? 'border-gfc-500 bg-white/5'
                          : 'border-white/10 hover:border-gfc-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/40"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-gray-300">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-white/10 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gfc-300 hover:bg-white/5 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent border-l border-r border-white/10"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gfc-300 hover:bg-white/5 transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 gfc-gradient-bg text-black py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={handleContact}
                className="flex-1 border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
              >
                Contact for Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      {Object.keys(product.specifications).length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-black">Specifications</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-gfc-500">Precision</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">{key}</p>
                  <p className="text-white text-lg font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {product.features.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl sm:text-4xl font-black">Key Features</h2>
              <span className="text-xs uppercase tracking-[0.3em] text-gfc-500">Engineered</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-gfc-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-gfc-300 text-lg">✓</span>
                  </div>
                  <p className="text-white pt-1">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-10">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgb(186,118,58)',
          },
        }}
      />
    </div>
  );
}
