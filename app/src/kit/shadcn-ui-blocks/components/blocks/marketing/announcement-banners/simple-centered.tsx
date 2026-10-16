export default function SimpleCentered() {
  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex w-full items-center gap-x-4 text-sm">
            <p className="flex-1 text-center">
              <a
                href="#"
                className="font-semibold underline-offset-4 hover:underline"
              >
                Introducing our new UI blocks
              </a>
              <span className="hidden sm:inline">
                {' '}
                — Get started with 50+ new components.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
