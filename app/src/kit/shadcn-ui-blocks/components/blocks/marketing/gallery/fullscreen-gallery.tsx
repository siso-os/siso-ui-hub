import * as React from 'react';
import { cn } from '@/arc-shims/kit-utils';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
  MinimizeIcon,
} from 'lucide-react';
import { Button } from '../../../ui/button';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function FullscreenGallery() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const galleryRef = React.useRef<HTMLDivElement>(null);

  // Static images array
  const images: GalleryImage[] = [
    {
      src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1470&auto=format&fit=crop',
      alt: 'Emerald lake surrounded by forest and mountains',
      width: 1470,
      height: 980,
    },
    {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop',
      alt: 'Majestic mountain peaks with snow and clouds',
      width: 1470,
      height: 980,
    },
    {
      src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1374&auto=format&fit=crop',
      alt: 'Powerful waterfall flowing through lush greenery',
      width: 1374,
      height: 916,
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1474&auto=format&fit=crop',
      alt: 'Foggy forest with sunlight streaming through trees',
      width: 1474,
      height: 982,
    },
    {
      src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1470&auto=format&fit=crop',
      alt: 'Serene mountain lake reflecting snow-capped peaks',
      width: 1470,
      height: 980,
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle fullscreen toggling
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (galleryRef.current?.requestFullscreen) {
        galleryRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      } else if (e.key === 'f') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div
      ref={galleryRef}
      className={cn(
        'relative w-full overflow-hidden bg-black',
        isFullscreen ? 'h-screen' : 'aspect-video rounded-lg'
      )}
    >
      {/* Progress bar */}
      <div className="absolute top-0 right-0 left-0 z-10 h-1 bg-black/20">
        <div
          className="h-full bg-white"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div>

      {/* Images */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className={cn(
              'absolute inset-0 transition-all duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Controls - centered at the bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-4 text-white">
        <div className="text-xs text-white/70">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Button size="icon" onClick={prevSlide}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          <Button size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <MinimizeIcon className="h-5 w-5" />
            ) : (
              <ExpandIcon className="h-5 w-5" />
            )}
          </Button>

          <Button size="icon" onClick={nextSlide}>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-3 max-w-md text-center">
          <p className="sr-only">{images[currentIndex]!.alt}</p>
        </div>
      </div>
    </div>
  );
}
