import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Card } from "../../../ui/card";

{
  /* Add this to the global css file 
@keyframes float {
        0% {
        transform: translateY(0px);
        }
        50% {
        transform: translateY(-10px);
        }
        100% {
        transform: translateY(0px);
        }
    }
    .animate-float {
        animation: float 3s ease-in-out infinite;
    }*/
}

export default function HeroSectionWithIntegrationShowcase() {
  const integrations = [
    {
      name: "GitHub",
      description: "Connect your repositories",
      category: "Development",
      icon: (
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
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      name: "Figma",
      description: "Import design files",
      category: "Design",
      icon: (
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
        >
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
        </svg>
      ),
    },
    {
      name: "Slack",
      description: "Team notifications",
      category: "Communication",
      icon: (
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
        >
          <rect width="3" height="8" x="13" y="2" rx="1.5" />
          <rect width="3" height="8" x="13" y="14" rx="1.5" />
          <rect width="3" height="8" x="2" y="8" rx="1.5" />
          <rect width="3" height="8" x="19" y="8" rx="1.5" />
          <path d="M7.5 10.5H19" />
          <path d="M5 16.5h12.5" />
          <path d="M7.5 4.5h12.5" />
        </svg>
      ),
    },
    {
      name: "VS Code",
      description: "Code editor integration",
      category: "Development",
      icon: (
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
        >
          <path d="m16 3-4 4-4-4" />
          <path d="M4 7h16" />
          <path d="M4 11h16" />
          <path d="M4 15h16" />
          <path d="m16 19-4-4-4 4" />
        </svg>
      ),
    },
    {
      name: "Notion",
      description: "Documentation sync",
      category: "Productivity",
      icon: (
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
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h8" />
        </svg>
      ),
    },
    {
      name: "AWS",
      description: "Cloud deployment",
      category: "Infrastructure",
      icon: (
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
        >
          <path d="M2 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5" />
          <path d="M12 12a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.1),transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                Seamless Integration
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Connect with your favorite tools
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Integrate with the tools you already use and love. Our platform
                works seamlessly with your existing workflow.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Explore Integrations
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
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Integration Grid */}
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {integrations.map((integration, index) => (
                <Card
                  key={integration.name}
                  className={`group p-6 transition-all duration-300 hover:shadow-lg ${
                    index === 1 ? "md:translate-y-4" : ""
                  } ${index === 4 ? "md:-translate-y-4" : ""}`}
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                      <div className="text-primary">{integration.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{integration.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{integration.category}</Badge>
                </Card>
              ))}
            </div>

            {/* Integration Stats */}
            <div className="mt-16 text-center">
              <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-muted-foreground text-sm">
                    Available Integrations
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1M+</p>
                  <p className="text-muted-foreground text-sm">
                    API Requests Daily
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold">99.9%</p>
                  <p className="text-muted-foreground text-sm">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-muted-foreground text-sm">Support</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <Card className="animate-float absolute top-1/3 -right-4 hidden w-48 p-4 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <p className="font-medium">Easy to integrate</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
