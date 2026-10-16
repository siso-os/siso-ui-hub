import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

export default function FullWidthLargeContentPromo() {
  return (
    <div className="bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2400&auto=format&fit=crop"
          alt="Promotional background image featuring a premium tech product"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="bg-primary/60 dark:bg-primary-foreground/60 absolute inset-0 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <Badge className="bg-primary-foreground dark:bg-primary text-primary dark:text-primary-foreground mb-4">
          Limited Edition
        </Badge>
        <h1 className="text-primary-foreground dark:text-primary text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          The Ultimate Tech Companion
        </h1>
        <p className="text-primary-foreground/80 dark:text-primary/80 mx-auto mt-6 max-w-xl text-xl">
          Experience unparalleled performance and design. Pre-order now and
          receive exclusive early access benefits and a special gift.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            asChild
          >
            <a href="#">Pre-Order Now</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary-foreground/30 dark:border-primary/30 text-primary-foreground dark:text-primary hover:bg-primary-foreground/10 dark:hover:bg-primary/10 hover:text-primary-foreground dark:hover:text-primary w-full bg-transparent sm:w-auto"
            asChild
          >
            <a href="#">Learn More</a>
          </Button>
        </div>
        <p className="text-primary-foreground/60 dark:text-primary/60 mt-8 text-xs">
          Offer valid until October 31st. Terms and conditions apply.
        </p>
      </div>
    </div>
  );
}
