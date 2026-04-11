import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, MapPin, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'ZyphixNow', path: '/now', icon: '⚡' },
    { label: 'ZyphixEats', path: '/eats', icon: '🍱' },
    { label: 'ZyphixBook', path: '/book', icon: '📅' },
    { label: 'Kirana Near Me', path: '/map', icon: '🗺️' },
    { label: 'Offers', path: '/offers', icon: '🏷️' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full" style={{ background: '#0F1B35', borderBottom: '1px solid #1E3A6E' }}>
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-3">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="font-bold text-xl tracking-tight text-white" style={{ borderLeft: '3px solid #00C9A7', paddingLeft: '8px' }}>
              ZYPHIX
            </div>
          </Link>
          
          {/* Location */}
          <div className="hidden md:flex items-center gap-1 text-sm cursor-pointer group ml-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: '#00C9A7' }} />
            <span className="text-white font-medium text-sm">Deliver to:</span>
            <span className="font-semibold text-white truncate max-w-[100px]">Jammu, J&K</span>
            <ChevronDown className="h-3.5 w-3.5" style={{ color: '#5A7A9A' }} />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-2 relative hidden md:flex">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4" style={{ color: '#5A7A9A' }} />
            </div>
            <input 
              type="search" 
              placeholder="Search groceries, food, services..."
              className="w-full pl-9 pr-4 py-2 rounded-lg text-white text-sm outline-none focus:ring-1 focus:ring-[#1E4FC2]"
              style={{ background: '#0A0E1A', border: '1px solid #1E3A6E', color: 'white' }}
              onFocus={(e) => { e.target.style.borderColor = '#1E4FC2'; }}
              onBlur={(e) => { e.target.style.borderColor = '#1E3A6E'; }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="hidden sm:flex items-center gap-1.5 border text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/5"
              style={{ borderColor: '#1E3A6E' }}>
              <User className="h-4 w-4" />
              Login
            </button>
            
            <Link href="/cart">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold relative"
                style={{ background: '#00C9A7', color: '#0A0E1A' }}>
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: '#FF6B35', color: 'white' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="hidden md:flex items-center gap-6 h-10 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="text-sm font-medium whitespace-nowrap transition-colors h-full flex items-center"
                style={{ 
                  color: isActive ? '#00C9A7' : '#5A7A9A',
                  borderBottom: isActive ? '2px solid #00C9A7' : '2px solid transparent',
                  paddingTop: '2px'
                }}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 z-50 shadow-xl" style={{ background: '#0F1B35', borderBottom: '1px solid #1E3A6E' }}>
          <div className="px-4 py-2">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#5A7A9A' }} />
              <input 
                placeholder="Search groceries, food, services..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-white text-sm outline-none"
                style={{ background: '#0A0E1A', border: '1px solid #1E3A6E' }}
              />
            </div>
            {navItems.map((item) => {
              const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: '#1E3A6E', color: isActive ? '#00C9A7' : 'white' }}>
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
            <div className="py-3 flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-white text-sm font-medium border" style={{ borderColor: '#1E3A6E' }}>Login</button>
              <button className="flex-1 py-2 rounded-lg text-sm font-bold" style={{ background: '#00C9A7', color: '#0A0E1A' }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
