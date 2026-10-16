import { Button } from '../../../ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

export default function AnimatedFeaturesGrid() {
  const features = [
    {
      title: 'Adjustable Ergonomic Design',
      description:
        "Personalized comfort with fully adjustable components that adapt to your body's unique needs.",
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
      badge: 'Best Seller',
      link: '#',
    },
    {
      title: 'Premium Leather Finish',
      description:
        'Luxurious full-grain leather that develops a beautiful patina and lasts for years.',
      image:
        'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2064&auto=format&fit=crop',
      badge: 'New',
      link: '#',
    },
    {
      title: 'Memory Foam Cushioning',
      description:
        'Responsive high-density memory foam that contours perfectly to your body for ultimate comfort.',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
      link: '#',
    },
    {
      title: 'Weather-Resistant Fabric',
      description:
        'Advanced materials that resist fading, staining, and moisture damage for years of reliable use.',
      image:
        'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?q=80&w=2070&auto=format&fit=crop',
      link: '#',
    },
    {
      title: 'Modular Configuration',
      description:
        'Flexible design that allows you to rearrange components to suit your space and needs.',
      image:
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
      badge: 'Limited Edition',
      link: '#',
    },
    {
      title: '5-Year Warranty',
      description:
        'Our quality commitment backed by a comprehensive warranty for your complete peace of mind.',
      image:
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop',
      link: '#',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <div className="max-w-[800px] space-y-2">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm">
              Superior Craftsmanship
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Designed for comfort and style
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Discover the exceptional features that make our furniture
              collection stand out from the ordinary.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group overflow-hidden pt-0 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 z-10 bg-black/10 transition-colors group-hover:bg-black/20"></div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {feature.badge && (
                  <Badge className="absolute top-2 right-2 z-20">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <CardHeader className="flex-1">
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group-hover:text-primary p-0 transition-colors"
                  asChild
                >
                  <a href={feature.link} className="flex items-center gap-1">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="max-w-[600px] space-y-4 text-center">
            <h3 className="text-2xl font-bold">
              Ready to upgrade your living space?
            </h3>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers who have transformed their
              homes with our premium furniture.
            </p>
            <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Shop the collection</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">Request swatches</a>
              </Button>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-1">
              <div className="flex -space-x-3">
                <div className="bg-primary text-primary-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                  JD
                </div>
                <div className="bg-primary text-primary-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                  AS
                </div>
                <div className="bg-primary text-primary-foreground ring-background inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                  TR
                </div>
              </div>
              <span className="text-muted-foreground text-sm">
                Purchased this month
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground mx-1">•</span>
              <span className="text-muted-foreground">1,200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
