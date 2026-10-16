import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Badge } from '../../../ui/badge';
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechFlow',
    avatar: '/api/placeholder/40/40',
    content:
      "This platform transformed our workflow completely. We've seen a 300% increase in productivity since implementing their solution.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'CEO',
    company: 'InnovateCorp',
    avatar: '/api/placeholder/40/40',
    content:
      'Outstanding customer support and an intuitive interface. Our team was up and running in just 24 hours.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Developer',
    company: 'CodeCraft',
    avatar: '/api/placeholder/40/40',
    content:
      "The best investment we've made this year. The ROI was evident within the first month of usage.",
    rating: 5,
  },
];

export default function HeroSectionWithTestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}
              <div className="mb-6">
                <Badge variant="secondary" className="px-3 py-1">
                  🚀 New Feature Launch
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-primary max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
                Transform Your Business with Our Revolutionary Platform
              </h1>

              {/* Description */}
              <p className="text-foreground mt-6 max-w-4xl text-base text-balance sm:text-lg">
                Join thousands of companies who have already streamlined their
                operations and boosted productivity by 300% with our
                cutting-edge solution.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                <div>
                  <div className="text-primary text-2xl font-bold">10K+</div>
                  <div className="text-muted-foreground text-sm">
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div className="text-primary text-2xl font-bold">99.9%</div>
                  <div className="text-muted-foreground text-sm">Uptime</div>
                </div>
                <div>
                  <div className="text-primary text-2xl font-bold">24/7</div>
                  <div className="text-muted-foreground text-sm">Support</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="flex items-center gap-2">
                  Get Started Free
                  <Play className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8">
                <p className="text-muted-foreground mb-4 text-sm">
                  Trusted by industry leaders
                </p>
                <div className="flex items-center gap-6 opacity-60">
                  <div className="bg-muted flex h-8 w-20 items-center justify-center rounded text-xs font-medium">
                    BRAND
                  </div>
                  <div className="bg-muted flex h-8 w-20 items-center justify-center rounded text-xs font-medium">
                    COMPANY
                  </div>
                  <div className="bg-muted flex h-8 w-20 items-center justify-center rounded text-xs font-medium">
                    ENTERPRISE
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Testimonial Carousel */}
            <div className="flex items-center justify-center">
              <Card className="relative w-full max-w-md">
                <CardContent className="p-6">
                  {/* Rating Stars */}
                  <div className="mb-4 flex">
                    {[...Array(testimonials[currentTestimonial]!.rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="mb-6 text-lg leading-relaxed font-medium">
                    "{testimonials[currentTestimonial]!.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonials[currentTestimonial]!.avatar}
                      />
                      <AvatarFallback>
                        {testimonials[currentTestimonial]!.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">
                        {testimonials[currentTestimonial]!.name}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {testimonials[currentTestimonial]!.role} at{' '}
                        {testimonials[currentTestimonial]!.company}
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={prevTestimonial}
                      className="hover:bg-muted rounded-full p-2 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Dots indicator */}
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentTestimonial
                              ? 'bg-primary'
                              : 'bg-muted'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextTestimonial}
                      className="hover:bg-muted rounded-full p-2 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="from-primary/20 to-secondary/20 absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br opacity-30 blur-3xl" />
          <div className="from-accent/20 to-primary/20 absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl opacity-30 blur-3xl" />
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
