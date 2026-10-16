import { Button } from '../../../ui/button';
import { Zap, BarChart3, Shield, Globe, Check, HelpCircle } from 'lucide-react';

export default function FeatureGridCTA() {
  const features = [
    {
      icon: <Zap className="text-primary h-8 w-8" />,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance.',
    },
    {
      icon: <BarChart3 className="text-primary h-8 w-8" />,
      title: 'Advanced Analytics',
      description: 'Gain valuable insights with detailed reports.',
    },
    {
      icon: <Shield className="text-primary h-8 w-8" />,
      title: 'Secure by Default',
      description: 'Enterprise-grade security built in.',
    },
    {
      icon: <Globe className="text-primary h-8 w-8" />,
      title: 'Global Reach',
      description: 'Connect with users worldwide.',
    },
    {
      icon: <Check className="text-primary h-8 w-8" />,
      title: 'Easy Integration',
      description: 'Works with your existing tools.',
    },
    {
      icon: <HelpCircle className="text-primary h-8 w-8" />,
      title: '24/7 Support',
      description: 'Help when you need it most.',
    },
  ];

  return (
    <>
      {/* Feature Grid CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need in one platform
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Our comprehensive solution provides all the tools and features
                required for your success.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-start gap-2 rounded-lg border p-6 shadow-sm"
              >
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#">Get Started Today</a>
            </Button>
            <p className="text-muted-foreground text-sm">
              No credit card required. Start your free 14-day trial now.
            </p>
          </div>
        </div>
      </div>
      {/* End Feature Grid CTA Section */}
    </>
  );
}
