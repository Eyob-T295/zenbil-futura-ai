import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Yared Tadesse',
    role: 'Tech Enthusiast',
    content: 'Zenbil Next has completely changed how I shop for gadgets in Addis. The AI recommendations are surprisingly accurate!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Selamawit Kebede',
    role: 'Fashion Designer',
    content: 'The platform is so intuitive and beautiful. I love how it highlights local Ethiopian designers alongside global brands.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Samuel Bekele',
    role: 'Business Owner',
    content: 'Delivery was incredibly fast. I ordered a laptop in the morning and it was at my office by 2 PM. Highly recommended!',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  }
];

export function CustomerReviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
       <div className="absolute top-0 left-0 w-32 h-32 ethiopian-pattern opacity-5 -ml-16 -mt-16 bg-accent rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary tracking-tight">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of happy shoppers who trust Zenbil Next for their daily needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-slate-50 rounded-[40px] p-10 relative group hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-border/50"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className={`w-4 h-4 ${starIndex < review.rating ? 'fill-accent text-accent' : 'text-slate-300'}`} 
                  />
                ))}
              </div>

              <p className="text-lg text-primary leading-relaxed mb-8 relative z-10">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div>
                  <h4 className="font-bold text-primary">{review.name}</h4>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
