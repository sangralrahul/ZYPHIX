import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Clock, Plus, Minus, ArrowRight, Check, Copy,
  MapPin, Truck, Shield, Zap, ChevronRight, ChevronLeft,
  Package, Users, TrendingUp, Smartphone, ChevronDown, Search
} from 'lucide-react';
import { products, categories, restaurants, foodCategories, services, promoCodes, stores } from '@/data/mockData';

type TabId = 'now' | 'eats' | 'book' | 'map' | 'offers';

const TABS: { id: TabId; label: string; icon: string; accent: string }[] = [
  { id: 'now',    label: 'ZyphixNow',      icon: '⚡', accent: 'var(--z-green)'  },
  { id: 'eats',   label: 'ZyphixEats',     icon: '🍱', accent: 'var(--z-orange)' },
  { id: 'book',   label: 'ZyphixBook',     icon: '📅', accent: 'var(--z-purple)' },
  { id: 'map',    label: 'Kirana Near Me', icon: '🗺️', accent: 'var(--z-blue)'   },
  { id: 'offers', label: 'Offers',         icon: '🏷️', accent: 'var(--z-pink)'   },
];

/* ── countdown hook ── */
function useCountdown(init: number) {
  const [s, setS] = useState(init);
  useEffect(() => { const t = setInterval(() => setS(x => x > 0 ? x - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return { h: pad(Math.floor(s / 3600)), m: pad(Math.floor((s % 3600) / 60)), s: pad(s % 60) };
}

/* ── carousel with nav arrows ── */
function Carousel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const sc = (d: 1 | -1) => ref.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div className="relative group/c">
      <button onClick={() => sc(-1)} className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all duration-200" style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)', boxShadow: '0 8px 24px rgba(0,0,0,.6)' }}>
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      <div ref={ref} className={`carousel ${className}`}>{children}</div>
      <button onClick={() => sc(1)} className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full items-center justify-center opacity-0 group-hover/c:opacity-100 transition-all duration-200" style={{ background: 'var(--z-card2)', border: '1px solid var(--z-border2)', boxShadow: '0 8px 24px rgba(0,0,0,.6)' }}>
        <ChevronRight className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

/* ── section header ── */
function SH({ title, sub, action, accent = 'var(--z-green)' }: { title: string; sub?: string; action?: string; accent?: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--z-muted)' }}>{sub}</p>}
      </div>
      {action && (
        <button className="text-xs font-bold flex items-center gap-0.5 px-3 py-1.5 rounded-full transition-all hover:gap-1" style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}20` }}>
          {action} <ChevronRight className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

/* ── star rating ── */
function Stars({ r }: { r: number }) {
  return <span className="inline-flex items-center gap-0.5 text-xs font-bold" style={{ color: '#FFB800' }}><Star className="h-3 w-3 fill-current" />{r}</span>;
}

/* ═══════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════ */
function AnnoBar() {
  return (
    <div className="w-full py-2 text-center text-xs font-bold tracking-wide overflow-hidden relative" style={{ background: 'linear-gradient(90deg, var(--z-green2), #006635, var(--z-green2))', backgroundSize: '200% 100%', animation: 'gradient-move 4s linear infinite' }}>
      <span style={{ color: '#021a0e' }}>
        ⚡ FREE delivery on first order — Use code <span className="px-1.5 py-0.5 rounded bg-black/20">ZYPHIX50</span> &nbsp;·&nbsp; Now live in Jammu, J&K &nbsp;·&nbsp; ₹0 surge pricing, ever
      </span>
    </div>
  );
}

/* ═══════════════════════════
   NAVBAR (ENHANCED)
═══════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300 glass" style={{ boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,.6)' : 'none' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-[60px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105 animate-glow" style={{ background: 'linear-gradient(135deg,var(--z-green),var(--z-blue))' }}>
              <Zap style={{ height: 16, width: 16, color: 'white', fill: 'white' }} />
            </div>
            <span className="font-black text-xl tracking-tight hidden sm:block shimmer-brand" style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-.04em' }}>ZYPHIX</span>
          </a>
          {/* Location */}
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5 shrink-0" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,230,118,0.15)' }}>
              <MapPin style={{ height: 11, width: 11, color: 'var(--z-green)' }} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-semibold uppercase tracking-widest leading-none" style={{ color: 'var(--z-muted)' }}>Deliver to</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="font-black text-white text-sm leading-none">Jammu, J&K</span>
                <ChevronDown style={{ height: 11, width: 11, color: 'var(--z-muted)' }} />
              </div>
            </div>
          </button>
          {/* Search */}
          <div className="flex-1 relative max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-colors" style={{ height: 15, width: 15, color: focused ? 'var(--z-green)' : 'var(--z-muted)' }} />
            <input type="text" placeholder="Search groceries, food, services..." onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm text-white outline-none transition-all placeholder:text-[var(--z-muted)]"
              style={{ background: focused ? 'rgba(26,30,46,0.98)' : 'rgba(26,30,46,0.7)', border: focused ? '1px solid rgba(0,230,118,.35)' : '1px solid rgba(255,255,255,0.07)', boxShadow: focused ? '0 0 0 3px rgba(0,230,118,.07)' : 'none' }} />
          </div>
          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-1.5 btn-ghost rounded-xl px-3.5 py-2 text-sm">
              <Users style={{ height: 15, width: 15 }} /><span className="hidden lg:inline">Login</span>
            </button>
            <button className="relative flex items-center gap-2 btn-green rounded-xl px-4 py-2.5 text-sm">
              <Package style={{ height: 16, width: 16 }} />
              <span className="hidden sm:inline font-black">Cart</span>
              <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full text-[10px] font-black flex items-center justify-center text-white" style={{ background: 'var(--z-orange)' }}>3</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   HERO
═══════════════════════════ */
function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ minHeight: 520 }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=700&fit=crop&q=80"
        alt="" className="absolute inset-0 w-full h-full img-cover" style={{ filter: 'brightness(0.22) saturate(1.4)' }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(7,10,18,0.98) 45%, rgba(7,10,18,0.6) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[700px] h-[700px]" style={{ background: 'radial-gradient(circle, rgba(0,230,118,0.07) 0%, transparent 65%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px]" style={{ background: 'radial-gradient(circle, rgba(68,136,255,0.05) 0%, transparent 65%)', transform: 'translate(20%, 30%)' }} />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex items-center gap-16">
          {/* LEFT */}
          <motion.div className="flex-1" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [.22,1,.36,1] }}>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: 'var(--z-green)' }} />
              <span className="text-xs font-black tracking-wide" style={{ color: 'var(--z-green)', letterSpacing: '.06em' }}>LIVE NOW · JAMMU, J&K</span>
            </div>

            {/* Main headline */}
            <div className="mb-6">
              <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, lineHeight: 1.0, letterSpacing: '-.04em' }}>
                <span className="block text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>Groceries. Food.</span>
                <span className="block text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>Services. All in</span>
                <span className="block shimmer-brand" style={{ fontSize: 'clamp(3.6rem, 8vw, 6rem)' }}>30 Min.</span>
              </h1>
              <p className="mt-4 text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
                India's first SuperLocal app — built for Tier-2 cities. Your nearest kirana, restaurant & professional, at your door.
              </p>
            </div>

            {/* Location pill */}
            <div className="flex items-center gap-2 mb-6 max-w-xs p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,230,118,0.15)' }}>
                <MapPin style={{ height: 16, width: 16, color: 'var(--z-green)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>Delivering to</p>
                <p className="font-black text-white text-sm">Jammu, Jammu & Kashmir</p>
              </div>
              <button className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: 'rgba(0,230,118,0.1)', color: 'var(--z-green)', border: '1px solid rgba(0,230,118,0.2)' }}>Change</button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="btn-green rounded-2xl px-7 py-3.5 text-sm flex items-center gap-2">
                <Zap style={{ height: 16, width: 16 }} /> Order Now — It's Free
              </button>
              <button className="btn-ghost rounded-2xl px-7 py-3.5 text-sm flex items-center gap-2">
                <span>Watch how it works</span> <ArrowRight style={{ height: 15, width: 15 }} />
              </button>
            </div>

            {/* App badges */}
            <div className="flex items-center gap-3 mb-10">
              {[
                { icon: '🍎', top: 'Download on the', bot: 'App Store' },
                { icon: '▶', top: 'Get it on', bot: 'Google Play' },
              ].map((a, i) => (
                <button key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all hover:opacity-90 hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <div className="text-left">
                    <p style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.4)', lineHeight: 1.2 }}>{a.top}</p>
                    <p style={{ fontSize: 13, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{a.bot}</p>
                  </div>
                </button>
              ))}
              <span className="text-xs font-semibold ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>4.8 ★ · 50K+ downloads</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-6 max-w-md" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[['50K+','Customers'],['1,200+','Stores'],['30min','Avg Delivery'],['₹0','Surge Fee']].map(([v,l],i)=>(
                <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.5+i*.1}}>
                  <p className="font-black text-white leading-none" style={{ fontSize: 'clamp(1rem,2.5vw,1.4rem)' }}>{v}</p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{l}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — premium app mockup */}
          <motion.div className="shrink-0 hidden xl:block" initial={{ opacity: 0, x: 40, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: .8, delay: .2 }}>
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute -inset-8 rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(0,230,118,0.08) 0%, transparent 70%)', filter: 'blur(20px)' }} />
              {/* Phone frame */}
              <div className="relative animate-float rounded-[40px] overflow-hidden"
                style={{ width: 280, height: 560, background: 'var(--z-card)', border: '1.5px solid rgba(255,255,255,0.12)', boxShadow: '0 50px 120px rgba(0,0,0,.7), 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 0 0 10px var(--z-bg)' }}>
                {/* Notch */}
                <div className="mx-auto mt-3 w-20 h-5 rounded-full" style={{ background: 'var(--z-bg)' }} />
                {/* App header */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="shimmer-brand font-black text-sm" style={{ fontFamily: "'Outfit',sans-serif" }}>ZYPHIX</span>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg" style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--z-green)' }} />
                    <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--z-green)' }}>ON THE WAY</span>
                  </div>
                </div>
                {/* Order tracking */}
                <div className="px-4 py-3">
                  <p className="font-black text-white text-sm mb-0.5">Your order is near!</p>
                  <p style={{ fontSize: 10, color: 'var(--z-muted)' }}>Sharma General Store · Jammu</p>
                  {/* Progress */}
                  <div className="mt-3 mb-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,var(--z-green),var(--z-blue))' }} initial={{width:0}} animate={{width:'75%'}} transition={{duration:1.8,delay:.6,ease:'easeOut'}} />
                  </div>
                  <div className="flex justify-between" style={{ fontSize: 9, color: 'var(--z-muted)' }}>
                    <span style={{ color: 'var(--z-green)', fontWeight: 700 }}>Order Placed</span>
                    <span>Packed</span>
                    <span>On the way</span>
                    <span>Delivered</span>
                  </div>
                </div>
                {/* Products */}
                <div className="px-3 space-y-2 mt-1">
                  {products.slice(0,4).map(p=>(
                    <div key={p.id} className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0" style={{ background: 'var(--z-card2)' }}>
                        <img src={p.image} alt={p.name} className="w-full h-full img-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate" style={{ fontSize: 11 }}>{p.name}</p>
                        <p style={{ fontSize: 9, color: 'var(--z-muted)' }}>{p.weight}</p>
                      </div>
                      <p className="font-black text-white shrink-0" style={{ fontSize: 11 }}>₹{p.price}</p>
                    </div>
                  ))}
                </div>
                {/* Bottom action */}
                <div className="absolute bottom-6 left-4 right-4">
                  <button className="w-full btn-green rounded-2xl py-3 text-xs font-black">Track Live on Map →</button>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -left-12 top-20 px-3 py-2 rounded-2xl flex items-center gap-2 animate-float2"
                style={{ background: 'var(--z-card)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,.6)', animationDelay: '1.5s' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.15)' }}>
                  <Truck style={{ height: 16, width: 16, color: 'var(--z-green)' }} />
                </div>
                <div>
                  <p className="font-black text-white" style={{ fontSize: 11 }}>Arriving in</p>
                  <p className="font-black" style={{ fontSize: 13, color: 'var(--z-green)' }}>12 minutes</p>
                </div>
              </div>
              <div className="absolute -right-10 bottom-32 px-3 py-2 rounded-2xl flex items-center gap-2 animate-float"
                style={{ background: 'var(--z-card)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,.6)', animationDelay: '3s' }}>
                <Shield style={{ height: 16, width: 16, color: 'var(--z-amber)', flexShrink: 0 }} />
                <div>
                  <p className="font-black text-white" style={{ fontSize: 11 }}>100% Verified</p>
                  <p style={{ fontSize: 9, color: 'var(--z-muted)' }}>All stores checked</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   TRUST STRIP
═══════════════════════════ */
function TrustStrip() {
  const items = [
    { icon: Zap,      label: '30 Min Delivery',     sub: 'Guaranteed or refund', c: 'var(--z-green)'  },
    { icon: Package,  label: '1,200+ Kirana Stores', sub: 'Background-verified',  c: 'var(--z-amber)'  },
    { icon: Shield,   label: '100% Secure',           sub: 'Inspected by ZYPHIX',  c: 'var(--z-blue)'   },
    { icon: Users,    label: '50,000+ Families',      sub: 'Trust ZYPHIX daily',   c: 'var(--z-purple)' },
  ];
  return (
    <div style={{ background: 'var(--z-surf)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, label, sub, c }, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `${c}14`, border: `1px solid ${c}1E` }}>
                <Icon style={{ height: 18, width: 18, color: c }} />
              </div>
              <div>
                <p className="font-black text-white text-sm leading-none">{label}</p>
                <p className="text-[10px] mt-0.5 font-medium" style={{ color: 'var(--z-muted)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   HOW IT WORKS
═══════════════════════════ */
function HowItWorks() {
  const steps = [
    { n: '01', icon: '📍', title: 'Choose Your Location', desc: 'Enter your Jammu/J&K address and we find the nearest verified kirana & restaurants instantly.', c: 'var(--z-green)' },
    { n: '02', icon: '🛒', title: 'Pick What You Need', desc: 'Browse groceries, fresh produce, cooked food or book a service. 1,000+ items available 24/7.', c: 'var(--z-blue)' },
    { n: '03', icon: '⚡', title: 'Delivered in 30 Min', desc: 'Your local kirana partner packs & delivers your order. Real-time tracking, zero surge pricing.', c: 'var(--z-orange)' },
  ];
  return (
    <div className="relative overflow-hidden py-16" style={{ background: 'var(--z-surf)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,230,118,0.04), transparent 70%)' }} />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="badge badge-green mb-3">HOW IT WORKS</span>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-.04em' }}>
            Order in <span className="text-grad-green">60 seconds</span>
          </h2>
          <p className="text-sm mt-2 max-w-xs mx-auto" style={{ color: 'var(--z-muted)' }}>Simple. Fast. No-fuss ordering from your local stores.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)' }} />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .15 }}>
              <div className="glow-card p-6 h-full" style={{ '--glow-c': step.c } as React.CSSProperties}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${step.c}14`, border: `1px solid ${step.c}20` }}>
                    {step.icon}
                  </div>
                  <span className="font-black text-4xl" style={{ color: `${step.c}30`, fontFamily: "'Outfit',sans-serif", letterSpacing: '-.06em' }}>{step.n}</span>
                </div>
                <h3 className="font-black text-white text-base mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--z-muted)' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   NOW TAB
═══════════════════════════ */
const DEALS = products.filter(p => p.origPrice).slice(0, 8);

function NowTab() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('All');
  const cd = useCountdown(3 * 3600 + 47 * 60 + 22);
  const cats = ['All', 'Fruits & Veg', 'Dairy', 'Snacks', 'Grains & Dal', 'Bakery', 'Spices', 'Personal Care', 'Medicine'];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);
  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const rem = (id: string) => setCart(c => { const n = { ...c }; n[id] > 1 ? n[id]-- : delete n[id]; return n; });
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((s, [id, q]) => s + (products.find(x => x.id === id)?.price ?? 0) * q, 0);

  const AddBtn = ({ id }: { id: string }) => cart[id] ? (
    <div className="flex items-center rounded-2xl overflow-hidden" style={{ background: 'var(--z-green)' }}>
      <button onClick={e => { e.stopPropagation(); rem(id); }} className="w-8 h-8 flex items-center justify-center hover:bg-black/15 transition-colors"><Minus style={{ height: 12, width: 12, color: '#021a0e' }} /></button>
      <span className="text-xs font-black text-center w-5" style={{ color: '#021a0e' }}>{cart[id]}</span>
      <button onClick={e => { e.stopPropagation(); add(id); }} className="w-8 h-8 flex items-center justify-center hover:bg-black/15 transition-colors"><Plus style={{ height: 12, width: 12, color: '#021a0e' }} /></button>
    </div>
  ) : (
    <button onClick={e => { e.stopPropagation(); add(id); }} className="w-8 h-8 rounded-2xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(0,230,118,0.1)', border: '1.5px solid rgba(0,230,118,0.3)' }}>
      <Plus style={{ height: 13, width: 13, color: 'var(--z-green)' }} />
    </button>
  );

  return (
    <div className="space-y-10">
      {/* Hero banners */}
      <Carousel>
        {[
          { tag: '⚡ FREE DELIVERY', tagC: 'badge-green', h: '50% OFF\nFirst Order', sub: 'Use ZYPHIX50 · Max ₹100 · New users', img: 'https://images.unsplash.com/photo-1543168256-418811576931?w=600&h=280&fit=crop&q=80', bg: 'linear-gradient(135deg,#020f08,#001408)', code: 'ZYPHIX50', ac: 'var(--z-green)' },
          { tag: '🏪 1,200+ STORES',  tagC: 'badge-orange', h: 'Real Kirana,\nReal Fast',  sub: 'Local inventory · Zero surge pricing',   img: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=280&fit=crop&q=80', bg: 'linear-gradient(135deg,#120400,#080200)', code: '', ac: 'var(--z-orange)' },
          { tag: '💊 FASTEST',        tagC: 'badge-blue',   h: 'Medicines in\n30 Minutes',  sub: 'All medical & pharmacy orders',           img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&h=280&fit=crop&q=80', bg: 'linear-gradient(135deg,#001020,#000810)', code: '', ac: 'var(--z-blue)' },
        ].map((b, i) => (
          <div key={i} className="snap-start shrink-0 relative overflow-hidden rounded-3xl lift cursor-pointer"
            style={{ width: 'min(560px, 85vw)', height: 190, background: b.bg, border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={b.img} alt="" className="absolute inset-0 w-full h-full img-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 55%, transparent)' }} />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span className={`badge ${b.tagC} self-start`}>{b.tag}</span>
              <div>
                <p className="font-black text-white leading-[1.15] mb-1.5 whitespace-pre-line" style={{ fontSize: 'clamp(1.3rem,3vw,1.7rem)', letterSpacing: '-.03em' }}>{b.h}</p>
                <p className="text-xs mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{b.sub}</p>
                {b.code && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-widest"
                    style={{ background: 'rgba(0,0,0,0.5)', color: b.ac, border: `2px dashed ${b.ac}50` }}>{b.code}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Category circles */}
      <div>
        <SH title="Shop by Category" action="All" />
        <Carousel className="pb-3">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(activeCat === cat.name ? 'All' : cat.name)} className="snap-start shrink-0 flex flex-col items-center gap-2.5 group">
              <div className="overflow-hidden rounded-full transition-all duration-200"
                style={{ width: 76, height: 76, border: activeCat === cat.name ? `2.5px solid ${cat.color}` : '2.5px solid rgba(255,255,255,0.08)', boxShadow: activeCat === cat.name ? `0 0 0 4px ${cat.color}20, 0 8px 24px rgba(0,0,0,.4)` : '0 4px 12px rgba(0,0,0,.3)' }}>
                <img src={cat.image} alt={cat.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-bold text-center w-20 leading-tight" style={{ color: activeCat === cat.name ? 'white' : 'var(--z-muted)' }}>{cat.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Flash Deals */}
      <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#180800,#0D0300)', border: '1px solid rgba(255,107,0,0.2)' }}>
        <div className="px-5 py-4 flex items-center gap-4 flex-wrap" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.2)', border: '1px solid rgba(255,107,0,0.3)' }}>
              <span className="text-lg">⚡</span>
            </div>
            <div>
              <p className="font-black text-white text-base leading-none">Flash Deals</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Best prices, limited time</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <p className="text-xs font-bold mr-1" style={{ color: 'var(--z-orange)' }}>Ends in</p>
            {[cd.h, cd.m, cd.s].map((v, i) => (
              <React.Fragment key={i}>
                <div className="countdown-digit">
                  <span className="font-black text-white text-lg leading-none">{v}</span>
                  <span className="text-[8px] font-bold mt-0.5" style={{ color: 'var(--z-muted)' }}>{['H','M','S'][i]}</span>
                </div>
                {i < 2 && <span className="font-black text-white">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="p-4">
          <Carousel>
            {DEALS.map(p => {
              const disc = Math.round((1 - p.price / (p.origPrice ?? p.price)) * 100);
              return (
                <div key={p.id} className="snap-start prod-card group" style={{ width: 154 }}>
                  <div className="relative h-[115px] overflow-hidden" style={{ background: 'var(--z-card2)' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-108 transition-transform duration-300" />
                    <div className="absolute top-2 left-2">
                      <span className="badge badge-red" style={{ fontSize: 9 }}>-{disc}%</span>
                    </div>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%)' }} />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-semibold truncate mb-0.5" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                    <p className="font-bold text-white leading-tight line-clamp-2 mb-1" style={{ fontSize: 12 }}>{p.name}</p>
                    <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                    <div className="flex items-center justify-between gap-1">
                      <div><span className="font-black text-white text-sm">₹{p.price}</span><span className="text-[10px] line-through ml-1" style={{ color: 'var(--z-muted)' }}>₹{p.origPrice}</span></div>
                      <AddBtn id={p.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>

      {/* Brand Logos */}
      <div>
        <SH title="Top Brands" sub="Sold by verified kirana partners" action="Browse all" />
        <Carousel>
          {[
            { n:'Amul',     img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=120&h=120&fit=crop&q=80', bg:'#003087' },
            { n:'Parle',    img:'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=120&h=120&fit=crop&q=80', bg:'#C00' },
            { n:'Nestle',   img:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=120&h=120&fit=crop&q=80', bg:'#1a1a2e' },
            { n:'MDH',      img:'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=120&h=120&fit=crop&q=80', bg:'#7b1fa2' },
            { n:'ITC',      img:'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&h=120&fit=crop&q=80', bg:'#1b5e20' },
            { n:'Dabur',    img:'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=120&h=120&fit=crop&q=80', bg:'#e65100' },
            { n:'Colgate',  img:'https://images.unsplash.com/photo-1559591935-c7c7cb7de30c?w=120&h=120&fit=crop&q=80', bg:'#b71c1c' },
            { n:"Lay's",    img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=120&h=120&fit=crop&q=80', bg:'#f9a825' },
          ].map((b, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div className="rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl"
                style={{ width: 72, height: 72, background: b.bg, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,.4)' }}>
                <img src={b.img} alt={b.n} className="w-full h-full img-cover" />
              </div>
              <span className="text-[11px] font-bold" style={{ color: 'var(--z-muted)' }}>{b.n}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Trending carousel */}
      <div>
        <SH title="Trending Near You" sub="Most ordered in Jammu today" action="See all" />
        <Carousel>
          {products.map(p => (
            <div key={p.id} className="snap-start prod-card group">
              <div className="relative overflow-hidden" style={{ height: 140, background: 'var(--z-card2)' }}>
                <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-108 transition-transform duration-300" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 55%)' }} />
                {p.tag && (
                  <div className="absolute top-2 left-2">
                    <span className={`badge ${p.tag==='Fresh'?'badge-green':p.tag==='Bestseller'?'badge-amber':'badge-red'}`} style={{ fontSize: 9 }}>{p.tag}</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] font-semibold truncate mb-0.5" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                <p className="font-bold text-white leading-tight line-clamp-2 mb-1" style={{ fontSize: 12 }}>{p.name}</p>
                <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                <div className="flex items-center justify-between gap-1">
                  <div><span className="font-black text-white text-sm">₹{p.price}</span>{p.origPrice&&<span className="text-[10px] line-through ml-1" style={{color:'var(--z-muted)'}}>₹{p.origPrice}</span>}</div>
                  <AddBtn id={p.id} />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Product grid */}
      <div>
        <SH title="All Products" sub={`${filtered.length} items`} />
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5 -mx-4 px-4">
          {cats.map(c=>(
            <button key={c} onClick={()=>setActiveCat(c)} className={`pill shrink-0 ${activeCat===c?'pill-on':'pill-off'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .92 }} transition={{ delay: i * 0.025 }}>
                <div className="rounded-2xl overflow-hidden z-card group cursor-pointer flex flex-col h-full">
                  <div className="relative overflow-hidden" style={{ height: 130, background: 'var(--z-card2)' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full img-cover group-hover:scale-108 transition-transform duration-300" />
                    {p.tag && (
                      <div className="absolute top-2 left-2">
                        <span className={`badge ${p.tag==='Fresh'?'badge-green':p.tag==='Bestseller'?'badge-amber':'badge-red'}`} style={{fontSize:9}}>{p.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-[10px] font-semibold mb-0.5" style={{ color: 'var(--z-muted)' }}>{p.brand}</p>
                    <p className="font-bold text-white leading-tight line-clamp-2 mb-1" style={{ fontSize: 12 }}>{p.name}</p>
                    <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{p.weight}</p>
                    <div className="flex items-center justify-between mt-auto gap-1">
                      <div><span className="font-black text-white text-sm">₹{p.price}</span>{p.origPrice&&<span className="text-[10px] line-through ml-1" style={{color:'var(--z-muted)'}}>₹{p.origPrice}</span>}</div>
                      <AddBtn id={p.id} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Float cart */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[440px] z-50 cursor-pointer">
            <div className="rounded-3xl px-5 py-4 flex items-center justify-between btn-green" style={{ boxShadow: '0 20px 60px rgba(0,230,118,.5)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm" style={{ background: 'rgba(0,0,0,0.18)', color: '#021a0e' }}>{totalItems}</div>
                <span className="font-black text-sm" style={{ color: '#021a0e' }}>{totalItems} item{totalItems>1?'s':''} · View Cart</span>
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

/* ═══════════════════════════
   EATS TAB
═══════════════════════════ */
function EatsTab() {
  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl lift cursor-pointer" style={{ height: 220 }}>
        <img src="https://images.unsplash.com/photo-1567337710282-00832b415979?w=1000&h=350&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.9) 45%, rgba(0,0,0,.2))' }} />
        <div className="absolute inset-0 p-7 flex flex-col justify-center max-w-sm">
          <span className="badge badge-orange mb-3 self-start">🍱 ZYPHIXEATS</span>
          <h2 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', letterSpacing: '-.04em' }}>Local food.<br /><span className="text-grad-orange">Delivered fast.</span></h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Restaurants · Dhabas · Tiffin services · Home kitchens</p>
          <button className="btn-orange rounded-2xl px-5 py-2.5 text-sm self-start">Explore Restaurants →</button>
        </div>
      </div>

      {/* Cravings */}
      <div>
        <SH title="What's your craving?" action="All cuisines" accent="var(--z-orange)" />
        <Carousel>
          {foodCategories.map((fc, i) => (
            <button key={i} className="snap-start shrink-0 flex flex-col items-center gap-2 group">
              <div className="rounded-full overflow-hidden" style={{ width: 72, height: 72, border: '2px solid rgba(255,255,255,0.08)', boxShadow: '0 4px 16px rgba(0,0,0,.4)' }}>
                <img src={fc.image} alt={fc.name} className="w-full h-full img-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-bold text-center w-20 leading-tight" style={{ color: 'var(--z-muted)' }}>{fc.name}</span>
            </button>
          ))}
        </Carousel>
      </div>

      {/* Restaurant grid */}
      <div>
        <SH title="Restaurants Near You" sub="Open now · All in Jammu" action="See all" accent="var(--z-orange)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {restaurants.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}>
              <div className="rounded-3xl overflow-hidden z-card cursor-pointer group flex flex-col h-full">
                <div className="relative overflow-hidden" style={{ height: 165, background: 'var(--z-card2)' }}>
                  <img src={r.image} alt={r.name} className="w-full h-full img-cover group-hover:scale-105 transition-transform duration-400" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.65) 30%, transparent)' }} />
                  {r.deliveryFee === 0 && <div className="absolute top-3 right-3"><span className="badge badge-green">FREE DELIVERY</span></div>}
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {r.tags.filter((t: string) => t !== 'Free Delivery').slice(0, 2).map((tag: string) => (
                      <span key={tag} className="badge badge-white">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between flex-1">
                  <div className="min-w-0">
                    <p className="font-black text-white text-base truncate">{r.name}</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--z-muted)' }}>{r.cuisine}</p>
                  </div>
                  <div className="shrink-0 ml-3 text-right space-y-1.5">
                    <Stars r={r.rating} />
                    <p className="text-[10px] flex items-center gap-1 justify-end font-medium" style={{ color: 'var(--z-muted)' }}>
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

/* ═══════════════════════════
   BOOK TAB
═══════════════════════════ */
function BookTab() {
  const [sel, setSel] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'];
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl" style={{ height: 200 }}>
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ filter: 'brightness(0.25)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(139,111,255,0.3), rgba(7,10,18,0.8))' }} />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <span className="badge badge-purple mb-3 self-start">📅 BOOK IN 60 SECONDS</span>
          <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(1.5rem,3.5vw,2.2rem)', letterSpacing: '-.04em' }}>
            Trusted Professionals,<br /><span className="text-grad-purple">At Your Doorstep</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Verified · Rated 4.8★ · Zero cancellation fee</p>
        </div>
      </div>
      <div>
        <SH title="Available Services" action="View all" accent="var(--z-purple)" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map(s => {
            const active = sel === s.id;
            return (
              <div key={s.id} onClick={() => { setSel(active ? null : s.id); setSlot(null); setBooked(false); }}
                className="rounded-3xl p-5 cursor-pointer transition-all duration-200"
                style={{ background: active ? 'rgba(139,111,255,.12)' : 'var(--z-card)', border: active ? '1px solid rgba(139,111,255,.4)' : '1px solid var(--z-border)', transform: active ? 'scale(1.02)' : undefined }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">{s.emoji}</div>
                  {active && <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--z-purple)' }}><Check style={{ height: 10, width: 10, color: 'white' }} /></div>}
                </div>
                <p className="font-black text-white text-sm leading-tight mb-0.5">{s.title}</p>
                <p className="text-[10px] mb-2.5 font-medium" style={{ color: 'var(--z-muted)' }}>{s.category}</p>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-white text-sm">₹{s.price}</span>
                  <Stars r={s.rating} />
                </div>
                <p className="text-[10px] font-bold" style={{ color: 'var(--z-green)' }}>{s.available} pros · {s.nextSlot}</p>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {sel && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="rounded-3xl p-6 z-card">
              <p className="font-black text-white text-lg mb-0.5">Pick a time slot — Today</p>
              <p className="text-xs mb-5" style={{ color: 'var(--z-muted)' }}>{services.find(x=>x.id===sel)?.title} · ₹{services.find(x=>x.id===sel)?.price}</p>
              <div className="grid grid-cols-4 gap-2.5 mb-5">
                {SLOTS.map(sl => (
                  <button key={sl} onClick={() => setSlot(sl)} className="py-3 rounded-2xl text-xs font-bold transition-all"
                    style={{ background: slot===sl?'var(--z-purple)':'rgba(255,255,255,.05)', color: slot===sl?'white':'var(--z-muted)', border: slot===sl?'none':'1px solid rgba(255,255,255,.07)', transform: slot===sl?'scale(1.06)':undefined, boxShadow: slot===sl?'0 8px 24px rgba(139,111,255,.3)':'none' }}>
                    {sl}
                  </button>
                ))}
              </div>
              <button onClick={() => slot && setBooked(true)} disabled={!slot}
                className="w-full py-4 rounded-2xl font-black text-sm transition-all disabled:opacity-30"
                style={{ background: booked?'rgba(0,230,118,.12)':slot?'var(--z-purple)':'rgba(139,111,255,.12)', color: booked?'var(--z-green)':'white', boxShadow: slot&&!booked?'0 8px 28px rgba(139,111,255,.3)':'none' }}>
                {booked ? '✓ Booking Confirmed! See you soon.' : slot ? 'Confirm Booking →' : 'Select a time slot above'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════
   MAP TAB
═══════════════════════════ */
function MapTab() {
  const T: Record<string, {e:string;c:string}> = { kirana:{e:'🏪',c:'var(--z-green)'}, medical:{e:'💊',c:'var(--z-blue)'}, restaurant:{e:'🍲',c:'var(--z-orange)'}, electronics:{e:'💡',c:'#f59e0b'}, garage:{e:'🔧',c:'#6366f1'}, salon:{e:'✂️',c:'#ec4899'} };
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-3xl lift cursor-pointer" style={{ height: 240 }}>
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=450&fit=crop&q=80" alt="Map" className="w-full h-full img-cover opacity-20 absolute inset-0" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,.1), rgba(7,10,18,.9))' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="text-5xl mb-4">📍</div>
          <p className="font-black text-white text-2xl mb-1" style={{ letterSpacing: '-.04em' }}>Jammu, J&K</p>
          <p className="text-sm font-medium mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>8 verified stores within 1 km radius · All open now</p>
          <button className="btn-green rounded-2xl px-6 py-3 text-sm">Open Full Map →</button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {['var(--z-green)','var(--z-orange)','var(--z-blue)','var(--z-purple)'].map((c,i)=>(
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, animation: `pulse-dot 2s ${i*.4}s ease-in-out infinite` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {stores.map((st: any) => {
          const t = T[st.type] || T.kirana;
          return (
            <div key={st.id} className="rounded-2xl p-4 flex items-center gap-3.5 z-card cursor-pointer lift">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${t.c}12`, border: `1px solid ${t.c}1E` }}>{t.e}</div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-white text-sm truncate">{st.name}</p>
                <div className="flex items-center gap-2 text-[10px] mt-0.5" style={{ color: 'var(--z-muted)' }}>
                  <span className="flex items-center gap-0.5"><MapPin style={{ height: 10, width: 10 }} />{st.distance}</span>
                  <span>·</span><span>{st.openHours}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <Stars r={st.rating} />
                <span className={`badge mt-1.5 block ${st.open?'badge-green':'badge-red'}`} style={{fontSize:9}}>{st.open?'Open':'Closed'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════
   OFFERS TAB
═══════════════════════════ */
function OffersTab() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (code: string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 2500); };
  const TS: Record<string, {c:string;bc:string}> = { discount:{c:'var(--z-green)',bc:'badge-green'}, delivery:{c:'var(--z-orange)',bc:'badge-orange'}, referral:{c:'var(--z-blue)',bc:'badge-blue'} };
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 220 }}>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=350&fit=crop&q=80" alt="" className="absolute inset-0 w-full h-full img-cover" style={{ filter: 'brightness(.2) saturate(1.5)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(0,100,40,.9), rgba(7,10,18,.7))' }} />
        <div className="absolute inset-0 p-8 flex flex-col justify-center">
          <span className="badge badge-green mb-3 self-start">🔥 LIMITED TIME OFFER</span>
          <h2 className="font-black text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', letterSpacing: '-.04em' }}>
            Flat <span className="text-grad-green">50% Off</span><br />Your First Order
          </h2>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Min ₹199 · Max ₹100 off · New users only</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-black text-sm px-5 py-2.5 rounded-2xl" style={{ background: 'rgba(0,0,0,.5)', color: 'var(--z-green)', border: '2px dashed rgba(0,230,118,.45)', letterSpacing: '.1em' }}>ZYPHIX50</span>
            <button onClick={() => copy('ZYPHIX50')} className="btn-green rounded-2xl px-5 py-2.5 text-sm flex items-center gap-2">
              {copied === 'ZYPHIX50' ? <><Check style={{height:14,width:14}}/>Copied!</> : <><Copy style={{height:14,width:14}}/>Copy Code</>}
            </button>
          </div>
        </div>
      </div>
      <SH title="All Active Coupons" sub={`${promoCodes.length} coupons available`} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {promoCodes.map(offer => {
          const ts = TS[offer.type] || TS.discount;
          const isCopied = copied === offer.code;
          return (
            <div key={offer.code} onClick={() => copy(offer.code)} className="rounded-3xl p-5 cursor-pointer z-card transition-all duration-200 relative overflow-hidden">
              {isCopied && <div className="absolute inset-0 rounded-3xl" style={{ background: `${ts.c}08` }} />}
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-black text-base tracking-wider" style={{ color: ts.c }}>{offer.code}</span>
                    <span className={`badge ${ts.bc}`}>{offer.type}</span>
                  </div>
                  <p className="text-sm font-medium text-white mb-0.5">{offer.description}</p>
                  <p className="text-[10px]" style={{ color: 'var(--z-muted)' }}>Valid till 31 Dec 2025</p>
                </div>
                <button className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  style={{ background: isCopied?`${ts.c}18`:'rgba(255,255,255,.06)', color: isCopied?ts.c:'var(--z-muted)', border: isCopied?`1px solid ${ts.c}30`:'1px solid rgba(255,255,255,.07)' }}>
                  {isCopied?<Check style={{height:13,width:13}}/>:<Copy style={{height:13,width:13}}/>}
                  {isCopied?'Done':'Copy'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl overflow-hidden relative p-6 flex items-center gap-5 justify-between flex-wrap" style={{ background: 'linear-gradient(120deg,#040c24,#070516)', border: '1px solid rgba(68,136,255,0.2)' }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: 'rgba(68,136,255,0.12)', border: '1px solid rgba(68,136,255,0.2)' }}>🎁</div>
          <div>
            <p className="font-black text-white text-base">Refer & Earn ₹100</p>
            <p className="text-sm" style={{ color: 'var(--z-muted)' }}>You & your friend both get ₹100 wallet credits</p>
          </div>
        </div>
        <button className="btn-green rounded-2xl px-6 py-3 text-sm shrink-0">Share Now →</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   APP DOWNLOAD SECTION
═══════════════════════════ */
function AppDownload() {
  return (
    <div className="relative overflow-hidden py-16" style={{ background: 'var(--z-surf)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,230,118,0.06), transparent 60%)' }} />
        <div className="absolute top-0 right-0 w-full h-full" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(68,136,255,0.05), transparent 60%)' }} />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(120deg, var(--z-card), var(--z-card2))', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 lg:p-12">
            <div className="flex-1">
              <span className="badge badge-green mb-4 inline-block">📱 DOWNLOAD FREE</span>
              <h2 className="font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', letterSpacing: '-.04em' }}>
                Get the <span className="shimmer-brand">ZYPHIX</span> app.<br />Order in 30 seconds.
              </h2>
              <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>Exclusive app-only deals · Live order tracking · Offline mode for slow connections</p>
              <div className="flex flex-wrap gap-3">
                {[{icon:'🍎',top:'Download on the',bot:'App Store',sub:'iOS 13+'},{icon:'▶',top:'Get it on',bot:'Google Play',sub:'Android 8+'}].map((a,i)=>(
                  <button key={i} className="flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all hover:scale-105 hover:shadow-xl"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: 28 }}>{a.icon}</span>
                    <div className="text-left">
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{a.top}</p>
                      <p style={{ fontSize: 16, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>{a.bot}</p>
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{a.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-center">
              <div className="text-8xl mb-3">📲</div>
              <p className="font-black text-white text-xl">4.8 ★</p>
              <p className="text-xs" style={{ color: 'var(--z-muted)' }}>50,000+ ratings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════
   FOOTER
═══════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: 'var(--z-surf)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center animate-glow" style={{ background: 'linear-gradient(135deg,var(--z-green),var(--z-blue))' }}>
                <Zap style={{ height: 15, width: 15, color: 'white', fill: 'white' }} />
              </div>
              <span className="shimmer-brand font-black text-xl" style={{ fontFamily: "'Outfit',sans-serif", letterSpacing: '-.04em' }}>ZYPHIX</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>India's SuperLocal App — groceries, food & services delivered in 30 minutes across Jammu & Kashmir.</p>
            <div className="flex gap-3">
              {['Twitter','Instagram','LinkedIn','WhatsApp'].map(s=>(
                <a key={s} href="#" className="text-xs px-2.5 py-1.5 rounded-lg hover:text-white transition-all" style={{ color: 'var(--z-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title:'Services', links:['ZyphixNow','ZyphixEats','ZyphixBook','Kirana Near Me','Offers'] },
            { title:'Company',  links:['About Us','Careers','Press Kit','Blog','Investors'] },
            { title:'Support',  links:['Help Center','Contact Us','Refund Policy','Privacy Policy','Terms'] },
          ].map(({ title, links })=>(
            <div key={title}>
              <p className="font-black text-white text-sm mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(l=>(
                  <li key={l}><a href="#" className="text-xs hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2025 ZYPHIX Technologies Pvt. Ltd. · Jammu, Jammu & Kashmir, India</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--z-green)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--z-green)' }}>All systems operational</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════
   ROOT
═══════════════════════════ */
export function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('now');
  const CONTENT: Record<TabId, React.ReactNode> = { now:<NowTab/>, eats:<EatsTab/>, book:<BookTab/>, map:<MapTab/>, offers:<OffersTab/> };

  return (
    <div style={{ background: 'var(--z-bg)', minHeight: '100vh' }}>
      <AnnoBar />
      <Navbar />
      <Hero />
      <TrustStrip />
      <HowItWorks />

      {/* Sticky tabs */}
      <div className="sticky z-40" style={{ top: 0 }}>
        <div className="glass">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center overflow-x-auto no-scrollbar gap-1 py-3">
              {TABS.map(t => {
                const active = activeTab === t.id;
                return (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shrink-0 transition-all duration-200 whitespace-nowrap"
                    style={{ background: active ? t.accent : 'transparent', color: active ? (t.id==='now'?'#021a0e':'white') : 'rgba(255,255,255,0.4)', boxShadow: active ? `0 4px 20px ${t.accent}40` : 'none', transform: active ? 'scale(1.04)' : undefined }}>
                    <span>{t.icon}</span><span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {CONTENT[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <AppDownload />
      <Footer />
    </div>
  );
}
