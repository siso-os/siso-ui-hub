import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function AwardsAndRecognitionFeatured() {
  const mainAward = {
    name: 'Web Excellence Award 2023',
    organization: 'International Digital Experience Awards',
    description:
      'Recognized for creating exceptional digital experiences that combine innovative interaction design with seamless user experiences. This award celebrates the highest standards in web design and development, honoring projects that demonstrate technical excellence, creative innovation, and measurable results.',
    image:
      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    logo: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'November 2023',
    link: '#',
  };

  const secondaryAward = {
    name: 'UX Design Certificate of Excellence',
    organization: 'Design Industry Association',
    description:
      'Awarded for demonstrating outstanding proficiency in user-centered design methodologies and creating accessible, inclusive digital experiences.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    logo: 'https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    date: 'June 2023',
    link: '#',
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Award-Winning Work
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Recognized excellence that demonstrates my commitment to quality and
            innovation.
          </p>
        </div>

        {/* Main Award */}
        <div className="bg-card mx-auto mb-16 max-w-5xl overflow-hidden rounded-xl border shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Award Image */}
            <div className="relative h-64 overflow-hidden md:h-auto">
              <img
                src={mainAward.image}
                alt={mainAward.name}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="border-background bg-background relative h-16 w-16 overflow-hidden rounded-lg border-2">
                  <img
                    src={mainAward.logo}
                    alt={mainAward.organization}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Award Details */}
            <div className="p-6 md:p-8">
              <div className="text-muted-foreground mb-2 text-sm font-medium">
                {mainAward.date} • {mainAward.organization}
              </div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                {mainAward.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                {mainAward.description}
              </p>
              <Button asChild>
                <a href={mainAward.link}>
                  View Award <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Secondary Award */}
        <div className="bg-card mx-auto max-w-5xl overflow-hidden rounded-xl border shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Award Details */}
            <div className="order-2 p-6 md:order-1 md:p-8">
              <div className="text-muted-foreground mb-2 text-sm font-medium">
                {secondaryAward.date} • {secondaryAward.organization}
              </div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                {secondaryAward.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                {secondaryAward.description}
              </p>
              <Button variant="outline" asChild>
                <a href={secondaryAward.link}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Award Image */}
            <div className="relative order-1 h-64 overflow-hidden md:order-2 md:h-auto">
              <img
                src={secondaryAward.image}
                alt={secondaryAward.name}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute right-4 bottom-4">
                <div className="border-background bg-background relative h-16 w-16 overflow-hidden rounded-lg border-2">
                  <img
                    src={secondaryAward.logo}
                    alt={secondaryAward.organization}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
