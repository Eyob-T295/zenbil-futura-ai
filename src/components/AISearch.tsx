import { Search, Sparkles, ArrowRight, Lightbulb, Gamepad2, Gift, Briefcase, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function AISearch() {
  const [query, setQuery] = useState('');

  const suggestions = [
    { text: 'Gaming laptop under 80000 ETB', icon: <Gamepad2 className="w-4 h-4" /> },
    { text: 'Birthday gift for my sister', icon: <Gift className="w-4 h-4" /> },
    { text: 'Home office setup items', icon: <Briefcase className="w-4 h-4" /> },
    { text: 'Traditional wedding gift', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold uppercase tracking-widest">Conversational Discovery</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
            What are you <span className="text-accent">looking for</span> today?
          </h2>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white rounded-[28px] p-2 flex items-center shadow-xl border border-white/50">
              <Search className="ml-4 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                placeholder="Describe what you're looking for..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-4 h-14 placeholder:text-muted-foreground/50"
              />
              <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary/90 px-8 h-14 font-bold gap-2">
                Ask AI
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mr-2">Try searching:</span>
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setQuery(s.text)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-border/50 text-sm font-medium text-primary hover:border-accent hover:text-accent transition-all hover:scale-105 shadow-sm"
              >
                {s.icon}
                {s.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
