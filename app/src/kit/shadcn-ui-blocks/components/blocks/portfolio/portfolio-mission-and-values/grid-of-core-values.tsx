import {
  HeartHandshake,
  Lightbulb,
  Shield,
  Users,
  Target,
  RefreshCw,
  PackageOpen,
  Sparkles,
  Globe,
} from "lucide-react";

export default function MissionAndValuesGrid() {
  const values = [
    {
      title: "Innovation",
      description:
        "We continuously challenge assumptions and explore new possibilities.",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical responsibility.",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Collaboration",
      description:
        "We bring diverse perspectives together to achieve extraordinary results.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Excellence",
      description: "We strive for outstanding quality in everything we create.",
      icon: <Sparkles className="h-6 w-6" />,
    },
    {
      title: "Adaptability",
      description: "We embrace change and evolve to meet new challenges.",
      icon: <RefreshCw className="h-6 w-6" />,
    },
    {
      title: "Empathy",
      description:
        "We design with a deep understanding of human needs and experiences.",
      icon: <HeartHandshake className="h-6 w-6" />,
    },
    {
      title: "Purpose",
      description: "We focus on creating meaningful impact that matters.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Transparency",
      description:
        "We communicate openly and honestly with clients and team members.",
      icon: <PackageOpen className="h-6 w-6" />,
    },
    {
      title: "Sustainability",
      description:
        "We consider long-term environmental and social impact in our work.",
      icon: <Globe className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Core Values
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            These principles guide our decisions, shape our culture, and define
            how we collaborate with our clients.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card flex flex-col rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-md">
                {value.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
