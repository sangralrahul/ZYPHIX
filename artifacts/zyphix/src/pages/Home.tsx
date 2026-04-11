import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Plus, Minus, ShoppingCart, ArrowRight, Check, Copy,
  MapPin, Truck, Shield, Zap, ChevronRight, ChevronLeft, Package,
  Smartphone, Users, TrendingUp
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

/* ═══ TABS ═══ */
const TABS: { id: TabId; label: string; icon: string; color: string; text: string }[] = [
  { id: 'now',    label: 'ZyphixNow',      icon: '⚡', color: 'var(--z-green)',  text: '#021a0e' },
  { id: 'eats',   label: 'ZyphixEats',     icon: '🍱', color: 'var(--z-orange)', text: '#1a0500' },
  { id: 'book',   label: 'ZyphixBook',     icon: '📅', color: 'var(--z-purple)', text: '#ffffff' },
  { id: 'map',    label: 'Kirana Near Me', icon: '🗺️', color: 'var(--z-blue)',   text: '#ffffff' },
  { id: 'offers', label: 'Offers',         icon: '🏷️', color: '#ec4899',         text: '#ffffff' },
];

/* ═══ COUNTDOWN HOOK ═══ */
function useCountdown() {
  const [secs, setSecs] = useState(3 * 3600 + 24 * 60 + 17);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, '0');
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return { h, m, s };
}

/* ═══ CAROUSEL WRAPPER ═══ */
function Carousel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'l' | 'r') => {
    if (ref.current) ref.current.scrollBy({ left: dir === 'r' ? 320 : -320, behavior: 'smooth' });
  };
  return (
    <div className="relative group/carousel">
      <button onClick={() => scroll('l')}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100"
        style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)', boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      <div ref={ref} className={`carousel ${className}`}>{children}</div>
      <button onClick={() => scroll('r')}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100"
        style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)', boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
        <ChevronRight className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

/* ═══ SECTION HEADER ═══ */
function SH({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title">{title}</h2>
      {action && (
        <button className="text-xs font-semibold flex items-center gap-0.5 hover:gap-1.5 transition-all" style={{ color: 'var(--z-green)' }}>
          {action} <ChevronRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* ═══ STAR RATING ═══ */
function Stars({ r }: { r: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-bold" style={{ color: '#f59e0b' }}>
      <Star className="h-3 w-3 fill-current" />{r}
    </span>
  );
}

/* ═══════════════════════════════════
   NOW TAB — ZyphixNow (Grocery)
═══════════════════════════════════ */
const DEALS = products.filter(p => p.origPrice).slice(0, 8);

function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const { h, m, s } = useCountdown();

  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Personal Care', 'Bakery', 'Spices', 'Medicine'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  const AddBtn = ({ id }: { id: string }) => cart[id] ? (
    <div className="flex items-center rounded-xl overflow-hidden shrink-0" style={{ background: 'var(--z-green)' }}>
      <button onClick={(e) => { e.stopPropagation(); rem(id); }} className="w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors">
        <Minus style={{ height: 13, width: 13, color: '#021a0e' }} />
      </button>
      <span className="text-xs font-black min-w-[14px] text-center" style={{ color: '#021a0e' }}>{cart[id]}</span>
      <button onClick={(e) => { e.stopPropagation(); add(id); }} className="w-8 h-8 flex items-center justify-center hover:bg-black/10 transition-colors">
        <Plus style={{ height: 13, width: 13, color: '#021a0e' }} />
      </button>
    </div>
  ) : (
    <button onClick={(e) => { e.stopPropagation(); add(id); }}
      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 shrink-0"
      style={{ background: 'rgba(0,204,116,.1)', border: '1.5px solid rgba(0,204,116,.35)' }}>
      <Plus style={{ height: 14, width: 14, color: 'var(--z-green)' }} />
    </button>
  );

  return (
    <div className="space-y-8">

      {/* ── Promo Banners ── */}
      <Carousel>
        {[
          {
            tag: '⚡ 30 MIN DELIVERY',  tagClass: 'badge-green',
            title: '50% OFF\nFirst Order', sub: 'Use code ZYPHIX50 · Max ₹100',
            code: 'ZYPHIX50',
            bg: 'linear-gradient(120deg,#022b18,#011a0e)',
            img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=600&h=300&fit=crop&q=80',
            accent: 'var(--z-green)',
          },
          {
            tag: '🏪 1,200+ STORES',  tagClass: 'badge-orange',
            title: 'Real Kirana,\nReal Fast', sub: 'Local inventory · Zero surge pricing',
            code: '',
            bg: 'linear-gradient(120deg,#1a0800,#0d0400)',
            img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=300&fit=crop&q=80',
            accent: 'var(--z-orange)',
          },
          {
            tag: '🆓 FREE DELIVERY',  tagClass: 'badge-blue',
            title: 'Medicines\nin 30 Min', sub: 'All City Medical & Pharmacy orders',
            code: '',
            bg: 'linear-gradient(120deg,#001530,#000a1a)',
            img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=300&fit=crop&q=80',
            accent: 'var(--z-blue)',
          },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0 rounded-2xl overflow-hidden relative cursor-pointer lift"
            style={{ width: 'min(520px, 82vw)', height: 170, background: b.bg, border: `1px solid rgba(255,255,255,0.06)` }}>
            <img src={b.img} alt="" className="absolute inset-0 w-full h-full img-cover opacity-[0.18]" />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <span className={`badge ${b.tagClass} self-start`}>{b.tag}</span>
              <div>
                <p className="font-black text-white text-[1.5rem] leading-[1.18] whitespace-pre-line mb-1">{b.title}</p>
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.48)' }}>{b.sub}</p>
                {b.code && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black"
                    style={{ background: 'rgba(0,0,0,0.4)', color: b.accent, border: `1.5px dashed ${b.accent}55`, letterSpacing: '.06em' }}>
                    {b.code}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* ── Category Circles ── */}
      <div>
        <SH title="Shop by Category" action="All categories" />
        <Carousel>
          {categories.map((cat, i) => (
            <button key={cat.id}
              onClick={() => setActiveCat(activeCat === cat.name ? 'All' : cat.name)}
              className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden transition-all duration-200 relative"
                style={{
                  border: activeCat === cat.name ? `2.5px solid ${cat.color}` : '2.5px solid transparent',
                  boxShadow: activeCat === cat.name ? `0 0 0 4px ${cat.color}18` : 'none',
                }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-semibold text-center w-20 leading-tight"
                style={{ color: activeCat === cat.name ? 'white' : 'var(--z-muted)' }}>
                {cat.name}
              </span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* ── Flash Deals ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#1a0800,#0f0500)', border: '1px solid rgba(255,107,0,0.2)' }}>
        <div className="px-5 py-4 flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg">⚡</span>
              <h3 className="font-black text-white text-base">Flash Deals</h3>
            </div>
            <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>Best prices · Limited time</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <p className="text-xs font-bold" style={{ color: 'var(--z-orange)' }}>Ends in</p>
            {[h, m, s].map((v, i) => (
              <React.Fragment key={i}>
                <div className="countdown-digit">
                  <span className="font-black text-white text-base leading-none">{v}</span>
                  <span className="text-[8px] font-bold" style={{ color: 'var(--z-muted)' }}>{['HRS','MIN','SEC'][i]}</span>
                </div>
                {i < 2 && <span className="font-black text-white text-sm" style={{ color: 'var(--z-orange)' }}>:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <Carousel>
            {DEALS.map((p) => (
              <div key={p.id} className="snap-start prod-card cursor-pointer group" style={{ width: 150 }}>
                <div className="relative h-[110px] overflow-hidden" style={{ background: 'var(--z-card2)' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2">
                    <span className="badge badge-red" style={{ fontSize: 9 }}>
                      -{Math.round((1 - p.price / (p.origPrice ?? p.price)) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] font-semibold mb-0.5 truncate" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                  <p className="font-bold text-white text-xs leading-tight line-clamp-2 mb-1.5">{p.name}</p>
                  <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                  <div className="flex items-center justify-between gap-1">
                    <div>
                      <span className="font-black text-white text-sm">₹{p.price}</span>
                      {p.origPrice && <span className="text-[10px] line-through ml-1" style={{ color: 'var(--z-muted)' }}>₹{p.origPrice}</span>}
                    </div>
                    <AddBtn id={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* ── Popular Brands ── */}
      <div>
        <SH title="Top Brands" action="View all" />
        <Carousel>
          {[
            { name: 'Amul',      img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop&q=80', color: '#003087' },
            { name: 'Parle',     img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=120&fit=crop&q=80', color: '#c62828' },
            { name: 'Nestle',    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&h=120&fit=crop&q=80', color: '#1a1a2e' },
            { name: 'MDH',       img: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=120&h=120&fit=crop&q=80', color: '#7b1fa2' },
            { name: 'ITC',       img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop&q=80', color: '#1b5e20' },
            { name: 'Dabur',     img: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=120&h=120&fit=crop&q=80', color: '#e65100' },
            { name: 'Colgate',   img: 'https://images.unsplash.com/photo-1559591935-c7c7cb7de30c?w=120&h=120&fit=crop&q=80', color: '#b71c1c' },
            { name: "Lay's",     img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&h=120&fit=crop&q=80', color: '#f9a825' },
          ].map((b, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div className="w-[68px] h-[68px] rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-105"
                style={{ background: b.color, border: '1px solid rgba(255,255,255,0.08)' }}>
                <img src={b.img} alt={b.name} className="w-full h-full img-cover" />
              </div>
              <span className="text-[11px] font-semibold" style={{ color: 'var(--z-muted)' }}>{b.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* ── Trending Carousel ── */}
      <div>
        <SH title="Trending Near You" action="See all" />
        <Carousel>
          {products.map((p) => (
            <div key={p.id} className="snap-start prod-card cursor-pointer group">
              <div className="relative h-[130px] overflow-hidden" style={{ background: 'var(--z-card2)' }}>
                <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                {p.tag && (
                  <div className="absolute top-2 left-2">
                    <span className={`badge ${p.tag === 'Fresh' ? 'badge-green' : p.tag === 'Bestseller' ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: 9 }}>
                      {p.tag}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] font-semibold mb-0.5 truncate" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                <p className="font-bold text-white text-xs leading-tight line-clamp-2 mb-1">{p.name}</p>
                <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                <div className="flex items-center justify-between gap-1">
                  <div>
                    <span className="font-black text-white text-sm">₹{p.price}</span>
                    {p.origPrice && <span className="text-[10px] line-through ml-1" style={{ color: 'var(--z-muted)' }}>₹{p.origPrice}</span>}
                  </div>
                  <AddBtn id={p.id} />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* ── All Products Grid ── */}
      <div>
        <SH title="All Products" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} className={`pill shrink-0 ${activeCat === c ? 'pill-on' : 'pill-off'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }} transition={{ delay: i * 0.03 }}>
                <div className="rounded-2xl overflow-hidden z-card group cursor-pointer flex flex-col h-full">
                  <div className="relative h-[120px] sm:h-[130px] overflow-hidden" style={{ background: 'var(--z-card2)' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                    {p.tag && (
                      <div className="absolute top-2 left-2">
                        <span className={`badge ${p.tag === 'Fresh' ? 'badge-green' : p.tag === 'Bestseller' ? 'badge-amber' : 'badge-red'}`} style={{ fontSize: 9 }}>
                          {p.tag}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                    <p className="font-bold text-white text-xs leading-tight line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                    <div className="flex items-center justify-between mt-auto gap-1">
                      <div>
                        <span className="font-black text-white text-sm">₹{p.price}</span>
                        {p.origPrice && <span className="text-[10px] line-through ml-1" style={{ color: 'var(--z-muted)' }}>₹{p.origPrice}</span>}
                      </div>
                      <AddBtn id={p.id} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating cart */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[420px] z-50 cursor-pointer">
            <div className="rounded-2xl px-5 py-4 flex items-center justify-between"
              style={{ background: 'var(--z-green)', boxShadow: '0 16px 48px rgba(0,204,116,.45)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
                  style={{ background: 'rgba(0,0,0,0.2)', color: '#021a0e' }}>
                  {totalItems}
                </div>
                <span className="font-bold text-sm" style={{ color: '#021a0e' }}>
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black" style={{ color: '#021a0e' }}>₹{totalPrice}</span>
                <ArrowRight style={{ height: 18, width: 18, color: '#021a0e' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════
   EATS TAB
═══════════════════════════════════ */
function EatsTab() {
  return (
    <div className="space-y-8">

      {/* Cravings */}
      <div>
        <SH title="What's your craving?" />
        <Carousel>
          {foodCategories.map((fc, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div className="w-[68px] h-[68px] rounded-full overflow-hidden">
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-semibold text-center w-20 leading-tight" style={{ color: 'var(--z-muted)' }}>{fc.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Featured restaurant */}
      <div className="relative overflow-hidden rounded-2xl cursor-pointer lift" style={{ height: 200 }}>
        <img src={restaurants[0].image} alt={restaurants[0].name} className="absolute inset-0 w-full h-full img-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 55%, rgba(0,0,0,0.1))' }} />
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <span className="badge badge-amber self-start">⭐ #1 RATED IN JAMMU</span>
          <div>
            <h3 className="text-2xl font-black text-white mb-1">{restaurants[0].name}</h3>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,.5)' }}>{restaurants[0].cuisine}</p>
            <div className="flex items-center gap-3">
              <Stars r={restaurants[0].rating} />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,.4)' }}>·</span>
              <span className="text-xs font-medium flex items-center gap-1" style={{ color: 'rgba(255,255,255,.55)' }}>
                <Clock style={{ height: 11, width: 11 }} />{restaurants[0].eta}
              </span>
              <button className="btn-orange rounded-xl px-4 py-2 text-xs ml-2">Order Now →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant grid */}
      <div>
        <SH title="Restaurants Near You" action="See all" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <div className="rounded-2xl overflow-hidden z-card cursor-pointer group">
                <div className="relative h-40 overflow-hidden" style={{ background: 'var(--z-card2)' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 25%, transparent)' }} />
                  {r.deliveryFee === 0 && (
                    <div className="absolute top-2.5 right-2.5"><span className="badge badge-green">FREE DELIVERY</span></div>
                  )}
                  <div className="absolute bottom-2.5 left-3 flex gap-1.5">
                    {r.tags.filter(t => t !== 'Free Delivery').map(tag => (
                      <span key={tag} className="badge badge-white">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="font-black text-white text-base truncate">{r.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--z-muted)' }}>{r.cuisine}</p>
                  </div>
                  <div className="shrink-0 text-right ml-3 space-y-1.5">
                    <Stars r={r.rating} />
                    <p className="text-[10px] flex items-center gap-1 justify-end" style={{ color: 'var(--z-muted)' }}>
                      <Clock style={{ height: 10, width: 10 }} />{r.eta}
                    </p>
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

/* ═══════════════════════════════════
   BOOK TAB
═══════════════════════════════════ */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl" style={{ height: 160, background: 'linear-gradient(120deg,#0a0120,#040012)' }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=300&fit=crop&q=80"
          alt="Services" className="absolute inset-0 w-full h-full img-cover opacity-[0.18]" />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <span className="badge badge-purple mb-3 self-start">📅 BOOK IN 60 SECONDS</span>
          <h2 className="text-2xl font-black text-white leading-tight">Trusted Professionals,<br />At Your Doorstep</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Background-verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>
      <div>
        <SH title="Available Services" action="View all" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((s) => {
            const active = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }}
                className="rounded-2xl p-4 cursor-pointer transition-all duration-200"
                style={{
                  background: active ? 'rgba(124,92,246,.1)' : 'var(--z-card)',
                  border: active ? '1px solid rgba(124,92,246,.4)' : '1px solid var(--z-border)',
                  transform: active ? 'scale(1.02)' : undefined,
                }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{s.emoji}</div>
                  {active && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--z-purple)' }}><Check style={{ height: 11, width: 11, color: 'white' }} /></div>}
                </div>
                <p className="font-black text-white text-sm leading-tight mb-0.5">{s.title}</p>
                <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{s.category}</p>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-white text-sm">₹{s.price}</span>
                  <Stars r={s.rating} />
                </div>
                <p className="text-[10px] font-medium" style={{ color: 'var(--z-green)' }}>{s.available} pros · {s.nextSlot}</p>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="rounded-2xl p-5 z-card">
              <p className="font-black text-white text-base mb-0.5">Choose a Time Slot — Today</p>
              <p className="text-xs mb-5" style={{ color: 'var(--z-muted)' }}>{services.find(x => x.id === sel)?.title} · ₹{services.find(x => x.id === sel)?.price}</p>
              <div className="grid grid-cols-4 gap-2 mb-5">
                {SLOTS.map(sl => (
                  <button key={sl} onClick={() => setSlot(sl)}
                    className="py-3 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: slot === sl ? 'var(--z-purple)' : 'rgba(255,255,255,0.05)',
                      color: slot === sl ? 'white' : 'var(--z-muted)',
                      border: slot === sl ? 'none' : '1px solid rgba(255,255,255,0.07)',
                      transform: slot === sl ? 'scale(1.06)' : undefined,
                    }}>
                    {sl}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setBooked(true)} disabled={!slot}
                className="w-full py-3.5 rounded-xl font-black text-sm transition-all disabled:opacity-30"
                style={{
                  background: booked ? 'rgba(0,204,116,0.15)' : slot ? 'var(--z-purple)' : 'rgba(124,92,246,0.15)',
                  color: booked ? 'var(--z-green)' : 'white',
                  boxShadow: slot && !booked ? '0 8px 28px rgba(124,92,246,.28)' : 'none',
                }}>
                {booked ? '✓ Confirmed! See you soon.' : 'Confirm Booking →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════
   MAP TAB
═══════════════════════════════════ */
function MapTab() {
  const T: Record<string, { e: string; c: string }> = {
    kirana:      { e: '🏪', c: 'var(--z-green)'  },
    medical:     { e: '💊', c: 'var(--z-blue)'   },
    restaurant:  { e: '🍲', c: 'var(--z-orange)' },
    electronics: { e: '💡', c: '#f59e0b'         },
    garage:      { e: '🔧', c: '#6366f1'         },
    salon:       { e: '✂️', c: '#ec4899'         },
  };
  return (
    <div className="space-y-5">
      <div className="relative rounded-2xl overflow-hidden" style={{ height: 220, background: 'var(--z-card)', border: '1px solid var(--z-border)' }}>
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=400&fit=crop&q=80"
          alt="Map" className="w-full h-full img-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15), rgba(8,9,15,.85))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="text-4xl mb-3">📍</div>
          <p className="font-black text-white text-xl mb-0.5">Jammu, J&K</p>
          <p className="text-sm font-medium mb-4" style={{ color: 'var(--z-muted)' }}>8 verified stores within 1 km radius</p>
          <button className="btn-green rounded-xl px-5 py-2.5 text-sm">Open Full Map →</button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {['var(--z-green)', 'var(--z-orange)', 'var(--z-blue)', '#ec4899'].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full animate-ping-soft" style={{ background: c, animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((st: any) => {
          const t = T[st.type] || T.kirana;
          return (
            <div key={st.id} className="rounded-2xl p-4 flex items-center gap-3.5 z-card cursor-pointer lift">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: `${t.c}12`, border: `1px solid ${t.c}20` }}>{t.e}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{st.name}</p>
                <div className="flex items-center gap-2 text-[10px] mt-0.5" style={{ color: 'var(--z-muted)' }}>
                  <span className="flex items-center gap-0.5"><MapPin style={{ height: 10, width: 10 }} />{st.distance}</span>
                  <span>·</span><span>{st.openHours}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <Stars r={st.rating} />
                <span className={`badge mt-1.5 ${st.open ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 9 }}>
                  {st.open ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   OFFERS TAB
═══════════════════════════════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 2500); };
  const TS: Record<string, { color: string; bc: string }> = {
    discount: { color: 'var(--z-green)',  bc: 'badge-green'  },
    delivery: { color: 'var(--z-orange)', bc: 'badge-orange' },
    referral: { color: 'var(--z-blue)',   bc: 'badge-blue'   },
  };
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl" style={{ height: 190, background: 'linear-gradient(120deg,#002818,#001008)' }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop&q=80"
          alt="Offers" className="absolute inset-0 w-full h-full img-cover opacity-[0.15]" />
        <div className="absolute inset-0 p-6 flex flex-col justify-center">
          <span className="badge badge-green mb-3 self-start">🔥 LIMITED TIME</span>
          <h2 className="text-3xl font-black text-white mb-1 leading-tight">Flat <span className="text-grad-brand">50% Off</span><br />Your First Order</h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div className="flex items-center gap-3">
            <span className="font-black text-sm px-4 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.5)', color: 'var(--z-green)', border: '2px dashed rgba(0,204,116,0.45)', letterSpacing: '.07em' }}>ZYPHIX50</span>
            <button onClick={() => copy('ZYPHIX50')} className="flex items-center gap-2 btn-green rounded-xl px-4 py-2 text-sm">
              {copied === 'ZYPHIX50' ? <><Check style={{ height: 14, width: 14 }} />Copied!</> : <><Copy style={{ height: 14, width: 14 }} />Copy Code</>}
            </button>
          </div>
        </div>
      </div>
      <div>
        <SH title="All Active Coupons" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {promoCodes.map(offer => {
            const ts = TS[offer.type] || TS.discount;
            const isCopied = copied === offer.code;
            return (
              <div key={offer.code} onClick={() => copy(offer.code)}
                className="rounded-2xl p-5 cursor-pointer z-card transition-all duration-200 relative overflow-hidden">
                {isCopied && <div className="absolute inset-0 rounded-2xl" style={{ background: `${ts.color}08` }} />}
                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-black text-base tracking-wider" style={{ color: ts.color }}>{offer.code}</span>
                      <span className={`badge ${ts.bc}`}>{offer.type}</span>
                    </div>
                    <p className="text-sm font-medium text-white mb-0.5">{offer.description}</p>
                    <p className="text-[10px] font-medium" style={{ color: 'var(--z-muted)' }}>Valid till 31 Dec 2025</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                    style={{ background: isCopied ? `${ts.color}18` : 'rgba(255,255,255,0.06)', color: isCopied ? ts.color : 'var(--z-muted)', border: isCopied ? `1px solid ${ts.color}30` : '1px solid rgba(255,255,255,0.07)' }}>
                    {isCopied ? <Check style={{ height: 13, width: 13 }} /> : <Copy style={{ height: 13, width: 13 }} />}
                    {isCopied ? 'Done' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(120deg,#040c24,#070516)', border: '1px solid rgba(61,126,255,0.2)' }}>
        <div className="flex flex-col sm:flex-row items-center gap-5 justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: 'rgba(61,126,255,0.12)', border: '1px solid rgba(61,126,255,0.2)' }}>🎁</div>
            <div>
              <p className="font-black text-white text-base">Refer & Earn ₹100</p>
              <p className="text-sm" style={{ color: 'var(--z-muted)' }}>You & your friend both get ₹100 wallet credits</p>
            </div>
          </div>
          <button className="btn-green rounded-xl px-6 py-3 text-sm shrink-0">Share Now →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   HERO SECTION
═══════════════════════════════════ */
function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ background: 'var(--z-surf)' }}>
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(0,204,116,0.08), transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -top-12 right-1/4 w-72 h-72 rounded-full animate-blob"
          style={{ background: 'radial-gradient(circle, rgba(61,126,255,0.06), transparent 70%)', filter: 'blur(50px)', animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left */}
          <motion.div className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [.22,1,.36,1] }}>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6"
              style={{ background: 'rgba(0,204,116,0.1)', color: 'var(--z-green)', border: '1px solid rgba(0,204,116,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-ping-soft" style={{ background: 'var(--z-green)' }} />
              Now live · Jammu, J&K
            </div>

            <h1 className="font-black leading-[1.04] tracking-tight mb-5" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>
              <span className="text-white">Delivery in</span><br />
              <span className="shimmer-brand" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>30 minutes.</span><br />
              <span className="text-white" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Anywhere in Jammu, J&K</span>
            </h1>

            <p className="text-base mb-8 max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--z-muted)', lineHeight: 1.7 }}>
              Groceries from your nearest kirana · Food from local dhabas · Book any service. The first SuperLocal app built for Tier-2 India.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <button className="btn-green rounded-xl px-7 py-3.5 text-sm flex items-center gap-2">
                <Zap style={{ height: 16, width: 16 }} /> Order Now — Free Delivery
              </button>
              <button className="btn-ghost rounded-xl px-7 py-3.5 text-sm">
                How it works →
              </button>
            </div>

            {/* App download */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)' }}>
                <div className="text-xl">🍎</div>
                <div className="text-left">
                  <p className="text-[9px] font-semibold" style={{ color: 'var(--z-muted)' }}>Download on the</p>
                  <p className="font-black text-white text-sm leading-none">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all hover:opacity-90"
                style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)' }}>
                <div className="text-xl">🤖</div>
                <div className="text-left">
                  <p className="text-[9px] font-semibold" style={{ color: 'var(--z-muted)' }}>Get it on</p>
                  <p className="font-black text-white text-sm leading-none">Google Play</p>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { v: '50,000+', l: 'Happy Customers' },
                { v: '1,200+',  l: 'Kirana Partners' },
                { v: '30 min',  l: 'Avg Delivery'    },
                { v: '4.8 ★',   l: 'App Rating'      },
              ].map(({ v, l }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <p className="font-black text-white text-xl leading-none">{v}</p>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--z-muted)' }}>{l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup cards */}
          <motion.div className="shrink-0 hidden lg:block"
            initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="relative w-[300px]">
              {/* Main card */}
              <div className="rounded-3xl overflow-hidden animate-float"
                style={{ background: 'var(--z-card)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 32px 80px rgba(0,0,0,.6)' }}>
                {/* Header */}
                <div className="px-4 py-3.5 flex items-center gap-2.5" style={{ background: 'var(--z-card2)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,204,116,0.15)' }}>
                    <Zap style={{ height: 15, width: 15, color: 'var(--z-green)' }} />
                  </div>
                  <div>
                    <p className="font-black text-white text-sm leading-none">Order in Transit</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-ping-soft" style={{ background: 'var(--z-green)' }} />
                      <p className="text-[10px] font-semibold" style={{ color: 'var(--z-green)' }}>12 min away · Jammu</p>
                    </div>
                  </div>
                </div>
                {/* Product rows */}
                <div className="p-3 space-y-1.5">
                  {products.slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center gap-2.5 p-2 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full img-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[10px] font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                      </div>
                      <p className="font-black text-white text-xs shrink-0">₹{p.price}</p>
                    </div>
                  ))}
                </div>
                {/* Progress */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between text-[10px] font-medium mb-1.5" style={{ color: 'var(--z-muted)' }}>
                    <span>Sharma General Store</span>
                    <span style={{ color: 'var(--z-green)' }}>Track Order →</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: 'var(--z-green)' }}
                      initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1.4, delay: 1, ease: 'easeOut' }} />
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-8 rounded-2xl px-4 py-3 flex items-center gap-2.5 animate-float"
                style={{ background: 'var(--z-card2)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 12px 40px rgba(0,0,0,.5)', animationDelay: '1.5s' }}>
                <Shield style={{ height: 18, width: 18, color: 'var(--z-green)', flexShrink: 0 }} />
                <div>
                  <p className="text-white text-xs font-bold">100% Verified Stores</p>
                  <p className="text-[9px]" style={{ color: 'var(--z-muted)' }}>Inspected by ZYPHIX team</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   TRUST STRIP
═══════════════════════════════════ */
function TrustStrip() {
  const items = [
    { icon: Zap,     label: '30 Min Delivery',    sub: 'Guaranteed',             c: 'var(--z-green)'  },
    { icon: Package, label: '1,200+ Kirana Stores',sub: 'Verified partners',     c: 'var(--z-amber)'  },
    { icon: Shield,  label: '100% Secure',         sub: 'All stores inspected',  c: 'var(--z-blue)'   },
    { icon: Users,   label: '50,000+ Customers',   sub: 'In Jammu alone',        c: 'var(--z-purple)' },
  ];
  return (
    <div style={{ background: 'var(--z-surf)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(({ icon: Icon, label, sub, c }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c}15` }}>
                <Icon style={{ height: 17, width: 17, color: c }} />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-none">{label}</p>
                <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--z-muted)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   FOOTER
═══════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--z-surf)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--z-green), var(--z-blue))' }}>
                <Zap style={{ height: 14, width: 14, color: 'white', fill: 'white' }} />
              </div>
              <span className="font-black text-lg tracking-tight text-grad-brand" style={{ fontFamily: "'Outfit', sans-serif" }}>ZYPHIX</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--z-muted)' }}>
              India's SuperLocal App — built for Jammu & Kashmir. Fast, trusted, local.
            </p>
          </div>
          {[
            { title: 'Services', links: ['ZyphixNow', 'ZyphixEats', 'ZyphixBook', 'Kirana Near Me'] },
            { title: 'Company',  links: ['About Us', 'Careers', 'Press', 'Blog'] },
            { title: 'Support',  links: ['Help Center', 'Contact Us', 'Refund Policy', 'Privacy Policy'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="font-bold text-white text-sm mb-3">{title}</p>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}><a href="#" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--z-muted)' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--z-muted)' }}>© 2025 ZYPHIX Technologies Pvt. Ltd. · Jammu, J&K</p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'LinkedIn', 'WhatsApp'].map(s => (
              <a key={s} href="#" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--z-muted)' }}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════
   MAIN HOME
═══════════════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');

  const CONTENT: Record<TabId, React.ReactNode> = {
    now:    <NowTab />,
    eats:   <EatsTab />,
    book:   <BookTab />,
    map:    <MapTab />,
    offers: <OffersTab />,
  };

  return (
    <div style={{ background: 'var(--z-bg)', minHeight: '100vh' }}>
      <Hero />
      <TrustStrip />

      {/* ── Sticky tabs ── */}
      <div className="sticky z-40" style={{ top: 64 }}>
        <div className="glass" style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 py-2.5">
              {TABS.map(t => {
                const active = activeTab === t.id;
                return (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold shrink-0 transition-all duration-200"
                    style={{
                      background: active ? t.color : 'transparent',
                      color: active ? t.text : 'var(--z-muted)',
                      boxShadow: active ? `0 4px 18px ${t.color}40` : 'none',
                      transform: active ? 'scale(1.04)' : undefined,
                    }}>
                    <span className="text-base">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [.22,1,.36,1] }}>
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
