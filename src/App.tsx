import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlashDeals } from './components/FlashDeals';
import { ProductGrid } from './components/ProductGrid';
import { FeaturedCategories } from './components/FeaturedCategories';
import { AISearch } from './components/AISearch';
import { ShoppingMissions } from './components/ShoppingMissions';
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
import { Button } from './components/ui/button';
import { ArrowRight, Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { CartProvider } from './hooks/use-cart';

type View = 'home' | 'shop' | 'account' | 'detail';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zenbil_announcement_closed') !== 'true';
    }
    return true;
  });

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem('zenbil_announcement_closed', 'true');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Toaster position="top-center" richColors />
        
        <Navbar
          showAnnouncement={showAnnouncement}
          onCloseAnnouncement={handleCloseAnnouncement}
          onOpenAI={() => setIsAIOpen(true)}
          currentView={currentView === 'detail' ? 'shop' : currentView}
          onNavigate={(view: any) => navigateTo(view)}
        />

        <main className="pt-20">
          {currentView === 'detail' && selectedProduct ? (
            <ProductDetail 
              product={selectedProduct} 
              onBack={() => navigateTo('shop')} 
            />
          ) : currentView === 'shop' ? (
            <CategoryPage onProductClick={handleProductClick} />
          ) : currentView === 'account' ? (
            <CustomerDashboard />
          ) : (
            <>
              <Hero />
              
              <section className="py-12 bg-white">
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
                <div className="container mx-auto px-4">
                  <ProductGrid onProductClick={handleProductClick} />
                  <div className="flex justify-center mt-16">
                    <Button 
                      onClick={() => navigateTo('shop')}
                      variant="outline" 
                      size="lg" 
                      className="rounded-full border-primary/20 font-bold px-10 h-14 group"
                    >
                      View All Marketplace
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </section>

              <FlashDeals />

              <FeaturedSellers />

              <CustomerReviews />

              <TrackOrder />

              <Footer />
            </>
          )}
        </main>

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
      </div>
    </CartProvider>
  );
}
