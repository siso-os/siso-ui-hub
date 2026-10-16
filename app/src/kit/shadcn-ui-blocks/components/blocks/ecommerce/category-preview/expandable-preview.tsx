import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Collapsible, CollapsibleContent } from '../../../ui/collapsible';
import {
  ChevronDown,
  ChevronUp,
  Star,
  Package,
  Clock,
  Shield,
} from 'lucide-react';
import { useState } from 'react';

interface Feature {
  icon: typeof Star;
  title: string;
  description: string;
}

interface Category {
  name: string;
  description: string;
  image: string;
  productCount: number;
  rating: number;
  reviewCount: number;
  priceRange: string;
  features: Feature[];
  specifications: Record<string, string>;
  shipping: {
    delivery: string;
    returns: string;
    warranty: string;
  };
}

export default function ExpandablePreview() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: 'Luxury Collection',
      description:
        'Experience the pinnacle of watchmaking with our luxury collection.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 156,
      rating: 4.9,
      reviewCount: 1250,
      priceRange: '$5,000 - $50,000+',
      features: [
        {
          icon: Star,
          title: 'Premium Materials',
          description:
            'Only the finest materials are used in our luxury timepieces',
        },
        {
          icon: Shield,
          title: 'Authenticity Guaranteed',
          description: 'Each watch comes with a certificate of authenticity',
        },
        {
          icon: Clock,
          title: 'Swiss Movement',
          description: 'Precision engineered Swiss movements in every watch',
        },
      ],
      specifications: {
        'Case Material': '18k Gold, Platinum, or Titanium',
        'Movement Type': 'Automatic or Manual',
        'Water Resistance': 'Up to 100m',
        Crystal: 'Sapphire with anti-reflective coating',
        'Strap Options': 'Leather, Metal, or Rubber',
      },
      shipping: {
        delivery: 'Free worldwide shipping with insurance',
        returns: '30-day returns with full refund',
        warranty: '5-year international warranty',
      },
    },
    {
      name: 'Sport Collection',
      description: 'Professional-grade timepieces for the active lifestyle.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 89,
      rating: 4.7,
      reviewCount: 890,
      priceRange: '$1,000 - $5,000',
      features: [
        {
          icon: Shield,
          title: 'Durability',
          description: 'Built to withstand extreme conditions',
        },
        {
          icon: Clock,
          title: 'Precision Timing',
          description: 'Accurate chronograph functions',
        },
        {
          icon: Package,
          title: 'Lightweight Design',
          description: 'Comfortable for all-day wear',
        },
      ],
      specifications: {
        'Case Material': 'Stainless Steel or Titanium',
        'Movement Type': 'Automatic or Quartz',
        'Water Resistance': 'Up to 300m',
        Crystal: 'Sapphire with anti-reflective coating',
        'Strap Options': 'Rubber or Metal',
      },
      shipping: {
        delivery: 'Free standard shipping',
        returns: '60-day returns',
        warranty: '2-year warranty',
      },
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
      {categories.map((category) => (
        <Card key={category.name} className="gap-0 overflow-hidden p-0">
          <CardHeader className="bg-muted/50 grid-rows-none border-b pt-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription className="mt-1.5">
                  {category.description}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.name ? null : category.name
                  )
                }
              >
                {expandedCategory === category.name ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Preview Content */}
            <div className="relative aspect-[21/9]">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="from-background/90 via-background/50 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="fill-primary text-primary h-5 w-5" />
                    <span className="ml-1 font-medium">{category.rating}</span>
                    <span className="text-accent-foreground/80 ml-1 text-sm">
                      ({category.reviewCount})
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-background/50 backdrop-blur-sm"
                  >
                    {category.productCount} products
                  </Badge>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {category.priceRange}
                </Badge>
              </div>
            </div>

            {/* Expandable Content */}
            <Collapsible
              open={expandedCategory === category.name}
              className="transition-all duration-300"
            >
              <CollapsibleContent className="space-y-6 p-6">
                {/* Features */}
                <div>
                  <h3 className="mb-4 font-semibold">Key Features</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {category.features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={feature.title}
                          className="bg-muted/50 flex flex-col items-center rounded-lg p-4 text-center"
                        >
                          <div className="bg-primary/10 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                            <Icon className="text-primary h-5 w-5" />
                          </div>
                          <h4 className="mb-1 font-medium">{feature.title}</h4>
                          <p className="text-accent-foreground/80 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="mb-4 font-semibold">Specifications</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(category.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="bg-muted/50 flex justify-between rounded-lg p-3"
                        >
                          <span className="text-sm font-medium">{key}</span>
                          <span className="text-accent-foreground/80 text-sm">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Shipping & Returns */}
                <div>
                  <h3 className="mb-4 font-semibold">Shipping & Returns</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Package className="text-primary mb-2 h-5 w-5" />
                      <div className="mb-1 font-medium">Delivery</div>
                      <p className="text-accent-foreground/80 text-sm">
                        {category.shipping.delivery}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Clock className="text-primary mb-2 h-5 w-5" />
                      <div className="mb-1 font-medium">Returns</div>
                      <p className="text-accent-foreground/80 text-sm">
                        {category.shipping.returns}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <Shield className="text-primary mb-2 h-5 w-5" />
                      <div className="mb-1 font-medium">Warranty</div>
                      <p className="text-accent-foreground/80 text-sm">
                        {category.shipping.warranty}
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="w-full">View All Products</Button>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
