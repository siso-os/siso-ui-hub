import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Checkbox } from '../../../ui/checkbox';
import { Download, Check, Lock } from 'lucide-react';
import { Badge } from '../../../ui/badge';

export default function PortfolioGatedDownload() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real implementation, you would handle the form submission here
    // For example, sending the email to your backend/API
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="bg-card mx-auto max-w-5xl overflow-hidden rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image/Preview Column (5/12) */}
          <div className="bg-muted relative md:col-span-5">
            <div className="relative h-64 w-full md:h-full">
              <img
                src="https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Client Proposal Template Preview"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

              {/* Premium Badge */}
              <Badge className="absolute top-4 right-4">Premium Resource</Badge>

              {/* Preview Info */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-xl font-bold md:text-2xl">
                  Client Proposal Template
                </h3>
                <p className="mt-1 text-sm text-white/80 md:text-base">
                  20-page customizable template with example content
                </p>
              </div>
            </div>
          </div>

          {/* Form Column (7/12) */}
          <div className="p-6 md:col-span-7 md:p-8">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold md:text-2xl">
                    Get This Client Proposal Template
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {' '}
                    out the form below to receive this resource in your inbox
                    immediately.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="subscribe"
                      checked={subscribed}
                      onCheckedChange={(checked) => {
                        setSubscribed(checked as boolean);
                      }}
                    />
                    <Label
                      htmlFor="subscribe"
                      className="text-sm leading-tight font-normal"
                    >
                      Also subscribe me to receive future resource updates and
                      professional tips (optional)
                    </Label>
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      <Lock className="mr-2 h-4 w-4" />
                      Unlock This Resource
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-center text-xs">
                    We respect your privacy and will never share your
                    information. View our{' '}
                    <a href="#" className="text-primary underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-primary/10 text-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                  <Check className="h-8 w-8" />
                </div>

                <h2 className="text-xl font-bold md:text-2xl">Thank You!</h2>

                <p className="text-muted-foreground mx-auto mt-2 max-w-md">
                  Your download link has been sent to <strong>{email}</strong>.
                  Check your inbox!
                </p>

                <Button className="mt-6">
                  <Download className="mr-2 h-4 w-4" />
                  Download Directly
                </Button>

                {subscribed && (
                  <p className="text-muted-foreground mt-4 text-sm">
                    You&apos;re now subscribed to my resource updates. You can
                    unsubscribe anytime.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
