import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Plus, Minus, ShoppingCart, ArrowRight, Check, Copy,
  MapPin, Truck, Shield, Zap, ChevronRight, Search, TrendingUp
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'now',    label: 'ZyphixNow',      icon: '⚡' },
  { id: 'eats',   label: 'ZyphixEats',     icon: '🍱' },
  { id: 'book',   label: 'ZyphixBook',     icon: '📅' },
  { id: 'map',    label: 'Kirana Near Me', icon: '🗺️' },
  { id: 'offers', label: 'Offers',         icon: '🏷️' },
];

/* ─────────────── Shared ─────────────── */
function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="section-title">{title}</h2>
      {action && (
        <button className="text-xs font-semibold flex items-center gap-0.5" style={{ color: 'var(--z-green)' }}>
          {action} <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-xs font-bold" style={{ color: '#f59e0b' }}>
      <Star className="h-3 w-3 fill-current" />{rating}
    </span>
  );
}

/* ─────────────── NOW TAB ─────────────── */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');

  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Personal Care', 'Bakery', 'Spices', 'Medicine'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) =>
    s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  return (
    <div className="space-y-8">

      {/* ── Hero promo banner ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative overflow-hidden rounded-2xl h-[160px] cursor-pointer lift"
          style={{ background: 'linear-gradient(120deg,#003c1a,#00200d)' }}>
          <img
            src="https://images.unsplash.com/photo-1543168256-418811576931?w=500&h=280&fit=crop&q=80"
            alt="Fresh groceries"
            className="absolute inset-0 w-full h-full img-cover opacity-30"
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <span className="badge badge-green">⚡ 30 MIN DELIVERY</span>
            <div>
              <p className="font-black text-white text-2xl leading-tight mb-1">50% OFF<br />First Order</p>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>Use code <span className="font-bold" style={{ color: 'var(--z-green)' }}>ZYPHIX50</span> · Max ₹100</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl h-[160px] cursor-pointer lift"
          style={{ background: 'linear-gradient(120deg,#1a0900,#0d0500)' }}>
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=280&fit=crop&q=80"
            alt="Kirana stores"
            className="absolute inset-0 w-full h-full img-cover opacity-25"
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <span className="badge badge-orange">🏪 1,200+ PARTNERS</span>
            <div>
              <p className="font-black text-white text-2xl leading-tight mb-1">Real Kirana,<br />Real Fast</p>
              <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>Local stores · No surge pricing ever</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── USP row ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Zap,    v: '30 Min',   s: 'Guaranteed delivery',  c: 'var(--z-green)'  },
          { icon: Truck,  v: '₹0 Fees',  s: 'No hidden charges',    c: 'var(--z-orange)' },
          { icon: Shield, v: 'Verified', s: 'Quality inspected',    c: 'var(--z-blue)'   },
        ].map(({ icon: Icon, v, s, c }, i) => (
          <div key={i} className="rounded-2xl p-4 text-center z-card">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2.5"
              style={{ background: `${c}18` }}>
              <Icon className="h-4.5 w-4.5" style={{ color: c, height: 18, width: 18 }} />
            </div>
            <p className="font-black text-white text-sm leading-none">{v}</p>
            <p className="text-[10px] mt-0.5 font-medium leading-tight" style={{ color: 'var(--z-muted)' }}>{s}</p>
          </div>
        ))}
      </div>

      {/* ── Categories ── */}
      <div>
        <SectionHeader title="Shop by Category" action="See all" />
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {categories.map((cat, i) => (
            <motion.button key={cat.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => setActiveCat(cat.name)}
              className="flex flex-col items-center gap-2 group">
              <div className="w-full aspect-square rounded-2xl overflow-hidden relative"
                style={{ border: activeCat === cat.name ? `2px solid ${cat.color}` : '2px solid transparent' }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5))' }} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-center leading-tight"
                style={{ color: activeCat === cat.name ? 'white' : 'var(--z-muted)' }}>
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Products ── */}
      <div>
        <SectionHeader title="Trending Near You" />
        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`filter-pill ${activeCat === c ? 'filter-pill-active' : 'filter-pill-inactive'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}>
                <div className="rounded-2xl overflow-hidden z-card group cursor-pointer flex flex-col">
                  {/* Product image */}
                  <div className="relative h-32 sm:h-36 overflow-hidden bg-[#1a1c24]">
                    <img src={p.image} alt={p.name}
                      className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                    {p.tag && (
                      <div className="absolute top-2 left-2">
                        <span className={`badge ${p.tag === 'Fresh' ? 'badge-green' : p.tag === 'Bestseller' ? 'badge-orange' : 'badge-red'}`}>
                          {p.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-[11px] font-semibold mb-0.5" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                    <p className="font-bold text-white text-sm leading-tight line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-[10px] mb-3 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                    <div className="flex items-center justify-between mt-auto gap-1">
                      <div>
                        <span className="font-black text-white text-sm">₹{p.price}</span>
                        {p.origPrice && (
                          <span className="text-[10px] line-through ml-1" style={{ color: 'var(--z-muted)' }}>₹{p.origPrice}</span>
                        )}
                      </div>
                      {cart[p.id] ? (
                        <div className="flex items-center rounded-xl overflow-hidden shrink-0"
                          style={{ background: 'var(--z-green)' }}>
                          <button onClick={() => rem(p.id)} className="px-2 py-1.5 hover:bg-black/10 transition-colors">
                            <Minus className="h-3 w-3" style={{ color: '#030a05' }} />
                          </button>
                          <span className="text-xs font-black min-w-[16px] text-center" style={{ color: '#030a05' }}>{cart[p.id]}</span>
                          <button onClick={() => add(p.id)} className="px-2 py-1.5 hover:bg-black/10 transition-colors">
                            <Plus className="h-3 w-3" style={{ color: '#030a05' }} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => add(p.id)}
                          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: 'rgba(0,217,126,0.1)', border: '1px solid rgba(0,217,126,0.3)' }}>
                          <Plus className="h-4 w-4" style={{ color: 'var(--z-green)' }} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-50 cursor-pointer">
            <div className="rounded-2xl px-5 py-4 flex items-center justify-between"
              style={{ background: 'var(--z-green)', boxShadow: '0 16px 48px rgba(0,217,126,0.4)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'rgba(0,0,0,0.18)', color: '#030a05' }}>
                  {totalItems}
                </div>
                <span className="font-bold text-sm" style={{ color: '#030a05' }}>
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black" style={{ color: '#030a05' }}>₹{totalPrice}</span>
                <ArrowRight className="h-5 w-5" style={{ color: '#030a05' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── EATS TAB ─────────────── */
function EatsTab() {
  return (
    <div className="space-y-8">

      {/* Food category quick-picks */}
      <div>
        <SectionHeader title="What are you craving?" />
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {foodCategories.map((fc, i) => (
            <motion.button key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 group">
              <div className="w-full aspect-square rounded-2xl overflow-hidden">
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-center" style={{ color: 'var(--z-muted)' }}>{fc.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Featured restaurant hero */}
      <div className="relative overflow-hidden rounded-2xl h-[200px] cursor-pointer lift">
        <img src={restaurants[0].image} alt={restaurants[0].name} className="absolute inset-0 w-full h-full img-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.1))' }} />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div>
            <span className="badge badge-orange">⭐ TOP RATED IN JAMMU</span>
            <h3 className="text-2xl font-black text-white mt-2 mb-0.5">{restaurants[0].name}</h3>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{restaurants[0].cuisine}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={restaurants[0].rating} />
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{restaurants[0].eta}</span>
            </div>
            <button className="btn-orange rounded-xl px-4 py-2 text-sm">
              Order Now →
            </button>
          </div>
        </div>
      </div>

      {/* All restaurants */}
      <div>
        <SectionHeader title="Restaurants Near You" action="See all" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((r, i) => (
            <motion.div key={r.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="rounded-2xl overflow-hidden z-card cursor-pointer group">
                {/* Cover image */}
                <div className="relative h-36 overflow-hidden bg-[#1a1c24]">
                  <img src={r.image} alt={r.name}
                    className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 30%, transparent)' }} />
                  {r.deliveryFee === 0 && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="badge badge-green">FREE DELIVERY</span>
                    </div>
                  )}
                  <div className="absolute bottom-2.5 left-3 flex gap-1.5">
                    {r.tags.filter(t => t !== 'Free Delivery').map(tag => (
                      <span key={tag} className="badge badge-white">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Info row */}
                <div className="p-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-black text-white text-base truncate">{r.name}</p>
                    <p className="text-xs truncate mt-0.5" style={{ color: 'var(--z-muted)' }}>{r.cuisine}</p>
                  </div>
                  <div className="shrink-0 text-right ml-3 space-y-1">
                    <StarRating rating={r.rating} />
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--z-muted)' }}>
                      <Clock className="h-3 w-3" />{r.eta}
                    </div>
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

/* ─────────────── BOOK TAB ─────────────── */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl h-[160px]"
        style={{ background: 'linear-gradient(120deg,#10024a,#05012a)' }}>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=300&fit=crop&q=80"
          alt="Services"
          className="absolute inset-0 w-full h-full img-cover opacity-20"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <span className="badge badge-purple mb-3">📅 BOOK IN 60 SECONDS</span>
          <h2 className="text-2xl font-black text-white leading-tight">Trusted Professionals,<br />At Your Doorstep</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>Background-verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>

      {/* Services grid */}
      <div>
        <SectionHeader title="Available Services" action="View all" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((s) => {
            const active = sel === s.id;
            return (
              <div key={s.id}
                onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }}
                className="rounded-2xl p-4 cursor-pointer transition-all duration-200"
                style={{
                  background: active ? 'rgba(139,92,246,0.1)' : 'var(--z-card)',
                  border: active ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  transform: active ? 'scale(1.02)' : undefined,
                }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{s.emoji}</div>
                  {active && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--z-purple)' }}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="font-black text-white text-sm leading-tight mb-0.5">{s.title}</p>
                <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{s.category}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-white text-sm">₹{s.price}</span>
                  <div className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: '#f59e0b' }}>
                    <Star className="h-2.5 w-2.5 fill-current" />{s.rating}
                  </div>
                </div>
                <p className="text-[10px] mt-1.5 font-medium" style={{ color: 'var(--z-green)' }}>
                  {s.available} pros · Next: {s.nextSlot}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time slot picker */}
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="rounded-2xl p-5 z-card">
              <p className="font-black text-white text-base mb-1">Choose a Time — Today</p>
              <p className="text-xs mb-5" style={{ color: 'var(--z-muted)' }}>
                {services.find(x => x.id === sel)?.title} · ₹{services.find(x => x.id === sel)?.price}
              </p>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {SLOTS.map(s => (
                  <button key={s} onClick={() => setSlot(s)}
                    className="py-3 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: slot === s ? 'var(--z-purple)' : 'rgba(255,255,255,0.05)',
                      color: slot === s ? 'white' : 'var(--z-muted)',
                      border: slot === s ? 'none' : '1px solid rgba(255,255,255,0.07)',
                      transform: slot === s ? 'scale(1.06)' : undefined,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => slot && setBooked(true)}
                disabled={!slot}
                className="w-full py-3.5 rounded-xl font-black text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: booked ? 'rgba(0,217,126,0.2)' : slot ? '#8B5CF6' : 'rgba(139,92,246,0.15)',
                  color: booked ? 'var(--z-green)' : slot ? 'white' : 'rgba(139,92,246,0.5)',
                  boxShadow: slot && !booked ? '0 8px 28px rgba(139,92,246,0.28)' : undefined,
                }}>
                {booked ? '✓ Booking Confirmed! See you soon.' : 'Confirm Booking →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── MAP TAB ─────────────── */
function MapTab() {
  const TYPE: Record<string, { emoji: string; color: string }> = {
    kirana:      { emoji: '🏪', color: 'var(--z-green)'  },
    medical:     { emoji: '💊', color: 'var(--z-blue)'   },
    restaurant:  { emoji: '🍲', color: 'var(--z-orange)' },
    electronics: { emoji: '💡', color: '#f59e0b'         },
    garage:      { emoji: '🔧', color: '#6366f1'         },
    salon:       { emoji: '✂️', color: '#ec4899'         },
  };
  return (
    <div className="space-y-5">
      {/* Map placeholder */}
      <div className="relative rounded-2xl overflow-hidden h-[220px] cursor-pointer"
        style={{ background: 'var(--z-card)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop&q=80"
          alt="Map view of Jammu"
          className="w-full h-full img-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2), rgba(9,9,14,0.8))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="text-4xl mb-3">📍</div>
          <p className="font-black text-white text-xl mb-0.5">Jammu, J&K</p>
          <p className="text-sm font-medium" style={{ color: 'var(--z-muted)' }}>8 verified stores within 1 km</p>
          <button className="mt-4 btn-primary rounded-xl px-5 py-2.5 text-sm">
            Open Full Map →
          </button>
        </div>
        <div className="absolute top-4 right-4 flex gap-1.5">
          {['var(--z-green)', 'var(--z-orange)', 'var(--z-blue)', '#ec4899'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full animate-ping-slow" style={{ background: c, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((s: any) => {
          const t = TYPE[s.type] || TYPE.kirana;
          return (
            <div key={s.id} className="rounded-2xl p-4 flex items-center gap-3.5 z-card cursor-pointer lift">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${t.color}12`, border: `1px solid ${t.color}20` }}>
                {t.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{s.name}</p>
                <div className="flex items-center gap-2 text-[10px] mt-0.5 font-medium" style={{ color: 'var(--z-muted)' }}>
                  <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{s.distance}</span>
                  <span>·</span>
                  <span>{s.openHours}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <StarRating rating={s.rating} />
                <span className={`badge mt-1 ${s.open ? 'badge-green' : 'badge-red'}`}>
                  {s.open ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── OFFERS TAB ─────────────── */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2500);
  };

  const TYPE_STYLE: Record<string, { color: string; badgeClass: string; glow: string }> = {
    discount: { color: 'var(--z-green)',  badgeClass: 'badge-green',  glow: 'rgba(0,217,126,0.12)' },
    delivery: { color: 'var(--z-orange)', badgeClass: 'badge-orange', glow: 'rgba(255,122,0,0.12)'  },
    referral: { color: 'var(--z-blue)',   badgeClass: 'badge-blue',   glow: 'rgba(78,127,255,0.12)' },
  };

  return (
    <div className="space-y-6">
      {/* Mega banner */}
      <div className="relative overflow-hidden rounded-2xl h-[180px]"
        style={{ background: 'linear-gradient(120deg,#001a0a,#00100a)' }}>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop&q=80"
          alt="Offers"
          className="absolute inset-0 w-full h-full img-cover opacity-15"
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <span className="badge badge-green mb-3">🔥 LIMITED TIME</span>
          <h2 className="text-3xl font-black text-white leading-tight mb-1">
            Flat <span className="text-grad-green">50% Off</span> — First Order
          </h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Min order ₹199 · Max ₹100 off · New users only
          </p>
          <div className="flex items-center gap-3">
            <span className="font-black text-sm px-4 py-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--z-green)', border: '2px dashed rgba(0,217,126,0.4)', letterSpacing: '.07em' }}>
              ZYPHIX50
            </span>
            <button onClick={() => copy('ZYPHIX50')}
              className="flex items-center gap-2 btn-primary rounded-xl px-4 py-2 text-sm">
              {copied === 'ZYPHIX50' ? <><Check className="h-4 w-4" />Copied!</> : <><Copy className="h-4 w-4" />Copy Code</>}
            </button>
          </div>
        </div>
      </div>

      {/* Coupons grid */}
      <div>
        <SectionHeader title="All Active Coupons" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promoCodes.map(offer => {
            const style = TYPE_STYLE[offer.type] || TYPE_STYLE.discount;
            const isCopied = copied === offer.code;
            return (
              <div key={offer.code} onClick={() => copy(offer.code)}
                className="rounded-2xl p-5 cursor-pointer z-card transition-all duration-200 relative overflow-hidden"
                style={{ border: isCopied ? `1px solid ${style.color}35` : undefined }}>
                {isCopied && <div className="absolute inset-0 rounded-2xl" style={{ background: style.glow }} />}
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-black text-base tracking-widest" style={{ color: style.color }}>{offer.code}</span>
                      <span className={`badge ${style.badgeClass}`}>{offer.type}</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-0.5">{offer.description}</p>
                    <p className="text-[10px] font-medium" style={{ color: 'var(--z-muted)' }}>Valid till 31 Dec 2025</p>
                  </div>
                  <button
                    className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                    style={{
                      background: isCopied ? `${style.color}20` : 'rgba(255,255,255,0.06)',
                      color: isCopied ? style.color : 'var(--z-muted)',
                      border: isCopied ? `1px solid ${style.color}30` : '1px solid rgba(255,255,255,0.07)',
                    }}>
                    {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {isCopied ? 'Done' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refer & earn */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(120deg,#050c24,#080520)', border: '1px solid rgba(78,127,255,0.2)' }}>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=200&fit=crop&q=80"
          alt="Refer"
          className="absolute inset-0 w-full h-full img-cover opacity-10"
        />
        <div className="relative flex flex-col sm:flex-row items-center gap-5 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: 'rgba(78,127,255,0.12)', border: '1px solid rgba(78,127,255,0.2)' }}>🎁</div>
            <div>
              <p className="font-black text-white text-base">Refer & Earn ₹100</p>
              <p className="text-sm" style={{ color: 'var(--z-muted)' }}>You & your friend both get ₹100 wallet credits</p>
            </div>
          </div>
          <button className="btn-primary rounded-xl px-6 py-3 text-sm shrink-0">
            Share Now →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN HOME COMPONENT
═══════════════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');

  const TAB_CONTENT: Record<TabId, React.ReactNode> = {
    now:    <NowTab />,
    eats:   <EatsTab />,
    book:   <BookTab />,
    map:    <MapTab />,
    offers: <OffersTab />,
  };

  const TAB_ACTIVE_STYLE: Record<TabId, { background: string; color: string; shadow: string }> = {
    now:    { background: 'var(--z-green)',  color: '#030a05',  shadow: 'rgba(0,217,126,0.3)'  },
    eats:   { background: 'var(--z-orange)', color: '#1a0400',  shadow: 'rgba(255,122,0,0.3)'  },
    book:   { background: 'var(--z-purple)', color: '#ffffff',  shadow: 'rgba(139,92,246,0.3)' },
    map:    { background: 'var(--z-blue)',   color: '#ffffff',  shadow: 'rgba(78,127,255,0.3)' },
    offers: { background: '#ec4899',         color: '#ffffff',  shadow: 'rgba(236,72,153,0.3)' },
  };

  return (
    <div style={{ background: 'var(--z-bg)', minHeight: '100vh' }}>

      {/* ════ HERO SECTION ════ */}
      <div className="relative overflow-hidden" style={{ background: 'var(--z-surf)' }}>
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=600&fit=crop&q=80"
            alt="Jammu kirana stores"
            className="w-full h-full img-cover opacity-[0.06]"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,217,126,0.04) 0%, transparent 50%, rgba(78,127,255,0.04) 100%)' }} />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-8">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Left: headline */}
            <motion.div className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5"
                style={{ background: 'rgba(0,217,126,0.1)', color: 'var(--z-green)', border: '1px solid rgba(0,217,126,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-ping-slow" style={{ background: 'var(--z-green)' }} />
                Now live in Jammu, J&K — Delivery in 30 min
              </div>

              <h1 className="font-black leading-[1.06] tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                <span className="shimmer-brand">India's first</span>
                <br />
                <span className="text-white">SuperLocal app</span>
              </h1>

              <p className="text-base mb-7 max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--z-muted)', lineHeight: 1.65 }}>
                Groceries from your nearest kirana in <b className="text-white">30 minutes</b> · Food from local dhabas · Book any service — all built for <b className="text-white">Tier-2 India</b>.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <button className="btn-primary rounded-xl px-6 py-3.5 text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Order in 30 Min
                </button>
                <button className="btn-ghost rounded-xl px-6 py-3.5 text-sm">
                  How it works →
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                {[
                  { label: '50,000+', sub: 'Happy Customers' },
                  { label: '1,200+',  sub: 'Kirana Partners' },
                  { label: '30 min',  sub: 'Avg Delivery' },
                  { label: '4.8 ★',  sub: 'App Rating' },
                ].map(({ label, sub }, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <p className="font-black text-white text-xl leading-none">{label}</p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--z-muted)' }}>{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: live order card */}
            <motion.div className="shrink-0 w-full max-w-[300px] hidden lg:block animate-float"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--z-card)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Header */}
                <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,217,126,0.15)' }}>
                    <Zap className="h-4 w-4" style={{ color: 'var(--z-green)' }} />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm">Live Order Tracking</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-ping-slow" style={{ background: 'var(--z-green)' }} />
                      <p className="text-[10px] font-semibold" style={{ color: 'var(--z-green)' }}>On the way · 12 min left</p>
                    </div>
                  </div>
                </div>
                {/* Products */}
                <div className="p-3 space-y-2">
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full img-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px]" style={{ color: 'var(--z-muted)' }}>{p.storeName}</p>
                      </div>
                      <p className="font-black text-white text-xs shrink-0">₹{p.price}</p>
                    </div>
                  ))}
                </div>
                {/* Progress */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-[10px] font-medium mb-1.5"
                    style={{ color: 'var(--z-muted)' }}>
                    <span>Sharma General Store</span>
                    <span style={{ color: 'var(--z-green)' }}>Track →</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: 'var(--z-green)' }}
                      initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1.2, delay: 0.8 }} />
                  </div>
                </div>
              </div>

              {/* Trust badge */}
              <div className="mt-3 rounded-2xl p-3.5 flex items-center gap-3"
                style={{ background: 'rgba(22,24,31,0.7)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
                <Shield className="h-5 w-5 shrink-0" style={{ color: 'var(--z-green)' }} />
                <div>
                  <p className="text-white text-xs font-bold">100% Secure & Verified</p>
                  <p className="text-[10px]" style={{ color: 'var(--z-muted)' }}>All stores inspected by ZYPHIX team</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ════ SERVICE TABS (sticky) ════ */}
      <div className="sticky z-40" style={{ top: 64 }}>
        <div style={{ background: 'rgba(9,9,14,0.96)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 py-2.5">
              {TABS.map(t => {
                const active = activeTab === t.id;
                const s = TAB_ACTIVE_STYLE[t.id];
                return (
                  <button key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold shrink-0 transition-all duration-200"
                    style={{
                      background: active ? s.background : 'transparent',
                      color: active ? s.color : 'var(--z-muted)',
                      boxShadow: active ? `0 4px 18px ${s.shadow}` : 'none',
                      transform: active ? 'scale(1.03)' : undefined,
                    }}>
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ════ TAB CONTENT ════ */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}>
            {TAB_CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
