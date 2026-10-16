import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  ExternalLink,
  Star,
  Zap,
  CreditCard,
  MessageSquare,
  Code,
  BarChart,
  Mail,
  Cog,
} from 'lucide-react';
import { useState } from 'react';

export default function IntegrationsCategoryTabs() {
  const [activeTab, setActiveTab] = useState('payment');

  const categories = [
    { id: 'payment', name: 'Payment', icon: CreditCard, count: 12 },
    {
      id: 'communication',
      name: 'Communication',
      icon: MessageSquare,
      count: 8,
    },
    { id: 'development', name: 'Development', icon: Code, count: 15 },
    { id: 'analytics', name: 'Analytics', icon: BarChart, count: 7 },
    { id: 'marketing', name: 'Marketing', icon: Mail, count: 10 },
    { id: 'automation', name: 'Automation', icon: Cog, count: 9 },
  ];

  const integrationsData = {
    payment: [
      {
        name: 'Stripe',
        description:
          'Accept payments from customers worldwide with advanced fraud protection',
        logo: '/placeholder.svg',
        rating: 4.9,
        setupTime: '5 min',
        featured: true,
        pricing: '2.9% + 30¢',
        integrationLevel: 'Full',
      },
      {
        name: 'PayPal',
        description:
          'Trusted payment solution with buyer and seller protection worldwide',
        logo: '/placeholder.svg',
        rating: 4.7,
        setupTime: '3 min',
        featured: false,
        pricing: '2.9% + $0.30',
        integrationLevel: 'Full',
      },
      {
        name: 'Square',
        description:
          'Complete payment processing solution for online and in-person sales',
        logo: '/placeholder.svg',
        rating: 4.6,
        setupTime: '7 min',
        featured: false,
        pricing: '2.6% + 10¢',
        integrationLevel: 'Partial',
      },
    ],
    communication: [
      {
        name: 'Slack',
        description:
          'Team communication platform with channels, DMs, and integrations',
        logo: '/placeholder.svg',
        rating: 4.8,
        setupTime: '2 min',
        featured: true,
        pricing: 'Free - $12.50/user',
        integrationLevel: 'Full',
      },
      {
        name: 'Discord',
        description:
          'Voice, video, and text communication for communities and teams',
        logo: '/placeholder.svg',
        rating: 4.6,
        setupTime: '1 min',
        featured: false,
        pricing: 'Free - $9.99/user',
        integrationLevel: 'Partial',
      },
      {
        name: 'Microsoft Teams',
        description:
          'Integrated communication and collaboration platform by Microsoft',
        logo: '/placeholder.svg',
        rating: 4.4,
        setupTime: '5 min',
        featured: false,
        pricing: '$4 - $22/user',
        integrationLevel: 'Full',
      },
    ],
    development: [
      {
        name: 'GitHub',
        description:
          'Version control and collaboration platform for development teams',
        logo: '/placeholder.svg',
        rating: 4.9,
        setupTime: '3 min',
        featured: true,
        pricing: 'Free - $21/user',
        integrationLevel: 'Full',
      },
      {
        name: 'GitLab',
        description: 'Complete DevOps platform with Git repository management',
        logo: '/placeholder.svg',
        rating: 4.7,
        setupTime: '5 min',
        featured: false,
        pricing: 'Free - $99/user',
        integrationLevel: 'Full',
      },
      {
        name: 'Jira',
        description: 'Issue tracking and project management for agile teams',
        logo: '/placeholder.svg',
        rating: 4.3,
        setupTime: '10 min',
        featured: false,
        pricing: '$7 - $14/user',
        integrationLevel: 'Partial',
      },
    ],
    analytics: [
      {
        name: 'Google Analytics',
        description:
          'Web analytics service that tracks and reports website traffic',
        logo: '/placeholder.svg',
        rating: 4.5,
        setupTime: '5 min',
        featured: true,
        pricing: 'Free - $150k/year',
        integrationLevel: 'Full',
      },
      {
        name: 'Mixpanel',
        description:
          'Advanced analytics platform for mobile and web applications',
        logo: '/placeholder.svg',
        rating: 4.6,
        setupTime: '8 min',
        featured: false,
        pricing: 'Free - $833/month',
        integrationLevel: 'Full',
      },
    ],
    marketing: [
      {
        name: 'Mailchimp',
        description:
          'Email marketing automation and audience management platform',
        logo: '/placeholder.svg',
        rating: 4.6,
        setupTime: '7 min',
        featured: true,
        pricing: 'Free - $299/month',
        integrationLevel: 'Full',
      },
      {
        name: 'HubSpot',
        description: 'Inbound marketing, sales, and service software platform',
        logo: '/placeholder.svg',
        rating: 4.4,
        setupTime: '15 min',
        featured: false,
        pricing: 'Free - $3,200/month',
        integrationLevel: 'Full',
      },
    ],
    automation: [
      {
        name: 'Zapier',
        description: 'Connect your apps and automate workflows without coding',
        logo: '/placeholder.svg',
        rating: 4.5,
        setupTime: '5 min',
        featured: true,
        pricing: 'Free - $599/month',
        integrationLevel: 'Full',
      },
      {
        name: 'Make',
        description:
          'Visual platform for creating automated workflows and integrations',
        logo: '/placeholder.svg',
        rating: 4.3,
        setupTime: '10 min',
        featured: false,
        pricing: 'Free - $299/month',
        integrationLevel: 'Partial',
      },
    ],
  };

  const getIntegrationLevelColor = (level: string) => {
    switch (level) {
      case 'Full':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Partial':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* Integrations Category Tabs Section */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              <Zap className="mr-2 h-4 w-4" />
              61+ Integrations Across 6 Categories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Integrations by Category
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Discover integrations organized by category. From payments to
              analytics, find the perfect tools to enhance your workflow.
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              {/* Mobile dropdown on small screens, tabs on larger screens */}
              <div className="flex justify-center">
                <TabsList className="grid h-auto w-full max-w-4xl grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-6">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col gap-1 p-3"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {category.name} ({category.count})
                        </span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab Content */}
              {categories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-12"
                >
                  <div className="mb-6 text-center">
                    <h3 className="text-2xl font-semibold">
                      {category.name} Integrations
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {category.count} integrations available in this category
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {integrationsData[
                      category.id as keyof typeof integrationsData
                    ]?.map((integration) => (
                      <Card
                        key={integration.name}
                        className="relative transition-all hover:shadow-lg"
                      >
                        {integration.featured && (
                          <Badge
                            className="absolute -top-2 left-4 z-10"
                            variant="default"
                          >
                            Featured
                          </Badge>
                        )}
                        <CardContent>
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                <img
                                  src={integration.logo}
                                  alt={`${integration.name} logo`}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {integration.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">
                                    {integration.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Badge
                              className={`text-xs ${getIntegrationLevelColor(integration.integrationLevel)}`}
                            >
                              {integration.integrationLevel}
                            </Badge>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground mt-4 text-sm">
                            {integration.description}
                          </p>

                          {/* Details */}
                          <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Setup time:
                              </span>
                              <span className="font-medium">
                                {integration.setupTime}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Pricing:
                              </span>
                              <span className="font-medium">
                                {integration.pricing}
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 flex gap-2">
                            <Button className="flex-1" size="sm">
                              Connect
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* View More Button */}
                  <div className="mt-8 text-center">
                    <Button variant="outline">
                      View All {category.name} Integrations
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-xl font-semibold">
                Need a Custom Integration?
              </h3>
              <p className="text-muted-foreground mt-2">
                Our team can build custom integrations tailored to your specific
                needs.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button>Request Custom Integration</Button>
                <Button variant="outline">View Integration Guide</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Integrations Category Tabs Section */}
    </>
  );
}
