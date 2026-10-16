import { useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight, Check } from 'lucide-react';

const features = {
  before: [
    'Manual deployment process',
    'Limited scalability',
    'Basic security features',
    'Minimal monitoring',
  ],
  after: [
    'One-click deployments',
    'Auto-scaling infrastructure',
    'Enterprise-grade security',
    'Advanced monitoring & alerts',
  ],
};

export default function FeatureSectionWithComparison() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percentage);
  };

  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Transform your workflow
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See the difference our platform makes
        </p>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Before
                </Badge>
                <ul className="space-y-4">
                  {features.before.map((feature, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-3"
                    >
                      <div className="bg-muted size-2 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Badge className="mb-2">After</Badge>
                <ul className="space-y-4">
                  {features.after.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="text-primary size-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div
          className="bg-muted relative aspect-[4/3] cursor-ew-resize overflow-hidden rounded-lg"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0">
            <img
              src="https://placehold.co/1200x900/jpeg"
              alt="Before"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img
              src="https://placehold.co/1200x900/jpeg"
              alt="After"
              className="object-cover"
            />
          </div>
          <div
            className="absolute top-0 bottom-0 w-1 cursor-ew-resize bg-white"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="border-primary absolute top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-white" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" className="gap-2">
          Get Started <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
