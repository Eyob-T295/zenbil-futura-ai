import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../hooks/use-cart';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-[32px] overflow-hidden border border-border/50 hover:shadow-2xl transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-secondary text-white border-none px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              New Arrival
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-accent text-primary border-none px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              AI Choice
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="secondary"
            size="icon"
            className={`rounded-full shadow-lg ${wishlisted ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-white hover:bg-white'}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white hover:bg-white shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.(product);
            }}
          >
            <Eye className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Add to Cart Floating Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          <Button
            className="w-full rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 gap-2 h-12"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              addToCart(product);
            }}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span className="text-sm font-bold">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed h-10">
          {product.description}
        </p>
        
        <div className="pt-2 flex items-center justify-between">
          <span className="text-2xl font-black text-primary">
            {product.price.toLocaleString()} <span className="text-sm font-medium">ETB</span>
          </span>
          {!product.inStock && (
            <span className="text-xs font-bold text-destructive uppercase">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
}
