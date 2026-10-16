import { Card, CardContent } from "../../../ui/card";
import { Trophy, Users, Building, Globe } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    stat: "150+",
    title: "Industry Awards",
    description: "Recognized for excellence in design and innovation.",
  },
  {
    icon: Users,
    stat: "50,000+",
    title: "Happy Clients",
    description: "Helping businesses worldwide achieve their goals.",
  },
  {
    icon: Building,
    stat: "12",
    title: "Global Offices",
    description: "Local presence with international reach.",
  },
  {
    icon: Globe,
    stat: "24/7",
    title: "Customer Support",
    description: "Always available to help when you need us.",
  },
];

export default function AboutSectionAchievements() {
  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">Our Achievements</h2>
        <p className="text-muted-foreground">
          Since our founding in 2010, we&apos;ve reached significant milestones
          and earned the trust of clients across industries and continents.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item) => (
          <Card key={item.title} className="p-0">
            <CardContent className="space-y-4 p-6 text-center">
              <div className="flex justify-center">
                <item.icon className="text-primary h-10 w-10" />
              </div>
              <div>
                <p className="text-3xl font-bold">{item.stat}</p>
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mx-auto max-w-2xl space-y-4 pt-8 text-center">
        <h3 className="text-xl font-bold">Trusted by Leading Organizations</h3>
        <p className="text-muted-foreground">
          Our solutions power businesses of all sizes, from innovative startups
          to Fortune 500 companies across a wide range of industries.
        </p>
        <div className="grid grid-cols-2 gap-8 pt-6 opacity-75 sm:grid-cols-3 md:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-muted h-8 rounded-md"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
