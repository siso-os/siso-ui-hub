import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Badge } from '../../../ui/badge';

export default function TabCTA() {
  const tabs = [
    {
      id: 'developers',
      label: 'Developers',
      title: 'Built for developers, by developers',
      description:
        "Our API-first approach makes integration seamless. With comprehensive documentation and SDKs for popular languages, you'll be up and running in minutes.",
      features: [
        'RESTful API with clear documentation',
        'SDK support for major languages',
        'Webhook integrations',
        'Sandbox environment for testing',
      ],
      image:
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3',
      cta: 'View Documentation',
    },
    {
      id: 'designers',
      label: 'Designers',
      title: 'Powerful tools for designers',
      description:
        'Create stunning designs with our intuitive interface. From wireframes to high-fidelity prototypes, our platform streamlines your design process.',
      features: [
        'Component-based design system',
        'Design tokens support',
        'Easy export to development',
        'Built-in version control',
      ],
      image:
        'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      cta: 'Start Designing',
    },
    {
      id: 'teams',
      label: 'Teams',
      title: 'Collaborate with your entire team',
      description:
        'Break down silos between design, development, and product. Our platform brings everyone together with real-time collaboration tools.',
      features: [
        'Role-based permissions',
        'Comment and feedback system',
        'Project management integration',
        'Shared asset libraries',
      ],
      image:
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3',
      cta: 'Team Onboarding',
    },
  ];

  return (
    <>
      {/* Tab CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
            <Badge variant="outline" className="px-3.5 py-1.5">
              For Every Role
            </Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                One platform, multiple solutions
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Tailored features for every member of your team, from design to
                development.
              </p>
            </div>
          </div>

          <Tabs defaultValue="developers" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{tab.title}</h3>
                    <p className="text-muted-foreground">{tab.description}</p>
                    <ul className="space-y-2">
                      {tab.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary h-5 w-5"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4">
                      <Button asChild>
                        <a href="#">{tab.cta}</a>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-[300px] overflow-hidden rounded-xl border md:h-[400px]">
                    <img
                      src={tab.image}
                      alt={`${tab.label} example`}
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="#">Schedule a Demo</a>
            </Button>
          </div>
        </div>
      </div>
      {/* End Tab CTA Section */}
    </>
  );
}
