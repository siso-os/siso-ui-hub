export default function MasonryCardsOnImages() {
  return (
    <>
      {/* Masonry Cards */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-7 sm:self-end md:col-span-8 lg:col-span-5 lg:col-start-3">
            {/* Card */}
            <a
              className="group relative block overflow-hidden rounded-xl focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none overflow-hidden rounded-xl">
                <img
                  className="w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute start-0 end-0 bottom-0 p-2 sm:p-4">
                <div className="bg-primary-foreground rounded-lg p-4 text-sm font-semibold md:text-xl">
                  Workplace personalities
                </div>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-span-12 sm:col-span-5 sm:self-end md:col-span-4 lg:col-span-3">
            {/* Card */}
            <a
              className="group relative block overflow-hidden rounded-xl focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none overflow-hidden rounded-xl">
                <img
                  className="w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute start-0 end-0 bottom-0 p-2 sm:p-4">
                <div className="bg-primary-foreground rounded-lg p-4 text-sm font-semibold md:text-xl">
                  Women in engineering
                </div>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-span-12 md:col-span-4">
            {/* Card */}
            <a
              className="group relative block overflow-hidden rounded-xl focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none overflow-hidden rounded-xl">
                <img
                  className="w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src="https://images.unsplash.com/photo-1606836576983-8b458e75221d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute start-0 end-0 bottom-0 p-2 sm:p-4">
                <div className="bg-primary-foreground rounded-lg p-4 text-sm font-semibold md:text-xl">
                  Pride 2021
                </div>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            {/* Card */}
            <a
              className="group relative block overflow-hidden rounded-xl focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none overflow-hidden rounded-xl">
                <img
                  className="w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src="https://images.unsplash.com/photo-1598929438701-ef29ab0bb61a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute start-0 end-0 bottom-0 p-2 sm:p-4">
                <div className="bg-primary-foreground rounded-lg p-4 text-sm font-semibold md:text-xl">
                  Data at Acme
                </div>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            {/* Card */}
            <a
              className="group relative block overflow-hidden rounded-xl focus:outline-none"
              href="#"
            >
              <div className="aspect-w-12 aspect-h-7 sm:aspect-none overflow-hidden rounded-xl">
                <img
                  className="w-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
                  src="https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                  alt="Masonry Cards Image"
                />
              </div>
              <div className="absolute start-0 end-0 bottom-0 p-2 sm:p-4">
                <div className="bg-primary-foreground rounded-lg p-4 text-sm font-semibold md:text-xl">
                  Empowered management
                </div>
              </div>
            </a>
            {/* End Card */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Masonry Cards */}
    </>
  );
}
