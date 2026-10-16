import { Button } from "../../../../../../shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../shadcn/ui/card";
import { Input } from "../../../../../../shadcn/ui/input";
import { Label } from "../../../../../../shadcn/ui/label";

export default function Newsletter1() {
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 text-center md:px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl leading-tight font-bold md:text-4xl">
            Join Our Community
          </h2>
          <p className="text-muted-foreground mt-4 md:text-lg">
            Subscribe to our newsletter to get the latest updates, exclusive
            content, and special offers directly in your inbox.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Card className="w-full max-w-md shadow-none">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">
                Subscribe to our Newsletter
              </CardTitle>
              <CardDescription>
                Stay up-to-date with our latest news and exclusive offers.
              </CardDescription>
            </CardHeader>
            <form className="contents">
              <CardContent className="grid gap-2">
                <Label htmlFor="newsletter-1-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="newsletter-1-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
