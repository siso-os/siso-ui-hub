import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import {
  ExternalLink,
  Star,
  Users,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function IntegrationsFeaturedShowcase() {
  const featuredIntegrations = [
    {
      id: 1,
      name: 'Stripe',
      category: 'Payment Processing',
      description:
        "The world's most powerful payment infrastructure. Accept payments globally with advanced fraud protection and industry-leading conversion rates.",
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=120&h=120&auto=format&fit=crop&ixlib=rb-4.0.3',
      coverImage:
        'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=600&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.9,
      reviews: 12450,
      users: '2M+',
      setupTime: '5 minutes',
      tier: 'Enterprise Ready',
      features: [
        'Accept 135+ currencies',
        'Advanced fraud protection',
        'Real-time reporting',
        'Subscription management',
        'Mobile SDKs',
        '24/7 support',
      ],
      stats: [
        { label: 'Success Rate', value: '99.9%' },
        { label: 'Integration Time', value: '< 1 hour' },
        { label: 'Countries', value: '46+' },
      ],
    },
    {
      id: 2,
      name: 'Slack',
      category: 'Team Communication',
      description:
        "Transform your team collaboration with Slack's powerful messaging platform. Connect, communicate, and coordinate work in organized spaces.",
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=120&h=120&auto=format&fit=crop&ixlib=rb-4.0.3',
      coverImage:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.8,
      reviews: 8970,
      users: '10M+',
      setupTime: '2 minutes',
      tier: 'Team Favorite',
      features: [
        'Unlimited messaging',
        'File sharing & search',
        'App integrations',
        'Video & voice calls',
        'Workflow automation',
        'Enterprise security',
      ],
      stats: [
        { label: 'Active Users', value: '10M+' },
        { label: 'Messages/Day', value: '1B+' },
        { label: 'Integrations', value: '2,400+' },
      ],
    },
    {
      id: 3,
      name: 'GitHub',
      category: 'Developer Tools',
      description:
        'The complete developer platform to build, scale, and deliver secure software. Collaborate on code with powerful version control.',
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=120&h=120&auto=format&fit=crop&ixlib=rb-4.0.3',
      coverImage:
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=600&h=300&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.9,
      reviews: 15680,
      users: '100M+',
      setupTime: '3 minutes',
      tier: 'Developer Essential',
      features: [
        'Git repositories',
        'Code reviews',
        'Issue tracking',
        'CI/CD pipelines',
        'Security scanning',
        'Project management',
      ],
      stats: [
        { label: 'Repositories', value: '420M+' },
        { label: 'Developers', value: '100M+' },
        { label: 'Organizations', value: '4M+' },
      ],
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Enterprise Ready':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Team Favorite':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Developer Essential':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Featured Integrations Showcase */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              Featured Integrations
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Enterprise-Grade Integrations
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Connect with the most trusted and powerful tools used by millions
              of developers and businesses worldwide. Each integration is
              thoroughly tested and enterprise-ready.
            </p>
          </div>

          {/* Featured Integration Cards */}
          <div className="mt-16 space-y-12">
            {featuredIntegrations.map((integration, index) => (
              <Card key={integration.id} className="overflow-hidden py-0">
                <div
                  className={`grid gap-8 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Image Section */}
                  <div
                    className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
                  >
                    <div className="relative h-64 w-full overflow-hidden lg:h-full">
                      <img
                        src={integration.coverImage}
                        alt={`${integration.name} showcase`}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Floating Stats */}
                      <div className="absolute right-4 bottom-4 left-4">
                        <div className="flex gap-2 overflow-x-auto">
                          {integration.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="flex-shrink-0 rounded-lg bg-white/90 px-3 py-2 backdrop-blur-sm"
                            >
                              <div className="text-xs font-medium text-gray-600">
                                {stat.label}
                              </div>
                              <div className="text-sm font-bold text-gray-900">
                                {stat.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent
                    className={`p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                  >
                    {/* Header */}
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
                          <h3 className="text-2xl font-bold">
                            {integration.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {integration.category}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${getTierColor(integration.tier)}`}>
                        {integration.tier}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
                      {integration.description}
                    </p>

                    {/* Features Grid */}
                    <div className="mt-6">
                      <h4 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                        Key Features
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {integration.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {integration.rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({integration.reviews.toLocaleString()} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                          {integration.users} users
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground">
                          {integration.setupTime} setup
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button size="lg" className="flex-1">
                        <Shield className="mr-2 h-4 w-4" />
                        Connect Securely
                      </Button>
                      <Button size="lg" variant="outline">
                        View Documentation
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="text-muted-foreground mt-6 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        <span>Enterprise Security</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>SOC 2 Compliant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        <span>99.9% Uptime</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-muted-foreground mt-4 text-lg">
                  Join thousands of companies already using these integrations
                  to power their business.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg">
                    Browse All Integrations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </div>
                <p className="text-muted-foreground mt-6 text-sm">
                  Free 14-day trial • No credit card required • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* End Featured Integrations Showcase */}
    </>
  );
}
