import { Card, CardContent } from "../../../ui/card";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and challenges through in-depth research and interviews.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our creative team crafts beautiful, functional designs that align with your brand and engage your audience.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Our engineers bring designs to life with clean, efficient code that meets the highest quality standards.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "We rigorously test all aspects of your product to ensure performance, usability, and security.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "After launch, we provide ongoing support and optimization to ensure continued success.",
  },
];

export default function AboutSectionProcess() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">Our Process</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We follow a methodical approach to ensure every project delivers
          exceptional results. Here&apos;s how we work with you from concept to
          completion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step) => (
          <Card
            key={step.number}
            className="bg-accent/50 relative overflow-hidden border-none p-0"
          >
            <div className="text-primary/10 absolute -top-4 -right-4 text-8xl font-bold">
              {step.number}
            </div>
            <CardContent className="relative z-10 space-y-3 p-6">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                {step.number}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-12 text-center">
        <p className="text-muted-foreground mx-auto max-w-2xl">
          This proven process ensures we deliver high-quality solutions that
          meet your business needs while providing a transparent, collaborative
          experience.
        </p>
      </div>
    </section>
  );
}
