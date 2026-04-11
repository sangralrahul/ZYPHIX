import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy, Check, Star, MapPin, Clock, ChevronRight,
  Plus, Minus, ShoppingCart, ArrowRight, Truck, Zap, Utensils, CalendarCheck
} from 'lucide-react';
import { products, categories, restaurants, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const TABS: { id: TabId; label: string; icon: string; color: string; accent: string }[] = [
  { id: 'now',    label: 'ZyphixNow',       icon: '⚡', color: '#00C9A7', accent: 'rgba(0,201,167,0.15)' },
  { id: 'eats',   label: 'ZyphixEats',      icon: '🍱', color: '#F5A623', accent: 'rgba(245,166,35,0.15)' },
  { id: 'book',   label: 'ZyphixBook',      icon: '📅', color: '#FF6B35', accent: 'rgba(255,107,53,0.15)' },
  { id: 'map',    label: 'Kirana Near Me',  icon: '🗺️', color: '#2D9CDB', accent: 'rgba(45,156,219,0.15)' },
  { id: 'offers', label: 'Offers',          icon: '🏷️', color: '#A855F7', accent: 'rgba(168,85,247,0.15)' },
];

const GROCERY_CATS = [
  { name: 'Fruits & Vegetables', emoji: '🍅', id: 'Vegetables' },
  { name: 'Dairy & Eggs',        emoji: '🥛', id: 'Dairy' },
  { name: 'Atta, Rice & Dals',   emoji: '🌾', id: 'Grains & Dal' },
  { name: 'Snacks & Biscuits',   emoji: '🍪', id: 'Snacks' },
  { name: 'Personal Care',       emoji: '🧴', id: 'Personal Care' },
  { name: 'Medicines',           emoji: '💊', id: 'Medicine' },
  { name: 'Household',           emoji: '🧹', id: 'Household' },
  { name: 'Electronics',         emoji: '💡', id: 'Electronics' },
  { name: 'Pet Care',            emoji: '🐕', id: 'Pet Care' },
  { name: 'Accessories',         emoji: '📱', id: 'Accessories' },
];

const FOOD_CATS = [
  { name: 'North Indian', emoji: '🍛' },
  { name: 'Wazwan',       emoji: '🍖' },
  { name: 'Fast Food',    emoji: '🍔' },
  { name: 'Pizza',        emoji: '🍕' },
  { name: 'Sweets',       emoji: '🍡' },
  { name: 'Chinese',      emoji: '🥡' },
  { name: 'Breakfast',    emoji: '🥞' },
  { name: 'Biryani',      emoji: '🍚' },
];

const SERVICE_CATS = [
  { name: 'Haircut',    emoji: '✂️' },
  { name: 'Car Service',emoji: '🔧' },
  { name: 'Doctor',     emoji: '🩺' },
  { name: 'Cleaning',   emoji: '🧹' },
  { name: 'Tailor',     emoji: '🧵' },
  { name: 'Electrician',emoji: '⚡' },
  { name: 'Plumber',    emoji: '🪠' },
  { name: 'Beautician', emoji: '💅' },
];

/* ───────── Shared CategoryRow ───────── */
function CategoryRow({ cats }: { cats: { name: string; emoji: string }[] }) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 sm:gap-4">
      {cats.map((cat, i) => (
        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-full aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-200 group-hover:scale-105"
            style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
            {cat.emoji}
          </div>
          <span className="text-[10px] sm:text-xs text-center leading-tight font-medium" style={{ color: '#5A7A9A' }}>
            {cat.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ───────── NOW TAB ───────── */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');

  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => {
    const n = { ...c };
    n[id] > 1 ? n[id]-- : delete n[id];
    return n;
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(x => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const catFilters = ['All', ...GROCERY_CATS.map(c => c.id)];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <div className="space-y-6">
      {/* Value props strip */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(0,201,167,0.06)', border: '1px solid rgba(0,201,167,0.15)' }}>
        <div className="flex items-center justify-around gap-2 text-center">
          {[
            { icon: '🚚', label: '₹0 Delivery Fee' },
            { icon: '⏱️', label: '30 Min Delivery' },
            { icon: '✅', label: 'Verified Stores' },
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xl">{v.icon}</span>
              <span className="text-sm font-semibold text-white">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category section */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Shop by Category</h2>
        <CategoryRow cats={GROCERY_CATS} />
      </div>

      {/* Promo banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, #0D3B2E, #091C12)', border: '1px solid rgba(0,201,167,0.2)' }}>
          <div className="absolute right-4 top-4 text-5xl opacity-20">🛒</div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-2"
            style={{ background: 'rgba(0,201,167,0.2)', color: '#00C9A7' }}>
            NEW USER OFFER
          </div>
          <p className="text-2xl font-black text-white leading-tight mb-1">50% OFF</p>
          <p className="text-sm text-white/70 mb-3">First grocery order · Max ₹100</p>
          <div className="flex items-center gap-2">
            <span className="font-black text-sm px-3 py-1 rounded-lg" style={{ background: 'rgba(0,201,167,0.2)', color: '#00C9A7' }}>ZYPHIX50</span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
          style={{ background: 'linear-gradient(135deg, #0F2448, #091225)', border: '1px solid rgba(45,156,219,0.2)' }}>
          <div className="absolute right-4 top-4 text-5xl opacity-20">🏪</div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-2"
            style={{ background: 'rgba(45,156,219,0.2)', color: '#2D9CDB' }}>
            1200+ STORES
          </div>
          <p className="text-2xl font-black text-white leading-tight mb-1">Real Kirana,<br />Real Fast</p>
          <p className="text-sm text-white/70">Local inventory · No surge pricing</p>
        </div>
      </div>

      {/* Category filter pills */}
      <div>
        <h2 className="text-base font-black text-white mb-3">Products</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {catFilters.map(f => (
            <button key={f} onClick={() => setActiveCat(f)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: activeCat === f ? '#00C9A7' : '#0F1B35',
                color: activeCat === f ? '#0A0E1A' : '#5A7A9A',
                border: `1px solid ${activeCat === f ? '#00C9A7' : '#1E3A6E'}`,
              }}>
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map(product => (
            <div key={product.id} className="rounded-2xl overflow-hidden cursor-pointer group"
              style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
              <div className="h-32 flex items-center justify-center text-4xl relative"
                style={{ background: product.bgColor }}>
                <span className="group-hover:scale-110 transition-transform duration-200 inline-block">{product.emoji}</span>
                {product.origPrice && (
                  <div className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: '#FF6B35', color: 'white' }}>
                    {Math.round((1 - product.price / product.origPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-bold text-white text-sm mb-0.5 leading-tight line-clamp-2">{product.name}</p>
                <p className="text-[10px] mb-2" style={{ color: '#5A7A9A' }}>{product.weight}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-black text-white text-sm">₹{product.price}</span>
                    {product.origPrice && <span className="text-[10px] line-through ml-1" style={{ color: '#5A7A9A' }}>₹{product.origPrice}</span>}
                  </div>
                  {cart[product.id] ? (
                    <div className="flex items-center gap-0.5 rounded-xl overflow-hidden"
                      style={{ background: '#00C9A7' }}>
                      <button onClick={() => rem(product.id)} className="px-2 py-1.5 font-bold text-[#0A0E1A] hover:bg-black/10">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-black text-[#0A0E1A] min-w-[14px] text-center">{cart[product.id]}</span>
                      <button onClick={() => add(product.id)} className="px-2 py-1.5 font-bold text-[#0A0E1A] hover:bg-black/10">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => add(product.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                      style={{ background: 'rgba(0,201,167,0.1)', color: '#00C9A7', border: '1px solid rgba(0,201,167,0.4)' }}>
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart bar */}
      {totalItems > 0 && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }}
          className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 z-40">
          <div className="flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer"
            style={{ background: '#00C9A7', boxShadow: '0 8px 32px rgba(0,201,167,0.5)' }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs"
                style={{ background: 'rgba(0,0,0,0.2)', color: '#0A0E1A' }}>
                {totalItems}
              </div>
              <span className="font-bold text-sm" style={{ color: '#0A0E1A' }}>{totalItems} item{totalItems > 1 ? 's' : ''} added</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black" style={{ color: '#0A0E1A' }}>₹{totalPrice}</span>
              <ShoppingCart className="h-4 w-4" style={{ color: '#0A0E1A' }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ───────── EATS TAB ───────── */
function EatsTab() {
  const POPULAR_DISHES = [
    { name: 'Dal Makhni', emoji: '🫕', price: 149, rating: 4.8, from: 'Sharma Dhaba' },
    { name: 'Veg Thali',  emoji: '🍱', price: 119, rating: 4.6, from: 'Jammu Kitchen' },
    { name: 'Pepperoni Pizza', emoji: '🍕', price: 199, rating: 4.3, from: 'Pizza Palace JK' },
    { name: 'Wazwan Platter', emoji: '🍖', price: 299, rating: 4.9, from: 'Kashmir Kitchen' },
    { name: 'Gulab Jamun', emoji: '🍡', price: 49, rating: 4.7, from: 'Jammu Sweets' },
    { name: 'Rajma Chawal', emoji: '🍛', price: 109, rating: 4.5, from: 'Sharma Dhaba' },
    { name: 'Biryani', emoji: '🍚', price: 179, rating: 4.6, from: 'Spice Garden' },
    { name: 'Chole Bhature', emoji: '🫓', price: 89, rating: 4.4, from: 'Punjab Da Dhaba' },
  ];

  return (
    <div className="space-y-6">
      {/* Featured banner */}
      <div className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
        style={{ background: 'linear-gradient(135deg, #2a1a00, #0F1B35)', border: '1px solid rgba(245,166,35,0.25)' }}>
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-6 text-7xl opacity-20 pointer-events-none">🍲</div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-2"
          style={{ background: 'rgba(245,166,35,0.2)', color: '#F5A623' }}>
          ⭐ FEATURED DHABA
        </div>
        <h3 className="text-xl font-black text-white mb-1">Sharma Dhaba Special</h3>
        <p className="text-sm mb-4" style={{ color: '#5A7A9A' }}>Authentic Dal Makhni with butter naan · Free delivery on orders ₹199+</p>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
          style={{ background: '#F5A623', color: '#0A0E1A' }}>
          Order Now <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Food categories */}
      <div>
        <h2 className="text-base font-black text-white mb-4">What are you craving?</h2>
        <CategoryRow cats={FOOD_CATS} />
      </div>

      {/* Popular dishes */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Popular Dishes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {POPULAR_DISHES.map((dish, i) => (
            <div key={i} className="rounded-2xl overflow-hidden cursor-pointer group card-hover"
              style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
              <div className="h-20 flex items-center justify-center text-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(10,14,26,0.9))' }}>
                <span className="group-hover:scale-110 transition-transform duration-200 inline-block">{dish.emoji}</span>
              </div>
              <div className="p-2.5">
                <p className="font-bold text-white text-xs mb-0.5 truncate">{dish.name}</p>
                <p className="text-[9px] mb-1 truncate" style={{ color: '#5A7A9A' }}>{dish.from}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-white text-xs">₹{dish.price}</span>
                  <span className="text-[9px] font-bold flex items-center gap-0.5" style={{ color: '#F5A623' }}>
                    <Star className="h-2.5 w-2.5 fill-current" />{dish.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Restaurants near you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {restaurants.map(r => (
            <div key={r.id} className="rounded-2xl p-4 flex gap-4 cursor-pointer card-hover"
              style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
              <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)' }}>
                {r.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className="font-black text-white text-sm">{r.name}</p>
                  <div className="flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1"
                    style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                    <Star className="h-2.5 w-2.5 fill-current" />{r.rating}
                  </div>
                </div>
                <p className="text-xs truncate my-1" style={{ color: '#5A7A9A' }}>{r.cuisine}</p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-white/60">
                    <Clock className="h-3 w-3" />{r.eta}
                  </span>
                  {r.deliveryFee === 0 && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(0,201,167,0.15)', color: '#00C9A7' }}>
                      Free delivery
                    </span>
                  )}
                  {r.badges.filter(b => b !== '₹0 delivery').map(b => (
                    <span key={b} className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623' }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── BOOK TAB ───────── */
function BookTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  return (
    <div className="space-y-6">
      {/* Header value props */}
      <div className="rounded-2xl p-4" style={{ background: 'rgba(255,107,53,0.06)', border: '1px solid rgba(255,107,53,0.15)' }}>
        <div className="flex items-center justify-around gap-2 text-center">
          {['✅ Verified Pros', '💰 Zero Cancel Fee', '📍 Within 2km'].map((v, i) => (
            <span key={i} className="text-sm font-semibold text-white">{v}</span>
          ))}
        </div>
      </div>

      {/* Service categories */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Browse Services</h2>
        <CategoryRow cats={SERVICE_CATS} />
      </div>

      {/* Select a service */}
      <div>
        <h2 className="text-base font-black text-white mb-4">Available Near You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map(service => {
            const active = selected === service.id;
            return (
              <div key={service.id} onClick={() => { setSelected(active ? null : service.id); setSlot(null); setBooked(false); }}
                className="rounded-2xl p-4 cursor-pointer transition-all duration-200 relative overflow-hidden"
                style={{
                  background: active ? 'rgba(255,107,53,0.12)' : '#0F1B35',
                  border: `1px solid ${active ? 'rgba(255,107,53,0.6)' : '#1E3A6E'}`,
                  transform: active ? 'scale(1.02)' : 'scale(1)',
                }}>
                {active && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#FF6B35' }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className="text-3xl mb-2">{service.emoji}</div>
                <p className="font-black text-white text-sm">{service.title}</p>
                <p className="text-[10px] mb-2" style={{ color: '#5A7A9A' }}>{service.category}</p>
                <p className="text-[10px] font-semibold" style={{ color: '#00C9A7' }}>{service.available} available · Next: {service.nextSlot}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selected && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl p-5" style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
            <h3 className="font-black text-white mb-4">Pick a time slot — Today</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
              {SLOTS.map(s => (
                <button key={s} onClick={() => setSlot(s)}
                  className="py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: slot === s ? '#FF6B35' : 'rgba(30,58,110,0.5)',
                    color: slot === s ? 'white' : '#5A7A9A',
                    border: `1px solid ${slot === s ? '#FF6B35' : '#1E3A6E'}`,
                  }}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => slot && setBooked(true)} disabled={!slot}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
              style={{
                background: slot ? '#FF6B35' : 'rgba(255,107,53,0.2)',
                color: slot ? 'white' : '#5A7A9A',
                boxShadow: slot ? '0 6px 24px rgba(255,107,53,0.3)' : 'none',
              }}>
              {booked ? '✓ Booking Confirmed!' : 'Confirm Booking'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ───────── MAP TAB ───────── */
function MapTab() {
  const typeColors: Record<string, string> = {
    kirana: '#00C9A7', medical: '#2D9CDB', restaurant: '#F5A623',
    electronics: '#A855F7', garage: '#FF6B35', salon: '#EC4899',
  };
  const typeEmojis: Record<string, string> = {
    kirana: '🏪', medical: '💊', restaurant: '🍲',
    electronics: '💡', garage: '🔧', salon: '✂️',
  };
  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden" style={{ height: 240, background: '#0F1B35', border: '1px solid #1E3A6E', position: 'relative' }}>
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
          <div className="text-5xl">🗺️</div>
          <p className="text-white font-bold">Map View</p>
          <p className="text-sm" style={{ color: '#5A7A9A' }}>Jammu, J&K · 8 stores nearby</p>
          <div className="flex gap-2 mt-2">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#00C9A7' }} />
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#F5A623', animationDelay: '0.3s' }} />
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#FF6B35', animationDelay: '0.6s' }} />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((store: any) => (
          <div key={store.id} className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer card-hover"
            style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{ background: `${typeColors[store.type] || '#00C9A7'}15`, border: `1px solid ${typeColors[store.type] || '#00C9A7'}30` }}>
              {typeEmojis[store.type] || '🏪'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm truncate">{store.name}</p>
              <div className="flex items-center gap-2 text-[10px]" style={{ color: '#5A7A9A' }}>
                <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{store.distance}</span>
                <span>·</span>
                <span><Clock className="h-2.5 w-2.5 inline mr-0.5" />{store.openHours}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-0.5 text-xs font-bold mb-1" style={{ color: '#F5A623' }}>
                <Star className="h-3 w-3 fill-current" />{store.rating}
              </div>
              <div className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                style={{ background: store.open ? 'rgba(0,201,167,0.15)' : 'rgba(255,107,53,0.15)', color: store.open ? '#00C9A7' : '#FF6B35' }}>
                {store.open ? 'Open' : 'Closed'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── OFFERS TAB ───────── */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };
  const OFFER_COLORS: Record<string, string> = { discount: '#00C9A7', delivery: '#F5A623', referral: '#A855F7' };

  return (
    <div className="space-y-6">
      {/* Mega banner */}
      <div className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #0D2040, #0F1B35)', border: '1px solid rgba(0,201,167,0.25)' }}>
        <div className="absolute right-6 bottom-0 text-9xl opacity-10 pointer-events-none select-none">🏷️</div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-3"
          style={{ background: 'rgba(0,201,167,0.2)', color: '#00C9A7' }}>
          🔥 MEGA DEAL
        </div>
        <h2 className="text-2xl font-black text-white mb-1">Flat 50% Off First Order</h2>
        <p className="text-sm mb-4" style={{ color: '#5A7A9A' }}>Valid on orders above ₹199. Max discount ₹100. New users only.</p>
        <div className="flex items-center gap-3">
          <span className="font-black text-sm px-4 py-2 rounded-xl"
            style={{ background: 'rgba(0,0,0,0.3)', color: '#00C9A7', border: '2px dashed rgba(0,201,167,0.5)', letterSpacing: '0.1em' }}>
            ZYPHIX50
          </span>
          <button onClick={() => copyCode('ZYPHIX50')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105"
            style={{ background: copied === 'ZYPHIX50' ? '#00C9A7' : 'rgba(0,201,167,0.15)', color: copied === 'ZYPHIX50' ? '#0A0E1A' : '#00C9A7', border: '1px solid rgba(0,201,167,0.4)' }}>
            {copied === 'ZYPHIX50' ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy</>}
          </button>
        </div>
      </div>

      {/* Promo codes */}
      <div>
        <h2 className="text-base font-black text-white mb-4">All Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promoCodes.map(offer => {
            const color = OFFER_COLORS[offer.type] || '#00C9A7';
            return (
              <div key={offer.code} onClick={() => copyCode(offer.code)}
                className="rounded-2xl p-4 cursor-pointer group transition-all"
                style={{ background: '#0F1B35', border: `1px solid ${copied === offer.code ? color : '#1E3A6E'}` }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-sm" style={{ color }}>{offer.code}</span>
                  <button className="flex items-center gap-1 text-xs font-bold" style={{ color: copied === offer.code ? '#00C9A7' : '#5A7A9A' }}>
                    {copied === offer.code ? <><Check className="h-3.5 w-3.5" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                  </button>
                </div>
                <p className="text-sm text-white">{offer.description}</p>
                <p className="text-[10px] mt-1" style={{ color: '#5A7A9A' }}>Valid till 31 Dec 2025</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refer & earn */}
      <div className="rounded-2xl p-5 flex items-center gap-4 justify-between"
        style={{ background: 'linear-gradient(135deg, #1a0a2e, #0F1B35)', border: '1px solid rgba(168,85,247,0.3)' }}>
        <div>
          <p className="font-black text-white text-base">🎁 Refer & Earn ₹100</p>
          <p className="text-sm" style={{ color: '#5A7A9A' }}>You & your friend both get ₹100 credits</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl font-bold text-sm shrink-0"
          style={{ background: '#A855F7', color: 'white', boxShadow: '0 4px 16px rgba(168,85,247,0.3)' }}>
          Share Now
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN HOME COMPONENT
════════════════════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const tab = TABS.find(t => t.id === activeTab)!;

  const CONTENT: Record<TabId, React.ReactNode> = {
    now: <NowTab />,
    eats: <EatsTab />,
    book: <BookTab />,
    map: <MapTab />,
    offers: <OffersTab />,
  };

  return (
    <div className="pb-24">
      {/* ── Service Tabs (Zepto-style) ── */}
      <div className="sticky top-[57px] z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-0"
        style={{ background: '#0A0E1A', borderBottom: '1px solid rgba(30,58,110,0.5)' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-end overflow-x-auto no-scrollbar">
            {TABS.map(t => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className="flex items-center gap-1.5 px-4 py-3 whitespace-nowrap text-sm font-bold shrink-0 transition-all duration-200 relative"
                  style={{ color: active ? t.color : '#5A7A9A' }}
                >
                  <span className="text-base">{t.icon}</span>
                  {t.label}
                  {active && (
                    <motion.div layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                      style={{ background: t.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="max-w-screen-xl mx-auto pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
