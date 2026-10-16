import { Button } from '../../../ui/button';

export default function StatsCTA() {
  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500+', label: 'Enterprise Clients' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <>
      {/* Stats CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by thousands worldwide
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Join the community of businesses improving their workflows with
                our platform.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="text-primary text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <Button size="lg" asChild>
                <a href="#">Get Started</a>
              </Button>
              <p className="text-muted-foreground text-sm">
                No credit card required to start your 14-day trial
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Stats CTA Section */}
    </>
  );
}
