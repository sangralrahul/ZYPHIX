export const products = [
  { id: 'p1', name: 'Fresh Vegetables Combo', price: 89, origPrice: 120, storeName: 'Sharma General Store', distance: '0.3 km', emoji: '🥦', category: 'Vegetables', weight: '1 kg', bgColor: 'linear-gradient(135deg, #0D3B2E, #0F1B35)' },
  { id: 'p2', name: 'Dettol Handwash 500ml', price: 95, origPrice: 110, storeName: 'City Medical & Pharmacy', distance: '0.5 km', emoji: '🧼', category: 'Personal Care', weight: '500 ml', bgColor: 'linear-gradient(135deg, #1a1a3a, #0F1B35)' },
  { id: 'p3', name: 'Parle-G Biscuits 800g', price: 45, origPrice: null, storeName: 'Rajan Provision Store', distance: '0.2 km', emoji: '🍪', category: 'Snacks', weight: '800 g', bgColor: 'linear-gradient(135deg, #2e1a00, #0F1B35)' },
  { id: 'p4', name: 'Dolo 650 Strip x10', price: 28, origPrice: null, storeName: 'City Medical & Pharmacy', distance: '0.4 km', emoji: '💊', category: 'Medicine', weight: '10 tabs', bgColor: 'linear-gradient(135deg, #2a1a2a, #0F1B35)' },
  { id: 'p5', name: 'Amul Butter 500g', price: 280, origPrice: null, storeName: 'Sharma General Store', distance: '0.3 km', emoji: '🧈', category: 'Dairy', weight: '500 g', bgColor: 'linear-gradient(135deg, #1a2a0d, #0F1B35)' },
  { id: 'p6', name: 'Lays Classic 100g', price: 20, origPrice: null, storeName: 'Rajan Provision Store', distance: '0.2 km', emoji: '🥔', category: 'Snacks', weight: '100 g', bgColor: 'linear-gradient(135deg, #2e1a00, #0F1B35)' },
  { id: 'p7', name: 'Harpic Toilet Cleaner', price: 85, origPrice: null, storeName: 'Gupta Atta Chakki', distance: '0.4 km', emoji: '🪣', category: 'Household', weight: '500 ml', bgColor: 'linear-gradient(135deg, #001a2e, #0F1B35)' },
  { id: 'p8', name: 'Tata Salt 1kg', price: 22, origPrice: null, storeName: 'Gupta Atta Chakki', distance: '0.4 km', emoji: '🧂', category: 'Grains & Dal', weight: '1 kg', bgColor: 'linear-gradient(135deg, #0a1a2e, #0F1B35)' },
  { id: 'p9', name: 'Toor Dal 1kg', price: 140, origPrice: 160, storeName: 'Sharma General Store', distance: '0.3 km', emoji: '🟡', category: 'Grains & Dal', weight: '1 kg', bgColor: 'linear-gradient(135deg, #1a1a0d, #0F1B35)' },
  { id: 'p10', name: 'Colgate Toothpaste', price: 55, origPrice: 65, storeName: 'City Medical & Pharmacy', distance: '0.5 km', emoji: '🦷', category: 'Personal Care', weight: '150 g', bgColor: 'linear-gradient(135deg, #001a2e, #0F1B35)' },
  { id: 'p11', name: 'Amul Dahi 500g', price: 45, origPrice: null, storeName: 'Rajan Provision Store', distance: '0.2 km', emoji: '🍶', category: 'Dairy', weight: '500 g', bgColor: 'linear-gradient(135deg, #0a2a1a, #0F1B35)' },
  { id: 'p12', name: 'Maggi Noodles 4-pack', price: 68, origPrice: 72, storeName: 'Gupta Atta Chakki', distance: '0.4 km', emoji: '🍜', category: 'Snacks', weight: '4 × 70 g', bgColor: 'linear-gradient(135deg, #2a1500, #0F1B35)' },
];

export const categories = [
  { id: 'c1', name: 'Vegetables', emoji: '🍅' },
  { id: 'c2', name: 'Dairy', emoji: '🥛' },
  { id: 'c3', name: 'Medicine', emoji: '💊' },
  { id: 'c4', name: 'Electronics', emoji: '💡' },
  { id: 'c5', name: 'Personal Care', emoji: '🧴' },
  { id: 'c6', name: 'Grains & Dal', emoji: '🌾' },
  { id: 'c7', name: 'Snacks', emoji: '🍿' },
  { id: 'c8', name: 'Household', emoji: '🧹' },
  { id: 'c9', name: 'Accessories', emoji: '📱' },
  { id: 'c10', name: 'Pet Care', emoji: '🐕' },
];

export const restaurants = [
  { id: 'r1', name: 'Sharma Dhaba', cuisine: 'North Indian · Dal Makhni · Roti', rating: 4.6, eta: '28 min', deliveryFee: 0, badges: ['₹0 delivery'], thumbnail: '🍲' },
  { id: 'r2', name: 'Pizza Palace JK', cuisine: 'Pizza · Burgers · Fast Food', rating: 4.3, eta: '35 min', deliveryFee: 30, badges: ['New on Zyphix'], thumbnail: '🍕' },
  { id: 'r3', name: 'Kashmir Kitchen', cuisine: 'Wazwan · Mutton · Rice', rating: 4.8, eta: '40 min', deliveryFee: 50, badges: [], thumbnail: '🍖' },
  { id: 'r4', name: 'Jammu Sweets', cuisine: 'Sweets · Snacks · Chai', rating: 4.5, eta: '20 min', deliveryFee: 20, badges: ['Bestseller'], thumbnail: '🍡' },
];

export const services = [
  { id: 's1', title: 'Haircut', category: 'Barber', emoji: '✂️', available: 3, nextSlot: '3PM today' },
  { id: 's2', title: 'Car Service', category: 'Garage', emoji: '🔧', available: 2, nextSlot: 'Tomorrow' },
  { id: 's3', title: 'Tailor', category: 'Tailor', emoji: '🧵', available: 4, nextSlot: '5PM today' },
  { id: 's4', title: 'Doctor Visit', category: 'Doctor', emoji: '🩺', available: 2, nextSlot: 'Tomorrow 10AM' },
  { id: 's5', title: 'Home Cleaning', category: 'Home Services', emoji: '🧹', available: 3, nextSlot: 'Today' },
  { id: 's6', title: 'Electronics Repair', category: 'Electronics', emoji: '⚡', available: 1, nextSlot: '2PM today' },
];

export const stores = [
  { id: 'st1', name: 'Sharma General Store', distance: '0.3 km', openHours: '8 AM - 10 PM', rating: 4.5, open: true, type: 'kirana' },
  { id: 'st2', name: 'Rajan Provision Store', distance: '0.2 km', openHours: '9 AM - 9 PM', rating: 4.2, open: true, type: 'kirana' },
  { id: 'st3', name: 'City Medical & Pharmacy', distance: '0.5 km', openHours: '24/7', rating: 4.8, open: true, type: 'medical' },
  { id: 'st4', name: 'Gupta Atta Chakki', distance: '0.4 km', openHours: '8 AM - 11 PM', rating: 4.4, open: true, type: 'kirana' },
  { id: 'st5', name: 'Sonu Electronics', distance: '0.6 km', openHours: '10 AM - 9 PM', rating: 4.3, open: true, type: 'electronics' },
  { id: 'st6', name: 'Mohit Auto Garage', distance: '0.8 km', openHours: '9 AM - 7 PM', rating: 4.1, open: false, type: 'garage' },
  { id: 'st7', name: 'Raja Barber Shop', distance: '0.3 km', openHours: '9 AM - 8 PM', rating: 4.6, open: true, type: 'salon' },
  { id: 'st8', name: 'Sharma Dhaba', distance: '0.2 km', openHours: '7 AM - 11 PM', rating: 4.7, open: true, type: 'restaurant' },
];

export const promoCodes = [
  { code: 'ZYPHIX50', description: '50% off first order (max ₹100)', type: 'discount' },
  { code: 'EATSFREE', description: 'Free delivery on food orders above ₹199', type: 'delivery' },
  { code: 'BOOKFIRST', description: '₹50 off on your first service booking', type: 'discount' },
  { code: 'REFER100', description: 'Refer a friend & earn ₹100 credits', type: 'referral' },
];

export const offers = promoCodes;
