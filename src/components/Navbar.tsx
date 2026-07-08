import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Sparkles, Tag, Users, Zap } from 'lucide-react';
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
}

export function Navbar({ onNavigate, onOpenAI, currentView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-2 shadow-sm translate-y-0' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 group text-left">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:rotate-12 transition-transform duration-300">
              Z
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary hidden md:block">
              Zenbil <span className="text-accent">Next</span>
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-6 text-primary">
            <button 
              onClick={() => onNavigate('shop')} 
              className={`text-sm font-bold transition-colors ${currentView === 'shop' ? 'text-accent' : 'hover:text-accent'}`}
            >
              Marketplace
            </button>
            <a href="#" className="text-sm font-medium hover:text-accent transition-colors">Collections</a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Deals
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Sellers
            </a>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search products, brands, and more..."
              className="pl-10 bg-white/50 border-white/20 focus:bg-white transition-all rounded-full h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="relative hidden sm:flex">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-accent text-[10px]">
                {wishlist.length}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-secondary text-[10px]">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <CartDrawer />
          </Sheet>

          <Button onClick={() => onNavigate('dashboard')} variant="ghost" size="icon" className={`hidden sm:flex ${currentView === 'dashboard' ? 'text-accent' : ''}`}>
            <User className="w-5 h-5" />
          </Button>

          <Button onClick={onOpenAI} className="hidden md:flex gap-2 rounded-full bg-primary hover:bg-primary/90">
            <Sparkles className="w-4 h-4" />
            AI Help
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
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
  );
}
