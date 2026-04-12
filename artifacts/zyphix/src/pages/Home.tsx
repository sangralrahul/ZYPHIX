import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User, LogOut,
  Plus, Minus, Star, Clock, ChevronRight, ChevronLeft,
  Shield, Package, Truck, Zap, Check, Copy, ArrowRight,
  Phone, Instagram, Twitter, Linkedin,
  Gift, Crown, BadgeCheck, Users, TrendingUp,
  LocateFixed, X, Utensils, Store, Bike, Tag
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, promoCodes, stores } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { ZyphixLogo } from '../components/ZyphixLogo';
import { SplashVideoCore } from './SplashVideo';

type TabId = 'now' | 'eats' | 'map' | 'offers';

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
    <ZyphixLogo
      size={size}
      wordmarkColor={dark ? '#ffffff' : T1}
      wordmarkHighlight={dark ? '#34D399' : G}
      ixColor={dark ? 'rgba(255,255,255,.82)' : '#0A0F1A'}
    />
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
const ANNO_MSGS = [
  { Icon: Tag,       color: '#FCD34D', text: <>Use code <strong style={{color:'#fff'}}>ZYPHIX50</strong> — 50% off your first order</> },
  { Icon: Zap,       color: '#6EE7B7', text: <>Zyphix is launching in <strong style={{color:'#fff'}}>Jammu, J&K</strong> — Join the waitlist</> },
  { Icon: Store,     color: '#93C5FD', text: <><strong style={{color:'#fff'}}>Kirana store owner?</strong> List your shop for free</> },
] as const;
function AnnoBar() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % ANNO_MSGS.length), 3500); return () => clearInterval(t); }, []);
  const { Icon, color, text } = ANNO_MSGS[i];
  const scrollToWaitlist = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div style={{ background: T1, padding: '8px 16px', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: .28 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <div style={{ width:18, height:18, borderRadius:5, background:`${color}22`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Icon size={11} color={color} strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,.8)', letterSpacing: '.01em' }}>
            {text}{i === 2 && <>{' '}<span onClick={scrollToWaitlist} style={{ color:'#6EE7B7', textDecoration:'underline', cursor:'pointer', fontWeight:700, marginLeft:4 }}>Register now →</span></>}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════ NAVBAR ═══════════════ */
const LOC_AREAS: Record<string, string[]> = {
  Jammu: ['Gandhi Nagar', 'Trikuta Nagar', 'Bakshi Nagar', 'Raghunath Bazaar', 'Canal Road', 'Talab Tillo', 'Sidhra', 'Residency Road', 'Ambphalla', 'Sarwal'],
  Srinagar: ['Lal Chowk', 'Rajbagh', 'Hyderpora', 'Jawahar Nagar', 'Dalgate', 'Hazratbal'],
};

const SVCS = [
  { id: 'now' as TabId, name: 'Zyphix Now', tag: 'Grocery · 30 min', color: G, img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop&q=80' },
  { id: 'eats' as TabId, name: 'Zyphix Eats', tag: 'Food delivery', color: '#EA580C', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=64&h=64&fit=crop&q=80' },
];

function Navbar({ tab = 'now', setTab }: { tab?: TabId; setTab?: (t: TabId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [locVal, setLocVal] = useState<string>(() => {
    try { return localStorage.getItem('zyphix_loc') || ''; } catch { return ''; }
  });
  const [locSearch, setLocSearch] = useState('');
  const [locating, setLocating] = useState(false);
  const locRef = useRef<HTMLDivElement>(null);
  const { user, logout, openModal } = useAuth();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(e.target as Node)) {
        setLocOpen(false); setLocSearch('');
      }
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const saveLocation = (val: string) => {
    try { localStorage.setItem('zyphix_loc', val); } catch {}
    setLocVal(val); setLocOpen(false); setLocSearch('');
  };

  const detectGPS = () => {
    if (!navigator.geolocation) { saveLocation('Jammu, J&K'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude: lat, longitude: lon } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
            { headers: { 'Accept-Language': 'en-US,en' } }
          );
          const data = await res.json();
          const addr = data.address || {};
          const area =
            addr.suburb || addr.neighbourhood || addr.quarter ||
            addr.village || addr.town || addr.city_district || '';
          const city =
            addr.city || addr.town || addr.county ||
            addr.state_district || addr.state || '';
          const label = area
            ? `${area}${city ? ', ' + city : ''}`
            : city || 'Current Location';
          setLocating(false);
          saveLocation(label);
        } catch {
          setLocating(false);
          saveLocation('Current Location · Jammu');
        }
      },
      (err) => {
        setLocating(false);
        const msg =
          err.code === 1 ? 'Location access denied. Pick manually.' : 'Could not detect location.';
        alert(msg);
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  const allAreas = Object.values(LOC_AREAS).flat();
  const active = SVCS.find(s => s.id === tab);

  const VALLEY_KEYWORDS = ['Srinagar', 'Baramulla', 'Anantnag', 'Pulwama', 'Sopore', 'Budgam'];
  const isValley = VALLEY_KEYWORDS.some(k => locVal.toLowerCase().includes(k.toLowerCase()));
  const delivMins = locVal
    ? isValley ? '45 mins' : '30 mins'
    : null;
  const areaLabel = locVal
    ? locVal.length > 20 ? locVal.slice(0, 19) + '…' : locVal
    : 'Select Location';

  return (
    <div className="sticky top-0 z-50" style={{ background: W, borderBottom: `1px solid ${BD}`, boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,.06)' : 'none', transition: 'box-shadow .2s' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 68, display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <LogoMark size={30} />
        </a>

        {/* ── Location picker ── */}
        <div ref={locRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button onClick={() => { setLocOpen(o => !o); setLocSearch(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 10px 6px 8px', borderRadius: 10, transition: 'background .12s' }}
            onMouseEnter={e => (e.currentTarget.style.background = BG)}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <MapPin size={17} color={locVal ? G : T3} strokeWidth={2.2} />
              {locVal && (
                <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: G, border: '1.5px solid #fff' }} />
              )}
            </div>
            <div style={{ textAlign: 'left', minWidth: 0, maxWidth: 148 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: T3, lineHeight: 1, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                {locVal ? (delivMins ? `In ${delivMins}` : 'Delivering to') : 'Deliver to'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {locVal ? areaLabel : 'Select Location'}
                </span>
                <motion.span animate={{ rotate: locOpen ? 180 : 0 }} transition={{ duration: .18 }} style={{ flexShrink: 0 }}>
                  <ChevronDown size={12} color={T3} />
                </motion.span>
              </div>
            </div>
          </button>

          {/* Location dropdown */}
          <AnimatePresence>
            {locOpen && (
              <motion.div initial={{ opacity: 0, y: 6, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .97 }} transition={{ duration: .14 }}
                style={{ position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: 316, background: W, border: `1px solid ${BD}`, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,.1)', zIndex: 400, overflow: 'hidden' }}>
                <button onClick={detectGPS} disabled={locating}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: 'none', borderBottom: `1px solid ${BD}`, background: '#F0FDF9', cursor: 'pointer', transition: 'background .12s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#DCFCE7')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F0FDF9')}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: locating ? T3 : G, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <LocateFixed size={15} color="#fff" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: T1 }}>{locating ? 'Detecting…' : 'Use current location'}</p>
                    <p style={{ fontSize: 11, color: T3, marginTop: 1 }}>GPS · Accurate delivery</p>
                  </div>
                </button>
                <div style={{ padding: '8px 12px', borderBottom: `1px solid ${BD}` }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: T3 }} />
                    <input value={locSearch} onChange={e => setLocSearch(e.target.value)} placeholder="Search area or colony…" autoFocus
                      style={{ width: '100%', paddingLeft: 30, paddingRight: locSearch ? 28 : 10, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: `1.5px solid ${BD}`, fontSize: 13, color: T1, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', background: BG }}
                      onFocus={e => { e.target.style.borderColor = G; e.target.style.background = W; }}
                      onBlur={e => { e.target.style.borderColor = BD; e.target.style.background = BG; }} />
                    {locSearch && (
                      <button onClick={() => setLocSearch('')} style={{ position: 'absolute', right: 7, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: T3, display: 'flex', padding: 2 }}>
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ maxHeight: 240, overflowY: 'auto', padding: '8px 12px 12px' }}>
                  {Object.entries(LOC_AREAS).map(([city, areas]) => {
                    const filtered = locSearch ? areas.filter(a => a.toLowerCase().includes(locSearch.toLowerCase())) : areas;
                    if (!filtered.length) return null;
                    return (
                      <div key={city} style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 9.5, fontWeight: 800, color: T3, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6, paddingLeft: 2 }}>{city}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                          {filtered.map(area => {
                            const fullName = `${area}, ${city}`;
                            const isActive = locVal === fullName;
                            return (
                              <button key={area} onClick={() => saveLocation(fullName)}
                                style={{ padding: '4px 11px', borderRadius: 20, border: `1.5px solid ${isActive ? G : BD}`, background: isActive ? `${G}12` : W, fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? G : T2, cursor: 'pointer', transition: 'all .1s' }}
                                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `${G}66`; e.currentTarget.style.color = G; e.currentTarget.style.background = `${G}08`; } }}
                                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = BD; e.currentTarget.style.color = T2; e.currentTarget.style.background = W; } }}>
                                {area}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {locSearch && !allAreas.some(a => a.toLowerCase().includes(locSearch.toLowerCase())) && (
                    <button onClick={() => saveLocation(locSearch)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: 10, border: `1.5px dashed ${G}66`, background: `${G}06`, fontSize: 12.5, fontWeight: 600, color: G, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <MapPin size={12} /> Set "{locSearch}" as location
                    </button>
                  )}
                  {locVal && !locSearch && (
                    <button onClick={() => { try { localStorage.removeItem('zyphix_loc'); } catch {} setLocVal(''); setLocOpen(false); }}
                      style={{ width: '100%', marginTop: 4, padding: '7px 12px', borderRadius: 8, border: `1px solid ${BD}`, background: W, fontSize: 12, fontWeight: 500, color: T3, cursor: 'pointer' }}
                      onMouseEnter={e => (e.currentTarget.style.background = BG)}
                      onMouseLeave={e => (e.currentTarget.style.background = W)}>
                      Clear saved location
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Search bar (Zepto-style pill, dominant center) ── */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: focus ? G : '#9CA3AF', transition: 'color .15s', pointerEvents: 'none' }} />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder={`Search for ${tab === 'now' ? 'groceries, brands and more' : tab === 'eats' ? 'dishes, restaurants and more' : 'stores, offers and more'}`}
            style={{
              width: '100%',
              paddingLeft: 46,
              paddingRight: 20,
              paddingTop: 11,
              paddingBottom: 11,
              borderRadius: 999,
              background: focus ? W : '#F4F4F5',
              border: `1.5px solid ${focus ? G + '55' : 'transparent'}`,
              fontSize: 13.5,
              color: T1,
              fontFamily: 'inherit',
              fontWeight: 500,
              outline: 'none',
              transition: 'all .18s',
              boxShadow: focus ? `0 0 0 3px ${G}14` : 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Right actions ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${BD}`, fontSize: 13, fontWeight: 600, color: T1, background: W, cursor: 'pointer', transition: 'all .13s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G + '44'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD; }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 900 }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown size={11} color={T3} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: 6, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .96 }} transition={{ duration: .13 }}
                    style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: W, border: `1px solid ${BD}`, borderRadius: 14, width: 196, boxShadow: '0 8px 28px rgba(0,0,0,.09)', zIndex: 400, overflow: 'hidden' }}
                    onMouseLeave={() => setUserMenuOpen(false)}>
                    <div style={{ padding: '11px 14px', borderBottom: `1px solid ${BD}`, background: BG }}>
                      <p style={{ fontWeight: 700, fontSize: 13, color: T1 }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: T3, marginTop: 1 }}>{user.email}</p>
                    </div>
                    {[{ l: 'My Orders', href: '#' }, { l: 'Account Settings', href: '#' }, { l: 'Saved Addresses', href: '#' }].map(({ l, href }) => (
                      <a key={l} href={href} style={{ display: 'block', padding: '9px 14px', fontSize: 13, color: T2, fontWeight: 500, transition: 'background .1s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BG}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = W}>{l}</a>
                    ))}
                    <div style={{ borderTop: `1px solid ${BD}` }}>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', fontSize: 13, color: '#EF4444', fontWeight: 600, transition: 'background .1s', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FFF5F5'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                        <LogOut size={13} /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button onClick={openModal}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, border: `1.5px solid ${BD}`, fontSize: 13, fontWeight: 700, color: T1, background: W, cursor: 'pointer', transition: 'all .13s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.color = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD; (e.currentTarget as HTMLElement).style.color = T1; }}>
              <User size={14} /> Login
            </button>
          )}
          <button
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 10, background: G, fontSize: 13.5, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', transition: 'background .13s', boxShadow: `0 2px 10px rgba(13,163,102,.28)`, whiteSpace: 'nowrap' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = G2}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = G}>
            <ShoppingCart size={15} />
            <span>Cart</span>
            <span style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: 9.5, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
          </button>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════ HERO ═══════════════ */

const HERO_DATA: Record<string, { name: string; headline: string; sub: string; cta: string; color: string; dark: string; img: string; badge: string; tags: string[] }> = {
  now:    { name: 'Zyphix Now',      headline: 'Groceries delivered\nin 30 minutes.',        sub: 'Kirana stores · Pharmacy · Supermarket · 200+ partner stores near you', cta: 'Order Groceries', color: G,         dark: '#065F46', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&h=600&fit=crop&q=90', badge: '⚡ Fastest delivery in India',   tags: ['Vegetables','Dairy','Snacks','Pharmacy','Beverages','Household'] },
  eats:   { name: 'Zyphix Eats',     headline: 'Food from your\nfavourite places.',         sub: 'Restaurants · Dhabas · Cloud kitchens · Local gems near you',               cta: 'Order Food',      color: '#EA580C', dark: '#9A3412', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=600&fit=crop&q=90', badge: '🍱 Local restaurants near you',  tags: ['Biryani','Pizza','Burgers','Thali','Desserts','Drinks'] },
  map:    { name: 'Stores Near Me',  headline: 'Find local stores\nnear you.',               sub: 'Kirana · Medical · Supermarkets — all on the map',                          cta: 'Explore Map',     color: G,         dark: '#065F46', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400&h=600&fit=crop&q=90', badge: '📍 Jammu, J&K',                  tags: [] },
  offers: { name: 'Exclusive Offers',headline: "Deals you won't\nfind elsewhere.",           sub: 'Promo codes · Flash sales · First-order discounts',                          cta: 'See All Offers',  color: '#D97706', dark: '#92400E', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=600&fit=crop&q=90', badge: '🏷️ New deals daily',               tags: [] },
};

/* ═══════════════ DUAL HERO BANNERS ═══════════════ */
function DualHeroBanners() {
  const [hovNow, setHovNow] = useState(false);
  const [hovEats, setHovEats] = useState(false);
  const scrollToWaitlist = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: W }}>
      <style>{`
        @media (max-width: 767px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-panel { height: 340px !important; min-height: 320px !important; }
          .hero-headline { font-size: 1.65rem !important; }
          .hero-pills { flex-wrap: wrap !important; }
        }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      `}</style>
      <div className="hero-grid" style={{ maxWidth: 1320, margin: '0 auto', padding: '20px 24px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>

        {/* ── ZyphixNow ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32 }}
          className="hero-panel"
          style={{ position: 'relative', height: 480, borderRadius: 26, overflow: 'hidden', cursor: 'pointer', boxShadow: hovNow ? '0 24px 64px rgba(6,95,70,.38)' : SH2, transition: 'box-shadow .28s, transform .28s', transform: hovNow ? 'translateY(-5px)' : 'none' }}
          onMouseEnter={() => setHovNow(true)} onMouseLeave={() => setHovNow(false)}
          onClick={() => scrollToWaitlist()}
        >
          {/* YouTube background — vegetable cutting */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=1100&fit=crop&q=85"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
            <iframe
              src="https://www.youtube.com/embed/yIF2jlC05TU?autoplay=1&mute=1&loop=1&controls=0&playlist=yIF2jlC05TU&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200%', height: '200%', border: 'none', pointerEvents: 'none' }}
              allow="autoplay; encrypted-media"
              title="vegetable-bg"
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(175deg, rgba(3,32,18,.2) 0%, rgba(4,58,34,.72) 45%, rgba(2,26,14,.98) 100%)' }} />
          <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(16,214,120,.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ background: 'rgba(16,214,120,.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,214,120,.38)', color: '#6EE7B7', fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 99, letterSpacing: '.03em' }}>
                ⚡ Now · 30 min delivery
              </span>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(145deg, #10D678 0%, #059E5C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(16,214,120,.5)' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontStyle: 'italic', fontSize: 18, color: '#fff', lineHeight: 1, letterSpacing: '-0.08em', userSelect: 'none', textShadow: '0 1px 4px rgba(0,0,0,.25)' }}>//</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: '#86EFAC', letterSpacing: '.11em', textTransform: 'uppercase', marginBottom: 10 }}>Zyphix Now</p>
              <h2 className="hero-headline" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.04, fontSize: 'clamp(1.65rem,3.2vw,2.95rem)', letterSpacing: '-.045em', marginBottom: 13 }}>Groceries<br />in 30 minutes.</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 16, lineHeight: 1.6 }}>Fresh produce · Dairy · Pharmacy · Snacks<br />200+ partner stores at kirana prices</p>
              <div className="hero-pills" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 10 }}>
                {['Vegetables', 'Dairy', 'Snacks', 'Pharmacy', 'Household'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(6px)', color: 'rgba(255,255,255,.84)', fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 9, border: '1px solid rgba(255,255,255,.18)' }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.68)', fontStyle: 'italic', marginBottom: 20 }}>Sourced from kirana stores near you — not dark warehouses</p>
              <div>
                <button onClick={e => { e.stopPropagation(); scrollToWaitlist(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: G, color: '#fff', fontSize: 15, fontWeight: 800, padding: '14px 30px', borderRadius: 13, boxShadow: '0 8px 28px rgba(16,214,120,.48)', border: 'none', cursor: 'pointer', transition: 'filter .15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}>
                  Order Groceries <ArrowRight size={16} />
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', marginTop: 8 }}>Launching soon in Jammu</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── ZyphixEats ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .32, delay: .1 }}
          className="hero-panel"
          style={{ position: 'relative', height: 480, borderRadius: 26, overflow: 'hidden', cursor: 'pointer', boxShadow: hovEats ? '0 24px 64px rgba(154,52,18,.38)' : SH2, transition: 'box-shadow .28s, transform .28s', transform: hovEats ? 'translateY(-5px)' : 'none' }}
          onMouseEnter={() => setHovEats(true)} onMouseLeave={() => setHovEats(false)}
          onClick={() => scrollToWaitlist()}
        >
          {/* YouTube background — cheese pull pizza */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&h=1100&fit=crop&q=85"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              alt=""
            />
            <iframe
              src="https://www.youtube.com/embed/dbx5V4a3hW4?autoplay=1&mute=1&loop=1&controls=0&playlist=dbx5V4a3hW4&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '200%', height: '200%', border: 'none', pointerEvents: 'none' }}
              allow="autoplay; encrypted-media"
              title="pizza-bg"
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(175deg, rgba(50,10,5,.15) 0%, rgba(100,22,5,.68) 45%, rgba(40,4,0,.98) 100%)' }} />
          <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(249,115,22,.12)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ background: 'rgba(251,146,60,.18)', backdropFilter: 'blur(10px)', border: '1px solid rgba(251,146,60,.38)', color: '#FDBA74', fontSize: 12, fontWeight: 700, padding: '5px 16px', borderRadius: 99, letterSpacing: '.03em' }}>
                🍱 Eats · Local restaurants near you
              </span>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: 'linear-gradient(145deg, #F97316 0%, #EA580C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(249,115,22,.5)' }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontStyle: 'italic', fontSize: 18, color: '#fff', lineHeight: 1, letterSpacing: '-0.08em', userSelect: 'none', textShadow: '0 1px 4px rgba(0,0,0,.25)' }}>//</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11.5, fontWeight: 700, color: '#FDBA74', letterSpacing: '.11em', textTransform: 'uppercase', marginBottom: 10 }}>Zyphix Eats</p>
              <h2 className="hero-headline" style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', lineHeight: 1.04, fontSize: 'clamp(1.65rem,3.2vw,2.95rem)', letterSpacing: '-.045em', marginBottom: 13 }}>Food from your<br />favourite places.</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', marginBottom: 20, lineHeight: 1.6 }}>Restaurants · Dhabas · Cloud kitchens<br />Local gems near you, delivered hot</p>
              <div className="hero-pills" style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 26 }}>
                {['Biryani', 'Pizza', 'Burgers', 'Thali', 'Desserts'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(6px)', color: 'rgba(255,255,255,.84)', fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 9, border: '1px solid rgba(255,255,255,.18)' }}>{tag}</span>
                ))}
              </div>
              <div>
                <button onClick={e => { e.stopPropagation(); scrollToWaitlist(); }} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#EA580C', color: '#fff', fontSize: 15, fontWeight: 800, padding: '14px 30px', borderRadius: 13, boxShadow: '0 8px 28px rgba(234,88,12,.48)', border: 'none', cursor: 'pointer', transition: 'filter .15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'}>
                  Order Food <ArrowRight size={16} />
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', marginTop: 8 }}>Be first to order</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ═══════════════ TRUST STRIP ═══════════════ */
function Trust() {
  const stats = [
    { icon: <Zap size={16} color={G} />,      label: '30 Min',       sub: 'Guaranteed delivery',  accent: true },
    { icon: <Package size={16} color={T2} />,  label: 'Jammu First',  sub: 'Launching in J&K',     accent: false },
    { icon: <MapPin size={16} color={T2} />,   label: 'Tier 2 India', sub: 'Built for Bharat',     accent: false },
    { icon: <Truck size={16} color={T2} />,    label: '₹0 Surge',     sub: 'Always fair pricing',  accent: false },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * .13, duration: .5, ease: [.22,1,.36,1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '15px 20px', borderRight: i < 3 ? `1px solid ${BD}` : 'none', borderLeft: s.accent ? `3px solid ${G}` : '3px solid transparent' }}>
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * .13 + .1, type: 'spring', stiffness: 400 }}
              style={{ width: 34, height: 34, borderRadius: 9, background: s.accent ? 'rgba(13,163,102,.08)' : BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.icon}</motion.div>
            <div>
              <p style={{ fontWeight: 700, color: T1, fontSize: 14, lineHeight: 1 }}>{s.label}</p>
              <p style={{ fontSize: 11, fontWeight: 400, color: T3, marginTop: 2 }}>{s.sub}</p>
            </div>
          </motion.div>
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

/* ═══════════════ BRAND CHIP STRIP ═══════════════ */
interface BC { name: string; abbr: string; textColor: string; bg: string; }

const NOW_BRANDS: BC[] = [
  { name: 'Amul',        abbr: 'AM',  textColor: '#fff', bg: '#1D6FB4' },
  { name: 'Nestlé',      abbr: 'NE',  textColor: '#fff', bg: '#C8102E' },
  { name: 'Britannia',   abbr: 'BR',  textColor: '#fff', bg: '#E42313' },
  { name: 'Tata',        abbr: 'TA',  textColor: '#fff', bg: '#00285E' },
  { name: 'Haldirams',   abbr: 'HD',  textColor: '#fff', bg: '#E55126' },
  { name: 'ITC',         abbr: 'ITC', textColor: '#fff', bg: '#7B2335' },
  { name: 'Dabur',       abbr: 'DA',  textColor: '#fff', bg: '#007030' },
  { name: 'Patanjali',   abbr: 'PA',  textColor: '#fff', bg: '#F07800' },
  { name: 'Fortune',     abbr: 'FO',  textColor: '#fff', bg: '#EF4123' },
  { name: 'Mother Dairy',abbr: 'MD',  textColor: '#fff', bg: '#003A96' },
  { name: 'MDH',         abbr: 'MDH', textColor: '#fff', bg: '#C41230' },
  { name: 'Marico',      abbr: 'MA',  textColor: '#fff', bg: '#E31837' },
  { name: 'Colgate',     abbr: 'CO',  textColor: '#fff', bg: '#D01F3C' },
  { name: 'Maggi',       abbr: 'MG',  textColor: '#fff', bg: '#B62400' },
  { name: 'Parle',       abbr: 'PR',  textColor: '#fff', bg: '#DD4C00' },
  { name: 'Lifebuoy',    abbr: 'LB',  textColor: '#fff', bg: '#D2000D' },
];

const EATS_BRANDS: BC[] = [
  { name: "Domino's",      abbr: 'DO',  textColor: '#fff', bg: '#006DB7' },
  { name: "McDonald's",    abbr: 'MC',  textColor: '#DA291C', bg: '#FFC72C' },
  { name: 'KFC',           abbr: 'KFC', textColor: '#fff', bg: '#E8002D' },
  { name: 'Subway',        abbr: 'SU',  textColor: '#fff', bg: '#009B77' },
  { name: 'Pizza Hut',     abbr: 'PH',  textColor: '#fff', bg: '#EE3124' },
  { name: 'Burger King',   abbr: 'BK',  textColor: '#fff', bg: '#FF8732' },
  { name: 'Wow Momo',      abbr: 'WM',  textColor: '#fff', bg: '#E94B4B' },
  { name: 'Haldirams',     abbr: 'HD',  textColor: '#fff', bg: '#E55126' },
  { name: 'Starbucks',     abbr: 'SB',  textColor: '#fff', bg: '#00704A' },
  { name: 'CCD',           abbr: 'CCD', textColor: '#fff', bg: '#6F3D22' },
  { name: 'Behrouz',       abbr: 'BB',  textColor: '#fff', bg: '#8B1A2B' },
  { name: 'Box8',          abbr: 'B8',  textColor: '#fff', bg: '#F05A22' },
  { name: 'Chai Point',    abbr: 'CP',  textColor: '#fff', bg: '#C2412D' },
  { name: 'Biryani Blues', abbr: 'BI',  textColor: '#fff', bg: '#2E4A86' },
  { name: 'Barbeque Nation',abbr:'BN',  textColor: '#fff', bg: '#8B0000' },
];

const BOOK_BRANDS: BC[] = [
  { name: 'Urban Company',  abbr: 'UC',  textColor: '#fff', bg: '#7C3AED' },
  { name: 'Apollo',         abbr: 'AP',  textColor: '#fff', bg: '#00427A' },
  { name: 'Dr. Lal PathLabs',abbr:'LP',  textColor: '#fff', bg: '#E31837' },
  { name: 'Housejoy',       abbr: 'HJ',  textColor: '#fff', bg: '#FF6B35' },
  { name: 'Sulekha',        abbr: 'SL',  textColor: '#fff', bg: '#0066CC' },
  { name: 'HomeTriangle',   abbr: 'HT',  textColor: '#fff', bg: '#2E86AB' },
  { name: 'Quikr Services', abbr: 'QS',  textColor: '#fff', bg: '#9C27B0' },
  { name: 'TaskBob',        abbr: 'TB',  textColor: '#fff', bg: '#FF6B00' },
  { name: 'JustDial',       abbr: 'JD',  textColor: '#fff', bg: '#1A73E8' },
  { name: 'Mr. Right',      abbr: 'MR',  textColor: '#fff', bg: '#0F9D58' },
];

function BrandRow({ title, brands, accent }: { title: string; brands: BC[]; accent: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <Row title={title} action="All brands" />
      <Scroller>
        {brands.map((b, i) => {
          const on = active === b.name;
          return (
            <button
              key={i}
              onClick={() => setActive(on ? null : b.name)}
              className="snap-start shrink-0 flex flex-col items-center gap-2 group"
            >
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: b.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2.5px solid ${on ? accent : 'transparent'}`,
                boxShadow: on ? `0 0 0 4px ${accent}22, ${SH}` : SH,
                transition: 'all .2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              >
                <span style={{
                  color: b.textColor, fontWeight: 900,
                  fontSize: b.abbr.length > 2 ? 14 : 20,
                  fontFamily: "'Outfit',sans-serif", letterSpacing: '-0.02em',
                }}>{b.abbr}</span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: on ? T1 : T2,
                textAlign: 'center', width: 80, lineHeight: 1.3,
              }}>{b.name}</span>
            </button>
          );
        })}
      </Scroller>
    </div>
  );
}

/* ═══════════════ NOW TAB ═══════════════ */
function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rm = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalP = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Hero banners */}
      <Scroller>
        {[
          { tag: 'New User Offer', h: '50% off your first order', sub: 'Code ZYPHIX50 · Max ₹100 off', code: 'ZYPHIX50', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&h=380&fit=crop&q=85' },
          { tag: 'Partner Stores', h: '200+ partner stores in Jammu', sub: 'Zero surge pricing · Always fresh', code: '', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&h=380&fit=crop&q=85' },
          { tag: 'Pharmacy', h: 'Medicines delivered fast', sub: 'Prescription & OTC · All brands', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=900&h=380&fit=crop&q=85' },
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

      {/* Launching Soon Panel */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1, type:'spring', stiffness:120 }}
        style={{ background:'linear-gradient(135deg,#0B1829 0%,#0F2540 100%)', borderRadius:22, overflow:'hidden', position:'relative', padding:'44px 40px' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%,rgba(13,163,102,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:-40, right:-40, width:220, height:220, borderRadius:'50%', background:'rgba(13,163,102,.06)', pointerEvents:'none' }} />
        <div style={{ position:'relative', display:'flex', flexWrap:'wrap', gap:36, alignItems:'center' }}>
          <div style={{ flex:'1 1 280px' }}>
            <motion.div animate={{ scale:[1,1.1,1] }} transition={{ repeat:Infinity, duration:2 }}
              style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(13,163,102,.15)', border:'1px solid rgba(13,163,102,.35)', color:G, fontSize:12, fontWeight:700, padding:'6px 16px', borderRadius:99, marginBottom:18 }}>
              <span>🚀</span> Launching in Jammu — Be first to shop
            </motion.div>
            <h2 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(1.5rem,3vw,2.1rem)', color:'#fff', letterSpacing:'-.04em', lineHeight:1.15, marginBottom:12 }}>
              Groceries from your<br /><span style={{ color:G }}>local kirana stores</span>
            </h2>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.55)', lineHeight:1.7, marginBottom:24 }}>
              We're onboarding stores in Jammu right now. Join the waitlist to shop 200+ categories — fresh produce, dairy, snacks, pharmacy and more — delivered in 30 minutes.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              {['🥬 Fruits & Veg','🥛 Dairy','💊 Pharmacy','🍿 Snacks','🌾 Grains & Dal','🧹 Household'].map(c => (
                <span key={c} style={{ display:'inline-flex', alignItems:'center', gap:5, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.75)', fontSize:12.5, fontWeight:600, padding:'6px 14px', borderRadius:99 }}>{c}</span>
              ))}
              <span style={{ color:'rgba(255,255,255,.35)', fontSize:12.5, fontWeight:600, padding:'6px 4px' }}>+ more</span>
            </div>
          </div>
          <div style={{ flex:'0 0 auto', textAlign:'center' }}>
            <motion.div animate={{ y:[0,-8,0] }} transition={{ repeat:Infinity, duration:2.4, ease:'easeInOut' }}
              style={{ fontSize:80, lineHeight:1, marginBottom:12 }}>🛒</motion.div>
            <p style={{ fontSize:12, color:'rgba(255,255,255,.35)', fontWeight:600 }}>COMING SOON</p>
          </div>
        </div>
      </motion.div>

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
      {/* Top restaurant chains */}
      <TabMarquee logos={EatsBrandLogos} items={EATS_MARQUEE} label={"Partner\nBrands"} />

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

/* ── Faithful SVG brand-logo representations ── */
const BrandLogos: Record<string, React.ReactNode> = {
  Amul: (
    <svg viewBox="0 0 100 36" width={100} height={36}>
      <polygon points="18,2 30,2 36,13 30,24 18,24 12,13" fill="#1D6FB4"/>
      <text x="24" y="11" textAnchor="middle" fill="#FCD116" fontSize="5.5" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">UTTERLY</text>
      <text x="24" y="17" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" fontFamily="Arial,sans-serif">BUTTERLY</text>
      <text x="24" y="23" textAnchor="middle" fill="#FCD116" fontSize="5" fontWeight="800" fontFamily="Arial,sans-serif">DELICIOUS</text>
      <text x="68" y="22" textAnchor="middle" fill="#1D6FB4" fontSize="20" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="-1">Amul</text>
    </svg>
  ),
  Tata: (
    <svg viewBox="0 0 80 36" width={80} height={36}>
      <ellipse cx="40" cy="18" rx="37" ry="15" fill="none" stroke="#00285E" strokeWidth="2.5"/>
      <text x="40" y="23" textAnchor="middle" fill="#00285E" fontSize="14" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="4">TATA</text>
    </svg>
  ),
  'Nestlé': (
    <svg viewBox="0 0 96 36" width={96} height={36}>
      <path d="M10 28 Q12 14 16 10 Q18 6 22 12 Q18 8 16 14 Q14 20 16 26" fill="#8B6F47" stroke="#8B6F47" strokeWidth="0.5"/>
      <path d="M14 14 Q18 10 22 14 M14 18 Q18 14 22 18" stroke="#8B6F47" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="16" cy="8" r="3" fill="#8B6F47"/>
      <circle cx="20" cy="6" r="2.5" fill="#8B6F47"/>
      <circle cx="24" cy="8" r="2" fill="#8B6F47"/>
      <text x="60" y="23" textAnchor="middle" fill="#1A1A1A" fontSize="18" fontWeight="700" fontFamily="Georgia,Times New Roman,serif" letterSpacing="-0.5">Nestlé</text>
    </svg>
  ),
  Britannia: (
    <svg viewBox="0 0 106 36" width={106} height={36}>
      <circle cx="18" cy="18" r="15" fill="#E42313"/>
      <text x="18" y="24" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" fontFamily="Georgia,serif">B</text>
      <text x="64" y="23" textAnchor="middle" fill="#E42313" fontSize="15" fontWeight="700" fontFamily="Georgia,Times New Roman,serif">Britannia</text>
    </svg>
  ),
  ITC: (
    <svg viewBox="0 0 74 36" width={74} height={36}>
      <rect x="2" y="4" width="70" height="28" rx="4" fill="none" stroke="#7B2335" strokeWidth="2.5"/>
      <rect x="6" y="8" width="62" height="20" rx="2" fill="#7B2335"/>
      <text x="37" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="5">ITC</text>
    </svg>
  ),
  Haldirams: (
    <svg viewBox="0 0 108 36" width={108} height={36}>
      <path d="M8 26 L8 10 M8 18 L18 10 M18 10 L18 26" stroke="#E55126" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="66" y="23" textAnchor="middle" fill="#E55126" fontSize="15" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Haldirams</text>
    </svg>
  ),
  Dabur: (
    <svg viewBox="0 0 84 36" width={84} height={36}>
      <path d="M8 30 Q8 8 14 6 Q10 10 12 18 Q14 8 16 12 Q12 14 14 22 Q18 12 18 26" fill="#007030" opacity="0.85"/>
      <circle cx="14" cy="5" r="3.5" fill="#007030"/>
      <text x="52" y="23" textAnchor="middle" fill="#007030" fontSize="18" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Dabur</text>
    </svg>
  ),
  Patanjali: (
    <svg viewBox="0 0 110 36" width={110} height={36}>
      <path d="M8 28 L14 6 L20 28 M10 20 L18 20" stroke="#F07800" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="4" r="3" fill="#F07800"/>
      <text x="64" y="23" textAnchor="middle" fill="#F07800" fontSize="13.5" fontWeight="900" fontFamily="Arial,sans-serif">Patanjali</text>
    </svg>
  ),
  'P&G': (
    <svg viewBox="0 0 72 36" width={72} height={36}>
      <circle cx="20" cy="18" r="14" fill="none" stroke="#003DA5" strokeWidth="2.5"/>
      <circle cx="34" cy="18" r="14" fill="none" stroke="#003DA5" strokeWidth="2.5"/>
      <rect x="14" y="8" width="40" height="20" rx="0" fill="white"/>
      <text x="20" y="23" textAnchor="middle" fill="#003DA5" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">P</text>
      <text x="36" y="23" textAnchor="middle" fill="#003DA5" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">&amp;G</text>
      <circle cx="20" cy="18" r="14" fill="none" stroke="#003DA5" strokeWidth="2.5"/>
      <circle cx="34" cy="18" r="14" fill="none" stroke="#003DA5" strokeWidth="2.5"/>
    </svg>
  ),
  HUL: (
    <svg viewBox="0 0 80 36" width={80} height={36}>
      <path d="M12 4 Q12 32 12 32 M12 4 Q20 4 20 10 Q20 18 12 18 Q20 18 20 26 Q20 32 12 32" stroke="#00527E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8 4 Q22 0 26 8 Q28 16 22 20 L28 32" stroke="#00527E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
      <text x="54" y="23" textAnchor="middle" fill="#00527E" fontSize="17" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">HUL</text>
    </svg>
  ),
  MDH: (
    <svg viewBox="0 0 76 36" width={76} height={36}>
      <circle cx="18" cy="18" r="15" fill="#C41230"/>
      <path d="M10 26 L14 10 L18 20 L22 10 L26 26" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="52" y="23" textAnchor="middle" fill="#C41230" fontSize="17" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">MDH</text>
    </svg>
  ),
  Fortune: (
    <svg viewBox="0 0 96 36" width={96} height={36}>
      <path d="M12 30 L12 8 M8 18 L16 18 M10 8 Q12 2 14 8" stroke="#EF4123" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8 8 Q12 4 16 8" stroke="#EF4123" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="58" y="23" textAnchor="middle" fill="#EF4123" fontSize="16" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Fortune</text>
    </svg>
  ),
  'Mother Dairy': (
    <svg viewBox="0 0 118 36" width={118} height={36}>
      <ellipse cx="16" cy="22" rx="10" ry="8" fill="none" stroke="#003A96" strokeWidth="2"/>
      <path d="M8 18 Q10 8 16 8 Q22 8 24 18" stroke="#003A96" strokeWidth="2" fill="#003A96" fillOpacity="0.15"/>
      <circle cx="12" cy="22" r="1.5" fill="#003A96"/>
      <circle cx="20" cy="22" r="1.5" fill="#003A96"/>
      <text x="70" y="23" textAnchor="middle" fill="#003A96" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Mother Dairy</text>
    </svg>
  ),
  Godrej: (
    <svg viewBox="0 0 86 36" width={86} height={36}>
      <path d="M22 18 Q22 6 12 6 Q2 6 2 18 Q2 30 12 30 Q18 30 21 25 L16 25 Q14 27 12 27 Q6 27 5 18 Q6 9 12 9 Q18 9 19 15 L22 15 Z" fill="#1B2D4F"/>
      <text x="56" y="23" textAnchor="middle" fill="#1B2D4F" fontSize="16" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Godrej</text>
    </svg>
  ),
  Marico: (
    <svg viewBox="0 0 86 36" width={86} height={36}>
      <path d="M4 28 L8 8 L14 22 L20 8 L24 28" stroke="#E31837" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="56" y="23" textAnchor="middle" fill="#E31837" fontSize="16" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Marico</text>
    </svg>
  ),
};

const BRANDS = [
  { name: 'Amul',        color: '#1D6FB4' },
  { name: 'Tata',        color: '#00285E' },
  { name: 'Nestlé',      color: '#C8102E' },
  { name: 'Britannia',   color: '#E42313' },
  { name: 'ITC',         color: '#7B2335' },
  { name: 'Haldirams',   color: '#E55126' },
  { name: 'Dabur',       color: '#007030' },
  { name: 'Patanjali',   color: '#F07800' },
  { name: 'P&G',         color: '#003DA5' },
  { name: 'HUL',         color: '#00527E' },
  { name: 'MDH',         color: '#C41230' },
  { name: 'Fortune',     color: '#EF4123' },
  { name: 'Mother Dairy',color: '#003A96' },
  { name: 'Godrej',      color: '#1B2D4F' },
  { name: 'Marico',      color: '#E31837' },
];

function BrandsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doubled = [...BRANDS, ...BRANDS];

  const onEnter = (i: number) => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.style.filter = idx === i ? 'none' : 'grayscale(1) opacity(0.3)';
      el.style.transform = idx === i ? 'translateY(-2px) scale(1.06)' : 'translateY(0) scale(1)';
    });
  };

  const onLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
    itemRefs.current.forEach(el => {
      if (!el) return;
      el.style.filter = 'grayscale(1) opacity(0.3)';
      el.style.transform = 'translateY(0) scale(1)';
    });
  };

  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, overflow: 'hidden', padding: '12px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexShrink: 0, padding: '0 20px 0 16px', borderRight: `1px solid ${BD}`, marginRight: 0 }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: T3, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1.4 }}>Partner<br/>Brands</p>
        </div>
        <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right, transparent, black 70px, black calc(100% - 70px), transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 70px, black calc(100% - 70px), transparent)' }}>
          <div ref={trackRef} style={{ display: 'flex', animation: 'marquee 42s linear infinite', width: 'max-content' }}>
            {doubled.map((b, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '6px 20px',
                  borderRight: `1px solid ${BD}`,
                  flexShrink: 0,
                  cursor: 'default',
                  filter: 'grayscale(1) opacity(0.3)',
                  transition: 'filter 0.22s ease, transform 0.22s ease',
                  height: 52,
                }}
              >
                {BrandLogos[b.name]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ EATS & BOOK PARTNER MARQUEES ═══════════════ */

const EatsBrandLogos: Record<string, React.ReactNode> = {
  "Domino's": (
    <svg viewBox="0 0 92 36" width={92} height={36}>
      <rect x="2" y="7" width="24" height="22" rx="3.5" fill="#fff" stroke="#006DB7" strokeWidth="2"/>
      <line x1="2" y1="18" x2="26" y2="18" stroke="#006DB7" strokeWidth="1.8"/>
      <circle cx="9.5" cy="12.5" r="2.2" fill="#006DB7"/>
      <circle cx="18.5" cy="23" r="2.2" fill="#006DB7"/>
      <text x="60" y="23" textAnchor="middle" fill="#006DB7" fontSize="13" fontWeight="700" fontFamily="Arial,sans-serif">domino's</text>
    </svg>
  ),
  "McDonald's": (
    <svg viewBox="0 0 94 36" width={94} height={36}>
      <path d="M4 28 L4 14 Q4 6 11 6 Q17 6 17 14 L17 18 L17 14 Q17 6 24 6 Q31 6 31 14 L31 28" stroke="#FFC72C" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="62" y="23" textAnchor="middle" fill="#DA291C" fontSize="12" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">McDonald's</text>
    </svg>
  ),
  KFC: (
    <svg viewBox="0 0 72 36" width={72} height={36}>
      <circle cx="18" cy="18" r="15" fill="#E8002D"/>
      <text x="18" y="23" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">KFC</text>
      <text x="46" y="23" textAnchor="middle" fill="#E8002D" fontSize="15" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">KFC</text>
    </svg>
  ),
  Subway: (
    <svg viewBox="0 0 100 36" width={100} height={36}>
      <rect x="1" y="7" width="98" height="22" rx="4" fill="#009B77"/>
      <text x="50" y="23" textAnchor="middle" fill="#FFC20E" fontSize="14" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif" letterSpacing="2">SUBWAY</text>
    </svg>
  ),
  'Pizza Hut': (
    <svg viewBox="0 0 90 36" width={90} height={36}>
      <path d="M12 18 L20 6 L28 18 Z" fill="#EE3124"/>
      <rect x="11" y="17" width="18" height="12" rx="2" fill="#EE3124"/>
      <text x="60" y="23" textAnchor="middle" fill="#EE3124" fontSize="12.5" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Pizza Hut</text>
    </svg>
  ),
  'Burger King': (
    <svg viewBox="0 0 108 36" width={108} height={36}>
      <rect x="2" y="6" width="28" height="5" rx="2.5" fill="#FF8732"/>
      <rect x="2" y="14" width="28" height="8" rx="4" fill="#DA291C"/>
      <rect x="2" y="25" width="28" height="5" rx="2.5" fill="#FF8732"/>
      <text x="18" y="21" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="900" fontFamily="Arial,sans-serif">BK</text>
      <text x="72" y="23" textAnchor="middle" fill="#7B3D00" fontSize="12.5" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Burger King</text>
    </svg>
  ),
  'Wow Momo': (
    <svg viewBox="0 0 96 36" width={96} height={36}>
      <path d="M10 24 Q10 10 16 10 Q19 6 22 10 Q28 10 28 24 Q24 28 16 28 Q12 28 10 24Z" fill="#E94B4B"/>
      <path d="M14 16 Q18 12 22 16" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="62" y="23" textAnchor="middle" fill="#E94B4B" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Wow Momo</text>
    </svg>
  ),
  Haldirams: (
    <svg viewBox="0 0 108 36" width={108} height={36}>
      <path d="M8 26 L8 10 M8 18 L18 10 M18 10 L18 26" stroke="#E55126" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <text x="66" y="23" textAnchor="middle" fill="#E55126" fontSize="15" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Haldirams</text>
    </svg>
  ),
  Starbucks: (
    <svg viewBox="0 0 100 36" width={100} height={36}>
      <circle cx="18" cy="18" r="14" fill="#00704A"/>
      <path d="M18 8 L20 14 L26 14 L21 18 L23 24 L18 20 L13 24 L15 18 L10 14 L16 14 Z" fill="#fff"/>
      <text x="60" y="23" textAnchor="middle" fill="#00704A" fontSize="13" fontWeight="900" fontFamily="Arial,sans-serif">Starbucks</text>
    </svg>
  ),
  CCD: (
    <svg viewBox="0 0 78 36" width={78} height={36}>
      <path d="M8 26 Q4 26 4 18 Q4 10 8 10 L12 10 Q10 14 10 18 Q10 22 12 26Z" fill="#6F3D22"/>
      <path d="M8 30 Q28 30 28 18 Q28 8 22 6" stroke="#6F3D22" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="24" cy="5" r="2.5" fill="#6F3D22"/>
      <text x="52" y="23" textAnchor="middle" fill="#6F3D22" fontSize="16" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">CCD</text>
    </svg>
  ),
  Behrouz: (
    <svg viewBox="0 0 86 36" width={86} height={36}>
      <path d="M10 8 L14 4 L18 8 M14 4 L14 28" stroke="#8B1A2B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M8 28 L20 28" stroke="#8B1A2B" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="56" y="23" textAnchor="middle" fill="#8B1A2B" fontSize="14" fontWeight="900" fontFamily="Georgia,serif">Behrouz</text>
    </svg>
  ),
  Box8: (
    <svg viewBox="0 0 74 36" width={74} height={36}>
      <path d="M4 12 L14 7 L24 12 L24 24 L14 29 L4 24 Z" fill="#F05A22"/>
      <path d="M4 12 L14 17 L24 12 M14 17 L14 29" stroke="#fff" strokeWidth="1.5" fill="none"/>
      <text x="51" y="24" textAnchor="middle" fill="#F05A22" fontSize="18" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">b8</text>
    </svg>
  ),
  'Chai Point': (
    <svg viewBox="0 0 98 36" width={98} height={36}>
      <path d="M6 26 Q6 10 14 10 L22 10 Q30 10 30 18 Q30 26 22 26 L6 26" fill="none" stroke="#C2412D" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M30 16 Q34 14 34 18 Q34 22 30 20" stroke="#C2412D" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="10" y1="30" x2="26" y2="30" stroke="#C2412D" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="64" y="23" textAnchor="middle" fill="#C2412D" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Chai Point</text>
    </svg>
  ),
  'Biryani Blues': (
    <svg viewBox="0 0 112 36" width={112} height={36}>
      <path d="M4 28 Q4 10 14 10 Q18 6 22 10 Q32 10 32 28 L4 28" fill="#2E4A86"/>
      <path d="M8 20 Q18 16 28 20" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="73" y="23" textAnchor="middle" fill="#2E4A86" fontSize="12.5" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Biryani Blues</text>
    </svg>
  ),
  'Barbeque Nation': (
    <svg viewBox="0 0 130 36" width={130} height={36}>
      <path d="M12 28 Q10 22 12 16 Q14 10 16 16 Q18 10 20 16 Q22 10 24 16 Q26 22 24 28" stroke="#8B0000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M10 30 L26 30" stroke="#8B0000" strokeWidth="2.5" strokeLinecap="round"/>
      <text x="79" y="23" textAnchor="middle" fill="#8B0000" fontSize="12.5" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">Barbeque Nation</text>
    </svg>
  ),
};

const EATS_MARQUEE = [
  { name: "Domino's",        color: '#006DB7' },
  { name: "McDonald's",      color: '#DA291C' },
  { name: 'KFC',             color: '#E8002D' },
  { name: 'Subway',          color: '#009B77' },
  { name: 'Pizza Hut',       color: '#EE3124' },
  { name: 'Burger King',     color: '#FF8732' },
  { name: 'Wow Momo',        color: '#E94B4B' },
  { name: 'Haldirams',       color: '#E55126' },
  { name: 'Starbucks',       color: '#00704A' },
  { name: 'CCD',             color: '#6F3D22' },
  { name: 'Behrouz',         color: '#8B1A2B' },
  { name: 'Box8',            color: '#F05A22' },
  { name: 'Chai Point',      color: '#C2412D' },
  { name: 'Biryani Blues',   color: '#2E4A86' },
  { name: 'Barbeque Nation', color: '#8B0000' },
];


function TabMarquee({ logos, items, label }: {
  logos: Record<string, React.ReactNode>;
  items: Array<{ name: string; color: string }>;
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const doubled = [...items, ...items];

  const onEnter = (i: number) => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      el.style.filter = idx === i ? 'none' : 'grayscale(1) opacity(0.3)';
      el.style.transform = idx === i ? 'translateY(-2px) scale(1.06)' : 'translateY(0) scale(1)';
    });
  };

  const onLeave = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
    itemRefs.current.forEach(el => {
      if (!el) return;
      el.style.filter = 'grayscale(1) opacity(0.3)';
      el.style.transform = 'translateY(0) scale(1)';
    });
  };

  return (
    <div style={{ background: W, border: `1px solid ${BD}`, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 0' }}>
        <div style={{ flexShrink: 0, padding: '0 20px 0 16px', borderRight: `1px solid ${BD}` }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: T3, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1.4 }}>
            {label.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}
          </p>
        </div>
        <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)' }}>
          <div ref={trackRef} style={{ display: 'flex', animation: 'marquee 36s linear infinite', width: 'max-content' }}>
            {doubled.map((b, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '6px 20px',
                  borderRight: `1px solid ${BD}`,
                  flexShrink: 0,
                  cursor: 'default',
                  filter: 'grayscale(1) opacity(0.3)',
                  transition: 'filter 0.22s ease, transform 0.22s ease',
                  height: 52,
                }}
              >
                {logos[b.name]}
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
    {
      n: '01', title: 'Set your location',
      desc: 'Enter your address or allow GPS. We instantly surface verified kirana stores, restaurants and pharmacies within your delivery radius.',
      icon: <MapPin size={20} color={G} />,
      img: 'https://images.unsplash.com/photo-1512291313931-d4291048e7b6?w=480&h=300&fit=crop&q=85',
    },
    {
      n: '02', title: 'Browse & place order',
      desc: 'Choose from 1,000+ grocery items, local restaurants or neighbourhood pharmacies — all in one unified app with real-time stock.',
      icon: <ShoppingCart size={20} color={G} />,
      img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=480&h=300&fit=crop&q=85',
    },
    {
      n: '03', title: 'Delivered in under 30 minutes',
      desc: 'Track your order live. Our hyperlocal riders pick up from the nearest partner store and reach your door — guaranteed no surge pricing, ever.',
      icon: <Zap size={20} color='#fff' />,
      img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=480&h=300&fit=crop&q=85',
      highlight: true,
    },
  ];
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: 24, marginBottom: 52 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 999, padding: '4px 12px', marginBottom: 16 }}>
              <Zap size={11} color={G} fill={G} />
              <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '.08em', textTransform: 'uppercase' }}>How it works</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', color: T1, letterSpacing: '-.05em', lineHeight: 1.05, margin: 0 }}>
              Order to doorstep<br />
              <span style={{ color: G }}>in under 30 minutes.</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: T2, maxWidth: 260, lineHeight: 1.7, marginBottom: 4, textAlign: 'right' }}>
            Three steps. Zero complexity.<br />Hyperlocal delivery built for Jammu.
          </p>
        </div>

        {/* Step cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 48 }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.13, duration: 0.42 }}>
              <div
                style={{
                  borderRadius: 24, overflow: 'hidden', height: '100%',
                  background: s.highlight ? `linear-gradient(145deg, #065F46 0%, ${G} 100%)` : W,
                  border: s.highlight ? 'none' : `1px solid ${BD}`,
                  boxShadow: s.highlight ? '0 16px 48px rgba(13,163,102,.25)' : SH,
                  transition: 'transform .22s, box-shadow .22s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLElement).style.boxShadow = s.highlight ? '0 24px 64px rgba(13,163,102,.35)' : SH2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = s.highlight ? '0 16px 48px rgba(13,163,102,.25)' : SH; }}
              >
                {/* Image */}
                <div style={{ height: 188, overflow: 'hidden', position: 'relative' }}>
                  <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: s.highlight ? 'rgba(6,95,70,.45)' : 'linear-gradient(180deg,transparent 50%,rgba(0,0,0,.18) 100%)' }} />
                  {/* Step number */}
                  <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.4rem', color: s.highlight ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.55)', letterSpacing: '-.04em', lineHeight: 1, textShadow: '0 2px 10px rgba(0,0,0,.25)' }}>{s.n}</div>
                  {/* Icon badge */}
                  <div style={{ position: 'absolute', bottom: 16, right: 16, width: 40, height: 40, borderRadius: 12, background: s.highlight ? G : 'rgba(255,255,255,.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0,0,0,.15)' }}>
                    {s.icon}
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: '22px 24px 28px' }}>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 16.5, letterSpacing: '-.025em', color: s.highlight ? '#fff' : T1, marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                  <p style={{ fontSize: 13.5, color: s.highlight ? 'rgba(255,255,255,.75)' : T2, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                  {s.highlight && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, background: 'rgba(255,255,255,.12)', borderRadius: 999, padding: '5px 12px', border: '1px solid rgba(255,255,255,.2)' }}>
                      <Check size={11} color='#fff' />
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: '#fff', letterSpacing: '.04em' }}>Zero surge pricing · Always</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <div style={{ background: T1, borderRadius: 22, padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { v: '< 30 min', l: 'Guaranteed delivery time', icon: <Zap size={16} color={G} fill={G} />, accent: G },
            { v: '4.8 / 5', l: 'Average customer rating', icon: <Star size={16} color='#F59E0B' fill='#F59E0B' />, accent: '#F59E0B' },
            { v: '200+', l: 'Partner stores in Jammu', icon: <Package size={16} color='#60A5FA' />, accent: '#60A5FA' },
            { v: '₹0', l: 'Surge pricing — ever', icon: <Shield size={16} color='#A78BFA' />, accent: '#A78BFA' },
          ].map(({ v, l, icon, accent }, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * .07 }}>
              <div style={{ padding: '0 28px', borderLeft: i > 0 ? '1px solid rgba(255,255,255,.08)' : 'none', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                  </div>
                </div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,1.75rem)', color: accent, letterSpacing: '-.04em', lineHeight: 1, marginBottom: 6 }}>{v}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', fontWeight: 500, lineHeight: 1.4 }}>{l}</p>
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
            { name: 'Rahul Verma', city: 'Mumbai', rating: 5, text: 'Ordered from my favourite biryani place on ZyphixEats — they delivered in 22 minutes. The food was hot, the app was smooth, and the price was the same as eating there.' },
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
            {['🛒', '🍱'].map((em, i) => (
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
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const [, setLoc] = useLocation();
  const FOOTER_COLS = [
    {
      t: 'Services',
      links: [
        { l: 'Zyphix Now',      onClick: () => scroll('quick-browse') },
        { l: 'Zyphix Eats',     onClick: () => scroll('quick-browse') },
        { l: 'Stores Near Me',  onClick: () => scroll('stores') },
        { l: 'Offers',          onClick: () => scroll('offers') },
      ],
    },
    {
      t: 'Company',
      links: [
        { l: 'About Us',   href: '/about' },
        { l: 'Careers',    href: 'https://wa.me/919682394363?text=Hi%2C%20I%27m%20interested%20in%20career%20opportunities%20at%20Zyphix%20%2F%20Clavix%20Technologies.', ext: true },
        { l: 'Press Kit',  href: 'https://wa.me/919682394363?text=Hi%2C%20I%27d%20like%20to%20request%20the%20Zyphix%20Press%20Kit.', ext: true },
        { l: 'Blog',       href: '/blog' },
        { l: 'Investors',  href: '/investors' },
      ],
    },
    {
      t: 'Support',
      links: [
        { l: 'Help Center',       href: 'https://wa.me/919682394363?text=Hi%2C%20I%20need%20help%20with%20Zyphix.', ext: true },
        { l: 'Contact Us',        href: '/contact' },
        { l: 'Refund Policy',     href: '/terms' },
        { l: 'Privacy Policy',    href: '/privacy' },
        { l: 'Terms of Service',  href: '/terms' },
      ],
    },
  ] as const;

  return (
    <footer style={{ background: T1 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '52px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 44 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <LogoMark size={30} dark />
            </div>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7, marginBottom: 10, maxWidth: 260 }}>India's SuperLocal App — groceries &amp; food delivered from kirana stores near you.</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.28)', lineHeight: 1.6, marginBottom: 22, maxWidth: 260 }}>Currently launching in Jammu, J&K · Expanding to Srinagar &amp; Chandigarh in 2025</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {([
                { ic: <Twitter size={14} />,   href: 'https://twitter.com/zyphixin' },
                { ic: <Instagram size={14} />, href: 'https://instagram.com/zyphixin' },
                { ic: <Linkedin size={14} />,  href: 'https://linkedin.com/in/rahulsangral' },
                { ic: <Phone size={14} />,     href: 'https://wa.me/919682394363' },
              ] as { ic: React.ReactNode; href: string }[]).map(({ ic, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', transition: 'all .15s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.14)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.4)'; }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map(({ t, links }) => (
            <div key={t}>
              <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, marginBottom: 16 }}>{t}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(item => {
                  const btnStyle = { fontSize: 13, color: 'rgba(255,255,255,.38)', transition: 'color .15s', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textAlign: 'left' as const };
                  const aStyle = { fontSize: 13, color: 'rgba(255,255,255,.38)', transition: 'color .15s', textDecoration: 'none', cursor: 'pointer' };
                  const hover = (e: React.MouseEvent, on: boolean) => (e.currentTarget as HTMLElement).style.color = on ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.38)';
                  return (
                    <li key={item.l}>
                      {'ext' in item && (item as any).ext ? (
                        <a href={(item as any).href} target="_blank" rel="noopener noreferrer" style={aStyle}
                          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{item.l}</a>
                      ) : 'href' in item ? (
                        <button onClick={() => setLoc((item as any).href)} style={btnStyle}
                          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{item.l}</button>
                      ) : (
                        <button onClick={(item as any).onClick} style={btnStyle}
                          onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)}>{item.l}</button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.28)' }}>
            © 2026{' '}
            <a href="https://clavix.in" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,.42)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.18)', paddingBottom: 1, transition: 'color .15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.75)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.42)'}>
              Clavix Technologies Pvt. Ltd.
            </a>
            {' '}· All rights reserved
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: G, display: 'block' }} />
            <p style={{ fontSize: 12, fontWeight: 600, color: G }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════ QUICK BROWSE ═══════════════ */
/* Convert an emoji character to its Google Noto Color Emoji 512px PNG URL */
const tw = (emoji: string) => {
  const cp = [...emoji]
    .map(c => c.codePointAt(0)!.toString(16))
    .filter(h => parseInt(h, 16) !== 0xfe0f && parseInt(h, 16) !== 0x200d)
    .join('_');
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${cp}/512.png`;
};

const GROC_CATS = [
  { e: tw('🥬'), n: 'Fruits & Veg',   bg: '#ECFDF5', bd: '#A7F3D0', tc: '#065F46' },
  { e: tw('🥛'), n: 'Dairy & Eggs',   bg: '#F0F9FF', bd: '#BAE6FD', tc: '#0C4A6E' },
  { e: tw('🍿'), n: 'Snacks',         bg: '#FFFBEB', bd: '#FDE68A', tc: '#78350F' },
  { e: tw('💊'), n: 'Pharmacy',       bg: '#FDF4FF', bd: '#E9D5FF', tc: '#581C87' },
  { e: tw('🌾'), n: 'Grains & Dal',   bg: '#FFFBEB', bd: '#FCD34D', tc: '#713F12' },
  { e: tw('🍞'), n: 'Bakery',         bg: '#FFF7ED', bd: '#FED7AA', tc: '#9A3412' },
  { e: tw('🧹'), n: 'Household',      bg: '#F5F3FF', bd: '#DDD6FE', tc: '#4C1D95' },
  { e: tw('✨'), n: 'Personal Care',  bg: '#F0FDFA', bd: '#99F6E4', tc: '#134E4A' },
];
const FOOD_CATS = [
  { e: tw('🍛'), n: 'Biryani',        bg: '#FFF7ED', bd: '#FED7AA', tc: '#9A3412' },
  { e: tw('🍕'), n: 'Pizza',          bg: '#FFF1F2', bd: '#FECDD3', tc: '#9F1239' },
  { e: tw('🍔'), n: 'Burgers',        bg: '#FFFBEB', bd: '#FDE68A', tc: '#78350F' },
  { e: tw('🍱'), n: 'Thali',          bg: '#F0FDF4', bd: '#BBF7D0', tc: '#14532D' },
  { e: tw('☕'), n: 'Chai & Drinks',  bg: '#FDF4FF', bd: '#E9D5FF', tc: '#581C87' },
  { e: tw('🍰'), n: 'Desserts',       bg: '#FFF1F2', bd: '#FECDD3', tc: '#9F1239' },
  { e: tw('🥗'), n: 'Healthy',        bg: '#ECFDF5', bd: '#A7F3D0', tc: '#065F46' },
  { e: tw('🌮'), n: 'Street Food',    bg: '#FFFBEB', bd: '#FDE68A', tc: '#78350F' },
];

function QuickBrowse({ setTab }: { setTab?: (t: TabId) => void }) {
  const Tile = ({ e, n, bg, bd, tc }: { e: string; n: string; bg: string; bd: string; tc: string; tab?: TabId }) => (
    <motion.button
      onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.97 }}
      style={{ padding: '14px 6px 12px', borderRadius: 14, background: bg, border: `1.5px solid ${bd}`, cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, boxShadow: '0 1px 5px rgba(0,0,0,.05)', transition: 'box-shadow .15s', minWidth: 0 }}
    >
      <img src={e} alt={n} draggable={false} style={{ width: 36, height: 36, objectFit: 'contain' }} />
      <span style={{ fontSize: 10.5, fontWeight: 700, color: tc, lineHeight: 1.3, wordBreak: 'keep-all' }}>{n}</span>
    </motion.button>
  );

  return (
    <div style={{ background: W, padding: '26px 24px 30px', borderBottom: `1px solid ${BD}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>

          {/* ── Groceries ── */}
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 15, color: T1, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: G, display: 'inline-block', boxShadow: `0 0 0 3px ${G}22` }} />
                Shop Groceries
                <span style={{ fontSize: 11.5, fontWeight: 600, color: T3, background: BG, padding: '2px 9px', borderRadius: 99, border: `1px solid ${BD}` }}>30 min</span>
              </span>
              <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: 12.5, fontWeight: 700, color: G, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                See all <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {GROC_CATS.map(c => <Tile key={c.n} {...c} />)}
            </div>
          </div>

          {/* ── Food ── */}
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 15, color: T1, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#EA580C', display: 'inline-block', boxShadow: '0 0 0 3px rgba(234,88,12,.14)' }} />
                Order Food
              </span>
              <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: 12.5, fontWeight: 700, color: '#EA580C', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}>
                See all <ChevronRight size={13} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {FOOD_CATS.map(c => <Tile key={c.n} {...c} />)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════ STATS STRIP ═══════════════ */
function WhyZyphixStrip() {
  const ITEMS = [
    { Icon: Zap,        title: '30-Min Delivery',       sub: 'Guaranteed every time',        color: G,         iconBg: '#DCFCE7' },
    { Icon: Star,       title: 'Jammu First',           sub: 'Launching in J&K',             color: '#F59E0B', iconBg: '#FEF3C7' },
    { Icon: TrendingUp, title: 'Tier 2 India',          sub: 'Built for Bharat',             color: '#3B82F6', iconBg: '#DBEAFE' },
    { Icon: Shield,     title: '₹0 Surge Pricing',      sub: 'Always fair, always honest',   color: '#10B981', iconBg: '#D1FAE5' },
    { Icon: Package,    title: 'Real Kirana Partners',  sub: 'No dark warehouses',           color: '#8B5CF6', iconBg: '#EDE9FE' },
    { Icon: BadgeCheck, title: 'Zero Extra Charges',    sub: 'Less than Swiggy / Zomato',    color: '#059669', iconBg: '#ECFDF5' },
    { Icon: MapPin,     title: 'Built for J&K',         sub: 'Your neighbourhood, digital',  color: '#EA580C', iconBg: '#FFEDD5' },
  ];
  const doubled = [...ITEMS, ...ITEMS];
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes stripScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      {/* Left fade */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, #fff 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      {/* Right fade */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, #fff 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div
        ref={ref}
        style={{ display: 'flex', width: 'max-content', animation: 'stripScroll 38s linear infinite' }}
        onMouseEnter={() => { if (ref.current) ref.current.style.animationPlayState = 'paused'; }}
        onMouseLeave={() => { if (ref.current) ref.current.style.animationPlayState = 'running'; }}
      >
        {doubled.map(({ Icon, title, sub, color, iconBg }, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '15px 30px', flexShrink: 0, whiteSpace: 'nowrap' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', background: iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: `0 0 0 1px ${color}22`,
              }}>
                <Icon size={15} color={color} strokeWidth={2.3} />
              </div>
              <div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 13, color: T1, letterSpacing: '-.02em', lineHeight: 1.2 }}>{title}</p>
                <p style={{ fontSize: 11, color: T3, fontWeight: 500, marginTop: 1.5, letterSpacing: '.01em' }}>{sub}</p>
              </div>
            </div>
            {/* Dot separator */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, paddingRight: 4 }}>
              <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#D1D5DB' }} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ BRAND MARQUEE (main page) ═══════════════ */
const KIRANA_BRANDS = [
  'Amul','Tata','Nestlé','Britannia','ITC','Haldirams','Dabur','Patanjali','P&G','HUL','MDH','Fortune','Mother Dairy','Godrej','Marico',
];
function BrandMarqueeMain() {
  const doubled = [...KIRANA_BRANDS, ...KIRANA_BRANDS];
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, padding: '0' }}>
      <style>{`@keyframes marqueeL{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes marqueeR{from{transform:translateX(-50%)}to{transform:translateX(0)}}`}</style>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexShrink: 0, padding: '16px 20px 16px 24px', borderRight: `1px solid ${BD}` }}>
          <p style={{ fontSize: 9, fontWeight: 800, color: T3, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', lineHeight: 1.4 }}>Partner<br />Brands</p>
        </div>
        <div style={{ overflow: 'hidden', flex: 1, maskImage: 'linear-gradient(to right,transparent,black 40px,black calc(100% - 40px),transparent)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 40px,black calc(100% - 40px),transparent)' }}>
          <div ref={ref} style={{ display: 'flex', animation: 'marqueeL 28s linear infinite', width: 'max-content' }}
            onMouseEnter={() => { if (ref.current) ref.current.style.animationPlayState = 'paused'; }}
            onMouseLeave={() => { if (ref.current) ref.current.style.animationPlayState = 'running'; }}>
            {doubled.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', borderRight: `1px solid ${BD}`, flexShrink: 0, whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: T2, letterSpacing: '-.01em', filter: 'grayscale(1) opacity(0.5)', transition: 'filter .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'none'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'grayscale(1) opacity(0.5)'}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ OFFER CARDS (3 image cards) ═══════════════ */
function OfferCards() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText('ZYPHIX50'); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  const cards = [
    { tag: 'New User Offer', h: '50% off your first order', sub: 'Code ZYPHIX50 · Max ₹100 off', code: 'ZYPHIX50', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=900&h=380&fit=crop&q=85' },
    { tag: 'Partner Stores', h: '200+ partner stores in Jammu', sub: 'Zero surge pricing · Always fresh', code: '', img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=900&h=380&fit=crop&q=85' },
    { tag: 'Pharmacy', h: 'Medicines delivered fast', sub: 'Prescription & OTC · All brands', code: '', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=900&h=380&fit=crop&q=85' },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '40px 24px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {cards.map((b, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'none'}
              style={{ height: 210, borderRadius: 20, overflow: 'hidden', position: 'relative', background: '#111', boxShadow: SH2, cursor: 'pointer', transition: 'transform .22s' }}>
              <img src={b.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .35 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(0,0,0,.92) 42%,rgba(0,0,0,.15))' }} />
              <div style={{ position: 'absolute', inset: 0, padding: '22px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,.14)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 7, border: '1px solid rgba(255,255,255,.2)', width: 'fit-content' }}>{b.tag}</span>
                <div>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: 'clamp(1.1rem,2.2vw,1.45rem)', lineHeight: 1.15, marginBottom: 5, letterSpacing: '-.03em' }}>{b.h}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginBottom: b.code ? 12 : 0 }}>{b.sub}</p>
                  {b.code && (
                    <button onClick={copy} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 12.5, letterSpacing: '.08em', color: '#fff', background: 'rgba(255,255,255,.12)', border: '1.5px dashed rgba(255,255,255,.4)', padding: '5px 13px', borderRadius: 8, cursor: 'pointer' }}>
                      {b.code}
                      {copied ? <Check size={12} color="#6EE7B7" /> : <Copy size={11} color="rgba(255,255,255,.6)" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ KIRANA CTA ═══════════════ */
function KiranaCTA() {
  const chips = ['🥬 Fruits & Veg','🥛 Dairy','💊 Pharmacy','🍿 Snacks','🌾 Grains & Dal','🧹 Household'];
  return (
    <div style={{ background: W, borderTop: `1px solid ${BD}`, padding: '64px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${G}10`, border: `1px solid ${G}30`, borderRadius: 999, padding: '5px 16px', marginBottom: 18 }}>
            <span style={{ fontSize: 13 }}>🚀</span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: G, letterSpacing: '.05em' }}>Launching in Jammu — Be first to shop</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.7rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.1, marginBottom: 16 }}>
            Groceries from your<br /><span style={{ color: G }}>local kirana stores</span>
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.7, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px' }}>
            We're onboarding stores in Jammu right now. Join the waitlist to shop 200+ categories — fresh produce, dairy, snacks, pharmacy and more — delivered in 30 minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
            {chips.map(c => (
              <span key={c} style={{ padding: '8px 16px', background: BG, border: `1.5px solid ${BD}`, borderRadius: 99, fontSize: 13.5, fontWeight: 600, color: T1 }}>{c}</span>
            ))}
            <span style={{ padding: '8px 16px', background: BG, border: `1.5px solid ${BD}`, borderRadius: 99, fontSize: 13.5, fontWeight: 600, color: T3 }}>+ more</span>
          </div>
          <button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: BG, border: `2px solid ${BD}`, borderRadius: 14, padding: '16px 28px', cursor: 'pointer', fontSize: 15, fontWeight: 800, color: T2 }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            <span>COMING SOON</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════ WAITLIST SECTION ═══════════════ */
const WLIST_BENEFITS = [
  { Icon: Truck,       title: 'Free Delivery',   sub: 'Up to 10 orders, no charge',  accent: '#0DA366', iconBg: '#ECFDF5' },
  { Icon: Gift,        title: '₹125 Credit',     sub: 'Code ZYPHIX125 at checkout',  accent: '#D97706', iconBg: '#FFFBEB' },
  { Icon: Crown,       title: 'Priority Access', sub: 'First in line when we launch', accent: '#7C3AED', iconBg: '#F5F3FF' },
  { Icon: Zap,         title: 'First to Order',  sub: 'In Jammu & beyond',            accent: '#EA580C', iconBg: '#FFF7ED' },
];
const WLIST_ROLES = [
  { v: 'restaurant', Icon: Utensils, l: 'Restaurant',        bg: '#FFF7ED', ac: '#EA580C', tc: '#9A3412' },
  { v: 'merchant',   Icon: Store,    l: 'Merchant',          bg: '#ECFDF5', ac: '#16A34A', tc: '#065F46' },
  { v: 'delivery',   Icon: Bike,     l: 'Delivery\nPartner', bg: '#F0F9FF', ac: '#2563EB', tc: '#1E40AF' },
];

function WaitlistSection() {
  const [, setLoc] = useLocation();
  const [form, setForm]   = useState({ name: '', phone: '', city: '', role: '' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(500);
  const [dispCount, setDispCount] = useState(500);

  useEffect(() => {
    let t: ReturnType<typeof setInterval> | undefined;
    try {
      const real = 500 + (JSON.parse(localStorage.getItem('zyphix_waitlist') || '[]') as unknown[]).length;
      setCount(real);
      let cur = 500;
      const step = Math.max(1, Math.ceil((real - 500) / 25));
      t = setInterval(() => {
        cur = Math.min(cur + step, real);
        setDispCount(cur);
        if (cur >= real) clearInterval(t);
      }, 40);
    } catch {}
    return () => { if (t) clearInterval(t); };
  }, []);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())             e.name  = 'Name is required';
    if (!/^[0-9]{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit number';
    if (!form.city)                    e.city  = 'Please select a city';
    if (!form.role)                    e.role  = 'Please select your role';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      const stored = JSON.parse(localStorage.getItem('zyphix_waitlist') || '[]') as object[];
      stored.push({ ...form, ts: Date.now() });
      localStorage.setItem('zyphix_waitlist', JSON.stringify(stored));
      const newCount = 500 + stored.length;
      setCount(newCount); setDispCount(newCount);
    } catch {}
    if (form.role === 'restaurant') { setTimeout(() => setLoc('/restaurant-setup'), 300); return; }
    if (form.role === 'merchant')  { setTimeout(() => setLoc('/merchant-setup'),  300); return; }
    if (form.role === 'delivery')  { setTimeout(() => setLoc('/delivery-setup'),  300); return; }
    setSubmitted(true);
  };

  const inp = (err?: string) => ({
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: `1.5px solid ${err ? '#EF4444' : BD}`, background: W,
    fontSize: 14, color: T1, outline: 'none', boxSizing: 'border-box' as const,
    transition: 'border-color .15s, box-shadow .15s',
  });

  return (
    <div id="waitlist" style={{ background: BG, padding: '52px 24px 64px', borderBottom: `1px solid ${BD}`, position: 'relative', overflow: 'hidden' }}>

      {/* ── Animated background ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>

        {/* Green orb — top-left */}
        <motion.div
          style={{ position: 'absolute', top: '-12%', left: '-10%', width: 560, height: 560, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,163,102,0.18) 0%, transparent 68%)', filter: 'blur(48px)' }}
          animate={{ x: [0, 36, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Orange orb — bottom-right */}
        <motion.div
          style={{ position: 'absolute', bottom: '-18%', right: '-8%', width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,88,12,0.14) 0%, transparent 68%)', filter: 'blur(52px)' }}
          animate={{ x: [0, -28, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

        {/* Small green orb — top-right */}
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '10%', width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,163,102,0.1) 0%, transparent 70%)', filter: 'blur(32px)' }}
          animate={{ x: [0, 18, 0], y: [0, -22, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />

        {/* Subtle orange orb — left-centre */}
        <motion.div
          style={{ position: 'absolute', top: '45%', left: '5%', width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,88,12,0.09) 0%, transparent 70%)', filter: 'blur(28px)' }}
          animate={{ x: [0, 22, 0], y: [0, 16, 0], scale: [1, 1.14, 1] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }} />

        {/* Floating particles */}
        {[
          { x:'12%', y:'22%', s:6,  c:`rgba(13,163,102,0.55)`,  d:0    },
          { x:'28%', y:'68%', s:4,  c:`rgba(234,88,12,0.45)`,   d:0.7  },
          { x:'55%', y:'14%', s:5,  c:`rgba(13,163,102,0.4)`,   d:1.2  },
          { x:'70%', y:'75%', s:7,  c:`rgba(234,88,12,0.35)`,   d:0.4  },
          { x:'85%', y:'30%', s:4,  c:`rgba(13,163,102,0.5)`,   d:1.8  },
          { x:'42%', y:'82%', s:5,  c:`rgba(234,88,12,0.4)`,    d:2.1  },
          { x:'18%', y:'50%', s:3,  c:`rgba(13,163,102,0.35)`,  d:0.9  },
          { x:'92%', y:'55%', s:6,  c:`rgba(234,88,12,0.3)`,    d:1.5  },
        ].map(({ x, y, s, c, d }, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: c }}
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5], opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: d }} />
        ))}

        {/* Soft grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(13,163,102,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,163,102,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>

          {/* ── LEFT: value prop ── */}
          <div style={{ flex: '1 1 340px', minWidth: 0 }}>

            {/* Badge */}
            <motion.div initial={{ opacity:0, y:-12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <span style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#F0FDF9', border:'1px solid #A7F3D0', color:'#065F46', fontSize:12.5, fontWeight:700, padding:'7px 18px', borderRadius:99, marginBottom:22, letterSpacing:'.01em' }}>
                <motion.span style={{ width:7, height:7, borderRadius:'50%', background:G, display:'inline-block', flexShrink:0 }} animate={{ opacity:[1,0.35,1], scale:[1,1.4,1] }} transition={{ repeat:Infinity, duration:1.6 }} />
                Early Access Open · Jammu, J&K
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.08 }}
              style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(2rem,4.5vw,3rem)', color:T1, letterSpacing:'-.045em', lineHeight:1.06, marginBottom:16 }}>
              Zyphix is launching<br /><span style={{ color:G }}>in Jammu, J&K</span>
            </motion.h2>

            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.16 }}
              style={{ fontSize:15, color:T2, lineHeight:1.7, marginBottom:28, maxWidth:420 }}>
              Be among the first to experience hyperlocal delivery from your neighbourhood kirana stores. Claim your launch perks now.
            </motion.p>

            {/* Benefit tiles */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:28 }}>
              {WLIST_BENEFITS.map(({ Icon, title, sub, accent, iconBg }, i) => (
                <motion.div key={title}
                  initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                  transition={{ delay:.15 + i*.07, type:'spring', stiffness:260, damping:22 }}
                  style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 14px', borderRadius:14, background:W, border:`1.5px solid ${BD}`, boxShadow:'0 1px 6px rgba(0,0,0,.05)' }}>
                  <div style={{ width:38, height:38, borderRadius:11, background:iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={18} color={accent} strokeWidth={2.2} />
                  </div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:800, color:T1, marginBottom:3, letterSpacing:'-.01em' }}>{title}</p>
                    <p style={{ fontSize:11.5, color:T2, lineHeight:1.45, fontWeight:500 }}>{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social proof counter */}
            <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.52 }}
              style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', background:W, borderRadius:14, border:`1px solid ${BD}`, boxShadow:'0 1px 6px rgba(0,0,0,.06)' }}>
              <div style={{ display:'flex', flexShrink:0 }}>
                {[['R','#0DA366'],['A','#059669'],['S','#16A34A'],['P','#22C55E'],['K','#4ADE80']].map(([l,bg], i) => (
                  <motion.div key={i} initial={{ x:-8, opacity:0 }} whileInView={{ x:0, opacity:1 }} viewport={{ once:true }}
                    transition={{ delay:.55 + i*.06 }}
                    style={{ width:30, height:30, borderRadius:'50%', background:bg, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:900, marginLeft: i ? -9 : 0, border:'2.5px solid #fff', boxShadow:'0 1px 4px rgba(0,0,0,.12)', flexShrink:0 }}>{l}</motion.div>
                ))}
              </div>
              <div>
                <p style={{ fontSize:13.5, fontWeight:800, color:T1, lineHeight:1.2 }}>
                  <motion.span style={{ color:G }} animate={{ opacity:[1,0.7,1] }} transition={{ repeat:Infinity, duration:2.5 }}>{dispCount}+</motion.span> on the waitlist
                </p>
                <p style={{ fontSize:11.5, color:T3, marginTop:2 }}>Jammu · Srinagar · Chandigarh</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: form card ── */}
          <motion.div initial={{ opacity:0, x:32 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            transition={{ delay:.22, type:'spring', stiffness:90, damping:18 }}
            style={{ flex:'1 1 390px', minWidth:0 }}>
            <div style={{ background:W, borderRadius:24, padding:'32px 30px', boxShadow:'0 8px 40px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.06)', border:`1px solid ${BD}`, position:'relative', overflow:'hidden' }}>
              {/* green top accent line */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${G} 0%, #22C55E 100%)` }} />

              {submitted ? (
                <motion.div initial={{ scale:.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:'spring', stiffness:200 }}
                  style={{ textAlign:'center', padding:'12px 0 8px' }}>
                  <motion.div animate={{ rotate:[0,14,-14,10,-8,0], scale:[1,1.25,1] }} transition={{ duration:.7 }}
                    style={{ fontSize:56, marginBottom:14 }}>🎉</motion.div>
                  <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, color:T1, fontSize:'1.4rem', marginBottom:8 }}>You're on the list!</h3>
                  <p style={{ color:T2, fontSize:14, lineHeight:1.65, marginBottom:22 }}>We'll reach out before launch.<br />Your ₹125 credit is reserved — use code <strong style={{color:G}}>ZYPHIX125</strong></p>
                  <motion.div animate={{ scale:[1,1.02,1] }} transition={{ repeat:Infinity, duration:2 }}
                    style={{ background:`${G}10`, border:`1.5px solid ${G}35`, borderRadius:12, padding:'14px 20px' }}>
                    <p style={{ fontSize:13.5, color:G, fontWeight:800 }}>🌟 You're #{count} on the waitlist</p>
                  </motion.div>
                </motion.div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:15 }}>
                  <div style={{ marginBottom:4, paddingBottom:18, borderBottom:`1px solid ${BD}` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
                      <div style={{ width:4, height:30, borderRadius:3, background:`linear-gradient(to bottom, ${G}, #059669)`, flexShrink:0 }} />
                      <h3 style={{ fontFamily:"'Outfit',sans-serif", fontWeight:900, fontSize:'clamp(1.2rem,2vw,1.5rem)', color:T1, letterSpacing:'-.03em', lineHeight:1 }}>Reserve your spot</h3>
                    </div>
                    <p style={{ fontSize:12.5, color:T3, paddingLeft:14 }}>Takes 30 seconds · Free forever</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T2, marginBottom:5, display:'block', textTransform:'uppercase' as const, letterSpacing:'.04em' }}>Full Name</label>
                    <motion.input whileFocus={{ scale:1.005 }} value={form.name}
                      onChange={e => { setForm(f=>({...f,name:e.target.value})); setErrors(x=>({...x,name:''})); }}
                      placeholder="Your full name" style={inp(errors.name)}
                      onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                      onBlur={e=>{e.target.style.borderColor=errors.name?'#EF4444':BD;e.target.style.boxShadow='none';}} />
                    {errors.name && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.name}</motion.p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T2, marginBottom:5, display:'block', textTransform:'uppercase' as const, letterSpacing:'.04em' }}>Phone Number</label>
                    <input value={form.phone} type="tel" inputMode="numeric" maxLength={10}
                      onChange={e=>{setForm(f=>({...f,phone:e.target.value}));setErrors(x=>({...x,phone:''}));}}
                      placeholder="10-digit mobile number" style={inp(errors.phone)}
                      onFocus={e=>{e.target.style.borderColor=G;e.target.style.boxShadow=`0 0 0 3px ${G}1A`;}}
                      onBlur={e=>{e.target.style.borderColor=errors.phone?'#EF4444':BD;e.target.style.boxShadow='none';}} />
                    {errors.phone && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.phone}</motion.p>}
                  </div>

                  {/* City */}
                  <div>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T2, marginBottom:5, display:'block', textTransform:'uppercase' as const, letterSpacing:'.04em' }}>City</label>
                    <select value={form.city} onChange={e=>{setForm(f=>({...f,city:e.target.value}));setErrors(x=>({...x,city:''}));}}
                      style={{ ...inp(errors.city), color:form.city?T1:T3, appearance:'none' as const, cursor:'pointer' }}>
                      <option value="">Select your city</option>
                      {['Jammu','Srinagar','Chandigarh','Delhi','Other'].map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.city}</motion.p>}
                  </div>

                  {/* Role selector */}
                  <div>
                    <label style={{ fontSize:11.5, fontWeight:700, color:T2, marginBottom:8, display:'block', textTransform:'uppercase' as const, letterSpacing:'.04em' }}>I am a:</label>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
                      {WLIST_ROLES.map(({ v, Icon, l, bg, ac, tc }) => (
                        <motion.button key={v} onClick={()=>{setForm(f=>({...f,role:v}));setErrors(x=>({...x,role:''}));}}
                          whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:.96 }}
                          style={{ padding:'14px 6px 12px', borderRadius:13, background:form.role===v?bg:W, border:`1.5px solid ${form.role===v?ac:BD}`, cursor:'pointer', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:7, boxShadow:form.role===v?`0 0 0 3px ${ac}22`:'0 1px 3px rgba(0,0,0,.04)', transition:'all .15s' }}>
                          <div style={{ width:34, height:34, borderRadius:10, background:form.role===v?`${ac}18`:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <Icon size={16} color={form.role===v?ac:T3} strokeWidth={2.1} />
                          </div>
                          <span style={{ fontSize:10.5, fontWeight:700, color:form.role===v?tc:T2, lineHeight:1.3, whiteSpace:'pre-line' as const }}>{l}</span>
                        </motion.button>
                      ))}
                    </div>
                    {errors.role && <motion.p initial={{opacity:0,y:-4}} animate={{opacity:1,y:0}} style={{fontSize:11.5,color:'#EF4444',marginTop:4}}>{errors.role}</motion.p>}
                  </div>

                  {/* CTA */}
                  <motion.button onClick={submit}
                    whileHover={{ scale:1.025 }} whileTap={{ scale:.97 }}
                    animate={{ boxShadow:[`0 4px 18px ${G}45`,`0 8px 34px ${G}70`,`0 4px 18px ${G}45`] }}
                    transition={{ boxShadow:{ repeat:Infinity, duration:2, ease:'easeInOut' } }}
                    style={{ width:'100%', padding:'15px', borderRadius:13, background:G, color:'#fff', fontSize:15.5, fontWeight:800, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:2, letterSpacing:'-.01em' }}>
                    Join the Waitlist <ArrowRight size={16} />
                  </motion.button>

                  <p style={{ textAlign:'center', fontSize:12.5, color:T3 }}>
                    <span style={{ color:G, fontWeight:700 }}>{dispCount}+</span> people already joined · Free to join
                  </p>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════ ROOT ═══════════════ */
export function Home() {
  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <AnnoBar />
      <Navbar />
      <WaitlistSection />
      <div style={{ width: '100%', height: 540, background: '#fff', borderBottom: '1px solid #E5E7EB', overflow: 'hidden' }}>
        <SplashVideoCore />
      </div>
      <div id="quick-browse"><QuickBrowse /></div>
      <DualHeroBanners />
      <WhyZyphixStrip />
      <div id="offers"><OfferCards /></div>
      <div id="stores"><KiranaCTA /></div>
      <HowItWorks />
      <SocialProof />
      <AppDownload />
      <Footer />
    </div>
  );
}
