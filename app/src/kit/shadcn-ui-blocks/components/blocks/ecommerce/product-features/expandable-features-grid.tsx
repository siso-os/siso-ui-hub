import { useState } from 'react';

import { ArrowRight, Plus, Minus } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

export default function ExpandableFeaturesGrid() {
  // State to track which feature is expanded
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const features = [
    {
      id: 1,
      title: 'Advanced Noise Cancellation',
      description:
        'Industry-leading ANC technology blocks out surrounding noise for immersive listening.',
      expandedDescription:
        'Our proprietary noise cancellation algorithm analyzes sound 200 times per second to create the perfect anti-noise wave, effectively canceling both constant background noise and sudden loud sounds. The dual microphone array works in tandem to provide up to 35dB of noise reduction across a wide frequency range.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Premium Audio Drivers',
      description:
        'Custom-engineered 40mm drivers deliver rich, detailed audio across the frequency spectrum.',
      expandedDescription:
        'Our custom-designed 40mm dynamic drivers feature a titanium-coated diaphragm for lightning-fast response and minimal distortion. The acoustic chamber is precision-tuned to enhance bass response while maintaining clarity in the mid and high ranges. Frequency response ranges from 4Hz to 40kHz, exceeding high-resolution audio standards.',
      image:
        'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2070&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Multi-Device Connectivity',
      description:
        'Seamlessly connect and switch between multiple devices without interruptions.',
      expandedDescription:
        "Our advanced Bluetooth 5.3 chipset supports simultaneous connection to two devices, allowing you to effortlessly switch between your phone, tablet, or laptop with just a tap. The intelligent pairing system remembers up to 8 devices and automatically connects to your most frequently used ones. With aptX HD, aptX Low Latency, and AAC codec support, you'll get the best audio quality regardless of your device.",
      image:
        'https://images.unsplash.com/photo-1563770660582-377e2030888a?q=80&w=2070&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Adaptive EQ',
      description:
        'Automatically adjusts audio equalization based on your listening environment and preferences.',
      expandedDescription:
        "Our Adaptive EQ technology uses microphones to continuously monitor the audio seal created by the ear cushions and automatically tunes the low and mid frequencies to compensate for variations in fit. The companion app allows you to select from 5 preset EQ settings or create your own custom profile with the 10-band equalizer. Your preferences are saved to the headphones and applied regardless of which device you're using.",
      image:
        'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=2075&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M2 10V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v5" />
          <path d="M2 10v9c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-9" />
          <path d="M6 14v-4" />
          <path d="M10 14V6" />
          <path d="M14 14v-4" />
          <path d="M18 14V6" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Extended Battery Life',
      description:
        'Up to 30 hours of playback with ANC enabled, and a quick 15-minute charge for 5 hours of use.',
      expandedDescription:
        'The integrated lithium-polymer battery delivers up to 30 hours of playback with noise cancellation enabled and up to 40 hours with it disabled. Our fast-charging technology provides 5 hours of playback from just a 15-minute charge. The intelligent power management system preserves battery by automatically detecting when the headphones are removed and entering a low-power standby mode. Battery health monitoring in the app ensures optimal performance over time.',
      image:
        'https://images.unsplash.com/photo-1606143134196-4b3e6d1d4d27?q=80&w=2070&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
          <line x1="22" x2="22" y1="11" y2="13" />
          <line x1="6" x2="6" y1="11" y2="13" />
          <line x1="10" x2="10" y1="11" y2="13" />
          <line x1="14" x2="14" y1="11" y2="13" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Premium Comfort',
      description:
        'Lightweight design with memory foam ear cushions and adjustable headband for all-day wear.',
      expandedDescription:
        "The headband frame uses a lightweight but durable magnesium alloy structure that applies minimal clamping force while maintaining a secure fit. The ear cushions are covered in ultra-soft protein leather and filled with slow-rebound memory foam that adapts to your ear shape. The innovative weight distribution system spreads pressure evenly across the headband, while the rotating ear cups ensure a perfect fit for any head shape. At just 250 grams, you'll barely notice you're wearing them even after hours of use.",
      image:
        'https://images.unsplash.com/photo-1618562629342-c1a720af5b5e?q=80&w=2072&auto=format&fit=crop',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M8 2c0 2-2 3-2 5v10c0 2 2 3 2 3 0 0 1-1 2-1s3 1 3 1c0 0 0-1 1-1 2 0 3 1 3 1s1-1 3-1 2 1 2 1c0 0 2-1 2-3V7c0-2-2-3-2-5-7 0-14 0-14 0Z" />
          <path d="M16 19c0 1 2 2 2 2" />
          <path d="M8 19c0 1-2 2-2 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background relative w-full overflow-hidden py-12 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="bg-primary/5 absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-70 blur-3xl" />
      <div className="bg-primary/5 absolute -bottom-24 -left-24 h-96 w-96 rounded-full opacity-70 blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Premium Audio</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Experience sound like never before
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-xl/relaxed">
            Our flagship headphones combine cutting-edge technology with premium
            materials for unparalleled audio performance.
          </p>
        </div>

        {/* Product image */}
        <div className="mb-16 flex justify-center">
          <div className="relative aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl border shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop"
              alt="Premium wireless headphones"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
              <div className="p-6 text-white">
                <p className="text-sm font-medium md:text-base">
                  Crafted with precision for audiophiles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable features grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                'bg-card text-card-foreground overflow-hidden rounded-xl border transition-all duration-300',
                expandedId === feature.id
                  ? 'shadow-lg sm:col-span-2 lg:col-span-3'
                  : 'cursor-pointer hover:shadow-md'
              )}
              onClick={() =>
                expandedId !== feature.id && toggleExpand(feature.id)
              }
            >
              {expandedId === feature.id ? (
                <div className="grid gap-4 p-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>

                    <p className="text-muted-foreground">
                      {feature.expandedDescription}
                    </p>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(feature.id);
                      }}
                    >
                      <Minus className="mr-2 h-4 w-4" />
                      Show less
                    </Button>
                  </div>

                  <div className="relative aspect-video overflow-hidden rounded-lg border">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(feature.id);
                      }}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Details
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-4">
          <p className="text-muted-foreground max-w-[600px] text-center">
            Experience premium sound quality with our flagship headphones,
            backed by our 2-year warranty and 30-day satisfaction guarantee.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Explore All Features</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
