export default function Base() {
  return (
    <div>
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        <blockquote className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center">
            <div className="text-primary mb-6 font-serif text-4xl">&ldquo;</div>
            <p className="text-center text-xl sm:text-2xl md:text-3xl md:leading-normal">
              Working with this team was an absolute pleasure. The level of
              professionalism and creativity exceeded all my expectations.
            </p>
            <div className="mt-6 flex flex-col items-center md:mt-10">
              <p className="font-semibold">Sarah Johnson</p>
              <p className="text-muted-foreground">
                Design Director, Creative Studio
              </p>
            </div>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
