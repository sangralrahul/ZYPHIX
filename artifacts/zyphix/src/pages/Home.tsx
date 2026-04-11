import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User,
  Plus, Minus, Star, Clock, ChevronRight, ChevronLeft,
  Zap, Shield, Package, Truck, Check, Copy, ArrowRight,
  Phone, Instagram, Twitter, Linkedin, PlayCircle
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

/* ─── Tokens ─── */
const G   = '#0DA366';   // primary green
const G2  = '#0A8C58';   // green hover
const BG  = '#F8F9FA';
const W   = '#FFFFFF';
const T1  = '#111827';
const T2  = '#6B7280';
const T3  = '#9CA3AF';
const BD  = '#E5E7EB';
const SH  = '0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06)';
const SH2 = '0 4px 12px rgba(0,0,0,.1), 0 16px 40px rgba(0,0,0,.1)';

/* ═══════════════ LOGO ═══════════════ */
function LogoMark({ size = 32, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: Math.round(size * 0.28), background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 2px 8px rgba(13,163,102,.35)` }}>
        <Zap size={Math.round(size * 0.5)} color="#fff" fill="#fff" />
      </div>
      <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: size * 0.575, letterSpacing: '-.04em', color: dark ? '#fff' : T1, lineHeight: 1 }}>
        Zyp<span style={{ color: G }}>hix</span>
      </span>
    </div>
  );
}

/* ─── Helpers ─── */
function useCountdown(n: number) {
  const [s, setS] = useState(n);
  useEffect(() => { const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const p = (v: number) => String(v).padStart(2, '0');
  return { h: p(Math.floor(s / 3600)), m: p(Math.floor((s % 3600) / 60)), s: p(s % 60) };
}
function Scroller({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const sc = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 320, behavior: 'smooth' });
  return (
    <div className="relative group/s">
      <button onClick={() => sc(-1)} className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/s:opacity-100 transition-all" style={{ background: W, border: `1px solid ${BD}`, boxShadow: SH2 }}>
        <ChevronLeft size={14} color={T1} />
      </button>
      <div ref={ref} className="carousel">{children}</div>
      <button onClick={() => sc(1)} className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/s:opacity-100 transition-all" style={{ background: W, border: `1px solid ${BD}`, boxShadow: SH2 }}>
        <ChevronRight size={14} color={T1} />
      </button>
    </div>
  );
}
function Row({ title, sub, action }: { title: string; sub?: string; action?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: T1, letterSpacing: '-.025em' }}>{title}</h2>
        {sub && <p style={{ fontSize: 12, color: T3, marginTop: 3 }}>{sub}</p>}
      </div>
      {action && (
        <button style={{ fontSize: 12, fontWeight: 700, color: G, display: 'flex', alignItems: 'center', gap: 2 }}>
          {action} <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}
function Rat({ r }: { r: number }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11.5, fontWeight: 700, color: '#B45309' }}>
    <Star size={10} fill="#D97706" stroke="none" />{r}
  </span>;
}

/* ═══════════════ ANNOUNCEMENT ═══════════════ */
function AnnoBar() {
  const msgs = [
    '🎉 Use code ZYPHIX50 — 50% off your first order',
    '⚡ 30-minute delivery in 100+ cities across India',
    '🛡️ 10,000+ verified partner stores — zero surge pricing',
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % msgs.length), 3500); return () => clearInterval(t); }, []);
  return (
    <div style={{ background: T1, padding: '8px 16px', textAlign: 'center', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: .3 }}
          style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.85)', letterSpacing: '.01em' }}>
          {msgs[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ NAVBAR ═══════════════ */
const SVCS = [
  { id: 'now' as TabId, name: 'Zyphix Now', tag: 'Grocery · 30 min', color: G, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop&q=80' },
  { id: 'eats' as TabId, name: 'Zyphix Eats', tag: 'Food delivery', color: '#EA580C', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=64&h=64&fit=crop&q=80' },
  { id: 'book' as TabId, name: 'Zyphix Book', tag: 'Home services', color: '#7C3AED', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=64&h=64&fit=crop&q=80' },
];

function Navbar({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const active = SVCS.find(s => s.id === tab);
  return (
    <div className="sticky top-0 z-50" style={{ background: W, borderBottom: `1px solid ${BD}`, boxShadow: scrolled ? SH : 'none', transition: 'box-shadow .2s' }}>
      {/* Top row */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${BD}` }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <LogoMark size={32} />
        </a>
        <div style={{ width: 1, height: 28, background: BD }} />
        <button style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <MapPin size={15} color={G} />
          <div>
            <p style={{ fontSize: 8.5, fontWeight: 600, color: T3, textTransform: 'uppercase', letterSpacing: '.07em' }}>Deliver to</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontWeight: 700, color: T1, fontSize: 13 }}>Select Location</span>
              <ChevronDown size={11} color={T3} />
            </div>
          </div>
        </button>
        <div style={{ width: 1, height: 28, background: BD }} />
        <div style={{ flex: 1, position: 'relative', maxWidth: 500 }}>
          <Search size={14} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: focus ? (active?.color ?? G) : T3, transition: 'color .15s' }} />
          <input value={q} onChange={e => setQ(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            placeholder={`Search ${tab === 'now' ? 'groceries, brands' : tab === 'eats' ? 'dishes, restaurants' : 'services, professionals'}...`}
            style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 10, background: BG, border: `1.5px solid ${focus ? (active?.color ?? G) + '66' : BD}`, fontSize: 13, color: T1, fontFamily: 'inherit', fontWeight: 500, outline: 'none', transition: 'all .18s', boxShadow: focus ? `0 0 0 3px ${(active?.color ?? G)}14` : 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 10, border: `1.5px solid ${BD}`, fontSize: 13, fontWeight: 600, color: T2, background: W, transition: 'all .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G + '55'; (e.currentTarget as HTMLElement).style.color = G; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD; (e.currentTarget as HTMLElement).style.color = T2; }}>
            <User size={14} /><span className="hidden lg:inline">Sign in</span>
          </button>
          <button className="relative" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 10, background: G, fontSize: 13, fontWeight: 800, color: '#fff', boxShadow: `0 2px 12px rgba(13,163,102,.3)`, transition: 'background .15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = G2}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = G}>
            <ShoppingCart size={14} /><span className="hidden sm:inline">Cart</span>
            <span style={{ position: 'absolute', top: -7, right: -7, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: 9.5, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>
        </div>
      </div>
      {/* Service strip */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', gap: 4 }}>
        {SVCS.map(s => {
          const on = tab === s.id;
          return (
            <button key={s.id} onClick={() => setTab(s.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 16px', borderRadius: 10, flexShrink: 0, cursor: 'pointer', transition: 'all .18s', background: on ? `${s.color}0F` : 'transparent', border: `1.5px solid ${on ? s.color + '33' : 'transparent'}` }}
              onMouseEnter={e => { if (!on) (e.currentTarget as HTMLElement).style.background = BG; }}
              onMouseLeave={e => { if (!on) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, overflow: 'hidden', border: `1.5px solid ${on ? s.color + '44' : BD}`, flexShrink: 0 }}>
                <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 14, color: on ? s.color : T1, lineHeight: 1.15, letterSpacing: '-.02em' }}>{s.name}</p>
                <p style={{ fontSize: 10.5, color: on ? s.color + 'CC' : T3, fontWeight: 500 }}>{s.tag}</p>
              </div>
              {on && <div style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, marginLeft: 4 }} />}
            </button>
          );
        })}
        <div style={{ width: 1, height: 28, background: BD, margin: '0 8px' }} />
        {[{ id: 'map' as TabId, l: '📍 Stores Near Me' }, { id: 'offers' as TabId, l: '🏷️ Offers' }].map(x => (
          <button key={x.id} onClick={() => setTab(x.id)}
            style={{ padding: '8px 14px', borderRadius: 9, fontSize: 12.5, fontWeight: tab === x.id ? 700 : 500, color: tab === x.id ? T1 : T2, background: tab === x.id ? BG : 'transparent', border: `1.5px solid ${tab === x.id ? BD : 'transparent'}`, flexShrink: 0, transition: 'all .15s', whiteSpace: 'nowrap' }}>
            {x.l}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ HERO ═══════════════ */
function Hero({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  return (
    <div style={{ background: W }}>
      {/* Main headline + search */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '56px 24px 40px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `rgba(13,163,102,.07)`, border: `1px solid rgba(13,163,102,.2)`, borderRadius: 999, padding: '5px 14px', marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: G, animation: 'pulse-dot 2s ease-in-out infinite', display: 'block' }} />
            <span style={{ fontSize: 11.5, fontWeight: 700, color: G, letterSpacing: '.06em' }}>NOW LIVE ACROSS INDIA · 100+ CITIES</span>
          </div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem,6vw,5rem)', color: T1, letterSpacing: '-.05em', lineHeight: 1.02, marginBottom: 16, maxWidth: 800, margin: '0 auto 16px' }}>
            Get it delivered in<br /><span style={{ color: G }}>30 minutes.</span>
          </h1>
          <p style={{ fontSize: 17, color: T2, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 32px', fontWeight: 400 }}>
            Groceries, food & home services — from verified local partners across India.
          </p>
          {/* Search bar */}
          <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto 40px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <MapPin size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: G }} />
              <input placeholder="Enter your delivery address..." style={{ width: '100%', paddingLeft: 46, paddingRight: 16, paddingTop: 15, paddingBottom: 15, borderRadius: 14, background: BG, border: `2px solid ${BD}`, fontSize: 15, color: T1, fontFamily: 'inherit', fontWeight: 500, outline: 'none', transition: 'border-color .18s', boxShadow: SH }}
                onFocus={e => e.target.style.borderColor = G + '80'}
                onBlur={e => e.target.style.borderColor = BD}
              />
            </div>
            <button style={{ padding: '15px 28px', borderRadius: 14, background: G, color: '#fff', fontWeight: 800, fontSize: 15, flexShrink: 0, boxShadow: `0 4px 20px rgba(13,163,102,.35)`, transition: 'background .15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = G2}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = G}>
              Find Stores
            </button>
          </div>
        </motion.div>

        {/* 3 large service cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
          {[
            { id: 'now' as TabId, name: 'Zyphix Now', headline: 'Grocery in\n30 minutes', sub: '1,000+ products · Kirana · Pharmacy', color: G, dark: '#065F46', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop&q=85', badge: '⚡ Fastest' },
            { id: 'eats' as TabId, name: 'Zyphix Eats', headline: 'Food from your\nfavorite places', sub: 'Restaurants · Dhabas · Cloud kitchens', color: '#EA580C', dark: '#9A3412', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop&q=85', badge: '🍱 Popular' },
            { id: 'book' as TabId, name: 'Zyphix Book', headline: 'Services at\nyour doorstep', sub: 'Plumbers · Electricians · Cleaners · More', color: '#7C3AED', dark: '#4C1D95', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop&q=85', badge: '📅 Verified' },
          ].map((s, i) => {
            const on = tab === s.id;
            return (
              <motion.button key={s.id} onClick={() => setTab(s.id)}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + i * .1, duration: .5 }}
                style={{ position: 'relative', height: 340, borderRadius: 22, overflow: 'hidden', cursor: 'pointer', textAlign: 'left', border: `2.5px solid ${on ? s.color : 'transparent'}`, boxShadow: on ? `0 0 0 4px ${s.color}22, ${SH2}` : SH, transition: 'all .22s', transform: on ? 'translateY(-4px)' : 'none' }}
                onMouseEnter={e => { if (!on) { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = SH2; } }}
                onMouseLeave={e => { if (!on) { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = SH; } }}>
                {/* Photo */}
                <img src={s.img} alt={s.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }} />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(165deg, ${s.dark}E8 0%, ${s.dark}B0 50%, ${s.dark}55 100%)` }} />
                {/* Content */}
                <div style={{ position: 'absolute', inset: 0, padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, border: '1px solid rgba(255,255,255,.25)' }}>{s.badge}</span>
                    {on && <span style={{ background: s.color, color: '#fff', fontSize: 10.5, fontWeight: 800, padding: '3px 9px', borderRadius: 99, letterSpacing: '.03em' }}>ACTIVE</span>}
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.65)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>{s.name}</p>
                    <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.4rem,2.2vw,1.75rem)', lineHeight: 1.15, letterSpacing: '-.03em', marginBottom: 10, whiteSpace: 'pre-line' }}>{s.headline}</h3>
                    <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.7)', marginBottom: 18 }}>{s.sub}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: on ? s.color : 'rgba(255,255,255,.95)', color: on ? '#fff' : s.dark, fontSize: 12.5, fontWeight: 800, padding: '8px 16px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                        Order now <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ TRUST STRIP ═══════════════ */
function Trust() {
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[
          { icon: <Zap size={16} color={G} />, v: '30 Min', l: 'Guaranteed delivery' },
          { icon: <Package size={16} color={T2} />, v: '10,000+', l: 'Verified partners' },
          { icon: <Shield size={16} color={T2} />, v: '5 Lakh+', l: 'Happy customers' },
          { icon: <Truck size={16} color={T2} />, v: '₹0 Surge', l: 'No hidden charges' },
        ].map(({ icon, v, l }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRight: i < 3 ? `1px solid ${BD}` : 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: i === 0 ? 'rgba(13,163,102,.08)' : BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: 14, lineHeight: 1 }}>{v}</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>{l}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ ADD BUTTON ═══════════════ */
function AddBtn({ id, cart, add, rm }: { id: string; cart: Record<string, number>; add: (i: string) => void; rm: (i: string) => void }) {
  if (cart[id]) return (
    <div style={{ display: 'inline-flex', alignItems: 'center', background: G, borderRadius: 9, overflow: 'hidden' }}>
      <button onClick={e => { e.stopPropagation(); rm(id); }} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} color="#fff" /></button>
      <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', minWidth: 20, textAlign: 'center' }}>{cart[id]}</span>
      <button onClick={e => { e.stopPropagation(); add(id); }} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} color="#fff" /></button>
    </div>
  );
  return (
    <button onClick={e => { e.stopPropagation(); add(id); }} style={{ width: 30, height: 30, borderRadius: 9, background: `rgba(13,163,102,.08)`, border: `1.5px solid rgba(13,163,102,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = G; (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement as any).firstChild.style.color = '#fff'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,163,102,.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,163,102,.25)'; }}>
      <Plus size={13} color={G} />
    </button>
  );
}

/* ═══════════════ PRODUCT CARD ═══════════════ */
function PCard({ p, cart, add, rm }: { p: typeof products[0]; cart: Record<string, number>; add: (i: string) => void; rm: (i: string) => void }) {
  const disc = p.origPrice ? Math.round((1 - p.price / p.origPrice) * 100) : null;
  return (
    <div className="snap-start group cursor-pointer" style={{ width: 178, flexShrink: 0, background: W, border: `1px solid ${BD}`, borderRadius: 16, overflow: 'hidden', boxShadow: SH, transition: 'all .2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
      <div style={{ position: 'relative', height: 130, background: BG }}>
        <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
        {disc && <div style={{ position: 'absolute', top: 8, left: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 6 }}>-{disc}%</div>}
        {!disc && p.tag && <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(13,163,102,.1)', color: G, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: `1px solid rgba(13,163,102,.25)` }}>{p.tag}</div>}
      </div>
      <div style={{ padding: '11px 12px' }}>
        <p style={{ fontSize: 9.5, color: T3, marginBottom: 2 }}>{p.brand}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
        <p style={{ fontSize: 10.5, color: T3, marginBottom: 10 }}>{p.weight}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontWeight: 800, color: T1, fontSize: 14 }}>₹{p.price}</span>
            {p.origPrice && <span style={{ fontSize: 10.5, color: T3, textDecoration: 'line-through', marginLeft: 5 }}>₹{p.origPrice}</span>}
          </div>
          <AddBtn id={p.id} cart={cart} add={add} rm={rm} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ NOW TAB ═══════════════ */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cat, setCat] = useState('All');
  const cd = useCountdown(4 * 3600 + 47 * 60 + 22);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rm = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalP = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);
  const CATS = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Bakery', 'Personal Care'];
  const filtered = cat === 'All' ? products : products.filter(p => p.category === cat);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Hero banners */}
      <Scroller>
        {[
          { tag: 'New User Offer', h: '50% off your first order', sub: 'Code ZYPHIX50 · Max ₹100 off', code: 'ZYPHIX50', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&h=380&fit=crop&q=85' },
          { tag: 'Partner Stores', h: '10,000+ local stores across India', sub: 'Zero surge pricing · Always fresh', code: '', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&h=380&fit=crop&q=85' },
          { tag: 'Pharmacy', h: 'Medicines in 30 minutes', sub: 'Prescription & OTC · All brands', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=900&h=380&fit=crop&q=85' },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0" style={{ width: 'min(660px,88vw)', height: 210, borderRadius: 20, overflow: 'hidden', position: 'relative', background: '#111', flexShrink: 0, boxShadow: SH2, cursor: 'pointer' }}>
            <img src={b.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .32 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,0,0,.92) 40%,rgba(0,0,0,.15))' }} />
            <div style={{ position: 'absolute', inset: 0, padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.2)', width: 'fit-content' }}>{b.tag}</span>
              <div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', lineHeight: 1.15, marginBottom: 5, letterSpacing: '-.03em' }}>{b.h}</p>
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.6)', marginBottom: b.code ? 12 : 0 }}>{b.sub}</p>
                {b.code && <span style={{ display: 'inline-block', fontWeight: 800, fontSize: 12.5, letterSpacing: '.08em', color: '#fff', background: 'rgba(255,255,255,.12)', border: '1.5px dashed rgba(255,255,255,.4)', padding: '5px 13px', borderRadius: 8 }}>{b.code}</span>}
              </div>
            </div>
          </div>
        ))}
      </Scroller>

      {/* Categories */}
      <div>
        <Row title="Shop by Category" action="All categories" />
        <Scroller>
          {categories.map(c => (
            <button key={c.id} onClick={() => setCat(cat === c.name ? 'All' : c.name)} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div style={{ width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', border: cat === c.name ? `2.5px solid ${G}` : `2px solid ${BD}`, boxShadow: cat === c.name ? `0 0 0 3px rgba(13,163,102,.15), ${SH}` : SH, transition: 'all .2s' }}>
                <img src={c.image} alt={c.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: cat === c.name ? T1 : T2, textAlign: 'center', width: 80, lineHeight: 1.3 }}>{c.name}</span>
            </button>
          ))}
        </Scroller>
      </div>

      {/* Flash deals */}
      <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 20, overflow: 'hidden', boxShadow: SH }}>
        <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: '#FFFBEB', borderBottom: `1px solid #FDE68A` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#FEF3C7', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#D97706" fill="#D97706" />
            </div>
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: 15 }}>Flash Deals</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 1 }}>Handpicked, discounted, today only</p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: T2, fontWeight: 500 }}>Ends in</span>
            {[cd.h, cd.m, cd.s].map((v, i) => (
              <React.Fragment key={i}>
                <div style={{ background: T1, borderRadius: 8, padding: '6px 11px', minWidth: 44, textAlign: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.05rem', lineHeight: 1, display: 'block' }}>{v}</span>
                  <span style={{ fontSize: 7, fontWeight: 600, color: 'rgba(255,255,255,.45)', letterSpacing: '.05em', display: 'block', marginTop: 1 }}>{['HRS','MIN','SEC'][i]}</span>
                </div>
                {i < 2 && <span style={{ fontWeight: 700, color: T3, fontSize: 16 }}>:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <Scroller>
            {products.filter(p => p.origPrice).map(p => <PCard key={p.id} p={p} cart={cart} add={add} rm={rm} />)}
          </Scroller>
        </div>
      </div>

      {/* Trending */}
      <div>
        <Row title="Trending Near You" sub="Most ordered across India today" action="See all" />
        <Scroller>
          {products.map(p => <PCard key={p.id} p={p} cart={cart} add={add} rm={rm} />)}
        </Scroller>
      </div>

      {/* All products */}
      <div>
        <Row title="All Products" sub={`${filtered.length} items available`} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 20, paddingBottom: 2 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 16px', borderRadius: 8, fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all .15s', background: cat === c ? G : W, color: cat === c ? '#fff' : T2, border: `1.5px solid ${cat === c ? 'transparent' : BD}`, boxShadow: cat === c ? `0 2px 10px rgba(13,163,102,.3)` : SH }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(158px,1fr))', gap: 14 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .94 }} transition={{ delay: i * .02 }}>
                <div className="group cursor-pointer" style={{ background: W, border: `1px solid ${BD}`, borderRadius: 16, overflow: 'hidden', boxShadow: SH, display: 'flex', flexDirection: 'column', transition: 'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', height: 130, background: BG }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-300" />
                    {p.origPrice && <div style={{ position: 'absolute', top: 8, left: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 6 }}>-{Math.round((1 - p.price / p.origPrice) * 100)}%</div>}
                    {!p.origPrice && p.tag && <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(13,163,102,.1)', color: G, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: `1px solid rgba(13,163,102,.25)` }}>{p.tag}</div>}
                  </div>
                  <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: 9.5, color: T3, marginBottom: 2 }}>{p.brand}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T1, lineHeight: 1.35, marginBottom: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</p>
                    <p style={{ fontSize: 10.5, color: T3, marginBottom: 10 }}>{p.weight}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <div><span style={{ fontWeight: 800, color: T1, fontSize: 14 }}>₹{p.price}</span>{p.origPrice && <span style={{ fontSize: 10.5, color: T3, textDecoration: 'line-through', marginLeft: 5 }}>₹{p.origPrice}</span>}</div>
                      <AddBtn id={p.id} cart={cart} add={add} rm={rm} />
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
          <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: 'min(460px,calc(100vw - 32px))' }}>
            <div style={{ background: T1, borderRadius: 16, padding: '14px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 14 }}>{total}</div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{total} item{total > 1 ? 's' : ''} · View Cart</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>₹{totalP}</span>
                <ArrowRight size={18} color="#fff" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ EATS TAB ═══════════════ */
function EatsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div style={{ position: 'relative', height: 240, borderRadius: 22, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1400&h=500&fit=crop&q=85" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,0,0,.88) 40%,rgba(0,0,0,.18))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '36px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 520 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#FCA5A5', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Zyphix Eats</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-.04em', marginBottom: 10 }}>Local food,<br />delivered fast.</h2>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', marginBottom: 22 }}>Restaurants · Dhabas · Cloud kitchens · Available across India</p>
          <button style={{ background: '#EA580C', color: '#fff', fontSize: 13, fontWeight: 800, padding: '11px 24px', borderRadius: 11, width: 'fit-content', display: 'flex', alignItems: 'center', gap: 7, boxShadow: '0 4px 20px rgba(234,88,12,.4)' }}>
            Explore Restaurants <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <div>
        <Row title="What are you craving?" action="All cuisines" />
        <Scroller>
          {foodCategories.map((fc, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div style={{ width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${BD}`, boxShadow: SH, transition: 'all .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#EA580C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BD}>
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: T2, textAlign: 'center', width: 80, lineHeight: 1.3 }}>{fc.name}</span>
            </button>
          ))}
        </Scroller>
      </div>
      <div>
        <Row title="Restaurants Near You" sub="Open now · Delivering to your area" action="See all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 16 }}>
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .06 }}>
              <div className="group cursor-pointer" style={{ background: W, border: `1px solid ${BD}`, borderRadius: 18, overflow: 'hidden', boxShadow: SH, transition: 'all .22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                <div style={{ height: 158, background: BG, overflow: 'hidden', position: 'relative' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  {r.deliveryFee === 0 && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(13,163,102,.12)', color: G, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 7, border: '1px solid rgba(13,163,102,.25)', backdropFilter: 'blur(4px)' }}>FREE DELIVERY</div>}
                </div>
                <div style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 800, color: T1, fontSize: 14.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</p>
                    <p style={{ fontSize: 12.5, color: T2, marginTop: 2 }}>{r.cuisine}</p>
                  </div>
                  <div style={{ flexShrink: 0, marginLeft: 12, textAlign: 'right' }}>
                    <Rat r={r.rating} />
                    <p style={{ fontSize: 11, color: T3, marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={10} />{r.eta}</p>
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

/* ═══════════════ BOOK TAB ═══════════════ */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const SLOTS = ['9:00 AM','10:30 AM','12:00 PM','2:00 PM','3:30 PM','5:00 PM','6:30 PM','8:00 PM'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ position: 'relative', height: 210, borderRadius: 22, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&h=440&fit=crop&q=85" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,0,0,.9) 42%,rgba(0,0,0,.18))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '36px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#C4B5FD', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Zyphix Book</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.5rem,3vw,2.3rem)', letterSpacing: '-.04em', marginBottom: 8 }}>Trusted professionals,<br />at your doorstep.</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.58)' }}>Background-verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>
      <div>
        <Row title="Available Services" action="View all" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: 14 }}>
          {services.map(s => {
            const on = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(on ? null : s.id); setSlot(null); setDone(false); }} className="cursor-pointer"
                style={{ background: W, border: `1.5px solid ${on ? '#7C3AED' : BD}`, borderRadius: 18, padding: '18px 16px', transition: 'all .18s', boxShadow: on ? `0 0 0 3px rgba(124,58,237,.15), ${SH}` : SH }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{s.emoji}</span>
                  {on && <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={11} color="#fff" /></div>}
                </div>
                <p style={{ fontWeight: 800, color: T1, fontSize: 13.5, marginBottom: 3 }}>{s.title}</p>
                <p style={{ fontSize: 11, color: T3, marginBottom: 10 }}>{s.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: T1, fontSize: 15 }}>₹{s.price}</span>
                  <Rat r={s.rating} />
                </div>
                <p style={{ fontSize: 10.5, fontWeight: 600, color: G, marginTop: 6 }}>{s.available} pros available</p>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 20, padding: '26px 22px', boxShadow: SH }}>
              <p style={{ fontWeight: 800, color: T1, fontSize: 16, marginBottom: 5 }}>Select a time slot</p>
              <p style={{ fontSize: 12.5, color: T3, marginBottom: 22 }}>{services.find(x => x.id === sel)?.title} · ₹{services.find(x => x.id === sel)?.price}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 22 }}>
                {SLOTS.map(sl => (
                  <button key={sl} onClick={() => setSlot(sl)} style={{ padding: '11px 4px', borderRadius: 11, fontSize: 12.5, fontWeight: 600, background: slot === sl ? G : BG, color: slot === sl ? '#fff' : T1, border: `1.5px solid ${slot === sl ? 'transparent' : BD}`, transition: 'all .15s', boxShadow: slot === sl ? `0 4px 14px rgba(13,163,102,.25)` : 'none' }}>
                    {sl}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setDone(true)} disabled={!slot} style={{ width: '100%', padding: '15px', borderRadius: 13, fontWeight: 800, fontSize: 15, background: done ? '#F0FDF4' : slot ? G : BG, color: done ? G : slot ? '#fff' : T3, border: `1.5px solid ${done ? 'rgba(13,163,102,.3)' : 'transparent'}`, cursor: slot ? 'pointer' : 'default', transition: 'all .2s', boxShadow: slot && !done ? `0 4px 20px rgba(13,163,102,.3)` : 'none' }}>
                {done ? '✓ Booking confirmed! See you soon.' : slot ? 'Confirm Booking →' : 'Select a time slot to continue'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ MAP TAB ═══════════════ */
function MapTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 22, padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: SH }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(13,163,102,.08)', border: '1px solid rgba(13,163,102,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <MapPin size={28} color={G} />
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.6rem', letterSpacing: '-.03em', marginBottom: 8 }}>Find Stores Near You</p>
        <p style={{ fontSize: 14, color: T2, marginBottom: 24 }}>Browse verified kirana stores, pharmacies & restaurants near your address</p>
        <button style={{ background: G, color: '#fff', fontSize: 14, fontWeight: 800, padding: '12px 28px', borderRadius: 12, boxShadow: `0 4px 18px rgba(13,163,102,.3)` }}>Open Map →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 12 }}>
        {stores.map((st: any) => (
          <div key={st.id} className="cursor-pointer" style={{ background: W, border: `1px solid ${BD}`, borderRadius: 15, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: SH, transition: 'all .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {st.type === 'kirana' ? '🏪' : st.type === 'medical' ? '💊' : st.type === 'restaurant' ? '🍽️' : '🏢'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: T1, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{st.name}</p>
              <p style={{ fontSize: 11.5, color: T3, marginTop: 2 }}>{st.distance} · {st.openHours}</p>
            </div>
            <div style={{ flexShrink: 0, textAlign: 'right' }}>
              <Rat r={st.rating} />
              <span style={{ display: 'block', marginTop: 6, background: st.open ? 'rgba(13,163,102,.08)' : 'rgba(239,68,68,.07)', color: st.open ? G : '#EF4444', border: `1px solid ${st.open ? 'rgba(13,163,102,.2)' : 'rgba(239,68,68,.2)'}`, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6 }}>{st.open ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ OFFERS TAB ═══════════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (c: string) => { navigator.clipboard.writeText(c); setCopied(c); setTimeout(() => setCopied(null), 2500); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ position: 'relative', height: 230, borderRadius: 22, overflow: 'hidden', boxShadow: SH2 }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=460&fit=crop&q=85" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,0,0,.92) 45%,rgba(0,0,0,.15))' }} />
        <div style={{ position: 'absolute', inset: 0, padding: '36px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#86EFAC', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>New User Offer</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.6rem,3vw,2.5rem)', letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 8 }}>Flat 50% off<br />your first order.</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.58)', marginBottom: 20 }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: '#fff', background: 'rgba(255,255,255,.12)', border: '1.5px dashed rgba(255,255,255,.38)', padding: '7px 16px', borderRadius: 10, letterSpacing: '.08em' }}>ZYPHIX50</span>
            <button onClick={() => copy('ZYPHIX50')} style={{ background: G, color: '#fff', fontSize: 13, fontWeight: 800, padding: '9px 18px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 6, boxShadow: `0 4px 16px rgba(13,163,102,.4)` }}>
              {copied === 'ZYPHIX50' ? <><Check size={14} />Copied!</> : <><Copy size={14} />Copy Code</>}
            </button>
          </div>
        </div>
      </div>
      <Row title="All Offers" sub={`${promoCodes.length} active coupons`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 12 }}>
        {promoCodes.map(o => {
          const c = copied === o.code;
          return (
            <div key={o.code} onClick={() => copy(o.code)} className="cursor-pointer"
              style={{ background: W, border: `1.5px solid ${c ? G : BD}`, borderRadius: 15, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, boxShadow: c ? `0 0 0 3px rgba(13,163,102,.12), ${SH}` : SH, transition: 'all .2s' }}>
              <div>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '.04em', color: G }}>{o.code}</span>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: T1, margin: '5px 0 3px' }}>{o.description}</p>
                <p style={{ fontSize: 11, color: T3 }}>Valid till 31 Dec 2025</p>
              </div>
              <button style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, padding: '7px 14px', borderRadius: 9, background: c ? 'rgba(13,163,102,.08)' : BG, color: c ? G : T2, border: `1.5px solid ${c ? 'rgba(13,163,102,.25)' : BD}`, transition: 'all .15s' }}>
                {c ? <Check size={12} /> : <Copy size={12} />}
                {c ? 'Done' : 'Copy'}
              </button>
            </div>
          );
        })}
      </div>
      <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 18, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'space-between', boxShadow: SH }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: 'rgba(13,163,102,.08)', border: '1px solid rgba(13,163,102,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎁</div>
          <div>
            <p style={{ fontWeight: 800, color: T1, fontSize: 15 }}>Refer & Earn ₹100</p>
            <p style={{ fontSize: 12.5, color: T2, marginTop: 3 }}>You & your friend both get ₹100 wallet credits instantly</p>
          </div>
        </div>
        <button style={{ background: G, color: '#fff', fontSize: 13.5, fontWeight: 800, padding: '11px 24px', borderRadius: 11, flexShrink: 0, boxShadow: `0 4px 14px rgba(13,163,102,.3)` }}>Share Now →</button>
      </div>
    </div>
  );
}

/* ═══════════════ BRANDS MARQUEE ═══════════════ */
const BRANDS = [
  { name: 'Amul', em: '🥛' }, { name: 'Tata', em: '🏷️' }, { name: 'Nestlé', em: '☕' },
  { name: 'Britannia', em: '🍞' }, { name: 'ITC', em: '🌿' }, { name: 'Haldirams', em: '🍿' },
  { name: 'Dabur', em: '🌱' }, { name: 'Patanjali', em: '🪷' }, { name: 'P&G', em: '🧴' },
  { name: 'HUL', em: '🫧' }, { name: 'MDH', em: '🌶️' }, { name: 'Fortune', em: '🌾' },
  { name: 'Mother Dairy', em: '🥛' }, { name: 'Godrej', em: '🛍️' }, { name: 'Marico', em: '🌻' },
];
function BrandsMarquee() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, overflow: 'hidden', padding: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <div style={{ flexShrink: 0, padding: '0 24px 0 16px', borderRight: `1px solid ${BD}`, marginRight: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: T3, letterSpacing: '.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Partner Brands</p>
        </div>
        <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)' }}>
          <div style={{ display: 'flex', gap: 0, animation: 'marquee 30s linear infinite', width: 'max-content' }}>
            {doubled.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 24px', borderRight: `1px solid ${BD}`, flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 16 }}>{b.em}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T2, letterSpacing: '-.01em' }}>{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ HOW IT WORKS ═══════════════ */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Set your location', desc: 'Enter your address or allow GPS. We find verified stores, restaurants, and service pros near you instantly.', icon: <MapPin size={22} color={G} />, img: 'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=400&h=280&fit=crop&q=80' },
    { n: '02', title: 'Browse & order', desc: 'Pick from 1,000+ grocery items, local restaurants, or book a certified professional — all in one app.', icon: <ShoppingCart size={22} color={G} />, img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=400&h=280&fit=crop&q=80' },
    { n: '03', title: 'Delivered in 30 min', desc: 'Track live on a map. Our delivery partners reach you in under 30 minutes — no surge pricing, ever.', icon: <Truck size={22} color={G} />, img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=280&fit=crop&q=80' },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '64px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(13,163,102,.07)', border: '1px solid rgba(13,163,102,.18)', borderRadius: 999, padding: '4px 14px', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '.07em', textTransform: 'uppercase' }}>Simple as 1-2-3</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.7rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 10 }}>
            How Zyphix works
          </h2>
          <p style={{ fontSize: 15, color: T2, maxWidth: 420, margin: '0 auto' }}>From order to doorstep in three simple steps</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 22, overflow: 'hidden', boxShadow: SH, transition: 'all .22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH2; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = SH; (e.currentTarget as HTMLElement).style.transform = 'none'; }}>
                <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: BG }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,255,255,.6) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, width: 42, height: 42, borderRadius: 13, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: SH }}>
                    {s.icon}
                  </div>
                  <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.5rem', color: 'rgba(255,255,255,.85)', letterSpacing: '-.03em', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,.3)' }}>{s.n}</div>
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <h3 style={{ fontWeight: 800, color: T1, fontSize: 16, marginBottom: 8, letterSpacing: '-.02em' }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, color: T2, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40 }}>
          {[
            { v: '5,00,000+', l: 'Orders delivered', color: G },
            { v: '100+', l: 'Cities across India', color: '#EA580C' },
            { v: '4.8 ★', l: 'Average app rating', color: '#7C3AED' },
            { v: '< 30 min', l: 'Average delivery time', color: G },
          ].map(({ v, l, color }, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}>
              <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 18, padding: '24px 22px', textAlign: 'center', boxShadow: SH }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem,2.8vw,2rem)', color, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 6 }}>{v}</p>
                <p style={{ fontSize: 12.5, color: T3, fontWeight: 500 }}>{l}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ SOCIAL PROOF ═══════════════ */
function SocialProof() {
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '52px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Trusted by millions</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08 }}>
            What our customers say
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            { name: 'Priya Sharma', city: 'Delhi', rating: 5, text: 'Ordered groceries at 11pm and they arrived in 28 minutes. Unbelievable! The app is so smooth and the prices are the same as my local kirana.' },
            { name: 'Rahul Verma', city: 'Mumbai', rating: 5, text: 'Used ZyphixBook to get an electrician on a Sunday. Verified professional, came on time, fixed the issue, and the price was completely transparent.' },
            { name: 'Anjali Patel', city: 'Bengaluru', rating: 5, text: 'ZyphixEats is my go-to for ordering from that small biryani place nearby. They\'re not on Swiggy but they\'re on Zyphix. Love that!' },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
              <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 20, padding: '24px 22px', boxShadow: SH, height: '100%' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={14} fill="#D97706" color="#D97706" />)}
                </div>
                <p style={{ fontSize: 14, color: T1, lineHeight: 1.7, marginBottom: 20, fontWeight: 400 }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: `rgba(13,163,102,.1)`, border: '1px solid rgba(13,163,102,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: G, fontSize: 14 }}>{r.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: T1, fontSize: 13 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: T3 }}>{r.city}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Media mentions */}
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: T3, marginRight: 8 }}>AS FEATURED IN</span>
          {['The Hindu', 'Economic Times', 'YourStory', 'Inc42', 'Entrackr'].map(m => (
            <span key={m} style={{ padding: '6px 16px', background: W, border: `1px solid ${BD}`, borderRadius: 8, fontSize: 12, fontWeight: 700, color: T2, boxShadow: SH }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ APP DOWNLOAD ═══════════════ */
function AppDownload() {
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, padding: '60px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: `linear-gradient(135deg, #064E3B 0%, #065F46 45%, #047857 100%)`, borderRadius: 26, padding: '52px 56px', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />
          <div style={{ position: 'absolute', bottom: -40, right: 100, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.03)' }} />
          <div style={{ maxWidth: 520, position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#86EFAC', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Download Free</p>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.08, fontSize: 'clamp(1.8rem,3.2vw,2.7rem)', letterSpacing: '-.04em', marginBottom: 14 }}>
              Get the Zyphix app.<br />Order in 30 seconds.
            </h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 15, marginBottom: 30, lineHeight: 1.65 }}>App-only deals · Live order tracking · Offline mode</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              {[{ ic: '🍎', top: 'Download on the', bot: 'App Store' }, { ic: '▶', top: 'Get it on', bot: 'Google Play' }].map((a, i) => (
                <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderRadius: 13, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'}>
                  <span style={{ fontSize: 26 }}>{a.ic}</span>
                  <div>
                    <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>{a.top}</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{a.bot}</p>
                  </div>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[['4.8 ★', 'App Store rating'], ['4.7 ★', 'Play Store rating'], ['5L+', 'Downloads']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.3rem' }}>{v}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, flexShrink: 0, position: 'relative' }}>
            {['🛒', '🍱', '🔧'].map((em, i) => (
              <div key={i} style={{ width: 100, height: 200, borderRadius: 20, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, transform: i === 1 ? 'translateY(-12px)' : 'none' }}>
                {em}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ FOOTER ═══════════════ */
function Footer() {
  return (
    <footer style={{ background: T1 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '52px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 44 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <LogoMark size={30} dark />
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, marginBottom: 22, maxWidth: 260 }}>India's SuperLocal App — groceries, food & services delivered in 30 minutes. 100+ cities, 10,000+ partners.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {[<Twitter size={14} />, <Instagram size={14} />, <Linkedin size={14} />, <Phone size={14} />].map((ic, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', transition: 'all .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.14)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.4)'; }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {[
            { t: 'Services', l: ['Zyphix Now', 'Zyphix Eats', 'Zyphix Book', 'Stores Near Me', 'Offers'] },
            { t: 'Company', l: ['About Us', 'Careers', 'Press Kit', 'Blog', 'Investors'] },
            { t: 'Support', l: ['Help Center', 'Contact Us', 'Refund Policy', 'Privacy Policy', 'Terms of Service'] },
          ].map(({ t, l }) => (
            <div key={t}>
              <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 16 }}>{t}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {l.map(link => <li key={link}><a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', transition: 'color .15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.75)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.38)'}>{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.28)' }}>© 2025 Zyphix Technologies Pvt. Ltd. · Bengaluru, India · All rights reserved</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: G, display: 'block' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: G }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ ROOT ═══════════════ */
export function Home() {
  const [tab, setTab] = useState<TabId>('now');
  const CONTENT: Record<TabId, React.ReactNode> = {
    now: <NowTab />, eats: <EatsTab />, book: <BookTab />, map: <MapTab />, offers: <OffersTab />
  };
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <AnnoBar />
      <Navbar tab={tab} setTab={setTab} />
      <Hero tab={tab} setTab={setTab} />
      <Trust />
      <BrandsMarquee />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '44px 24px 80px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
            {CONTENT[tab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <HowItWorks />
      <SocialProof />
      <AppDownload />
      <Footer />
    </div>
  );
}
