import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { SiFacebook, SiInstagram } from '@icons-pack/react-simple-icons';

import { Linkedin, Twitter } from '../../../ui/brand-icons';

export default function MinimalFormWithSocial() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 md:py-24 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground mb-8">
          Drop me a message or connect with me on social media.
        </p>

        <Card className="mb-8">
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <Input id="name" name="name" placeholder="Name" required />
              </div>

              <div>
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Your message"
                  required
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <h3 className="mb-4 text-lg font-medium">Or connect directly</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="hover:bg-primary hover:text-primary-foreground flex items-center gap-2 rounded-full border p-3 transition-colors"
            >
              <Linkedin className="size-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href="#"
              className="hover:bg-primary hover:text-primary-foreground flex items-center gap-2 rounded-full border p-3 transition-colors"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 11.7c0 6.45-5.27 11.68-11.78 11.68-2.07 0-4-.53-5.7-1.45L0 24l2.13-6.27a11.57 11.57 0 0 1-1.7-6.04C.44 5.23 5.72 0 12.23 0 18.72 0 24 5.23 24 11.7M12.22 1.85c-5.46 0-9.9 4.41-9.9 9.83 0 2.15.7 4.14 1.88 5.76L2.96 21.1l3.8-1.2a9.9 9.9 0 0 0 5.46 1.62c5.46 0 9.9-4.4 9.9-9.83a9.88 9.88 0 0 0-9.9-9.83m5.95 12.52c-.08-.12-.27-.19-.56-.33-.28-.14-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.14-.2.29-.75.93-.91 1.12-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.43a8.64 8.64 0 0 1-1.6-1.98c-.18-.29-.03-.45.12-.6.13-.13.29-.34.43-.5.15-.17.2-.3.29-.48.1-.2.05-.36-.02-.5-.08-.15-.65-1.56-.9-2.13-.24-.58-.48-.48-.65-.48-.17 0-.37-.03-.56-.03-.2 0-.5.08-.77.36-.26.29-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.96.14.19 2 3.17 4.93 4.32 2.94 1.15 2.94.77 3.47.72.53-.05 1.7-.7 1.95-1.36.24-.67.24-1.25.17-1.37" />
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <a
              href="#"
              className="hover:bg-primary hover:text-primary-foreground flex items-center gap-2 rounded-full border p-3 transition-colors"
            >
              <SiInstagram className="size-5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>

            <a
              href="#"
              className="hover:bg-primary hover:text-primary-foreground flex items-center gap-2 rounded-full border p-3 transition-colors"
            >
              <Twitter className="size-5" />
              <span className="hidden sm:inline">Twitter</span>
            </a>

            <a
              href="#"
              className="hover:bg-primary hover:text-primary-foreground flex items-center gap-2 rounded-full border p-3 transition-colors"
            >
              <SiFacebook className="size-5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
