import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';
import { ZyphixLogo } from '../ZyphixLogo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const cartCount = 3;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(9,9,14,0.97)' : 'rgba(16,18,24,0.95)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.04)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.5)' : 'none',
      }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <ZyphixLogo size={34} wordmarkColor="#ffffff" wordmarkHighlight="#34D399" />
          </Link>

          {/* ── Location ── */}
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5 shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <MapPin style={{ height: 14, width: 14, color: 'var(--z-green)' }} />
            <div className="text-left">
              <p className="text-[9px] font-semibold uppercase tracking-wide leading-none" style={{ color: 'var(--z-muted)' }}>Deliver to</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="font-bold text-white text-sm leading-none">Jammu, J&K</span>
                <ChevronDown style={{ height: 12, width: 12, color: 'var(--z-muted)' }} />
              </div>
            </div>
          </button>

          {/* ── Search bar ── */}
          <div className="flex-1 relative max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors z-10"
              style={{ height: 16, width: 16, color: focused ? 'var(--z-green)' : 'var(--z-muted)' }} />
            <input
              type="text"
              placeholder="Search groceries, food, services..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-200 placeholder:text-[var(--z-muted)]"
              style={{
                background: focused ? 'rgba(22,24,31,0.95)' : 'rgba(22,24,31,0.7)',
                border: focused ? '1px solid rgba(0,217,126,0.4)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: focused ? '0 0 0 3px rgba(0,217,126,0.06)' : 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-1.5 btn-ghost rounded-xl px-3.5 py-2 text-sm">
              <User style={{ height: 15, width: 15 }} />
              <span className="hidden lg:inline">Login</span>
            </button>

            <button className="relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm btn-primary">
              <ShoppingCart style={{ height: 16, width: 16 }} />
              <span className="hidden sm:inline font-black">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                  style={{ background: 'var(--z-orange)', width: 18, height: 18 }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 rounded-xl transition-colors hover:bg-white/5"
              style={{ color: 'var(--z-muted)' }}
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X style={{ height: 20, width: 20 }} /> : <Menu style={{ height: 20, width: 20 }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: 'rgba(9,9,14,0.99)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-1">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ height: 15, width: 15, color: 'var(--z-muted)' }} />
              <input placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder:text-[var(--z-muted)]"
                style={{ background: 'rgba(22,24,31,0.8)', border: '1px solid rgba(255,255,255,0.07)' }} />
            </div>
            {[['⚡', 'ZyphixNow'], ['🍱', 'ZyphixEats'], ['🗺️', 'Kirana Near Me'], ['🏷️', 'Offers']].map(([icon, label]) => (
              <div key={label} onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer font-medium text-white/80">
                <span>{icon}</span>{label}
              </div>
            ))}
            <button className="w-full mt-3 py-3 rounded-xl font-black text-sm btn-primary">
              Get Started — It's Free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
