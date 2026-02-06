// Static products data for when API is unavailable
export interface Product {
  id: number;
  name: string;
  model_code: string;
  category: string;
  tagline: string;
  description: string;
  image_url: string;
  price_pkr: number;
  price_usd?: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  features: string[];
  specifications: Record<string, string>;
}

export const STATIC_PRODUCTS: Product[] = [
  // Ceiling Fans
  {
    id: 1,
    name: "Future",
    model_code: "GFC-FUTURE",
    category: "ceiling_fan",
    tagline: "Modern Design with Premium Finish",
    description: "Advanced ceiling fan with modern design and silent operation. Perfect for contemporary living spaces.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/future.jpg?v=1744721859&width=800",
    price_pkr: 15880,
    price_usd: 57,
    rating: 4.8,
    review_count: 245,
    is_featured: true,
    features: ["High Air Throw", "Silent Operation", "Durable Motor", "Modern Design"],
    specifications: {
      "RPM": "1400",
      "Power": "65W",
      "Diameter": "48 inches",
      "Warranty": "3 Years",
      "Material": "Aluminum"
    }
  },
  {
    id: 2,
    name: "Spring",
    model_code: "GFC-SPRING",
    category: "ceiling_fan",
    tagline: "Classic Design with Powerful Performance",
    description: "Traditional ceiling fan combining classic aesthetics with modern technology and energy efficiency.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/SPRING_3.jpg?v=1744721859&width=800",
    price_pkr: 15400,
    price_usd: 55,
    rating: 4.7,
    review_count: 189,
    is_featured: true,
    features: ["Energy Efficient", "Quiet Motor", "Classic Design", "Easy Installation"],
    specifications: {
      "RPM": "1380",
      "Power": "60W",
      "Diameter": "48 inches",
      "Warranty": "2 Years",
      "Material": "Steel"
    }
  },
  {
    id: 3,
    name: "Apex",
    model_code: "GFC-APEX",
    category: "ceiling_fan",
    tagline: "Premium Quality Ceiling Fan",
    description: "Superior ceiling fan with enhanced air circulation and noise reduction technology for maximum comfort.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/5_20250812_112018_0000-ezgif.com-webp-to-jpg-converter.jpg?v=1744721859&width=800",
    price_pkr: 10460,
    price_usd: 38,
    rating: 4.6,
    review_count: 156,
    is_featured: true,
    features: ["Premium Construction", "Noise Reduction", "Efficient Cooling", "Durable Finish"],
    specifications: {
      "RPM": "1420",
      "Power": "70W",
      "Diameter": "48 inches",
      "Warranty": "1 Year",
      "Material": "Aluminum Alloy"
    }
  },
  {
    id: 4,
    name: "Glamour",
    model_code: "GFC-GLAMOUR",
    category: "ceiling_fan",
    tagline: "Elegant Decorative Ceiling Fan",
    description: "Stunning decorative fan with premium finish, designed to complement upscale interiors.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/glamour.jpg?v=1744721859&width=800",
    price_pkr: 17080,
    price_usd: 61,
    rating: 4.9,
    review_count: 312,
    is_featured: true,
    features: ["Decorative Design", "Premium Finish", "Silent Motor", "LED Compatible"],
    specifications: {
      "RPM": "1400",
      "Power": "65W",
      "Diameter": "48 inches",
      "Warranty": "3 Years",
      "Material": "Premium Aluminum"
    }
  },
  {
    id: 5,
    name: "Sapphire",
    model_code: "GFC-SAPPHIRE",
    category: "ceiling_fan",
    tagline: "Crystal Clear Air Delivery",
    description: "High-performance ceiling fan with crystal-inspired design for pure air circulation.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/sapphire.jpg?v=1744721859&width=800",
    price_pkr: 11600,
    price_usd: 42,
    rating: 4.5,
    review_count: 98,
    is_featured: false,
    features: ["Crystal Design", "High Air Throw", "Balanced Rotation", "Low Noise"],
    specifications: {
      "RPM": "1350",
      "Power": "55W",
      "Diameter": "48 inches",
      "Warranty": "2 Years",
      "Material": "Aluminum"
    }
  },
  {
    id: 6,
    name: "Heritage",
    model_code: "GFC-HERITAGE",
    category: "ceiling_fan",
    tagline: "Traditional Pakistani Craftsmanship",
    description: "Classic ceiling fan embodying decades of Pakistani manufacturing excellence.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/heritage.jpg?v=1744721859&width=800",
    price_pkr: 9085,
    price_usd: 33,
    rating: 4.4,
    review_count: 267,
    is_featured: false,
    features: ["Traditional Design", "Copper Winding", "Durable Motor", "Easy Maintenance"],
    specifications: {
      "RPM": "1300",
      "Power": "50W",
      "Diameter": "48 inches",
      "Warranty": "1 Year",
      "Material": "Steel"
    }
  },
  {
    id: 7,
    name: "Nabeel",
    model_code: "SS-07",
    category: "ceiling_fan",
    tagline: "Economy Series Fan",
    description: "Budget-friendly ceiling fan without compromising on quality and performance.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/nabeel.jpg?v=1744721859&width=800",
    price_pkr: 7775,
    price_usd: 28,
    rating: 4.3,
    review_count: 145,
    is_featured: false,
    features: ["Affordable", "Reliable Motor", "Easy Installation", "Low Maintenance"],
    specifications: {
      "RPM": "1280",
      "Power": "45W",
      "Diameter": "48 inches",
      "Warranty": "1 Year",
      "Material": "Steel"
    }
  },
  {
    id: 8,
    name: "Brave",
    model_code: "GFC-BRAVE",
    category: "ceiling_fan",
    tagline: "Inverter Technology Ceiling Fan",
    description: "Energy-saving inverter fan with variable speed control for optimal comfort.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/brave1.jpg?v=1744721859&width=800",
    price_pkr: 14400,
    price_usd: 52,
    rating: 4.7,
    review_count: 178,
    is_featured: false,
    features: ["Inverter Technology", "Variable Speed", "Energy Saving", "Smart Control"],
    specifications: {
      "RPM": "1400",
      "Power": "35W",
      "Diameter": "48 inches",
      "Warranty": "2 Years",
      "Material": "Aluminum"
    }
  },
  // Air Coolers
  {
    id: 9,
    name: "GF-7800 Turbo",
    model_code: "GF-7800",
    category: "air_cooler",
    tagline: "Maximum Cooling Power",
    description: "Premium evaporative air cooler with turbo fan and honeycomb cooling pads for superior performance.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/Washing_Machines-20.jpg?v=1745391118&width=800",
    price_pkr: 32900,
    price_usd: 118,
    rating: 4.8,
    review_count: 156,
    is_featured: true,
    features: ["Turbo Fan", "Honeycomb Pads", "Ice Chamber", "Remote Control"],
    specifications: {
      "Tank Capacity": "45L",
      "Air Throw": "50ft",
      "Coverage": "400 sqft",
      "Power": "180W",
      "Warranty": "2 Years"
    }
  },
  {
    id: 10,
    name: "GF-6700 Plus",
    model_code: "GF-6700",
    category: "air_cooler",
    tagline: "Efficient Room Cooling",
    description: "Mid-range air cooler with excellent performance and energy efficiency.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg?v=1745391055&width=800",
    price_pkr: 29500,
    price_usd: 106,
    rating: 4.6,
    review_count: 89,
    is_featured: true,
    features: ["Energy Efficient", "Large Tank", "3-Speed Control", "Castor Wheels"],
    specifications: {
      "Tank Capacity": "40L",
      "Air Throw": "45ft",
      "Coverage": "350 sqft",
      "Power": "150W",
      "Warranty": "2 Years"
    }
  },
  {
    id: 11,
    name: "GF-6600 Compact",
    model_code: "GF-6600",
    category: "air_cooler",
    tagline: "Compact Cooling Solution",
    description: "Space-saving air cooler perfect for smaller rooms and apartments.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf6600.jpg?v=1745391055&width=800",
    price_pkr: 28800,
    price_usd: 103,
    rating: 4.5,
    review_count: 67,
    is_featured: false,
    features: ["Compact Design", "Low Noise", "Portable", "Water Level Indicator"],
    specifications: {
      "Tank Capacity": "35L",
      "Air Throw": "40ft",
      "Coverage": "300 sqft",
      "Power": "120W",
      "Warranty": "1 Year"
    }
  },
  // Washing Machines
  {
    id: 12,
    name: "GF-1100 Power Wash",
    model_code: "GF-1100",
    category: "washing_machine",
    tagline: "Dual Tub Power Performance",
    description: "Heavy-duty twin tub washing machine with powerful wash and spin cycles.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/gf1100.jpg?v=1744794651&width=800",
    price_pkr: 37800,
    price_usd: 136,
    rating: 4.7,
    review_count: 203,
    is_featured: true,
    features: ["Dual Motor", "Brake System", "AC/DC Compatible", "Rust-Proof Body"],
    specifications: {
      "Wash Capacity": "11 KG",
      "Spin Speed": "1300 RPM",
      "Motor": "Dual Copper",
      "Warranty": "2 Years",
      "Type": "Twin Tub"
    }
  },
  {
    id: 13,
    name: "GF-6600 Semi-Auto",
    model_code: "GF-6600-W",
    category: "washing_machine",
    tagline: "Reliable Everyday Washing",
    description: "Dependable semi-automatic washing machine for daily laundry needs.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/washer2.jpg?v=1744794651&width=800",
    price_pkr: 25700,
    price_usd: 92,
    rating: 4.5,
    review_count: 145,
    is_featured: false,
    features: ["Semi-Auto", "Energy Efficient", "Large Drum", "Easy Controls"],
    specifications: {
      "Wash Capacity": "8 KG",
      "Spin Speed": "1100 RPM",
      "Motor": "Copper",
      "Warranty": "1 Year",
      "Type": "Twin Tub"
    }
  },
  {
    id: 14,
    name: "GF-900 Compact",
    model_code: "GF-900",
    category: "washing_machine",
    tagline: "Perfect for Small Families",
    description: "Compact washing machine ideal for smaller households and apartments.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/washer3.jpg?v=1744794651&width=800",
    price_pkr: 32500,
    price_usd: 117,
    rating: 4.6,
    review_count: 89,
    is_featured: false,
    features: ["Compact Size", "Quick Wash", "Low Water Usage", "Portable"],
    specifications: {
      "Wash Capacity": "7 KG",
      "Spin Speed": "1000 RPM",
      "Motor": "Copper",
      "Warranty": "1 Year",
      "Type": "Twin Tub"
    }
  },
  // Pedestal Fans
  {
    id: 15,
    name: "Designer Cross Base",
    model_code: "GFC-DESIGNER-CROSS",
    category: "pedestal_fan",
    tagline: "Elegant Pedestal Fan",
    description: "Premium pedestal fan with decorative cross base design for living rooms.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/pedestaldesignercross.jpg?v=1744721859&width=800",
    price_pkr: 11915,
    price_usd: 43,
    rating: 4.4,
    review_count: 78,
    is_featured: false,
    features: ["Decorative Design", "Stable Base", "Adjustable Height", "Powerful Motor"],
    specifications: {
      "RPM": "1380",
      "Power": "60W",
      "Diameter": "48 inches",
      "Height": "Adjustable",
      "Warranty": "1 Year"
    }
  },
  {
    id: 16,
    name: "Deluxe Bracket Fan",
    model_code: "GFC-DELUXE-BRACKET",
    category: "bracket_fan",
    tagline: "Wall-Mounted Bracket Fan",
    description: "Space-saving bracket fan perfect for offices and shops.",
    image_url: "https://www.gfcfans.com/cdn/shop/files/deluxe_cf3c09ec-2004-4f7c-aaa9-ffb85b3bfd93.jpg?v=1744721859&width=800",
    price_pkr: 7850,
    price_usd: 28,
    rating: 4.3,
    review_count: 56,
    is_featured: false,
    features: ["Wall-Mounted", "Space Saving", "Durable Mount", "Efficient Cooling"],
    specifications: {
      "RPM": "1400",
      "Power": "50W",
      "Diameter": "48 inches",
      "Mount Type": "Wall Bracket",
      "Warranty": "1 Year"
    }
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return STATIC_PRODUCTS;
  return STATIC_PRODUCTS.filter(p => p.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return STATIC_PRODUCTS.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return STATIC_PRODUCTS.filter(p => p.is_featured);
};

export const getCategories = (): string[] => {
  return ['all', ...new Set(STATIC_PRODUCTS.map(p => p.category))];
};
