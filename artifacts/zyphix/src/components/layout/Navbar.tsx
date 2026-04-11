import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Bell, Zap, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const cartCount = 3;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5,6,15,0.95)' : 'rgba(5,6,15,0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.6)' : 'none',
      }}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00FFD1, #8B5CF6)' }}>
              <Zap className="h-4.5 w-4.5 text-white fill-white relative z-10" style={{ height: 18, width: 18 }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-xl tracking-tight"
                style={{ background: 'linear-gradient(90deg,#00FFD1,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                ZYPHIX
              </span>
            </div>
          </Link>

          {/* Location pill */}
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-white/5 shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <MapPin className="h-3.5 w-3.5" style={{ color: '#00FFD1' }} />
            <div className="text-left">
              <p className="text-[9px] font-medium leading-none" style={{ color: '#4A5080' }}>DELIVER TO</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <span className="font-bold text-white text-sm leading-none">Jammu, J&K</span>
                <ChevronDown className="h-3 w-3" style={{ color: '#4A5080' }} />
              </div>
            </div>
          </button>

          {/* Search */}
          <div className="flex-1 relative max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 z-10 transition-colors"
              style={{ color: focused ? '#00FFD1' : '#4A5080' }} />
            <input
              type="text"
              placeholder='Search groceries, food, services...'
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-200"
              style={{
                background: focused ? 'rgba(17,20,38,0.9)' : 'rgba(17,20,38,0.6)',
                border: focused ? '1px solid rgba(0,255,209,0.4)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: focused ? '0 0 0 4px rgba(0,255,209,0.06)' : 'none',
              }}
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white/80 transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Login</span>
            </button>

            <Link href="/">
              <button className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00FFD1, #0EA5E9)',
                  color: '#050F0A',
                  boxShadow: '0 4px 20px rgba(0,255,209,0.25)',
                }}>
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center text-white"
                    style={{ background: '#F97316' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            <button className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(5,6,15,0.98)' }}>
          <div className="px-4 py-4 space-y-1">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#4A5080' }} />
              <input placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(17,20,38,0.8)', border: '1px solid rgba(255,255,255,0.07)' }} />
            </div>
            {['🏠 Home', '⚡ ZyphixNow', '🍱 ZyphixEats', '📅 ZyphixBook', '🗺️ Kirana Near Me', '🏷️ Offers'].map((item, i) => (
              <div key={i} onClick={() => setMobileOpen(false)}
                className="py-3 px-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors cursor-pointer font-medium">
                {item}
              </div>
            ))}
            <button className="w-full mt-2 py-3 rounded-xl font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#00FFD1,#8B5CF6)', color: '#050F0A' }}>
              Sign Up Free — It's Quick!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
