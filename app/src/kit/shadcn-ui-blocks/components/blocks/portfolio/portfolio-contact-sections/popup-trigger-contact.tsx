import { Button } from '../../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../ui/dialog';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function PopupTriggerContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* !!! IMPORTANT: h-[484px] set for preview example only - remove this class when using the block !!! */}
      <section className="container mx-auto h-[484px] px-4 py-12 md:px-6 md:py-24 lg:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto h-full max-w-2xl content-center text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start a conversation?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-lg">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Mail className="size-4" />
                Contact Me
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Get in touch</DialogTitle>
                <DialogDescription>
                  Send me a message and I&apos;ll get back to you as soon as
                  possible.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send message
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="mt-8">
            <p className="text-muted-foreground text-sm">
              You can also reach me at{' '}
              <a
                href="mailto:hello@example.com"
                className="text-primary font-medium"
              >
                hello@example.com
              </a>
            </p>
          </div>
        </div>

        {/* Floating contact button */}
        <div className="fixed right-6 bottom-6 z-50 sm:right-8 sm:bottom-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <Mail className="size-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Contact Me</DialogTitle>
                <DialogDescription>
                  {' '}
                  out the form below and I&apos;ll respond as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="float-name">Name</Label>
                  <Input id="float-name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="float-email">Email</Label>
                  <Input
                    id="float-email"
                    type="email"
                    placeholder="Your email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="float-message">Message</Label>
                  <Textarea
                    id="float-message"
                    placeholder="Your message"
                    rows={4}
                    className="resize-none"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  );
}
