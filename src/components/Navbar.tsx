import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Sparkles, Tag, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Badge } from './ui/badge';
import { CartDrawer } from './CartDrawer';

interface NavbarProps {
  onNavigate: (view: 'home' | 'shop' | 'dashboard') => void;
  onOpenAI: () => void;
  currentView: string;
  showAnnouncement?: boolean;
  onCloseAnnouncement?: () => void;
}

export function Navbar({ onNavigate, onOpenAI, currentView, showAnnouncement, onCloseAnnouncement }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = isScrolled || currentView !== 'home' ? 'text-slate-900' : 'text-white';

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {showAnnouncement && (
        <div className="bg-primary text-white py-2 px-4 relative overflow-hidden">
          <div className="absolute inset-0 ethiopian-pattern opacity-10"></div>
          <div className="container mx-auto flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <Badge className="bg-accent text-primary text-[10px] font-bold">NEW</Badge>
              <p className="text-xs md:text-sm font-medium tracking-wide">
                Experience the future of shopping with our new <span className="text-accent font-bold">Zenbil AI Assistant</span>.
              </p>
            </div>
            <button
              onClick={onCloseAnnouncement}
              className="hover:text-accent transition-colors p-2 rounded-full hover:bg-white/10 flex items-center justify-center shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      <nav
        className={cn(
          'transition-all duration-300',
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group text-left">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:rotate-12 transition-transform duration-300">
                Z
              </div>
              <span className={cn("text-2xl font-bold tracking-tight hidden md:block", navTextColor)}>
                Zenbil <span className="text-accent">Next</span>
              </span>
            </button>

            <div className={cn("hidden lg:flex items-center gap-6", navTextColor)}>
              <button 
                onClick={() => onNavigate('shop')} 
                className={cn("text-sm font-bold transition-colors hover:text-emerald-600", currentView === 'shop' && 'text-emerald-600')}
              >
                Marketplace
              </button>
              <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">Collections</a>
              <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Deals
              </a>
              <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Sellers
              </a>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative group">
              <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", isScrolled ? "text-muted-foreground" : "text-white/70")} />
              <Input
                placeholder="Search products, brands, and more..."
                className={cn(
                  "pl-10 rounded-full h-11 transition-all duration-300 w-full",
                  isScrolled ? "bg-slate-100 focus:bg-white border-transparent focus:border-primary/50 text-primary" : "bg-white/10 border-white/20 placeholder:text-white/70 text-white"
                )}
              />
            </div>
          </div>

          <div className={cn("flex items-center gap-2 md:gap-4", navTextColor)}>
            <Button variant="ghost" size="icon" className={cn("relative hidden sm:flex rounded-full", isScrolled ? "hover:bg-primary/5" : "hover:bg-white/10")}>
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-accent text-primary-foreground text-[10px] shadow-md">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("relative rounded-full", isScrolled ? "hover:bg-primary/5" : "hover:bg-white/10")}>
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-secondary text-secondary-foreground text-[10px] shadow-md">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <CartDrawer />
            </Sheet>

            <Button onClick={() => onNavigate('dashboard')} variant="ghost" size="icon" className={cn("hidden sm:flex rounded-full", isScrolled ? "hover:bg-primary/5" : "hover:bg-white/10", currentView === 'dashboard' && 'text-emerald-600')}>
              <User className="w-5 h-5" />
            </Button>

            <Button onClick={onOpenAI} className="hidden md:flex gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
              <Sparkles className="w-4 h-4" />
              AI Help
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("lg:hidden rounded-full", isScrolled ? "hover:bg-primary/5" : "hover:bg-white/10")}>
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-8">
                  <button onClick={() => onNavigate('home')} className="text-lg font-bold text-left">Home</button>
                  <button onClick={() => onNavigate('shop')} className={`text-lg font-bold text-left ${currentView === 'shop' ? 'text-accent' : ''}`}>Marketplace</button>
                  <button onClick={() => onOpenAI()} className="text-lg font-bold text-left flex items-center gap-2">
                    AI Assistant <Sparkles className="w-4 h-4 text-accent" />
                  </button>
                  <a href="#" className="text-lg font-medium">Collections</a>
                  <a href="#" className="text-lg font-medium">Sustainability</a>
                  <button onClick={() => onNavigate('dashboard')} className={`text-lg font-bold text-left ${currentView === 'dashboard' ? 'text-accent' : ''}`}>Dashboard</button>
                  <a href="#" className="text-lg font-medium flex items-center gap-2">
                    <Heart className="w-5 h-5" /> Wishlist
                  </a>
                  <a href="#" className="text-lg font-medium flex items-center gap-2">
                    <User className="w-5 h-5" /> Account
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
