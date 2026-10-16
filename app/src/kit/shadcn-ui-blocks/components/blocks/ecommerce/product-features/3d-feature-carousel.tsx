import { useState, useRef, useEffect } from 'react';

import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export default function ThreeDFeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const setIsAutoRotating = useState(true)[1];
  const [direction] = useState(1); // 1 for forward, -1 for backward
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const features: Feature[] = [
    {
      id: 'anc',
      title: 'Active Noise Cancellation',
      description:
        'Advanced microphones and proprietary algorithms detect and cancel unwanted noise, allowing you to focus on your music or calls without distractions.',
      image:
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-blue-500/90',
    },
    {
      id: 'sound',
      title: 'Spatial Audio',
      description:
        'Experience immersive, theater-like sound with dynamic head tracking that makes music, movies, and games come alive all around you.',
      image:
        'https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-purple-500/90',
    },
    {
      id: 'battery',
      title: '30-Hour Battery Life',
      description:
        'Enjoy a full day of listening with up to 30 hours of battery life, and quick-charge technology that gives you 3 hours of playback from just 10 minutes of charging.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-green-500/90',
    },
    {
      id: 'comfort',
      title: 'Premium Comfort',
      description:
        'Luxurious memory foam ear cushions wrapped in soft protein leather create a perfect seal while distributing pressure evenly for all-day comfort.',
      image:
        'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2035&auto=format&fit=crop',
      color: 'bg-amber-500/90',
    },
    {
      id: 'connection',
      title: 'Seamless Connection',
      description:
        'Bluetooth 5.3 with multipoint connection allows you to pair with multiple devices and switch between them effortlessly.',
      image:
        'https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=2064&auto=format&fit=crop',
      color: 'bg-rose-500/90',
    },
  ];

  const handleNext = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    stopAutoRotate();
    setActiveIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleDotClick = (index: number) => {
    stopAutoRotate();
    setActiveIndex(index);
  };

  const getPositionStyles = (index: number) => {
    const totalItems = features.length;
    const angleDegree = (2 * Math.PI) / totalItems;
    const radius = containerRef.current
      ? containerRef.current.offsetWidth * 0.35
      : 250;

    // Calculate where this item should be in the carousel
    let positionIndex = (index - activeIndex + totalItems) % totalItems;

    // Adjust the index to make the items flow in order
    if (positionIndex > totalItems / 2) {
      positionIndex = positionIndex - totalItems;
    }

    const angle = positionIndex * angleDegree;

    // Calculate 3D position
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle) - radius;

    // Calculate opacity based on z position
    const opacity = ((z + radius) / (radius * 2)) * 0.8 + 0.2;
    const scale = 0.7 + opacity * 0.3;
    const zIndex = Math.round(opacity * 10);

    // Active item is larger and fully opaque
    if (index === activeIndex) {
      return {
        transform: `translateX(0) translateZ(50px) scale(1.05)`,
        opacity: 1,
        zIndex: 20,
      };
    }

    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  const startAutoRotate = () => {
    setIsAutoRotating(true);
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
    }

    autoRotateTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (direction === 1) {
          return prev === features.length - 1 ? 0 : prev + 1;
        } else {
          return prev === 0 ? features.length - 1 : prev - 1;
        }
      });
    }, 4000);
  };

  const stopAutoRotate = () => {
    setIsAutoRotating(false);
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
  };

  // Start auto rotation on mount and clean up on unmount
  useEffect(() => {
    startAutoRotate();

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current);
      }
    };
  }, [direction]);

  // Current active feature
  const activeFeature = features[activeIndex]!;

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Premium Sound Experience</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover exceptional features
          </h2>
          <p className="text-muted-foreground mb-4 max-w-[700px] md:text-xl/relaxed">
            Our flagship headphones combine cutting-edge technology with premium
            materials for an unparalleled listening experience.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="perspective-1000 relative mb-12 h-[400px] md:h-[500px]">
          <div
            ref={containerRef}
            className="transform-style-3d relative h-full w-full"
          >
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                className={cn(
                  'transform-style-3d absolute top-0 right-0 bottom-0 left-0 mx-auto w-full max-w-[420px] overflow-hidden rounded-xl transition-all duration-700',
                  'border shadow-lg'
                )}
                style={getPositionStyles(idx)}
                onClick={() => handleDotClick(idx)}
              >
                <div className="group bg-card relative h-full cursor-pointer">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  <div className="absolute right-0 bottom-0 left-0 z-20 p-6 text-left">
                    <div
                      className={cn(
                        'mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white',
                        feature.color
                      )}
                    >
                      Feature {idx + 1} of {features.length}
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-white/90">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-4 z-20 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 rounded-full backdrop-blur-sm"
              onClick={handlePrev}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute top-1/2 right-4 z-20 -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 rounded-full backdrop-blur-sm"
              onClick={handleNext}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-[-30px] left-1/2 z-20 flex -translate-x-1/2 space-x-2">
            {features.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-all',
                  activeIndex === idx
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/20 hover:bg-primary/50'
                )}
                onClick={() => handleDotClick(idx)}
              />
            ))}
          </div>
        </div>

        {/* Feature details */}
        <div className="mx-auto max-w-3xl">
          <div className="bg-muted/40 grid items-start gap-6 overflow-hidden rounded-xl border md:grid-cols-5">
            <div className="p-6 md:col-span-3">
              <h3 className="text-2xl font-bold">{activeFeature.title}</h3>
              <p className="text-muted-foreground mt-2">
                {activeFeature.description}
              </p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Adaptive technology adjusts to your environment in real-time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Customizable via the companion app for your perfect sound
                    profile
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Premium materials ensure durability and lasting comfort
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href="#">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="secondary">See all features</Button>
              </div>
            </div>

            <div
              className={cn(
                'hidden items-center justify-center px-6 py-12 text-white md:col-span-2 md:flex',
                activeFeature.color
              )}
            >
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold">
                  {activeIndex === 0 && '40dB'}
                  {activeIndex === 1 && '360°'}
                  {activeIndex === 2 && '30h'}
                  {activeIndex === 3 && '320g'}
                  {activeIndex === 4 && '5.3'}
                </div>
                <div className="text-sm text-white/80">
                  {activeIndex === 0 && 'Noise Reduction'}
                  {activeIndex === 1 && 'Sound Field'}
                  {activeIndex === 2 && 'Playback Time'}
                  {activeIndex === 3 && 'Ultra Lightweight'}
                  {activeIndex === 4 && 'Bluetooth Version'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-20 text-center">
          <h3 className="mb-4 text-2xl font-bold">
            Experience premium sound today
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
            Join thousands of satisfied customers who have elevated their
            listening experience with our flagship headphones.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Shop now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Compare models</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
