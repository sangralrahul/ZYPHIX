import React, { useState } from 'react';
import { Search, Utensils, Star, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { restaurants } from '@/data/mockData';

export function ZyphixEats() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'North Indian', 'Chinese', 'Fast Food', 'Sweets'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zyphix-gold/20 flex items-center justify-center">
            <Utensils className="h-5 w-5 text-zyphix-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ZyphixEats</h1>
            <p className="text-sm text-muted-foreground">Food delivery from local dhabas & restaurants</p>
          </div>
        </div>

        <div className="relative md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search restaurants or dishes..." 
            className="pl-10 bg-card border-border text-white"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
              activeFilter === filter 
                ? 'bg-zyphix-gold text-background border-zyphix-gold' 
                : 'bg-card text-muted-foreground border-border hover:bg-muted/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-r from-[#1A1105] to-card border border-zyphix-gold/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-zyphix-gold/10 rounded-full flex items-center justify-center text-6xl shrink-0">
          🍲
        </div>
        <div className="text-center md:text-left flex-1">
          <div className="inline-block bg-zyphix-gold text-background text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
            Featured Dhaba
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Sharma Dhaba Special</h2>
          <p className="text-sm text-muted-foreground mb-4">Authentic Dal Makhni with butter naan. Free delivery on orders above ₹199.</p>
          <button className="bg-white text-background font-bold px-5 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
            Order Now
          </button>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white mb-4">Restaurants near you</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants
            .filter(r => activeFilter === 'All' || r.cuisine.includes(activeFilter))
            .map(restaurant => (
            <Card key={restaurant.id} className="border-border bg-card overflow-hidden hover:border-zyphix-gold/50 transition-colors cursor-pointer group">
              <div className="flex flex-col h-full">
                {/* Top Image area */}
                <div className="h-32 bg-background/50 flex items-center justify-center text-6xl relative border-b border-border">
                  {restaurant.thumbnail}
                  
                  {/* Badges positioned over image area */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    {restaurant.badges.map(badge => (
                      <span key={badge} className="text-[10px] font-bold text-zyphix-gold bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-zyphix-gold/30">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Content area */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-white group-hover:text-zyphix-gold transition-colors">{restaurant.name}</h3>
                    <div className="flex items-center bg-zyphix-teal/20 text-zyphix-teal px-1.5 py-0.5 rounded text-xs font-bold">
                      <Star className="h-3 w-3 fill-zyphix-teal mr-1" />
                      {restaurant.rating}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{restaurant.cuisine}</p>
                  
                  <div className="mt-auto flex items-center justify-between text-xs font-medium border-t border-border pt-3">
                    <div className="flex items-center text-white">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      {restaurant.eta}
                    </div>
                    <div className="flex items-center text-white">
                      <span className="text-muted-foreground mr-1.5">•</span>
                      {restaurant.deliveryFee === 0 ? (
                        <span className="text-zyphix-teal">Free Delivery</span>
                      ) : (
                        <span>₹{restaurant.deliveryFee} delivery</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}