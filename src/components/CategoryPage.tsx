import { useState, useMemo } from 'react';
import { 
  Filter, ChevronDown, LayoutGrid, List, Search, 
  Star, ArrowUpDown, X, Check, SlidersHorizontal,
  ChevronLeft, ChevronRight, ShoppingBag
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { products, Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Food', 'Beauty'];
const BRANDS = ['Zenbil', 'Addis Tech', 'Ethiopian Highlands', 'Mamo Kacha', 'Yegna'];
const RATINGS = [4, 3, 2];

export function CategoryPage({ onProductClick }: { onProductClick: (p: Product) => void }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || (product.seller && selectedBrands.includes(product.seller.name)) || selectedBrands.some(b => product.name.includes(b));
      const matchesRating = !minRating || product.rating >= minRating;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesBrand && matchesRating && matchesStock && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (a.isNew ? -1 : 1);
      return b.rating - a.rating; // default popular/rating
    });
  }, [selectedCategory, priceRange, selectedBrands, inStockOnly, minRating, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setMinRating(null);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const FilterSidebar = () => (
    <div className="space-y-10">
      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all flex items-center justify-between group ${
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'hover:bg-slate-100 text-muted-foreground hover:text-primary'
              }`}
            >
              {cat}
              {selectedCategory === cat && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Price Range</h3>
          <span className="text-xs font-mono text-accent">{priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ETB</span>
        </div>
        <Slider
          defaultValue={[0, 200000]}
          max={200000}
          step={1000}
          value={priceRange}
          onValueChange={(val) => { setPriceRange(val); setCurrentPage(1); }}
          className="py-4"
        />
      </div>

      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Brands</h3>
        <div className="space-y-3">
          {BRANDS.map(brand => (
            <div key={brand} className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
              <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                selectedBrands.includes(brand) ? 'bg-accent border-accent text-primary' : 'border-border group-hover:border-accent/50'
              }`}>
                {selectedBrands.includes(brand) && <Check className="w-3 h-3 font-bold" />}
              </div>
              <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? 'text-primary font-bold' : 'text-muted-foreground group-hover:text-primary'}`}>
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Availability</h3>
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { setInStockOnly(!inStockOnly); setCurrentPage(1); }}>
          <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
            inStockOnly ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-border group-hover:border-emerald-500/50'
          }`}>
            {inStockOnly && <Check className="w-3 h-3 font-bold" />}
          </div>
          <span className={`text-sm transition-colors ${inStockOnly ? 'text-primary font-bold' : 'text-muted-foreground group-hover:text-primary'}`}>
            In Stock Only
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6">Rating</h3>
        <div className="space-y-2">
          {RATINGS.map(rating => (
            <button
              key={rating}
              onClick={() => { setMinRating(minRating === rating ? null : rating); setCurrentPage(1); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                minRating === rating 
                  ? 'bg-accent/10 text-primary border border-accent/20' 
                  : 'hover:bg-slate-50 text-muted-foreground'
              }`}
            >
              <div className="flex items-center text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-accent' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className="text-xs">& Up</span>
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-2xl border-dashed border-2 py-6 text-muted-foreground hover:text-primary hover:border-primary transition-all" onClick={clearFilters}>
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="py-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-accent text-primary rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                Marketplace
              </Badge>
              <span className="text-muted-foreground text-sm font-medium">/ Browse Categories</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-tight">
              Premium <span className="text-accent italic">Marketplace</span>
            </h1>
            <p className="text-muted-foreground max-xl text-lg leading-relaxed">
              Discover the finest Ethiopian products, from high-performance tech to handcrafted luxury fashion.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-[28px] shadow-sm border border-border/50">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-[20px] flex-1 md:w-80 border border-border/30">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search premium products..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden rounded-[20px] bg-primary text-white px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-2xl font-bold">Filters</SheetTitle>
                  <SheetDescription>Narrow down your search</SheetDescription>
                </SheetHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-150px)] pr-4">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-72 shrink-0">
            <div className="sticky top-32">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-[32px] border border-border/50 shadow-sm">
              <div className="flex items-center gap-6">
                <p className="text-sm text-muted-foreground font-medium">
                  Showing <span className="text-primary font-bold">{filteredProducts.length}</span> results
                </p>
                <div className="hidden sm:flex items-center gap-2 border-l border-border/50 pl-6">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-slate-100'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-slate-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort By:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] rounded-2xl bg-white border-border/50 font-bold text-xs h-10 shadow-sm">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-border/50">
                    <SelectItem value="popular">Popularity</SelectItem>
                    <SelectItem value="newest">New Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'All' || selectedBrands.length > 0 || minRating || inStockOnly) && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-2">Active:</span>
                {selectedCategory !== 'All' && (
                  <Badge className="bg-primary/5 text-primary border-primary/20 rounded-full px-3 py-1 flex items-center gap-1">
                    {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                  </Badge>
                )}
                {selectedBrands.map(brand => (
                  <Badge key={brand} className="bg-accent/10 text-primary border-accent/20 rounded-full px-3 py-1 flex items-center gap-1">
                    {brand}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
                  </Badge>
                ))}
                {inStockOnly && (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-3 py-1 flex items-center gap-1">
                    In Stock
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
                  </Badge>
                )}
                {minRating && (
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-3 py-1 flex items-center gap-1">
                    {minRating}+ Stars
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setMinRating(null)} />
                  </Badge>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
                : "space-y-6"
              }>
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      key={product.id}
                    >
                      <ProductCard product={product} onClick={() => onProductClick(product)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-24 text-center space-y-6 bg-white/50 backdrop-blur rounded-[40px] border border-border/50 shadow-inner">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-border/50">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                </div>
                <button 
                  onClick={clearFilters}
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-all font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-12">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-border/50 hover:bg-primary hover:text-white transition-all w-12 h-12"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                        currentPage === i + 1 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'text-primary hover:bg-slate-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full border-border/50 hover:bg-primary hover:text-white transition-all w-12 h-12"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
