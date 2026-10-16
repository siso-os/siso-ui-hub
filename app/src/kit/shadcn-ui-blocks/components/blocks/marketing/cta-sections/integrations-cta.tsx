import { Button } from '../../../ui/button';
import { ArrowUpRight, PlusCircle } from 'lucide-react';

export default function IntegrationsCTA() {
  const integrations = [
    {
      name: 'Slack',
      description: 'Real-time notifications and collaboration',
      logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
      color: '#4A154B',
    },
    {
      name: 'Salesforce',
      description: 'Sync customer data and interactions',
      logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
      color: '#00A1E0',
    },
    {
      name: 'HubSpot',
      description: 'Marketing automation and CRM sync',
      logo: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg',
      color: '#FF7A59',
    },
    {
      name: 'Zapier',
      description: 'Connect with 3,000+ apps and services',
      logo: 'https://cdn.worldvectorlogo.com/logos/zapier-1.svg',
      color: '#FF4A00',
    },
    {
      name: 'Google Workspace',
      description: 'File sharing and collaboration',
      logo: 'https://cdn.worldvectorlogo.com/logos/google-drive.svg',
      color: '#0F9D58',
    },
    {
      name: 'Stripe',
      description: 'Secure payment processing',
      logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
      color: '#635BFF',
    },
    {
      name: 'GitHub',
      description: 'Version control and code management',
      logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg',
      color: '#24292E',
    },
    {
      name: 'Jira',
      description: 'Project tracking and management',
      logo: 'https://cdn.worldvectorlogo.com/logos/jira-3.svg',
      color: '#0052CC',
    },
  ];

  const featuredIntegrations = integrations.slice(0, 6);

  return (
    <>
      {/* Integrations CTA Section */}
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
                  Seamlessly integrate with your favorite tools
                </h2>
                <p className="text-muted-foreground mb-6 md:text-lg">
                  Our platform connects with all the apps you already use,
                  allowing you to streamline your workflow and maximize
                  productivity.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <Button size="lg" asChild>
                    <a href="#">
                      Explore Integrations
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#">Request an Integration</a>
                  </Button>
                </div>
                <div className="mt-8">
                  <p className="mb-2 text-sm font-medium">
                    Popular integrations:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {featuredIntegrations
                      .slice(0, 3)
                      .map((integration, index) => (
                        <a
                          key={index}
                          href="#"
                          className="hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors"
                        >
                          <div
                            className="relative h-4 w-4 overflow-hidden"
                            style={{
                              backgroundColor: integration.color,
                              borderRadius: '2px',
                              padding: '1px',
                            }}
                          >
                            <img
                              src={integration.logo}
                              alt={integration.name}
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          </div>
                          {integration.name}
                        </a>
                      ))}
                    <a
                      href="#"
                      className="text-muted-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      40+ more
                    </a>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {featuredIntegrations.map((integration, index) => (
                  <a
                    key={index}
                    href="#"
                    className="bg-card flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-all hover:shadow-md"
                  >
                    <div
                      className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{ backgroundColor: integration.color + '10' }}
                    >
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {integration.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-card mt-16 rounded-xl border p-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-bold">
                    Need a custom integration?
                  </h3>
                  <p className="text-muted-foreground">
                    We can build custom integrations for your specific needs.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <a href="#">Contact Our Team</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Integrations CTA Section */}
    </>
  );
}
