import Logo from "../../../../assets/logo/logo";
import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import { Input } from "../../../../../shadcn/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../shadcn/ui/avatar";
import { AnimatedGradientBackground } from "@/components/shadcn-space/blocks/waitlist-01/animated-gradient-background";
import { ArrowRight } from "lucide-react";

export type AvatarItem = {
  image: string;
  fallback: string;
};

type EarlyAccessProps = {
  avatarList: AvatarItem[];
};

const EarlyAccess = ({ avatarList }: EarlyAccessProps) => {
  return (
    <section className="min-h-screen">
      <div className="grid lg:grid-cols-2 h-screen">
        <div className="xl:px-20 lg:border-r lg:border-border">
          <div className="flex flex-col gap-6 justify-between lg:px-16 lg:py-16 sm:px-10 py-10 px-4 h-full">
            <Logo />
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="rounded-full px-3 py-1 w-fit text-xs font-normal gap-2 h-6">
                <span className="size-1 rounded-full bg-teal-400 shrink-0 " />
                Shadcnspace is now in Beta
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight max-w-sm">
                Design faster<br className="sm:block hidden" /> with smarter collaboration.
              </h1>
              <p className="text-sm text-muted-foreground max-w-sm">
                A real-time design workspace that keeps your team aligned from
                concept to handoff. Intuitive, fast, and built for modern
                product teams.
              </p>
            </div>
            <div className="lg:flex hidden items-center gap-2 text-xs text-muted-foreground">
              <span>&copy; 2026 Shadcnspace.</span>
              <span className="size-1 rounded-full bg-muted-foreground shrink-0" />
              <span>Beta Version 1.0</span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16">
          <AnimatedGradientBackground className="absolute inset-0 -z-10 pointer-events-none lg:blur-none blur-xl" />
          <div className="bg-card border border-border rounded-3xl shadow-xs p-6 sm:p-8 lg:p-10 w-full max-w-md">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Get early access today</h3>
              <p className="text-sm text-muted-foreground">
                Be among the first to try the next generation of design
                collaboration. No credit card required. Free during beta.
              </p>
            </div>
            <div className="flex flex-col sm:gap-5 gap-3 mt-6">
              <Input
                type="email"
                placeholder="Enter your work email..."
                className="h-9 rounded-lg"
              />
              <Button className="w-full h-10 rounded-lg cursor-pointer">
                Request Access
                <ArrowRight size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {avatarList.map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="size-8 border-2 border-background -mr-2"
                  >
                    <AvatarImage src={avatar.image} alt="User" />
                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                +3.1k designers signed up
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8 text-sm">
            <span className="text-primary/50">Stay in the loop:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">X/Twitter</span>
              <span className="size-1 rounded-full bg-muted-foreground/50 shrink-0" />
              <span className="text-xs font-medium">Dribbble</span>
              <span className="size-1 rounded-full bg-muted-foreground/50 shrink-0" />
              <span className="text-xs font-medium">Instagram</span>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-2 mt-6 text-xs text-muted-foreground">
            <span>&copy; 2026 Shadcnspace.</span>
            <span className="size-1 rounded-full bg-muted-foreground shrink-0" />
            <span>Beta Version 1.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarlyAccess;
