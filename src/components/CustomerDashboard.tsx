import { useState } from 'react';
import { 
  Package, Heart, User, MapPin, CreditCard, 
  Bell, Tag, History, Star, ShieldCheck, 
  ChevronRight, LogOut, Settings, LayoutDashboard, ArrowRight, Plus,
  Clock, CheckCircle2, ShoppingBag, Sparkles
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { products } from '../data/products';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'overview', title: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'orders', title: 'My Orders', icon: <Package className="w-5 h-5" /> },
  { id: 'wishlist', title: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
  { id: 'ai-history', title: 'AI Shopping History', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'addresses', title: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
  { id: 'payments', title: 'Payment Methods', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'rewards', title: 'Zenbil Rewards', icon: <Star className="w-5 h-5" /> },
  { id: 'notifications', title: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  { id: 'coupons', title: 'Coupons', icon: <Tag className="w-5 h-5" /> },
];

export function CustomerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const stats = [
    { label: 'Total Orders', value: '12', icon: <Package className="w-4 h-4" /> },
    { label: 'Saved Items', value: '24', icon: <Heart className="w-4 h-4" /> },
    { label: 'Reward Points', value: '1,250', icon: <Star className="w-4 h-4 text-accent" /> },
    { label: 'Active Coupons', value: '3', icon: <Tag className="w-4 h-4" /> },
  ];

  const recentOrders = [
    { id: 'ZN-88241', date: 'Oct 24, 2023', status: 'Delivered', total: '125,000 ETB', items: 1 },
    { id: 'ZN-87910', date: 'Oct 12, 2023', status: 'In Transit', total: '45,000 ETB', items: 2 },
    { id: 'ZN-86502', date: 'Sep 28, 2023', status: 'Delivered', total: '8,500 ETB', items: 1 },
  ];

  const aiHistory = [
    { query: "Looking for a luxury Habesha dress for a wedding", date: "2 days ago", recommendations: 4 },
    { query: "High-end laptops with 4K displays", date: "1 week ago", recommendations: 3 },
    { query: "Modern home decor with traditional influence", date: "Oct 5, 2023", recommendations: 5 },
  ];

  return (
    <div className="pt-32 pb-24 bg-background ethiopian-pattern min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[40px] p-8 border border-border/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 ethiopian-pattern opacity-5 -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-[24px] bg-slate-100 border-2 border-white shadow-md overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-primary tracking-tight">Abenezer K.</h2>
                    <Badge variant="secondary" className="bg-accent/10 text-primary border-accent/20 text-[10px] font-bold uppercase tracking-widest">
                      Premium Member
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-xs font-bold text-primary mb-1">
                    <span>Zenbil Points</span>
                    <span>1,250 / 2,000</span>
                  </div>
                  <Progress value={62.5} className="h-2 bg-slate-100" />
                  <p className="text-[10px] text-muted-foreground font-medium pt-1 italic">750 more points for Platinum Status</p>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-4 border border-border/50 shadow-sm overflow-hidden">
                <nav className="space-y-1">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl transition-all group ${
                        activeSection === section.id 
                          ? 'bg-primary text-white shadow-xl shadow-primary/20' 
                          : 'hover:bg-slate-50 text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`transition-colors ${activeSection === section.id ? 'text-accent' : 'text-muted-foreground group-hover:text-primary'}`}>
                          {section.icon}
                        </span>
                        <span className="font-bold text-sm tracking-tight">{section.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                  <hr className="my-4 border-border/50 mx-4" />
                  <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-10">
            {activeSection === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                {/* Greeting */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                   <div className="space-y-4">
                     <h1 className="text-5xl font-black text-primary tracking-tight">Salam, <span className="text-accent italic">Abenezer</span>!</h1>
                     <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-xl">
                       Welcome back to your premium dashboard. Here's a quick look at your recent activity and rewards.
                     </p>
                   </div>
                   <Button className="rounded-full bg-white text-primary border-border hover:bg-slate-50 shadow-sm h-12 px-8 font-bold flex items-center gap-2">
                     <Settings className="w-4 h-4" />
                     Account Settings
                   </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <Card key={i} className="rounded-[32px] border-border/50 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                      <CardContent className="p-8 relative">
                        <div className="absolute top-0 right-0 w-16 h-16 ethiopian-pattern opacity-5 group-hover:opacity-10 transition-opacity" />
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          {stat.icon}
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-primary tracking-tight">{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Recent Orders */}
                  <Card className="rounded-[40px] border-border/50 shadow-sm overflow-hidden flex flex-col">
                    <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between bg-slate-50/50">
                      <CardTitle className="text-xl font-black text-primary tracking-tight flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border/50">
                           <Clock className="w-5 h-5 text-primary" />
                         </div>
                         Recent Orders
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="font-bold text-accent hover:text-accent/80 p-0" onClick={() => setActiveSection('orders')}>View All</Button>
                    </CardHeader>
                    <CardContent className="p-0">
                       <div className="divide-y divide-border/30">
                          {recentOrders.map(order => (
                            <div key={order.id} className="p-8 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                               <div className="flex justify-between items-start mb-4">
                                  <div>
                                     <p className="font-black text-primary tracking-tight">{order.id}</p>
                                     <p className="text-xs text-muted-foreground font-medium">{order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}</p>
                                  </div>
                                  <Badge className={`rounded-full px-3 py-1 font-bold text-[10px] ${
                                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                  }`}>
                                    {order.status}
                                  </Badge>
                               </div>
                               <div className="flex items-center justify-between">
                                  <span className="font-black text-primary">{order.total}</span>
                                  <button className="text-xs font-bold text-primary group-hover:text-accent transition-all flex items-center gap-1">
                                    Track Order <ChevronRight className="w-3 h-3" />
                                  </button>
                               </div>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                  </Card>

                  {/* AI Shopping History */}
                  <Card className="rounded-[40px] border-border/50 shadow-sm overflow-hidden flex flex-col">
                    <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between bg-slate-50/50">
                      <CardTitle className="text-xl font-black text-primary tracking-tight flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-border/50">
                           <Sparkles className="w-5 h-5 text-accent" />
                         </div>
                         AI Assistant History
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="font-bold text-accent hover:text-accent/80 p-0" onClick={() => setActiveSection('ai-history')}>View History</Button>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                       {aiHistory.slice(0, 2).map((item, i) => (
                         <div key={i} className="p-6 rounded-[28px] bg-slate-50 border border-border/30 space-y-4 hover:bg-white hover:shadow-lg transition-all duration-500 group">
                            <div className="flex justify-between items-start">
                               <p className="text-sm font-black text-primary tracking-tight leading-relaxed italic line-clamp-2">
                                 "{item.query}"
                               </p>
                               <span className="text-[10px] text-muted-foreground font-bold whitespace-nowrap">{item.date}</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <Badge className="bg-primary/5 text-primary border-primary/10 rounded-full text-[10px] font-bold">
                                 {item.recommendations} AI Picks
                               </Badge>
                               <button className="w-8 h-8 rounded-full bg-white border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                 <ArrowRight className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                       ))}
                       <div className="pt-4 border-t border-dashed border-border/50">
                          <p className="text-xs text-muted-foreground font-medium mb-4">You have <span className="text-primary font-bold">128 reward points</span> available from your AI-assisted purchases.</p>
                          <Button className="w-full rounded-2xl bg-slate-100 hover:bg-slate-200 text-primary font-bold border-transparent">
                            Claim 10% Coupon
                          </Button>
                       </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommended for You */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-black text-primary tracking-tight">Recommended for You</h3>
                     <Badge variant="outline" className="rounded-full bg-accent/5 border-accent/20 text-accent font-bold">Based on AI Assistant</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.slice(8, 11).map((product, i) => (
                      <div key={i} className="group bg-white rounded-[32px] border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                        <div className="aspect-[4/3] relative overflow-hidden">
                           <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 backdrop-blur text-primary border-none text-[10px] font-black">AI PICK</Badge>
                           </div>
                        </div>
                        <div className="p-6">
                           <h4 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">{product.name}</h4>
                           <div className="flex items-center justify-between mt-2">
                              <span className="font-black text-primary">{product.price.toLocaleString()} ETB</span>
                              <Button size="icon" variant="ghost" className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white transition-all">
                                 <Plus className="w-4 h-4" />
                              </Button>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection !== 'overview' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="py-24 text-center space-y-6 bg-white/50 backdrop-blur rounded-[40px] border border-border/50 shadow-inner"
              >
                <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto border border-border/50">
                   {SECTIONS.find(s => s.id === activeSection)?.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-primary tracking-tight capitalize">{activeSection.replace('-', ' ')}</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">This section is being populated with your premium data. Check back soon for your personalized {activeSection.replace('-', ' ')}.</p>
                </div>
                <Button variant="outline" className="rounded-full px-10 h-12 border-2" onClick={() => setActiveSection('overview')}>
                   Back to Overview
                </Button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
