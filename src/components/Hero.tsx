import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-primary">
      {/* Background with Pattern */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/hero-bg-21e25940-1783500880392.webp" 
          alt="Zenbil Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
        <div className="absolute inset-0 ethiopian-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-bold tracking-widest uppercase">Ethiopia's First Intelligent Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
            Shop Smarter <br /> with <span className="text-accent">Zenbil AI.</span>
          </h1>
          
          <p className="text-xl text-white/70 leading-relaxed max-w-xl font-medium">
            Discover, compare, and purchase products through Ethiopia's most intelligent marketplace. Powered by Neo-Ethiopian Futurism.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="w-full sm:w-auto rounded-full bg-accent text-primary hover:bg-accent/90 text-lg font-bold px-8 h-14 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20">
              Start Shopping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-white/30 text-white hover:bg-white/10 text-lg font-medium px-8 h-14 backdrop-blur-sm">
              <Sparkles className="mr-2 w-4 h-4 text-accent" />
              Try AI Assistant
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">50k+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Products</div>
            </div>
            <div className="border-l border-white/20 h-10"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">100k+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">Users</div>
            </div>
            <div className="border-l border-white/20 h-10"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
        <div className="relative w-full h-full">
           {/* Can add decorative floating product cards here */}
        </div>
      </div>
    </section>
  );
}
