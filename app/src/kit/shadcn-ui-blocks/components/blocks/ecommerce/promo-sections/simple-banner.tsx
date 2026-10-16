import { Button } from '../../../ui/button';

export default function SimpleBannerPromo() {
  return (
    <div className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
        <h2 className="text-primary-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="text-primary-foreground/80 block">
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:ml-4 lg:flex-shrink-0">
          <Button size="lg" variant="secondary" asChild>
            <a href="#">Get started</a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            asChild
            className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground ml-3"
          >
            <a href="#">Learn more</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
