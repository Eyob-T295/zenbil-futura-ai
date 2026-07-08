import { Star, ShieldCheck, BadgeCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const sellers = [
  {
    name: 'Habesha Tech Hub',
    category: 'Electronics',
    rating: 4.9,
    reviews: 856,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/seller-featured-1-8c54555c-1783501166868.webp',
    verified: true
  },
  {
    name: 'Addis Fashion Atelier',
    category: 'Fashion',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    verified: true
  },
  {
    name: 'Ethio Organic Mart',
    category: 'Groceries',
    rating: 5.0,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    verified: true
  }
];

export function FeaturedSellers() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-primary tracking-tight">
              Top <span className="text-accent">Sellers</span>
            </h2>
            <p className="text-muted-foreground max-w-md text-lg">
              Partnering with Ethiopia's most trusted businesses to bring you the best.
            </p>
          </div>
          <Button variant="outline" className="rounded-full border-primary/20 hover:bg-white font-bold h-12 px-8">
            Become a Seller
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sellers.map((seller, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-[32px] p-8 border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden"
            >
              <div className="flex items-center gap-6 mb-6 relative z-10">
                <div className="relative">
                  <img 
                    src={seller.image} 
                    alt={seller.name} 
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50 group-hover:ring-accent/20 transition-all"
                  />
                  {seller.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-accent text-primary p-1 rounded-lg">
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{seller.name}</h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{seller.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-8 mb-8 relative z-10">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-primary font-black">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    {seller.rating}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Rating</span>
                </div>
                <div className="w-px h-8 bg-border/50"></div>
                <div className="flex flex-col">
                  <div className="text-primary font-black">{seller.reviews.toLocaleString()}</div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Reviews</span>
                </div>
                <div className="w-px h-8 bg-border/50"></div>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Trust Verified
                </div>
              </div>

              <Button className="w-full rounded-2xl bg-slate-50 text-primary hover:bg-accent hover:text-primary border-none shadow-none font-bold py-6 group-hover:gap-4 transition-all relative z-10">
                Visit Store
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="absolute top-0 right-0 w-24 h-24 ethiopian-pattern opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
