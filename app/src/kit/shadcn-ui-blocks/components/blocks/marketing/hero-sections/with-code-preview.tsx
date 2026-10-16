import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Card } from "../../../ui/card";

export default function HeroSectionWithCodePreview() {
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

          <div className="container mx-auto grid items-center gap-12 px-4 py-24 md:px-6 lg:grid-cols-2 lg:py-32 2xl:max-w-[1400px]">
            <div>
              <Badge variant="outline" className="mb-4">
                Developer Experience
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Code with confidence
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Build type-safe applications with our fully typed components.
                Get instant feedback and autocompletion in your IDE.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Install Now
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
                  Read Docs
                </Button>
              </div>

              {/* Code snippet */}
              <div className="bg-muted mt-8 rounded-lg p-4">
                <p className="text-muted-foreground mb-2 font-mono text-sm">
                  # Install dependencies
                </p>
                <p className="font-mono text-sm">npm install @shadcn/ui</p>
              </div>
            </div>

            <div className="relative">
              {/* Terminal Window */}
              <Card className="relative overflow-hidden">
                <div className="bg-muted flex items-center gap-2 border-b px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-muted-foreground text-sm font-medium">
                      terminal
                    </p>
                  </div>
                </div>
                <div className="bg-card space-y-4 p-4 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">❯</span>
                    <span>
                      npx create-next-app@latest my-app --typescript --tailwind
                    </span>
                  </div>
                  <div className="text-muted-foreground pl-4">
                    <p>✓ Creating a new Next.js app in my-app</p>
                    <p>✓ Initializing project with TypeScript</p>
                    <p>✓ Adding Tailwind CSS</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">❯</span>
                    <span>cd my-app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">❯</span>
                    <span>npx shadcn-ui@latest init</span>
                  </div>
                  <div className="text-muted-foreground pl-4">
                    <p>✓ Adding UI components</p>
                    <p>✓ Configuring project</p>
                    <p className="text-primary">Ready to start building! 🚀</p>
                  </div>
                </div>
              </Card>

              {/* Code Preview */}
              <Card className="absolute -right-8 -bottom-8 z-10 w-80">
                <div className="bg-muted flex items-center gap-2 border-b px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Button.tsx
                  </p>
                </div>
                <div className="bg-card overflow-x-auto p-4 font-mono text-sm">
                  <pre className="text-xs">
                    <code>{`import { Button } from "../../../ui/button"
 
export default function Home() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`}</code>
                  </pre>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
