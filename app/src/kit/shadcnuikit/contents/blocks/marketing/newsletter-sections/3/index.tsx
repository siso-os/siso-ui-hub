import { Button } from "../../../../../../shadcn/ui/button";
import { Input } from "../../../../../../shadcn/ui/input";

export default function NewsletterSection() {
  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-4 px-4 py-10 md:flex-row lg:space-y-8 lg:py-16">
        <div className="mb-8 lg:mb-0 lg:max-w-md">
          <h3 className="text-foreground mb-2 text-3xl font-bold">
            Join our newsletter
          </h3>
          <p className="text-muted-foreground text-balance">
            Stay updated with the latest news, insights, and exclusive offers
            delivered straight to your inbox.
          </p>
        </div>

        <div className="w-full lg:w-auto">
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              autoComplete="email"
              required
              className="min-w-0 flex-1 sm:min-w-70"
            />
            <Button type="submit" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
