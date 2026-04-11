import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, MapPin, Clock, Plus, Minus, ShoppingCart, ArrowRight,
  Check, Copy, Zap, Utensils, CalendarCheck, ChevronRight,
  Package, Truck, Shield, Users, TrendingUp, Bell, Smartphone
} from 'lucide-react';
import { products, restaurants, services, promoCodes, stores } from '@/data/mockData';

/* ═══════════ TYPES ═══════════ */
type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

/* ═══════════ CONSTANTS ═══════════ */
const TABS = [
  { id: 'now'    as TabId, label: 'ZyphixNow',      icon: '⚡', color: '#00FFD1', grad: 'linear-gradient(135deg,#00FFD1,#0EA5E9)', shadow: 'rgba(0,255,209,0.3)' },
  { id: 'eats'   as TabId, label: 'ZyphixEats',     icon: '🍱', color: '#FBBF24', grad: 'linear-gradient(135deg,#F59E0B,#F97316)', shadow: 'rgba(245,158,11,0.3)' },
  { id: 'book'   as TabId, label: 'ZyphixBook',     icon: '📅', color: '#C084FC', grad: 'linear-gradient(135deg,#8B5CF6,#EC4899)', shadow: 'rgba(139,92,246,0.3)' },
  { id: 'map'    as TabId, label: 'Kirana Near Me', icon: '🗺️', color: '#38BDF8', grad: 'linear-gradient(135deg,#0EA5E9,#6366F1)', shadow: 'rgba(14,165,233,0.3)' },
  { id: 'offers' as TabId, label: 'Offers',         icon: '🏷️', color: '#F472B6', grad: 'linear-gradient(135deg,#EC4899,#8B5CF6)', shadow: 'rgba(236,72,153,0.3)' },
];

const GROCERY_CATS = [
  { name: 'Fruits & Veg',   emoji: '🍅', bg: 'linear-gradient(135deg,#064e3b,#065f46)' },
  { name: 'Dairy & Eggs',   emoji: '🥛', bg: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)' },
  { name: 'Rice & Dal',     emoji: '🌾', bg: 'linear-gradient(135deg,#78350f,#92400e)' },
  { name: 'Snacks',         emoji: '🍪', bg: 'linear-gradient(135deg,#4c1d95,#5b21b6)' },
  { name: 'Personal Care',  emoji: '🧴', bg: 'linear-gradient(135deg,#831843,#9d174d)' },
  { name: 'Medicines',      emoji: '💊', bg: 'linear-gradient(135deg,#0c4a6e,#075985)' },
  { name: 'Household',      emoji: '🧹', bg: 'linear-gradient(135deg,#1c1917,#292524)' },
  { name: 'Electronics',    emoji: '💡', bg: 'linear-gradient(135deg,#1e1b4b,#312e81)' },
  { name: 'Baby & Kids',    emoji: '🍼', bg: 'linear-gradient(135deg,#701a75,#86198f)' },
  { name: 'Pet Care',       emoji: '🐕', bg: 'linear-gradient(135deg,#14532d,#166534)' },
];

const FOOD_CATS = [
  { name: 'North Indian', emoji: '🍛', bg: 'linear-gradient(135deg,#78350f,#92400e)' },
  { name: 'Wazwan',       emoji: '🍖', bg: 'linear-gradient(135deg,#7f1d1d,#991b1b)' },
  { name: 'Pizza',        emoji: '🍕', bg: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)' },
  { name: 'Biryani',      emoji: '🍚', bg: 'linear-gradient(135deg,#064e3b,#065f46)' },
  { name: 'Sweets',       emoji: '🍡', bg: 'linear-gradient(135deg,#4c1d95,#5b21b6)' },
  { name: 'Breakfast',    emoji: '🥞', bg: 'linear-gradient(135deg,#0c4a6e,#075985)' },
  { name: 'Fast Food',    emoji: '🍔', bg: 'linear-gradient(135deg,#831843,#9d174d)' },
  { name: 'Chinese',      emoji: '🥡', bg: 'linear-gradient(135deg,#1c1917,#292524)' },
];

const SERVICE_CATS = [
  { name: 'Haircut',     emoji: '✂️', bg: 'linear-gradient(135deg,#831843,#9d174d)' },
  { name: 'Car Service', emoji: '🔧', bg: 'linear-gradient(135deg,#1e3a5f,#1d4ed8)' },
  { name: 'Doctor',      emoji: '🩺', bg: 'linear-gradient(135deg,#0c4a6e,#075985)' },
  { name: 'Cleaning',    emoji: '🧹', bg: 'linear-gradient(135deg,#064e3b,#065f46)' },
  { name: 'Tailor',      emoji: '🧵', bg: 'linear-gradient(135deg,#4c1d95,#5b21b6)' },
  { name: 'Electrician', emoji: '⚡', bg: 'linear-gradient(135deg,#78350f,#92400e)' },
  { name: 'Plumber',     emoji: '🪠', bg: 'linear-gradient(135deg,#1c1917,#292524)' },
  { name: 'Beautician',  emoji: '💅', bg: 'linear-gradient(135deg,#701a75,#86198f)' },
];

const STATS = [
  { value: '50K+', label: 'Happy Customers', icon: Users, color: '#00FFD1' },
  { value: '1,200+', label: 'Kirana Partners', icon: Package, color: '#FBBF24' },
  { value: '30 min', label: 'Avg Delivery', icon: Truck, color: '#C084FC' },
  { value: '4.8★', label: 'App Rating', icon: Star, color: '#F472B6' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1], delay: d } }),
};

/* ═══════════ SHARED: Category Grid ═══════════ */
function CategoryGrid({ cats }: { cats: { name: string; emoji: string; bg: string }[] }) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
      {cats.map((c, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04, duration: 0.35 }}>
          <div className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-full aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
              style={{ background: c.bg, border: '1px solid rgba(255,255,255,0.08)' }}>
              {c.emoji}
            </div>
            <span className="text-[10px] sm:text-xs text-center font-semibold leading-tight" style={{ color: '#6B7280' }}>
              {c.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════ NOW TAB ═══════════ */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const cats = ['All', 'Vegetables', 'Dairy', 'Snacks', 'Grains & Dal', 'Medicine', 'Personal Care'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  return (
    <div className="space-y-8">
      {/* Value props */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '🚀', title: '30 Min', sub: 'Delivery guaranteed', color: '#00FFD1' },
          { icon: '💰', title: '₹0 Fees', sub: 'No hidden charges', color: '#FBBF24' },
          { icon: '✅', title: 'Verified', sub: 'Quality checked stores', color: '#C084FC' },
        ].map((v, i) => (
          <div key={i} className="rounded-2xl p-4 text-center z-card lift"
            style={{ borderColor: `${v.color}20` }}>
            <div className="text-2xl mb-1">{v.icon}</div>
            <p className="font-black text-white text-base">{v.title}</p>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#4A5080' }}>{v.sub}</p>
          </div>
        ))}
      </div>

      {/* Category grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-white">Shop by Category</h2>
          <span className="text-xs font-semibold" style={{ color: '#00FFD1' }}>All categories →</span>
        </div>
        <CategoryGrid cats={GROCERY_CATS} />
      </div>

      {/* Promo banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-2xl p-6 cursor-pointer lift"
          style={{ background: 'linear-gradient(135deg,#022c1e,#064e3b)', border: '1px solid rgba(0,255,209,0.2)' }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #00FFD1, transparent)' }} />
          <div className="absolute right-4 top-4 text-5xl opacity-25">🛒</div>
          <span className="tag" style={{ background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.3)' }}>
            NEW USER DEAL
          </span>
          <p className="text-4xl font-black text-white mt-3 leading-none">50% OFF</p>
          <p className="text-sm mt-1 mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>First order · Max ₹100 discount</p>
          <div className="flex items-center gap-2">
            <span className="font-black text-sm px-4 py-2 rounded-xl" style={{ background: 'rgba(0,255,209,0.12)', color: '#00FFD1', border: '1px dashed rgba(0,255,209,0.4)', letterSpacing: '0.06em' }}>
              ZYPHIX50
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl p-6 cursor-pointer lift"
          style={{ background: 'linear-gradient(135deg,#0c0221,#1e1b4b)', border: '1px solid rgba(139,92,246,0.2)' }}>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
          <div className="absolute right-4 top-4 text-5xl opacity-25">🏪</div>
          <span className="tag" style={{ background: 'rgba(139,92,246,0.15)', color: '#C084FC', border: '1px solid rgba(139,92,246,0.3)' }}>
            1,200+ STORES
          </span>
          <p className="text-4xl font-black text-white mt-3 leading-none">Real Kirana,<br />Real Fast</p>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Local inventory · Zero surge pricing</p>
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            Trending Near You <TrendingUp className="h-4 w-4" style={{ color: '#00FFD1' }} />
          </h2>
        </div>
        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                background: activeCat === c ? 'linear-gradient(135deg,#00FFD1,#0EA5E9)' : 'rgba(255,255,255,0.05)',
                color: activeCat === c ? '#050F0A' : '#6B7280',
                border: activeCat === c ? 'none' : '1px solid rgba(255,255,255,0.07)',
              }}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl overflow-hidden z-card group cursor-pointer">
                <div className="h-32 relative flex items-center justify-center text-4xl" style={{ background: p.bgColor }}>
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{p.emoji}</span>
                  {p.origPrice && (
                    <div className="absolute top-2 left-2 tag text-white" style={{ background: '#F97316', border: 'none' }}>
                      -{Math.round((1 - p.price / p.origPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-white text-sm leading-tight line-clamp-2 mb-0.5">{p.name}</p>
                  <p className="text-[10px] mb-2.5 font-medium" style={{ color: '#4A5080' }}>{p.weight}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-white text-sm">₹{p.price}</span>
                      {p.origPrice && <span className="text-[10px] line-through ml-1" style={{ color: '#4A5080' }}>₹{p.origPrice}</span>}
                    </div>
                    {cart[p.id] ? (
                      <div className="flex items-center rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#00FFD1,#0EA5E9)' }}>
                        <button onClick={() => rem(p.id)} className="px-2 py-1.5 font-black text-[#050F0A] hover:bg-black/10">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-black text-[#050F0A] min-w-[14px] text-center">{cart[p.id]}</span>
                        <button onClick={() => add(p.id)} className="px-2 py-1.5 font-black text-[#050F0A] hover:bg-black/10">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => add(p.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105"
                        style={{ background: 'rgba(0,255,209,0.1)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.3)' }}>
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating cart */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 z-50">
            <div className="flex items-center justify-between rounded-2xl px-5 py-4 cursor-pointer"
              style={{ background: 'linear-gradient(135deg,#00FFD1,#0EA5E9)', boxShadow: '0 12px 40px rgba(0,255,209,0.4)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  {totalItems}
                </div>
                <span className="font-bold text-sm text-[#050F0A]">{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#050F0A]">₹{totalPrice}</span>
                <ShoppingCart className="h-4 w-4 text-[#050F0A]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════ EATS TAB ═══════════ */
function EatsTab() {
  const DISHES = [
    { name: 'Dal Makhni',     emoji: '🫕', price: 149, rating: 4.8, from: 'Sharma Dhaba' },
    { name: 'Veg Thali',      emoji: '🍱', price: 119, rating: 4.6, from: 'Jammu Kitchen' },
    { name: 'Pepperoni Pizza',emoji: '🍕', price: 199, rating: 4.3, from: 'Pizza Palace JK' },
    { name: 'Wazwan Platter', emoji: '🍖', price: 299, rating: 4.9, from: 'Kashmir Kitchen' },
    { name: 'Gulab Jamun',    emoji: '🍡', price: 49,  rating: 4.7, from: 'Jammu Sweets' },
    { name: 'Rajma Chawal',   emoji: '🍛', price: 109, rating: 4.5, from: 'Sharma Dhaba' },
    { name: 'Biryani',        emoji: '🍚', price: 179, rating: 4.6, from: 'Spice Garden' },
    { name: 'Chole Bhature',  emoji: '🫓', price: 89,  rating: 4.4, from: 'Punjab Da Dhaba' },
  ];
  return (
    <div className="space-y-8">
      {/* Featured */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 cursor-pointer lift"
        style={{ background: 'linear-gradient(135deg,#1a0e00,#2d1900)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.2), transparent 60%)' }} />
        <div className="absolute right-6 bottom-0 text-8xl opacity-20 pointer-events-none">🍲</div>
        <div className="relative max-w-sm">
          <span className="tag" style={{ background: 'rgba(251,191,36,0.15)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)' }}>
            ⭐ FEATURED DHABA
          </span>
          <h3 className="text-2xl font-black text-white mt-3 mb-2">Sharma Dhaba Special</h3>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Authentic Dal Makhni · Butter Naan · Free delivery on ₹199+
          </p>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black btn-orange">
            Order Now <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Food categories */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-white">What are you craving?</h2>
        </div>
        <CategoryGrid cats={FOOD_CATS} />
      </div>

      {/* Popular dishes */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">Popular Dishes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {DISHES.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="rounded-2xl overflow-hidden z-card group cursor-pointer lift">
                <div className="h-20 flex items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${['#1a0e00','#0c1a00','#001830','#1a0030','#1a0014','#0a1a00','#001a1a','#1a1a00'][i % 8]}, rgba(0,0,0,0.8))` }}>
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{d.emoji}</span>
                </div>
                <div className="p-2.5">
                  <p className="font-bold text-white text-xs mb-0.5 truncate">{d.name}</p>
                  <p className="text-[9px] mb-1 truncate" style={{ color: '#4A5080' }}>{d.from}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-xs">₹{d.price}</span>
                    <span className="text-[9px] font-bold flex items-center gap-0.5" style={{ color: '#FBBF24' }}>
                      <Star className="h-2.5 w-2.5 fill-current" />{d.rating}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">Restaurants near you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="rounded-2xl p-4 flex gap-4 cursor-pointer z-card group lift">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shrink-0"
                  style={{ background: 'linear-gradient(135deg,#1a0e00,#0a0a0a)', border: '1px solid rgba(245,158,11,0.15)' }}>
                  {r.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-black text-white text-base leading-tight">{r.name}</p>
                    <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg shrink-0 ml-1"
                      style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)' }}>
                      <Star className="h-3 w-3 fill-[#4ade80]" style={{ color: '#4ade80' }} />
                      <span className="text-[11px] font-black" style={{ color: '#4ade80' }}>{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs mb-2.5 truncate" style={{ color: '#4A5080' }}>{r.cuisine}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                      <Clock className="h-2.5 w-2.5" />{r.eta}
                    </span>
                    {r.deliveryFee === 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,255,209,0.1)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.2)' }}>
                        Free delivery
                      </span>
                    )}
                    {r.badges.filter(b => b !== '₹0 delivery').map(b => (
                      <span key={b} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.2)' }}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ BOOK TAB ═══════════ */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['9:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'];

  return (
    <div className="space-y-8">
      {/* Value strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: '✅', v: 'Verified', s: 'Background-checked pros', c: '#C084FC' },
          { icon: '💰', v: 'Zero Fee', s: 'No cancellation charges', c: '#00FFD1' },
          { icon: '⭐', v: '4.8 Rated', s: '10,000+ happy customers', c: '#FBBF24' },
        ].map((v, i) => (
          <div key={i} className="rounded-2xl p-4 text-center z-card lift" style={{ borderColor: `${v.c}15` }}>
            <div className="text-2xl mb-1">{v.icon}</div>
            <p className="font-black text-white text-sm">{v.v}</p>
            <p className="text-[10px] mt-0.5 font-medium" style={{ color: '#4A5080' }}>{v.s}</p>
          </div>
        ))}
      </div>

      {/* Service categories */}
      <div>
        <h2 className="text-lg font-black text-white mb-5">Browse Services</h2>
        <CategoryGrid cats={SERVICE_CATS} />
      </div>

      {/* Services grid */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">Available Near You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map(s => {
            const active = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200 relative overflow-hidden"
                style={{
                  background: active ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.08))' : 'var(--z-card)',
                  border: active ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  transform: active ? 'scale(1.02)' : undefined,
                  boxShadow: active ? '0 8px 32px rgba(139,92,246,0.2)' : undefined,
                }}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent)', transform: 'translate(30%, -30%)' }} />
                {active && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className="text-4xl mb-3">{s.emoji}</div>
                <p className="font-black text-white text-base mb-0.5">{s.title}</p>
                <p className="text-xs mb-3 font-medium" style={{ color: '#4A5080' }}>{s.category}</p>
                <p className="text-xs font-bold" style={{ color: '#00FFD1' }}>{s.available} pros available</p>
                <p className="text-[10px]" style={{ color: '#4A5080' }}>Next: {s.nextSlot}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="rounded-2xl p-6 z-card">
              <h3 className="font-black text-white text-base mb-5">Pick a Time Slot — Today</h3>
              <div className="grid grid-cols-4 gap-2.5 mb-5">
                {SLOTS.map(s => (
                  <button key={s} onClick={() => setSlot(s)}
                    className="py-3 rounded-xl text-xs font-bold transition-all duration-200"
                    style={{
                      background: slot === s ? 'linear-gradient(135deg,#8B5CF6,#EC4899)' : 'rgba(255,255,255,0.05)',
                      color: slot === s ? 'white' : '#6B7280',
                      border: slot === s ? 'none' : '1px solid rgba(255,255,255,0.07)',
                      transform: slot === s ? 'scale(1.05)' : undefined,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setBooked(true)} disabled={!slot}
                className="w-full py-3.5 rounded-xl font-black text-sm transition-all disabled:opacity-30"
                style={{
                  background: slot ? 'linear-gradient(135deg,#8B5CF6,#EC4899)' : 'rgba(139,92,246,0.2)',
                  color: slot ? 'white' : '#6B7280',
                  boxShadow: slot ? '0 8px 30px rgba(139,92,246,0.3)' : undefined,
                }}>
                {booked ? '✓ Booking Confirmed!' : 'Confirm Booking →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════ MAP TAB ═══════════ */
function MapTab() {
  const TYPE_COLOR: Record<string, string> = { kirana:'#00FFD1', medical:'#38BDF8', restaurant:'#FBBF24', electronics:'#C084FC', garage:'#F97316', salon:'#F472B6' };
  const TYPE_EMOJI: Record<string, string> = { kirana:'🏪', medical:'💊', restaurant:'🍲', electronics:'💡', garage:'🔧', salon:'✂️' };
  return (
    <div className="space-y-5">
      {/* Map placeholder */}
      <div className="rounded-3xl overflow-hidden relative" style={{ height: 220, background: 'linear-gradient(135deg,#0a0a1a,#0c0f1e)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="text-5xl">🗺️</div>
          <p className="font-black text-white text-lg">Jammu, J&K</p>
          <p className="text-sm font-medium" style={{ color: '#4A5080' }}>8 stores within 1km radius</p>
          <div className="flex gap-3">
            {['#00FFD1','#FBBF24','#C084FC','#F97316'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full animate-pulse-soft" style={{ background: c, animationDelay: `${i*0.4}s` }} />
            ))}
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.1),transparent 70%)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((store: any) => {
          const c = TYPE_COLOR[store.type] || '#00FFD1';
          return (
            <div key={store.id} className="rounded-2xl p-4 flex items-center gap-3 cursor-pointer z-card lift group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: `${c}10`, border: `1px solid ${c}20` }}>
                {TYPE_EMOJI[store.type] || '🏪'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-white text-sm truncate">{store.name}</p>
                <div className="flex items-center gap-2 text-[10px] mt-0.5 font-medium" style={{ color: '#4A5080' }}>
                  <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{store.distance}</span>
                  <span>·</span>
                  <span><Clock className="h-2.5 w-2.5 inline mr-0.5" />{store.openHours}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-0.5 text-xs font-black mb-1" style={{ color: '#FBBF24' }}>
                  <Star className="h-3 w-3 fill-current" />{store.rating}
                </div>
                <div className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                  style={{ background: store.open ? 'rgba(0,255,209,0.1)' : 'rgba(249,115,22,0.1)', color: store.open ? '#00FFD1' : '#F97316', border: `1px solid ${store.open ? 'rgba(0,255,209,0.2)' : 'rgba(249,115,22,0.2)'}` }}>
                  {store.open ? 'Open' : 'Closed'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════ OFFERS TAB ═══════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 2500); };
  const COLORS: Record<string, [string,string]> = {
    discount: ['#00FFD1','rgba(0,255,209,0.1)'],
    delivery: ['#FBBF24','rgba(251,191,36,0.1)'],
    referral: ['#C084FC','rgba(192,132,252,0.1)'],
  };
  return (
    <div className="space-y-6">
      {/* Mega banner */}
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-10 cursor-pointer"
        style={{ background: 'linear-gradient(135deg,#050c20,#0a1230)', border: '1px solid rgba(0,255,209,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(0,255,209,0.08), transparent 60%)' }} />
        <div className="absolute right-8 bottom-4 text-8xl opacity-10 select-none pointer-events-none">🏷️</div>
        <div className="relative max-w-sm">
          <span className="tag" style={{ background: 'rgba(0,255,209,0.12)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.25)' }}>🔥 MEGA DEAL</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-1 leading-tight">
            Flat <span className="text-grad-teal">50% Off</span><br />First Order
          </h2>
          <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>Valid on orders above ₹199 · Max ₹100 · New users only</p>
          <div className="flex items-center gap-3">
            <span className="font-black text-base px-5 py-2.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.4)', color: '#00FFD1', border: '2px dashed rgba(0,255,209,0.4)', letterSpacing: '0.08em' }}>
              ZYPHIX50
            </span>
            <button onClick={() => copy('ZYPHIX50')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all hover:scale-105"
              style={{ background: copied === 'ZYPHIX50' ? '#00FFD1' : 'rgba(0,255,209,0.12)', color: copied === 'ZYPHIX50' ? '#050F0A' : '#00FFD1', border: '1px solid rgba(0,255,209,0.3)' }}>
              {copied === 'ZYPHIX50' ? <><Check className="h-4 w-4" />Copied!</> : <><Copy className="h-4 w-4" />Copy</>}
            </button>
          </div>
        </div>
      </div>

      {/* Coupon grid */}
      <div>
        <h2 className="text-lg font-black text-white mb-4">All Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promoCodes.map(offer => {
            const [c, bg] = COLORS[offer.type] || ['#00FFD1','rgba(0,255,209,0.1)'];
            const isCopied = copied === offer.code;
            return (
              <div key={offer.code} onClick={() => copy(offer.code)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200 group lift"
                style={{ background: 'var(--z-card)', border: isCopied ? `1px solid ${c}40` : '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-base tracking-wide" style={{ color: c }}>{offer.code}</span>
                  <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: isCopied ? bg : 'rgba(255,255,255,0.05)', color: isCopied ? c : '#4A5080', border: `1px solid ${isCopied ? `${c}30` : 'rgba(255,255,255,0.07)'}` }}>
                    {isCopied ? <><Check className="h-3.5 w-3.5" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
                  </button>
                </div>
                <p className="text-sm text-white font-medium">{offer.description}</p>
                <p className="text-[10px] mt-1.5 font-medium" style={{ color: '#4A5080' }}>Valid till 31 Dec 2025</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refer & earn */}
      <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 justify-between"
        style={{ background: 'linear-gradient(135deg,#0f051a,#0c0f1e)', border: '1px solid rgba(192,132,252,0.2)' }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.2)' }}>🎁</div>
          <div>
            <p className="font-black text-white text-base">Refer & Earn ₹100</p>
            <p className="text-sm" style={{ color: '#4A5080' }}>You & your friend both get ₹100 credits</p>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl font-black text-sm shrink-0 btn-purple">
          Share & Earn →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   MAIN HOME
═══════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const [heroVisible, setHeroVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setHeroVisible(y < 20);
      setLastScroll(y);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const tab = TABS.find(t => t.id === activeTab)!;

  const CONTENT: Record<TabId, React.ReactNode> = {
    now: <NowTab />,
    eats: <EatsTab />,
    book: <BookTab />,
    map: <MapTab />,
    offers: <OffersTab />,
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--z-bg)' }}>

      {/* ══ HERO BANNER ══ */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, rgba(8,5,20,0.8) 0%, var(--z-bg) 100%)' }}>
        {/* Animated blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full pointer-events-none animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(0,255,209,0.1), transparent 70%)', filter: 'blur(60px)', animationDelay: '3s' }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-6 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left text */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ background: 'rgba(0,255,209,0.08)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-pulse" />
                Now live in Jammu, J&K
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight mb-3">
                <span className="text-white">India's first</span><br />
                <span className="shimmer-text">SuperLocal</span>
                <span className="text-white"> app</span>
              </h1>
              <p className="text-base mb-6 max-w-md mx-auto md:mx-0" style={{ color: '#4A5080' }}>
                Groceries in 30 min · Food from local dhabas · Book any service — all in one app, built for Tier-2 India.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {STATS.map((s, i) => (
                  <motion.div key={i} custom={i * 0.1} variants={fadeUp} initial="hidden" animate="visible">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}18` }}>
                        <s.icon className="h-4 w-4" style={{ color: s.color }} />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-white text-sm leading-none">{s.value}</p>
                        <p className="text-[10px] font-medium" style={{ color: '#4A5080' }}>{s.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: floating card */}
            <motion.div initial={{ opacity: 0, x: 30, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-shrink-0 w-full max-w-[280px] hidden lg:block animate-float">
              <div className="rounded-3xl p-5 relative overflow-hidden"
                style={{ background: 'rgba(17,20,38,0.8)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(139,92,246,0.1), transparent 60%)' }} />
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: 'linear-gradient(135deg,#00FFD1,#0EA5E9)' }}>⚡</div>
                    <div>
                      <p className="text-white font-bold text-sm">Live Order</p>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] animate-pulse" />
                        <p className="text-[10px] font-medium" style={{ color: '#00FFD1' }}>On the way · 12 min</p>
                      </div>
                    </div>
                  </div>
                  {products.slice(0,3).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-2.5 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                        style={{ background: p.bgColor }}>
                        {p.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px]" style={{ color: '#4A5080' }}>{p.storeName}</p>
                      </div>
                      <p className="text-white text-xs font-black shrink-0">₹{p.price}</p>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs font-medium" style={{ color: '#4A5080' }}>
                      Sharma General Store
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black" style={{ color: '#00FFD1' }}>
                      Track <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full w-3/4" style={{ background: 'linear-gradient(90deg,#00FFD1,#0EA5E9)' }} />
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl p-3.5 flex items-center gap-3 animate-float2"
                style={{ background: 'rgba(17,20,38,0.7)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,255,209,0.12)', border: '1px solid rgba(0,255,209,0.2)' }}>
                  <Shield className="h-4 w-4" style={{ color: '#00FFD1' }} />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">100% Secure & Trusted</p>
                  <p className="text-[9px] font-medium" style={{ color: '#4A5080' }}>All stores verified by ZYPHIX</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ SERVICE TABS (sticky below navbar) ══ */}
      <div className="sticky z-40 -mx-4 sm:-mx-6 lg:-mx-8 px-0"
        style={{ top: 64, background: 'rgba(5,6,15,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch overflow-x-auto no-scrollbar gap-1 py-2">
            {TABS.map(t => {
              const active = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-sm font-bold shrink-0 transition-all duration-200 relative"
                  style={{
                    background: active ? t.grad : 'transparent',
                    color: active ? '#050F0A' : '#6B7280',
                    boxShadow: active ? `0 4px 20px ${t.shadow}` : 'none',
                    transform: active ? 'scale(1.03)' : 'scale(1)',
                  }}>
                  <span className="text-base">{t.icon}</span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══ TAB CONTENT ══ */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22,1,0.36,1] }}
          >
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
