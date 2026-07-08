export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Fashion' | 'Food' | 'Home' | 'Accessories';
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  gallery?: string[];
  specs?: Record<string, string>;
  longDescription?: string;
  seller?: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    verified: boolean;
  };
}

export const products: Product[] = [
  {
    id: '1',
    name: 'ZenBook Pro X',
    description: 'High-performance laptop for professionals and creatives. Features a stunning 4K OLED display and the latest AI-ready processor.',
    price: 125000,
    category: 'Electronics',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-premium-550deb08-1783500880272.webp',
    gallery: [
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-premium-550deb08-1783500880272.webp',
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-detail-1-7ae077c3-1783501766576.webp',
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-detail-2-47c9bd8b-1783501766578.webp',
      'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-lifestyle-1-c29db807-1783501767059.webp'
    ],
    specs: {
      'Processor': 'Intel Core i9-14900HX (24 Cores)',
      'RAM': '64GB DDR5 5600MHz',
      'Storage': '2TB NVMe PCIe Gen5 SSD',
      'Display': '16" 4K OLED HDR, 120Hz',
      'Graphics': 'NVIDIA RTX 4090 (16GB GDDR6X)',
      'Battery': '99.9Wh (Fast Charging)',
      'Weight': '2.1 kg'
    },
    longDescription: 'The ZenBook Pro X is the pinnacle of mobile computing, designed specifically for professionals who demand the absolute best. Whether you are editing 8K video, training AI models, or rendering complex 3D scenes, this machine handles it with ease. Featuring the world\'s first 16-inch 4K OLED display with a 120Hz refresh rate, every detail comes to life with breathtaking clarity and color accuracy.',
    seller: {
      name: 'Habesha Tech Hub',
      rating: 4.9,
      reviews: 856,
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/seller-featured-1-8c54555c-1783501166868.webp',
      verified: true
    },
    rating: 4.9,
    reviews: 124,
    isFeatured: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Emerald S24 Ultra',
    description: 'Next-generation smartphone with AI camera capabilities and a sleek emerald green finish.',
    price: 85000,
    category: 'Electronics',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/smartphone-emerald-b3d09bda-1783500879949.webp',
    rating: 4.8,
    reviews: 89,
    isNew: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Neo-Habesha Evening Gown',
    description: 'A modern luxury take on traditional Ethiopian Habesha Kemis, featuring intricate gold embroidery and premium silk.',
    price: 45000,
    category: 'Fashion',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/modern-habesha-dress-1-12c528e0-1783500880056.webp',
    rating: 5.0,
    reviews: 42,
    isFeatured: true,
    inStock: true
  },
  {
    id: '4',
    name: 'Yirgacheffe Gold Reserve',
    description: 'Premium organic coffee beans from the Yirgacheffe region. Expertly roasted to bring out citrus and floral notes.',
    price: 2400,
    category: 'Food',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/ethiopian-coffee-premium-a5fec069-1783500882388.webp',
    rating: 4.9,
    reviews: 215,
    isFeatured: true,
    inStock: true
  },
  {
    id: '5',
    name: 'Modern Mesob Centerpiece',
    description: 'A contemporary interpretation of the traditional Ethiopian Mesob, hand-woven with a minimalist geometric design.',
    price: 12000,
    category: 'Home',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/modern-mesob-decor-84026646-1783500880561.webp',
    rating: 4.7,
    reviews: 35,
    isNew: true,
    inStock: true
  },
  {
    id: '6',
    name: 'Addis Smart Watch',
    description: 'The ultimate wearable for the urban Ethiopian professional. Health tracking, local payment integration, and more.',
    price: 18500,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviews: 67,
    inStock: true
  },
  {
    id: '7',
    name: 'Kaffa Forest Honey',
    description: 'Pure, raw forest honey from the Kaffa biosphere reserve. Rich, dark, and full of complex flavors.',
    price: 1800,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviews: 156,
    inStock: true
  },
  {
    id: '8',
    name: 'Axumite Leather Messenger',
    description: 'Handcrafted premium leather messenger bag inspired by Axumite geometric patterns.',
    price: 8500,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviews: 53,
    inStock: true
  },
  {
    id: '9',
    name: 'Imperial Emerald Set',
    description: 'Breathtaking 24k gold jewelry set with hand-cut Ethiopian emeralds. A masterpiece of Neo-Ethiopian luxury.',
    price: 345000,
    category: 'Accessories',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/premium-ethiopian-jewelry-6abf64ce-1783507439783.webp',
    rating: 5.0,
    reviews: 12,
    isFeatured: true,
    inStock: true
  },
  {
    id: '10',
    name: 'Futuristic Coffee Suite',
    description: 'Complete minimalist ceramic coffee set with futuristic geometric patterns and matte charcoal finish.',
    price: 28000,
    category: 'Home',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/futuristic-coffee-set-e1522acd-1783507439719.webp',
    rating: 4.8,
    reviews: 45,
    isNew: true,
    inStock: true
  },
  {
    id: '11',
    name: 'Axumite Voyager Bag',
    description: 'Premium dark brown leather travel bag with embossed Axumite patterns and gold-plated hardware.',
    price: 52000,
    category: 'Fashion',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/axumite-leather-bag-18010371-1783507439428.webp',
    rating: 4.9,
    reviews: 28,
    inStock: true
  }
];

export const categories = ['All', 'Electronics', 'Fashion', 'Food', 'Home', 'Accessories'];
