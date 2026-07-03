export const featuredProducts = [
  {
    id: 1,
    name: 'Modern Leather Sofa',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
    category: 'Living Room',
  },
  {
    id: 2,
    name: 'Terrazzo Coffee Table',
    price: 420,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
    category: 'Tables',
  },
  {
    id: 3,
    name: 'Handcrafted Pendant Lamp',
    price: 198,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80',
    badge: 'Limited',
    category: 'Lighting',
  },
];

export const categories = [
  { id: 'living', name: 'Living Room' },
  { id: 'dining', name: 'Dining & Kitchen' },
  { id: 'office', name: 'Home Office' },
  { id: 'decor', name: 'Decor & Wall' },
];

export const cartItems = [
  { id: 1, name: 'Terrazzo Coffee Table', price: 420, quantity: 1 },
  { id: 2, name: 'Handcrafted Pendant Lamp', price: 198, quantity: 2 },
];

export const adminMetrics = [
  { label: 'Total Orders', value: '1,240', change: '+18%' },
  { label: 'Revenue', value: '$124K', change: '+12%' },
  { label: 'Pending Shipments', value: '42', change: '-6%' },
  { label: 'Low Stock SKUs', value: '7', change: 'Alert' },
];
