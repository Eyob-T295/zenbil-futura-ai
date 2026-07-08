import { useState, useMemo } from 'react';
import { 
  ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, 
  ArrowLeft, Tag, Truck, ShieldCheck, Sparkles, 
  ChevronRight, Percent, Info, CreditCard
} from 'lucide-react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from './ui/sheet';
import { CheckoutFlow } from './CheckoutFlow';
import { products } from '../data/products';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, addToCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Apple-like suggested products (filtered to not include what's in cart)
  const suggestedProducts = useMemo(() => {
    return products
      .filter(p => !cart.find(c => c.id === p.id) && p.isFeatured)
      .slice(0, 3);
  }, [cart]);

  const deliveryProgress = Math.min((totalPrice / 5000) * 100, 100);
  const isFreeDelivery = totalPrice >= 5000;

  return (
    <SheetContent className="w-full sm:max-w-2xl flex flex-col p-0 overflow-hidden border-l border-border/50">
      <SheetHeader className="p-6 md:p-8 border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between">
          {isCheckingOut ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCheckingOut(false)}
                className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary hover:bg-slate-200 transition-all active:scale-95"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <SheetTitle className="text-2xl font-black text-primary tracking-tight">Checkout</SheetTitle>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Final Step</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <ShoppingBag className="w-6 h-6 text-accent" />
              </div>
              <div>
                <SheetTitle className="text-2xl font-black text-primary tracking-tight">Your Zenbil</SheetTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-full text-[10px] font-bold">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Premium Selection</span>
                </div>
              </div>
            </div>
          )}
          <SheetClose className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="w-6 h-6" />
          </SheetClose>
        </div>

        {!isCheckingOut && cart.length > 0 && (
          <div className="mt-8 space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Truck className="w-4 h-4 text-accent" />
                {isFreeDelivery ? 'Free Delivery Unlocked!' : `Add ${(5000 - totalPrice).toLocaleString()} ETB for Free Delivery`}
              </div>
              <span className="text-xs font-bold text-accent">{Math.round(deliveryProgress)}%</span>
            </div>
            <Progress value={deliveryProgress} className="h-2 bg-slate-100" />
          </div>
        )}
      </SheetHeader>

      <div className="flex-1 overflow-hidden relative">
        {isCheckingOut ? (
          <CheckoutFlow onComplete={() => setIsCheckingOut(false)} />
        ) : cart.length > 0 ? (
          <ScrollArea className="h-full">
            <div className="p-6 md:p-8 space-y-10 pb-32">
              {/* Cart Items */}
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="group flex gap-6 p-4 rounded-[32px] bg-white border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                    >
                      <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-[24px] overflow-hidden bg-slate-50 border border-border/30 shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg md:text-xl text-primary group-hover:text-accent transition-colors line-clamp-1">{item.name}</h4>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mt-1">{item.category}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                             <Badge variant="outline" className="rounded-full text-[10px] font-bold border-emerald-100 text-emerald-600 bg-emerald-50/50">In Stock</Badge>
                             <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                               <ShieldCheck className="w-3 h-3" /> 1 Year Warranty
                             </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1 bg-slate-100 rounded-2xl p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-black text-primary">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm active:scale-90"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-lg md:text-xl text-primary block">
                              {(item.price * item.quantity).toLocaleString()} ETB
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-muted-foreground font-bold">
                                {item.price.toLocaleString()} ETB each
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Coupon Section */}
              <div className="bg-slate-50 rounded-[32px] p-6 border border-border/50 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                    <Tag className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-primary">Coupon Code</h5>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter code (e.g. ZENBIL20)" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-2xl h-12 bg-white border-border/50 focus:ring-primary/10"
                  />
                  <Button 
                    onClick={() => setIsCouponApplied(true)}
                    disabled={!couponCode || isCouponApplied}
                    className="rounded-2xl px-6 bg-primary text-white font-bold h-12"
                  >
                    {isCouponApplied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
                {isCouponApplied && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-emerald-600 font-bold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Success! You saved 10% on this order.
                  </motion.p>
                )}
              </div>

              {/* Suggested Products */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-primary tracking-tight">Complete the Look</h5>
                  <Badge variant="outline" className="rounded-full text-[10px] font-bold">Smart Recommendations</Badge>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {suggestedProducts.map(product => (
                    <div 
                      key={product.id} 
                      className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50/50 border border-border/30 hover:bg-white hover:shadow-lg transition-all duration-500 group cursor-pointer"
                      onClick={() => addToCart(product)}
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-border/50">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <h6 className="text-sm font-bold text-primary line-clamp-1">{product.name}</h6>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{product.category}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-sm font-black text-primary">{product.price.toLocaleString()} ETB</span>
                        <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-primary hover:text-white transition-all">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-emerald-50/30 border border-emerald-100 flex flex-col gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">Secure Payment</span>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">Your data is protected with military-grade encryption.</p>
                </div>
                <div className="p-4 rounded-3xl bg-blue-50/30 border border-blue-100 flex flex-col gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest leading-tight">Delivery Estimate</span>
                  <p className="text-[9px] text-muted-foreground leading-relaxed">Addis Ababa: Same Day<br/>Regional: 2-3 Days</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-border/50">
                <ShoppingBag className="w-14 h-14 opacity-20" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-primary tracking-tight">Your Zenbil is waiting.</h3>
              <p className="text-muted-foreground max-w-[240px] mx-auto text-sm leading-relaxed">Explore our curated collections of premium Ethiopian treasures and add them to your cart.</p>
            </div>
            <SheetClose asChild>
              <Button className="rounded-full px-10 h-14 bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all">Start Exploring</Button>
            </SheetClose>
          </div>
        )}
      </div>

      {cart.length > 0 && !isCheckingOut && (
        <div className="p-6 md:p-10 bg-white/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] sticky bottom-0 z-20">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="font-black text-primary">{totalPrice.toLocaleString()} ETB</span>
            </div>
            {isCouponApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Discount (10%)
                </span>
                <span className="text-emerald-600 font-black">-{ (totalPrice * 0.1).toLocaleString() } ETB</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Delivery Estimate</span>
              <span className={isFreeDelivery ? 'text-emerald-600 font-black' : 'font-black text-primary'}>
                {isFreeDelivery ? 'FREE' : '450 ETB'}
              </span>
            </div>
            <Separator className="bg-border/30" />
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Total Payment</span>
                <span className="text-3xl font-black text-primary tracking-tight">
                  {(isCouponApplied ? totalPrice * 0.9 : totalPrice).toLocaleString()} <span className="text-sm font-bold">ETB</span>
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <div className="flex -space-x-2">
                   <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-50 p-1 flex items-center justify-center">
                     <CreditCard className="w-4 h-4 text-primary" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-50 p-1 flex items-center justify-center">
                     <div className="w-4 h-4 bg-emerald-500 rounded-full" />
                   </div>
                   <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-slate-50 flex items-center justify-center text-[8px] font-bold">
                     +3
                   </div>
                 </div>
                 <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Multi-Payment Support</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <SheetClose asChild>
              <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-black text-primary transition-all active:scale-95">
                Continue Shopping
              </Button>
            </SheetClose>
            <Button 
              onClick={() => setIsCheckingOut(true)} 
              className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white text-lg font-black gap-2 shadow-2xl shadow-primary/20 active:scale-95 transition-all group"
            >
              Checkout Now
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  );
}
