import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Zap, Clock, ShoppingCart, Star, ChevronRight, Filter, Plus, Minus } from 'lucide-react';
import { products, categories, stores } from '@/data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } }
};

type CartState = Record<string, number>;

export function ZyphixNow() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartState>({});
  const [search, setSearch] = useState('');

  const filters = ['All', ...categories.map(c => c.name)];

  const filteredProducts = products.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const storeProducts = (storeName: string) =>
    filteredProducts.filter(p => p.storeName === storeName);

  const uniqueStores = [...new Set(products.map(p => p.storeName))];
  const storesWithProducts = uniqueStores.filter(s => storeProducts(s).length > 0);
  const storeDetails = stores.find(s => s.name);

  const add = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id: string) => setCart(c => {
    const n = { ...c };
    if (n[id] > 1) n[id]--;
    else delete n[id];
    return n;
  });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find(x => x.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  return (
    <div className="pb-32 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Header */}
      <div className="px-4 sm:px-8 lg:px-16 pt-6 pb-4"
        style={{ background: 'linear-gradient(180deg, rgba(0,201,167,0.06) 0%, transparent 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(0,201,167,0.15)', border: '1px solid rgba(0,201,167,0.3)' }}>
              <Zap className="h-6 w-6 fill-[#00C9A7]" style={{ color: '#00C9A7' }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">ZyphixNow</h1>
              <p className="text-sm" style={{ color: '#5A7A9A' }}>Groceries & essentials in 30 mins</p>
            </div>
          </motion.div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#5A7A9A' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search groceries, snacks, essentials..."
              className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
              style={{ background: '#0F1B35', border: '1px solid #1E3A6E', color: 'white' }}
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveCategory(f)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeCategory === f ? '#00C9A7' : 'rgba(30,58,110,0.5)',
                  color: activeCategory === f ? '#0A0E1A' : '#5A7A9A',
                  border: `1px solid ${activeCategory === f ? '#00C9A7' : '#1E3A6E'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Store sections */}
      <div className="px-4 sm:px-8 lg:px-16 pt-4">
        <div className="max-w-7xl mx-auto space-y-10">
          {storesWithProducts.length === 0 ? (
            <div className="text-center py-16 text-[#5A7A9A]">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-semibold text-white">No products found</p>
              <p className="text-sm">Try a different category or search term</p>
            </div>
          ) : storesWithProducts.map(storeName => {
            const store = stores.find(s => s.name === storeName);
            const prods = storeProducts(storeName);

            return (
              <motion.div
                key={storeName}
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {/* Store header */}
                <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
                      style={{ background: 'linear-gradient(135deg, #00C9A7, #1E4FC2)' }}>
                      {storeName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">{storeName}</h3>
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#5A7A9A' }}>
                        {store && <>
                          <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{store.distance}</span>
                          <span>·</span>
                          <Clock className="h-3 w-3" />
                          <span>Opens {store.openHours}</span>
                          {store.rating && <>
                            <span>·</span>
                            <Star className="h-3 w-3 fill-[#F5A623]" style={{ color: '#F5A623' }} />
                            <span style={{ color: '#F5A623' }}>{store.rating}</span>
                          </>}
                        </>}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:bg-[#00C9A7]/10"
                    style={{ color: '#00C9A7', border: '1px solid rgba(0,201,167,0.3)' }}>
                    View all <ChevronRight className="h-3 w-3" />
                  </button>
                </motion.div>

                {/* Products grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {prods.map(product => (
                    <motion.div key={product.id} variants={fadeUp}>
                      <div className="rounded-2xl overflow-hidden group cursor-pointer"
                        style={{ background: '#0F1B35', border: '1px solid #1E3A6E' }}>
                        {/* Image area */}
                        <div className="h-36 flex items-center justify-center text-5xl relative"
                          style={{ background: product.bgColor }}>
                          <span className="group-hover:scale-110 transition-transform duration-200 inline-block">
                            {product.emoji}
                          </span>
                          {product.origPrice && (
                            <div className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: '#FF6B35', color: 'white' }}>
                              {Math.round((1 - product.price / product.origPrice) * 100)}% OFF
                            </div>
                          )}
                          <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(0,201,167,0.2)', color: '#00C9A7', border: '1px solid rgba(0,201,167,0.3)' }}>
                            {product.weight}
                          </div>
                        </div>

                        <div className="p-3">
                          <h4 className="font-bold text-white text-sm mb-1 leading-tight line-clamp-2">{product.name}</h4>
                          <div className="flex items-baseline gap-1.5 mb-3">
                            <span className="font-black text-white text-base">₹{product.price}</span>
                            {product.origPrice && (
                              <span className="text-[11px] line-through" style={{ color: '#5A7A9A' }}>₹{product.origPrice}</span>
                            )}
                          </div>

                          {/* Add/remove controls */}
                          {cart[product.id] ? (
                            <div className="flex items-center justify-between rounded-xl overflow-hidden"
                              style={{ background: 'rgba(0,201,167,0.1)', border: '1px solid rgba(0,201,167,0.4)' }}>
                              <button onClick={() => remove(product.id)}
                                className="px-3 py-2 font-bold transition-colors hover:bg-[#00C9A7]/20"
                                style={{ color: '#00C9A7' }}>
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-sm font-black" style={{ color: '#00C9A7' }}>{cart[product.id]}</span>
                              <button onClick={() => add(product.id)}
                                className="px-3 py-2 font-bold transition-colors hover:bg-[#00C9A7]/20"
                                style={{ color: '#00C9A7' }}>
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => add(product.id)}
                              className="w-full py-2 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02]"
                              style={{ background: 'rgba(0,201,167,0.1)', color: '#00C9A7', border: '1px solid rgba(0,201,167,0.4)' }}>
                              + Add
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 z-40"
        >
          <div className="flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer"
            style={{ background: '#00C9A7', boxShadow: '0 8px 32px rgba(0,201,167,0.4)' }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm"
                style={{ background: 'rgba(0,0,0,0.2)', color: '#0A0E1A' }}>
                {totalItems}
              </div>
              <span className="font-bold text-sm" style={{ color: '#0A0E1A' }}>{totalItems} item{totalItems > 1 ? 's' : ''} added</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black" style={{ color: '#0A0E1A' }}>₹{totalPrice}</span>
              <ShoppingCart className="h-4 w-4" style={{ color: '#0A0E1A' }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
