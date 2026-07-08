import { Monitor, Smartphone, ShoppingBag, Home, Sparkles, BookOpen, UtensilsCrossed, Trophy } from 'lucide-react';
const categories = [
  { name: 'Electronics', icon: <Smartphone className="w-8 h-8" />, count: '1.2k+ items', color: 'bg-blue-50 text-blue-600' },
  { name: 'Fashion', icon: <ShoppingBag className="w-8 h-8" />, count: '3.4k+ items', color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Home', icon: <Home className="w-8 h-8" />, count: '800+ items', color: 'bg-amber-50 text-amber-600' },
  { name: 'Beauty', icon: <Sparkles className="w-8 h-8" />, count: '1.5k+ items', color: 'bg-rose-50 text-rose-600' },
  { name: 'Books', icon: <BookOpen className="w-8 h-8" />, count: '500+ items', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Groceries', icon: <UtensilsCrossed className="w-8 h-8" />, count: '2k+ items', color: 'bg-orange-50 text-orange-600' },
  { name: 'Gaming', icon: <Monitor className="w-8 h-8" />, count: '400+ items', color: 'bg-purple-50 text-purple-600' },
  { name: 'Sports', icon: <Trophy className="w-8 h-8" />, count: '900+ items', color: 'bg-cyan-50 text-cyan-600' },
];

export function FeaturedCategories({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-primary tracking-tight">
              Explore <span className="text-accent">Categories</span>
            </h2>
            <p className="text-muted-foreground max-w-md text-lg">
              Find exactly what you need with our curated catalog of premium products.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="text-primary font-bold hover:text-accent transition-colors flex items-center gap-2 group"
          >
            View All Categories
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
              →
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={onViewAll}
              className="group relative p-8 rounded-[32px] border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer overflow-hidden bg-white"
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">{cat.count}</p>
              
              <div className="absolute -right-4 -bottom-4 w-24 h-24 ethiopian-pattern opacity-5 group-hover:opacity-10 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
