export default function Simple3Cols() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      {/* Grid */}
      <div className="grid gap-6 grid-cols-1 sm:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {/* Stats */}

        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-foreground/85">
            Accuracy rate
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold">99.95%</p>
          <p className="mt-1 text-muted-foreground">in fulfilling orders</p>
        </div>
        {/* End Stats */}

        {/* Stats */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-foreground/85">
            Startup businesses
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold">2,000+</p>
          <p className="mt-1 text-muted-foreground">partner with Acme</p>
        </div>
        {/* End Stats */}

        {/* Stats */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold text-foreground/85">
            Happy customer
          </h4>
          <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold">85%</p>
          <p className="mt-1 text-muted-foreground">this year alone</p>
        </div>
        {/* End Stats */}
      </div>
      {/* End Grid */}
    </div>
  );
}
