import React from 'react';
import { CalendarCheck, ChevronRight, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { services } from '@/data/mockData';

export function ZyphixBook() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zyphix-orange/20 flex items-center justify-center">
            <CalendarCheck className="h-5 w-5 text-zyphix-orange" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ZyphixBook</h1>
            <p className="text-sm text-muted-foreground">Book local services instantly</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">What do you need help with?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {services.map(service => (
            <Card key={service.id} className="border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex flex-col items-center text-center h-full justify-between">
                <div className="w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center text-3xl mb-3 group-hover:border-zyphix-orange transition-colors">
                  {service.emoji}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{service.title}</h4>
                <p className="text-[10px] text-muted-foreground">{service.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Available Now */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Available Slots
          </h2>
        </div>
        <div className="space-y-3">
          {services.slice(0, 4).map(service => (
            <div key={service.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center text-2xl shrink-0">
                  {service.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{service.title}</h3>
                  <div className="flex items-center text-xs text-zyphix-orange font-medium mt-1">
                    <Clock className="w-3 h-3 mr-1" /> Next available: {service.nextSlot}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-border sm:border-0 pt-3 sm:pt-0">
                <div className="text-sm text-muted-foreground">
                  <span className="text-white font-medium">{service.available}</span> professionals
                </div>
                <Button className="bg-zyphix-orange hover:bg-zyphix-orange/90 text-background font-bold px-6">
                  Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Providers */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Top Rated Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Raju Barber Shop", cat: "Haircut", rating: 4.8, jobs: 124, emoji: "✂️" },
            { name: "Sharma Electronics", cat: "Repair", rating: 4.9, jobs: 89, emoji: "🔧" }
          ].map((provider, i) => (
            <Card key={i} className="bg-card border-border">
              <div className="flex items-center p-4 gap-4">
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-2xl border border-border">
                  {provider.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{provider.name}</h4>
                  <p className="text-xs text-muted-foreground">{provider.cat}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-zyphix-teal text-sm font-bold justify-end mb-1">
                    <Star className="w-3.5 h-3.5 fill-zyphix-teal mr-1" />
                    {provider.rating}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{provider.jobs} jobs done</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}