import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { ExternalLink, Star } from 'lucide-react';

export default function IntegrationsSimpleGrid() {
  const integrations = [
    {
      name: 'Stripe',
      category: 'Payment',
      description:
        'Accept payments from customers worldwide with powerful APIs',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.9,
      popular: true,
      verified: true,
    },
    {
      name: 'Slack',
      category: 'Communication',
      description: 'Team communication and collaboration platform integration',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.8,
      popular: true,
      verified: true,
    },
    {
      name: 'GitHub',
      category: 'Development',
      description:
        'Version control and collaboration for your development workflow',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.9,
      popular: false,
      verified: true,
    },
    {
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Track and analyze your website traffic and user behavior',
      logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.7,
      popular: false,
      verified: true,
    },
    {
      name: 'Mailchimp',
      category: 'Marketing',
      description: 'Email marketing automation and audience management',
      logo: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.6,
      popular: true,
      verified: true,
    },
    {
      name: 'Notion',
      category: 'Productivity',
      description:
        'All-in-one workspace for notes, docs, and project management',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.8,
      popular: false,
      verified: true,
    },
    {
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect your apps and automate workflows without coding',
      logo: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.5,
      popular: true,
      verified: true,
    },
    {
      name: 'Salesforce',
      category: 'CRM',
      description: 'Customer relationship management and sales automation',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.4,
      popular: false,
      verified: true,
    },
    {
      name: 'Discord',
      category: 'Communication',
      description: 'Voice, video, and text communication for your community',
      logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=100&h=100&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.7,
      popular: false,
      verified: true,
    },
  ];

  const categories = [
    'All',
    'Payment',
    'Communication',
    'Development',
    'Analytics',
    'Marketing',
    'Productivity',
  ];

  return (
    <>
      {/* Integrations Section */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Popular Integrations
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Connect with the tools you already use and love. Build powerful
              workflows with our extensive integration library.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <Card
                key={integration.name}
                className="relative overflow-hidden transition-all hover:shadow-lg"
              >
                <CardContent>
                  {/* Popular Badge */}
                  {integration.popular && (
                    <Badge
                      className="absolute top-4 right-4"
                      variant="secondary"
                    >
                      Popular
                    </Badge>
                  )}

                  {/* Logo and Name */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                      <img
                        src={integration.logo}
                        alt={`${integration.name} logo`}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {integration.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mt-4 text-sm">
                    {integration.description}
                  </p>

                  {/* Rating and Actions */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {integration.rating}
                      </span>
                      {integration.verified && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline">
              View All Integrations
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {/* End Integrations Section */}
    </>
  );
}
