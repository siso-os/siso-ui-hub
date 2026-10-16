import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Trophy, Award, Star } from 'lucide-react';

export default function AwardsCTA() {
  const awards = [
    {
      icon: <Trophy className="h-10 w-10 text-amber-500" />,
      title: 'Product of the Year',
      organization: 'SaaS Awards 2023',
      description: 'Recognized for innovation and exceptional user experience.',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-500" />,
      title: 'Customer Support Excellence',
      organization: 'CX Summit',
      description:
        'Top-rated customer support team with 98% satisfaction rate.',
    },
    {
      icon: <Star className="h-10 w-10 text-purple-500" />,
      title: 'Best Enterprise Solution',
      organization: 'Tech Excellence Awards',
      description: 'Leading solution for enterprise-scale implementations.',
    },
  ];

  return (
    <>
      {/* Awards CTA Section */}
      <div className="border-t border-b py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
              <Badge variant="outline" className="px-3.5 py-1.5">
                Award-Winning Excellence
              </Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Industry recognition for our platform
                </h2>
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                  Our commitment to quality and innovation has earned us
                  recognition from leading industry organizations.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="bg-card flex flex-col items-center rounded-lg border p-6 text-center transition-all hover:shadow-md"
                >
                  <div className="bg-background mb-4 rounded-full border p-3">
                    {award.icon}
                  </div>
                  <h3 className="mb-1 text-xl font-bold">{award.title}</h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {award.organization}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t pt-6">
              <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">
                    Join our award-winning platform
                  </h3>
                  <p className="text-muted-foreground">
                    Experience the quality that industry experts recognize.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <a href="#">Start Free Trial</a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#">View Case Studies</a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 hidden items-center justify-center gap-8 pt-8 sm:flex">
              <div className="flex items-center gap-2">
                <div className="relative h-24 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Award Logo 1"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-16 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1649180556628-9ba704115795?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Award Logo 2"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-20 w-32">
                  <img
                    src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                    alt="Award Logo 3"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Awards CTA Section */}
    </>
  );
}
