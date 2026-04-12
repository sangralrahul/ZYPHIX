import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ChevronDown, ShoppingCart, User, LogOut,
  ArrowRight, Star, Check, Phone, Instagram, Twitter, Linkedin,
  ChevronRight, Truck, Zap, Shield, Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ZyphixLogo } from '../components/ZyphixLogo';

/* ═══════ DARK PREMIUM DESIGN TOKENS ═══════ */
const BG    = '#060B12';
const BG2   = '#0A1222';
const CARD  = '#0F1A2E';
const CARD2 = '#152035';
const G     = '#00D97E';
const G2    = '#00B368';
const ORG   = '#FF6435';
const ORG2  = '#E8501E';
const T1    = '#FFFFFF';
const T2    = 'rgba(255,255,255,0.6)';
const T3    = 'rgba(255,255,255,0.32)';
const BD    = 'rgba(255,255,255,0.07)';
const BD2   = 'rgba(255,255,255,0.14)';
const SH    = '0 8px 32px rgba(0,0,0,.5)';
const SH2   = '0 24px 64px rgba(0,0,0,.7)';

/* ═══════ ANNOUNCEMENT BAR ═══════ */
function AnnoBar() {
  const msgs = [
    '🎉 Use code ZYPHIX50 — 50% off your first order',
    '🚀 Launching in Jammu, J&K — Join 500+ on the waitlist now',
    '🏪 Kirana store owner? List your store free — Register today',
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % msgs.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ background: `linear-gradient(90deg, #00533A 0%, #006B4A 50%, #00533A 100%)`, padding: '9px 16px', textAlign: 'center', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: .28 }}
          style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,.9)', letterSpacing: '.01em' }}>
          {msgs[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ═══════ NAVBAR ═══════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, openModal } = useAuth();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="sticky top-0 z-50" style={{
      background: scrolled ? 'rgba(6,11,18,0.92)' : 'rgba(6,11,18,0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${scrolled ? BD2 : BD}`,
      transition: 'all .22s',
    }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <ZyphixLogo size={32} />
        </a>

        <div style={{ width: 1, height: 26, background: BD2, flexShrink: 0 }} />

        <button style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <MapPin size={14} color={G} />
          <div>
            <p style={{ fontSize: 8, fontWeight: 700, color: T3, textTransform: 'uppercase', letterSpacing: '.08em' }}>Deliver to</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ fontWeight: 700, color: T1, fontSize: 12.5 }}>Select Location</span>
              <ChevronDown size={10} color={T3} />
            </div>
          </div>
        </button>

        <div style={{ flex: 1, position: 'relative', maxWidth: 480 }}>
          <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: focus ? G : T3, transition: 'color .15s' }} />
          <input value={q} onChange={e => setQ(e.target.value)}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            placeholder="Search groceries, restaurants..."
            style={{
              width: '100%', paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10,
              borderRadius: 10, background: CARD, border: `1.5px solid ${focus ? G + '55' : BD2}`,
              fontSize: 13, color: T1, fontFamily: 'inherit', fontWeight: 500, outline: 'none',
              transition: 'all .18s', boxShadow: focus ? `0 0 0 3px ${G}18` : 'none',
            }} />
        </div>

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
          {user ? (
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, border: `1px solid ${BD2}`, background: CARD, color: T2, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: G, color: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900 }}>{user.name[0]}</div>
              <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
            </button>
          ) : (
            <button onClick={openModal} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: `1px solid ${BD2}`, background: CARD, color: T2, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G + '44'; (e.currentTarget as HTMLElement).style.color = G; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD2; (e.currentTarget as HTMLElement).style.color = T2; }}>
              <User size={13} /><span className="hidden sm:inline">Sign in</span>
            </button>
          )}
          <button style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 10, background: G, fontSize: 13, fontWeight: 800, color: BG, boxShadow: `0 4px 20px ${G}44`, transition: 'all .15s', position: 'relative' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = G2}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = G}>
            <ShoppingCart size={13} /><span className="hidden sm:inline">Cart</span>
            <span style={{ position: 'absolute', top: -7, right: -7, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: '#fff', fontSize: 9, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════ HERO ═══════ */
function Hero() {
  const scrollToWaitlist = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: BG, position: 'relative', overflow: 'hidden', minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
      {/* Background orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', left: '-10%', width: '55vw', height: '55vw', borderRadius: '50%', background: `radial-gradient(circle, ${G}40 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '45vw', height: '45vw', borderRadius: '50%', background: `radial-gradient(circle, ${ORG}30 0%, transparent 70%)`, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${BD2} 1px, transparent 1px)`, backgroundSize: '36px 36px', opacity: 0.6 }} />
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Location pill */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: CARD, border: `1px solid ${BD2}`, borderRadius: 99, padding: '6px 14px', marginBottom: 32 }}>
          <MapPin size={12} color={G} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: T2 }}>Launching in</span>
          <span style={{ fontSize: 12.5, fontWeight: 800, color: G }}>Jammu, J&K</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: G, animation: 'pulse 2s infinite', display: 'inline-block' }} />
        </motion.div>

        {/* Main wordmark */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(3.8rem, 9vw, 8.5rem)', color: T1, lineHeight: .92, letterSpacing: '-.06em', marginBottom: 0 }}>
            India's
          </h1>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(3.8rem, 9vw, 8.5rem)', lineHeight: .92, letterSpacing: '-.06em', marginBottom: 24,
            background: `linear-gradient(135deg, #1CF586 0%, ${G} 40%, #00B368 80%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
            SuperLocal App.
          </h1>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .22 }}
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: T2, maxWidth: 560, lineHeight: 1.65, marginBottom: 40 }}>
          Groceries from your local kirana in <strong style={{ color: T1 }}>30 minutes</strong>. Food from your favourite restaurants. All in one app — built for Jammu.
        </motion.p>

        {/* Service pills */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .32 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
          {[
            { icon: '⚡', label: 'ZyphixNow', sub: 'Grocery · 30 min', color: G, glow: G + '30' },
            { icon: '🍱', label: 'ZyphixEats', sub: 'Restaurant food', color: ORG, glow: ORG + '30' },
          ].map(s => (
            <motion.button key={s.label} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={scrollToWaitlist}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 14, background: CARD, border: `1.5px solid ${s.color}33`, boxShadow: `0 4px 24px ${s.glow}`, cursor: 'pointer' }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: T1, lineHeight: 1.2 }}>{s.label}</p>
                <p style={{ fontSize: 11.5, color: s.color, fontWeight: 600 }}>{s.sub}</p>
              </div>
              <ChevronRight size={14} color={T3} style={{ marginLeft: 4 }} />
            </motion.button>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .42 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <motion.button whileHover={{ scale: 1.04, boxShadow: `0 12px 40px ${G}60` }} whileTap={{ scale: 0.97 }} onClick={scrollToWaitlist}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: G, color: BG, fontSize: 16, fontWeight: 900, padding: '16px 36px', borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: `0 8px 32px ${G}44`, letterSpacing: '-.01em' }}>
            Join the Waitlist
            <ArrowRight size={18} />
          </motion.button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>
              {['P','R','A','K','S'].map((l, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: `hsl(${140 + i * 15}, 70%, ${45 + i * 3}%)`, border: `2px solid ${BG}`, marginLeft: i ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#fff' }}>{l}</div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: T1 }}>500+ already joined</p>
              <p style={{ fontSize: 11, color: T3 }}>Free · No credit card</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: T3 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${T3}, transparent)` }} />
      </motion.div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }`}</style>
    </div>
  );
}

/* ═══════ SERVICE SPLIT ═══════ */
function ServiceSplit() {
  const scrollToWaitlist = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });

  const panels = [
    {
      id: 'now', label: 'ZyphixNow', emoji: '⚡',
      headline: 'Groceries in\n30 minutes.',
      sub: 'Fresh produce, dairy, snacks, pharmacy — all from kirana stores near you. No dark warehouses. Real local prices.',
      tags: ['Vegetables', 'Dairy', 'Pharmacy', 'Snacks', 'Household'],
      stat: '30 min', statLabel: 'Avg. delivery',
      accent: G, accentDim: '#00533A', glow: G + '25',
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=900&fit=crop&q=85',
    },
    {
      id: 'eats', label: 'ZyphixEats', emoji: '🍱',
      headline: 'Food from your\nfavourite places.',
      sub: "Restaurants, dhabas, cloud kitchens — from the local gem that's not on Swiggy to your city's best biryani.",
      tags: ['Biryani', 'Pizza', 'Burgers', 'Thali', 'Desserts'],
      stat: '200+', statLabel: 'Partner restaurants',
      accent: ORG, accentDim: '#7A2E0A', glow: ORG + '25',
      img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=900&fit=crop&q=85',
    },
  ];

  return (
    <div style={{ background: BG2 }}>
      <style>{`@media(max-width:767px){.svc-grid{grid-template-columns:1fr!important}.svc-panel{min-height:440px!important}}`}</style>
      <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1320, margin: '0 auto' }}>
        {panels.map((p, pi) => (
          <motion.div key={p.id} className="svc-panel" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: pi * .12 }}
            style={{ position: 'relative', minHeight: 560, overflow: 'hidden', cursor: 'pointer', borderRight: pi === 0 ? `1px solid ${BD}` : 'none', borderBottom: `1px solid ${BD}` }}>
            {/* Background image */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.22 }} />
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(160deg, ${BG2}CC 0%, ${BG2}EE 60%, ${BG2} 100%)` }} />
            {/* Glow */}
            <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${p.glow}, transparent 70%)`, filter: 'blur(40px)' }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '52px 48px' }}>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: p.accent + '18', border: `1px solid ${p.accent}33`, borderRadius: 99, padding: '6px 14px', marginBottom: 28 }}>
                <span>{p.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.accent, letterSpacing: '.05em' }}>{p.label}</span>
              </div>

              {/* Headline */}
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: T1, lineHeight: 1.04, letterSpacing: '-.04em', marginBottom: 16, whiteSpace: 'pre-line' }}>
                {p.headline}
              </h2>
              <p style={{ fontSize: 14.5, color: T2, lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>{p.sub}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
                {p.tags.map(t => (
                  <span key={t} style={{ background: CARD2, border: `1px solid ${BD2}`, color: T2, fontSize: 12, fontWeight: 600, padding: '5px 13px', borderRadius: 8 }}>{t}</span>
                ))}
              </div>

              {/* Stat + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ background: CARD, border: `1px solid ${p.accent}22`, borderRadius: 12, padding: '12px 18px' }}>
                  <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.5rem', color: p.accent, lineHeight: 1 }}>{p.stat}</p>
                  <p style={{ fontSize: 11, color: T3, marginTop: 3, fontWeight: 500 }}>{p.statLabel}</p>
                </div>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={scrollToWaitlist}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: p.accent, color: BG, fontSize: 14, fontWeight: 800, padding: '13px 26px', borderRadius: 12, border: 'none', cursor: 'pointer', boxShadow: `0 6px 24px ${p.glow}` }}>
                  Join Waitlist <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════ STATS STRIP ═══════ */
function StatsStrip() {
  const stats = [
    { v: '500+',    l: 'On the waitlist',     icon: '👥' },
    { v: '200+',    l: 'Partner stores',       icon: '🏪' },
    { v: '< 30 min',l: 'Avg. delivery time',  icon: '⚡' },
    { v: '100%',    l: 'Free to join',         icon: '🎁' },
  ];
  return (
    <div style={{ background: `linear-gradient(90deg, #003D28 0%, #004E33 50%, #003D28 100%)`, borderTop: `1px solid ${G}22`, borderBottom: `1px solid ${G}22`, padding: '36px 24px' }}>
      <style>{`@media(max-width:640px){.stats-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      <div className="stats-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
            style={{ textAlign: 'center', padding: '8px 0' }}>
            <p style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</p>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: G, lineHeight: 1, letterSpacing: '-.04em', marginBottom: 6 }}>{s.v}</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>{s.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════ WAITLIST SECTION ═══════ */
type Role = 'customer' | 'restaurant' | 'merchant' | 'delivery';

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
    const data = { name, phone, city, role, position: newPos, joinedAt: new Date().toISOString() };
    localStorage.setItem('zyphix_waitlist', JSON.stringify(data));
    setPos(newPos);
    setDone(true);
  };

  const roles: { id: Role; label: string; emoji: string; desc: string }[] = [
    { id: 'customer',  label: 'Customer',  emoji: '🛒', desc: 'I want to order' },
    { id: 'restaurant',label: 'Restaurant', emoji: '🍽️', desc: 'List my restaurant' },
    { id: 'merchant',  label: 'Merchant',  emoji: '🏪', desc: 'List my store' },
    { id: 'delivery',  label: 'Delivery',  emoji: '🛵', desc: 'Deliver for Zyphix' },
  ];

  const inp = (val: string, set: (v: string) => void, ph: string, type = 'text') => (
    <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph} required
      style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: CARD2, border: `1.5px solid ${BD2}`, color: T1, fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'all .18s', boxSizing: 'border-box' }}
      onFocus={e => (e.currentTarget.style.borderColor = G + '66')}
      onBlur={e => (e.currentTarget.style.borderColor = BD2)} />
  );

  return (
    <div id="waitlist" style={{ background: BG, padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vh', borderRadius: '50%', background: `radial-gradient(circle, ${G}10 0%, transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {/* Badge */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: G + '15', border: `1px solid ${G}30`, borderRadius: 99, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: G, display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.06em', textTransform: 'uppercase' }}>Early Access Open</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 10 }}>
              Reserve your spot.<br /><span style={{ color: G }}>Free, forever.</span>
            </h2>
            <p style={{ fontSize: 14.5, color: T2, lineHeight: 1.65 }}>Join {pos}+ people waiting for Zyphix to launch in Jammu. Get exclusive early access and launch credits.</p>
          </div>

          {done ? (
            <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ background: CARD, border: `1.5px solid ${G}44`, borderRadius: 20, padding: '44px 36px', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: G + '18', border: `2px solid ${G}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
              <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.5rem', color: T1, marginBottom: 10 }}>You're on the list! 🎉</h3>
              <p style={{ color: T2, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>You're <strong style={{ color: G }}>#{pos}</strong> on the waitlist. We'll notify you the moment Zyphix launches in Jammu.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                {[['🎁', '₹125 launch credit'], ['🚀', 'Priority access'], ['🆓', 'Free delivery × 10']].map(([e, l]) => (
                  <div key={l} style={{ background: CARD2, border: `1px solid ${BD2}`, borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{e}</span><span style={{ fontSize: 12, fontWeight: 600, color: T2 }}>{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit}
              style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 20, padding: '36px', boxShadow: SH2 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>{inp(name, setName, 'Your full name')}</div>
                <div>{inp(phone, setPhone, '10-digit mobile', 'tel')}</div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <select value={city} onChange={e => setCity(e.target.value)} required
                  style={{ width: '100%', padding: '13px 16px', borderRadius: 12, background: CARD2, border: `1.5px solid ${BD2}`, color: city ? T1 : T3, fontSize: 14, fontFamily: 'inherit', outline: 'none', appearance: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                  <option value="">Select your city</option>
                  {['Jammu', 'Srinagar', 'Chandigarh', 'Delhi', 'Mumbai', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <p style={{ fontSize: 11.5, fontWeight: 700, color: T3, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>I am a</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
                {roles.map(r => (
                  <button key={r.id} type="button" onClick={() => setRole(r.id)}
                    style={{ padding: '12px 6px', borderRadius: 12, border: `1.5px solid ${role === r.id ? G : BD2}`, background: role === r.id ? G + '12' : CARD2, cursor: 'pointer', textAlign: 'center', transition: 'all .15s' }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{r.emoji}</div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: role === r.id ? G : T2, lineHeight: 1.3 }}>{r.label}</p>
                  </button>
                ))}
              </div>

              <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${G}55` }} whileTap={{ scale: 0.97 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: G, color: BG, fontSize: 16, fontWeight: 900, padding: '16px', borderRadius: 13, border: 'none', cursor: 'pointer', letterSpacing: '-.01em', boxShadow: `0 6px 28px ${G}44` }}>
                Join the Waitlist <ArrowRight size={18} />
              </motion.button>
              <p style={{ textAlign: 'center', fontSize: 12, color: T3, marginTop: 14 }}>
                <Check size={10} style={{ display: 'inline', marginRight: 4 }} />Free forever · No credit card · Unsubscribe anytime
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════ HOW IT WORKS ═══════ */
function HowItWorks() {
  const steps = [
    { n: '01', icon: '📍', title: 'Set your location', desc: 'Allow GPS or enter your address. We instantly map verified kirana stores, restaurants, and partner outlets near you.' },
    { n: '02', icon: '🛒', title: 'Browse & order', desc: "Choose from 1,000+ grocery items or local restaurants — all at the same price you'd pay in-store." },
    { n: '03', icon: '🏎', title: 'Delivered in 30 min', desc: 'Track your order live. Our partner delivers from your nearest store — no markups, no surge pricing.' },
  ];
  return (
    <div style={{ background: BG2, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <style>{`@media(max-width:767px){.hw-grid{grid-template-columns:1fr!important}}`}</style>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Simple as 1-2-3</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08 }}>How Zyphix works</h2>
        </div>
        <div className="hw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, position: 'relative' }}>
          {/* Connector line */}
          <div style={{ position: 'absolute', top: 52, left: '16.5%', right: '16.5%', height: 1, background: `linear-gradient(90deg, transparent, ${G}40, transparent)`, pointerEvents: 'none' }} className="hidden lg:block" />
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .15 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 20, padding: '32px 28px', height: '100%', position: 'relative', transition: 'all .22s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${G}33`; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${G}15`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = `1px solid ${BD2}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: G + '15', border: `1px solid ${G}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
                  {s.icon}
                </div>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.5rem', color: CARD2, lineHeight: 1, marginBottom: 12, letterSpacing: '-.04em', position: 'absolute', top: 24, right: 24 }}>{s.n}</p>
                <h3 style={{ fontWeight: 800, fontSize: 17, color: T1, marginBottom: 10, letterSpacing: '-.02em' }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: T2, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════ CATEGORIES ═══════ */
function Categories() {
  const cats = [
    { emoji: '🥦', name: 'Vegetables' }, { emoji: '🥛', name: 'Dairy & Eggs' },
    { emoji: '💊', name: 'Medicine' }, { emoji: '🫙', name: 'Snacks' },
    { emoji: '🧹', name: 'Household' }, { emoji: '🍎', name: 'Fruits' },
    { emoji: '🧴', name: 'Personal Care' }, { emoji: '🌾', name: 'Grains & Dal' },
    { emoji: '💡', name: 'Electronics' }, { emoji: '🐕', name: 'Pet Care' },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '80px 24px' }}>
      <style>{`@media(max-width:640px){.cat-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>ZyphixNow</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 10 }}>
            Everything your home needs —<br />from stores near you
          </h2>
          <p style={{ fontSize: 15, color: T2, maxWidth: 440, margin: '0 auto' }}>1,000+ products sourced directly from kirana stores in your neighbourhood</p>
        </div>
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {cats.map(({ emoji, name }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }}
              whileHover={{ y: -4, scale: 1.04 }}
              style={{ background: CARD, border: `1.5px solid ${BD2}`, borderRadius: 16, padding: '20px 12px 16px', textAlign: 'center', cursor: 'default', transition: 'all .18s' }}
              onHoverStart={() => {}} onHoverEnd={() => {}}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: G + '12', border: `1px solid ${G}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 24 }}>
                {emoji}
              </div>
              <p style={{ fontSize: 12, fontWeight: 700, color: T2, lineHeight: 1.3 }}>{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════ SOCIAL PROOF ═══════ */
function SocialProof() {
  const reviews = [
    { name: 'Aditya Sharma', city: 'Jammu', rating: 5, text: 'Finally an app that sources from my local kirana. Ordered at 11pm — arrived in 24 minutes. Prices are exactly the same as the store.' },
    { name: 'Priya Gupta', city: 'Jammu', rating: 5, text: 'ZyphixEats found that small biryani place in Gandhi Nagar that is not on Swiggy at all. Love that they focus on local restaurants.' },
    { name: 'Rohit Anand', city: 'Srinagar', rating: 5, text: 'Joined the waitlist and got a ₹125 credit. The team is responsive on WhatsApp. Really excited for the Srinagar launch.' },
  ];
  return (
    <div style={{ background: BG2, borderTop: `1px solid ${BD}`, padding: '80px 24px' }}>
      <style>{`@media(max-width:767px){.rev-grid{grid-template-columns:1fr!important}}`}</style>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>Community love</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 2.6rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08 }}>What early members say</h2>
        </div>
        <div className="rev-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 20, padding: '28px', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -20, fontSize: 80, opacity: .04, pointerEvents: 'none' }}>"</div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={13} fill="#D97706" color="#D97706" />)}
                </div>
                <p style={{ fontSize: 14, color: T2, lineHeight: 1.75, marginBottom: 24 }}>"{r.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: G + '18', border: `1px solid ${G}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: G, fontSize: 13 }}>{r.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: T1, fontSize: 13 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: T3 }}>{r.city} · Early member</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Media bar */}
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: T3, marginRight: 8, letterSpacing: '.08em', textTransform: 'uppercase' }}>As featured in</span>
          {['The Hindu', 'Economic Times', 'YourStory', 'Inc42', 'Entrackr'].map(m => (
            <span key={m} style={{ padding: '7px 16px', background: CARD, border: `1px solid ${BD2}`, borderRadius: 8, fontSize: 12, fontWeight: 700, color: T2 }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════ TRUST / BORN IN JAMMU ═══════ */
function TrustSection() {
  const pillars = [
    { icon: '🏪', title: 'Kirana-first', desc: 'Every order goes through a real local store — not a dark warehouse. Same prices, better service.' },
    { icon: '📍', title: 'Hyperlocal', desc: 'Built for Jammu, Srinagar, and Chandigarh — cities that big apps ignore. We know your streets.' },
    { icon: '💰', title: 'No markups', desc: 'MRP is MRP. We never inflate prices or add platform fees on products. Delivery charges only.' },
    { icon: '🤝', title: 'Partner-owned', desc: 'Every kirana and restaurant on Zyphix earns more per order than on any other platform.' },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BD}`, padding: '88px 24px' }}>
      <style>{`@media(max-width:767px){.tp-grid{grid-template-columns:1fr 1fr!important}}`}</style>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        {/* Left: copy */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 14 }}>Built different</p>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: T1, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 20 }}>
            Born in Jammu.<br />Built for India.
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>
            We started Zyphix because people in Jammu deserve the same world-class delivery experience as people in Delhi or Mumbai — from the kirana store they've trusted for years, not from a warehouse they've never heard of.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: G + '18', border: `1px solid ${G}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👨‍💼</div>
            <div>
              <p style={{ fontWeight: 800, color: T1, fontSize: 14 }}>Rahul Sangral</p>
              <p style={{ fontSize: 12.5, color: T3 }}>Founder, Clavix Technologies Pvt. Ltd.</p>
            </div>
          </div>
        </motion.div>
        {/* Right: pillars */}
        <div className="tp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {pillars.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}>
              <div style={{ background: CARD, border: `1px solid ${BD2}`, borderRadius: 18, padding: '24px 20px', height: '100%' }}>
                <div style={{ fontSize: 26, marginBottom: 12 }}>{p.icon}</div>
                <h3 style={{ fontWeight: 800, color: T1, fontSize: 15, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: T2, lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════ BOTTOM CTA ═══════ */
function BottomCTA() {
  const scrollToWaitlist = () => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div style={{ background: BG2, borderTop: `1px solid ${BD}`, padding: '80px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: G + '12', border: `1px solid ${G}28`, borderRadius: 99, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🚀</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: G, letterSpacing: '.06em', textTransform: 'uppercase' }}>Launching soon</span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: T1, letterSpacing: '-.05em', lineHeight: 1.04, marginBottom: 16 }}>
            Don't miss the launch.
          </h2>
          <p style={{ fontSize: 16, color: T2, lineHeight: 1.65, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Join now for a ₹125 launch credit, free delivery on your first 10 orders, and priority access the moment we go live.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: `0 16px 48px ${G}55` }} whileTap={{ scale: 0.96 }} onClick={scrollToWaitlist}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: G, color: BG, fontSize: 16, fontWeight: 900, padding: '17px 40px', borderRadius: 14, border: 'none', cursor: 'pointer', boxShadow: `0 8px 32px ${G}44`, letterSpacing: '-.01em' }}>
              Join the Waitlist Free <ArrowRight size={18} />
            </motion.button>
            <a href="https://wa.me/919682394363" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: CARD, border: `1px solid ${BD2}`, color: T2, fontSize: 15, fontWeight: 700, padding: '17px 28px', borderRadius: 14, textDecoration: 'none', transition: 'all .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#25D366'; (e.currentTarget as HTMLElement).style.color = '#25D366'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD2; (e.currentTarget as HTMLElement).style.color = T2; }}>
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════ FOOTER ═══════ */
function Footer() {
  return (
    <footer style={{ background: '#030608', borderTop: `1px solid ${BD}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <ZyphixLogo size={30} />
            </div>
            <p style={{ fontSize: 13, color: T3, lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>India's SuperLocal App — groceries & food from kirana stores near you. Launching in Jammu, J&K.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { ic: <Twitter size={14} />, href: '#' },
                { ic: <Instagram size={14} />, href: '#' },
                { ic: <Linkedin size={14} />, href: 'https://linkedin.com/in/rahulsangral' },
                { ic: <Phone size={14} />, href: 'https://wa.me/919682394363' },
              ].map(({ ic, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 36, height: 36, borderRadius: 9, background: CARD, border: `1px solid ${BD2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T3, transition: 'all .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.color = G; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = BD2; (e.currentTarget as HTMLElement).style.color = T3; }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {[
            { t: 'Services', links: [{ l: 'Zyphix Now', h: '#' }, { l: 'Zyphix Eats', h: '#' }, { l: 'For Restaurants', h: '/restaurant-setup' }, { l: 'For Merchants', h: '/merchant-setup' }, { l: 'Delivery Partners', h: '/delivery-setup' }] },
            { t: 'Company', links: [{ l: 'About Us', h: '/about' }, { l: 'Contact', h: '/contact' }, { l: 'Splash Video', h: '/splash-video' }, { l: 'Blog', h: '#' }, { l: 'Careers', h: '#' }] },
            { t: 'Legal', links: [{ l: 'Privacy Policy', h: '/privacy' }, { l: 'Terms of Service', h: '/terms' }, { l: 'Refund Policy', h: '/terms' }] },
          ].map(({ t, links }) => (
            <div key={t}>
              <p style={{ fontWeight: 700, color: T1, fontSize: 12.5, marginBottom: 16, letterSpacing: '.03em' }}>{t}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {links.map(({ l, h }) => (
                  <li key={l}>
                    <a href={h} style={{ fontSize: 13, color: T3, transition: 'color .15s', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T1}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T3}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: T3 }}>© 2025 Clavix Technologies Pvt. Ltd. All rights reserved.</p>
          <p style={{ fontSize: 12, color: T3 }}>Made with ❤️ in Jammu, J&K</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════ WHATSAPP FLOAT ═══════ */
function WhatsAppFloat() {
  return (
    <motion.a href="https://wa.me/919682394363" target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
      style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999, width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(37,211,102,.45)', textDecoration: 'none' }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M20.52 3.48A11.95 11.95 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.98L0 24l6.18-1.57A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.43l-.38-.22-3.91 1 1.02-3.81-.24-.39A9.96 9.96 0 012 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.95 9.95 0 0122 12c0 5.52-4.48 10-10 10zm5.47-7.33c-.3-.15-1.77-.87-2.04-.97s-.47-.15-.67.15-.77.97-.94 1.17-.35.22-.64.07a8.12 8.12 0 01-2.4-1.48 9.03 9.03 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37S6 9.04 6 10.17c0 1.13.82 2.22.93 2.37.12.15 1.62 2.47 3.93 3.46.55.24.98.38 1.31.48.55.17 1.05.15 1.45.09.44-.07 1.37-.56 1.56-1.1.2-.54.2-1 .14-1.1-.06-.1-.24-.16-.5-.3z"/>
      </svg>
    </motion.a>
  );
}

/* ═══════ HOME ═══════ */
export function Home() {
  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      <AnnoBar />
      <Navbar />
      <Hero />
      <ServiceSplit />
      <StatsStrip />
      <WaitlistSection />
      <HowItWorks />
      <Categories />
      <SocialProof />
      <TrustSection />
      <BottomCTA />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
