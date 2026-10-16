import { useState } from 'react';

import {
  ArrowRight,
  Play,
  Camera,
  MapPin,
  Cpu,
  Clock,
  Battery,
  Wind,
} from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

export default function VideoFeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState('camera');

  const features = {
    camera: {
      title: '4K HDR Camera System',
      description:
        'Cinematic 4K/60fps video capture with 1/1.3" CMOS sensor, 12.7 stops of dynamic range, and advanced color science for professional results in any lighting condition.',
      image:
        'https://images.unsplash.com/photo-1598240087368-5a06c7d81800?q=80&w=2053&auto=format&fit=crop',
      icon: <Camera className="h-5 w-5" />,
      stats: [
        { value: '4K', label: 'Resolution' },
        { value: '60', label: 'FPS' },
        { value: '3-Axis', label: 'Gimbal' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/021/842/original/P1033746.mp4',
    },
    flight: {
      title: 'Intelligent Flight System',
      description:
        'Advanced obstacle detection with omnidirectional sensors and APAS 5.0 technology for smooth, safe navigation through complex environments at speeds up to 42 mph.',
      image:
        'https://images.unsplash.com/photo-1544052362-34c4d73a4ae9?q=80&w=2070&auto=format&fit=crop',
      icon: <Wind className="h-5 w-5" />,
      stats: [
        { value: '42', label: 'MPH Speed' },
        { value: '360°', label: 'Detection' },
        { value: '12', label: 'Sensors' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/051/347/original/Drone-107.mp4',
    },
    tracking: {
      title: 'ActiveTrack 5.0',
      description:
        'Next-generation subject tracking with improved recognition algorithms that can follow subjects with exceptional precision while navigating around obstacles autonomously.',
      image:
        'https://images.unsplash.com/photo-1485849708507-9d0066e5ff22?q=80&w=1973&auto=format&fit=crop',
      icon: <MapPin className="h-5 w-5" />,
      stats: [
        { value: '5.0', label: 'Version' },
        { value: '33ft', label: 'Distance' },
        { value: '10+', label: 'Modes' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/021/329/original/Flying_Above_Beach.mp4',
    },
    processor: {
      title: 'Advanced AI Processor',
      description:
        'Dedicated neural processing unit enables real-time computational photography, autonomous navigation, and intelligent flight features with minimal latency.',
      image:
        'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1974&auto=format&fit=crop',
      icon: <Cpu className="h-5 w-5" />,
      stats: [
        { value: '2.4', label: 'TFLOPS' },
        { value: 'NPU', label: 'AI Engine' },
        { value: '10ms', label: 'Latency' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/052/131/original/Flycam.mp4',
    },
    battery: {
      title: 'Extended Flight Time',
      description:
        'High-capacity intelligent battery with optimized power management provides up to 38 minutes of flight time and real-time monitoring of cell health and status.',
      image:
        'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1974&auto=format&fit=crop',
      icon: <Battery className="h-5 w-5" />,
      stats: [
        { value: '38', label: 'Minutes' },
        { value: '5000', label: 'mAh' },
        { value: 'Fast', label: 'Charging' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/038/250/original/Landscape-59.mp4',
    },
    transmission: {
      title: 'O3+ Video Transmission',
      description:
        'Next-generation transmission system delivers 15km range with 1080p/60fps low-latency feed and strong anti-interference capabilities even in challenging RF environments.',
      image:
        'https://images.unsplash.com/photo-1580835239846-5bb9ce0c949d?q=80&w=1974&auto=format&fit=crop',
      icon: <Clock className="h-5 w-5" />,
      stats: [
        { value: '15', label: 'KM Range' },
        { value: '1080p', label: 'Feed' },
        { value: '120', label: 'MS Latency' },
      ],
      videoSrc:
        'https://static.videezy.com/system/resources/previews/000/038/893/original/Mountains.mp4',
    },
  };

  // Type for accessing features by key
  type FeatureKey = keyof typeof features;

  const selectedFeature = features[activeFeature as FeatureKey];

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Professional Aerial Platform</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Capture the world from above
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed">
            Our flagship drone combines cutting-edge technology with intuitive
            controls for unparalleled aerial imaging capabilities.
          </p>
        </div>

        {/* Main product image */}
        <div className="mb-16 flex justify-center">
          <div className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl border shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop"
              alt="AeroPro X9 Drone"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-black/20">
              <div className="p-6 text-white">
                <Badge variant="secondary" className="mb-2">
                  Latest Model
                </Badge>
                <h3 className="text-2xl font-semibold">AeroPro X9</h3>
                <p className="mt-1 text-white/80">
                  Professional aerial imaging system
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature selector tabs */}
        <div className="mb-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
          {(Object.keys(features) as Array<FeatureKey>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveFeature(key)}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg border p-3 transition-all md:p-4',
                activeFeature === key
                  ? 'bg-primary/10 border-primary/50'
                  : 'hover:bg-muted/60'
              )}
            >
              <div
                className={cn(
                  'mb-2 flex h-10 w-10 items-center justify-center rounded-full',
                  activeFeature === key
                    ? 'bg-primary/20 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {features[key].icon}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  activeFeature === key
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Feature content with video */}
        <div className="mb-16 grid items-center gap-8 md:grid-cols-2">
          {/* Video section */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border shadow-md">
            <video
              src={selectedFeature.videoSrc}
              autoPlay
              muted
              loop
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
              <Badge
                variant="outline"
                className="mb-2 border-white/20 bg-black/50 text-white"
              >
                Featured Technology
              </Badge>
            </div>
            <button className="bg-primary/30 border-primary/50 group hover:bg-primary/50 absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border backdrop-blur-sm transition-all">
              <Play className="h-6 w-6 fill-white text-white" />
            </button>
          </div>

          {/* Feature details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{selectedFeature.title}</h3>
              <p className="text-muted-foreground">
                {selectedFeature.description}
              </p>
            </div>

            {/* Feature stats */}
            <div className="grid grid-cols-3 gap-4">
              {selectedFeature.stats.map((stat, i) => (
                <div key={i} className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground text-xs tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button asChild>
              <a href="#">
                Learn more about this feature
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Highlight feature cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-4 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-950/20 dark:to-blue-900/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">1-inch CMOS Sensor</h3>
            <p className="text-muted-foreground">
              Larger sensor captures more light for better low-light performance
              and greater dynamic range in challenging conditions.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border bg-gradient-to-br from-amber-50 to-amber-100 p-6 dark:from-amber-950/20 dark:to-amber-900/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Autonomous Navigation</h3>
            <p className="text-muted-foreground">
              Advanced obstacle avoidance and terrain following algorithms
              enable confident flight even in complex environments.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 dark:from-emerald-950/20 dark:to-emerald-900/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Battery className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">Intelligent Battery</h3>
            <p className="text-muted-foreground">
              Smart power management with real-time monitoring and predictive
              algorithms for optimized flight time and battery longevity.
            </p>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-muted-foreground max-w-[600px]">
            Experience unparalleled aerial imaging with the AeroPro X9 drone,
            backed by our 2-year warranty and comprehensive pilot training
            program.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Pre-order Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Watch Demo Reel</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
