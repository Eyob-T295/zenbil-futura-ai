import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ChevronRight, ShoppingBag, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../hooks/use-cart';
import { products } from '../data/products';

export function ZenbilAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'bot', content: 'Salam! I am your Zenbil AI Assistant. How can I help you find the perfect product today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsTyping(true);

    // Simulated AI Response
    setTimeout(() => {
      let response = "That's interesting! Based on your interest, I recommend checking out our premium electronics and luxury fashion collections.";
      
      if (userMessage.toLowerCase().includes('coffee') || userMessage.toLowerCase().includes('food')) {
        response = "Our Yirgacheffe Gold Reserve is highly rated! It's ethically sourced and has incredible floral notes. Would you like me to add it to your cart?";
      } else if (userMessage.toLowerCase().includes('gift') || userMessage.toLowerCase().includes('ethiopia')) {
        response = "For a special gift, I recommend the Neo-Habesha Evening Gown or our Modern Mesob Centerpiece. They beautifully blend tradition with modern luxury.";
      } else if (userMessage.toLowerCase().includes('tech') || userMessage.toLowerCase().includes('laptop')) {
        response = "The ZenBook Pro X is our most powerful AI-ready laptop. It's perfect for professionals like you.";
      }

      setChat(prev => [...prev, { role: 'bot', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl border border-border/50 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-6 text-white relative">
            <div className="absolute inset-0 ethiopian-pattern-dark opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Zenbil AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/70">Online & ready to help</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white shadow-sm border border-border/50 text-primary rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-border/50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions */}
          <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            <Button variant="outline" size="sm" className="rounded-full text-xs whitespace-nowrap bg-white hover:bg-slate-50 border-border/50" onClick={() => setMessage('Gift ideas?')}>
              <Lightbulb className="w-3 h-3 mr-1 text-accent" />
              Gift ideas?
            </Button>
            <Button variant="outline" size="sm" className="rounded-full text-xs whitespace-nowrap bg-white hover:bg-slate-50 border-border/50" onClick={() => setMessage('Latest electronics')}>
              <ShoppingBag className="w-3 h-3 mr-1 text-secondary" />
              Latest tech
            </Button>
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-border/50">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full bg-slate-100 rounded-2xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              <Button 
                size="icon" 
                onClick={handleSend}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl bg-primary hover:bg-primary/90 w-9 h-9"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95 group relative ${
          isOpen ? 'bg-white text-primary border border-border/50' : 'bg-primary text-white'
        }`}
      >
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-accent text-primary text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg">
            AI READY
          </div>
        )}
        {isOpen ? <X className="w-8 h-8" /> : <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
}
