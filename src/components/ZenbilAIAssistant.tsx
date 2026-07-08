import { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, X, Send, Bot, User, ChevronRight, 
  ShoppingBag, Lightbulb, History, Search, 
  ArrowRight, Trash2, MessageSquare, Plus, 
  ThumbsUp, ThumbsDown, Share2, Bookmark
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { products, Product } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/use-cart';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
  products?: Product[];
  timestamp: Date;
}

export function ZenbilAIAssistant({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<{ id: string; title: string; date: string }[]>([
    { id: '1', title: "Gift for Mother's Day", date: '2 hours ago' },
    { id: '2', title: 'Modern coffee setups', date: 'Yesterday' },
    { id: '3', title: 'Tech for designers', date: '3 days ago' },
  ]);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '0',
      role: 'bot', 
      content: 'Salam! I am Zenbil AI, your personal shopping assistant. I can help you find products, compare options, or suggest gifts. What are you looking for today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulated AI Logic
    setTimeout(() => {
      const query = userMessage.content.toLowerCase();
      let botContent = "I've searched our marketplace. Based on your request, here are some premium recommendations that fit your style:";
      let recommendedProducts: Product[] = [];

      if (query.includes('coffee') || query.includes('food')) {
        recommendedProducts = products.filter(p => p.category === 'Food' && p.inStock);
      } else if (query.includes('tech') || query.includes('laptop') || query.includes('electronics')) {
        recommendedProducts = products.filter(p => p.category === 'Electronics' && p.inStock);
      } else if (query.includes('dress') || query.includes('fashion') || query.includes('clothing')) {
        recommendedProducts = products.filter(p => p.category === 'Fashion' && p.inStock);
      } else if (query.includes('home') || query.includes('decor')) {
        recommendedProducts = products.filter(p => p.category === 'Home' && p.inStock);
      } else {
        recommendedProducts = products.filter(p => p.isFeatured && p.inStock).slice(0, 3);
        botContent = "I've found some featured products that I think you'll love! Would you like to see more from a specific category?";
      }

      const botMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        role: 'bot',
        content: botContent,
        products: recommendedProducts,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    { text: 'Premium Ethiopian coffee', icon: <Search className="w-3 h-3" /> },
    { text: 'Tech for professionals', icon: <ShoppingBag className="w-3 h-3" /> },
    { text: 'Modern traditional fashion', icon: <Sparkles className="w-3 h-3" /> },
    { text: 'Handcrafted home decor', icon: <Lightbulb className="w-3 h-3" /> },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-[40px] shadow-2xl border border-white/20 flex overflow-hidden glass">
          {/* Sidebar - Apple-like Minimalist History */}
          <div className="hidden md:flex w-72 border-r border-border/50 flex-col bg-slate-50/50">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-primary">Zenbil AI</h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Smart Assistant</p>
                </div>
              </div>

              <Button className="w-full justify-start gap-2 rounded-2xl h-12 bg-white text-primary border-border/50 hover:bg-slate-100 shadow-sm transition-all mb-8">
                <Plus className="w-4 h-4" />
                New Conversation
              </Button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <History className="w-3 h-3" />
                    Recent Searches
                  </h3>
                  <div className="space-y-1">
                    {history.map(item => (
                      <button 
                        key={item.id}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm hover:bg-white hover:shadow-sm transition-all text-primary/70 hover:text-primary group flex items-center justify-between"
                      >
                        <span className="truncate">{item.title}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    Saved Sessions
                  </h3>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-primary/60 italic leading-relaxed">
                      "Looking for a gift for my sister's wedding in Addis..."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto p-8 border-t border-border/50 bg-white/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Abenezer K.</p>
                  <p className="text-[10px] text-muted-foreground">Premium Member</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-white/80 relative">
            {/* Header */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-4">
                <div className="md:hidden w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary flex items-center gap-2">
                    Zenbil Assistant
                    <Badge variant="outline" className="text-[10px] h-5 border-emerald-200 text-emerald-600 bg-emerald-50">Online</Badge>
                  </h3>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 h-10 w-10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-6 md:px-12 py-8">
              <div ref={scrollRef} className="max-w-4xl mx-auto space-y-12">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-slate-100' : 'bg-primary shadow-lg'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5 text-primary" /> : <Bot className="w-5 h-5 text-accent" />}
                    </div>
                    
                    <div className={`flex flex-col gap-4 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                      <div className={`p-6 rounded-[24px] text-sm md:text-base leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-white border border-border/50 text-primary rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>

                      {/* AI Recommendations - Premium Cards */}
                      {msg.products && msg.products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                          {msg.products.map(product => (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              key={product.id}
                              className="group bg-white rounded-3xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
                            >
                              <div className="aspect-[4/3] relative overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge className="bg-white/90 backdrop-blur text-primary border-none text-[10px] font-bold">
                                    AI RECOMMENDED
                                  </Badge>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              </div>
                              <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{product.category}</p>
                                  </div>
                                  <span className="font-bold text-primary">{product.price.toLocaleString()} ETB</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                                  {product.description}
                                </p>
                                <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="rounded-full text-[11px] h-9 px-4 hover:bg-primary hover:text-white transition-all font-bold"
                                    onClick={() => addToCart(product)}
                                  >
                                    Add to Cart
                                  </Button>
                                  <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-accent">
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium">
                        <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {msg.role === 'bot' && (
                          <div className="flex items-center gap-2 border-l border-border/50 pl-4">
                            <button className="hover:text-primary transition-colors"><ThumbsUp className="w-3 h-3" /></button>
                            <button className="hover:text-primary transition-colors"><ThumbsDown className="w-3 h-3" /></button>
                            <button className="hover:text-primary transition-colors ml-2"><Share2 className="w-3 h-3" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-6">
                    <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                      <Bot className="w-5 h-5 text-accent" />
                    </div>
                    <div className="bg-slate-50 border border-border/30 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input & Suggestions */}
            <div className="p-6 md:p-10 bg-white/50 backdrop-blur-md border-t border-border/50">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {suggestions.map((s, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-[11px] h-9 whitespace-nowrap bg-white/70 hover:bg-white border-border/50 shadow-sm font-bold flex items-center gap-2 group"
                      onClick={() => {
                        setMessage(s.text);
                      }}
                    >
                      <span className="text-accent">{s.icon}</span>
                      {s.text}
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Button>
                  ))}
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/5 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                  <div className="relative flex items-center bg-white border border-border/50 rounded-[28px] p-2 pr-3 shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/10">
                    <div className="w-12 h-12 flex items-center justify-center text-muted-foreground/50">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="Ask Zenbil AI to find products, compare, or suggest gifts..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base text-primary placeholder:text-muted-foreground/40 py-4 h-14"
                    />
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="rounded-full text-muted-foreground hover:text-primary">
                        <Plus className="w-5 h-5" />
                      </Button>
                      <Button 
                        onClick={handleSend}
                        className="rounded-2xl bg-primary text-white w-12 h-12 shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-8 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2"><Sparkles className="w-3 h-3" /> GPT-4 Turbo Optimized</span>
                  <span className="flex items-center gap-2"><History className="w-3 h-3" /> Context Aware</span>
                  <span className="flex items-center gap-2"><Search className="w-3 h-3" /> Real-time Marketplace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
