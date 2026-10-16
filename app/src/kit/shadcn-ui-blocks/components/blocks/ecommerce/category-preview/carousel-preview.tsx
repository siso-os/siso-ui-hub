import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  priceRange: string;
  tags: string[];
}

export default function CarouselPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const categories: Category[] = [
    {
      name: 'Luxury Watches',
      description:
        'Discover our collection of premium timepieces crafted with exceptional materials and precision engineering.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 156,
      featured: true,
      rating: 4.9,
      reviewCount: 1250,
      priceRange: '$5,000 - $50,000+',
      tags: ['Luxury', 'Premium', 'Investment Pieces'],
    },
    {
      name: 'Smart Watches',
      description:
        'Stay connected with cutting-edge technology. Advanced features meet sophisticated design.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 89,
      rating: 4.7,
      reviewCount: 890,
      priceRange: '$299 - $999',
      tags: ['Tech', 'Fitness', 'Connectivity'],
    },
    {
      name: 'Classic Collection',
      description:
        'Timeless designs that never go out of style. Perfect for any occasion.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 112,
      rating: 4.8,
      reviewCount: 965,
      priceRange: '$1,000 - $5,000',
      tags: ['Classic', 'Elegant', 'Versatile'],
    },
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="bg-card relative overflow-hidden rounded-xl border">
        {/* Main Carousel */}
        <div className="relative aspect-[21/9]">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                index === currentIndex
                  ? 'translate-x-0'
                  : index < currentIndex
                    ? '-translate-x-full'
                    : 'translate-x-full'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="from-background/90 via-background/60 absolute inset-0 bg-gradient-to-r to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex h-full items-center">
                <div className="w-full max-w-2xl space-y-6 p-8 lg:p-12">
                  {category.featured && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary mb-4"
                    >
                      Featured Collection
                    </Badge>
                  )}

                  <h2 className="text-4xl font-semibold tracking-tight">
                    {category.name}
                  </h2>

                  <p className="text-accent-foreground/80 text-lg">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(category.rating)
                              ? 'fill-primary text-primary'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-medium">
                        {category.rating}
                      </span>
                      <span className="text-accent-foreground/80">
                        ({category.reviewCount})
                      </span>
                    </div>
                    <div className="text-accent-foreground/80">
                      {category.productCount} products
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-background/50 backdrop-blur-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Button size="lg" className="group">
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="absolute right-6 bottom-6 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="bg-background/50 hover:bg-background/80 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="bg-background/50 hover:bg-background/80 backdrop-blur-sm"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
