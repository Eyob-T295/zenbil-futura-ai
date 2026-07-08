import { useState, useRef } from 'react';
import { 
  Star, Heart, Share2, ShoppingCart, 
  Truck, Clock, ChevronRight, Sparkles, 
  Package, ArrowLeft, 
  Maximize2, Rotate3d, CheckCircle2
} from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImage, setActiveImage] = useState(product.image);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const wishlisted = isInWishlist(product.id);

  const gallery = product.gallery || [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white min-h-screen pb-24 lg:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            Back to Marketplace
          </button>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <span className="hover:text-primary cursor-pointer">Marketplace</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary cursor-pointer">{product.category}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {/* Thumbnails */}
              <div className="md:col-span-1 order-2 md:order-1 flex md:flex-col gap-4">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-primary shadow-lg' : 'border-transparent hover:border-primary/20'
                    }`}
                  >
                    <img src={img} alt={`Detail ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                <button className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:bg-slate-100 transition-all">
                  <Rotate3d className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">360&deg;</span>
                </button>
              </div>

              {/* Main Image */}
              <div className="md:col-span-5 order-1 md:order-2">
                <div 
                  ref={imageRef}
                  className="relative aspect-square rounded-[40px] overflow-hidden bg-slate-50 cursor-crosshair border border-border/50"
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                >
                  <img 
                    src={activeImage} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-transform duration-200 ${isZooming ? 'scale-150' : 'scale-100'}`}
                    style={isZooming ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                    } : undefined}
                  />
                  
                  {/* Floating Overlays */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {product.isFeatured && (
                      <Badge className="bg-accent text-primary border-none px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
                        AI RECOMMENDED
                      </Badge>
                    )}
                  </div>
                  
                  <button className="absolute bottom-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
                    <Maximize2 className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Summary Block */}
            <div className="p-8 rounded-[40px] bg-primary text-white relative overflow-hidden">
              <div className="absolute inset-0 ethiopian-pattern-dark opacity-10"></div>
              <div className="relative z-10 flex gap-6 items-start">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Why this matches your needs</h3>
                  <p className="text-white/70 leading-relaxed text-lg italic">
                    "Based on your recent interest in high-performance creative tools and your preference for premium build quality, this is the ideal match. It offers exceptional processing power, perfectly suited for modern professional workflows."
                  </p>
                  <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 font-bold px-6">
                    Run AI Comparison
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-accent uppercase tracking-[0.2em]">{product.category}</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  IN STOCK
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-primary leading-tight tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                  ))}
                  <span className="ml-2 font-bold text-primary">{product.rating}</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {product.reviews} Customer Reviews
                </button>
                <div className="w-px h-4 bg-border"></div>
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  12 Q&As
                </button>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="p-8 rounded-[40px] bg-slate-50 border border-border/50 space-y-6">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-black text-primary">{product.price.toLocaleString()} ETB</span>
                <span className="text-xl text-muted-foreground line-through mb-1.5">{(product.price * 1.15).toLocaleString()} ETB</span>
                <Badge className="bg-red-500 text-white mb-1.5">SAVE 15%</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border/30">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Delivery</p>
                    <p className="text-sm font-bold text-primary">Today by 6 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border/30">
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Warranty</p>
                    <p className="text-sm font-bold text-primary">2 Years Local</p>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              {product.seller && (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    <img src={product.seller.image} alt={product.seller.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-primary">{product.seller.name}</p>
                        {product.seller.verified && <CheckCircle2 className="w-3.5 h-3.5 text-accent" />}
                      </div>
                      <p className="text-xs text-muted-foreground">Certified Premium Seller</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full font-bold">Visit Store</Button>
                </div>
              )}

              <Separator />

              <div className="flex gap-4">
                <Button 
                  className="flex-1 h-16 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 gap-3"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className={`w-16 h-16 rounded-2xl border-border/50 transition-all ${wishlisted ? 'bg-red-50 text-red-500 border-red-100' : 'hover:bg-slate-50'}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart className={`w-6 h-6 ${wishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-16 h-16 rounded-2xl border-border/50 hover:bg-slate-50"
                  onClick={handleShare}
                >
                  <Share2 className="w-6 h-6" />
                </Button>
              </div>

              <Button className="w-full h-16 rounded-2xl bg-accent text-primary hover:bg-accent/90 text-lg font-black shadow-xl shadow-accent/20">
                Buy Now
              </Button>
            </div>

            {/* Summary Tabs */}
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full bg-slate-50 p-1 rounded-2xl h-14">
                <TabsTrigger value="specs" className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Specifications</TabsTrigger>
                <TabsTrigger value="description" className="flex-1 rounded-xl font-bold h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Description</TabsTrigger>
              </TabsList>
              <TabsContent value="specs" className="p-6 space-y-4">
                {product.specs && Object.entries(product.specs).map(([key, value], i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-none">
                    <span className="text-muted-foreground font-medium">{key}</span>
                    <span className="text-primary font-bold">{value}</span>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="description" className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Frequently Bought Together */}
        <section className="py-24 border-t border-border/50 mt-24">
          <h2 className="text-3xl font-bold text-primary mb-12 flex items-center gap-3">
            <Package className="w-8 h-8 text-accent" />
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {/* Simulating 4 accessories */}
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="group p-6 bg-slate-50 rounded-[32px] border border-transparent hover:border-primary/10 transition-all hover:bg-white hover:shadow-xl">
                 <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-white border border-border/20">
                   <img src={`https://images.unsplash.com/photo-${1540000000000 + i}?auto=format&fit=crop&q=80&w=400`} alt="Accessory" className="w-full h-full object-cover" />
                 </div>
                 <h4 className="font-bold text-primary mb-2">Pro {i === 1 ? 'Mouse' : i === 2 ? 'Headset' : i === 3 ? 'Backpack' : 'Docking Station'}</h4>
                 <div className="flex items-center justify-between">
                   <span className="font-black text-primary">{(2500 * i).toLocaleString()} ETB</span>
                   <Button size="icon" variant="ghost" className="rounded-full bg-white shadow-sm hover:bg-primary hover:text-white">
                     <ShoppingCart className="w-4 h-4" />
                   </Button>
                 </div>
               </div>
             ))}
          </div>
        </section>

        {/* Q&A Section */}
        <section className="py-24 border-t border-border/50">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent" />
              Customer Questions
            </h2>
            <Button variant="outline" className="rounded-full font-bold">Ask a Question</Button>
          </div>
          <div className="space-y-8 max-w-4xl">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-1">Q</div>
                  <p className="font-bold text-lg text-primary">{i === 1 ? "Does this support external monitors?" : "How long does the battery last?"}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">A</div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground leading-relaxed">
                      {i === 1 
                        ? "Yes, it supports multiple high-resolution external displays via its modern port array." 
                        : "Battery life is excellent, typically providing a full day of mixed-use productivity."}
                    </p>
                    <p className="text-xs text-muted-foreground font-bold">Answered by {product.seller?.name || "Zenbil Official"} • 2 days ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Purchase Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border/50 p-4 lg:hidden z-40 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-14 w-14 rounded-xl shrink-0"
          onClick={() => toggleWishlist(product)}
        >
          <Heart className={`w-6 h-6 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <Button 
          className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90 font-bold text-base"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
        <Button className="flex-1 h-14 rounded-xl bg-accent text-primary hover:bg-accent/90 font-black text-base">
          Buy Now
        </Button>
      </div>
    </div>
  );
}
