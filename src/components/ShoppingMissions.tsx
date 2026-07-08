import { ArrowRight, Sparkles, GraduationCap, Video, Laptop, Home, Coffee } from 'lucide-react';
import { Button } from './ui/button';

const missions = [
  {
    title: 'Student Essentials',
    subtitle: 'Everything you need to excel in your studies.',
    icon: <GraduationCap className="w-8 h-8" />,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/mission-student-essentials-55f21487-1783501167865.webp',
    color: 'from-blue-600/20 to-indigo-600/20'
  },
  {
    title: 'Creator Studio',
    subtitle: 'Pro gear for the modern content creator.',
    icon: <Video className="w-8 h-8" />,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/mission-creator-studio-8c21bea1-1783501167863.webp',
    color: 'from-purple-600/20 to-pink-600/20'
  },
  {
    title: 'Home Office Setup',
    subtitle: 'Maximize productivity in your personal workspace.',
    icon: <Laptop className="w-8 h-8" />,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/mission-home-office-1ed30053-1783501167464.webp',
    color: 'from-emerald-600/20 to-teal-600/20'
  },
  {
    title: 'Smart Home Culture',
    subtitle: 'Tradition meets tech in your living space.',
    icon: <Home className="w-8 h-8" />,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/6431eb4c-8ab0-4145-8ed4-3c7b98eeafd4/mission-smart-home-culture-f89a7106-1783501169248.webp',
    color: 'from-amber-600/20 to-orange-600/20'
  }
];

export function ShoppingMissions() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full ethiopian-pattern opacity-[0.03] -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase tracking-widest">Intelligent Collections</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6">
            Shopping <span className="text-accent">Missions</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            AI-curated collections tailored to your lifestyle and goals. Discover everything you need in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {missions.map((mission, i) => (
            <div 
              key={i} 
              className="group relative h-[400px] rounded-[40px] overflow-hidden cursor-pointer"
            >
              <img 
                src={mission.image} 
                alt={mission.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent ${mission.color}`}></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className="mb-6 w-16 h-16 rounded-2xl glass flex items-center justify-center text-accent">
                  {mission.icon}
                </div>
                <h3 className="text-3xl font-bold mb-3">{mission.title}</h3>
                <p className="text-white/70 text-lg mb-8 max-w-sm">{mission.subtitle}</p>
                <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all text-accent">
                  Explore Mission
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute top-6 right-6">
                <Button className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-primary font-bold">
                  {Math.floor(Math.random() * 20) + 10} Products
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
