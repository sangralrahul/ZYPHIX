import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Utensils, ArrowRight, Zap } from 'lucide-react';
import { restaurants } from '@/data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const CUISINES = ['All', 'North Indian', 'Chinese', 'Fast Food', 'Sweets', 'Wazwan'];

const POPULAR_DISHES = [
  { name: 'Dal Makhni', emoji: '🫕', price: 149, rating: 4.8, from: 'Sharma Dhaba' },
  { name: 'Veg Thali', emoji: '🍱', price: 119, rating: 4.6, from: 'Jammu Kitchen' },
  { name: 'Pepperoni Pizza', emoji: '🍕', price: 199, rating: 4.3, from: 'Pizza Palace JK' },
  { name: 'Wazwan Platter', emoji: '🍖', price: 299, rating: 4.9, from: 'Kashmir Kitchen' },
  { name: 'Gulab Jamun', emoji: '🍡', price: 49, rating: 4.7, from: 'Jammu Sweets' },
  { name: 'Rajma Chawal', emoji: '🍛', price: 109, rating: 4.5, from: 'Sharma Dhaba' },
];

export function ZyphixEats() {
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <div className="pb-24 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Header */}
      <div className="px-4 sm:px-8 lg:px-16 pt-6 pb-4"
        style={{ background: 'linear-gradient(180deg, rgba(245,166,35,0.06) 0%, transparent 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)' }}>
              <Utensils className="h-6 w-6" style={{ color: '#F5A623' }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">ZyphixEats</h1>
              <p className="text-sm" style={{ color: '#5A7A9A' }}>Food delivery from local dhabas & restaurants</p>
            </div>
          </motion.div>

          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#5A7A9A' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search restaurants, dishes..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm outline-none"
              style={{ background: '#0F1B35', border: '1px solid #1E3A6E', color: 'white' }}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {CUISINES.map(c => (
              <button key={c} onClick={() => setActiveCuisine(c)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeCuisine === c ? '#F5A623' : 'rgba(30,58,110,0.5)',
                  color: activeCuisine === c ? '#0A0E1A' : '#5A7A9A',
                  border: `1px solid ${activeCuisine === c ? '#F5A623' : '#1E3A6E'}`,
                }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-16 pt-6">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Featured Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative overflow-hidden rounded-2xl p-6 cursor-pointer group"
              style={{ background: 'linear-gradient(135deg, #2a1a00 0%, #0F1B35 100%)', border: '1px solid rgba(245,166,35,0.25)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,166,35,0.1), transparent)' }} />
              <div className="flex items-center gap-6 relative">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0"
                  style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)' }}>
                  🍲
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
                    style={{ background: 'rgba(245,166,35,0.2)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.4)' }}>
                    ⭐ FEATURED DHABA
                  </div>
                  <h3 className="text-xl font-black text-white mb-1">Sharma Dhaba Special</h3>
                  <p className="text-sm mb-3" style={{ color: '#5A7A9A' }}>Authentic Dal Makhni with butter naan. Free delivery on orders above ₹199.</p>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                    style={{ background: '#F5A623', color: '#0A0E1A', boxShadow: '0 4px 20px rgba(245,166,35,0.3)' }}>
                    Order Now <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg shrink-0"
                  style={{ background: 'rgba(0,201,167,0.15)', border: '1px solid rgba(0,201,167,0.3)', color: '#00C9A7' }}>
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-bold">Free delivery</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Popular Dishes */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-5">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#5A7A9A' }}>Most Ordered</p>
              <h2 className="text-xl font-black text-white">Popular Dishes</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {POPULAR_DISHES.map((dish, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <div className="rounded-2xl overflow-hidden cursor-pointer group card-hover"
                    style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
                    <div className="h-24 flex items-center justify-center text-4xl"
                      style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1), rgba(10,14,26,0.8))' }}>
                      <span className="group-hover:scale-110 transition-transform duration-200 inline-block">{dish.emoji}</span>
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-white text-sm mb-0.5 truncate">{dish.name}</p>
                      <p className="text-[10px] mb-2 truncate" style={{ color: '#5A7A9A' }}>{dish.from}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-white text-sm">₹{dish.price}</span>
                        <div className="flex items-center gap-0.5 text-[10px] font-bold" style={{ color: '#F5A623' }}>
                          <Star className="h-3 w-3 fill-current" />{dish.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Restaurants */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-5">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#5A7A9A' }}>Near You</p>
              <h2 className="text-xl font-black text-white">Restaurants near you</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurants.map((r) => (
                <motion.div key={r.id} variants={fadeUp}>
                  <div className="rounded-2xl glass border-[#1E3A6E] hover:border-[#F5A623]/40 card-hover cursor-pointer p-4 flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
                      style={{ border: '1px solid rgba(245,166,35,0.2)' }}>
                      <img src={r.image} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-black text-white text-base">{r.name}</h4>
                        <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 ml-2"
                          style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                          <Star className="h-3 w-3 fill-current" />{r.rating}
                        </div>
                      </div>
                      <p className="text-xs mb-2 truncate" style={{ color: '#5A7A9A' }}>{r.cuisine}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-xs bg-white/5 px-2 py-0.5 rounded-full" style={{ color: 'rgba(255,255,255,0.7)' }}>
                          <Clock className="h-3 w-3" />{r.eta}
                        </span>
                        {r.deliveryFee === 0 && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(0,201,167,0.15)', color: '#00C9A7', border: '1px solid rgba(0,201,167,0.3)' }}>
                            Free delivery
                          </span>
                        )}
                        {(r.tags || []).filter(b => b !== 'Free Delivery').map(badge => (
                          <span key={badge} className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(245,166,35,0.15)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}>
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
