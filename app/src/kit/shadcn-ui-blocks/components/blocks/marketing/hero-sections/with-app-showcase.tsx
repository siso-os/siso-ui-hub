import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';

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
@keyframes float-slow {
    0% {
    transform: translateY(0px);
    }
    50% {
    transform: translateY(-15px);
    }
    100% {
    transform: translateY(0px);
    }
}
.animate-float {
    animation: float 3s ease-in-out infinite;
}
.animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
}
*/
}

export default function HeroSectionWithAppShowcase() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <div className="relative">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4">
              Cross-Platform App
            </Badge>
            <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Your app, everywhere
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              Build beautiful, responsive applications that work seamlessly
              across all devices and platforms.
            </p>
            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg">
                Download Now
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
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            {/* Platform Support */}
            <div className="text-muted-foreground flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="text-sm">Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18" />
                </svg>
                <span className="text-sm">Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
                <span className="text-sm">Web</span>
              </div>
            </div>
          </div>

          {/* Device Showcase */}
          <div className="relative mx-auto max-w-5xl">
            {/* Desktop */}
            <Card className="overflow-hidden border-2 shadow-2xl">
              <div className="bg-muted flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="bg-muted aspect-[16/9]">
                <img
                  src="https://placehold.co/1920x1080.jpeg"
                  alt="Desktop App"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>

            {/* Mobile */}
            <Card className="absolute top-1/2 -right-8 w-72 overflow-hidden border-2 shadow-2xl">
              <div className="bg-muted flex items-center justify-center border-b py-3">
                <div className="bg-muted-foreground/20 h-4 w-16 rounded-full" />
              </div>
              <div className="bg-muted aspect-[9/16]">
                <img
                  src="https://placehold.co/1080x1920.jpeg"
                  alt="Mobile App"
                  width={1080}
                  height={1920}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>

            {/* Tablet */}
            <Card className="absolute top-1/4 -left-8 w-80 rotate-[-8deg] overflow-hidden border-2 shadow-2xl">
              <div className="bg-muted aspect-[4/3]">
                <img
                  src="https://placehold.co/1024x768.jpeg"
                  alt="Tablet App"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>

            {/* Feature Highlights */}
            <div className="absolute top-0 right-0 flex gap-4">
              <Card className="animate-float-slow w-48 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
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
                      className="text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <p className="font-medium">Responsive</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  Adapts perfectly to any screen size
                </p>
              </Card>
            </div>

            <div className="absolute bottom-0 left-0 flex gap-4">
              <Card className="animate-float w-48 p-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
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
                      className="text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <p className="font-medium">Modern UI</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  Beautiful and intuitive design
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
