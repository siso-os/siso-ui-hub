import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    quote:
      'Working with this developer transformed our online presence. Their attention to detail and ability to understand our needs saved us countless hours and delivered a product better than we imagined.',
    author: 'Sarah Johnson',
    role: 'CEO, Artemis Marketing',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    service: 'Website Design & Development',
  },
  {
    id: 2,
    quote:
      'I was blown away by how quickly they grasped our complex industry and delivered intuitive designs that our users love. Communication was clear throughout the entire process.',
    author: 'Michael Chen',
    role: 'Product Director, TechFlow',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    service: 'UI/UX Design',
  },
  {
    id: 3,
    quote:
      'The SEO strategy they implemented increased our organic traffic by 215% within just three months. Their data-driven approach and regular reporting kept us informed every step of the way.',
    author: 'Elena Rodriguez',
    role: 'Marketing Manager, GreenLeaf',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    service: 'SEO Optimization',
  },
];

// Sample service snippets
const serviceSnippets = [
  {
    id: 1,
    title: 'Collaborative Process',
    description:
      'I work closely with you at every stage, ensuring your vision is understood and realized in the final product.',
  },
  {
    id: 2,
    title: 'Data-Informed Decisions',
    description:
      'Every design and implementation choice is backed by research, testing, and industry best practices.',
  },
  {
    id: 3,
    title: 'Long-term Partnership',
    description:
      'I build lasting relationships with clients, providing support and expertise beyond project completion.',
  },
];

export default function ClientOrientedTestimonials() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Client Experiences
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Clients Choose Me
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Don&apos;t just take my word for it — here&apos;s what clients say
            about working with me
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Testimonial Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="hover:border-primary/20 transition-all duration-300 hover:shadow-md"
              >
                <CardContent className="flex grow flex-col">
                  <div className="text-primary mb-4">
                    <Quote className="h-8 w-8" />
                  </div>
                  <p className="mb-6 grow text-sm italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="border-muted mt-4 border-t pt-4">
                    <p className="text-primary text-sm font-medium">
                      Service: {testimonial.service}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Snippets */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {serviceSnippets.map((snippet) => (
              <div
                key={snippet.id}
                className="border-primary/10 bg-muted/50 rounded-lg border p-6 text-center"
              >
                <h3 className="mb-2 text-lg font-medium">{snippet.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {snippet.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Get in touch</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
