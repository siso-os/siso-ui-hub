import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../../ui/avatar";

export default function HeroSectionWithTeamGrid() {
  const team = [
    {
      name: "Sarah Wilson",
      role: "Product Lead",
      image: "https://placehold.co/400x400.jpeg?text=SW",
      initials: "SW",
    },
    {
      name: "Alex Chen",
      role: "Lead Designer",
      image: "https://placehold.co/400x400.jpeg?text=AC",
      initials: "AC",
    },
    {
      name: "Michael Park",
      role: "Tech Lead",
      image: "https://placehold.co/400x400.jpeg?text=MP",
      initials: "MP",
    },
    {
      name: "Emma Davis",
      role: "Marketing Head",
      image: "https://placehold.co/400x400.jpeg?text=ED",
      initials: "ED",
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px] dark:bg-grid-slate-400/[0.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Join Our Team
            </Badge>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Built by developers, for developers
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join a team of passionate developers building the next generation
              of web applications with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg">
                View Open Positions
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
                  className="ml-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              <Button size="lg" variant="outline">
                Meet the Team
              </Button>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 mx-auto relative">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">50+</h4>
              <p className="text-muted-foreground">Team Members</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">20+</h4>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">98%</h4>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
