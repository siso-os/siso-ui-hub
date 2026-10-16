import { useState, useRef, MouseEvent, TouchEvent } from 'react';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

interface ComparisonFeature {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  improvements: string[];
}

export default function BeforeAfterComparison() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const features: ComparisonFeature[] = [
    {
      id: 'camera',
      title: 'Enhanced Camera System',
      beforeImage:
        'https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=2069&auto=format&fit=crop',
      afterImage:
        'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?q=80&w=2073&auto=format&fit=crop',
      beforeLabel: 'Previous Model',
      afterLabel: 'New Model',
      description:
        'Experience a revolutionary leap in photography with our enhanced camera system, featuring improved low-light performance, higher resolution sensors, and advanced computational photography.',
      improvements: [
        '50% larger sensor captures more light for stunning low-light photos',
        'Improved optical stabilization reduces blur in action shots',
        'Enhanced portrait mode with depth mapping for professional-looking results',
        'Computational photography algorithms produce better colors and details',
      ],
    },
    {
      id: 'design',
      title: 'Refined Design & Materials',
      beforeImage:
        'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2070&auto=format&fit=crop',
      afterImage:
        'https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?q=80&w=2068&auto=format&fit=crop',
      beforeLabel: 'Classic Design',
      afterLabel: 'Modern Design',
      description:
        "We've completely reimagined our product's form factor with premium materials, improved ergonomics, and a sleeker profile that feels better in your hand while maintaining durability.",
      improvements: [
        'Aerospace-grade aluminum provides strength without added weight',
        'Improved ergonomic grip for extended comfortable use',
        '30% thinner profile without compromising battery life',
        'New matte finish resists fingerprints and scratches',
      ],
    },
    {
      id: 'display',
      title: 'Revolutionary Display Technology',
      beforeImage:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=10&w=1000&auto=format&fit=crop&blur=10',
      afterImage:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop',
      beforeLabel: 'Standard Display',
      afterLabel: 'ProMotion XDR',
      description:
        'Our new ProMotion XDR display delivers breathtaking color accuracy, incredible brightness, and smoother motion with adaptive refresh rate technology for an immersive viewing experience.',
      improvements: [
        '120Hz adaptive refresh rate for smoother scrolling and gameplay',
        '1000 nits of brightness for easy viewing in direct sunlight',
        'P3 wide color gamut with 10-bit color depth for true-to-life images',
        'Reduced blue light emission for comfortable extended viewing',
      ],
    },
  ];

  const handleSliderChange = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;

    // Constrain between 0 and 100
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    handleSliderChange(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) {
      handleSliderChange(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: TouchEvent) => {
    isDragging.current = true;
    handleSliderChange(e.touches[0]!.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging.current) {
      handleSliderChange(e.touches[0]!.clientX);
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const nextFeature = () => {
    setActiveFeature((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    setSliderPosition(50); // Reset slider position
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev === 0 ? features.length - 1 : prev - 1));
    setSliderPosition(50); // Reset slider position
  };

  const currentFeature = features[activeFeature]!;

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center space-y-4 text-center md:mb-12">
          <Badge className="px-3.5 py-1.5">Next Generation</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            See the difference innovation makes
          </h2>
          <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Compare our latest advancements with previous generations to
            experience the remarkable evolution of our products.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Feature Navigation */}
          <div className="mb-6 flex flex-col space-y-4 lg:col-span-1 lg:mb-0">
            <h3 className="mb-4 text-lg font-medium">Innovation Highlights</h3>

            {features.map((feature, idx) => (
              <button
                key={feature.id}
                onClick={() => {
                  setActiveFeature(idx);
                  setSliderPosition(50);
                }}
                className={cn(
                  'rounded-lg border px-4 py-3 text-left transition-colors',
                  activeFeature === idx
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted'
                )}
              >
                <div className="font-medium">{feature.title}</div>
                <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  {feature.description.substring(0, 80)}...
                </div>
              </button>
            ))}

            <div className="mt-4 flex space-x-3 lg:hidden">
              <Button variant="outline" size="icon" onClick={prevFeature}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextFeature}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Comparison Slider */}
          <div className="space-y-8 lg:col-span-4">
            <div
              ref={sliderRef}
              className="relative h-[400px] w-full overflow-hidden rounded-lg border select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Before Image (full width) */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src={currentFeature.beforeImage}
                  alt={`Before: ${currentFeature.title}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
                <div className="bg-background/80 text-foreground absolute bottom-4 left-4 rounded-md px-3 py-1 text-sm font-medium backdrop-blur-sm">
                  {currentFeature.beforeLabel}
                </div>
              </div>

              {/* After Image (partial width based on slider) */}
              <div
                className="absolute inset-0 h-full overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentFeature.afterImage}
                  alt={`After: ${currentFeature.title}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
                <div className="bg-primary text-primary-foreground absolute right-4 bottom-4 rounded-md px-3 py-1 text-sm font-medium">
                  {currentFeature.afterLabel}
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 cursor-ew-resize bg-white"
                style={{ left: `${sliderPosition}%`, marginLeft: '-0.5px' }}
              >
                <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
                  <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
                    <div className="flex items-center space-x-0.5">
                      <ArrowLeft className="text-primary-foreground h-3 w-3" />
                      <ArrowRight className="text-primary-foreground h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <div className="bg-muted/50 rounded-lg border p-6">
              <h3 className="mb-4 text-2xl font-bold">
                {currentFeature.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {currentFeature.description}
              </p>

              <h4 className="mb-3 text-sm font-semibold tracking-wide uppercase">
                Key Improvements
              </h4>
              <ul className="space-y-2">
                {currentFeature.improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="bg-primary/10 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                      <div className="bg-primary h-2 w-2 rounded-full" />
                    </div>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4 border-t pt-4 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#">
                    Shop new model
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#">Compare all models</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="mt-8 hidden justify-center space-x-3 lg:flex">
          <Button
            variant="outline"
            onClick={prevFeature}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous feature
          </Button>
          <Button
            variant="outline"
            onClick={nextFeature}
            className="flex items-center gap-2"
          >
            Next feature
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
