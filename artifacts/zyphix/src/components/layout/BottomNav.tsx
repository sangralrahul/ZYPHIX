import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Zap, Utensils, CalendarCheck, MapPin, Tag } from 'lucide-react';

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Now', path: '/now', icon: Zap, color: 'text-zyphix-teal' },
    { label: 'Eats', path: '/eats', icon: Utensils, color: 'text-zyphix-gold' },
    { label: 'Book', path: '/book', icon: CalendarCheck, color: 'text-zyphix-orange' },
    { label: 'Offers', path: '/offers', icon: Tag },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe pt-2 px-2 shadow-lg">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path} className="flex-1 flex flex-col items-center justify-center p-2 group">
              <div className={`mb-1 transition-transform group-active:scale-95 ${
                isActive ? (item.color || 'text-primary') : 'text-muted-foreground'
              }`}>
                <Icon className={`h-6 w-6 ${isActive && item.color ? '' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${
                isActive ? 'text-white' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}