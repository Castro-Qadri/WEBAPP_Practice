'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/newsletter', { email });
      toast.success('Subscribed successfully! Check your email.');
      setEmail('');
    } catch (error: any) {
      if (error.response?.data?.detail === 'Already subscribed') {
        toast.error('You are already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-secondary to-primary px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Stay Updated with <span className="text-gold">Latest Offers</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Subscribe to our newsletter and get exclusive deals on GFC products
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-6 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-8 py-3 whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          No spam, unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
