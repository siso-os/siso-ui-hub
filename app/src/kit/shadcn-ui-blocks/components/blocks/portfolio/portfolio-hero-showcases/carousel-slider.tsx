import { useEffect, useState } from 'react';
import { Button } from '../../../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=2274&auto=format&fit=crop&ixlib=rb-4.0.3',
    title: 'Web Design Portfolio',
    description:
      'Clean, modern interfaces that prioritize user experience and functionality',
    tag: 'UI/UX Design',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    title: 'Branding & Identity',
    description:
      'Crafting memorable brand identities that tell your unique story',
    tag: 'Brand Design',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
    title: 'Photography Projects',
    description: 'Capturing moments and emotions through a creative lens',
    tag: 'Photography',
  },
];

export default function PortfolioHeroCarouselSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slide images with animation */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover"
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-end p-4 pb-16 text-white sm:p-8 md:p-12">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="bg-primary inline-block rounded-full px-3 py-1 text-sm font-medium">
                {slides[currentIndex]!.tag}
              </span>
            </div>

            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              {slides[currentIndex]!.title}
            </h1>

            <p className="mt-4 text-lg text-white/80 sm:text-xl md:max-w-2xl">
              {slides[currentIndex]!.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" className="min-w-[150px]">
                View Projects
              </Button>

              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                  onClick={goToPrev}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-white/40 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <div className="ml-3 text-sm text-white/80">
                  {currentIndex + 1} / {slides.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
