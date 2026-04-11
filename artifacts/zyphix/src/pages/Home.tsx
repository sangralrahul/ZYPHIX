import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User,
  Plus, Minus, Star, Clock, ChevronRight, ChevronLeft,
  Zap, Shield, Package, Truck, Check, Copy,
  ArrowRight, Phone, Instagram, Twitter, Linkedin, Menu
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

/* ─── Design tokens ─── */
type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const GREEN    = '#0EA86E';
const GREEN_DK = '#0C9060';
const GREEN_BG = 'rgba(14,168,110,0.07)';
const GREEN_BD = 'rgba(14,168,110,0.2)';

const BG      = '#F5F7FA';
const SURF    = '#FFFFFF';
const CARD    = '#FFFFFF';
const BORDER  = '#E8EDF5';

const T1 = '#0F172A';
const T2 = '#64748B';
const T3 = '#94A3B8';

const SH = '0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06)';
const SH2 = '0 2px 8px rgba(0,0,0,.08), 0 8px 32px rgba(0,0,0,.08)';

/* ─── utils ─── */
function useCountdown(init: number) {
  const [s, setS] = useState(init);
  useEffect(() => { const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const p = (n: number) => String(n).padStart(2, '0');
  return { h: p(Math.floor(s / 3600)), m: p(Math.floor((s % 3600) / 60)), s: p(s % 60) };
}

function Carousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const sc = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div className="relative group/c">
      <button onClick={() => sc(-1)} className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SH2 }}>
        <ChevronLeft size={15} color={T1} />
      </button>
      <div ref={ref} className="carousel">{children}</div>
      <button onClick={() => sc(1)} className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SH2 }}>
        <ChevronRight size={15} color={T1} />
      </button>
    </div>
  );
}

function SH_({ title, sub, action }: { title: string; sub?: string; action?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: T1, letterSpacing: '-.02em' }}>{title}</h2>
        {sub && <p style={{ fontSize: 12, color: T3, marginTop: 3 }}>{sub}</p>}
      </div>
      {action && (
        <button style={{ fontSize: 12, fontWeight: 700, color: GREEN, display: 'flex', alignItems: 'center', gap: 3 }}>
          {action} <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

function Stars({ r }: { r: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 700, color: '#D97706' }}>
      <Star size={10} fill="#D97706" stroke="none" />{r}
    </span>
  );
}

/* ═══════════════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════════════ */
function AnnoBar() {
  return (
    <div style={{ background: GREEN, padding: '9px 16px', textAlign: 'center' }}>
      <p style={{ fontSize: 12.5, fontWeight: 700, color: '#fff', letterSpacing: '.01em' }}>
        🎉 Free delivery on your first order · Code <strong style={{ letterSpacing: '.06em', background: 'rgba(255,255,255,0.18)', padding: '1px 6px', borderRadius: 4 }}>ZYPHIX50</strong> · Now live across India
      </p>
    </div>
  );
}

/* ═══════════════════════════════════
   NAVBAR
═══════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className="sticky top-0 z-50" style={{ background: SURF, borderBottom: `1px solid ${scrolled ? BORDER : 'transparent'}`, boxShadow: scrolled ? SH : 'none', transition: 'all .2s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12, height: 64 }}>

        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-.04em', color: T1 }}>
            Zyp<span style={{ color: GREEN }}>hix</span>
          </span>
        </a>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: BORDER, flexShrink: 0 }} className="hidden md:block" />

        {/* Location */}
        <button className="hidden md:flex items-center gap-2" style={{ flexShrink: 0, transition: 'all .15s' }}>
          <MapPin size={15} color={GREEN} />
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: 9, fontWeight: 600, color: T3, textTransform: 'uppercase', letterSpacing: '.07em', lineHeight: 1 }}>Deliver to</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
              <span style={{ fontWeight: 700, color: T1, fontSize: 13.5, lineHeight: 1 }}>Select Location</span>
              <ChevronDown size={12} color={T3} />
            </div>
          </div>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: BORDER, flexShrink: 0 }} className="hidden md:block" />

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 520 }}>
          <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: focused ? GREEN : T3, zIndex: 1, transition: 'color .15s' }} />
          <input type="text" placeholder="Search groceries, food, services..."
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ width: '100%', paddingLeft: 44, paddingRight: 16, paddingTop: 11, paddingBottom: 11, borderRadius: 12, background: BG, border: `1.5px solid ${focused ? GREEN + '60' : BORDER}`, fontSize: 13.5, color: T1, fontFamily: 'inherit', fontWeight: 500, boxShadow: focused ? `0 0 0 3px ${GREEN}14` : 'none', outline: 'none', transition: 'all .18s' }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button className="hidden sm:flex items-center gap-2" style={{ padding: '10px 16px', borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 13, fontWeight: 600, color: T2, background: SURF, transition: 'all .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN + '60'; (e.currentTarget as HTMLElement).style.color = GREEN; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; (e.currentTarget as HTMLElement).style.color = T2; }}>
            <User size={15} /><span className="hidden lg:inline">Sign in</span>
          </button>
          <button className="relative flex items-center gap-2" style={{ padding: '10px 18px', borderRadius: 10, background: GREEN, fontSize: 13, fontWeight: 800, color: '#fff', boxShadow: `0 2px 10px rgba(14,168,110,0.3)`, transition: 'all .15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = GREEN_DK}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = GREEN}>
            <ShoppingCart size={15} /><span className="hidden sm:inline">Cart</span>
            <span style={{ position: 'absolute', top: -7, right: -7, width: 19, height: 19, borderRadius: '50%', background: '#EF4444', color: 'white', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   HERO
═══════════════════════════════════ */
function Hero() {
  const heroProds = products.slice(0, 6);
  return (
    <div style={{ background: `linear-gradient(165deg, #F0FBF6 0%, #F5F7FA 40%, #EEF2FF 100%)`, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle decorative circles */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'rgba(14,168,110,0.06)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: '40%', width: 240, height: 240, borderRadius: '50%', background: 'rgba(99,102,241,0.04)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 72px', display: 'flex', alignItems: 'center', gap: 48 }}>

        {/* ── Left copy ── */}
        <motion.div style={{ flex: 1, minWidth: 0 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [.22,1,.36,1] }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: GREEN_BG, border: `1px solid ${GREEN_BD}`, borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.07em' }}>NOW LIVE ACROSS INDIA</span>
          </div>

          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 1.04, letterSpacing: '-.045em', marginBottom: 18 }}>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', color: T1 }}>India's #1</span>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', color: T1 }}>SuperLocal App.</span>
            <span style={{ display: 'block', fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)', color: GREEN, marginTop: 4 }}>30 Minutes.</span>
          </h1>

          <p style={{ fontSize: 15, color: T2, lineHeight: 1.7, marginBottom: 28, maxWidth: 430, fontWeight: 400 }}>
            Groceries, food & services — from your nearest kirana, dhaba & professional. Available in 100+ cities across India.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 20, maxWidth: 450 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T3 }} />
            <input placeholder="Tomatoes, Amul Milk, Plumber..." style={{ width: '100%', paddingLeft: 46, paddingRight: 116, paddingTop: 13, paddingBottom: 13, borderRadius: 14, background: SURF, border: `1.5px solid ${BORDER}`, fontSize: 14, color: T1, fontFamily: 'inherit', fontWeight: 500, boxShadow: SH, outline: 'none' }} />
            <button style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', background: GREEN, color: '#fff', fontWeight: 800, fontSize: 13, padding: '8px 16px', borderRadius: 10 }}>Search</button>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 26px', borderRadius: 12, background: GREEN, color: '#fff', fontWeight: 800, fontSize: 14, boxShadow: `0 4px 20px rgba(14,168,110,0.3)` }}>
              <Zap size={16} /> Order Now — Free Delivery
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 22px', borderRadius: 12, background: SURF, color: T2, fontWeight: 600, fontSize: 14, border: `1.5px solid ${BORDER}`, boxShadow: SH }}>
              How it works <ArrowRight size={14} />
            </button>
          </div>

          {/* App badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            {[{ ic: '🍎', top: 'Download on the', bot: 'App Store' }, { ic: '▶', top: 'Get it on', bot: 'Google Play' }].map((a, i) => (
              <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderRadius: 12, background: T1, border: 'none' }}>
                <span style={{ fontSize: 20 }}>{a.ic}</span>
                <div>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{a.top}</p>
                  <p style={{ fontSize: 14, color: '#fff', fontWeight: 800 }}>{a.bot}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
            {[['5L+', 'Happy customers'], ['10K+', 'Partner stores'], ['30 min', 'Avg. delivery'], ['₹0', 'Surge pricing']].map(([v, l], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 + i * .1 }}
                style={{ paddingRight: i < 3 ? 24 : 0, paddingLeft: i > 0 ? 24 : 0, borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.15rem,2.2vw,1.6rem)', color: T1, lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: 11, color: T3, marginTop: 3 }}>{l}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: product grid ── */}
        <motion.div className="hidden lg:block" style={{ width: 368, flexShrink: 0 }} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {heroProds.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 + i * .08 }}
                className="group cursor-pointer"
                style={{ background: SURF, borderRadius: 18, overflow: 'hidden', boxShadow: SH, border: `1px solid ${BORDER}`, transform: i % 2 === 1 ? 'translateY(18px)' : 'none', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = i % 2 === 1 ? 'translateY(15px)' : 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = i % 2 === 1 ? 'translateY(18px)' : 'none'; }}>
                <div style={{ height: 100, background: BG, overflow: 'hidden', position: 'relative' }}>
                  <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                  {p.origPrice && (
                    <div style={{ position: 'absolute', top: 7, left: 7, background: '#EF4444', color: 'white', fontSize: 9.5, fontWeight: 800, padding: '2px 7px', borderRadius: 6 }}>
                      -{Math.round((1 - p.price / p.origPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ fontSize: 9.5, color: T3, marginBottom: 2 }}>{p.brand}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, color: T1, fontSize: 13 }}>₹{p.price}</span>
                    <button style={{ width: 26, height: 26, borderRadius: 8, background: GREEN_BG, border: `1.5px solid ${GREEN_BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={12} color={GREEN} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div style={{ marginTop: 22 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 20px', background: GREEN_BG, border: `1px solid ${GREEN_BD}`, borderRadius: 12 }}>
              <Truck size={14} color={GREEN} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: GREEN }}>Free delivery · 30 min · 100+ cities</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   TRUST BAR
═══════════════════════════════════ */
function TrustBar() {
  const items = [
    { icon: <Zap size={18} color={GREEN} />, v: '30 Min', l: 'Delivery Guaranteed' },
    { icon: <Package size={18} color={T2} />, v: '10,000+', l: 'Verified Partner Stores' },
    { icon: <Shield size={18} color={T2} />, v: '100%', l: 'Secure & Verified' },
    { icon: <Truck size={18} color={T2} />, v: '₹0', l: 'Surge Pricing Ever' },
  ];
  return (
    <div style={{ background: SURF, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {items.map(({ icon, v, l }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
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

/* ═══════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { icon: <MapPin size={22} color={GREEN} />, n: '01', title: 'Set Your Location', desc: 'Enter your address. We instantly find verified kirana stores, restaurants & service pros near you.' },
    { icon: <ShoppingCart size={22} color={GREEN} />, n: '02', title: 'Pick What You Need', desc: 'Browse 1,000+ items — groceries, food, medicines & services. Available 24/7, pan India.' },
    { icon: <Truck size={22} color={GREEN} />, n: '03', title: 'Delivered in 30 Min', desc: 'Live order tracking. Your local partner packs and delivers to your door. Zero surge pricing.' },
  ];
  return (
    <div style={{ background: BG, padding: '60px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>How it works</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', letterSpacing: '-.04em', color: T1, lineHeight: 1.08 }}>
            Order in under <span style={{ color: GREEN }}>60 seconds</span>
          </h2>
          <p style={{ fontSize: 14, color: T2, marginTop: 12 }}>Simple, fast, and built for every city in India.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="grid-cols-1 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
              <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '28px 24px', boxShadow: SH }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: GREEN_BG, border: `1px solid ${GREEN_BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.4rem', color: `rgba(14,168,110,0.12)`, letterSpacing: '-.06em' }}>{s.n}</span>
                </div>
                <h3 style={{ fontWeight: 800, color: T1, fontSize: '0.95rem', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: T2, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   ADD BUTTON
═══════════════════════════════════ */
function AddBtn({ id, cart, add, remove }: { id: string; cart: Record<string, number>; add: (id: string) => void; remove: (id: string) => void }) {
  if (cart[id]) return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: GREEN, borderRadius: 8, overflow: 'hidden' }}>
      <button onClick={e => { e.stopPropagation(); remove(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Minus size={11} color="#fff" />
      </button>
      <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', minWidth: 18, textAlign: 'center' }}>{cart[id]}</span>
      <button onClick={e => { e.stopPropagation(); add(id); }} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Plus size={11} color="#fff" />
      </button>
    </div>
  );
  return (
    <button onClick={e => { e.stopPropagation(); add(id); }}
      style={{ width: 28, height: 28, borderRadius: 8, background: GREEN_BG, border: `1.5px solid ${GREEN_BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GREEN; (e.currentTarget as HTMLElement).style.borderColor = GREEN; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GREEN_BG; (e.currentTarget as HTMLElement).style.borderColor = GREEN_BD; }}>
      <Plus size={12} color={GREEN} />
    </button>
  );
}

/* ═══════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════ */
function ProdCard({ p, cart, add, remove }: { p: typeof products[0]; cart: Record<string, number>; add: (id: string) => void; remove: (id: string) => void }) {
  const disc = p.origPrice ? Math.round((1 - p.price / p.origPrice) * 100) : null;
  return (
    <div className="snap-start group cursor-pointer"
      style={{ width: 166, flexShrink: 0, background: SURF, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', boxShadow: SH, transition: 'all .2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
      <div style={{ position: 'relative', height: 120, background: BG, overflow: 'hidden' }}>
        <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
        {disc && <div style={{ position: 'absolute', top: 7, left: 7, background: '#EF4444', color: 'white', fontSize: 9.5, fontWeight: 800, padding: '2px 7px', borderRadius: 6 }}>-{disc}%</div>}
        {!disc && p.tag && <div style={{ position: 'absolute', top: 7, left: 7, background: GREEN_BG, color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: `1px solid ${GREEN_BD}` }}>{p.tag}</div>}
      </div>
      <div style={{ padding: '10px 12px' }}>
        <p style={{ fontSize: 9.5, color: T3, marginBottom: 2, fontWeight: 500 }}>{p.brand}</p>
        <p style={{ fontSize: 12.5, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
        <p style={{ fontSize: 10, color: T3, marginBottom: 9 }}>{p.weight}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
          <div><span style={{ fontWeight: 800, color: T1, fontSize: 13 }}>₹{p.price}</span>{p.origPrice && <span style={{ fontSize: 10, color: T3, textDecoration: 'line-through', marginLeft: 4 }}>₹{p.origPrice}</span>}</div>
          <AddBtn id={p.id} cart={cart} add={add} remove={remove} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   NOW TAB
═══════════════════════════════════ */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const cd = useCountdown(4 * 3600 + 47 * 60 + 22);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalP = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);
  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Bakery', 'Personal Care'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

      {/* Promo banners */}
      <Carousel>
        {[
          { tag: 'New User Offer', h: '50% off your first order', sub: 'Code ZYPHIX50 · Max ₹100 discount', code: 'ZYPHIX50', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=800&h=320&fit=crop&q=80', bg: '#F0FBF6' },
          { tag: 'Partner Stores', h: 'Real kirana. Real fast.', sub: '10,000+ local stores across India · Zero surge pricing', code: '', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=320&fit=crop&q=80', bg: '#FFF7ED' },
          { tag: 'Pharmacy', h: 'Medicines in 30 minutes', sub: 'Prescription & OTC · All brands available', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=320&fit=crop&q=80', bg: '#EFF6FF' },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0 cursor-pointer" style={{ width: 'min(600px,85vw)', height: 200, borderRadius: 20, overflow: 'hidden', position: 'relative', background: b.bg, border: `1px solid ${BORDER}`, flexShrink: 0, boxShadow: SH }}>
            <img src={b.img} alt="" className="absolute inset-0 w-full h-full img-cover" style={{ opacity: 0.22 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,.97) 45%, rgba(255,255,255,.2))' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-block', background: GREEN_BG, color: GREEN, border: `1px solid ${GREEN_BD}`, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', padding: '3px 10px', borderRadius: 6, width: 'fit-content' }}>{b.tag}</span>
              <div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: 'clamp(1.2rem,2.5vw,1.65rem)', lineHeight: 1.15, marginBottom: 5 }}>{b.h}</p>
                <p style={{ fontSize: 12, color: T2, marginBottom: b.code ? 12 : 0 }}>{b.sub}</p>
                {b.code && <span style={{ display: 'inline-block', fontWeight: 800, fontSize: 12, letterSpacing: '.08em', color: GREEN, background: 'rgba(14,168,110,0.08)', border: `1.5px dashed ${GREEN}66`, padding: '5px 12px', borderRadius: 8 }}>{b.code}</span>}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Categories */}
      <div>
        <SH_ title="Shop by Category" action="All categories" />
        <Carousel>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.name ? 'All' : cat.name)} className="snap-start shrink-0 flex flex-col items-center gap-2.5 group">
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: activeCat === cat.name ? `2.5px solid ${GREEN}` : `2.5px solid ${BORDER}`, boxShadow: activeCat === cat.name ? `0 0 0 3px ${GREEN}1A, ${SH}` : SH, transition: 'all .2s' }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', width: 76, lineHeight: 1.3, color: activeCat === cat.name ? T1 : T2 }}>{cat.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Flash deals */}
      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', boxShadow: SH }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', borderBottom: `1px solid ${BORDER}`, background: '#FFFBEB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Zap size={18} color="#D97706" fill="#D97706" />
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: 14, lineHeight: 1.1 }}>Flash Deals</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>Best prices · Today only</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: T2, marginRight: 4 }}>Ends in</span>
            {[cd.h, cd.m, cd.s].map((v, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: T1, borderRadius: 8, padding: '5px 10px', minWidth: 42 }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', lineHeight: 1 }}>{v}</span>
                  <span style={{ fontSize: 7, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginTop: 2, letterSpacing: '.04em' }}>{['HRS', 'MIN', 'SEC'][i]}</span>
                </div>
                {i < 2 && <span style={{ fontWeight: 800, color: T3 }}>:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <Carousel>
            {products.filter(p => p.origPrice).slice(0, 8).map(p => <ProdCard key={p.id} p={p} cart={cart} add={add} remove={rem} />)}
          </Carousel>
        </div>
      </div>

      {/* Trending */}
      <div>
        <SH_ title="Trending Near You" sub="Most ordered across India today" action="See all" />
        <Carousel>
          {products.map(p => <ProdCard key={p.id} p={p} cart={cart} add={add} remove={rem} />)}
        </Carousel>
      </div>

      {/* All products */}
      <div>
        <SH_ title="All Products" sub={`${filtered.length} items available`} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 20, paddingBottom: 4 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600, transition: 'all .15s', whiteSpace: 'nowrap', flexShrink: 0, background: activeCat === c ? GREEN : SURF, color: activeCat === c ? '#fff' : T2, border: `1.5px solid ${activeCat === c ? 'transparent' : BORDER}`, boxShadow: activeCat === c ? `0 2px 10px rgba(14,168,110,0.25)` : SH }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(148px,1fr))', gap: 12 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .94 }} transition={{ delay: i * .025 }}>
                <div className="group cursor-pointer"
                  style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', boxShadow: SH, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', height: 120, background: BG, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                    {p.origPrice && <div style={{ position: 'absolute', top: 7, left: 7, background: '#EF4444', color: 'white', fontSize: 9.5, fontWeight: 800, padding: '2px 7px', borderRadius: 6 }}>-{Math.round((1 - p.price / p.origPrice) * 100)}%</div>}
                    {!p.origPrice && p.tag && <div style={{ position: 'absolute', top: 7, left: 7, background: GREEN_BG, color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: `1px solid ${GREEN_BD}` }}>{p.tag}</div>}
                  </div>
                  <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
        {total > 0 && (
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: 'min(440px,calc(100vw - 32px))' }}>
            <div style={{ background: T1, borderRadius: 16, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, color: '#fff' }}>{total}</div>
                <span style={{ fontWeight: 800, color: '#fff', fontSize: 13 }}>{total} item{total > 1 ? 's' : ''} · View Cart</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 800, color: '#fff' }}>₹{totalP}</span>
                <ArrowRight size={18} color="#fff" />
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ position: 'relative', height: 220, borderRadius: 20, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&h=440&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.8) 42%, rgba(0,0,0,.1))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 500 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>ZyphixEats</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, marginBottom: 8, fontSize: 'clamp(1.5rem,3vw,2.3rem)', letterSpacing: '-.04em' }}>
            Local food,<br />delivered fast.
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 20 }}>Restaurants · Dhabas · Home kitchens · Cloud kitchens · Available across India</p>
          <button style={{ background: GREEN, color: '#fff', fontSize: 13, fontWeight: 800, padding: '11px 24px', borderRadius: 10, width: 'fit-content' }}>Explore Restaurants →</button>
        </div>
      </div>

      <div>
        <SH_ title="What are you craving?" action="All cuisines" />
        <Carousel>
          {foodCategories.map((fc, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2.5 group">
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${BORDER}`, boxShadow: SH, transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}>
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, textAlign: 'center', width: 76, lineHeight: 1.3, color: T2 }}>{fc.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      <div>
        <SH_ title="Restaurants Near You" sub="Open now · Delivering to your area" action="See all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
              <div className="group cursor-pointer" style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, overflow: 'hidden', boxShadow: SH, transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                <div style={{ height: 152, background: BG, overflow: 'hidden', position: 'relative' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  {r.deliveryFee === 0 && <div style={{ position: 'absolute', top: 10, right: 10, background: GREEN_BG, color: GREEN, fontSize: 9.5, fontWeight: 700, padding: '3px 9px', borderRadius: 7, border: `1px solid ${GREEN_BD}`, backdropFilter: 'blur(4px)' }}>FREE DELIVERY</div>}
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 800, color: T1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: T2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.cuisine}</p>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12, textAlign: 'right' }}>
                    <Stars r={r.rating} />
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

/* ═══════════════════════════════════
   BOOK TAB
═══════════════════════════════════ */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ position: 'relative', height: 200, borderRadius: 20, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.82) 48%, rgba(0,0,0,.1))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>ZyphixBook</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.4rem,3vw,2.2rem)', letterSpacing: '-.04em', marginBottom: 8 }}>
            Trusted professionals,<br />at your doorstep.
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>

      <div>
        <SH_ title="Available Services" action="View all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
          {services.map(s => {
            const active = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }} className="cursor-pointer"
                style={{ background: SURF, border: `1.5px solid ${active ? GREEN : BORDER}`, borderRadius: 18, padding: '18px 16px', transition: 'all .18s', boxShadow: active ? `0 0 0 3px ${GREEN}18, ${SH}` : SH }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{s.emoji}</span>
                  {active && <div style={{ width: 19, height: 19, borderRadius: '50%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={10} color="#fff" /></div>}
                </div>
                <p style={{ fontWeight: 800, color: T1, fontSize: 13, lineHeight: 1.3, marginBottom: 3 }}>{s.title}</p>
                <p style={{ fontSize: 11, color: T3, marginBottom: 10 }}>{s.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: T1, fontSize: 14 }}>₹{s.price}</span>
                  <Stars r={s.rating} />
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
            <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, padding: '24px 20px', boxShadow: SH }}>
              <p style={{ fontWeight: 800, color: T1, fontSize: 15, marginBottom: 4 }}>Select a time slot</p>
              <p style={{ fontSize: 12, color: T3, marginBottom: 20 }}>{services.find(x => x.id === sel)?.title} · ₹{services.find(x => x.id === sel)?.price}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                {SLOTS.map(sl => (
                  <button key={sl} onClick={() => setSlot(sl)}
                    style={{ padding: '10px 4px', borderRadius: 10, fontSize: 12, fontWeight: 600, background: slot === sl ? GREEN : BG, color: slot === sl ? '#fff' : T1, border: `1.5px solid ${slot === sl ? 'transparent' : BORDER}`, transition: 'all .15s', boxShadow: slot === sl ? `0 4px 14px rgba(14,168,110,0.25)` : 'none' }}>
                    {sl}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setBooked(true)} disabled={!slot}
                style={{ width: '100%', padding: '14px', borderRadius: 12, fontWeight: 800, fontSize: 14, background: booked ? '#F0FBF6' : slot ? GREEN : BG, color: booked ? GREEN : slot ? '#fff' : T3, border: `1.5px solid ${booked ? GREEN_BD : 'transparent'}`, cursor: slot ? 'pointer' : 'not-allowed', transition: 'all .2s', boxShadow: slot && !booked ? `0 4px 20px rgba(14,168,110,0.3)` : 'none' }}>
                {booked ? '✓ Booking confirmed! See you soon.' : slot ? 'Confirm Booking →' : 'Select a time slot above'}
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: SH }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: GREEN_BG, border: `1px solid ${GREEN_BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <MapPin size={26} color={GREEN} />
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.5rem', letterSpacing: '-.03em', marginBottom: 6 }}>Your Location</p>
        <p style={{ fontSize: 13, color: T2, marginBottom: 20 }}>Find verified stores, restaurants & pros near you</p>
        <button style={{ background: GREEN, color: '#fff', fontSize: 13, fontWeight: 800, padding: '11px 24px', borderRadius: 10, boxShadow: `0 4px 16px rgba(14,168,110,0.25)` }}>Open Full Map →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {stores.map((st: any) => (
          <div key={st.id} className="cursor-pointer" style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: SH, transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: BG, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {st.type === 'kirana' ? '🏪' : st.type === 'medical' ? '💊' : st.type === 'restaurant' ? '🍽️' : '🏢'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: T1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>{st.distance} · {st.openHours}</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <Stars r={st.rating} />
              <span style={{ display: 'block', marginTop: 5, background: st.open ? GREEN_BG : 'rgba(239,68,68,0.07)', color: st.open ? GREEN : '#EF4444', border: `1px solid ${st.open ? GREEN_BD : 'rgba(239,68,68,0.2)'}`, fontSize: 9.5, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>{st.open ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   OFFERS TAB
═══════════════════════════════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (c: string) => { navigator.clipboard.writeText(c); setCopied(c); setTimeout(() => setCopied(null), 2500); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ position: 'relative', height: 220, borderRadius: 20, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000&h=380&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,.88) 48%, rgba(0,0,0,.1))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>New User Offer</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.5rem,3vw,2.4rem)', letterSpacing: '-.04em', marginBottom: 8 }}>
            Flat 50% off<br />your first order.
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 18 }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#fff', background: 'rgba(255,255,255,0.12)', border: '1.5px dashed rgba(255,255,255,0.35)', padding: '6px 14px', borderRadius: 9, letterSpacing: '.08em' }}>ZYPHIX50</span>
            <button onClick={() => copy('ZYPHIX50')} style={{ background: GREEN, color: '#fff', fontSize: 12, fontWeight: 800, padding: '8px 16px', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
              {copied === 'ZYPHIX50' ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy Code</>}
            </button>
          </div>
        </div>
      </div>

      <SH_ title="All Coupons" sub={`${promoCodes.length} active offers`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
        {promoCodes.map(offer => {
          const isCopied = copied === offer.code;
          return (
            <div key={offer.code} onClick={() => copy(offer.code)} className="cursor-pointer"
              style={{ background: SURF, border: `1.5px solid ${isCopied ? GREEN : BORDER}`, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, boxShadow: isCopied ? `0 0 0 3px ${GREEN}14, ${SH}` : SH, transition: 'all .2s' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '.04em', color: GREEN }}>{offer.code}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: T1, margin: '5px 0 3px' }}>{offer.description}</p>
                <p style={{ fontSize: 11, color: T3 }}>Valid till 31 Dec 2025</p>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '7px 13px', borderRadius: 8, background: isCopied ? GREEN_BG : BG, color: isCopied ? GREEN : T2, border: `1.5px solid ${isCopied ? GREEN_BD : BORDER}`, transition: 'all .15s' }}>
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
                {isCopied ? 'Done' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between', boxShadow: SH }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: GREEN_BG, border: `1px solid ${GREEN_BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎁</div>
          <div>
            <p style={{ fontWeight: 800, color: T1, fontSize: 14 }}>Refer & Earn ₹100</p>
            <p style={{ fontSize: 12, color: T2, marginTop: 3 }}>You & your friend both get ₹100 wallet credits</p>
          </div>
        </div>
        <button style={{ background: GREEN, color: '#fff', fontSize: 13, fontWeight: 800, padding: '11px 22px', borderRadius: 10, flexShrink: 0, boxShadow: `0 4px 14px rgba(14,168,110,0.25)` }}>Share Now →</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   APP DOWNLOAD
═══════════════════════════════════ */
function AppDownload() {
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BORDER}`, padding: '60px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: `linear-gradient(135deg, #0B3D26 0%, #0F5C36 100%)`, borderRadius: 24, padding: '48px 52px', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 500 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>Download Free</p>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.9rem,3.5vw,2.7rem)', letterSpacing: '-.04em', marginBottom: 12 }}>
              Get the Zyphix app.<br />Order in 30 seconds.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 28, lineHeight: 1.65 }}>Exclusive app-only deals · Live order tracking · Works offline</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[{ ic: '🍎', top: 'Download on the', bot: 'App Store' }, { ic: '▶', top: 'Get it on', bot: 'Google Play' }].map((a, i) => (
                <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderRadius: 12, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'}>
                  <span style={{ fontSize: 26 }}>{a.ic}</span>
                  <div>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{a.top}</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{a.bot}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 12px' }}>📱</div>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.5rem' }}>4.8 ★</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>50,000+ ratings</p>
          </div>
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
    <footer style={{ background: SURF, borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '52px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={15} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-.04em', color: T1 }}>
                Zyp<span style={{ color: GREEN }}>hix</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: T2, lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>India's SuperLocal App — groceries, food & services delivered in 30 minutes. Now serving 100+ cities pan India.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[<Twitter size={14} />, <Instagram size={14} />, <Linkedin size={14} />, <Phone size={14} />].map((ic, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, background: BG, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T2, transition: 'all .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GREEN; (e.currentTarget as HTMLElement).style.color = GREEN; }}
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
                {links.map(l => <li key={l}><a href="#" style={{ fontSize: 13, color: T2, transition: 'color .15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = GREEN} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T2}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontSize: 12, color: T3 }}>© 2025 Zyphix Technologies Pvt. Ltd. · Bengaluru, India</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'block' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: GREEN }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════
   TABS + ROOT
═══════════════════════════════════ */
const TABS: { id: TabId; label: string }[] = [
  { id: 'now',    label: '⚡ ZyphixNow' },
  { id: 'eats',   label: '🍱 ZyphixEats' },
  { id: 'book',   label: '📅 ZyphixBook' },
  { id: 'map',    label: '📍 Kirana Near Me' },
  { id: 'offers', label: '🏷️ Offers' },
];

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

      {/* Tab bar */}
      <div className="sticky z-40" style={{ top: 0, background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${BORDER}`, boxShadow: SH }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', gap: 4 }}>
          {TABS.map(t => {
            const active = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding: '15px 20px', fontSize: 13.5, fontWeight: active ? 700 : 500, color: active ? GREEN : T2, borderBottom: `2px solid ${active ? GREEN : 'transparent'}`, flexShrink: 0, whiteSpace: 'nowrap', transition: 'all .15s', background: 'none' }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
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
