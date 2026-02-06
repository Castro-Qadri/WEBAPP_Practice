'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '@/lib/api';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await apiClient.post('/contact', formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 bg-primary px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-gold mb-4">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a question about our products? Contact us anytime.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-secondary rounded-xl p-8 sm:p-12 border border-gold/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address <span className="text-gold">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 (Phone)"
                className="w-full px-4 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-primary border border-gold/20 focus:border-gold focus:outline-none transition-colors placeholder-gray-500 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-gray-500 mt-4">
              We'll respond to your inquiry within 24 hours.
            </p>
          </form>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📞</span>
            </div>
            <h4 className="font-semibold mb-2">Phone</h4>
            <p className="text-gray-400">+92-42-37132812</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📧</span>
            </div>
            <h4 className="font-semibold mb-2">Email</h4>
            <p className="text-gray-400">gfc@gfcfan.com</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p className="text-gray-400">DHA, Lahore, Pakistan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
