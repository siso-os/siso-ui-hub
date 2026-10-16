import { useRef, useState, useEffect } from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

import {
  ArrowLeft,
  ArrowRight,
  BarChart2,
  CloudCog,
  Code2,
  Compass,
  CreditCard,
  Globe,
  HardDrive,
  MessageSquare,
  PanelLeft,
  PieChart,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Target,
  Users,
  Zap,
} from 'lucide-react';

interface IconItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  category: string;
}

export default function HorizontalScrollingIcons() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const iconItems: IconItem[] = [
    {
      id: 'security',
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Enterprise Security',
      description:
        'Advanced protection with encryption, regular audits, and compliance controls.',
      color: 'bg-blue-100 border-blue-200 text-blue-700',
      category: 'security',
    },
    {
      id: 'performance',
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description:
        'Optimized for speed with sub-second response times and efficient processing.',
      color: 'bg-amber-100 border-amber-200 text-amber-700',
      category: 'performance',
    },
    {
      id: 'responsive',
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Fully Responsive',
      description:
        'Seamless experience across all devices, from mobile to desktop.',
      color: 'bg-green-100 border-green-200 text-green-700',
      category: 'design',
    },
    {
      id: 'analytics',
      icon: <BarChart2 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description:
        'Comprehensive data insights with visual reporting and trend analysis.',
      color: 'bg-purple-100 border-purple-200 text-purple-700',
      category: 'data',
    },
    {
      id: 'payments',
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Secure Payments',
      description:
        'PCI-compliant payment processing with multiple gateway options.',
      color: 'bg-indigo-100 border-indigo-200 text-indigo-700',
      category: 'finance',
    },
    {
      id: 'global',
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Reach',
      description:
        'Multilingual support with localized content and regional compliance.',
      color: 'bg-cyan-100 border-cyan-200 text-cyan-700',
      category: 'global',
    },
    {
      id: 'integration',
      icon: <Code2 className="h-6 w-6" />,
      title: 'API Integration',
      description:
        'Connect with your existing tools via our comprehensive API.',
      color: 'bg-rose-100 border-rose-200 text-rose-700',
      category: 'technical',
    },
    {
      id: 'support',
      icon: <MessageSquare className="h-6 w-6" />,
      title: '24/7 Support',
      description:
        'Round-the-clock assistance from our dedicated support team.',
      color: 'bg-orange-100 border-orange-200 text-orange-700',
      category: 'support',
    },
    {
      id: 'cloud',
      icon: <CloudCog className="h-6 w-6" />,
      title: 'Cloud Hosting',
      description:
        'Reliable infrastructure with auto-scaling and high availability.',
      color: 'bg-slate-100 border-slate-200 text-slate-700',
      category: 'technical',
    },
    {
      id: 'team',
      icon: <Users className="h-6 w-6" />,
      title: 'Team Collaboration',
      description:
        'Tools for seamless teamwork, sharing, and project management.',
      color: 'bg-teal-100 border-teal-200 text-teal-700',
      category: 'collaboration',
    },
    {
      id: 'backup',
      icon: <RotateCcw className="h-6 w-6" />,
      title: 'Automatic Backups',
      description:
        'Scheduled data backups with point-in-time recovery options.',
      color: 'bg-pink-100 border-pink-200 text-pink-700',
      category: 'security',
    },
    {
      id: 'dashboard',
      icon: <PanelLeft className="h-6 w-6" />,
      title: 'Custom Dashboard',
      description:
        'Personalized workspace with configurable widgets and views.',
      color: 'bg-emerald-100 border-emerald-200 text-emerald-700',
      category: 'design',
    },
    {
      id: 'reporting',
      icon: <PieChart className="h-6 w-6" />,
      title: 'Dynamic Reports',
      description:
        'Generate custom reports with advanced filtering and export options.',
      color: 'bg-red-100 border-red-200 text-red-700',
      category: 'data',
    },
    {
      id: 'tracking',
      icon: <Target className="h-6 w-6" />,
      title: 'Goal Tracking',
      description:
        'Set, monitor, and achieve business objectives with progress metrics.',
      color: 'bg-violet-100 border-violet-200 text-violet-700',
      category: 'performance',
    },
    {
      id: 'storage',
      icon: <HardDrive className="h-6 w-6" />,
      title: 'Secure Storage',
      description: 'Encrypted data storage with flexible retention policies.',
      color: 'bg-gray-100 border-gray-200 text-gray-700',
      category: 'security',
    },
    {
      id: 'navigation',
      icon: <Compass className="h-6 w-6" />,
      title: 'Intuitive Navigation',
      description:
        'User-friendly interface designed for efficiency and clarity.',
      color: 'bg-blue-100 border-blue-200 text-blue-700',
      category: 'design',
    },
  ];

  // Extract unique categories for filtering
  const categories = [
    'all',
    ...Array.from(new Set(iconItems.map((item) => item.category))),
  ];

  // Filter icons based on active category
  const filteredIcons =
    activeCategory === 'all'
      ? iconItems
      : iconItems.filter((item) => item.category === activeCategory);

  // Update scroll position and max scroll width
  useEffect(() => {
    const updateScrollValues = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setScrollPosition(scrollLeft);
        setMaxScroll(scrollWidth - clientWidth);
      }
    };

    updateScrollValues();

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollValues);
      window.addEventListener('resize', updateScrollValues);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollValues);
        window.removeEventListener('resize', updateScrollValues);
      }
    };
  }, [activeCategory, filteredIcons]);

  // Handle scroll buttons
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(maxScroll, scrollPosition + scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  // Mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    if (scrollContainerRef.current) {
      const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Packed with powerful features
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our comprehensive suite of features designed to enhance your
            productivity and streamline your workflow.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Horizontal Scrolling Container with Navigation */}
        <div className="relative mt-10 pb-4">
          {/* Left Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'bg-background absolute top-1/2 -left-3 z-10 -translate-y-1/2 transform rounded-full shadow-md',
              scrollPosition <= 5 && 'cursor-not-allowed opacity-50'
            )}
            onClick={() => scroll('left')}
            disabled={scrollPosition <= 5}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>

          {/* Scrollable Items Container */}
          <div
            ref={scrollContainerRef}
            className={cn(
              'scrollbar-hide flex overflow-x-auto px-1 py-4',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            <div className="flex gap-4 px-3">
              {filteredIcons.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'w-[280px] flex-shrink-0 rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md',
                    item.color
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-muted text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className={cn(
              'bg-background absolute top-1/2 -right-3 z-10 -translate-y-1/2 transform rounded-full shadow-md',
              scrollPosition >= maxScroll - 5 && 'cursor-not-allowed opacity-50'
            )}
            onClick={() => scroll('right')}
            disabled={scrollPosition >= maxScroll - 5}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>

          {/* Scroll Indicators/Dots */}
          <div className="mt-6 flex justify-center space-x-1">
            {Array.from({ length: Math.ceil(maxScroll / 300) + 1 }).map(
              (_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    scrollPosition >= index * 300 &&
                      scrollPosition < (index + 1) * 300
                      ? 'bg-primary w-4'
                      : 'bg-muted-foreground/30'
                  )}
                />
              )
            )}
          </div>
        </div>

        {/* Feature Highlight */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="bg-primary/10 mb-4 inline-flex items-center justify-center rounded-full p-1 px-3">
              <span className="text-primary text-sm font-medium">
                Why choose our platform?
              </span>
            </div>
            <h3 className="mb-4 text-2xl font-bold">
              All the tools you need in one place
            </h3>
            <p className="text-muted-foreground mb-8">
              Our comprehensive platform brings together all the essential
              features you need to succeed. From powerful analytics to seamless
              integrations, we&apos;ve got you covered.
            </p>
            <Button asChild className="group">
              <a href="#">
                Explore all features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
