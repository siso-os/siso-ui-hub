import { useState } from 'react';

import {
  ArrowRight,
  Sparkles,
  Code2,
  Zap,
  Shield,
  LineChart,
  PanelTop,
} from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

export default function FeatureTabsNavigation() {
  const [activeTab, setActiveTab] = useState('design');

  const featureCategories = [
    {
      id: 'design',
      label: 'Design',
      icon: <Sparkles className="mr-2 h-4 w-4" />,
      title: 'Sleek Modern Design',
      description:
        "Our flagship laptop combines premium materials with thoughtful engineering, resulting in a device that's both beautiful and functional.",
      image:
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop',
      features: [
        {
          title: 'Premium Aluminum Chassis',
          description:
            'Precision CNC-machined from a single block of aerospace-grade aluminum for exceptional durability and thermal efficiency.',
          icon: <PanelTop className="h-5 w-5" />,
        },
        {
          title: 'Edge-to-Edge Display',
          description:
            'Immersive 16-inch OLED display with 4K resolution, 100% DCI-P3 color gamut, and ultra-thin bezels for maximum viewing area.',
          icon: <Sparkles className="h-5 w-5" />,
        },
        {
          title: 'Backlit Keyboard',
          description:
            'Full-sized backlit keyboard with 1.5mm key travel, ambient light sensor, and spill-resistant design for comfortable typing in any environment.',
          icon: <Sparkles className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <Zap className="mr-2 h-4 w-4" />,
      title: 'Exceptional Performance',
      description:
        'State-of-the-art components and advanced thermal architecture deliver outstanding performance for demanding creative and professional workflows.',
      image:
        'https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?q=80&w=2070&auto=format&fit=crop',
      features: [
        {
          title: 'Next-Gen Processor',
          description:
            'Latest generation 5nm processor with up to 16 cores and advanced AI acceleration for blazing-fast performance with exceptional power efficiency.',
          icon: <Zap className="h-5 w-5" />,
        },
        {
          title: 'Professional Graphics',
          description:
            'Discrete GPU with 16GB dedicated memory, ray-tracing cores, and AI-assisted rendering for exceptional creative performance.',
          icon: <LineChart className="h-5 w-5" />,
        },
        {
          title: 'Advanced Cooling',
          description:
            'Innovative vapor chamber cooling system with dual fans and liquid metal thermal interface for sustained peak performance under heavy loads.',
          icon: <Zap className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      icon: <Shield className="mr-2 h-4 w-4" />,
      title: 'Enterprise-Grade Security',
      description:
        'Comprehensive security features protect your data and privacy with multiple layers of hardware and software protection.',
      image:
        'https://images.unsplash.com/photo-1563387852576-964bc31b73af?q=80&w=2070&auto=format&fit=crop',
      features: [
        {
          title: 'Secure Boot',
          description:
            'Hardware-based secure boot process with dedicated security chip ensures only trusted software runs at startup.',
          icon: <Shield className="h-5 w-5" />,
        },
        {
          title: 'Biometric Authentication',
          description:
            'Precision fingerprint sensor and infrared camera system for fast, secure multi-factor authentication.',
          icon: <Shield className="h-5 w-5" />,
        },
        {
          title: 'Data Encryption',
          description:
            'Full-disk encryption with hardware acceleration for zero-impact security, plus encrypted secure enclave for sensitive credentials.',
          icon: <Shield className="h-5 w-5" />,
        },
      ],
    },
    {
      id: 'connectivity',
      label: 'Connectivity',
      icon: <Code2 className="mr-2 h-4 w-4" />,
      title: 'Next-Gen Connectivity',
      description:
        'Stay connected with the latest wireless standards and versatile port selection for seamless integration with all your devices and accessories.',
      image:
        'https://images.unsplash.com/photo-1625480860249-be231806e6ed?q=80&w=2070&auto=format&fit=crop',
      features: [
        {
          title: 'Versatile I/O Ports',
          description:
            'Three Thunderbolt 4 ports, HDMI 2.1, USB-A, SD card reader, and 3.5mm audio jack for universal compatibility.',
          icon: <Code2 className="h-5 w-5" />,
        },
        {
          title: 'Next-Gen Wi-Fi',
          description:
            'Wi-Fi 6E provides faster speeds, greater capacity, and lower latency when connected to compatible networks.',
          icon: <Code2 className="h-5 w-5" />,
        },
        {
          title: 'Bluetooth 5.3',
          description:
            'Latest Bluetooth standard for reliable wireless connectivity with headphones, speakers, and accessories with improved range and audio quality.',
          icon: <Code2 className="h-5 w-5" />,
        },
      ],
    },
  ];

  // Find the active category
  const activeCategory =
    featureCategories.find((cat) => cat.id === activeTab) ||
    featureCategories[0]!;

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center space-y-4 text-center">
          <Badge variant="outline" className="px-3.5 py-1.5">
            Ultimate Productivity
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Designed for professionals
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-xl/relaxed lg:text-center">
            Our flagship laptop delivers exceptional performance, stunning
            design, and advanced features for creatives and professionals.
          </p>
        </div>

        <Tabs
          defaultValue="design"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8 w-full"
        >
          <div className="mb-8 flex justify-center">
            <TabsList className="grid h-auto w-full max-w-3xl p-1 sm:grid-cols-2 md:grid-cols-4">
              {featureCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center py-3"
                >
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Main product image */}
          <div className="mb-12 overflow-hidden rounded-xl border">
            <img
              src={activeCategory.image}
              alt={`${activeCategory.label} feature showcase`}
              width={1200}
              height={600}
              className="h-[300px] w-full object-cover transition-all duration-500 md:h-[500px]"
            />
          </div>

          {featureCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="data-[state=active]:animate-in data-[state=active]:fade-in-50 mt-0"
            >
              <div className="mb-12 grid items-center gap-12 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                  <Button asChild>
                    <a href="#">
                      Learn more about {category.label.toLowerCase()} features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="space-y-6">
                  {category.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/40 flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className="bg-primary/10 text-primary mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-medium">
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Specs section */}
        <div className="mt-12 border-t pt-12">
          <h3 className="mb-8 text-center text-xl font-semibold">
            Technical Specifications
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-lg border p-4 text-center">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                Processor
              </h4>
              <p className="font-medium">16-core CPU</p>
              <p className="text-muted-foreground text-sm">5nm architecture</p>
            </div>

            <div className="space-y-2 rounded-lg border p-4 text-center">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                Memory
              </h4>
              <p className="font-medium">Up to 64GB</p>
              <p className="text-muted-foreground text-sm">LPDDR5X</p>
            </div>

            <div className="space-y-2 rounded-lg border p-4 text-center">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                Storage
              </h4>
              <p className="font-medium">Up to 8TB</p>
              <p className="text-muted-foreground text-sm">PCIe Gen 4 SSD</p>
            </div>

            <div className="space-y-2 rounded-lg border p-4 text-center">
              <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                Battery Life
              </h4>
              <p className="font-medium">Up to 22 hours</p>
              <p className="text-muted-foreground text-sm">Fast charging</p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Configure yours
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">View all specs</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
