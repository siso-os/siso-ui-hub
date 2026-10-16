import { Button } from '../../../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../ui/carousel';
import { Card, CardContent } from '../../../ui/card';

export default function AwardsAndRecognitionCarousel() {
  const certifications = [
    {
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      date: '2023',
      description:
        'Professional certification in user experience design principles and methodologies.',
      image:
        'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Web Accessibility Specialist',
      issuer: 'International Association of Accessibility Professionals',
      date: '2022',
      description:
        'Certification in creating accessible digital experiences for all users.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Adobe Certified Expert',
      issuer: 'Adobe',
      date: '2022',
      description:
        'Professional recognition for expertise in Adobe Creative Suite applications.',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Certified Scrum Master',
      issuer: 'Scrum Alliance',
      date: '2021',
      description:
        'Recognition for mastery of Scrum methodology and agile project management.',
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'React Developer Certificate',
      issuer: 'Meta',
      date: '2021',
      description:
        'Front-end development certification for expertise in React framework.',
      image:
        'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Professional Certifications
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Industry-recognized qualifications that validate my skills and
            expertise.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="mx-auto max-w-5xl">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {certifications.map((cert, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-card border p-0">
                    <CardContent className="p-0">
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Certificate Image */}
                        <div className="relative h-64 overflow-hidden md:h-80">
                          <img
                            src={cert.image}
                            alt={cert.name}
                            className="object-cover"
                          />
                        </div>

                        {/* Certificate Details */}
                        <div className="flex flex-col justify-center p-6">
                          <div className="text-muted-foreground mb-2 text-sm font-medium">
                            {cert.issuer} • {cert.date}
                          </div>
                          <h3 className="mb-4 text-2xl font-bold">
                            {cert.name}
                          </h3>
                          <p className="text-muted-foreground mb-6">
                            {cert.description}
                          </p>
                          <div className="mt-auto">
                            <Button variant="outline" size="sm" asChild>
                              <a href={cert.link}>View Certificate</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-2">
              <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0" />
              <CarouselNext className="relative top-0 right-0 translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
