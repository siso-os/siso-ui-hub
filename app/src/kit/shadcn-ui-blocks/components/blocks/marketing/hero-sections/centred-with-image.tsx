export default function HeroSectionCentredWithImage() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Nano-Frontiers: Reshaping Tech
            </h1>
            <p className="text-muted-foreground mt-3 text-xl">
              Nano-computing breaks barriers, unlocking new tech horizons.
            </p>
          </div>
          <div className="relative mx-auto mt-10 max-w-5xl">
            <img
              src="https://placehold.co/1024x480/jpeg"
              className="rounded-xl"
              alt="Image Description"
              width={1024}
              height={480}
            />
            <div className="from-primary-foreground via-primary-foreground to-background absolute -start-20 bottom-12 -z-[1] h-48 w-48 rounded-lg bg-gradient-to-b p-px">
              <div className="bg-background/10 h-48 w-48 rounded-lg" />
            </div>
            <div className="from-primary-foreground via-primary-foreground to-background absolute -end-20 -top-12 -z-[1] h-48 w-48 rounded-full bg-gradient-to-t p-px">
              <div className="bg-background/10 h-48 w-48 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
