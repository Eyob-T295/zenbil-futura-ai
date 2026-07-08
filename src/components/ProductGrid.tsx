import { useState } from 'react';
import { products, categories, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from './ui/input';

interface ProductGridProps {
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ onProductClick }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20' 
                    : 'bg-white/50 border-white/20 hover:bg-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Filter these results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl bg-white/50 border-border/50 h-12"
            />
          </div>
          <Button variant="outline" size="lg" className="rounded-xl gap-2 h-12 hidden sm:flex">
            <Filter className="w-4 h-4" />
            Sort By
          </Button>
          <Button variant="outline" size="lg" className="rounded-xl gap-2 h-12 hidden sm:flex">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-primary">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="rounded-full"
            >
              Clear all filters
            </Button>
          </div>
        )}
    </div>
  );
}
