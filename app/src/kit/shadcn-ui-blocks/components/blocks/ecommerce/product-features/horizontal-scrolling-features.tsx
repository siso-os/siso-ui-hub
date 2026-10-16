import { useRef } from 'react';

import {
  ArrowRight,
  ArrowLeft,
  Volume2,
  Music,
  Bluetooth,
  Waves,
  Wifi,
  Zap,
} from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

export default function HorizontalScrollingFeatures() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const features = [
    {
      id: 1,
      title: 'Hi-Res Audio',
      description:
        'Experience studio-quality sound with support for 24-bit/192kHz audio formats and lossless playback.',
      icon: <Music className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400',
    },
    {
      id: 2,
      title: '360° Sound Field',
      description:
        'Proprietary acoustic design projects crystal-clear audio in all directions with consistent quality from any listening position.',
      icon: <Volume2 className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
      color:
        'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400',
    },
    {
      id: 3,
      title: 'Multiroom Audio',
      description:
        'Seamlessly synchronize multiple speakers throughout your home for whole-house audio with zero latency.',
      icon: <Waves className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1609702847389-b8aec1b0b929?q=80&w=1926&auto=format&fit=crop',
      color:
        'bg-purple-50 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400',
    },
    {
      id: 4,
      title: 'Adaptive EQ',
      description:
        'Room-sensing technology automatically adjusts audio parameters based on speaker placement and room acoustics.',
      icon: <Bluetooth className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?q=80&w=1974&auto=format&fit=crop',
      color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400',
    },
    {
      id: 5,
      title: 'Voice Assistant',
      description:
        'Built-in microphone array with advanced noise cancellation for reliable voice control from across the room.',
      icon: <Wifi className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1610123598195-eea6b6be4c48?q=80&w=1963&auto=format&fit=crop',
      color:
        'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400',
    },
    {
      id: 6,
      title: 'Fast Charging',
      description:
        '10 hours of playback from a 15-minute charge via USB-C, with up to 50 hours of total battery life.',
      icon: <Zap className="h-6 w-6" />,
      image:
        'https://images.unsplash.com/photo-1558537348-c0f8e733989d?q=80&w=2070&auto=format&fit=crop',
      color:
        'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400',
    },
  ];

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Premium Sound</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Audio engineering excellence
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed">
            Our premium speakers combine innovative technology with
            sophisticated design for an unparalleled listening experience.
          </p>
        </div>

        {/* Main product image */}
        <div className="mb-16 flex justify-center">
          <div className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl border shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=2070&auto=format&fit=crop"
              alt="Premium wireless speaker"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-6 text-white">
                <Badge variant="secondary" className="mb-2">
                  Flagship Model
                </Badge>
                <h3 className="text-2xl font-semibold">SoundSphere X1</h3>
                <p className="mt-1 text-white/80">
                  Where art meets audio engineering
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature navigation buttons */}
        <div className="mb-4 flex justify-end space-x-2 md:pr-6">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Horizontal scrolling features */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide -mx-4 flex snap-x snap-mandatory space-x-4 overflow-x-auto px-4 pb-6 md:-mx-6 md:px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg md:w-[350px]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                        feature.color
                      )}
                    >
                      {feature.icon}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical specs */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Technical specifications</h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium">Speaker Configuration</span>
                <span className="text-muted-foreground">3-way, 5 drivers</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium">Frequency Response</span>
                <span className="text-muted-foreground">28Hz - 22kHz</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium">Maximum Output</span>
                <span className="text-muted-foreground">112dB SPL</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium">Connectivity</span>
                <span className="text-muted-foreground">
                  Wi-Fi, Bluetooth 5.2, AirPlay, Optical
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span className="font-medium">Dimensions</span>
                <span className="text-muted-foreground">
                  8.7&quot; x 6.3&quot; x 6.3&quot;
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">What&apos;s in the box</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>SoundSphere X1 Speaker</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>Power Adapter with Country-Specific Plugs</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>USB-C Charging Cable (1.5m)</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>Optical Audio Cable (1.5m)</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>Quick Start Guide</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary mr-3 h-2 w-2 rounded-full"></div>
                <span>2-Year Warranty Card</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-muted-foreground max-w-[600px]">
            Experience immersive audio like never before with our flagship
            SoundSphere X1 speaker, backed by a 2-year warranty and 60-day
            satisfaction guarantee.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Find a Retailer</a>
            </Button>
          </div>
        </div>

        {/* CSS for hiding scrollbar */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
}
