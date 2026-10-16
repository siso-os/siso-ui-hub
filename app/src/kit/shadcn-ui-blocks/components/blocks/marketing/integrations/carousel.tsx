import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '../../../ui/carousel';
import {
  ExternalLink,
  Star,
  Zap,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function IntegrationsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateSelection();
    api.on('select', updateSelection);

    return () => {
      api.off('select', updateSelection);
    };
  }, [api]);

  const integrations = [
    {
      name: 'Stripe',
      category: 'Payment Processing',
      description:
        'Accept payments globally with industry-leading conversion rates and fraud protection.',
      logo: '/placeholder.svg',
      rating: 4.9,
      reviews: 1245,
      setupTime: '5 min',
      features: ['Global payments', 'Subscription billing'],
      type: 'Premium',
    },
    {
      name: 'Slack',
      category: 'Team Communication',
      description:
        'Streamline team collaboration with real-time messaging and workflow automation.',
      logo: '/placeholder.svg',
      rating: 4.8,
      reviews: 987,
      setupTime: '2 min',
      features: ['Real-time messaging', 'File sharing', 'Workflow automation'],
      type: 'Essential',
    },
    {
      name: 'GitHub',
      category: 'Development',
      description:
        'Version control and collaboration platform for modern development teams.',
      logo: '/placeholder.svg',
      rating: 4.9,
      reviews: 2156,
      setupTime: '3 min',
      features: ['Git repositories', 'Issue tracking', 'CI/CD workflows'],
      type: 'Premium',
    },
    {
      name: 'Salesforce',
      category: 'CRM',
      description:
        'Customer relationship management platform with advanced analytics and automation.',
      logo: '/placeholder.svg',
      rating: 4.7,
      reviews: 856,
      setupTime: '10 min',
      features: ['Lead management', 'Sales analytics', 'Custom workflows'],
      type: 'Enterprise',
    },
    {
      name: 'Mailchimp',
      category: 'Email Marketing',
      description:
        'Email marketing automation with powerful segmentation and analytics.',
      logo: '/placeholder.svg',
      rating: 4.6,
      reviews: 743,
      setupTime: '7 min',
      features: ['Email automation', 'A/B testing', 'Advanced segmentation'],
      type: 'Premium',
    },
    {
      name: 'Zapier',
      category: 'Automation',
      description:
        'Connect your apps and automate workflows without any coding required.',
      logo: '/placeholder.svg',
      rating: 4.5,
      reviews: 654,
      setupTime: '5 min',
      features: ['5000+ app connections', 'Multi-step workflows'],
      type: 'Essential',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Premium':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Enterprise':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Essential':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Integrations Carousel Section */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              200+ Integrations Available
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Connect Everything You Need
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Integrate with the tools your team already uses. From payments to
              productivity, we&apos;ve got you covered with secure, reliable
              connections.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative mt-12">
            {/* Header Section */}
            <div className="mb-8 flex items-end justify-between">
              <div className="flex flex-col-reverse gap-2 md:flex-row md:items-center">
                <h3 className="text-xl font-semibold">Featured Integrations</h3>
                <Badge variant="secondary" className="text-xs">
                  {integrations.length} Available
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => api?.scrollNext()}
                  disabled={!canScrollNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
              }}
              className=""
            >
              <CarouselContent>
                {integrations.map((integration) => (
                  <CarouselItem
                    key={integration.name}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="transition-all hover:shadow-lg">
                      <CardContent>
                        {/* Header with Logo and Type */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                              <img
                                src={integration.logo}
                                alt={`${integration.name} logo`}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {integration.name}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {integration.category}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={`text-xs ${getTypeColor(integration.type)}`}
                          >
                            {integration.type}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                          {integration.description}
                        </p>

                        {/* Features */}
                        <div className="mt-4">
                          <h4 className="mb-2 text-sm font-medium">
                            Key Features:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {integration.features.map((feature) => (
                              <Badge
                                key={feature}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {integration.rating}
                              </span>
                              <span className="text-muted-foreground">
                                ({integration.reviews})
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="text-muted-foreground h-4 w-4" />
                              <span className="text-muted-foreground">
                                {integration.setupTime} setup
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 flex gap-2">
                          <Button className="flex-1" size="sm">
                            <Shield className="mr-2 h-4 w-4" />
                            Connect Securely
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Button size="lg">
              Browse All Integrations
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-muted-foreground mt-3 text-sm">
              Can&apos;t find what you need?{' '}
              <a href="#" className="underline">
                Request an integration
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* End Integrations Carousel Section */}
    </>
  );
}
