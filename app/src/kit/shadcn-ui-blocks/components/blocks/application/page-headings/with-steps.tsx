import { Check, ChevronRight } from 'lucide-react';

export default function PageHeadingWithSteps() {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-16 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-xl">
            Let&apos;s get your account set up. Follow these steps to get
            started with our platform.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <nav className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex items-center">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                <Check className="h-4 w-4" />
              </div>
              <a href="#" className="ml-3 text-sm font-medium">
                Account
              </a>
              <ChevronRight className="text-muted-foreground ml-3 hidden h-4 w-4 sm:block" />
            </div>

            <div className="flex items-center">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                <span>2</span>
              </div>
              <a href="#" className="ml-3 text-sm font-medium">
                Business Details
              </a>
              <ChevronRight className="text-muted-foreground ml-3 hidden h-4 w-4 sm:block" />
            </div>

            <div className="flex items-center">
              <div className="border-muted bg-background flex h-8 w-8 items-center justify-center rounded-full border">
                <span className="text-muted-foreground">3</span>
              </div>
              <a
                href="#"
                className="text-muted-foreground ml-3 text-sm font-medium"
              >
                Verification
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
