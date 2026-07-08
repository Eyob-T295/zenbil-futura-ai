import { useState } from 'react';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  CheckCircle2, ChevronRight, Truck, CreditCard, 
  ShoppingBag, ArrowLeft, ShieldCheck, Info, Sparkles,
  MapPin, Check, Wallet, Smartphone, Landmark
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 1, title: 'Shipping', icon: <Truck className="w-5 h-5" /> },
  { id: 2, title: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
  { id: 3, title: 'Review', icon: <CheckCircle2 className="w-5 h-5" /> },
];

export function CheckoutFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const { totalPrice, cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Addis Ababa',
    paymentMethod: 'telebirr',
    deliveryOption: 'standard'
  });

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone || !formData.address)) {
      toast.error('Please fill in all delivery details');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    toast.success('Order placed successfully!');
    clearCart();
    onComplete();
  };

  if (step === 4) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 md:p-12 text-center space-y-8"
      >
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-emerald-100 rounded-[40px] flex items-center justify-center mx-auto relative z-10">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-emerald-200 rounded-[40px]"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-black text-primary tracking-tight">Order Confirmed!</h2>
          <p className="text-muted-foreground font-medium">Your order <span className="text-primary font-bold">#ZN-99321</span> is being prepared.</p>
        </div>
        
        <div className="bg-slate-50 p-8 rounded-[32px] border border-border/50 text-left space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border/50 shadow-sm">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Delivery Estimate</p>
                <p className="font-bold text-primary">Today, by 7:30 PM</p>
              </div>
            </div>
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-full font-bold">Processing</Badge>
          </div>
          <Separator className="bg-border/30" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border/50 shadow-sm">
                <Wallet className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Payment Method</p>
                <p className="font-bold text-primary capitalize">{formData.paymentMethod}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total Paid</p>
              <p className="font-black text-primary">{totalPrice.toLocaleString()} ETB</p>
            </div>
          </div>
        </div>

        <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-xl font-black shadow-2xl shadow-primary/20 active:scale-95 transition-all" onClick={handleComplete}>
          Explore More Treasures
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Steps Indicator */}
      <div className="p-8 border-b border-border/50">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center transition-all duration-500 ${
                  step >= s.id ? 'bg-primary text-white scale-110 shadow-xl shadow-primary/20' : 'bg-slate-50 text-muted-foreground border border-border/50'
                }`}>
                  {step > s.id ? <Check className="w-6 h-6" /> : s.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  step >= s.id ? 'text-primary' : 'text-muted-foreground'
                }`}>{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-4 rounded-full -mt-6 transition-all duration-700 ${
                  step > s.id ? 'bg-primary' : 'bg-slate-100'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary tracking-tight">Delivery Details</h3>
                <p className="text-sm text-muted-foreground font-medium">Where should we send your treasures?</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary">Full Name</Label>
                  <div className="relative">
                    <Input 
                      placeholder="Abebe Bikila" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="rounded-2xl h-14 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all pl-12"
                    />
                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary">Phone Number</Label>
                  <div className="relative">
                    <Input 
                      placeholder="+251 911 22 33 44" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="rounded-2xl h-14 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all pl-12"
                    />
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary">Delivery Address</Label>
                  <div className="relative">
                    <Input 
                      placeholder="Bole, Around Friendship Building, House #123" 
                      value={formData.address} 
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="rounded-2xl h-14 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all pl-12"
                    />
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-primary">Delivery Option</Label>
                <div className="grid grid-cols-1 gap-4">
                   <div 
                    onClick={() => setFormData({...formData, deliveryOption: 'standard'})}
                    className={`flex items-center justify-between p-5 rounded-[28px] border-2 cursor-pointer transition-all duration-300 ${
                      formData.deliveryOption === 'standard' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border/50 hover:border-border'
                    }`}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          formData.deliveryOption === 'standard' ? 'bg-primary text-white' : 'bg-slate-100 text-primary'
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-primary">Standard Delivery</p>
                          <p className="text-xs text-muted-foreground">Same day in Addis Ababa</p>
                        </div>
                     </div>
                     <span className="font-bold text-emerald-600">FREE</span>
                   </div>

                   <div 
                    onClick={() => setFormData({...formData, deliveryOption: 'express'})}
                    className={`flex items-center justify-between p-5 rounded-[28px] border-2 cursor-pointer transition-all duration-300 ${
                      formData.deliveryOption === 'express' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border/50 hover:border-border'
                    }`}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          formData.deliveryOption === 'express' ? 'bg-primary text-white' : 'bg-slate-100 text-primary'
                        }`}>
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-primary">Zenbil Express</p>
                          <p className="text-xs text-muted-foreground">Under 2 hours delivery</p>
                        </div>
                     </div>
                     <span className="font-bold text-primary">950 ETB</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary tracking-tight">Payment Method</h3>
                <p className="text-sm text-muted-foreground font-medium">Select your preferred way to pay.</p>
              </div>

              <RadioGroup defaultValue="telebirr" onValueChange={v => setFormData({...formData, paymentMethod: v})}>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'telebirr', name: 'Telebirr', desc: 'Secure mobile payment', icon: <Smartphone className="w-5 h-5" />, color: 'bg-blue-600' },
                    { id: 'cbe', name: 'CBE Birr', desc: 'Commercial Bank of Ethiopia', icon: <Landmark className="w-5 h-5" />, color: 'bg-purple-700' },
                    { id: 'chapa', name: 'Debit/Credit Card', desc: 'Visa, Mastercard & Local Cards', icon: <CreditCard className="w-5 h-5" />, color: 'bg-emerald-600' },
                    { id: 'cash', name: 'Cash on Delivery', desc: 'Pay when items arrive', icon: <Wallet className="w-5 h-5" />, color: 'bg-primary' },
                  ].map((method) => (
                    <Label
                      key={method.id}
                      htmlFor={method.id}
                      className={`flex items-center justify-between p-5 rounded-[28px] border-2 cursor-pointer transition-all duration-300 ${
                        formData.paymentMethod === method.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border/50 bg-white hover:border-border'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${method.color}`}>
                          {method.icon}
                        </div>
                        <div>
                          <span className="font-bold text-primary block text-base">{method.name}</span>
                          <span className="text-xs text-muted-foreground">{method.desc}</span>
                        </div>
                      </div>
                      {formData.paymentMethod === method.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <div className="bg-slate-50 p-6 rounded-[32px] border border-border/50 space-y-4">
                <div className="flex items-center gap-3 text-primary font-bold">
                   <ShieldCheck className="w-5 h-5 text-emerald-600" />
                   Secure Checkout
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your transaction is processed securely through encrypted channels. Zenbil Next never stores your full card details.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary tracking-tight">Review Order</h3>
                <p className="text-sm text-muted-foreground font-medium">Almost there. Please review your details.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-[32px] bg-slate-50 border border-border/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Shipping To</p>
                      <button onClick={() => setStep(1)} className="text-[10px] font-bold text-accent uppercase hover:underline">Edit</button>
                    </div>
                    <p className="font-bold text-primary">{formData.name}</p>
                    <p className="text-sm text-muted-foreground">{formData.address}</p>
                    <p className="text-sm text-muted-foreground">{formData.phone}</p>
                  </div>
                  <div className="p-6 rounded-[32px] bg-slate-50 border border-border/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Payment Method</p>
                      <button onClick={() => setStep(2)} className="text-[10px] font-bold text-accent uppercase hover:underline">Edit</button>
                    </div>
                    <p className="font-bold text-primary capitalize">{formData.paymentMethod}</p>
                    <p className="text-sm text-muted-foreground">Standard Processing</p>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[32px] border border-border/50 overflow-hidden shadow-sm">
                   <div className="p-6 bg-slate-50/50 border-b border-border/50">
                     <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Order Summary</p>
                   </div>
                   <div className="p-6 space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-border/30 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary line-clamp-1">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="text-sm font-black text-primary">{(item.price * item.quantity).toLocaleString()} ETB</span>
                        </div>
                      ))}
                      <Separator className="bg-border/30 my-4" />
                      <div className="space-y-2">
                         <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Subtotal</span>
                           <span className="font-bold text-primary">{totalPrice.toLocaleString()} ETB</span>
                         </div>
                         <div className="flex justify-between text-sm">
                           <span className="text-muted-foreground">Delivery ({formData.deliveryOption})</span>
                           <span className={formData.deliveryOption === 'standard' ? 'text-emerald-600 font-bold' : 'font-bold text-primary'}>
                             {formData.deliveryOption === 'standard' ? 'FREE' : '950 ETB'}
                           </span>
                         </div>
                         <div className="flex justify-between text-xl font-black text-primary pt-2">
                           <span>Total Payment</span>
                           <span className="text-accent">{ (totalPrice + (formData.deliveryOption === 'express' ? 950 : 0)).toLocaleString() } ETB</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 bg-slate-50 border-t border-border/50 flex gap-4">
        {step > 1 && (
          <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 font-bold gap-2 active:scale-95 transition-all" onClick={prevStep}>
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
        )}
        <Button 
          className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-black gap-2 shadow-2xl shadow-primary/20 active:scale-95 transition-all" 
          onClick={step === 3 ? () => setStep(4) : nextStep}
        >
          {step === 3 ? 'Place Order' : 'Continue'}
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
