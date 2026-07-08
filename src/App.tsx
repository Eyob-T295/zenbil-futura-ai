import { CartProvider } from './hooks/use-cart';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { FeaturedCategories } from './components/FeaturedCategories';
import { AISearch } from './components/AISearch';
import { ShoppingMissions } from './components/ShoppingMissions';
import { FlashDeals } from './components/FlashDeals';
import { FeaturedSellers } from './components/FeaturedSellers';
import { CustomerReviews } from './components/CustomerReviews';
import { ProductDetail } from './components/ProductDetail';
import { Product } from './data/products';
import { Footer } from './components/Footer';
import { TrackOrder } from './components/TrackOrder';
import { ZenbilAIAssistant } from './components/ZenbilAIAssistant';
import { CategoryPage } from './components/CategoryPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { Toaster } from './components/ui/sonner';
import { Badge } from './components/ui/badge';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Zap, X, MessageCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { useState } from 'react';

type View = 'home' | 'shop' | 'dashboard';

function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAIOpen, setIsAIOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {showAnnouncement && (
          <div className="bg-primary text-white py-2.5 px-4 relative overflow-hidden">
            <div className="absolute inset-0 ethiopian-pattern opacity-10 animate-pulse"></div>
            <div className="container mx-auto flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <Badge className="bg-accent text-primary text-[10px] font-bold">NEW</Badge>
                <p className="text-xs md:text-sm font-medium tracking-wide">
                  Experience the future of shopping with our new <span className="text-accent font-bold">Zenbil AI Assistant</span>.
                </p>
              </div>
              <button onClick={() => setShowAnnouncement(false)} className="hover:text-accent transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        <Navbar 
          onNavigate={navigateTo} 
          onOpenAI={() => setIsAIOpen(true)} 
          currentView={currentView} 
        />

        {selectedProduct ? (
          <div className="pt-20">
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)} 
            />
            <Footer />
          </div>
        ) : currentView === 'shop' ? (
          <div className="pt-20">
            <CategoryPage onProductClick={handleProductClick} />
            <Footer />
          </div>
        ) : currentView === 'dashboard' ? (
          <div className="pt-20">
            <CustomerDashboard />
            <Footer />
          </div>
        ) : (
          <main>
            <Hero />
            
            <section className="py-16 bg-white border-b border-border/50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center gap-4 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                      <Truck className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Fast Delivery</h4>
                      <p className="text-sm text-muted-foreground">Same day in Addis Ababa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Secure Payment</h4>
                      <p className="text-sm text-muted-foreground">Chapa & Telebirr verified</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">Zenbil AI</h4>
                      <p className="text-sm text-muted-foreground">Smart shopping help</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <FeaturedCategories onViewAll={() => navigateTo('shop')} />
            
            <AISearch />

            <ShoppingMissions />

            <section className="py-24 bg-slate-50/50">
              <div className="container mx-auto px-4 text-center mb-16">
                <Badge className="bg-primary/5 text-primary border-primary/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
                  For You
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                  Handpicked <span className="text-accent italic">Treasures</span>
                </h2>
              </div>
              <ProductGrid onProductClick={handleProductClick} />
              <div className="mt-16 text-center">
                <Button 
                  onClick={() => navigateTo('shop')}
                  variant="outline" 
                  className="rounded-full px-8 py-6 border-2 hover:bg-primary hover:text-white transition-all gap-2 group"
                >
                  View All Marketplace
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </section>

            <FlashDeals />

            <FeaturedSellers />

            <CustomerReviews />

            <TrackOrder />

            <Footer />
          </main>
        )}

        <ZenbilAIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
        
        {!isAIOpen && (
          <button 
            onClick={() => setIsAIOpen(true)}
            className="fixed bottom-8 right-8 z-40 bg-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
          >
            <div className="absolute -top-12 right-0 bg-white text-primary px-4 py-2 rounded-2xl shadow-xl text-xs font-bold border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Need help? Ask Zenbil AI 👋
            </div>
            <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </button>
        )}

        <Toaster position="top-center" richColors />
      </div>
    </CartProvider>
  );
}

export default App;
