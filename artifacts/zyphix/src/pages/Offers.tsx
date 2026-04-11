import React from 'react';
import { Tag, Copy, CheckCircle2, Ticket } from 'lucide-react';
import { offers } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function Offers() {
  const { toast } = useToast();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Promo code copied!",
      description: `${code} has been copied to your clipboard.`,
      duration: 3000,
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'discount': return <Tag className="h-6 w-6 text-zyphix-teal" />;
      case 'delivery': return <Ticket className="h-6 w-6 text-zyphix-gold" />;
      case 'referral': return <CheckCircle2 className="h-6 w-6 text-zyphix-sky" />;
      default: return <Tag className="h-6 w-6 text-primary" />;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'discount': return 'border-zyphix-teal/30 bg-zyphix-teal/5';
      case 'delivery': return 'border-zyphix-gold/30 bg-zyphix-gold/5';
      case 'referral': return 'border-zyphix-sky/30 bg-zyphix-sky/5';
      default: return 'border-border bg-card';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 md:pb-8">
      {/* Header Area */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Offers & Rewards</h1>
            <p className="text-sm text-muted-foreground">Save more on every order</p>
          </div>
        </div>
      </div>

      {/* Featured Offer */}
      <div className="bg-gradient-to-br from-zyphix-blue/40 to-card border border-zyphix-blue p-6 rounded-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 text-zyphix-blue/20 rotate-12">
          <Tag className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="bg-zyphix-blue text-white text-xs font-bold px-2 py-1 rounded inline-block uppercase mb-3">
            Mega Deal
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 max-w-[80%]">Flat 50% Off on First Grocery Order</h2>
          <p className="text-muted-foreground mb-6 max-w-[80%]">Valid on orders above ₹199. Max discount ₹100.</p>
          
          <div className="flex items-center bg-background border border-zyphix-blue/50 rounded-lg p-1 w-max">
            <span className="font-mono text-zyphix-teal font-bold px-4 tracking-wider">ZYPHIX50</span>
            <Button size="sm" onClick={() => handleCopy('ZYPHIX50')} className="bg-zyphix-blue hover:bg-zyphix-blue/80 text-white">
              Copy Code
            </Button>
          </div>
        </div>
      </div>

      {/* All Offers Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Available Coupons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map(offer => (
            <Card key={offer.id} className={`border ${getColorForType(offer.type)}`}>
              <div className="p-5 flex items-start gap-4">
                <div className="bg-background rounded-full p-3 border border-border shrink-0">
                  {getIconForType(offer.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{offer.description}</h4>
                  <p className="text-xs text-muted-foreground mb-4">Valid till 31st Dec 2024</p>
                  
                  <div className="flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="font-mono text-sm font-bold text-white border border-dashed border-muted-foreground/50 px-2 py-1 rounded bg-background/50">
                      {offer.code}
                    </div>
                    <button 
                      onClick={() => handleCopy(offer.code)}
                      className="text-sm font-bold text-zyphix-sky hover:text-white transition-colors flex items-center"
                    >
                      Copy <Copy className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Referral Banner */}
      <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mt-8">
        <div>
          <h3 className="font-bold text-white text-lg">Invite Friends & Earn</h3>
          <p className="text-sm text-muted-foreground mt-1">Get ₹100 Zyphix Cash for every friend who orders.</p>
        </div>
        <Button className="bg-white text-background font-bold px-6 shrink-0 w-full sm:w-auto">
          Share Link
        </Button>
      </div>
    </div>
  );
}