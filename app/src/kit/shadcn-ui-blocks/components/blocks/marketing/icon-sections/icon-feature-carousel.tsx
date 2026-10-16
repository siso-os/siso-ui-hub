import { useEffect, useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CloudUpload,
  Code2,
  Database,
  Laptop,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  Shield,
  Sparkles,
} from 'lucide-react';

interface FeatureSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  image: string;
  imageAlt: string;
}

export default function IconFeatureCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const features: FeatureSlide[] = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Advanced Security',
      description:
        'Our platform implements enterprise-grade encryption, multi-factor authentication, and regular security audits to keep your data safe and protected.',
      color: 'bg-blue-500 text-white',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1970&auto=format&fit=crop',
      imageAlt: 'Security dashboard with encryption metrics',
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: 'AI-Powered Insights',
      description:
        'Leverage machine learning algorithms that analyze your data to provide actionable insights and recommendations for optimizing performance.',
      color: 'bg-purple-500 text-white',
      image:
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1974&auto=format&fit=crop',
      imageAlt: 'AI analytics visualization',
    },
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: 'Customizable Dashboard',
      description:
        'Build your perfect workspace with drag-and-drop widgets, personalized views, and tailored reports that focus on what matters to you.',
      color: 'bg-teal-500 text-white',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Customizable dashboard interface',
    },
    {
      icon: <CloudUpload className="h-6 w-6" />,
      title: 'Seamless Cloud Integration',
      description:
        'Connect with your favorite cloud services for file storage, sharing, and collaboration with just a few clicks.',
      color: 'bg-amber-500 text-white',
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Cloud service integration diagram',
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: 'Real-time Analytics',
      description:
        'Monitor performance metrics in real-time with interactive charts and reports that update automatically as new data comes in.',
      color: 'bg-green-500 text-white',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Real-time analytics dashboard',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Smart Automation',
      description:
        'Create powerful workflows that automate repetitive tasks and processes, saving time and reducing human error.',
      color: 'bg-rose-500 text-white',
      image:
        'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Workflow automation interface',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, autoplay, isAnimating]);

  // Handle next slide
  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % features.length);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Handle previous slide
  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Get previous, current, and next slide indices
  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + features.length) % features.length;
  };

  // Handle dot navigation
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Pause autoplay when user interacts
  const handleUserInteraction = () => {
    setAutoplay(false);

    // Resume autoplay after some inactivity
    const resumeTimeout = setTimeout(() => {
      setAutoplay(true);
    }, 10000);

    return () => clearTimeout(resumeTimeout);
  };

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover our powerful tools
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our key features designed to enhance productivity and
            streamline your workflow.
          </p>
        </div>

        {/* Feature Carousel */}
        <div
          className="relative mt-16"
          onClick={handleUserInteraction}
          onMouseEnter={handleUserInteraction}
        >
          <div className="relative h-[500px] w-full md:h-[600px]">
            {/* Slides */}
            {[-1, 0, 1].map((offset) => {
              const slideIndex = getSlideIndex(offset);
              const slide = features[slideIndex]!;

              return (
                <div
                  key={slideIndex}
                  className={cn(
                    'pointer-events-none absolute top-0 h-full w-full opacity-0 transition-all duration-500 ease-in-out',
                    offset === 0 && 'pointer-events-auto opacity-100',
                    offset === -1 && '-translate-x-full transform',
                    offset === 1 && 'translate-x-full transform'
                  )}
                >
                  <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    {/* Feature Info */}
                    <div className="flex flex-col space-y-6 text-left">
                      <div
                        className={cn(
                          'flex h-16 w-16 items-center justify-center rounded-2xl',
                          slide.color
                        )}
                      >
                        {slide.icon}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">{slide.title}</h3>
                        <p className="text-muted-foreground">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                          <Button asChild className="group">
                            <a href="#">
                              Learn more
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </Button>
                          <Button variant="outline">See demo</Button>
                        </div>
                      </div>
                    </div>

                    {/* Feature Image */}
                    <div className="relative h-full max-h-[350px] overflow-hidden rounded-xl shadow-lg md:max-h-none">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                disabled={isAnimating}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
              </Button>

              <div className="flex items-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      currentSlide === index
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                disabled={isAnimating}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Features Preview */}
        <div className="mt-24">
          <h3 className="mb-8 text-center text-xl font-bold">
            More powerful features
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Laptop className="h-5 w-5" />,
                title: 'Cross-platform Support',
                description:
                  'Access your work from any device with our responsive web app and native applications.',
              },
              {
                icon: <MessagesSquare className="h-5 w-5" />,
                title: 'Team Communication',
                description:
                  'Integrated messaging and commenting system to keep discussions organized and accessible.',
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: 'Reliable Infrastructure',
                description:
                  'Built on enterprise-grade servers with 99.9% uptime guarantee and automated backups.',
              },
              {
                icon: <Code2 className="h-5 w-5" />,
                title: 'Developer API',
                description:
                  'Full access to our API to create custom integrations and extend functionality.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border p-6 transition-all duration-200 hover:shadow-sm"
              >
                <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                  {feature.icon}
                </div>
                <h4 className="mb-2 text-base font-medium">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <a href="#">
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
