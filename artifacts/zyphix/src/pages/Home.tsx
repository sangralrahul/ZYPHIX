import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Plus, Minus, ArrowRight, Check, Copy,
  MapPin, Truck, Shield, Zap, ChevronRight, ChevronLeft,
  Package, Users, Search, ChevronDown, TrendingUp, Sparkles
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const TABS: { id: TabId; label: string; icon: string; accent: string; textColor: string }[] = [
  { id: 'now',    label: 'ZyphixNow',      icon: '⚡', accent: '#00E676', textColor: '#021a0e' },
  { id: 'eats',   label: 'ZyphixEats',     icon: '🍱', accent: '#FF6B00', textColor: 'white'   },
  { id: 'book',   label: 'ZyphixBook',     icon: '📅', accent: '#8B6FFF', textColor: 'white'   },
  { id: 'map',    label: 'Kirana Near Me', icon: '🗺️', accent: '#4488FF', textColor: 'white'   },
  { id: 'offers', label: 'Offers',         icon: '🏷️', accent: '#FF4D8B', textColor: 'white'   },
];

function useCountdown(init: number) {
  const [s, setS] = useState(init);
  useEffect(() => { const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const p = (n: number) => String(n).padStart(2, '0');
  return { h: p(Math.floor(s / 3600)), m: p(Math.floor((s % 3600) / 60)), s: p(s % 60) };
}

function Carousel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const sc = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div className="relative group/c">
      <button onClick={() => sc(-1)} className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all" style={{ background: '#1A1E2E', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 24px rgba(0,0,0,.7)' }}>
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      <div ref={ref} className={`carousel ${className}`}>{children}</div>
      <button onClick={() => sc(1)} className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all" style={{ background: '#1A1E2E', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 24px rgba(0,0,0,.7)' }}>
        <ChevronRight className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

function SH({ title, sub, action, accent = '#00E676' }: { title: string; sub?: string; action?: string; accent?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', letterSpacing: '-.03em' }}>{title}</h2>
        {sub && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{sub}</p>}
      </div>
      {action && (
        <button style={{ fontSize: 11, fontWeight: 700, color: accent, background: `${accent}12`, border: `1px solid ${accent}22`, padding: '5px 12px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 3 }}>
          {action} <ChevronRight style={{ height: 12, width: 12 }} />
        </button>
      )}
    </div>
  );
}

function Stars({ r }: { r: number }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11, fontWeight: 700, color: '#FFB800' }}><Star style={{ height: 11, width: 11, fill: 'currentColor' }} />{r}</span>;
}

/* ════════════════════════════════════════
   HERO — full visual redesign
════════════════════════════════════════ */
function Hero() {
  const heroProds = products.slice(0, 6);

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(165deg, #060A14 0%, #08101E 40%, #060D16 100%)', minHeight: 560 }}>

      {/* Background food photo — brighter, more visible */}
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=700&fit=crop&q=80"
        alt=""
        className="absolute inset-0 w-full h-full img-cover"
        style={{ filter: 'brightness(0.4) saturate(1.3)', mixBlendMode: 'screen', opacity: 0.5 }}
      />

      {/* Gradient mask */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(6,10,20,0.97) 40%, rgba(6,10,20,0.55) 75%, rgba(6,10,20,0.3) 100%)' }} />

      {/* Green radial glow */}
      <div className="absolute pointer-events-none" style={{ left: '-10%', bottom: '-20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,230,118,0.10) 0%, transparent 65%)', filter: 'blur(10px)' }} />
      <div className="absolute pointer-events-none" style={{ right: '5%', top: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(68,136,255,0.08) 0%, transparent 65%)', filter: 'blur(10px)' }} />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center gap-8 xl:gap-14">

          {/* ── LEFT: copy ── */}
          <motion.div className="flex-1 min-w-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22,1,.36,1] }}>

            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.22)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#00E676', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00E676', letterSpacing: '.08em' }}>LIVE NOW · JAMMU, J&K</span>
            </div>

            <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 1.01, letterSpacing: '-.045em', marginBottom: 20 }}>
              <span style={{ display: 'block', color: 'white', fontSize: 'clamp(2rem,4.5vw,3.2rem)' }}>India's #1</span>
              <span style={{ display: 'block', color: 'white', fontSize: 'clamp(2rem,4.5vw,3.2rem)' }}>SuperLocal App.</span>
              <span style={{ display: 'block', fontSize: 'clamp(3rem,7vw,5.5rem)', background: 'linear-gradient(130deg,#00E676 0%,#00BF63 40%,#4488FF 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                30 Minutes.
              </span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 24, maxWidth: 400, fontWeight: 500 }}>
              Groceries · Food · Services — delivered from your nearest kirana, dhaba & professional in Jammu & Kashmir.
            </p>

            {/* Search */}
            <div className="relative mb-5 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10" style={{ height: 16, width: 16, color: '#00E676' }} />
              <input placeholder="Tomatoes, Amul Milk, Barber..." className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-white outline-none placeholder:font-medium"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(0,230,118,0.3)', fontSize: 13, fontWeight: 500 }}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-xl text-xs font-black" style={{ background: '#00E676', color: '#021a0e' }}>Search</button>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm" style={{ background: '#00E676', color: '#021a0e', boxShadow: '0 8px 28px rgba(0,230,118,0.35)' }}>
                <Zap style={{ height: 16, width: 16 }} /> Order Now — Free
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span>See How it Works</span> <ArrowRight style={{ height: 14, width: 14 }} />
              </button>
            </div>

            {/* App badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[{ic:'🍎',top:'Download on the',bot:'App Store'},{ic:'▶',top:'Get it on',bot:'Google Play'}].map((a,i)=>(
                <button key={i} className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}>
                  <span style={{ fontSize: 18 }}>{a.ic}</span>
                  <div>
                    <p style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.38)', fontWeight: 600, lineHeight: 1.2 }}>{a.top}</p>
                    <p style={{ fontSize: 13, color: 'white', fontWeight: 900, lineHeight: 1.2 }}>{a.bot}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6" style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[['50K+','Happy customers'],['1,200+','Kirana stores'],['30 min','Avg delivery'],['₹0','Surge ever']].map(([v,l],i)=>(
                <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:.45+i*.08}}>
                  <p style={{ fontWeight: 900, color: 'white', fontSize: 'clamp(1.1rem,2.2vw,1.5rem)', lineHeight: 1, fontFamily: "'Outfit',sans-serif" }}>{v}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2, fontWeight: 500 }}>{l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: floating product grid ── */}
          <motion.div className="hidden lg:block shrink-0" style={{ width: 340 }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .15 }}>
            <div className="relative">

              {/* Glow behind grid */}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.08) 0%, transparent 70%)', filter: 'blur(24px)', transform: 'scale(1.3)' }} />

              {/* 2×3 product grid */}
              <div className="relative grid grid-cols-2 gap-3">
                {heroProds.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 + i * .08 }}
                    className="rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ background: 'rgba(18,22,38,0.9)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', transform: i % 2 === 1 ? 'translateY(14px)' : undefined }}>
                    <div className="relative overflow-hidden" style={{ height: 90, background: 'rgba(255,255,255,0.03)' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
                      {p.origPrice && (
                        <div className="absolute top-1.5 left-1.5">
                          <span style={{ background: '#FF3B3B', color: 'white', fontSize: 9, fontWeight: 800, padding: '1px 5px', borderRadius: 999 }}>
                            -{Math.round((1-p.price/p.origPrice)*100)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 1 }}>{p.brand}</p>
                      <p style={{ fontSize: 11, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: 13, fontWeight: 900, color: 'white' }}>₹{p.price}</span>
                        <button style={{ width: 24, height: 24, borderRadius: 8, background: 'rgba(0,230,118,0.15)', border: '1px solid rgba(0,230,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus style={{ height: 11, width: 11, color: '#00E676' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Delivery time badge */}
              <motion.div className="absolute -bottom-4 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap" style={{ background: '#00E676', boxShadow: '0 8px 28px rgba(0,230,118,0.45)' }}>
                  <Truck style={{ height: 15, width: 15, color: '#021a0e' }} />
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#021a0e' }}>Delivering in 30 min · Jammu</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   TRUST BAR
════════════════════════════════════════ */
function TrustBar() {
  const items = [
    { icon: '⚡', v: '30 Min', l: 'Delivery Guaranteed', c: '#00E676' },
    { icon: '🏪', v: '1,200+', l: 'Verified Kirana Stores', c: '#FFB800' },
    { icon: '🛡️', v: '100%',   l: 'Secure & Inspected', c: '#4488FF' },
    { icon: '👨‍👩‍👧', v: '50K+',   l: 'Families Served', c: '#8B6FFF' },
  ];
  return (
    <div style={{ background: '#0A0F1A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {items.map(({ icon, v, l, c }, i) => (
            <div key={i} className="flex items-center gap-3 py-4 px-5" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-2xl">{icon}</div>
              <div>
                <p style={{ fontWeight: 900, color: c, fontSize: '1.1rem', lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontWeight: 500, marginTop: 2 }}>{l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   HOW IT WORKS
════════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { icon: '📍', n: '01', title: 'Choose Location', desc: 'Set your Jammu/J&K address — we find the nearest verified stores instantly.', c: '#00E676' },
    { icon: '🛒', n: '02', title: 'Pick What You Need', desc: 'Browse 1,000+ items: groceries, food, medicines, services — 24/7.', c: '#4488FF' },
    { icon: '⚡', n: '03', title: 'Delivered in 30 Min', desc: 'Live tracking. Real kirana partner packs & brings it. ₹0 surge pricing.', c: '#FF6B00' },
  ];
  return (
    <div className="relative py-14" style={{ background: '#0A0F1A' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 120%, rgba(0,230,118,0.05), transparent 60%)' }} />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.18)', padding: '4px 14px', borderRadius: 999, marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#00E676', letterSpacing: '.08em' }}>HOW IT WORKS</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-.04em', color: 'white', lineHeight: 1.1 }}>
            Order in <span style={{ background: 'linear-gradient(120deg,#00E676,#4488FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>60 seconds</span>
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', marginTop: 8 }}>Simple. Fast. Designed for Jammu & Kashmir.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}>
              <div className="h-full rounded-3xl p-6" style={{ background: 'linear-gradient(145deg, #131726, #0F1320)', border: `1px solid ${s.c}18` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `${s.c}14`, border: `1px solid ${s.c}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{s.icon}</div>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.5rem', color: `${s.c}22`, letterSpacing: '-.06em' }}>{s.n}</span>
                </div>
                <h3 style={{ fontWeight: 900, color: 'white', fontSize: '1rem', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: 16, height: 2, borderRadius: 999, background: `linear-gradient(90deg, ${s.c}60, transparent)` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   NOW TAB
════════════════════════════════════════ */
const DEALS = products.filter(p => p.origPrice).slice(0, 8);

function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const cd = useCountdown(4 * 3600 + 12 * 60 + 47);
  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Bakery', 'Spices', 'Personal Care', 'Medicine'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  const AddBtn = ({ id }: { id: string }) => cart[id] ? (
    <div style={{ display: 'flex', alignItems: 'center', background: '#00E676', borderRadius: 12, overflow: 'hidden' }}>
      <button onClick={e => { e.stopPropagation(); rem(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Minus style={{ height: 11, width: 11, color: '#021a0e' }} />
      </button>
      <span style={{ fontSize: 11, fontWeight: 900, color: '#021a0e', minWidth: 14, textAlign: 'center' }}>{cart[id]}</span>
      <button onClick={e => { e.stopPropagation(); add(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Plus style={{ height: 11, width: 11, color: '#021a0e' }} />
      </button>
    </div>
  ) : (
    <button onClick={e => { e.stopPropagation(); add(id); }}
      style={{ width: 28, height: 28, borderRadius: 10, background: 'rgba(0,230,118,0.1)', border: '1.5px solid rgba(0,230,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}>
      <Plus style={{ height: 12, width: 12, color: '#00E676' }} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Promo Banners */}
      <Carousel>
        {[
          { tag:'⚡ FREE DELIVERY', tagBg:'rgba(0,230,118,0.12)', tagColor:'#00E676', h:'50% OFF First Order', sub:'Use code ZYPHIX50 · Max ₹100', code:'ZYPHIX50', img:'https://images.unsplash.com/photo-1543168256-418811576931?w=700&h=320&fit=crop&q=80', grad:'linear-gradient(120deg,#010f06,#010a04)' },
          { tag:'🏪 1,200+ STORES',  tagBg:'rgba(255,107,0,0.12)',  tagColor:'#FF8040', h:'Real Kirana, Real Fast',  sub:'Local inventory · Zero surge pricing',  code:'',  img:'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=700&h=320&fit=crop&q=80', grad:'linear-gradient(120deg,#120400,#080200)' },
          { tag:'💊 MEDICINES',      tagBg:'rgba(68,136,255,0.12)', tagColor:'#6AA0FF', h:'Medicines in 30 Min',   sub:'All pharmacy & medical orders',        code:'',  img:'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=700&h=320&fit=crop&q=80', grad:'linear-gradient(120deg,#001020,#000810)' },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0 relative overflow-hidden cursor-pointer lift rounded-3xl"
            style={{ width: 'min(560px,82vw)', height: 196, background: b.grad, border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={b.img} alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.22 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,0.75) 50%,transparent)' }} />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span style={{ display: 'inline-flex', alignItems: 'center', background: b.tagBg, color: b.tagColor, fontSize: 9, fontWeight: 800, letterSpacing: '.07em', padding: '3px 10px', borderRadius: 999, border: `1px solid ${b.tagColor}25`, width: 'fit-content' }}>{b.tag}</span>
              <div>
                <p style={{ fontWeight: 900, color: 'white', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', lineHeight: 1.18, letterSpacing: '-.03em', marginBottom: 6 }}>{b.h}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', marginBottom: 12 }}>{b.sub}</p>
                {b.code && <span style={{ display: 'inline-block', fontWeight: 900, fontSize: 12, letterSpacing: '.09em', color: b.tagColor, background: 'rgba(0,0,0,0.5)', border: `2px dashed ${b.tagColor}55`, padding: '5px 12px', borderRadius: 10 }}>{b.code}</span>}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Categories */}
      <div>
        <SH title="Shop by Category" action="All categories" />
        <Carousel className="pb-3">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.name ? 'All' : cat.name)} className="snap-start shrink-0 flex flex-col items-center gap-2.5 group">
              <div style={{ width: 74, height: 74, borderRadius: '50%', overflow: 'hidden', border: activeCat === cat.name ? `2.5px solid ${cat.color}` : '2.5px solid rgba(255,255,255,0.08)', boxShadow: activeCat === cat.name ? `0 0 0 4px ${cat.color}22, 0 8px 28px rgba(0,0,0,.5)` : '0 4px 16px rgba(0,0,0,.4)', transition: 'all .2s' }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, textAlign: 'center', width: 76, lineHeight: 1.3, color: activeCat === cat.name ? 'white' : 'rgba(255,255,255,0.45)' }}>{cat.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Flash Deals */}
      <div style={{ background: 'linear-gradient(135deg,#160700,#0C0300)', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 24, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,107,0,0.18)', border: '1px solid rgba(255,107,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
            <div>
              <p style={{ fontWeight: 900, color: 'white', fontSize: '0.95rem', lineHeight: 1.1 }}>Flash Deals</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>Best prices · Today only</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#FF8040', marginRight: 4 }}>Ends in</p>
            {[cd.h, cd.m, cd.s].map((v, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '5px 11px', minWidth: 44 }}>
                  <span style={{ fontWeight: 900, color: 'white', fontSize: '1.2rem', lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{['HRS','MIN','SEC'][i]}</span>
                </div>
                {i < 2 && <span style={{ fontWeight: 900, color: '#FF8040' }}>:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <Carousel>
            {DEALS.map(p => {
              const disc = Math.round((1-p.price/(p.origPrice??p.price))*100);
              return (
                <div key={p.id} className="snap-start group cursor-pointer" style={{ width: 154, background: '#131726', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', flexShrink: 0, transition: 'all .2s' }}>
                  <div style={{ position: 'relative', height: 115, background: '#1A1E2E', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
                    <div style={{ position: 'absolute', top: 7, left: 7, background: '#FF3B3B', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999 }}>-{disc}%</div>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 55%)' }} />
                  </div>
                  <div style={{ padding: 10 }}>
                    <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', marginBottom: 2 }}>{p.brand}</p>
                    <p style={{ fontSize: 11.5, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                    <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{p.weight}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                      <div><span style={{ fontWeight: 900, color: 'white', fontSize: 13 }}>₹{p.price}</span><span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through', marginLeft: 4 }}>₹{p.origPrice}</span></div>
                      <AddBtn id={p.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      {/* Brands */}
      <div>
        <SH title="Top Brands" sub="Sold by verified kirana partners" action="Browse all" />
        <Carousel>
          {[
            {n:'Amul',  img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop&q=80',bg:'#003087'},
            {n:'Parle', img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=120&fit=crop&q=80',bg:'#C00'},
            {n:'Nestle',img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&h=120&fit=crop&q=80',bg:'#1a1a2e'},
            {n:'MDH',   img:'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=120&h=120&fit=crop&q=80',bg:'#7b1fa2'},
            {n:'ITC',   img:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop&q=80',bg:'#1b5e20'},
            {n:'Dabur', img:'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=120&h=120&fit=crop&q=80',bg:'#e65100'},
            {n:'Colgate',img:'https://images.unsplash.com/photo-1559591935-c7c7cb7de30c?w=120&h=120&fit=crop&q=80',bg:'#b71c1c'},
            {n:"Lay's", img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&h=120&fit=crop&q=80',bg:'#f9a825'},
          ].map((b,i)=>(
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div style={{ width: 68, height: 68, borderRadius: 18, background: b.bg, border: '1px solid rgba(255,255,255,0.09)', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,.5)', transition: 'all .2s' }} className="group-hover:scale-105 group-hover:shadow-2xl">
                <img src={b.img} alt={b.n} className="w-full h-full img-cover" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.42)' }}>{b.n}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Trending carousel */}
      <div>
        <SH title="Trending Near You" sub="Most ordered in Jammu today" action="See all" />
        <Carousel>
          {products.map(p => (
            <div key={p.id} className="snap-start group cursor-pointer" style={{ width: 168, background: '#131726', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', flexShrink: 0, transition: 'all .2s' }}>
              <div style={{ position: 'relative', height: 140, background: '#1A1E2E', overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)' }} />
                {p.tag && (
                  <div style={{ position: 'absolute', top: 7, left: 7, background: p.tag==='Fresh'?'rgba(0,230,118,.15)':p.tag==='Bestseller'?'rgba(255,184,0,.15)':'rgba(255,59,59,.15)', color: p.tag==='Fresh'?'#00E676':p.tag==='Bestseller'?'#FFB800':'#FF6B6B', fontSize: 9, fontWeight: 800, letterSpacing: '.06em', padding: '2px 7px', borderRadius: 999, border: `1px solid ${p.tag==='Fresh'?'rgba(0,230,118,.25)':p.tag==='Bestseller'?'rgba(255,184,0,.25)':'rgba(255,59,59,.25)'}` }}>{p.tag}</div>
                )}
              </div>
              <div style={{ padding: 11 }}>
                <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', marginBottom: 2 }}>{p.brand}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 9 }}>{p.weight}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                  <div><span style={{ fontWeight: 900, color: 'white', fontSize: 13 }}>₹{p.price}</span>{p.origPrice&&<span style={{fontSize:9.5,color:'rgba(255,255,255,0.35)',textDecoration:'line-through',marginLeft:4}}>₹{p.origPrice}</span>}</div>
                  <AddBtn id={p.id} />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Product grid */}
      <div>
        <SH title="All Products" sub={`${filtered.length} items available`} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 20 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ padding: '7px 17px', borderRadius: 999, fontSize: 11.5, fontWeight: 700, transition: 'all .15s', whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer', background: activeCat===c?'#00E676':' rgba(255,255,255,0.05)', color: activeCat===c?'#021a0e':'rgba(255,255,255,0.45)', border: activeCat===c?'none':'1px solid rgba(255,255,255,0.08)', boxShadow: activeCat===c?'0 4px 16px rgba(0,230,118,0.3)':'none' }}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 12 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.92}} transition={{delay:i*.025}}>
                <div className="group cursor-pointer" style={{ background: '#131726', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', transition: 'all .2s', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: 130, background: '#1A1E2E', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-108 transition-transform duration-300" />
                    {p.tag && <div style={{ position: 'absolute', top: 7, left: 7, background: p.tag==='Fresh'?'rgba(0,230,118,.15)':p.tag==='Bestseller'?'rgba(255,184,0,.15)':'rgba(255,59,59,.15)', color: p.tag==='Fresh'?'#00E676':p.tag==='Bestseller'?'#FFB800':'#FF6B6B', fontSize: 9, fontWeight: 800, letterSpacing: '.06em', padding: '2px 7px', borderRadius: 999, border: `1px solid ${p.tag==='Fresh'?'rgba(0,230,118,.25)':p.tag==='Bestseller'?'rgba(255,184,0,.25)':'rgba(255,59,59,.25)'}` }}>{p.tag}</div>}
                  </div>
                  <div style={{ padding: 11, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.38)', marginBottom: 2 }}>{p.brand}</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{p.weight}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginTop: 'auto' }}>
                      <div><span style={{ fontWeight: 900, color: 'white', fontSize: 13 }}>₹{p.price}</span>{p.origPrice&&<span style={{fontSize:9.5,color:'rgba(255,255,255,0.35)',textDecoration:'line-through',marginLeft:4}}>₹{p.origPrice}</span>}</div>
                      <AddBtn id={p.id} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Cart toast */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} style={{ position: 'fixed', bottom: 24, left: 16, right: 16, zIndex: 50 }} className="md:left-1/2 md:-translate-x-1/2 md:w-[440px]">
            <div style={{ background: '#00E676', borderRadius: 24, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 20px 60px rgba(0,230,118,.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#021a0e' }}>{totalItems}</div>
                <span style={{ fontWeight: 900, color: '#021a0e', fontSize: 13 }}>{totalItems} item{totalItems>1?'s':''} · View Cart</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 900, color: '#021a0e' }}>₹{totalPrice}</span>
                <ArrowRight style={{ height: 18, width: 18, color: '#021a0e' }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════
   EATS TAB
════════════════════════════════════════ */
function EatsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="relative overflow-hidden rounded-3xl lift cursor-pointer" style={{ height: 220 }}>
        <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1100&h=400&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,rgba(0,0,0,.92) 45%,rgba(0,0,0,.2))' }} />
        <div className="absolute inset-0 p-7 flex flex-col justify-center" style={{ maxWidth: 360 }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,107,0,0.14)', color: '#FF8040', fontSize: 9, fontWeight: 800, letterSpacing: '.07em', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,107,0,0.25)', width: 'fit-content', marginBottom: 12 }}>🍱 ZYPHIXEATS</span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 8, fontSize: 'clamp(1.5rem,3.5vw,2.3rem)', letterSpacing: '-.04em' }}>Local food.<br /><span style={{ background: 'linear-gradient(120deg,#FF6B00,#FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Delivered fast.</span></h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginBottom: 16 }}>Restaurants · Dhabas · Home kitchens · Tiffin services</p>
          <button style={{ background: 'linear-gradient(135deg,#FF6B00,#E55E00)', color: 'white', fontSize: 12, fontWeight: 900, padding: '10px 20px', borderRadius: 14, width: 'fit-content', boxShadow: '0 8px 24px rgba(255,107,0,0.35)' }}>Explore Restaurants →</button>
        </div>
      </div>
      <div>
        <SH title="What's your craving?" action="All cuisines" accent="#FF6B00" />
        <Carousel>
          {foodCategories.map((fc,i)=>(
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div style={{ width: 70, height: 70, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.09)', boxShadow: '0 4px 16px rgba(0,0,0,.4)' }}>
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', width: 76, lineHeight: 1.3, color: 'rgba(255,255,255,0.45)' }}>{fc.name}</span>
            </button>
          ))}
        </Carousel>
      </div>
      <div>
        <SH title="Restaurants Near You" sub="Open now · Jammu, J&K" action="See all" accent="#FF6B00" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {restaurants.map((r,i)=>(
            <motion.div key={r.id} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}>
              <div className="rounded-3xl overflow-hidden cursor-pointer group" style={{ background: '#131726', border: '1px solid rgba(255,255,255,0.07)', transition: 'all .2s' }}>
                <div style={{ position: 'relative', height: 160, background: '#1A1E2E', overflow: 'hidden' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,.65) 30%,transparent)' }} />
                  {r.deliveryFee===0&&<div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,230,118,0.14)', color: '#00E676', fontSize: 9, fontWeight: 800, letterSpacing: '.06em', padding: '2px 8px', borderRadius: 999, border: '1px solid rgba(0,230,118,0.25)' }}>FREE DELIVERY</div>}
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 900, color: 'white', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.42)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cuisine}</p>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12, textAlign: 'right' }}>
                    <Stars r={r.rating} />
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
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

/* ════════════════════════════════════════
   BOOK TAB
════════════════════════════════════════ */
function BookTab() {
  const [sel, setSel] = useState<string|null>(null);
  const [slot, setSlot] = useState<string|null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS=['9:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="relative overflow-hidden rounded-3xl" style={{ height: 196 }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ filter: 'brightness(0.25)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg,rgba(139,111,255,0.4),rgba(6,10,18,0.85))' }} />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <span style={{ display: 'inline-block', background: 'rgba(139,111,255,0.14)', color: '#9D86FF', fontSize: 9, fontWeight: 800, letterSpacing: '.07em', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(139,111,255,0.25)', width: 'fit-content', marginBottom: 12 }}>📅 BOOK IN 60 SECONDS</span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: 'white', lineHeight: 1.1, fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', letterSpacing: '-.04em', marginBottom: 8 }}>Trusted Professionals,<br /><span style={{ background: 'linear-gradient(120deg,#8B6FFF,#FF4D8B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>At Your Doorstep</span></h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>Verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>
      <div>
        <SH title="Available Services" action="View all" accent="#8B6FFF" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map(s=>{
            const active=sel===s.id;
            return (
              <div key={s.id} onClick={()=>{setSel(active?null:s.id);setSlot(null);setBooked(false);}} className="cursor-pointer" style={{ background: active?'rgba(139,111,255,.1)':'#131726', border: active?'1px solid rgba(139,111,255,.38)':'1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 18, transition: 'all .2s', transform: active?'scale(1.02)':undefined }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{s.emoji}</span>
                  {active&&<div style={{ width: 18, height: 18, borderRadius: '50%', background: '#8B6FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check style={{ height: 10, width: 10, color: 'white' }} /></div>}
                </div>
                <p style={{ fontWeight: 900, color: 'white', fontSize: 13, lineHeight: 1.3, marginBottom: 2 }}>{s.title}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginBottom: 8 }}>{s.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 900, color: 'white', fontSize: 13 }}>₹{s.price}</span>
                  <Stars r={s.rating} />
                </div>
                <p style={{ fontSize: 9.5, fontWeight: 700, color: '#00E676' }}>{s.available} pros · {s.nextSlot}</p>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {sel&&(
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
            <div style={{ background: '#131726', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 22 }}>
              <p style={{ fontWeight: 900, color: 'white', fontSize: '1rem', marginBottom: 4 }}>Pick a time slot — Today</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>{services.find(x=>x.id===sel)?.title} · ₹{services.find(x=>x.id===sel)?.price}</p>
              <div className="grid grid-cols-4 gap-2.5 mb-5">
                {SLOTS.map(sl=>(
                  <button key={sl} onClick={()=>setSlot(sl)} style={{ padding: '10px 4px', borderRadius: 14, fontSize: 11.5, fontWeight: 700, transition: 'all .15s', background: slot===sl?'#8B6FFF':'rgba(255,255,255,0.05)', color: slot===sl?'white':'rgba(255,255,255,0.45)', border: slot===sl?'none':'1px solid rgba(255,255,255,0.08)', transform: slot===sl?'scale(1.06)':undefined, boxShadow: slot===sl?'0 8px 24px rgba(139,111,255,.3)':'none' }}>{sl}</button>
                ))}
              </div>
              <button onClick={()=>slot&&setBooked(true)} disabled={!slot} style={{ width: '100%', padding: '14px', borderRadius: 16, fontWeight: 900, fontSize: 13, transition: 'all .2s', background: booked?'rgba(0,230,118,.1)':slot?'#8B6FFF':'rgba(139,111,255,.1)', color: booked?'#00E676':'white', boxShadow: slot&&!booked?'0 8px 28px rgba(139,111,255,.3)':'none', opacity: !slot?0.4:1, cursor: slot?'pointer':'not-allowed' }}>
                {booked?'✓ Booking Confirmed! See you soon.':slot?'Confirm Booking →':'Select a time slot above'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════
   MAP TAB
════════════════════════════════════════ */
function MapTab() {
  const T: Record<string,{e:string;c:string}> = { kirana:{e:'🏪',c:'#00E676'}, medical:{e:'💊',c:'#4488FF'}, restaurant:{e:'🍲',c:'#FF6B00'}, electronics:{e:'💡',c:'#FFB800'}, garage:{e:'🔧',c:'#6366f1'}, salon:{e:'✂️',c:'#FF4D8B'} };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="relative overflow-hidden rounded-3xl lift cursor-pointer" style={{ height: 230 }}>
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=450&fit=crop&q=80" alt="Map" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.18 }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center,rgba(0,0,0,.05),rgba(6,10,18,.92))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div style={{ fontSize: 44, marginBottom: 12 }}>📍</div>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: 'white', fontSize: '1.5rem', letterSpacing: '-.04em', marginBottom: 4 }}>Jammu, J&K</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginBottom: 18 }}>8 verified stores within 1 km radius · All open now</p>
          <button style={{ background: '#00E676', color: '#021a0e', fontSize: 13, fontWeight: 900, padding: '10px 22px', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,230,118,.35)' }}>Open Full Map →</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((st:any)=>{
          const t=T[st.type]||T.kirana;
          return (
            <div key={st.id} className="lift cursor-pointer" style={{ background: '#131726', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: `${t.c}12`, border: `1px solid ${t.c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{t.e}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 800, color: 'white', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(255,255,255,0.42)', marginTop: 2 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><MapPin style={{ height: 9, width: 9 }} />{st.distance}</span>
                  <span>·</span><span>{st.openHours}</span>
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <Stars r={st.rating} />
                <span style={{ display: 'block', marginTop: 5, background: st.open?'rgba(0,230,118,.1)':'rgba(255,59,59,.1)', color: st.open?'#00E676':'#FF6B6B', border: `1px solid ${st.open?'rgba(0,230,118,.22)':'rgba(255,59,59,.22)'}`, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 999 }}>{st.open?'Open':'Closed'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   OFFERS TAB
════════════════════════════════════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string|null>(null);
  const copy = (c: string) => { navigator.clipboard.writeText(c); setCopied(c); setTimeout(()=>setCopied(null),2500); };
  const TS: Record<string,{c:string}> = { discount:{c:'#00E676'}, delivery:{c:'#FF8040'}, referral:{c:'#6AA0FF'} };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 220 }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&h=380&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ filter: 'brightness(.2) saturate(1.4)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg,rgba(0,90,35,.95),rgba(6,10,18,.75))' }} />
        <div className="absolute inset-0 p-7 flex flex-col justify-center">
          <span style={{ display: 'inline-block', background: 'rgba(0,230,118,0.12)', color: '#00E676', fontSize: 9, fontWeight: 800, letterSpacing: '.07em', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(0,230,118,0.22)', width: 'fit-content', marginBottom: 12 }}>🔥 LIMITED TIME OFFER</span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: 'white', lineHeight: 1.1, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', letterSpacing: '-.04em', marginBottom: 8 }}>
            Flat <span style={{ background: 'linear-gradient(120deg,#00E676,#4488FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>50% Off</span><br />Your First Order
          </h2>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginBottom: 18 }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 900, fontSize: 13, color: '#00E676', background: 'rgba(0,0,0,.5)', border: '2px dashed rgba(0,230,118,.45)', padding: '6px 14px', borderRadius: 12, letterSpacing: '.09em' }}>ZYPHIX50</span>
            <button onClick={()=>copy('ZYPHIX50')} style={{ background: '#00E676', color: '#021a0e', fontSize: 12, fontWeight: 900, padding: '8px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              {copied==='ZYPHIX50'?<><Check style={{height:13,width:13}}/>Copied!</>:<><Copy style={{height:13,width:13}}/>Copy Code</>}
            </button>
          </div>
        </div>
      </div>
      <SH title="All Active Coupons" sub={`${promoCodes.length} offers`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {promoCodes.map(offer=>{
          const tc=TS[offer.type]||TS.discount;
          const isCopied=copied===offer.code;
          return (
            <div key={offer.code} onClick={()=>copy(offer.code)} className="cursor-pointer" style={{ background: isCopied?`${tc.c}06`:'#131726', border: `1px solid ${isCopied?`${tc.c}22`:'rgba(255,255,255,0.07)'}`, borderRadius: 18, padding: 18, transition: 'all .2s', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '.04em', color: tc.c }}>{offer.code}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, background: `${tc.c}12`, color: tc.c, border: `1px solid ${tc.c}22`, padding: '2px 7px', borderRadius: 999 }}>{offer.type}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 3 }}>{offer.description}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)' }}>Valid till 31 Dec 2025</p>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, padding: '6px 12px', borderRadius: 10, background: isCopied?`${tc.c}14`:'rgba(255,255,255,.06)', color: isCopied?tc.c:'rgba(255,255,255,0.45)', border: isCopied?`1px solid ${tc.c}28`:'1px solid rgba(255,255,255,.09)', transition: 'all .15s' }}>
                {isCopied?<Check style={{height:12,width:12}}/>:<Copy style={{height:12,width:12}}/>}
                {isCopied?'Done':'Copy'}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ background: 'linear-gradient(120deg,#040c24,#070516)', border: '1px solid rgba(68,136,255,0.2)', borderRadius: 20, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(68,136,255,0.12)', border: '1px solid rgba(68,136,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>🎁</div>
          <div>
            <p style={{ fontWeight: 900, color: 'white', fontSize: '0.95rem' }}>Refer & Earn ₹100</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginTop: 2 }}>You & your friend both get ₹100 wallet credits</p>
          </div>
        </div>
        <button style={{ background: '#00E676', color: '#021a0e', fontSize: 13, fontWeight: 900, padding: '10px 22px', borderRadius: 14, flexShrink: 0, boxShadow: '0 8px 24px rgba(0,230,118,.3)' }}>Share Now →</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   APP DOWNLOAD SECTION
════════════════════════════════════════ */
function AppDownload() {
  return (
    <div style={{ background: '#0A0F1A', padding: '60px 0' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#101826,#0E1522)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(0,230,118,0.06), transparent 60%)' }} />
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 lg:p-12 relative">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.18)', padding: '4px 14px', borderRadius: 999, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#00E676', letterSpacing: '.08em' }}>📱 DOWNLOAD FREE</span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: 'white', lineHeight: 1.08, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-.04em', marginBottom: 12 }}>
                Get the <span style={{ background: 'linear-gradient(120deg,#00E676,#4488FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ZYPHIX</span> app.<br />Order in 30 seconds.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>Exclusive app-only deals · Live order tracking · Offline mode</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {[{ic:'🍎',top:'Download on the',bot:'App Store'},{ic:'▶',top:'Get it on',bot:'Google Play'}].map((a,i)=>(
                  <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderRadius: 18, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)', transition: 'all .2s' }} className="hover:scale-105">
                    <span style={{ fontSize: 28 }}>{a.ic}</span>
                    <div>
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', fontWeight: 600, lineHeight: 1.2 }}>{a.top}</p>
                      <p style={{ fontSize: 17, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>{a.bot}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 80, marginBottom: 8 }}>📲</div>
              <p style={{ fontWeight: 900, color: 'white', fontSize: '1.3rem' }}>4.8 ★</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>50,000+ ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: '#060A12', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#00E676,#4488FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap style={{ height: 15, width: 15, color: 'white', fill: 'white' }} />
              </div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-.04em', background: 'linear-gradient(90deg,#00E676,#4488FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ZYPHIX</span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.32)', marginBottom: 18, maxWidth: 240 }}>India's SuperLocal App — groceries, food & services delivered in 30 minutes across Jammu & Kashmir.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Twitter','Instagram','LinkedIn','WhatsApp'].map(s=>(
                <a key={s} href="#" style={{ fontSize: 11, padding: '5px 10px', borderRadius: 8, color: 'rgba(255,255,255,0.38)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', transition: 'all .15s' }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title:'Services', links:['ZyphixNow','ZyphixEats','ZyphixBook','Kirana Near Me','Offers'] },
            { title:'Company',  links:['About Us','Careers','Press Kit','Blog','Investors'] },
            { title:'Support',  links:['Help Center','Contact Us','Refund Policy','Privacy Policy','Terms'] },
          ].map(({title,links})=>(
            <div key={title}>
              <p style={{ fontWeight: 900, color: 'white', fontSize: 13, marginBottom: 16 }}>{title}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l=><li key={l}><a href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)' }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>© 2025 ZYPHIX Technologies Pvt. Ltd. · Jammu, J&K, India</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E676', display: 'block' }} />
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00E676' }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   ANNOUNCEMENT BAR
════════════════════════════════════════ */
function AnnoBar() {
  return (
    <div style={{ background: 'linear-gradient(90deg,#00B85C,#007A3D,#00B85C)', backgroundSize: '200% 100%', animation: 'gradient-move 4s linear infinite', padding: '7px 0', textAlign: 'center' }}>
      <p style={{ fontSize: 11.5, fontWeight: 800, color: '#021a0e', letterSpacing: '.01em' }}>
        ⚡ FREE delivery on first order — Use code{' '}
        <span style={{ background: 'rgba(0,0,0,0.2)', padding: '1px 6px', borderRadius: 4, letterSpacing: '.06em' }}>ZYPHIX50</span>
        {' '}· Now live in Jammu, J&K · ₹0 surge pricing, ever
      </p>
    </div>
  );
}

/* ════════════════════════════════════════
   NAVBAR
════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full" style={{ background: scrolled ? 'rgba(6,10,18,0.97)' : 'rgba(8,13,22,0.92)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderBottom: '1px solid rgba(255,255,255,0.07)', boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.7)' : 'none', transition: 'all .3s' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 60 }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg,#00E676,#4488FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap style={{ height: 15, width: 15, color: 'white', fill: 'white' }} />
            </div>
            <span className="hidden sm:block" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-.04em', background: 'linear-gradient(90deg,#00E676 0%,#4488FF 60%,#8B6FFF 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmer 5s linear infinite' }}>ZYPHIX</span>
          </a>
          {/* Location */}
          <button className="hidden md:flex items-center gap-1.5 transition-all hover:bg-white/5" style={{ padding: '6px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(0,230,118,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MapPin style={{ height: 11, width: 11, color: '#00E676' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 8.5, fontWeight: 600, color: 'rgba(255,255,255,0.38)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '.07em' }}>Deliver to</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <span style={{ fontWeight: 900, color: 'white', fontSize: 13, lineHeight: 1.2 }}>Jammu, J&K</span>
                <ChevronDown style={{ height: 11, width: 11, color: 'rgba(255,255,255,0.38)' }} />
              </div>
            </div>
          </button>
          {/* Search */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 480 }}>
            <Search style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', height: 15, width: 15, color: focused ? '#00E676' : 'rgba(255,255,255,0.35)', zIndex: 1, transition: 'color .15s' }} />
            <input type="text" placeholder="Search groceries, food, services..." onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 9, paddingBottom: 9, borderRadius: 16, background: focused ? 'rgba(22,28,46,0.98)' : 'rgba(20,25,40,0.7)', border: focused ? '1px solid rgba(0,230,118,0.3)' : '1px solid rgba(255,255,255,0.08)', fontSize: 13, color: 'white', outline: 'none', fontWeight: 500, boxShadow: focused ? '0 0 0 3px rgba(0,230,118,0.07)' : 'none', transition: 'all .18s', fontFamily: "'Outfit',sans-serif" }}
            />
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button className="hidden sm:flex items-center gap-1.5 hover:bg-white/5 transition-all" style={{ padding: '8px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
              <Users style={{ height: 14, width: 14 }} /><span className="hidden lg:inline">Login</span>
            </button>
            <button className="relative flex items-center gap-2" style={{ padding: '8px 16px', borderRadius: 12, background: 'linear-gradient(135deg,#00E676,#00BF63)', fontSize: 13, fontWeight: 900, color: '#021a0e', boxShadow: '0 4px 18px rgba(0,230,118,0.3)' }}>
              <Package style={{ height: 15, width: 15 }} /><span className="hidden sm:inline">Cart</span>
              <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#FF6B00', color: 'white', fontSize: 9.5, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ROOT
════════════════════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const CONTENT: Record<TabId, React.ReactNode> = { now: <NowTab />, eats: <EatsTab />, book: <BookTab />, map: <MapTab />, offers: <OffersTab /> };

  return (
    <div style={{ background: '#060A12', minHeight: '100vh' }}>
      <AnnoBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />

      {/* Sticky service tabs */}
      <div className="sticky z-40" style={{ top: 0, background: 'rgba(6,10,18,0.94)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', gap: 4, padding: '10px 0' }}>
            {TABS.map(t => {
              const active = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 14, fontSize: 13, fontWeight: 800, flexShrink: 0, whiteSpace: 'nowrap', transition: 'all .2s', background: active ? t.accent : 'transparent', color: active ? t.textColor : 'rgba(255,255,255,0.42)', boxShadow: active ? `0 4px 18px ${t.accent}45` : 'none', transform: active ? 'scale(1.04)' : undefined }}>
                  <span style={{ fontSize: 15 }}>{t.icon}</span>{t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-7 pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AppDownload />
      <Footer />
    </div>
  );
}
