import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, X, Zap } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className="sticky top-0 z-50 w-full transition-all duration-200"
      style={{
        background: scrolled ? 'rgba(10,14,26,0.97)' : '#0A0E1A',
        borderBottom: '1px solid rgba(30,58,110,0.6)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00C9A7, #1E4FC2)' }}>
              <Zap className="h-4 w-4 text-white fill-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-white hidden sm:block">ZYPHIX</span>
          </Link>

          {/* Location */}
          <button className="flex items-center gap-1 text-sm shrink-0 hover:opacity-80 transition-opacity">
            <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: '#00C9A7' }} />
            <div className="hidden md:block text-left">
              <p className="text-[10px] leading-none" style={{ color: '#5A7A9A' }}>Deliver to</p>
              <div className="flex items-center gap-0.5">
                <span className="font-bold text-white text-sm">Jammu, J&K</span>
                <ChevronDown className="h-3.5 w-3.5" style={{ color: '#5A7A9A' }} />
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 md:hidden" style={{ color: '#5A7A9A' }} />
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 transition-colors"
              style={{ color: searchFocused ? '#00C9A7' : '#5A7A9A' }} />
            <input
              type="search"
              placeholder='Search for "dal makhni", "amul butter"...'
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
              style={{
                background: searchFocused ? '#0F1B35' : 'rgba(15,27,53,0.8)',
                border: searchFocused ? '1.5px solid rgba(0,201,167,0.6)' : '1.5px solid #1E3A6E',
                color: 'white',
                boxShadow: searchFocused ? '0 0 0 3px rgba(0,201,167,0.08)' : 'none',
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white transition-colors hover:bg-white/5"
              style={{ border: '1px solid #1E3A6E' }}>
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </button>
            <Link href="/now">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold relative transition-all hover:scale-105"
                style={{ background: '#00C9A7', color: '#0A0E1A', boxShadow: '0 4px 16px rgba(0,201,167,0.3)' }}>
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline font-black">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center"
                    style={{ background: '#FF6B35', color: 'white' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-[#5A7A9A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t" style={{ borderColor: '#1E3A6E', background: 'rgba(10,14,26,0.99)' }}>
          <div className="px-4 py-3 space-y-1">
            {[
              { label: 'Home', path: '/' },
              { label: '⚡ ZyphixNow', path: '/now' },
              { label: '🍱 ZyphixEats', path: '/eats' },
              { label: '📅 ZyphixBook', path: '/book' },
              { label: '🗺️ Kirana Near Me', path: '/map' },
              { label: '🏷️ Offers', path: '/offers' },
            ].map(item => (
              <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                <div className="py-3 px-3 rounded-xl font-medium text-white hover:bg-white/5 transition-colors cursor-pointer">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
