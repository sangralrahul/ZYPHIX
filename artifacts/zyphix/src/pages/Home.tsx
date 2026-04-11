import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User, LogOut,
  Plus, Minus, Star, Clock, ChevronRight, ChevronLeft,
  Shield, Package, Truck, Zap, Check, Copy, ArrowRight,
  Phone, Instagram, Twitter, Linkedin, PlayCircle
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';

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
function ZIcon({ size = 20 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      {/* Top bar */}
      <rect x="2.5" y="3.5" width="19" height="4.2" rx="2.1" fill="white"/>
      {/* Diagonal connector */}
      <polygon points="20.2,7.7 17.6,7.7 3.8,16.3 6.4,16.3" fill="white"/>
      {/* Bottom bar */}
      <rect x="2.5" y="16.3" width="19" height="4.2" rx="2.1" fill="white"/>
      {/* Accent dots */}
      <circle cx="20.2" cy="5.6" r="1.6" fill="#6EE7B7"/>
      <circle cx="3.8" cy="18.4" r="1.6" fill="#6EE7B7"/>
    </svg>
  );
}

function LogoMark({ size = 32, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: '50%', background: `linear-gradient(145deg, #0DA366 0%, #047857 60%, #065F46 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 2px 12px rgba(13,163,102,.45), 0 0 0 2px rgba(13,163,102,.15)` }}>
        <ZIcon size={Math.round(size * 0.56)} />
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
  { id: 'now' as TabId, name: 'Zyphix Now', tag: 'Grocery · 10 min', color: G, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop&q=80' },
  { id: 'eats' as TabId, name: 'Zyphix Eats', tag: 'Food delivery', color: '#EA580C', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=64&h=64&fit=crop&q=80' },
  { id: 'book' as TabId, name: 'Zyphix Book', tag: 'Home services', color: '#7C3AED', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=64&h=64&fit=crop&q=80' },
];

function Navbar({ tab, setTab }: { tab: TabId; setTab: (t: TabId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, openModal } = useAuth();
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
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0, position: 'relative' }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 10, border: `1.5px solid ${BD}`, fontSize: 13, fontWeight: 600, color: T1, background: W, transition: 'all .15s', cursor: 'pointer' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900 }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                <ChevronDown size={11} color={T3} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .96 }} transition={{ duration: .14 }}
                    style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: W, border: `1px solid ${BD}`, borderRadius: 14, width: 200, boxShadow: SH2, zIndex: 100, overflow: 'hidden' }}
                    onMouseLeave={() => setUserMenuOpen(false)}>
                    <div style={{ padding: '12px 14px', borderBottom: `1px solid ${BD}`, background: BG }}>
                      <p style={{ fontWeight: 700, fontSize: 13, color: T1 }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: T3, marginTop: 2 }}>{user.email}</p>
                    </div>
                    {[
                      { l: 'My Orders', href: '#' },
                      { l: 'Account Settings', href: '#' },
                      { l: 'Saved Addresses', href: '#' },
                    ].map(({ l, href }) => (
                      <a key={l} href={href} style={{ display: 'block', padding: '10px 14px', fontSize: 13, color: T2, fontWeight: 500, transition: 'background .12s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BG}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = W}>{l}</a>
                    ))}
                    <div style={{ borderTop: `1px solid ${BD}` }}>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', fontSize: 13, color: '#EF4444', fontWeight: 600, transition: 'background .12s', textAlign: 'left' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF5F5'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = W}>
                        <LogOut size={13} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={openModal}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 10, border: `1.5px solid ${BD}`, fontSize: 13, fontWeight: 600, color: T2, background: W, transition: 'all .15s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G + '55'; (e.currentTarget as HTMLElement).style.color = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD; (e.currentTarget as HTMLElement).style.color = T2; }}>
              <User size={14} /><span className="hidden lg:inline">Sign in</span>
            </button>
          )}
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

const HERO_DATA: Record<string, { name: string; headline: string; sub: string; cta: string; color: string; dark: string; img: string; badge: string; tags: string[] }> = {
  now:    { name: 'Zyphix Now',      headline: 'Groceries delivered\nin 10 minutes.',        sub: 'Kirana stores · Pharmacy · Supermarket · 1,000+ products at kirana prices', cta: 'Order Groceries', color: G,         dark: '#065F46', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=600&fit=crop&q=90', badge: '⚡ Fastest delivery in India',   tags: ['Vegetables','Dairy','Snacks','Pharmacy','Beverages','Household'] },
  eats:   { name: 'Zyphix Eats',     headline: 'Food from your\nfavourite places.',         sub: 'Restaurants · Dhabas · Cloud kitchens · Local gems near you',               cta: 'Order Food',      color: '#EA580C', dark: '#9A3412', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=600&fit=crop&q=90', badge: '🍱 2,000+ restaurants',           tags: ['Biryani','Pizza','Burgers','Thali','Desserts','Drinks'] },
  book:   { name: 'Zyphix Book',     headline: 'Trusted services\nat your doorstep.',       sub: 'Plumbers · Electricians · Cleaners · AC Repair · Salon · Beauty',           cta: 'Book a Service',  color: '#7C3AED', dark: '#4C1D95', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&h=600&fit=crop&q=90', badge: '📅 Verified professionals',        tags: ['Plumbing','Electrical','Cleaning','AC Repair','Painting','Salon'] },
  map:    { name: 'Stores Near Me',  headline: 'Find local stores\nnear you.',               sub: 'Kirana · Medical · Supermarkets — all on the map',                          cta: 'Explore Map',     color: G,         dark: '#065F46', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&h=600&fit=crop&q=90', badge: '📍 100+ cities',                  tags: [] },
  offers: { name: 'Exclusive Offers',headline: "Deals you won't\nfind elsewhere.",           sub: 'Promo codes · Flash sales · First-order discounts',                          cta: 'See All Offers',  color: '#D97706', dark: '#92400E', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=600&fit=crop&q=90', badge: '🏷️ New deals daily',               tags: [] },
};

function ServiceHero({ tab }: { tab: TabId; setTab: (t: TabId) => void }) {
  const h = HERO_DATA[tab] ?? HERO_DATA.now;
  return (
    <div style={{ background: W }}>
      {/* Focused hero banner — changes with active tab */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '18px 24px 32px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .2 }}
            style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 320, display: 'flex', alignItems: 'flex-end' }}>
            <img src={h.img} alt={h.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${h.dark}F5 0%, ${h.dark}CC 45%, ${h.dark}55 75%, transparent 100%)` }} />
            <div style={{ position: 'relative', padding: '32px 44px', width: '100%' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 11.5, fontWeight: 700, padding: '5px 14px', borderRadius: 99, border: '1px solid rgba(255,255,255,.25)', marginBottom: 14 }}>{h.badge}</span>
              <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.9rem,3.5vw,2.9rem)', lineHeight: 1.08, letterSpacing: '-.04em', marginBottom: 10, whiteSpace: 'pre-line' }}>{h.headline}</h1>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.68)', maxWidth: 500, lineHeight: 1.55, marginBottom: h.tags.length ? 18 : 22 }}>{h.sub}</p>
              {h.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 22 }}>
                  {h.tags.map(t => (
                    <span key={t} style={{ background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 9, border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer' }}>{t}</span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ position: 'relative', maxWidth: 340 }}>
                  <MapPin size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,.65)' }} />
                  <input placeholder="Enter delivery address…" style={{ paddingLeft: 36, paddingRight: 14, paddingTop: 13, paddingBottom: 13, borderRadius: 11, background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,.25)', fontSize: 13.5, color: '#fff', fontFamily: 'inherit', outline: 'none', width: 280 }} />
                </div>
                <button style={{ padding: '13px 26px', borderRadius: 11, background: h.color, color: '#fff', fontWeight: 800, fontSize: 14.5, flexShrink: 0, boxShadow: `0 4px 18px ${h.color}55`, transition: 'filter .15s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}>
                  {h.cta} →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
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
          { icon: <Zap size={16} color={G} />, v: '10 Min', l: 'Guaranteed delivery' },
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
          { tag: 'Pharmacy', h: 'Medicines in 10 minutes', sub: 'Prescription & OTC · All brands', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=900&h=380&fit=crop&q=85' },
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

/* ═══════════════ PARTNER BRANDS ═══════════════ */
interface BrandEntry { name: string; color: string; logo: React.ReactNode; }

/* ── inline SVG logos – each in its brand colours ── */
const AmulLogo = () => (
  <svg viewBox="0 0 86 32" width={86} height={32}><ellipse cx="15" cy="16" rx="13" ry="13" fill="#1D6FB4"/><text x="15" y="14" textAnchor="middle" fill="#FCD116" fontSize="6.5" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">UTTERLY</text><text x="15" y="21" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="Arial,sans-serif" dominantBaseline="middle">BUTTERLY</text><text x="51" y="17" textAnchor="middle" fill="#1D6FB4" fontSize="18" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Amul</text></svg>
);
const TataLogo = () => (
  <svg viewBox="0 0 72 32" width={72} height={32}><ellipse cx="36" cy="16" rx="34" ry="14" fill="none" stroke="#00285E" strokeWidth="2"/><text x="36" y="17" textAnchor="middle" fill="#00285E" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle" letterSpacing="3">TATA</text></svg>
);
const NestleLogo = () => (
  <svg viewBox="0 0 82 32" width={82} height={32}><path d="M8 22 Q14 10 20 22 Q14 30 8 22Z" fill="#C8102E" opacity="0.7"/><text x="52" y="17" textAnchor="middle" fill="#C8102E" fontSize="16" fontWeight="900" fontFamily="Georgia,serif" dominantBaseline="middle">Nestlé</text></svg>
);
const BritanniaLogo = () => (
  <svg viewBox="0 0 94 32" width={94} height={32}><circle cx="16" cy="16" r="13" fill="#E42313"/><text x="16" y="17" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Georgia,serif" dominantBaseline="middle">B</text><text x="56" y="17" textAnchor="middle" fill="#E42313" fontSize="14" fontWeight="800" fontFamily="Georgia,serif" dominantBaseline="middle">Britannia</text></svg>
);
const ITCLogo = () => (
  <svg viewBox="0 0 58 32" width={58} height={32}><rect x="2" y="6" width="54" height="20" rx="3" fill="none" stroke="#7B2335" strokeWidth="2"/><text x="29" y="17" textAnchor="middle" fill="#7B2335" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle" letterSpacing="4">ITC</text></svg>
);
const HaldiLogo = () => (
  <svg viewBox="0 0 96 32" width={96} height={32}><path d="M6 12 L14 8 L22 12 L22 22 L14 26 L6 22Z" fill="#E55126"/><text x="14" y="17" textAnchor="middle" fill="white" fontSize="7" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">H</text><text x="60" y="17" textAnchor="middle" fill="#E55126" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Haldirams</text></svg>
);
const DaburLogo = () => (
  <svg viewBox="0 0 74 32" width={74} height={32}><path d="M10 26 Q10 6 18 8 Q22 4 14 10 Q22 6 14 22 Q22 28 10 26Z" fill="#007030" opacity="0.8"/><circle cx="15" cy="9" r="3" fill="#007030"/><text x="48" y="17" textAnchor="middle" fill="#007030" fontSize="16" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Dabur</text></svg>
);
const PatanjaliLogo = () => (
  <svg viewBox="0 0 96 32" width={96} height={32}><path d="M12 6 L16 16 L8 16Z" fill="#F07800"/><rect x="7" y="16" width="10" height="10" rx="1" fill="#F07800" opacity="0.7"/><text x="58" y="17" textAnchor="middle" fill="#F07800" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Patanjali</text></svg>
);
const PGLogo = () => (
  <svg viewBox="0 0 62 32" width={62} height={32}><circle cx="18" cy="16" r="12" fill="none" stroke="#003DA5" strokeWidth="2.5"/><circle cx="28" cy="16" r="12" fill="none" stroke="#003DA5" strokeWidth="2.5"/><text x="16" y="17" textAnchor="middle" fill="#003DA5" fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">P</text><text x="30" y="17" textAnchor="middle" fill="#003DA5" fontSize="11" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">G</text></svg>
);
const HULLogo = () => (
  <svg viewBox="0 0 70 32" width={70} height={32}><path d="M12 6 Q22 6 22 14 Q22 22 12 26 Q2 22 2 14 Q2 6 12 6Z" fill="#00527E" opacity="0.9"/><path d="M12 10 L12 22 M8 16 L16 16" stroke="white" strokeWidth="2" strokeLinecap="round"/><text x="46" y="17" textAnchor="middle" fill="#00527E" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">HUL</text></svg>
);
const MDHLogo = () => (
  <svg viewBox="0 0 66 32" width={66} height={32}><circle cx="16" cy="16" r="13" fill="#C41230"/><path d="M9 11 L16 21 L23 11" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="44" y="17" textAnchor="middle" fill="#C41230" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">MDH</text></svg>
);
const FortuneLogo = () => (
  <svg viewBox="0 0 84 32" width={84} height={32}><path d="M12 26 L12 10 M8 16 L16 16 M10 10 Q12 4 14 10" stroke="#EF4123" strokeWidth="2.5" fill="none" strokeLinecap="round"/><text x="52" y="17" textAnchor="middle" fill="#EF4123" fontSize="15" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Fortune</text></svg>
);
const MotherDairyLogo = () => (
  <svg viewBox="0 0 108 32" width={108} height={32}><path d="M6 22 Q12 8 18 22" stroke="#003A96" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="12" cy="10" r="4" fill="#003A96"/><text x="62" y="17" textAnchor="middle" fill="#003A96" fontSize="12" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Mother Dairy</text></svg>
);
const GodrejLogo = () => (
  <svg viewBox="0 0 80 32" width={80} height={32}><path d="M18 16 Q18 6 10 6 Q2 6 2 16 Q2 26 10 26 Q16 26 18 22 L14 22 Q12 24 10 24 Q6 24 4 16 Q6 8 10 8 Q14 8 16 12 L18 12 Z" fill="#1B2D4F"/><text x="52" y="17" textAnchor="middle" fill="#1B2D4F" fontSize="14" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Godrej</text></svg>
);
const MaricoLogo = () => (
  <svg viewBox="0 0 78 32" width={78} height={32}><path d="M4 22 L8 6 L14 18 L20 6 L24 22" stroke="#E31837" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><text x="52" y="17" textAnchor="middle" fill="#E31837" fontSize="14" fontWeight="900" fontFamily="Arial,sans-serif" dominantBaseline="middle">Marico</text></svg>
);

const BRAND_DATA: BrandEntry[] = [
  { name: 'Amul',        color: '#1D6FB4', logo: <AmulLogo /> },
  { name: 'Tata',        color: '#00285E', logo: <TataLogo /> },
  { name: 'Nestlé',      color: '#C8102E', logo: <NestleLogo /> },
  { name: 'Britannia',   color: '#E42313', logo: <BritanniaLogo /> },
  { name: 'ITC',         color: '#7B2335', logo: <ITCLogo /> },
  { name: 'Haldirams',   color: '#E55126', logo: <HaldiLogo /> },
  { name: 'Dabur',       color: '#007030', logo: <DaburLogo /> },
  { name: 'Patanjali',   color: '#F07800', logo: <PatanjaliLogo /> },
  { name: 'P&G',         color: '#003DA5', logo: <PGLogo /> },
  { name: 'HUL',         color: '#00527E', logo: <HULLogo /> },
  { name: 'MDH',         color: '#C41230', logo: <MDHLogo /> },
  { name: 'Fortune',     color: '#EF4123', logo: <FortuneLogo /> },
  { name: 'Mother Dairy',color: '#003A96', logo: <MotherDairyLogo /> },
  { name: 'Godrej',      color: '#1B2D4F', logo: <GodrejLogo /> },
  { name: 'Marico',      color: '#E31837', logo: <MaricoLogo /> },
];

function BrandItem({ entry }: { entry: BrandEntry }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        filter: hov ? 'none' : 'grayscale(1) opacity(0.35)',
        transition: 'filter 0.28s ease',
        cursor: 'default',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '10px 18px',
        borderRadius: 12,
        background: hov ? `${entry.color}08` : 'transparent',
        border: `1px solid ${hov ? entry.color + '22' : 'transparent'}`,
      }}
      title={entry.name}
    >
      {entry.logo}
    </div>
  );
}

function BrandsMarquee() {
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, padding: '18px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: T3, letterSpacing: '.12em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 14 }}>PARTNER BRANDS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
          {BRAND_DATA.map((b, i) => <BrandItem key={i} entry={b} />)}
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
    { n: '03', title: 'Delivered in 10 min', desc: 'Track live on a map. Our delivery partners reach you in under 10 minutes — no surge pricing, ever.', icon: <Truck size={22} color={G} />, img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=280&fit=crop&q=80' },
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
            { v: '< 10 min', l: 'Average delivery time', color: G },
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
              {/* App Store Badge */}
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px', borderRadius: 13, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', transition: 'background .2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'}>
                <svg width="26" height="26" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.2-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.2 135.4-316.8 268.9-316.8 71 0 130.1 46.3 173.4 46.3 41.7 0 107.7-50.4 185.3-50.4 30.9 0 108.2 2.6 168.2 81.4zm-90.5-185.3c33.5-39.8 57-94.8 57-150.8 0-7.7-.7-15.4-2-22.5-53.7 2-117.3 35.7-157.4 80.7-34.5 39.2-64.4 94.8-64.4 153.6 0 8.4 1.3 16.7 1.9 19.2 3.5.6 9 1.3 14.5 1.3 47.7 0 105.4-31.9 150.4-81.5z"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,.5)', fontWeight: 500, lineHeight: 1 }}>Download on the</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>App Store</p>
                </div>
              </button>
              {/* Google Play Badge */}
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px', borderRadius: 13, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', transition: 'background .2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'}>
                <svg width="26" height="26" viewBox="0 0 512 512" fill="none"><path d="M48 432c0 17.7 19.3 28 34.3 18.9L416 272v-32L82.3 61.1C67.3 52 48 62.3 48 80v352z" fill="#4285F4"/><path d="M48 80c0-17.7 19.3-28 34.3-18.9L282 181l-52 52L48 80z" fill="#34A853"/><path d="M230 181l52-52 100.4 60.6-52 52L230 181z" fill="#FBBC05"/><path d="M282 331 82.3 449.9C67.3 459 48 448.7 48 431l182-153 52 53z" fill="#EA4335"/><path d="M330.4 271.6 416 272l-85.6.4-100.4-60.4 52-52 48 51.6z" fill="#FBBC05" opacity=".5"/></svg>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: 9.5, color: 'rgba(255,255,255,.5)', fontWeight: 500, lineHeight: 1 }}>Get it on</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>Google Play</p>
                </div>
              </button>
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
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, marginBottom: 22, maxWidth: 260 }}>India's SuperLocal App — groceries, food & services delivered in 10 minutes. 100+ cities, 10,000+ partners.</p>
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
            { t: 'Services', links: [{ l: 'Zyphix Now', h: '#' }, { l: 'Zyphix Eats', h: '#' }, { l: 'Zyphix Book', h: '#' }, { l: 'Stores Near Me', h: '#' }, { l: 'Offers', h: '#' }] },
            { t: 'Company', links: [{ l: 'About Us', h: '/about' }, { l: 'Careers', h: '#' }, { l: 'Press Kit', h: '#' }, { l: 'Blog', h: '#' }, { l: 'Investors', h: '#' }] },
            { t: 'Support', links: [{ l: 'Help Center', h: '#' }, { l: 'Contact Us', h: '/contact' }, { l: 'Refund Policy', h: '/terms' }, { l: 'Privacy Policy', h: '/privacy' }, { l: 'Terms of Service', h: '/terms' }] },
          ].map(({ t, links }) => (
            <div key={t}>
              <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 16 }}>{t}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(({ l, h }) => <li key={l}><a href={h} style={{ fontSize: 13, color: 'rgba(255,255,255,.38)', transition: 'color .15s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.75)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.38)'}>{l}</a></li>)}
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
      <ServiceHero tab={tab} setTab={setTab} />
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
