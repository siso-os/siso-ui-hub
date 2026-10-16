import { Button } from '../../../ui/button';
import { CheckIcon } from 'lucide-react';

export default function ZigzagCTA() {
  const features = [
    {
      title: 'Streamlined Workflows',
      description:
        'Automate repetitive tasks and focus on what matters most. Our intelligent workflow system reduces manual work by up to 40%.',
      image:
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      benefits: [
        'Automated task management',
        'Smart notifications',
        'Customizable workflows',
      ],
    },
    {
      title: 'Real-time Collaboration',
      description:
        'Work together seamlessly with your team, no matter where you are. Share documents, make edits, and communicate in real-time.',
      image:
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      benefits: ['In-app messaging', 'Document co-editing', 'Version history'],
    },
    {
      title: 'Advanced Analytics',
      description:
        'Gain valuable insights with comprehensive analytics. Track performance, identify trends, and make data-driven decisions.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      benefits: [
        'Custom dashboards',
        'Exportable reports',
        'Predictive insights',
      ],
    },
  ];

  return (
    <>
      {/* Zigzag CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features that make a difference
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Discover how our platform can transform your business
                operations.
              </p>
            </div>
          </div>

          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid items-center gap-6 py-8 ${
                index % 2 === 0
                  ? 'md:grid-cols-2'
                  : 'md:grid-flow-dense md:grid-cols-2'
              }`}
            >
              <div
                className={`space-y-4 ${
                  index % 2 !== 0 ? 'md:col-start-2' : ''
                }`}
              >
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`relative h-[300px] overflow-hidden rounded-xl ${
                  index % 2 !== 0 ? 'md:col-start-1' : ''
                }`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover"
                />
              </div>
              {index !== features.length - 1 && (
                <div className="col-span-full my-4 border-t md:my-8"></div>
              )}
            </div>
          ))}

          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <Button size="lg" asChild>
              <a href="#">Explore All Features</a>
            </Button>
            <p className="text-muted-foreground text-sm">
              Schedule a demo to see our features in action
            </p>
          </div>
        </div>
      </div>
      {/* End Zigzag CTA Section */}
    </>
  );
}
