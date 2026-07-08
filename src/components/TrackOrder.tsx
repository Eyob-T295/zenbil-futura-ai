import { useState } from 'react';
import { Search, Package, MapPin, Calendar, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

export function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = () => {
    if (!orderId) return;
    // Simulated tracking data
    setTrackingData({
      id: orderId,
      status: 'In Transit',
      customer: 'Abebe Bikila',
      date: 'Dec 12, 2024',
      location: 'Bole, Addis Ababa',
      steps: [
        { label: 'Order Placed', time: '09:00 AM', completed: true },
        { label: 'Packed & Ready', time: '10:30 AM', completed: true },
        { label: 'Out for Delivery', time: '12:45 PM', completed: true },
        { label: 'Arriving Soon', time: 'Estimated 2:00 PM', completed: false }
      ]
    });
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-border/50 shadow-xl max-w-2xl mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 ethiopian-pattern opacity-5 -mr-16 -mt-16 bg-accent rounded-full"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-3">
          <Package className="w-6 h-6 text-accent" />
          Track Your Zenbil
        </h3>
        <p className="text-muted-foreground mb-8">Enter your order ID to see real-time delivery status.</p>

        <div className="flex gap-2 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Order ID (e.g. ZN-88241)" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-primary/20"
            />
          </div>
          <Button onClick={handleTrack} className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20">
            Track
          </Button>
        </div>

        {trackingData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-2xl border border-border/50">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                <Badge className="bg-secondary text-white px-3 py-1 rounded-full">{trackingData.status}</Badge>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Order Date</p>
                <p className="font-bold text-primary">{trackingData.date}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Delivery to</p>
                <div className="flex items-center gap-1 font-bold text-primary">
                  <MapPin className="w-4 h-4 text-accent" />
                  {trackingData.location}
                </div>
              </div>
            </div>

            <div className="space-y-6 px-4">
              {trackingData.steps.map((step: any, i: number) => (
                <div key={i} className="flex gap-6 relative">
                  {i < trackingData.steps.length - 1 && (
                    <div className={`absolute left-[11px] top-6 w-[2px] h-10 ${step.completed ? 'bg-secondary' : 'bg-muted'}`}></div>
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center relative z-10 ${
                    step.completed ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-bold ${step.completed ? 'text-primary' : 'text-muted-foreground'}`}>{step.label}</h4>
                      <span className="text-xs font-medium text-muted-foreground">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-2 hover:border-primary hover:text-primary transition-all">
                Need help with this order?
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
