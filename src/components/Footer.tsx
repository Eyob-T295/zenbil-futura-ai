import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern-dark opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-2xl">
                Z
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Zenbil <span className="text-accent">Next</span>
              </span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Ethiopia's next-generation online marketplace combining modern luxury with intelligent shopping assistance.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Quick Links</h3>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Collections</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sell on Zenbil</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Customer Support</h3>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Newsletter</h3>
            <p className="text-white/70 mb-4">Subscribe to get special offers and first look at new collections.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-white/10 border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors">
                Join
              </button>
            </div>
            <div className="mt-8 space-y-3 text-white/70 text-sm">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span>+251 11 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>hello@zenbilnext.et</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Zenbil Next. All rights reserved. Designed with ❤️ in Addis Ababa.</p>
        </div>
      </div>
    </footer>
  );
}
