import React, { useState } from 'react';
import { Search, MapPin, Zap, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products, categories, stores } from '@/data/mockData';

export function ZyphixNow() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filters = ['All', ...categories.map(c => c.name)];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header Area */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zyphix-teal/20 flex items-center justify-center">
            <Zap className="h-5 w-5 text-zyphix-teal fill-zyphix-teal" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ZyphixNow</h1>
            <p className="text-sm text-muted-foreground">Groceries & essentials in 30 mins</p>
          </div>
        </div>

        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search groceries..." 
            className="pl-10 bg-card border-border text-white"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveCategory(filter)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeCategory === filter 
                ? 'bg-zyphix-teal text-background border-zyphix-teal' 
                : 'bg-card text-muted-foreground border-border hover:bg-muted/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Stores & Products */}
      <div className="space-y-8">
        {stores.map(store => (
          <div key={store.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-muted/20 flex items-center justify-center text-white font-bold text-xs">
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white">{store.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{store.distance} • Opens {store.openHours}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-zyphix-blue text-white h-8 text-xs bg-transparent">
                View Store
              </Button>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar snap-x">
              {products
                .filter(p => p.storeName === store.name && (activeCategory === 'All' || p.category === activeCategory))
                .map(product => (
                <Card key={product.id} className="min-w-[160px] max-w-[160px] snap-start border-border bg-card">
                  <CardContent className="p-3 flex flex-col h-full">
                    <div className="aspect-square bg-background rounded-lg flex items-center justify-center text-5xl mb-3 border border-border">
                      {product.emoji}
                    </div>
                    <div className="space-y-1 mb-2 flex-1">
                      <h4 className="font-semibold text-white text-sm line-clamp-2 leading-tight">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.weight}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-bold text-white text-sm">₹{product.price}</span>
                        {product.origPrice && (
                          <div className="text-[10px] text-muted-foreground line-through">₹{product.origPrice}</div>
                        )}
                      </div>
                      <Button size="sm" className="h-8 px-3 bg-zyphix-teal hover:bg-zyphix-teal/90 text-background font-bold text-xs rounded-md">
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {products.filter(p => p.storeName === store.name && (activeCategory === 'All' || p.category === activeCategory)).length === 0 && (
                <div className="text-sm text-muted-foreground py-4 italic">
                  No products in this category.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}