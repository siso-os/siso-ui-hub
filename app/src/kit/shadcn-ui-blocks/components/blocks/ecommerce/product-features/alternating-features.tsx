import { Button } from '../../../ui/button';

export default function AlternatingFeatures() {
  const features = [
    {
      title: 'Immersive Sound Experience',
      description:
        'Advanced acoustic architecture with precision-tuned drivers delivers stunning clarity and depth. Experience music as the artist intended with detailed highs, rich mids, and powerful bass response.',
      image:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop',
      alt: 'Premium headphones with acoustic detail',
      align: 'right',
    },
    {
      title: 'Active Noise Cancellation',
      description:
        'Our proprietary noise cancellation technology uses multiple microphones to monitor unwanted ambient sounds and counteract them with equal anti-noise. Enjoy music in noisy environments without raising the volume.',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2069&auto=format&fit=crop',
      alt: 'Noise cancellation technology visualization',
      align: 'left',
    },
    {
      title: 'Premium Materials & Comfort',
      description:
        'Crafted with memory foam ear cushions covered in buttery-soft leather and a lightweight yet durable aluminum frame. Designed for extended listening sessions without fatigue or discomfort.',
      image:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop',
      alt: 'Premium headphone materials close-up',
      align: 'right',
    },
    {
      title: '30-Hour Battery Life',
      description:
        "Extended listening time with up to 30 hours of playback on a single charge. Quick-charge technology provides 5 hours of playback with just 10 minutes of charging when you're in a hurry.",
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
      alt: 'Headphones with battery indicator',
      align: 'left',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-sm">
              Premium Audio Technology
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience sound like never before
            </h2>
            <p className="text-muted-foreground max-w-[800px] md:text-xl/relaxed">
              Our flagship headphones combine cutting-edge technology with
              premium materials to deliver an exceptional listening experience.
            </p>
          </div>
        </div>

        <div className="mt-16 space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col gap-8 lg:gap-12 ${
                feature.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center`}
            >
              {/* Image section */}
              <div className="w-full lg:w-1/2">
                <div className="bg-background relative aspect-[4/3] overflow-hidden rounded-xl border shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset"></div>

                  {/* Accent elements */}
                  <div
                    className={`absolute ${
                      feature.align === 'left'
                        ? '-right-5 -bottom-5'
                        : '-bottom-5 -left-5'
                    } bg-primary/30 h-16 w-16 rounded-full blur-xl`}
                  ></div>
                </div>
              </div>

              {/* Content section */}
              <div className="flex w-full flex-col space-y-4 lg:w-1/2">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground md:text-lg/relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#">Learn more</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center justify-center space-y-4">
          <div className="bg-card flex flex-col items-center space-y-4 rounded-xl border p-6 text-center shadow-sm sm:p-10">
            <h3 className="text-2xl font-bold">
              Ready for an exceptional audio experience?
            </h3>
            <p className="text-muted-foreground max-w-[600px]">
              Our headphones come with a 45-day risk-free trial and a 2-year
              warranty.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">Shop Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View All Features</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
