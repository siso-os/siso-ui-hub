import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Card, CardContent } from '../../../ui/card';
import { ArrowRight, Star } from 'lucide-react';

export default function FeaturesTestimonialCombo() {
  const features = [
    {
      title: 'Naturally Derived',
      description:
        'All ingredients are ethically sourced and 98% derived from natural origins.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z" />
          <path d="M12 12a3 3 0 0 0 0 6 3 3 0 0 0 0-6Z" />
          <path d="M6 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          <path d="M6 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M18 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M18 12a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        </svg>
      ),
    },
    {
      title: 'Dermatologist Tested',
      description:
        'Clinically proven to be gentle on skin with hypoallergenic formula.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Cruelty-Free',
      description:
        'Never tested on animals and certified by Leaping Bunny and PETA.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M19.2 5A9 9 0 0 0 13 4a3 3 0 0 0-2 1.8c-.8-.3-1.7-.4-2.7-.3A9 9 0 0 0 3 6.5a3 3 0 0 0 .7 5c-.3.7-.5 1.4-.5 2.2a6 6 0 0 0 9.7 4.7c1.1.5 2.2.8 3.3.9A8 8 0 0 0 19.5 21 3 3 0 0 0 22 18.8V10a3 3 0 0 0-2.8-5Z" />
          <path d="M13 14l-4-4" />
          <path d="M9 14h4v-4" />
        </svg>
      ),
    },
    {
      title: 'Sustainable Packaging',
      description: 'Recyclable glass containers and FSC-certified paper boxes.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="M3.29 7.05 12 12l8.71-4.95" />
          <path d="M12 22V12" />
          <path d="m21 10-9 5-9-5" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      quote:
        "The serum transformed my skin in just a week. It's light but powerful - exactly what I needed for my combination skin.",
      author: 'Emily Chen',
      position: 'Verified Customer',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop',
      rating: 5,
    },
    {
      quote:
        "I've tried dozens of luxury skincare brands, but this line has been the only one that delivered consistent results without irritation.",
      author: 'Michael Torres',
      position: 'Skincare Enthusiast',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop',
      rating: 5,
    },
    {
      quote:
        "As someone with sensitive skin, finding products that don't cause reactions is challenging. This entire line is gentle yet effective.",
      author: 'Sarah Johnson',
      position: 'Beauty Blogger',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop',
      rating: 4,
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image and features section */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <Badge className="px-3.5 py-1.5">Clean Beauty</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Radiance from nature&apos;s finest ingredients
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed">
                Our rejuvenating serum combines potent natural actives with
                cutting-edge science for visible results.
              </p>
            </div>

            <div className="bg-muted/50 relative aspect-[4/3] overflow-hidden rounded-xl border">
              <img
                src="https://images.unsplash.com/photo-1614159869126-0f06a742eecb?q=80&w=2787&auto=format&fit=crop"
                alt="Luxury serum bottle with natural background"
                className="object-cover transition-all hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute right-4 bottom-4 left-4">
                <div className="bg-background/80 rounded-lg p-2 backdrop-blur-sm">
                  <p className="text-center text-sm font-medium">
                    Glass packaging with eco-friendly dropper
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="hover:bg-muted/50 flex flex-col space-y-2 rounded-lg border p-4 transition-colors"
                >
                  <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button asChild>
                <a href="#">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">Learn about ingredients</a>
              </Button>
            </div>
          </div>

          {/* Testimonials section */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">
                What our customers are saying
              </h3>
              <p className="text-muted-foreground">
                Real reviews from people who have experienced the transformative
                effects.
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-5 w-5" />
                ))}
                <span className="ml-2 text-sm font-medium">
                  4.9/5 from over 2,400 reviews
                </span>
              </div>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="overflow-hidden p-0">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="border-background h-12 w-12 border-2">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback>
                            {testimonial.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {testimonial.author}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="fill-primary text-primary h-4 w-4"
                          />
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="text-muted-foreground h-4 w-4"
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="mt-4 border-l-2 pl-4">
                      <p className="text-muted-foreground italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/30 relative rounded-xl border p-6">
              <div className="bg-primary/10 absolute -top-4 left-6 inline-block rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-5 w-5"
                >
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                  <path d="M12 13v9" />
                  <path d="M5 13v2a4 4 0 0 0 4 4h4" />
                </svg>
              </div>
              <h4 className="text-lg font-medium">
                Customer satisfaction guaranteed
              </h4>
              <p className="text-muted-foreground mt-1 text-sm">
                If you&apos;re not completely satisfied with our products within
                30 days, we&apos;ll provide a full refund.
              </p>
              <Button
                variant="link"
                className="text-primary mt-2 h-auto p-0"
                asChild
              >
                <a href="#">View our return policy</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
