import { Button } from '../../../ui/button';

import { ChevronRight, Quote } from 'lucide-react';
import { Linkedin, Twitter } from '../../../ui/brand-icons';

const founders = [
  {
    name: 'Sarah Johnson',
    role: 'Co-Founder & CEO',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900',
    bio: 'With over 15 years of experience in the industry, Sarah leads our company vision and strategy. Her passion for innovation and user-centered design drives our product development.',
    quote:
      'We founded this company with a simple belief: technology should work for people, not the other way around.',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
  {
    name: 'Michael Chen',
    role: 'Co-Founder & CTO',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900',
    bio: "Michael's background in software engineering and product development has been instrumental in building our platform. He leads our technical vision and engineering teams.",
    quote:
      'Our goal has always been to create technology that solves real problems while being accessible to everyone.',
    social: {
      twitter: '#',
      linkedin: '#',
    },
  },
];

export default function AboutSectionFounders() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Our Founders
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Meet the Minds Behind Our Mission
        </h2>
        <p className="text-muted-foreground">
          Our founders combined their expertise, vision, and passion to create a
          company dedicated to making a difference in the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {founders.map((founder, index) => (
          <div
            key={founder.name}
            className={`flex flex-col ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-8`}
          >
            <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl">
              <img
                src={founder.image}
                alt={founder.name}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute right-4 bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{founder.name}</h3>
                <p className="text-sm text-white/80">{founder.role}</p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={founder.social.twitter}
                    className="hover:text-primary-foreground text-white"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href={founder.social.linkedin}
                    className="hover:text-primary-foreground text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-muted/40 relative rounded-xl p-6">
                <Quote className="text-primary/20 absolute -top-3 -left-3 h-24 w-24 opacity-50" />
                <blockquote className="relative z-10 text-lg italic">
                  &quot;{founder.quote}&quot;
                </blockquote>
              </div>
              <div>
                <p className="text-muted-foreground">{founder.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
          Today, our founders continue to lead our company&apos;s growth,
          fostering a culture of innovation, collaboration, and dedication to
          creating exceptional products and experiences.
        </p>
        <Button asChild variant="outline" className="gap-1">
          <a href="#">
            Learn more about our leadership team
            <ChevronRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
