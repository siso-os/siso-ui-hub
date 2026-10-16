import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Cloud,
  Code,
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Automation",
    description:
      "Automate repetitive tasks with advanced machine learning algorithms.",
    icon: Sparkles,
    badge: "New",
  },
  {
    title: "Lightning Fast",
    description: "Optimized for speed with sub-millisecond response times.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption.",
    icon: Shield,
  },
  {
    title: "Scalable Infrastructure",
    description: "Built to scale with your needs, from startup to enterprise.",
    icon: Rocket,
  },
  {
    title: "Cloud Native",
    description: "Deploy anywhere with our cloud-native architecture.",
    icon: Cloud,
  },
  {
    title: "Developer First",
    description: "Built by developers, for developers with great DX.",
    icon: Code,
  },
];

export default function FeatureSectionCardGrid() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features that set us apart
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Everything you need to build modern applications at scale. Built for
          developers, designed for growth.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden p-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 rounded-lg p-3">
                  <feature.icon className="text-primary size-6" />
                </div>
                {feature.badge && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size={"sm"}
                  className="mt-4 font-semibold"
                >
                  Learn more <ArrowRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="gap-2">
          Get Started Now <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
