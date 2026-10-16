import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";

export default function ClassicContactForm() {
  return (
    <section className="container mx-auto px-4 py-12 md:px-6 md:py-24 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="text-muted-foreground">
            I&apos;d love to hear from you. Please fill out the form below and
            I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <Card className="border-border/40">
          <CardContent>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="mb-2 block">
                  Name
                </Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="subject" className="mb-2 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this regarding?"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  required
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>

              <p className="text-muted-foreground text-center text-sm">
                I&apos;ll respond to your message within 1-2 business days.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
