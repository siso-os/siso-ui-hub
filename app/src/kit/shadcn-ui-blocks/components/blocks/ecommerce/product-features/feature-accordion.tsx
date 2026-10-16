import { Button } from '../../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { ChevronRight } from 'lucide-react';

export default function FeatureAccordion() {
  const features = [
    {
      id: 'feature-1',
      title: 'Swiss-Made Movement',
      description:
        'Each timepiece is powered by a precision Swiss movement, renowned for its accuracy and reliability.',
      details: [
        'Self-winding automatic mechanism',
        '28,800 vibrations per hour for smooth second hand movement',
        'Power reserve of up to 48 hours',
        '21 jewel bearings reducing friction and wear',
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: 'feature-2',
      title: 'Scratch-Resistant Sapphire Crystal',
      description:
        'Protected by one of the hardest materials on earth, your watch face remains pristine through daily wear.',
      details: [
        'Virtually scratch-proof with 9 on the Mohs hardness scale',
        'Anti-reflective coating for optimal visibility',
        'UV-resistant to prevent discoloration',
        '2.5mm thickness for enhanced durability',
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M6 2L2 6l16 16 4-4L6 2z" />
          <path d="M10 6l4 4" />
        </svg>
      ),
    },
    {
      id: 'feature-3',
      title: '316L Stainless Steel Case',
      description:
        'Crafted from premium marine-grade stainless steel for exceptional durability and a luxurious finish.',
      details: [
        'Corrosion-resistant in saltwater environments',
        'Hypoallergenic material for sensitive skin',
        'Polished to a mirror finish with precision detailing',
        'Maintains integrity in extreme temperatures',
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        </svg>
      ),
    },
    {
      id: 'feature-4',
      title: 'Water Resistance to 200M',
      description:
        'Engineered for serious water exposure, from swimming to professional marine activities.',
      details: [
        'Triple-sealed screw-down crown',
        'Double-gasket system for enhanced sealing',
        'Pressure-tested beyond standard requirements',
        'Suitable for diving, snorkeling, and water sports',
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      id: 'feature-5',
      title: 'Italian Leather Strap',
      description:
        'Hand-selected premium calfskin leather, tanned and crafted by skilled artisans in Italy.',
      details: [
        'Full-grain leather that develops a beautiful patina over time',
        'Hand-stitched with waxed thread for durability',
        'Quick-release spring bars for easy strap changes',
        'Vegetable-tanned using traditional methods',
      ],
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 2c3 0 7 1.3 7 4v9.7a5.8 5.8 0 1 1-11.6 0V6c0-2.7 4-4 7-4z" />
          <path d="M5 10v4.3a6.3 6.3 0 0 0 12.6 0V10" />
          <path d="M5 13h12" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Left column - Feature image */}
          <div className="bg-background relative overflow-hidden rounded-xl border p-2">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2071&auto=format&fit=crop"
                alt="Luxury watch with leather strap"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset"></div>
            </div>
            <div className="bg-primary/30 absolute -bottom-6 -left-6 h-24 w-24 rounded-full blur-2xl"></div>
            <div className="bg-primary/30 absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl"></div>
          </div>

          {/* Right column - Feature accordion */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm">
                Exceptional Craftsmanship
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Precision engineered for the discerning collector
              </h2>
              <p className="text-muted-foreground max-w-[600px]">
                Discover the extraordinary features that make our timepieces
                worthy of passing down through generations.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {features.map((feature) => (
                <AccordionItem key={feature.id} value={feature.id}>
                  <AccordionTrigger className="group">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors">
                        {feature.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-medium">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4 pl-[52px]">
                      <p className="text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ChevronRight className="text-primary mt-1 h-4 w-4 shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Shop Collection</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">Book Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
