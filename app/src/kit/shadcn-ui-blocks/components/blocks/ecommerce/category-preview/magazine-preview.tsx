import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  tagline: string;
  description: string;
  image: string;
  secondaryImage?: string;
  productCount: number;
  featured?: boolean;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  highlights: string[];
  cta: string;
}

export default function MagazinePreview() {
  const categories: Category[] = [
    {
      name: 'Heritage Collection',
      tagline: 'Timeless Elegance, Modern Innovation',
      description:
        'Discover our curated selection of classic timepieces that blend traditional craftsmanship with contemporary design. Each watch tells a story of heritage and innovation.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      secondaryImage:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 156,
      featured: true,
      quote: {
        text: 'Our Heritage Collection represents the pinnacle of watchmaking tradition, reimagined for the modern connoisseur.',
        author: 'James Anderson',
        role: 'Master Watchmaker',
      },
      highlights: [
        'Hand-finished movements',
        'Limited edition pieces',
        'Exclusive complications',
        'Traditional techniques',
      ],
      cta: 'Explore the Heritage',
    },
    {
      name: 'Contemporary Series',
      tagline: 'The Future of Time',
      description:
        'Bold designs meet cutting-edge technology in our Contemporary Series. These watches push the boundaries of modern horology while maintaining exceptional quality and style.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      productCount: 89,
      highlights: [
        'Innovative materials',
        'Smart features',
        'Modern aesthetics',
        'Technical excellence',
      ],
      cta: 'Discover Modern Time',
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-7xl space-y-24 p-6 py-16">
      {categories.map((category) => (
        <div key={category.name} className="">
          {/* Featured Badge */}
          {category.featured && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary px-3 py-1 text-sm"
              >
                Featured Collection
              </Badge>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                    {category.productCount} Exclusive Pieces
                  </h4>
                  <h2 className="mb-3 text-4xl font-semibold tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground text-xl italic">
                    {category.tagline}
                  </p>
                </div>

                <div className="prose text-muted-foreground">
                  <p>{category.description}</p>
                </div>

                {/* Quote */}
                {category.quote && (
                  <blockquote className="border-primary my-8 border-l-2 pl-6">
                    <p className="mb-4 text-lg italic">{category.quote.text}</p>
                    <footer>
                      <cite className="not-italic">
                        <span className="font-medium">
                          {category.quote.author}
                        </span>
                        <span className="text-muted-foreground">
                          {' '}
                          — {category.quote.role}
                        </span>
                      </cite>
                    </footer>
                  </blockquote>
                )}

                {/* Highlights */}
                <div>
                  <h3 className="mb-4 text-sm font-medium">
                    Collection Highlights
                  </h3>
                  <ul className="grid grid-cols-2 gap-3">
                    {category.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-muted-foreground flex items-center text-sm"
                      >
                        <div className="bg-primary mr-2 h-1 w-1 rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="group mt-4 w-fit">
                  {category.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative">
              {category.secondaryImage ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-xl">
                    <img
                      src={category.secondaryImage}
                      alt={`${category.name} detail`}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Decorative Elements */}
              <div className="bg-primary/5 absolute -bottom-6 -left-6 -z-10 h-24 w-24 rounded-full" />
              <div className="bg-primary/5 absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
