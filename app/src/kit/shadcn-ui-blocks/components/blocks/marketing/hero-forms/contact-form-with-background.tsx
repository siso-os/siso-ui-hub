import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { PhoneIcon, MapPinIcon, MailIcon } from 'lucide-react';

export default function HeroFormContactWithBackground() {
  return (
    <>
      {/* Hero */}
      <div className="relative flex min-h-[800px] items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
            alt="Office workspace"
            className="object-cover brightness-[0.6]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 md:py-20 lg:py-32 2xl:max-w-[1400px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-white">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Let&apos;s start a conversation
              </h1>
              <p className="mt-4 max-w-lg text-xl text-white/80">
                Have a project in mind or just want to say hello? Our team is
                ready to connect with you.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                    <PhoneIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      Call us
                    </h3>
                    <p className="mt-1 text-white/80">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                    <MailIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      Email us
                    </h3>
                    <p className="mt-1 text-white/80">contact@example.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-full bg-white/10 p-3">
                    <MapPinIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">
                      Visit us
                    </h3>
                    <p className="mt-1 text-white/80">
                      123 Design Street, San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-background/95 rounded-lg p-8 shadow-lg backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5" htmlFor="firstName">
                      First name
                    </Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div>
                    <Label className="mb-1.5" htmlFor="lastName">
                      Last name
                    </Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label className="mb-1.5" htmlFor="email">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div>
                  <Label className="mb-1.5" htmlFor="phone">
                    Phone number (optional)
                  </Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <Label className="mb-1.5" htmlFor="subject">
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1.5" htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project or question..."
                    rows={4}
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
              <p className="text-muted-foreground mt-4 text-center text-xs">
                We&apos;ll get back to you within 24-48 business hours
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
