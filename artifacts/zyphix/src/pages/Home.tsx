import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Copy, ChevronRight, Zap, Utensils, CalendarCheck, Star, MapPin, Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products, categories, restaurants, services, promoCodes } from '@/data/mockData';

export function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const copyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const addToCart = (productId: string) => {
    setCartItems(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 md:pb-8">
      
      {/* Hero Service Cards - Match reference screenshot */}
      <section className="grid grid-cols-3 gap-3 mt-2">
        <Link href="/now">
          <div className="relative rounded-xl overflow-hidden cursor-pointer border border-[#00C9A7]/30 hover:border-[#00C9A7] transition-all duration-200 hover:scale-[1.02] group"
            style={{ background: 'linear-gradient(135deg, #0D3B2E 0%, #0A0E1A 100%)' }}>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] font-bold bg-[#00C9A7] text-[#0A0E1A] px-2 py-0.5 rounded-full uppercase tracking-wide">ZYPHIXNOW</span>
              </div>
              <h3 className="font-bold text-white text-base leading-tight mb-1">Groceries in 30 min</h3>
              <p className="text-[11px] text-[#5A7A9A] mb-3">From kirana stores near you</p>
              <div className="inline-flex items-center gap-1 bg-[#00C9A7] text-[#0A0E1A] text-xs font-bold px-3 py-1.5 rounded-lg">
                Order Now
              </div>
              <div className="absolute top-3 right-3 text-3xl opacity-60">🛒</div>
            </div>
          </div>
        </Link>

        <Link href="/eats">
          <div className="relative rounded-xl overflow-hidden cursor-pointer border border-[#F5A623]/30 hover:border-[#F5A623] transition-all duration-200 hover:scale-[1.02] group"
            style={{ background: 'linear-gradient(135deg, #3B2500 0%, #0A0E1A 100%)' }}>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] font-bold bg-[#F5A623] text-[#0A0E1A] px-2 py-0.5 rounded-full uppercase tracking-wide">ZYPHIXEATS</span>
              </div>
              <h3 className="font-bold text-white text-base leading-tight mb-1">Local Food, Fast</h3>
              <p className="text-[11px] text-[#5A7A9A] mb-3">Dhabas · Home chefs · Restaurants</p>
              <div className="inline-flex items-center gap-1 bg-[#F5A623] text-[#0A0E1A] text-xs font-bold px-3 py-1.5 rounded-lg">
                Order Food
              </div>
              <div className="absolute top-3 right-3 text-3xl opacity-60">🍱</div>
            </div>
          </div>
        </Link>

        <Link href="/book">
          <div className="relative rounded-xl overflow-hidden cursor-pointer border border-[#FF6B35]/30 hover:border-[#FF6B35] transition-all duration-200 hover:scale-[1.02] group"
            style={{ background: 'linear-gradient(135deg, #2A1A00 0%, #0A0E1A 100%)' }}>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] font-bold bg-[#FF6B35] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">ZYPHIXBOOK</span>
              </div>
              <h3 className="font-bold text-white text-base leading-tight mb-1">Book Appointments</h3>
              <p className="text-[11px] text-[#5A7A9A] mb-3">Barbers · Garages · Doctors</p>
              <div className="inline-flex items-center gap-1 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                Book Slot
              </div>
              <div className="absolute top-3 right-3 text-3xl opacity-60">📅</div>
            </div>
          </div>
        </Link>
      </section>

      {/* Promo Strip */}
      <section>
        <div className="rounded-xl border border-[#1E3A6E] overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #0F1B35 0%, #0F2448 100%)' }}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold bg-[#1E4FC2] text-white px-2.5 py-1 rounded-md uppercase tracking-wide">ZYPHIX50</span>
              <span className="text-white text-sm">50% off your first order · Max ₹100 discount</span>
            </div>
            <button
              onClick={() => copyPromo('ZYPHIX50')}
              className="text-xs font-bold text-[#00C9A7] border border-[#00C9A7]/40 px-3 py-1.5 rounded-lg hover:bg-[#00C9A7]/10 transition-colors flex items-center gap-1"
            >
              {copiedCode === 'ZYPHIX50' ? <><Check className="h-3 w-3" /> Copied!</> : 'Copy'}
            </button>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Shop by Category</h2>
          <Link href="/now" className="text-[#2D9CDB] text-sm font-medium flex items-center hover:underline">
            See all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {categories.map(cat => (
            <Link key={cat.id} href={`/now?cat=${cat.id}`}>
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-full aspect-square rounded-xl bg-[#0F1B35] border border-[#1E3A6E] flex items-center justify-center text-2xl group-hover:border-[#00C9A7] transition-colors">
                  {cat.emoji}
                </div>
                <span className="text-[11px] text-center text-[#5A7A9A] group-hover:text-white font-medium leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Near You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Trending Near You</h2>
          <Link href="/now" className="text-[#2D9CDB] text-sm font-medium flex items-center hover:underline">
            View all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="rounded-xl bg-[#0F1B35] border border-[#1E3A6E] overflow-hidden hover:border-[#1E4FC2] transition-colors">
              <div className="h-32 flex items-center justify-center text-5xl"
                style={{ background: product.bgColor || 'linear-gradient(135deg, #0D3B2E, #0F1B35)' }}>
                {product.emoji}
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-white text-sm line-clamp-1 mb-0.5">{product.name}</h4>
                <p className="text-[10px] text-[#5A7A9A] mb-2 flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {product.storeName} · {product.distance}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm">₹{product.price}</span>
                    {product.origPrice && (
                      <span className="text-[10px] text-[#5A7A9A] line-through ml-1">₹{product.origPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="text-xs font-bold text-[#00C9A7] border border-[#00C9A7]/50 px-2 py-1 rounded-lg hover:bg-[#00C9A7]/10 transition-colors"
                  >
                    {cartItems[product.id] ? `+${cartItems[product.id]}` : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order Food Nearby */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Order Food Nearby</h2>
          <Link href="/eats" className="text-[#2D9CDB] text-sm font-medium flex items-center hover:underline">
            See all restaurants <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {restaurants.slice(0, 3).map(restaurant => (
            <Link key={restaurant.id} href="/eats">
              <div className="rounded-xl bg-[#0F1B35] border border-[#1E3A6E] hover:border-[#1E4FC2] transition-colors cursor-pointer p-3 flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-[#0A0E1A] flex items-center justify-center text-3xl shrink-0 border border-[#1E3A6E]">
                  {restaurant.thumbnail}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-bold text-white text-sm">{restaurant.name}</h4>
                    <div className="flex items-center bg-green-900/40 text-green-400 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ml-2">
                      <Star className="h-2.5 w-2.5 fill-green-400 mr-0.5" />
                      {restaurant.rating}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#5A7A9A] mb-1.5 truncate">{restaurant.cuisine}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-white/80 bg-white/10 px-1.5 py-0.5 rounded-full">{restaurant.eta}</span>
                    {restaurant.badges.map(badge => (
                      <span key={badge} className="text-[10px] font-medium text-[#00C9A7] bg-[#00C9A7]/10 px-1.5 py-0.5 rounded-full border border-[#00C9A7]/20">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Book a Service */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Book a Service</h2>
          <Link href="/book" className="text-[#2D9CDB] text-sm font-medium flex items-center hover:underline">
            See all <ChevronRight className="h-4 w-4 ml-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {services.slice(0, 3).map(service => (
            <Link key={service.id} href="/book">
              <div className="rounded-xl bg-[#0F1B35] border border-[#1E3A6E] hover:border-[#FF6B35]/50 transition-colors cursor-pointer p-4 flex flex-col items-center text-center">
                <div className="text-3xl mb-2">{service.emoji}</div>
                <h4 className="font-bold text-white text-sm mb-1">{service.title}</h4>
                <p className="text-[10px] text-[#00C9A7] font-medium">{service.available} available</p>
                <p className="text-[10px] text-[#5A7A9A] mt-0.5">Next: {service.nextSlot}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Codes Section */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Offers & Promo Codes</h2>
        <div className="grid grid-cols-2 gap-3">
          {promoCodes.map(promo => (
            <div key={promo.code} className="rounded-xl border border-[#1E3A6E] p-3"
              style={{ background: 'linear-gradient(135deg, #0F1B35 0%, #0F2448 100%)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#F5A623]">{promo.code}</span>
                <button
                  onClick={() => copyPromo(promo.code)}
                  className="text-[10px] text-[#00C9A7] border border-[#00C9A7]/40 px-2 py-0.5 rounded hover:bg-[#00C9A7]/10 transition-colors"
                >
                  {copiedCode === promo.code ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-white font-medium">{promo.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
