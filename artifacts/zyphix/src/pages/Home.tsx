import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Check, MapPin, Phone, Instagram, Twitter, Linkedin,
  ChevronRight, Sun, Star, Menu, X, User, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ZyphixLogo } from '../components/ZyphixLogo';
import { useLocation } from 'wouter';

/* ─────────────────────────────────────────────
   DESIGN TOKENS — strict, consistent system
───────────────────────────────────────────── */
const BG      = '#0B0B0B';
const SURF    = '#141414';
const CARD    = '#1C1C1C';
const CARD2   = '#222222';
const BD      = 'rgba(255,255,255,0.07)';
const BD2     = 'rgba(255,255,255,0.13)';
const G       = '#22C55E';
const G2      = '#16A34A';
const G_GLOW  = 'rgba(34,197,94,0.18)';
const ORG     = '#F97316';
const T1      = '#FFFFFF';
const T2      = 'rgba(255,255,255,0.52)';
const T3      = 'rgba(255,255,255,0.26)';
const SH_CARD = '0 1px 3px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)';
const SH_UP   = '0 2px 8px rgba(0,0,0,0.6), 0 16px 48px rgba(0,0,0,0.5)';

type Role = 'customer' | 'restaurant' | 'merchant' | 'delivery';

/* ─────────────────────────────────────────────
   ANNOUNCEMENT BAR
───────────────────────────────────────────── */
function AnnoBar() {
  const msgs = [
    '🎉  Early access open — get ₹125 credit on your first order',
    '🚀  Launching in Jammu, J&K — 500+ people already on the waitlist',
    '🏪  Kirana store owner? List your store for free and grow your business',
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: '#052E16', borderBottom: '1px solid rgba(34,197,94,0.14)', padding: '10px 16px', textAlign: 'center', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.p key={idx}
          initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.24 }}
          style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.82)', lineHeight: 1 }}>
          {msgs[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
function Nav() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, openModal } = useAuth();
  const [, nav] = useLocation();

  useEffect(() => {
    const h = () => setSolid(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scroll = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sticky top-0 z-50"
      style={{ background: solid ? 'rgba(11,11,11,0.95)' : 'rgba(11,11,11,0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: `1px solid ${solid ? BD2 : BD}`, transition: 'all 0.2s' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}><ZyphixLogo size={30} /></a>

        {/* Desktop nav links */}
        <nav style={{ display: 'flex', gap: 4, marginRight: 'auto' }} className="hidden md:flex">
          {[['ZyphixNow', () => scroll('services')], ['ZyphixEats', () => scroll('services')], ['How It Works', () => scroll('how')], ['About', () => { window.location.href = '/about'; }]].map(([label, fn]) => (
            <button key={label as string} onClick={fn as () => void}
              style={{ padding: '6px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 500, color: T2, background: 'transparent', border: 'none', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = T1)}
              onMouseLeave={e => (e.currentTarget.style.color = T2)}>
              {label as string}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }} className="hidden md:flex">
          {/* Light theme toggle */}
          <button onClick={() => nav('/light')} title="Light mode"
            style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${BD2}`, background: CARD, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T3, transition: 'all 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.color = G; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD2; (e.currentTarget as HTMLElement).style.color = T3; }}>
            <Sun size={15} />
          </button>

          {user ? (
            <button onClick={logout}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 8, border: `1px solid ${BD2}`, background: CARD, color: T2, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: BG }}>{user.name[0]}</div>
              {user.name.split(' ')[0]}
            </button>
          ) : (
            <button onClick={openModal}
              style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${BD2}`, background: 'transparent', color: T2, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget.style.color = T1); (e.currentTarget.style.borderColor = BD2); }}
              onMouseLeave={e => { (e.currentTarget.style.color = T2); }}>
              Sign in
            </button>
          )}
          <button onClick={() => scroll('waitlist')}
            style={{ padding: '8px 18px', borderRadius: 8, background: G, color: BG, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = G2)}
            onMouseLeave={e => (e.currentTarget.style.background = G)}>
            Join Waitlist
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ marginLeft: 'auto', background: 'none', border: 'none', color: T1, cursor: 'pointer', padding: 4 }}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ borderTop: `1px solid ${BD}`, background: BG, overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['ZyphixNow', 'services'], ['ZyphixEats', 'services'], ['How It Works', 'how'], ['Join Waitlist', 'waitlist']].map(([l, id]) => (
                <button key={l} onClick={() => scroll(id)}
                  style={{ padding: '11px 0', textAlign: 'left', background: 'none', border: 'none', color: l === 'Join Waitlist' ? G : T2, fontSize: 14, fontWeight: l === 'Join Waitlist' ? 700 : 500, cursor: 'pointer' }}>
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO — two-column, balanced layout
───────────────────────────────────────────── */
function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section style={{ background: BG, padding: '80px 24px 96px', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow — subtle */}
      <div style={{ position: 'absolute', top: '40%', left: '55%', width: 480, height: 480, borderRadius: '50%', background: G_GLOW, filter: 'blur(80px)', pointerEvents: 'none', transform: 'translate(-50%,-50%)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center' }}>
        {/* ── Left: copy ── */}
        <div>
          {/* Launch badge */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD, border: `1px solid ${BD2}`, borderRadius: 99, padding: '6px 14px 6px 8px', marginBottom: 28 }}>
            <span style={{ background: G, color: BG, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, letterSpacing: '0.04em' }}>LAUNCHING</span>
            <span style={{ fontSize: 13, color: T2, fontWeight: 500 }}>Jammu, J&K · 2025</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', color: T1, lineHeight: 1.12, letterSpacing: '-0.035em', marginBottom: 20 }}>
            Groceries & food<br />
            <span style={{ color: G }}>delivered in 30 minutes</span><br />
            from your neighbourhood.
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.16 }}
            style={{ fontSize: 16, color: T2, lineHeight: 1.72, maxWidth: 480, marginBottom: 36 }}>
            Zyphix connects you with local kirana stores and restaurants in Jammu — delivering at real store prices, powered by your neighbourhood, not dark warehouses.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 36 }}>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => scroll('waitlist')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: G, color: BG, fontSize: 14.5, fontWeight: 700, padding: '13px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
              Join the Waitlist — Free
              <ArrowRight size={16} />
            </motion.button>
            <button onClick={() => scroll('how')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: T2, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = T1)}
              onMouseLeave={e => (e.currentTarget.style.color = T2)}>
              How it works <ChevronRight size={14} />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.36 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {['A','B','C','D','E'].map((l, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: `hsl(${130 + i*18},55%,${40+i*4}%)`, border: `2px solid ${BG}`, marginLeft: i ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{l}</div>
              ))}
            </div>
            <div style={{ height: 20, width: 1, background: BD2 }} />
            <p style={{ fontSize: 13.5, color: T2 }}><strong style={{ color: T1 }}>500+</strong> people on the waitlist</p>
            <div style={{ height: 20, width: 1, background: BD2 }} />
            <p style={{ fontSize: 13.5, color: T2 }}>Free forever</p>
          </motion.div>
        </div>

        {/* ── Right: app preview card ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative' }}>
          {/* Main card */}
          <div style={{ background: SURF, border: `1px solid ${BD2}`, borderRadius: 20, overflow: 'hidden', boxShadow: SH_UP }}>
            {/* Card header */}
            <div style={{ padding: '18px 20px', borderBottom: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: G }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: G }}>Live in Jammu</span>
              </div>
              <span style={{ fontSize: 11, color: T3 }}>Q2 2025</span>
            </div>

            {/* Service rows */}
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* ZyphixNow */}
              <div style={{ background: CARD, border: `1px solid ${BD}`, borderRadius: 14, padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 14 }}>⚡</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '0.04em' }}>ZYPHIXNOW</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: T1, letterSpacing: '-0.02em' }}>Grocery & essentials</p>
                    <p style={{ fontSize: 12, color: T3, marginTop: 2 }}>From kirana stores near you</p>
                  </div>
                  <div style={{ background: `${G}15`, border: `1px solid ${G}25`, borderRadius: 8, padding: '6px 12px', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: G, lineHeight: 1 }}>30</p>
                    <p style={{ fontSize: 9, color: G, opacity: 0.7, fontWeight: 600 }}>MIN</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Vegetables', 'Dairy', 'Pharmacy', 'Snacks'].map(t => (
                    <span key={t} style={{ background: CARD2, border: `1px solid ${BD}`, borderRadius: 6, padding: '3px 9px', fontSize: 11, color: T3, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* ZyphixEats */}
              <div style={{ background: CARD, border: `1px solid ${BD}`, borderRadius: 14, padding: '16px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ fontSize: 14 }}>🍱</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: ORG, letterSpacing: '0.04em' }}>ZYPHIXEATS</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: T1, letterSpacing: '-0.02em' }}>Restaurants & dhabas</p>
                    <p style={{ fontSize: 12, color: T3, marginTop: 2 }}>Local food, delivered fast</p>
                  </div>
                  <div style={{ background: `${ORG}15`, border: `1px solid ${ORG}25`, borderRadius: 8, padding: '6px 12px', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 800, color: ORG, lineHeight: 1 }}>200+</p>
                    <p style={{ fontSize: 9, color: ORG, opacity: 0.7, fontWeight: 600 }}>PLACES</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Biryani', 'Pizza', 'Thali', 'Desserts'].map(t => (
                    <span key={t} style={{ background: CARD2, border: `1px solid ${BD}`, borderRadius: 6, padding: '3px 9px', fontSize: 11, color: T3, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* CTA inside card */}
              <button onClick={() => scroll('waitlist')}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: G, color: BG, fontSize: 13.5, fontWeight: 700, padding: '13px', borderRadius: 12, border: 'none', cursor: 'pointer' }}>
                Get early access · Free
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: -18, left: -18, background: CARD, border: `1px solid ${BD2}`, borderRadius: 12, padding: '12px 16px', boxShadow: SH_CARD, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${G}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏪</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: T1, lineHeight: 1 }}>200+</p>
              <p style={{ fontSize: 11, color: T3, marginTop: 3 }}>Partner stores ready</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
function Services() {
  const scroll = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  const cards = [
    {
      id: 'now', badge: '⚡ ZyphixNow', color: G, bg: `${G}0C`,
      title: 'Your local kirana,\nnow supercharged.',
      desc: 'Order from verified kirana stores near you. Same products, same prices — just delivered to your door in under 30 minutes.',
      tags: ['Vegetables', 'Dairy & Eggs', 'Pharmacy', 'Household', 'Snacks'],
      stat: '30 min', statSub: 'average delivery time',
    },
    {
      id: 'eats', badge: '🍱 ZyphixEats', color: ORG, bg: `${ORG}0C`,
      title: "Food from places\nyou actually love.",
      desc: "Restaurants, dhabas, cloud kitchens — including the local gem that's not on Swiggy. Real food from your city's best.",
      tags: ['Biryani', 'Pizza', 'Burgers', 'Thali', 'Chai & Snacks'],
      stat: '200+', statSub: 'restaurant partners',
    },
  ];

  return (
    <section id="services" style={{ background: SURF, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Two services, one app</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.14 }}>
            Everything you need,<br />delivered from your neighbourhood.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {cards.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 20, padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = c.color + '40')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BD2)}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.bg, border: `1px solid ${c.color}22`, borderRadius: 99, padding: '5px 12px', alignSelf: 'flex-start', marginBottom: 24 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.color }}>{c.badge}</span>
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.18, marginBottom: 14, whiteSpace: 'pre-line' }}>{c.title}</h3>
                <p style={{ fontSize: 14.5, color: T2, lineHeight: 1.72, marginBottom: 24 }}>{c.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ background: SURF, border: `1px solid ${BD2}`, borderRadius: 6, padding: '4px 11px', fontSize: 12, color: T3, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ background: SURF, border: `1px solid ${BD}`, borderRadius: 10, padding: '10px 16px' }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: c.color, lineHeight: 1 }}>{c.stat}</p>
                    <p style={{ fontSize: 11, color: T3, marginTop: 3, fontWeight: 500 }}>{c.statSub}</p>
                  </div>
                  <button onClick={scroll} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: c.color, color: BG, fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Join Waitlist <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS ROW
───────────────────────────────────────────── */
function StatsRow() {
  const stats = [
    { v: '500+',     l: 'On the waitlist' },
    { v: '200+',     l: 'Partner stores' },
    { v: '< 30 min', l: 'Avg. delivery' },
    { v: '₹0',       l: 'Platform fees' },
  ];
  return (
    <div style={{ background: '#0A1F0E', borderTop: `1px solid rgba(34,197,94,0.15)`, borderBottom: `1px solid rgba(34,197,94,0.15)`, padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)', color: T1, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 6 }}>{s.v}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{s.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Set your location', desc: 'Allow GPS or enter your address. We instantly surface verified kirana stores and restaurants within your area.' },
    { n: '02', title: 'Browse & place order', desc: "Choose from 1,000+ grocery items or local restaurants — all at the same price you'd pay at the store." },
    { n: '03', title: 'Delivered in 30 min', desc: 'Track your order live. Our delivery partner picks up from the nearest store and reaches you in under 30 minutes.' },
  ];
  return (
    <section id="how" style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Simple by design</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.14 }}>How Zyphix works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: BD }}>
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div style={{ background: BG, padding: '36px 32px' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '2.6rem', color: CARD2, lineHeight: 1, marginBottom: 20, letterSpacing: '-0.04em' }}>{s.n}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T1, marginBottom: 10, letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: T2, lineHeight: 1.72 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WAITLIST FORM
───────────────────────────────────────────── */
function WaitlistSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState<Role>('customer');
  const [done, setDone] = useState(false);
  const [pos, setPos] = useState(500);

  useEffect(() => {
    const s = localStorage.getItem('zyphix_waitlist');
    if (s) { const p = JSON.parse(s); setDone(true); setPos(p.position ?? 500); }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !city) return;
    const newPos = pos + Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('zyphix_waitlist', JSON.stringify({ name, phone, city, role, position: newPos, joinedAt: new Date().toISOString() }));
    setPos(newPos);
    setDone(true);
  };

  const inputStyle = (focused = false) => ({
    width: '100%', padding: '11px 14px', borderRadius: 9, background: CARD, border: `1px solid ${focused ? G + '55' : BD2}`,
    color: T1, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.15s',
  });

  const roles: { id: Role; label: string; em: string }[] = [
    { id: 'customer', label: 'Customer', em: '🛒' },
    { id: 'restaurant', label: 'Restaurant', em: '🍽️' },
    { id: 'merchant', label: 'Merchant', em: '🏪' },
    { id: 'delivery', label: 'Delivery', em: '🛵' },
  ];

  const [foc, setFoc] = useState<string | null>(null);

  return (
    <section id="waitlist" style={{ background: SURF, borderTop: `1px solid ${BD}`, padding: '96px 24px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${G}12`, border: `1px solid ${G}28`, borderRadius: 99, padding: '5px 14px', marginBottom: 18 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Early access open</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.14, marginBottom: 10 }}>
            Reserve your spot.<br />It's completely free.
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.65 }}>
            You're joining <strong style={{ color: T1 }}>{pos}+</strong> early members. Get launch credits, priority access, and 10 free deliveries.
          </p>
        </div>

        {/* Form / Success */}
        {done ? (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: CARD, border: `1px solid ${G}44`, borderRadius: 18, padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: `${G}14`, border: `1px solid ${G}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: 24 }}>✓</div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: T1, marginBottom: 8 }}>You're on the list</h3>
            <p style={{ fontSize: 14, color: T2, lineHeight: 1.65, marginBottom: 24 }}>
              You're <strong style={{ color: G }}>#{pos}</strong> on the waitlist. We'll notify you the moment Zyphix launches in your city.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['🎁', '₹125 launch credit'], ['🚀', 'Priority access'], ['🆓', '10 free deliveries']].map(([em, l]) => (
                <div key={l} style={{ background: SURF, border: `1px solid ${BD2}`, borderRadius: 8, padding: '7px 13px', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13 }}>{em}</span><span style={{ fontSize: 12, fontWeight: 500, color: T2 }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <form onSubmit={submit}
            style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 18, padding: '32px', boxShadow: SH_UP }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <input placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required
                style={inputStyle(foc === 'name')} onFocus={() => setFoc('name')} onBlur={() => setFoc(null)} />
              <input placeholder="Mobile number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                style={inputStyle(foc === 'phone')} onFocus={() => setFoc('phone')} onBlur={() => setFoc(null)} />
            </div>
            <select value={city} onChange={e => setCity(e.target.value)} required
              style={{ ...inputStyle(), color: city ? T1 : T3, appearance: 'none', cursor: 'pointer', marginBottom: 20 }}>
              <option value="">Select your city</option>
              {['Jammu', 'Srinagar', 'Chandigarh', 'Delhi', 'Mumbai', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <p style={{ fontSize: 11, fontWeight: 600, color: T3, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>I am joining as a</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 22 }}>
              {roles.map(r => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)}
                  style={{ padding: '11px 6px', borderRadius: 10, border: `1px solid ${role === r.id ? G : BD2}`, background: role === r.id ? `${G}0E` : SURF, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: 5 }}>{r.em}</div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: role === r.id ? G : T3, lineHeight: 1.2 }}>{r.label}</p>
                </button>
              ))}
            </div>

            <button type="submit"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: G, color: BG, fontSize: 14.5, fontWeight: 700, padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
              Join the Waitlist <ArrowRight size={16} />
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: T3, marginTop: 12 }}>
              <Check size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
              Free forever · No credit card · Unsubscribe anytime
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { name: 'Aditya K.', city: 'Jammu', rating: 5, text: 'Finally an app that sources from my local kirana. Ordered at 11pm — arrived in 24 minutes. Prices are identical to the store.' },
    { name: 'Priya G.', city: 'Jammu', rating: 5, text: 'ZyphixEats found that small biryani place in Gandhi Nagar that none of the other apps have. Love that they support local restaurants.' },
    { name: 'Rohit A.', city: 'Srinagar', rating: 5, text: 'Joined the waitlist early and got a ₹125 credit. The team is genuinely responsive. Very excited for the Srinagar launch.' },
  ];
  return (
    <section style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Early community</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.14 }}>What early members say</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 16, padding: '24px', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = BD2 + 'aa')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BD2)}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={12} fill="#EAB308" color="#EAB308" />)}
                </div>
                <p style={{ fontSize: 14, color: T2, lineHeight: 1.72, marginBottom: 20 }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${G}14`, border: `1px solid ${G}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: G, fontSize: 12 }}>{r.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 600, color: T1, fontSize: 13, lineHeight: 1 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: T3, marginTop: 3 }}>{r.city} · Early member</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 40, borderTop: `1px solid ${BD}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: T3, letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 4 }}>As featured in</span>
          {['The Hindu', 'Economic Times', 'YourStory', 'Inc42', 'Entrackr'].map(m => (
            <span key={m} style={{ padding: '5px 13px', background: CARD, border: `1px solid ${BD2}`, borderRadius: 6, fontSize: 12, fontWeight: 500, color: T3 }}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TRUST — built for Jammu
───────────────────────────────────────────── */
function TrustSection() {
  const pillars = [
    { icon: '🏪', title: 'Kirana-first', desc: 'Every order supports a real local store — same prices you know, zero platform markup.' },
    { icon: '📍', title: 'Hyperlocal', desc: 'Built specifically for Jammu & J&K. We know the streets, the neighbourhoods, the dhabas.' },
    { icon: '💰', title: 'No price inflation', desc: 'MRP is MRP. We never inflate product prices. You pay what the store charges.' },
    { icon: '🤝', title: 'Partner-first', desc: 'Kirana and restaurant partners earn more per order than on any other platform.' },
  ];
  return (
    <section style={{ background: SURF, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: G, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Our philosophy</p>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: T1, letterSpacing: '-0.03em', lineHeight: 1.14, marginBottom: 18 }}>
            Born in Jammu.<br />Built for India.
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.72, maxWidth: 420, marginBottom: 28 }}>
            We started Zyphix because people in Jammu deserve the same fast, reliable delivery experience as people in Delhi or Mumbai — powered by the kirana stores they've trusted for decades.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px', background: CARD, border: `1px solid ${BD2}`, borderRadius: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${G}12`, border: `1px solid ${G}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👨‍💼</div>
            <div>
              <p style={{ fontWeight: 700, color: T1, fontSize: 14, lineHeight: 1 }}>Rahul</p>
              <p style={{ fontSize: 12, color: T3, marginTop: 4 }}>Founder, Clavix Technologies Pvt. Ltd.</p>
            </div>
          </div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 14, padding: '20px', height: '100%', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${G}33`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = BD2)}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: T1, marginBottom: 7, letterSpacing: '-0.01em' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: T2, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOTTOM CTA BANNER
───────────────────────────────────────────── */
function CtaBanner() {
  const scroll = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #052E16 0%, #064E3B 50%, #065F46 100%)', borderRadius: 20, padding: '56px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 480, position: 'relative' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Launching soon</p>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.12, marginBottom: 12 }}>Don't miss the launch.</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>Join now for ₹125 launch credit, 10 free deliveries, and priority access the moment we go live in Jammu.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={scroll}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#052E16', fontSize: 14, fontWeight: 700, padding: '13px 28px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
              Join Waitlist — Free <ArrowRight size={15} />
            </button>
            <a href="https://wa.me/919682394363" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 14, fontWeight: 600, padding: '13px 24px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)' )}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
              <Phone size={15} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: `1px solid ${BD}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 14 }}><ZyphixLogo size={28} /></div>
            <p style={{ fontSize: 13, color: T3, lineHeight: 1.72, maxWidth: 260, marginBottom: 20 }}>India's SuperLocal App — groceries & food from kirana stores near you. Launching in Jammu, J&K.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { ic: <Twitter size={13} />, h: '#' },
                { ic: <Instagram size={13} />, h: '#' },
                { ic: <Linkedin size={13} />, h: 'https://linkedin.com/in/rahulsangral' },
                { ic: <Phone size={13} />, h: 'https://wa.me/919682394363' },
              ].map(({ ic, h }, i) => (
                <a key={i} href={h} target="_blank" rel="noopener noreferrer"
                  style={{ width: 32, height: 32, borderRadius: 8, background: CARD, border: `1px solid ${BD2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T3, transition: 'all 0.15s', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.color = G; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD2; (e.currentTarget as HTMLElement).style.color = T3; }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {[
            { t: 'Product', links: [{ l: 'ZyphixNow', h: '#' }, { l: 'ZyphixEats', h: '#' }, { l: 'For Restaurants', h: '/restaurant-setup' }, { l: 'For Merchants', h: '/merchant-setup' }, { l: 'Delivery Partners', h: '/delivery-setup' }] },
            { t: 'Company', links: [{ l: 'About Us', h: '/about' }, { l: 'Contact', h: '/contact' }, { l: 'Brand Video', h: '/splash-video' }, { l: 'Careers', h: '#' }] },
            { t: 'Legal', links: [{ l: 'Privacy Policy', h: '/privacy' }, { l: 'Terms of Service', h: '/terms' }, { l: 'Refund Policy', h: '/terms' }] },
          ].map(({ t, links }) => (
            <div key={t}>
              <p style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16, letterSpacing: '0.02em' }}>{t}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {links.map(({ l, h }) => (
                  <li key={l}><a href={h} style={{ fontSize: 13, color: T3, textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = T2)}
                    onMouseLeave={e => (e.currentTarget.style.color = T3)}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: 12, color: T3 }}>© 2025 Clavix Technologies Pvt. Ltd. All rights reserved.</p>
          <p style={{ fontSize: 12, color: T3 }}>Made with care in Jammu, J&K</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   WHATSAPP FLOAT
───────────────────────────────────────────── */
function WAFloat() {
  return (
    <motion.a href="https://wa.me/919682394363" target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 2.5, type: 'spring', stiffness: 260 }}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, width: 52, height: 52, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', textDecoration: 'none' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20.52 3.48A11.95 11.95 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.57A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.43l-.38-.22-3.91 1 1.02-3.81-.24-.39A9.96 9.96 0 012 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.95 9.95 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.33c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.64.07a8.12 8.12 0 01-2.4-1.48 9.03 9.03 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37S6 9.04 6 10.17c0 1.13.82 2.22.93 2.37.12.15 1.62 2.47 3.93 3.46.55.24.98.38 1.31.48.55.17 1.05.15 1.45.09.44-.07 1.37-.56 1.56-1.1.2-.54.2-1 .14-1.1-.06-.1-.24-.16-.5-.3z"/>
      </svg>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   HOME
───────────────────────────────────────────── */
export function Home() {
  return (
    <div style={{ fontFamily: "'Outfit', 'Inter', sans-serif", background: BG, minHeight: '100vh' }}>
      <AnnoBar />
      <Nav />
      <Hero />
      <Services />
      <StatsRow />
      <HowItWorks />
      <WaitlistSection />
      <Testimonials />
      <TrustSection />
      <CtaBanner />
      <Footer />
      <WAFloat />
    </div>
  );
}
