import { useState, useEffect } from 'react';
import { Timer, Zap, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = [
    {
      name: 'ZenBook Pro X',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/laptop-premium-550deb08-1783500880272.webp',
      price: 110000,
      oldPrice: 125000,
      stock: 65,
      discount: '12%'
    },
    {
      name: 'Emerald S24 Ultra',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/smartphone-emerald-b3d09bda-1783500879949.webp',
      price: 78000,
      oldPrice: 85000,
      stock: 40,
      discount: '8%'
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern-dark opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/20">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold uppercase tracking-widest">Limited Time Only</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              Flash <span className="text-accent">Deals</span>
            </h2>
            
            <div className="flex items-center gap-4">
              <span className="text-lg text-white/60">Ending in:</span>
              <div className="flex gap-3">
                {[timeLeft.h, timeLeft.m, timeLeft.s].map((time, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl font-black text-accent">
                      {time.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-2 text-white/40">
                      {i === 0 ? 'Hours' : i === 1 ? 'Minutes' : 'Seconds'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl text-white/70 max-w-md">
              The hottest products at unbeatable prices. Grab yours before the clock runs out or stock is gone.
            </p>

            <Button size="lg" className="rounded-full bg-accent text-primary hover:bg-accent/90 font-bold px-8 h-14">
              Shop All Deals
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {dealProducts.map((product, i) => (
              <div key={i} className="bg-white rounded-[32px] p-6 text-primary group">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                    SAVE {product.discount}
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black text-primary">{product.price.toLocaleString()} ETB</span>
                  <span className="text-muted-foreground line-through text-sm">{product.oldPrice.toLocaleString()} ETB</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span className="text-muted-foreground">Limited Stock</span>
                    <span className="text-red-500">{product.stock}% Left</span>
                  </div>
                  <Progress value={product.stock} className="h-2 bg-slate-100" />
                </div>

                <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 font-bold gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Claim Deal
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
