import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ArrowRight, ChevronRight, Code2, ExternalLink, Maximize2, Pause, Play, Settings, Share2, Volume2, VolumeX, Zap } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';

import type { ComponentType, SVGProps } from 'react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  videoThumbnail: string;
  videoPlaceholder: string;
  videoUrl: string; // In a real implementation, this would be a actual video URL
  videoDuration: string;
}

const features: Feature[] = [
  {
    id: 'easy-setup',
    title: 'Quick Setup',
    description:
      'Get started in minutes with our intuitive onboarding process and user-friendly interface.',
    icon: Zap,
    videoThumbnail:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Setup wizard showing a step-by-step process',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '1:42',
  },
  {
    id: 'advanced-customization',
    title: 'Advanced Customization',
    description:
      'Tailor the platform to your specific needs with extensive customization options and flexible settings.',
    icon: Settings,
    videoThumbnail:
      'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder:
      'Customization interface with various settings being adjusted',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '2:17',
  },
  {
    id: 'code-integration',
    title: 'Seamless Integration',
    description:
      'Integrate with your existing tools and workflows using our comprehensive API and pre-built connectors.',
    icon: Code2,
    videoThumbnail:
      'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Code editor showing API integration example',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '3:05',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with real-time collaboration features and robust sharing capabilities.',
    icon: Share2,
    videoThumbnail:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    videoPlaceholder: 'Multiple users collaborating on a shared document',
    videoUrl: '#', // Placeholder for demo purposes
    videoDuration: '2:51',
  },
];

export default function FeatureVideos() {
  const [activeFeature, setActiveFeature] = useState(features[0]!.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentFeature =
    features.find((f) => f.id === activeFeature) || features[0]!;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the video playback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would control the video audio
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, this would toggle fullscreen mode
  };

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          See our features in action
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Watch detailed video demonstrations of our powerful platform
          capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6 lg:col-span-1">
          <div className="space-y-4">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={cn(
                  'cursor-pointer p-0 transition-all hover:shadow-md',
                  activeFeature === feature.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                )}
                onClick={() => {
                  setActiveFeature(feature.id);
                  setIsPlaying(false);
                }}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div
                    className={cn(
                      'rounded-lg p-2',
                      activeFeature === feature.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {feature.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Play className="mr-1 h-3 w-3" />
                        {feature.videoDuration}
                      </Badge>
                      {activeFeature === feature.id && (
                        <span className="text-primary text-xs font-medium">
                          Currently viewing
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href="#">
              View all feature videos <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border">
            <div className="relative aspect-video bg-black">
              {/* Video Thumbnail/Placeholder */}
              <img
                src={currentFeature.videoThumbnail}
                alt={currentFeature.videoPlaceholder}
                className={cn(
                  'object-cover transition-opacity duration-300',
                  isPlaying ? 'opacity-0' : 'opacity-100'
                )}
              />

              {/* Play Button Overlay (visible when not playing) */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40"
                  onClick={togglePlay}
                >
                  <div className="bg-primary/90 hover:bg-primary text-primary-foreground flex h-16 w-16 scale-100 transform items-center justify-center rounded-full transition-transform hover:scale-105 md:h-20 md:w-20">
                    <Play className="h-8 w-8 md:h-10 md:w-10" />
                  </div>
                </div>
              )}

              {/* Video Controls (visible when playing) */}
              {isPlaying && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      <Pause className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={toggleFullscreen}
                      >
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Video Progress Bar */}
                  <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-white/30">
                    <div className="bg-primary absolute inset-y-0 left-0 w-[25%]" />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-muted/20 border-t p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentFeature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentFeature.description}
                  </p>
                </div>
                <Button asChild className="md:flex-shrink-0">
                  <a href="#">
                    Try this feature <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted mt-8 rounded-xl p-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Want to see more?</h3>
            <p className="text-muted-foreground">
              Schedule a live demonstration with one of our product experts.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="#">
              Book a demo <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
