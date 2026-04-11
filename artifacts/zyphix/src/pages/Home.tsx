import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User,
  Plus, Minus, Star, Clock, ChevronRight, ChevronLeft,
  Zap, Shield, Package, Truck, Check, Copy,
  ArrowRight, Phone, Instagram, Twitter, Linkedin
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

/* ─────────────────── helpers ─────────────────── */
type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const GREEN  = '#16C784';
const GREEN_D = '#0EA56E';
const BG     = '#0B0F1A';
const SURF   = '#141927';
const CARD   = '#1A2235';
const BORDER = 'rgba(255,255,255,0.07)';
const BORDER2 = 'rgba(255,255,255,0.13)';
const T1     = '#F0F4FF';
const T2     = 'rgba(240,244,255,0.5)';
const T3     = 'rgba(240,244,255,0.28)';

function useCountdown(init: number) {
  const [s, setS] = useState(init);
  useEffect(() => {
    const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const p = (n: number) => String(n).padStart(2, '0');
  return { h: p(Math.floor(s / 3600)), m: p(Math.floor((s % 3600) / 60)), s: p(s % 60) };
}

function Carousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const sc = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div className="relative group/c">
      <button onClick={() => sc(-1)}
        className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all"
        style={{ background: CARD, border: `1px solid ${BORDER2}`, boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
        <ChevronLeft size={14} color={T1} />
      </button>
      <div ref={ref} className="carousel">{children}</div>
      <button onClick={() => sc(1)}
        className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all"
        style={{ background: CARD, border: `1px solid ${BORDER2}`, boxShadow: '0 4px 16px rgba(0,0,0,.5)' }}>
        <ChevronRight size={14} color={T1} />
      </button>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, color: T1, letterSpacing: '-.02em' }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 12, color: T3, marginTop: 3 }}>{subtitle}</p>}
      </div>
      {action && (
        <button style={{ fontSize: 12, fontWeight: 700, color: GREEN, display: 'flex', alignItems: 'center', gap: 3 }}>
          {action} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

function StarRating({ r }: { r: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#F5C842' }}>
      <Star size={10} fill="#F5C842" stroke="none" />{r}
    </span>
  );
}

/* ─────────────────── ANNOUNCEMENT BAR ─────────────────── */
function AnnoBar() {
  return (
    <div style={{ background: GREEN, padding: '8px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#032D1A', letterSpacing: '.01em' }}>
        Free delivery on your first order · Use code{' '}
        <strong style={{ letterSpacing: '.06em' }}>ZYPHIX50</strong>
        {' '}· Now live in Jammu & Kashmir
      </p>
    </div>
  );
}

/* ─────────────────── NAVBAR ─────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 2);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className="sticky top-0 z-50" style={{ background: scrolled ? 'rgba(11,15,26,0.98)' : 'rgba(11,15,26,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}`, transition: 'background .2s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12, height: 62 }}>

        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={15} color="#032D1A" fill="#032D1A" />
          </div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.15rem', letterSpacing: '-.03em', color: T1 }}>
            ZYP<span style={{ color: GREEN }}>HIX</span>
          </span>
        </a>

        {/* Location */}
        <button className="hidden md:flex items-center gap-2" style={{ padding: '7px 14px', borderRadius: 10, background: SURF, border: `1px solid ${BORDER}`, flexShrink: 0, transition: 'border-color .15s' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = BORDER2)} onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}>
          <MapPin size={13} color={GREEN} />
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 9, fontWeight: 600, color: T3, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '.06em' }}>Deliver to</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <span style={{ fontWeight: 700, color: T1, fontSize: 13, lineHeight: 1 }}>Jammu, J&K</span>
              <ChevronDown size={11} color={T3} />
            </div>
          </div>
        </button>

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 500 }}>
          <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? GREEN : T3, zIndex: 1, transition: 'color .15s' }} />
          <input type="text" placeholder="Search groceries, restaurants, services..."
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ width: '100%', paddingLeft: 42, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 10, background: SURF, border: `1px solid ${focused ? GREEN + '50' : BORDER}`, fontSize: 13, color: T1, fontFamily: 'inherit', fontWeight: 500, boxShadow: focused ? `0 0 0 3px rgba(22,199,132,0.08)` : 'none', transition: 'all .15s' }}
          />
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button className="hidden sm:flex items-center gap-2" style={{ padding: '9px 16px', borderRadius: 10, background: SURF, border: `1px solid ${BORDER}`, fontSize: 13, fontWeight: 600, color: T2, transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = BORDER2; e.currentTarget.style.color = T1; }} onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = T2; }}>
            <User size={14} /><span className="hidden lg:inline">Login</span>
          </button>
          <button className="relative flex items-center gap-2" style={{ padding: '9px 18px', borderRadius: 10, background: GREEN, fontSize: 13, fontWeight: 800, color: '#032D1A', boxShadow: `0 2px 12px rgba(22,199,132,0.25)` }}>
            <ShoppingCart size={15} /><span className="hidden sm:inline">Cart</span>
            <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#E53E3E', color: 'white', fontSize: 9.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── HERO ─────────────────── */
function Hero() {
  const heroProds = products.slice(0, 6);
  return (
    <div style={{ background: BG, position: 'relative', overflow: 'hidden' }}>
      {/* Single subtle glow — professional, not garish */}
      <div style={{ position: 'absolute', top: -120, right: -100, width: 600, height: 600, background: `radial-gradient(circle, rgba(22,199,132,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 64px', display: 'flex', alignItems: 'center', gap: 48 }}>

        {/* ── Left: Copy ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Live badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(22,199,132,0.08)', border: `1px solid rgba(22,199,132,0.2)`, borderRadius: 999, padding: '5px 13px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.06em' }}>LIVE IN JAMMU & KASHMIR</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: 18 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', color: T1 }}>India's #1</span>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', color: T1 }}>SuperLocal App.</span>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', color: GREEN, marginTop: 4 }}>30 Minutes.</span>
          </h1>

          <p style={{ fontSize: 15, color: T2, lineHeight: 1.7, marginBottom: 28, maxWidth: 420, fontWeight: 400 }}>
            Groceries, food & services — delivered from your nearest kirana, dhaba & professional across Jammu & Kashmir.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 24, maxWidth: 440 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T3 }} />
            <input placeholder="Tomatoes, Amul Milk, Plumber..." style={{ width: '100%', paddingLeft: 46, paddingRight: 110, paddingTop: 13, paddingBottom: 13, borderRadius: 12, background: SURF, border: `1px solid ${BORDER2}`, fontSize: 14, color: T1, fontFamily: 'inherit', fontWeight: 500 }} />
            <button style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: GREEN, color: '#032D1A', fontWeight: 800, fontSize: 13, padding: '7px 16px', borderRadius: 8 }}>Search</button>
          </div>

          {/* CTA row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 12, background: GREEN, color: '#032D1A', fontWeight: 800, fontSize: 14, boxShadow: `0 4px 20px rgba(22,199,132,0.3)` }}>
              <Zap size={16} fill="#032D1A" /> Order Now — Free Delivery
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 12, background: SURF, color: T2, fontWeight: 600, fontSize: 14, border: `1px solid ${BORDER}` }}>
              How it works <ArrowRight size={14} />
            </button>
          </div>

          {/* App store badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            {[{ icon: '🍎', top: 'Download on the', bot: 'App Store' }, { icon: '▶', top: 'Get it on', bot: 'Google Play' }].map((a, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 10, background: SURF, border: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div>
                  <p style={{ fontSize: 9, color: T3, fontWeight: 500 }}>{a.top}</p>
                  <p style={{ fontSize: 14, color: T1, fontWeight: 800 }}>{a.bot}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
            {[['50K+', 'Happy customers'], ['1,200+', 'Kirana stores'], ['30 min', 'Avg. delivery'], ['₹0', 'Surge pricing']].map(([v, l], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: T1, lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: 11, color: T3, marginTop: 3 }}>{l}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Right: Product grid ── */}
        <div className="hidden lg:block" style={{ width: 360, flexShrink: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {heroProds.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                className="group cursor-pointer"
                style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', transform: i % 2 === 1 ? 'translateY(16px)' : undefined, transition: 'all .18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; (e.currentTarget as HTMLElement).style.transform = i % 2 === 1 ? 'translateY(14px)' : 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.transform = i % 2 === 1 ? 'translateY(16px)' : 'translateY(0)'; }}>
                <div style={{ height: 96, background: SURF, overflow: 'hidden', position: 'relative' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                  {p.origPrice && (
                    <div style={{ position: 'absolute', top: 7, left: 7, background: '#DC2626', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 5 }}>
                      -{Math.round((1 - p.price / p.origPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div style={{ padding: '10px 11px' }}>
                  <p style={{ fontSize: 9, color: T3, marginBottom: 2 }}>{p.brand}</p>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: T1, lineHeight: 1.3, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, color: T1, fontSize: 13 }}>₹{p.price}</span>
                    <button style={{ width: 26, height: 26, borderRadius: 7, background: `rgba(22,199,132,0.1)`, border: `1px solid rgba(22,199,132,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={12} color={GREEN} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Delivery badge below grid */}
          <motion.div style={{ marginTop: 20 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 20px', background: `rgba(22,199,132,0.08)`, border: `1px solid rgba(22,199,132,0.18)`, borderRadius: 12 }}>
              <Truck size={14} color={GREEN} />
              <span style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>Free delivery in 30 min · Jammu</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── TRUST BAR ─────────────────── */
function TrustBar() {
  const items = [
    { icon: <Zap size={18} color={GREEN} />, v: '30 Min', l: 'Delivery Guaranteed' },
    { icon: <Package size={18} color={T2} />, v: '1,200+', l: 'Verified Kirana Stores' },
    { icon: <Shield size={18} color={T2} />, v: '100%', l: 'Secure & Verified' },
    { icon: <Truck size={18} color={T2} />, v: '₹0', l: 'Surge Pricing Ever' },
  ];
  return (
    <div style={{ background: SURF, borderBottom: `1px solid ${BORDER}`, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {items.map(({ icon, v, l }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
            {icon}
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: '1rem', lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 3 }}>{l}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── HOW IT WORKS ─────────────────── */
function HowItWorks() {
  const steps = [
    { icon: <MapPin size={22} color={GREEN} />, n: '01', title: 'Choose Location', desc: 'Set your Jammu/J&K address. We find the nearest verified kirana stores instantly.' },
    { icon: <ShoppingCart size={22} color={GREEN} />, n: '02', title: 'Pick What You Need', desc: 'Browse 1,000+ items — groceries, food, medicines, services — all available 24/7.' },
    { icon: <Truck size={22} color={GREEN} />, n: '03', title: 'Delivered in 30 Minutes', desc: 'Live tracking. Your local kirana packs and delivers your order. Zero surge pricing.' },
  ];
  return (
    <div style={{ background: BG, padding: '56px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>How it works</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-.04em', color: T1, lineHeight: 1.1 }}>
            Order in under <span style={{ color: GREEN }}>60 seconds</span>
          </h2>
          <p style={{ fontSize: 14, color: T2, marginTop: 12 }}>Simple, fast, and designed for Jammu & Kashmir.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="grid-cols-1 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
              <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '28px 24px', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(22,199,132,0.08)', border: `1px solid rgba(22,199,132,0.16)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.2rem', color: `rgba(22,199,132,0.15)`, letterSpacing: '-.06em' }}>{s.n}</span>
                </div>
                <h3 style={{ fontWeight: 800, color: T1, fontSize: '0.95rem', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: T2, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── ADD BUTTON ─────────────────── */
function AddBtn({ id, cart, add, remove }: { id: string; cart: Record<string, number>; add: (id: string) => void; remove: (id: string) => void }) {
  if (cart[id]) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', background: GREEN, borderRadius: 8, overflow: 'hidden' }}>
        <button onClick={e => { e.stopPropagation(); remove(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Minus size={11} color="#032D1A" />
        </button>
        <span style={{ fontSize: 12, fontWeight: 800, color: '#032D1A', minWidth: 18, textAlign: 'center' }}>{cart[id]}</span>
        <button onClick={e => { e.stopPropagation(); add(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={11} color="#032D1A" />
        </button>
      </div>
    );
  }
  return (
    <button onClick={e => { e.stopPropagation(); add(id); }}
      style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(22,199,132,0.09)', border: `1px solid rgba(22,199,132,0.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(22,199,132,0.18)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(22,199,132,0.09)'; }}>
      <Plus size={12} color={GREEN} />
    </button>
  );
}

/* ─────────────────── PRODUCT CARD ─────────────────── */
function ProductCard({ p, cart, add, remove, wide = false }: { p: typeof products[0]; cart: Record<string, number>; add: (id: string) => void; remove: (id: string) => void; wide?: boolean }) {
  const disc = p.origPrice ? Math.round((1 - p.price / p.origPrice) * 100) : null;
  return (
    <div className="snap-start group cursor-pointer"
      style={{ width: wide ? 176 : 160, flexShrink: 0, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', transition: 'all .18s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,.4)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
      <div style={{ position: 'relative', height: 120, background: SURF, overflow: 'hidden' }}>
        <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
        {disc && (
          <div style={{ position: 'absolute', top: 7, left: 7, background: '#DC2626', color: 'white', fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 5 }}>
            -{disc}%
          </div>
        )}
        {!disc && p.tag && (
          <div style={{ position: 'absolute', top: 7, left: 7, background: 'rgba(22,199,132,0.15)', color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 5, border: `1px solid rgba(22,199,132,0.25)` }}>
            {p.tag}
          </div>
        )}
      </div>
      <div style={{ padding: '10px 11px' }}>
        <p style={{ fontSize: 9.5, color: T3, marginBottom: 2, fontWeight: 500 }}>{p.brand}</p>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
        <p style={{ fontSize: 10, color: T3, marginBottom: 9 }}>{p.weight}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          <div>
            <span style={{ fontWeight: 800, color: T1, fontSize: 13 }}>₹{p.price}</span>
            {p.origPrice && <span style={{ fontSize: 10, color: T3, textDecoration: 'line-through', marginLeft: 4 }}>₹{p.origPrice}</span>}
          </div>
          <AddBtn id={p.id} cart={cart} add={add} remove={remove} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── NOW TAB ─────────────────── */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const cd = useCountdown(4 * 3600 + 47 * 60 + 22);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);
  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Bakery', 'Personal Care'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      {/* Promo Banners */}
      <Carousel>
        {[
          { tag: 'New User Offer', headline: '50% off your first order', sub: 'Use code ZYPHIX50 · Max ₹100 discount', code: 'ZYPHIX50', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800&h=320&fit=crop&q=80' },
          { tag: 'Partner Stores', headline: 'Real kirana. Real fast.', sub: '1,200+ local stores · Zero surge pricing', code: '', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=320&fit=crop&q=80' },
          { tag: 'Pharmacy', headline: 'Medicines in 30 minutes', sub: 'Prescription & OTC · All brands available', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=320&fit=crop&q=80' },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0 cursor-pointer" style={{ width: 'min(600px,85vw)', height: 200, borderRadius: 18, overflow: 'hidden', position: 'relative', background: '#111827', flexShrink: 0 }}>
            <img src={b.img} alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.28 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,15,26,0.92) 50%, transparent)' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-block', background: `rgba(22,199,132,0.1)`, color: GREEN, border: `1px solid rgba(22,199,132,0.22)`, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', padding: '3px 10px', borderRadius: 6, width: 'fit-content' }}>{b.tag}</span>
              <div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', lineHeight: 1.15, marginBottom: 6 }}>{b.headline}</p>
                <p style={{ fontSize: 12, color: T2, marginBottom: b.code ? 12 : 0 }}>{b.sub}</p>
                {b.code && <span style={{ display: 'inline-block', fontWeight: 800, fontSize: 12, letterSpacing: '.08em', color: GREEN, background: 'rgba(0,0,0,0.4)', border: `1.5px dashed rgba(22,199,132,0.45)`, padding: '5px 12px', borderRadius: 8 }}>{b.code}</span>}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Categories */}
      <div>
        <SectionHeader title="Shop by Category" action="All categories" />
        <Carousel>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.name ? 'All' : cat.name)}
              className="snap-start shrink-0 flex flex-col items-center gap-2.5 group" style={{ flexShrink: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: activeCat === cat.name ? `2px solid ${GREEN}` : `2px solid ${BORDER2}`, boxShadow: activeCat === cat.name ? `0 0 0 3px rgba(22,199,132,0.15)` : 'none', transition: 'all .2s' }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', width: 76, lineHeight: 1.3, color: activeCat === cat.name ? T1 : T3 }}>{cat.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Flash Deals */}
      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Zap size={18} color={GREEN} fill={GREEN} />
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: 14, lineHeight: 1.1 }}>Flash Deals</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>Best prices, today only</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: T2, marginRight: 4 }}>Ends in</span>
            {[cd.h, cd.m, cd.s].map((v, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: BG, border: `1px solid ${BORDER2}`, borderRadius: 8, padding: '5px 10px', minWidth: 42 }}>
                  <span style={{ fontWeight: 800, color: T1, fontSize: '1.1rem', lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: 7.5, fontWeight: 600, color: T3, marginTop: 2, letterSpacing: '.04em' }}>{['HRS', 'MIN', 'SEC'][i]}</span>
                </div>
                {i < 2 && <span style={{ fontWeight: 800, color: T3 }}>:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <Carousel>
            {products.filter(p => p.origPrice).slice(0, 8).map(p => (
              <ProductCard key={p.id} p={p} cart={cart} add={add} remove={rem} />
            ))}
          </Carousel>
        </div>
      </div>

      {/* Trending */}
      <div>
        <SectionHeader title="Trending Near You" subtitle="Most ordered in Jammu today" action="See all" />
        <Carousel>
          {products.map(p => <ProductCard key={p.id} p={p} cart={cart} add={add} remove={rem} />)}
        </Carousel>
      </div>

      {/* All products */}
      <div>
        <SectionHeader title="All Products" subtitle={`${filtered.length} items available`} />
        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 20, paddingBottom: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, transition: 'all .15s', whiteSpace: 'nowrap', flexShrink: 0, background: activeCat === c ? GREEN : SURF, color: activeCat === c ? '#032D1A' : T2, border: activeCat === c ? 'none' : `1px solid ${BORDER}`, boxShadow: activeCat === c ? `0 2px 12px rgba(22,199,132,0.25)` : 'none' }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(148px,1fr))', gap: 12 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ delay: i * .025 }}>
                <div className="group cursor-pointer"
                  style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all .18s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', height: 120, background: SURF, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                    {p.origPrice && <div style={{ position: 'absolute', top: 7, left: 7, background: '#DC2626', color: 'white', fontSize: 9.5, fontWeight: 800, padding: '2px 6px', borderRadius: 5 }}>-{Math.round((1 - p.price / p.origPrice) * 100)}%</div>}
                    {!p.origPrice && p.tag && <div style={{ position: 'absolute', top: 7, left: 7, background: 'rgba(22,199,132,0.15)', color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 5, border: `1px solid rgba(22,199,132,0.25)` }}>{p.tag}</div>}
                  </div>
                  <div style={{ padding: '10px 11px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 9.5, color: T3, marginBottom: 2 }}>{p.brand}</p>
                    <p style={{ fontSize: 12.5, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: T3, marginBottom: 8 }}>{p.weight}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, marginTop: 'auto' }}>
                      <div><span style={{ fontWeight: 800, color: T1, fontSize: 13 }}>₹{p.price}</span>{p.origPrice && <span style={{ fontSize: 10, color: T3, textDecoration: 'line-through', marginLeft: 4 }}>₹{p.origPrice}</span>}</div>
                      <AddBtn id={p.id} cart={cart} add={add} remove={rem} />
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
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: 'min(440px,calc(100vw - 32px))' }}>
            <div style={{ background: GREEN, borderRadius: 14, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 16px 48px rgba(22,199,132,0.4)` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#032D1A' }}>{totalItems}</div>
                <span style={{ fontWeight: 800, color: '#032D1A', fontSize: 13 }}>{totalItems} item{totalItems > 1 ? 's' : ''} · View Cart</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 800, color: '#032D1A' }}>₹{totalPrice}</span>
                <ArrowRight size={18} color="#032D1A" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── EATS TAB ─────────────────── */
function EatsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ position: 'relative', height: 220, borderRadius: 18, overflow: 'hidden', background: '#111827' }}>
        <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&h=440&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.3 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,15,26,0.95) 50%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 480 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>ZyphixEats</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, lineHeight: 1.1, marginBottom: 8, fontSize: 'clamp(1.5rem,3vw,2.2rem)', letterSpacing: '-.04em' }}>
            Local food,<br />delivered fast.
          </h2>
          <p style={{ fontSize: 13, color: T2, marginBottom: 20 }}>Restaurants · Dhabas · Home kitchens · Tiffin services</p>
          <button style={{ background: GREEN, color: '#032D1A', fontSize: 13, fontWeight: 800, padding: '10px 22px', borderRadius: 10, width: 'fit-content' }}>
            Explore Restaurants →
          </button>
        </div>
      </div>

      <div>
        <SectionHeader title="What are you craving?" action="All cuisines" />
        <Carousel>
          {foodCategories.map((fc, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2.5 group">
              <div style={{ width: 68, height: 68, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${BORDER2}`, transition: 'border-color .18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN + '50'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; }}>
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', width: 76, lineHeight: 1.3, color: T3 }}>{fc.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      <div>
        <SectionHeader title="Restaurants Near You" subtitle="Open now · Jammu, J&K" action="See all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14 }}>
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
              <div className="group cursor-pointer" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', transition: 'all .18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ height: 150, background: SURF, overflow: 'hidden', position: 'relative' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  {r.deliveryFee === 0 && (
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(22,199,132,0.12)', color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '3px 8px', borderRadius: 6, border: `1px solid rgba(22,199,132,0.22)` }}>FREE DELIVERY</div>
                  )}
                </div>
                <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 800, color: T1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: T2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cuisine}</p>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12, textAlign: 'right' }}>
                    <StarRating r={r.rating} />
                    <p style={{ fontSize: 11, color: T3, marginTop: 3, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                      <Clock size={10} />{r.eta}
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

/* ─────────────────── BOOK TAB ─────────────────── */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ position: 'relative', height: 196, borderRadius: 18, overflow: 'hidden', background: '#111827' }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(11,15,26,0.97) 50%, transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>ZyphixBook</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, lineHeight: 1.08, fontSize: 'clamp(1.4rem,3vw,2.2rem)', letterSpacing: '-.04em', marginBottom: 8 }}>
            Trusted professionals,<br />at your doorstep.
          </h2>
          <p style={{ fontSize: 13, color: T2 }}>Verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>

      <div>
        <SectionHeader title="Available Services" action="View all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
          {services.map(s => {
            const active = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }} className="cursor-pointer"
                style={{ background: active ? `rgba(22,199,132,0.06)` : CARD, border: `1px solid ${active ? 'rgba(22,199,132,0.3)' : BORDER}`, borderRadius: 16, padding: '18px 16px', transition: 'all .18s' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{s.emoji}</span>
                  {active && <div style={{ width: 18, height: 18, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={10} color="#032D1A" /></div>}
                </div>
                <p style={{ fontWeight: 800, color: T1, fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{s.title}</p>
                <p style={{ fontSize: 11, color: T3, marginBottom: 10 }}>{s.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: T1, fontSize: 14 }}>₹{s.price}</span>
                  <StarRating r={s.rating} />
                </div>
                <p style={{ fontSize: 10, fontWeight: 600, color: GREEN, marginTop: 6 }}>{s.available} pros available</p>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '24px 20px' }}>
              <p style={{ fontWeight: 800, color: T1, fontSize: 15, marginBottom: 4 }}>Select a time slot</p>
              <p style={{ fontSize: 12, color: T3, marginBottom: 20 }}>{services.find(x => x.id === sel)?.title} · ₹{services.find(x => x.id === sel)?.price}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                {SLOTS.map(sl => (
                  <button key={sl} onClick={() => setSlot(sl)}
                    style={{ padding: '10px 4px', borderRadius: 10, fontSize: 12, fontWeight: 600, background: slot === sl ? GREEN : SURF, color: slot === sl ? '#032D1A' : T2, border: `1px solid ${slot === sl ? 'transparent' : BORDER}`, transition: 'all .15s', boxShadow: slot === sl ? `0 4px 14px rgba(22,199,132,0.25)` : 'none' }}>
                    {sl}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setBooked(true)} disabled={!slot}
                style={{ width: '100%', padding: '13px', borderRadius: 12, fontWeight: 800, fontSize: 14, background: booked ? `rgba(22,199,132,0.08)` : slot ? GREEN : `rgba(22,199,132,0.05)`, color: booked ? GREEN : slot ? '#032D1A' : T3, border: `1px solid ${booked ? 'rgba(22,199,132,0.25)' : 'transparent'}`, cursor: slot ? 'pointer' : 'not-allowed', transition: 'all .2s', boxShadow: slot && !booked ? `0 4px 20px rgba(22,199,132,0.3)` : 'none' }}>
                {booked ? '✓ Booking confirmed! See you soon.' : slot ? 'Confirm Booking →' : 'Select a time slot above'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────── MAP TAB ─────────────────── */
function MapTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative', height: 220, borderRadius: 18, overflow: 'hidden', background: SURF, border: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: `rgba(22,199,132,0.08)`, border: `1px solid rgba(22,199,132,0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <MapPin size={26} color={GREEN} />
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.4rem', letterSpacing: '-.03em', marginBottom: 6 }}>Jammu, J&K</p>
        <p style={{ fontSize: 13, color: T2, marginBottom: 20 }}>8 verified stores within 1 km · All open now</p>
        <button style={{ background: GREEN, color: '#032D1A', fontSize: 13, fontWeight: 800, padding: '10px 22px', borderRadius: 10 }}>Open Full Map →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {stores.map((st: any) => (
          <div key={st.id} className="cursor-pointer" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, transition: 'all .18s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: SURF, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {st.type === 'kirana' ? '🏪' : st.type === 'medical' ? '💊' : st.type === 'restaurant' ? '🍽️' : '🏢'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: T1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>{st.distance} · {st.openHours}</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <StarRating r={st.rating} />
              <span style={{ display: 'block', marginTop: 5, background: st.open ? 'rgba(22,199,132,0.08)' : 'rgba(239,68,68,0.08)', color: st.open ? GREEN : '#EF4444', border: `1px solid ${st.open ? 'rgba(22,199,132,0.2)' : 'rgba(239,68,68,0.2)'}`, fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{st.open ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── OFFERS TAB ─────────────────── */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (c: string) => { navigator.clipboard.writeText(c); setCopied(c); setTimeout(() => setCopied(null), 2500); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ position: 'relative', height: 216, borderRadius: 18, overflow: 'hidden', background: '#0a1a12' }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&h=380&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(120deg, rgba(11,15,26,0.97) 50%, transparent)` }} />
        <div style={{ position: 'absolute', inset: 0, padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>New User Offer</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, lineHeight: 1.08, fontSize: 'clamp(1.5rem,3vw,2.3rem)', letterSpacing: '-.04em', marginBottom: 8 }}>
            Flat <span style={{ color: GREEN }}>50% off</span><br />your first order.
          </h2>
          <p style={{ fontSize: 13, color: T2, marginBottom: 18 }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: GREEN, background: 'rgba(0,0,0,.5)', border: `1.5px dashed rgba(22,199,132,0.4)`, padding: '6px 14px', borderRadius: 9, letterSpacing: '.08em' }}>ZYPHIX50</span>
            <button onClick={() => copy('ZYPHIX50')} style={{ background: GREEN, color: '#032D1A', fontSize: 12, fontWeight: 800, padding: '8px 16px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
              {copied === 'ZYPHIX50' ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy Code</>}
            </button>
          </div>
        </div>
      </div>

      <SectionHeader title="All Coupons" subtitle={`${promoCodes.length} active offers`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {promoCodes.map(offer => {
          const isCopied = copied === offer.code;
          return (
            <div key={offer.code} onClick={() => copy(offer.code)} className="cursor-pointer"
              style={{ background: isCopied ? `rgba(22,199,132,0.05)` : CARD, border: `1px solid ${isCopied ? 'rgba(22,199,132,0.2)' : BORDER}`, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, transition: 'all .18s' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '.04em', color: GREEN }}>{offer.code}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: '5px 0 3px' }}>{offer.description}</p>
                <p style={{ fontSize: 11, color: T3 }}>Valid till 31 Dec 2025</p>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 8, background: isCopied ? `rgba(22,199,132,0.1)` : SURF, color: isCopied ? GREEN : T2, border: `1px solid ${isCopied ? 'rgba(22,199,132,0.25)' : BORDER}`, transition: 'all .15s' }}>
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                {isCopied ? 'Done' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `rgba(22,199,132,0.08)`, border: `1px solid rgba(22,199,132,0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎁</div>
          <div>
            <p style={{ fontWeight: 800, color: T1, fontSize: 14 }}>Refer & Earn ₹100</p>
            <p style={{ fontSize: 12, color: T2, marginTop: 3 }}>You & your friend both get ₹100 wallet credits</p>
          </div>
        </div>
        <button style={{ background: GREEN, color: '#032D1A', fontSize: 13, fontWeight: 800, padding: '10px 22px', borderRadius: 10, flexShrink: 0 }}>Share Now →</button>
      </div>
    </div>
  );
}

/* ─────────────────── APP DOWNLOAD ─────────────────── */
function AppDownload() {
  return (
    <div style={{ background: SURF, borderTop: `1px solid ${BORDER}`, padding: '56px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 24, padding: '40px 48px', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>Download Free</p>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, lineHeight: 1.08, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-.04em', marginBottom: 12 }}>
              Get the ZYPHIX app.<br />Order in 30 seconds.
            </h2>
            <p style={{ color: T2, fontSize: 14, marginBottom: 24, lineHeight: 1.65 }}>Exclusive app-only deals · Live tracking · Works offline</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[{ icon: '🍎', top: 'Download on the', bot: 'App Store' }, { icon: '▶', top: 'Get it on', bot: 'Google Play' }].map((a, i) => (
                <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 12, background: SURF, border: `1px solid ${BORDER2}`, transition: 'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN + '40'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; }}>
                  <span style={{ fontSize: 26 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: 9, color: T3, fontWeight: 500 }}>{a.top}</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: T1 }}>{a.bot}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: `rgba(22,199,132,0.08)`, border: `1px solid rgba(22,199,132,0.18)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 12px' }}>📱</div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.4rem' }}>4.8 ★</p>
            <p style={{ fontSize: 12, color: T3 }}>50,000+ ratings</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── FOOTER ─────────────────── */
function Footer() {
  return (
    <footer style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="#032D1A" fill="#032D1A" />
              </div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.15rem', letterSpacing: '-.03em', color: T1 }}>
                ZYP<span style={{ color: GREEN }}>HIX</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: T3, lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>India's SuperLocal App — groceries, food & services delivered in 30 minutes across Jammu & Kashmir.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[<Twitter size={14} />, <Instagram size={14} />, <Linkedin size={14} />, <Phone size={14} />].map((ic, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: SURF, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T2, transition: 'all .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER2; (e.currentTarget as HTMLElement).style.color = T1; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = T2; }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Services', links: ['ZyphixNow', 'ZyphixEats', 'ZyphixBook', 'Kirana Near Me', 'Offers'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Blog', 'Investors'] },
            { title: 'Support', links: ['Help Center', 'Contact Us', 'Refund Policy', 'Privacy Policy', 'Terms'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontWeight: 700, color: T1, fontSize: 13, marginBottom: 16 }}>{title}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(l => (
                  <li key={l}><a href="#" style={{ fontSize: 13, color: T3, transition: 'color .15s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = T2; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T3; }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 12, color: T3 }}>© 2025 ZYPHIX Technologies Pvt. Ltd. · Jammu, J&K, India</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, display: 'block' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── SERVICE TABS ─────────────────── */
const TABS: { id: TabId; label: string }[] = [
  { id: 'now',    label: '⚡ ZyphixNow' },
  { id: 'eats',   label: '🍱 ZyphixEats' },
  { id: 'book',   label: '📅 ZyphixBook' },
  { id: 'map',    label: '📍 Kirana Near Me' },
  { id: 'offers', label: '🏷️ Offers' },
];

/* ─────────────────── ROOT ─────────────────── */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const CONTENT: Record<TabId, React.ReactNode> = {
    now: <NowTab />, eats: <EatsTab />, book: <BookTab />, map: <MapTab />, offers: <OffersTab />
  };

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <AnnoBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <HowItWorks />

      {/* Service tab bar */}
      <div className="sticky z-40" style={{ top: 0, background: 'rgba(11,15,26,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', gap: 4 }}>
          {TABS.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding: '14px 20px', fontSize: 13, fontWeight: active ? 700 : 500, color: active ? T1 : T2, borderBottom: active ? `2px solid ${GREEN}` : '2px solid transparent', flexShrink: 0, whiteSpace: 'nowrap', transition: 'all .15s', background: 'none' }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AppDownload />
      <Footer />
    </div>
  );
}
